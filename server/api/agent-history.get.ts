import { defineEventHandler, createError } from 'h3'
import { getSessionUserId } from '../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  // Fetch history
  const historyRes = await DB
    .prepare('SELECT role, content FROM agent_messages WHERE user_id = ? ORDER BY created_at ASC')
    .bind(userId)
    .all<{ role: string; content: string }>()

  return historyRes.results || []
})
