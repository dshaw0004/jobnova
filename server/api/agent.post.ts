import { defineEventHandler, readBody, createError } from 'h3'
import { getSessionUserId } from '../utils/session'

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/chat'
const MODEL = process.env.MODEL || 'gemma3:270m'

const SYSTEM_PROMPT = `You are a helpful AI Job Agent for Job Nova. You can help jobseekers find active jobs, get details about specific jobs, and apply to jobs on their behalf.
You have access to tools:
- list_jobs: Lists all active job postings. Optionally takes a search term.
- get_job_details: Gets detailed information about a specific job posting given its ID.
- apply_job: Applies to a specific job given its ID on behalf of the user.

Use the tools provided to help the user. If the user asks for a job, use list_jobs. If they want more info, use get_job_details. If they want to apply, use apply_job.
Keep your responses professional, concise, and helpful.`

interface ToolCall {
  function: {
    name: string
    arguments: Record<string, unknown>
  }
}

interface OllamaMessage {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string
  tool_calls?: ToolCall[]
}

const tools = [
  {
    type: 'function',
    function: {
      name: 'list_jobs',
      description: 'Lists active job postings. Use this when the user is looking for jobs.',
      parameters: {
        type: 'object',
        properties: {
          search: {
            type: 'string',
            description: 'Optional search keyword to filter jobs by title, skills, or company name.'
          }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_job_details',
      description: 'Gets detailed information about a specific job posting. Use this when the user asks for more details about a specific job.',
      parameters: {
        type: 'object',
        properties: {
          jobId: {
            type: 'number',
            description: 'The ID of the job.'
          }
        },
        required: ['jobId']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'apply_job',
      description: 'Applies to a specific job on behalf of the user.',
      parameters: {
        type: 'object',
        properties: {
          jobId: {
            type: 'number',
            description: 'The ID of the job to apply to.'
          }
        },
        required: ['jobId']
      }
    }
  }
]

async function callOllamaWithTools(messages: OllamaMessage[]): Promise<Record<string, unknown>> {
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages,
      tools,
      stream: false,
      options: {
        temperature: 0.3
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Ollama returned ${response.status}: ${await response.text()}`)
  }

  return response.json()
}

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  // Verify user is jobseeker
  const user = await DB
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(userId)
    .first<{ role: string }>()

  if (!user || user.role !== 'jobseeker') {
    throw createError({ statusCode: 403, message: 'Only jobseekers can use the job agent.' })
  }

  const body = await readBody(event)
  const { message } = body ?? {}

  if (!message || typeof message !== 'string' || !message.trim()) {
    throw createError({ statusCode: 400, message: 'Message cannot be empty.' })
  }

  // 1. Store user message
  await DB
    .prepare('INSERT INTO agent_messages (user_id, role, content) VALUES (?, \'user\', ?)')
    .bind(userId, message.trim())
    .run()

  // 2. Fetch history
  const historyRes = await DB
    .prepare('SELECT role, content FROM agent_messages WHERE user_id = ? ORDER BY created_at ASC')
    .bind(userId)
    .all<{ role: string, content: string }>()

  const history = historyRes.results || []

  // 3. Build messages array
  const ollamaMessages: OllamaMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))
  ]

  let responseData
  try {
    responseData = await callOllamaWithTools(ollamaMessages)
  } catch (err) {
    console.error('Ollama error:', err)
    // To allow UI testing without actual running LLM, fake response when error occurs.
    responseData = {
      message: {
        role: 'assistant',
        content: 'Sorry, the AI service is currently down, but the endpoints have successfully been hit.'
      }
    }
  }

  let aiMessage = responseData.message

  // 4. Handle tool calls if any
  if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
    ollamaMessages.push(aiMessage)

    for (const toolCall of aiMessage.tool_calls) {
      const name = toolCall.function.name
      const args = toolCall.function.arguments
      let resultStr = ''

      if (name === 'list_jobs') {
        const search = args.search ? String(args.search).trim() : ''
        let sql = `SELECT j.id, j.title, j.city, ep.company_name FROM jobs j LEFT JOIN employer_profiles ep ON j.employer_id = ep.user_id WHERE j.status = 'active'`
        const params: any[] = []
        if (search) {
          sql += ' AND (j.title LIKE ? OR j.skills LIKE ? OR ep.company_name LIKE ?)'
          params.push(`%${search}%`, `%${search}%`, `%${search}%`)
        }
        sql += ' ORDER BY j.created_at DESC LIMIT 10'
        const res = await DB.prepare(sql).bind(...params).all<Record<string, unknown>>()
        resultStr = JSON.stringify(res.results || [])
      } else if (name === 'get_job_details') {
        const jobId = args.jobId
        if (jobId) {
          const sql = `SELECT j.*, ep.company_name FROM jobs j LEFT JOIN employer_profiles ep ON j.employer_id = ep.user_id WHERE j.id = ?`
          const res = await DB.prepare(sql).bind(jobId).first<Record<string, unknown>>()
          resultStr = res ? JSON.stringify(res) : JSON.stringify({ error: 'Job not found' })
        } else {
          resultStr = JSON.stringify({ error: 'jobId is required' })
        }
      } else if (name === 'apply_job') {
        const jobId = args.jobId
        if (jobId) {
          // Check if active
          const job = await DB.prepare('SELECT id, status FROM jobs WHERE id = ?').bind(jobId).first<{ id: number, status: string }>()
          if (!job || job.status !== 'active') {
            resultStr = JSON.stringify({ error: 'Job not found or not active.' })
          } else {
            // Check if already applied
            const existing = await DB.prepare('SELECT id FROM job_applications WHERE job_id = ? AND jobseeker_id = ?').bind(jobId, userId).first()
            if (existing) {
              resultStr = JSON.stringify({ error: 'You have already applied for this job.' })
            } else {
              const res = await DB.prepare('INSERT INTO job_applications (job_id, jobseeker_id, status) VALUES (?, ?, \'applied\')').bind(jobId, userId).run()
              if (res.success) {
                resultStr = JSON.stringify({ success: true, message: 'Application submitted successfully.' })
              } else {
                resultStr = JSON.stringify({ error: 'Failed to apply' })
              }
            }
          }
        } else {
          resultStr = JSON.stringify({ error: 'jobId is required' })
        }
      } else {
        resultStr = JSON.stringify({ error: 'Unknown function' })
      }

      ollamaMessages.push({
        role: 'tool',
        content: resultStr
      })
    }

    // Call Ollama again with tool results
    try {
      const finalResponse = await callOllamaWithTools(ollamaMessages)
      aiMessage = finalResponse.message
    } catch (err) {
      console.error('Ollama error (final):', err)
      aiMessage = {
        role: 'assistant',
        content: 'Sorry, the AI service is currently down, but tool execution works.'
      }
    }
  }

  // 5. Save assistant response
  await DB
    .prepare('INSERT INTO agent_messages (user_id, role, content) VALUES (?, \'assistant\', ?)')
    .bind(userId, aiMessage.content || '')
    .run()

  return {
    reply: aiMessage.content || ''
  }
})
