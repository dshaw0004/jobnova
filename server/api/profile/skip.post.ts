/**
 * POST /api/profile/skip
 * Marks the jobseeker's onboarding as skipped so they can return later.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

function calcCompleteness(profile: Record<string, any>): number {
  const weights: Record<string, number> = {
    full_name: 10,
    about_self: 10,
    academic_info: 15,
    professional_info: 15,
    sector: 10,
    skills: 15,
    photo_url: 10,
    resume_url: 15
  }

  let score = 0
  for (const [key, weight] of Object.entries(weights)) {
    const val = profile[key]
    if (val === null || val === undefined || val === '') continue
    if (Array.isArray(val) && val.length === 0) continue
    score += weight
  }
  return score
}

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  const body = (await readBody(event)) || {}
  const completeness = calcCompleteness(body)

  const fieldsToSet: string[] = []
  const bindings: unknown[] = []

  const stringFields = [
    'full_name',
    'phone',
    'location',
    'about_self',
    'sector',
    'sector_reason',
    'team_scenario_answer',
    'photo_url',
    'resume_url',
    'resume_name'
  ] as const

  for (const field of stringFields) {
    if (body[field] !== undefined && body[field] !== '') {
      fieldsToSet.push(`${field} = ?`)
      bindings.push(body[field])
    }
  }

  const arrayFields = ['academic_info', 'professional_info', 'skills'] as const
  for (const field of arrayFields) {
    if (body[field] !== undefined && (Array.isArray(body[field]) ? body[field].length > 0 : body[field] !== '')) {
      fieldsToSet.push(`${field} = ?`)
      bindings.push(Array.isArray(body[field]) ? JSON.stringify(body[field]) : String(body[field]))
    }
  }

  // Always set onboarding_skipped = 1, completeness_score, updated_at
  fieldsToSet.push('onboarding_skipped = 1')
  fieldsToSet.push('completeness_score = ?')
  bindings.push(completeness)
  fieldsToSet.push('updated_at = datetime(\'now\')')

  // Add userId as final binding parameter
  bindings.push(userId)

  await DB
    .prepare(`
      UPDATE jobseeker_profiles
      SET ${fieldsToSet.join(', ')}
      WHERE user_id = ?
    `)
    .bind(...bindings)
    .run()

  return { success: true, completeness }
})
