/**
 * POST /api/profile/update
 * Updates the current jobseeker's profile fields and recalculates completeness.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

interface ProfileUpdateBody {
  full_name?: string | null
  phone?: string | null
  location?: string | null
  about_self?: string | null
  academic_info?: any[] | null
  professional_info?: any[] | null
  sector?: string | null
  sector_reason?: string | null
  team_scenario_answer?: string | null
  skills?: any[] | null
  photo_url?: string | null
  resume_url?: string | null
  resume_name?: string | null
}

function calcCompleteness(profile: ProfileUpdateBody): number {
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
    const val = profile[key as keyof ProfileUpdateBody]
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

  const body = (await readBody(event)) as ProfileUpdateBody
  if (!body) {
    throw createError({ statusCode: 400, message: 'Request body is required.' })
  }

  // --- Recalculate completeness score ---
  const completeness = calcCompleteness(body)

  // --- Prepare SQL Update fields ---
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
    if (body[field] !== undefined) {
      fieldsToSet.push(`${field} = ?`)
      bindings.push(body[field])
    }
  }

  if (body.academic_info !== undefined) {
    fieldsToSet.push('academic_info = ?')
    bindings.push(body.academic_info ? JSON.stringify(body.academic_info) : '[]')
  }

  if (body.professional_info !== undefined) {
    fieldsToSet.push('professional_info = ?')
    bindings.push(body.professional_info ? JSON.stringify(body.professional_info) : '[]')
  }

  if (body.skills !== undefined) {
    fieldsToSet.push('skills = ?')
    bindings.push(body.skills ? JSON.stringify(body.skills) : '[]')
  }

  // Always update completeness score and updated_at
  fieldsToSet.push('completeness_score = ?')
  bindings.push(completeness)

  fieldsToSet.push('updated_at = datetime(\'now\')')

  if (completeness >= 80) {
    fieldsToSet.push('onboarding_completed = 1')
  }

  if (fieldsToSet.length === 0) {
    return { success: true, message: 'No fields to update.' }
  }

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

  return {
    success: true,
    message: 'Profile updated successfully.',
    completeness
  }
})
