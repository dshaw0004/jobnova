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

  let profile = null
  if (user.role === 'jobseeker') {
    profile = await DB
      .prepare(`
        SELECT
          full_name, phone, location, about_self, academic_info, professional_info,
          sector, sector_reason, team_scenario_answer,
          completeness_score, onboarding_completed, onboarding_skipped, updated_at,
          skills, photo_url, resume_url, resume_name
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
      if (typeof profile.skills === 'string') {
        try { profile.skills = JSON.parse(profile.skills) } catch { profile.skills = [] }
      } else if (!profile.skills) {
        profile.skills = []
      }
    }
  } else if (user.role === 'employer') {
    profile = await DB
      .prepare(`
        SELECT
          company_name, company_type, industry_type,
          executive_name, executive_phone, description,
          address, pincode, country, state, city, is_approved, logo_url, updated_at
        FROM employer_profiles
        WHERE user_id = ?
      `)
      .bind(userId)
      .first<any>()
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
