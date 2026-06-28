/**
 * POST /api/profile/skip
 * Marks the jobseeker's onboarding as skipped so they can return later.
 */

import { defineEventHandler, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  await DB
    .prepare(`
      UPDATE jobseeker_profiles
      SET onboarding_skipped = 1, updated_at = datetime('now')
      WHERE user_id = ?
    `)
    .bind(userId)
    .run()

  return { success: true }
})
