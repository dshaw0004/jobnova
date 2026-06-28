/**
 * GET /api/profile
 * Returns the current extracted jobseeker profile.
 */

import { defineEventHandler, createError } from 'h3'
import { getSessionUserId } from '../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  const profile = await DB
    .prepare(`
      SELECT
        full_name, phone, location, about_self,
        academic_info, professional_info,
        sector, sector_reason, team_scenario_answer,
        completeness_score, onboarding_completed, onboarding_skipped,
        updated_at
      FROM jobseeker_profiles
      WHERE user_id = ?
    `)
    .bind(userId)
    .first()

  if (!profile) {
    throw createError({ statusCode: 404, message: 'Profile not found.' })
  }

  // Parse JSON fields
  return {
    ...profile,
    academic_info: profile.academic_info ? JSON.parse(profile.academic_info as string) : [],
    professional_info: profile.professional_info ? JSON.parse(profile.professional_info as string) : []
  }
})
