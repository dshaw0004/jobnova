/**
 * POST /api/auth/login
 * Authenticates a jobseeker with email and password.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { verifyPassword } from '../../utils/hash'
import { setSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const body = await readBody(event)
  const { email, password } = body ?? {}

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required.' })
  }

  // --- Fetch user ---
  const user = await DB
    .prepare('SELECT id, password FROM users WHERE email = ?')
    .bind(email.toLowerCase().trim())
    .first<{ id: number; password: string }>()

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid email or password.' })
  }

  // --- Verify password ---
  const valid = await verifyPassword(password, user.password)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Invalid email or password.' })
  }

  // --- Set session cookie ---
  setSessionUserId(event, user.id)

  // --- Return profile completeness so client can route properly ---
  const profile = await DB
    .prepare('SELECT completeness_score, onboarding_completed, onboarding_skipped FROM jobseeker_profiles WHERE user_id = ?')
    .bind(user.id)
    .first<{ completeness_score: number; onboarding_completed: number; onboarding_skipped: number }>()

  return {
    success: true,
    userId: user.id,
    profile: profile ?? { completeness_score: 0, onboarding_completed: 0, onboarding_skipped: 0 }
  }
})
