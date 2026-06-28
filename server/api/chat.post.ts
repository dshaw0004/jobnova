/**
 * POST /api/chat
 * Main AI chatbot endpoint.
 * - Stores the user message.
 * - Sends full conversation history to Ollama (gemma3:270m).
 * - Stores AI response.
 * - Asynchronously extracts structured profile data from the conversation.
 * - Updates jobseeker_profiles with any newly extracted data.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { getSessionUserId } from '../utils/session'

// ─── Types ────────────────────────────────────────────────────────────────────

interface OllamaMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ExtractedProfile {
  full_name?: string
  about_self?: string
  academic_info?: Array<{ degree: string; institution: string; year?: string; grade?: string }>
  professional_info?: Array<{ company: string; role: string; duration?: string; description?: string }>
  sector?: string
  sector_reason?: string
  team_scenario_answer?: string
}

// ─── System Prompts ───────────────────────────────────────────────────────────

const INTERVIEW_SYSTEM_PROMPT = `You are Aria, a warm and professional HR interviewer at Job Nova — India's premier career platform. Your mission is to conduct a friendly, conversational interview to build a rich profile for the job seeker.

Follow this interview flow sequentially. Do NOT ask multiple questions at once — ask one question, wait for the response, then move to the next.

**Interview Flow:**
1. Greet the candidate warmly and ask for their full name.
2. Ask them to introduce themselves ("Tell me about yourself" — this covers personality, strengths, hobbies, and what drives them).
3. Ask about their educational background (degrees, institutions, graduation years, any notable achievements or grades).
4. Ask about professional experience. If they are a fresher, ask about internships, projects, or academic achievements instead.
5. Ask which sector they want to build their career in (e.g., Software Engineering, Finance, Healthcare, Marketing, etc.) and why they chose that specific sector.
6. Ask a team collaboration scenario question: "Can you describe a situation where you had to work with a difficult team member or in a challenging team environment? How did you handle it and what was the outcome?"
7. Once all the above are covered, warmly close the interview by congratulating them on completing their profile and encouraging them to explore job listings.

**Guidelines:**
- Be conversational and encouraging, not robotic.
- Acknowledge their answers briefly before asking the next question.
- Keep responses concise (2-4 sentences max per turn).
- Never reveal that you are extracting data for a database.
- If the answer to a question is too brief or vague, gently ask a follow-up for more details before moving on.
- Maintain a consistent, professional yet friendly tone throughout.`

const EXTRACTION_SYSTEM_PROMPT = `You are a data extraction assistant. Given a conversation between an HR interviewer (Aria) and a job seeker, extract structured information and return it as valid JSON only. No explanation, no markdown — just raw JSON.

Extract these fields (use null if not mentioned):
{
  "full_name": "string or null",
  "about_self": "string summary or null",
  "academic_info": [{ "degree": "string", "institution": "string", "year": "string or null", "grade": "string or null" }],
  "professional_info": [{ "company": "string", "role": "string", "duration": "string or null", "description": "string or null" }],
  "sector": "string or null",
  "sector_reason": "string or null",
  "team_scenario_answer": "string or null"
}`

// ─── Ollama Helper ────────────────────────────────────────────────────────────

const OLLAMA_URL = 'http://localhost:11434/api/chat'
const MODEL = 'gemma3:270m'

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

// ─── Profile Completeness Calculator ─────────────────────────────────────────

function calcCompleteness(profile: ExtractedProfile): number {
  const weights: Record<keyof ExtractedProfile, number> = {
    full_name: 15,
    about_self: 15,
    academic_info: 20,
    professional_info: 20,
    sector: 10,
    sector_reason: 10,
    team_scenario_answer: 10
  }

  let score = 0
  for (const [key, weight] of Object.entries(weights) as [keyof ExtractedProfile, number][]) {
    const val = profile[key]
    if (val === null || val === undefined || val === '') continue
    if (Array.isArray(val) && val.length === 0) continue
    score += weight
  }
  return score
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  const body = await readBody(event)
  const { message } = body ?? {}

  if (!message || typeof message !== 'string' || !message.trim()) {
    throw createError({ statusCode: 400, message: 'Message cannot be empty.' })
  }

  // 1. Store user message
  await DB
    .prepare('INSERT INTO chat_messages (user_id, role, content) VALUES (?, ?, ?)')
    .bind(userId, 'user', message.trim())
    .run()

  // 2. Load full conversation history
  const { results } = await DB
    .prepare('SELECT role, content FROM chat_messages WHERE user_id = ? ORDER BY created_at ASC')
    .bind(userId)
    .all<{ role: string; content: string }>()

  const history = results || []

  // 3. Build messages array for Ollama
  const ollamaMessages: OllamaMessage[] = [
    { role: 'system', content: INTERVIEW_SYSTEM_PROMPT },
    ...history.map((m: any) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
  ]

  // 4. Get AI response
  let aiReply = ''
  try {
    aiReply = await callOllama(ollamaMessages)
  }
  catch (err) {
    console.error('Ollama error:', err)
    throw createError({
      statusCode: 502,
      message: 'AI service is currently unavailable. Please try again in a moment.'
    })
  }

  // 5. Store AI response
  await DB
    .prepare('INSERT INTO chat_messages (user_id, role, content) VALUES (?, ?, ?)')
    .bind(userId, 'assistant', aiReply)
    .run()

  // 6. Extract profile data from conversation (non-blocking — best effort)
  let updatedProfile: ExtractedProfile = {}
  try {
    const conversationText = history
      .map((m: any) => `${m.role === 'user' ? 'Job Seeker' : 'Aria'}: ${m.content}`)
      .join('\n')

    const extractionMessages: OllamaMessage[] = [
      { role: 'system', content: EXTRACTION_SYSTEM_PROMPT },
      { role: 'user', content: `Extract data from this interview conversation:\n\n${conversationText}` }
    ]

    const extractedRaw = await callOllama(extractionMessages)

    // Find the JSON object in the response (model may include some stray text)
    const jsonMatch = extractedRaw.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      updatedProfile = JSON.parse(jsonMatch[0]) as ExtractedProfile
    }
  }
  catch (err) {
    // Extraction failure is non-fatal — we still return the AI reply
    console.warn('Profile extraction failed:', err)
  }

  // 7. Update profile in DB if we extracted anything
  const completeness = calcCompleteness(updatedProfile)
  if (Object.keys(updatedProfile).length > 0) {
    const fieldsToSet: string[] = []
    const bindings: unknown[] = []

    const textFields = ['full_name', 'about_self', 'sector', 'sector_reason', 'team_scenario_answer'] as const
    for (const field of textFields) {
      if (updatedProfile[field] != null) {
        fieldsToSet.push(`${field} = ?`)
        bindings.push(updatedProfile[field])
      }
    }

    if (updatedProfile.academic_info && updatedProfile.academic_info.length > 0) {
      fieldsToSet.push('academic_info = ?')
      bindings.push(JSON.stringify(updatedProfile.academic_info))
    }
    if (updatedProfile.professional_info && updatedProfile.professional_info.length > 0) {
      fieldsToSet.push('professional_info = ?')
      bindings.push(JSON.stringify(updatedProfile.professional_info))
    }

    if (fieldsToSet.length > 0) {
      fieldsToSet.push('completeness_score = ?', 'updated_at = datetime(\'now\')')
      bindings.push(completeness, userId)

      await DB
        .prepare(`UPDATE jobseeker_profiles SET ${fieldsToSet.join(', ')} WHERE user_id = ?`)
        .bind(...bindings)
        .run()
    }
  }

  return {
    reply: aiReply,
    profile: updatedProfile,
    completeness
  }
})
