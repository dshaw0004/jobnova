/**
 * POST /api/jobs/screening
 * Post-application AI screening interview chatbot endpoint.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

interface OllamaMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const OLLAMA_URL = 'http://localhost:11434/api/chat'
const MODEL = process.env.MODEL || 'granite4:350m'

async function callOllama(messages: OllamaMessage[]): Promise<string> {
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 512
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Ollama returned ${response.status}: ${await response.text()}`)
  }

  const data = await response.json() as { message: { content: string } }
  return data.message?.content?.trim() ?? ''
}

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  const body = await readBody(event)
  const { jobId, message } = body ?? {}

  if (!jobId) {
    throw createError({ statusCode: 400, message: 'Missing job ID.' })
  }

  // 1. Fetch job details, candidate profile, and existing application details
  const appData = await DB
    .prepare(`
      SELECT
        ja.id as application_id,
        ja.ai_screening_completed,
        ja.ai_screening_score,
        ja.ai_screening_summary,
        ja.ai_screening_chat_history,
        j.title as job_title,
        ep.company_name,
        j.ai_screening_prompt,
        j.ai_screening_enabled,
        jp.full_name,
        jp.about_self,
        jp.skills,
        jp.academic_info,
        jp.professional_info
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.id
      LEFT JOIN employer_profiles ep ON j.employer_id = ep.user_id
      LEFT JOIN jobseeker_profiles jp ON ja.jobseeker_id = jp.user_id
      WHERE ja.job_id = ? AND ja.jobseeker_id = ?
    `)
    .bind(jobId, userId)
    .first<any>()

  if (!appData) {
    throw createError({ statusCode: 404, message: 'Application not found. Please apply to the job first.' })
  }

  if (appData.ai_screening_enabled !== 1) {
    throw createError({ statusCode: 400, message: 'AI screening is not enabled for this job.' })
  }

  if (appData.ai_screening_completed === 1) {
    return {
      success: true,
      completed: true,
      chatHistory: JSON.parse(appData.ai_screening_chat_history || '[]'),
      score: appData.ai_screening_score,
      summary: appData.ai_screening_summary,
      jobTitle: appData.job_title,
      companyName: appData.company_name
    }
  }

  // Parse chat history or initialize
  let history: OllamaMessage[] = []
  if (appData.ai_screening_chat_history) {
    try {
      history = JSON.parse(appData.ai_screening_chat_history)
    } catch {
      history = []
    }
  }

  const candidateName = appData.full_name || 'Candidate'
  const skillsStr = typeof appData.skills === 'string' ? appData.skills : JSON.stringify(appData.skills || '')
  const academicStr = typeof appData.academic_info === 'string' ? appData.academic_info : JSON.stringify(appData.academic_info || [])
  const professionalStr = typeof appData.professional_info === 'string' ? appData.professional_info : JSON.stringify(appData.professional_info || [])

  // Build the system prompt
  const systemPrompt = `You are Aria, the warm and professional AI recruitment interviewer at Job Nova.
You are screening the candidate for the job: "${appData.job_title}" at company: "${appData.company_name}".

The employer has configured the following post-application screening prompt & criteria:
"""
${appData.ai_screening_prompt || 'Conduct a general screening to assess candidate skills, relevant work experience, and overall suitability for the role.'}
"""

Candidate Profile Details:
- Name: ${candidateName}
- About: ${appData.about_self || 'Not provided'}
- Skills: ${skillsStr}
- Education: ${academicStr}
- Experience: ${professionalStr}

Your Mission:
1. Conduct a brief, high-quality, and friendly screening interview (strictly 3 to 5 questions).
2. Assess their experience and skills specifically against the employer's screening prompt.
3. Ask exactly ONE question at a time. Wait for their response. Do not ask multiple questions or double questions.
4. Keep your turns concise (2-4 sentences max). Acknowledge their response warmly before asking the next question.
5. Once you have gathered sufficient information to evaluate the candidate (usually after 3-5 questions) or if they ask to stop, write a warm concluding message explaining that the interview is completed and that the employer will review the transcript. You MUST append the tag '[CONCLUDED]' (in brackets, exactly like that) to the very end of your final message.

Remember: Never tell the candidate about the '[CONCLUDED]' tag or details of database scoring. Always maintain a highly professional, encouraging, and supportive tone.`

  // 2. If it's initialization (no message sent yet or history is empty)
  if (history.length === 0 && (!message || !message.trim())) {
    // Generate the initial welcoming greeting dynamically
    const initMessages: OllamaMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: 'Begin the interview. Greet me, welcome me to the screening for the job role, and ask the first screening question.' }
    ]

    let aiGreeting = ''
    try {
      aiGreeting = await callOllama(initMessages)
    } catch (err) {
      console.error('Ollama error on greeting:', err)
      aiGreeting = `Hello ${candidateName}, welcome to the screening interview for the ${appData.job_title} role at ${appData.company_name}. I'm Aria, and I will be conducting your screening today. To start, could you please introduce yourself and tell me what interests you most about this position?`
    }

    history.push({ role: 'assistant', content: aiGreeting })

    // Save to DB
    await DB
      .prepare('UPDATE job_applications SET ai_screening_chat_history = ? WHERE id = ?')
      .bind(JSON.stringify(history), appData.application_id)
      .run()

    return {
      success: true,
      completed: false,
      reply: aiGreeting,
      chatHistory: history,
      jobTitle: appData.job_title,
      companyName: appData.company_name
    }
  }

  // 3. Process new message from user
  if (!message || typeof message !== 'string' || !message.trim()) {
    throw createError({ statusCode: 400, message: 'Message cannot be empty.' })
  }

  // Add user message to history
  history.push({ role: 'user', content: message.trim() })

  // Build the message stream for Ollama
  const ollamaMessages: OllamaMessage[] = [
    { role: 'system', content: systemPrompt },
    ...history
  ]

  let aiReply = ''
  try {
    aiReply = await callOllama(ollamaMessages)
  } catch (err) {
    console.error('Ollama error during chat:', err)
    throw createError({ statusCode: 502, message: 'AI service is temporarily unavailable. Please try again.' })
  }

  // Add AI reply to history
  history.push({ role: 'assistant', content: aiReply })

  // Check if concluded
  let isConcluded = aiReply.includes('[CONCLUDED]')
  let replyClean = aiReply.replace('[CONCLUDED]', '').trim()

  // Save history to DB
  await DB
    .prepare('UPDATE job_applications SET ai_screening_chat_history = ? WHERE id = ?')
    .bind(JSON.stringify(history), appData.application_id)
    .run()

  // 4. If concluded, perform evaluation
  if (isConcluded) {
    try {
      const transcript = history
        .map(h => `${h.role === 'user' ? 'Candidate' : 'Interviewer Aria'}: ${h.content}`)
        .join('\n')

      const evalPrompt = `You are a recruitment screening evaluator. Your job is to assess a candidate's suitability based on their interview transcript and the employer's requirements.

Employer's Requirements:
"""
${appData.ai_screening_prompt || 'General suitability assessment.'}
"""

Candidate Profile:
- Name: ${candidateName}
- Skills: ${skillsStr}
- Academic Details: ${academicStr}
- Professional Details: ${professionalStr}

Interview Transcript:
${transcript}

Provide:
1. A numeric score (0 to 100) reflecting how well the candidate matches the requirements based on their profile and answers.
2. A summary of their suitability, strengths, and alignment with the role (2-4 sentences).

You MUST output your response in this exact format:
SCORE: <score between 0 and 100>
SUMMARY: <your summary text>`

      const evalMessages: OllamaMessage[] = [
        { role: 'system', content: 'You are a precise JSON/structured data generator.' },
        { role: 'user', content: evalPrompt }
      ]

      const evalResponse = await callOllama(evalMessages)

      const scoreMatch = evalResponse.match(/SCORE:\s*(\d+)/i)
      const summaryMatch = evalResponse.match(/SUMMARY:\s*([\s\S]+)/i)

      const score = (scoreMatch && scoreMatch[1]) ? Math.min(100, Math.max(0, parseInt(scoreMatch[1]))) : 70
      const summary = (summaryMatch && summaryMatch[1]) ? summaryMatch[1].trim() : 'The candidate has completed the screening. Details are in the transcript.'

      // Update DB with evaluation details
      await DB
        .prepare(`
          UPDATE job_applications
          SET
            ai_screening_completed = 1,
            ai_screening_score = ?,
            ai_screening_summary = ?,
            updated_at = datetime('now')
          WHERE id = ?
        `)
        .bind(score, summary, appData.application_id)
        .run()

      return {
        success: true,
        completed: true,
        reply: replyClean,
        chatHistory: history,
        score,
        summary
      }
    } catch (evalErr) {
      console.error('Failed to run candidate evaluation:', evalErr)
      // Fallback update so the candidate is marked as completed
      await DB
        .prepare(`
          UPDATE job_applications
          SET
            ai_screening_completed = 1,
            ai_screening_score = 75,
            ai_screening_summary = 'Candidate completed the interview. Evaluator failed to parse score.',
            updated_at = datetime('now')
          WHERE id = ?
        `)
        .bind(appData.application_id)
        .run()

      return {
        success: true,
        completed: true,
        reply: replyClean,
        chatHistory: history,
        score: 75,
        summary: 'Candidate completed the interview.'
      }
    }
  }

  return {
    success: true,
    completed: false,
    reply: replyClean,
    chatHistory: history,
    jobTitle: appData.job_title,
    companyName: appData.company_name
  }
})
