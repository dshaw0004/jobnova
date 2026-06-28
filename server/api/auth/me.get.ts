/**
 * GET /api/auth/me
 * Returns the current session's user info and profile state.
 * Returns 401 if not authenticated.
 */

import { defineEventHandler, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  const user = await DB
    .prepare('SELECT id, email, role, created_at FROM users WHERE id = ?')
    .bind(userId)
    .first<{ id: number; email: string; role: string; created_at: string }>()

  if (!user) {
    throw createError({ statusCode: 401, message: 'Session invalid. Please log in again.' })
  }

  const profile = await DB
    .prepare(`
      SELECT
        full_name, phone, location, about_self, academic_info, professional_info,
        sector, sector_reason, team_scenario_answer,
        completeness_score, onboarding_completed, onboarding_skipped, updated_at
      FROM jobseeker_profiles
      WHERE user_id = ?
    `)
    .bind(userId)
    .first<any>()

  if (profile) {
    if (typeof profile.academic_info === 'string') {
      try { profile.academic_info = JSON.parse(profile.academic_info) } catch { profile.academic_info = [] }
    } else if (!profile.academic_info) {
      profile.academic_info = []
    }
    if (typeof profile.professional_info === 'string') {
      try { profile.professional_info = JSON.parse(profile.professional_info) } catch { profile.professional_info = [] }
    } else if (!profile.professional_info) {
      profile.professional_info = []
    }
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.created_at
    },
    profile: profile ?? null
  }
})
