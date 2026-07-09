/**
 * POST /api/jobs/update
 * Updates an existing job posting for the authenticated employer.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  // Verify the user role is employer
  const user = await DB
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(userId)
    .first<{ role: string }>()

  if (!user || user.role !== 'employer') {
    throw createError({ statusCode: 403, message: 'Only employer accounts can manage jobs.' })
  }

  const body = await readBody(event)
  const {
    id,
    title,
    functionalArea,
    industry,
    description,
    vacancies,
    expMin,
    expMax,
    salMin,
    salMax,
    country,
    state,
    city,
    ugQualification,
    pgQualification,
    skills,
    status,
    expiryDate,
    applicationDeadline,
    aiScreeningEnabled,
    aiScreeningPrompt
  } = body ?? {}

  // Basic validation
  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing job ID.' })
  }
  if (!title || !functionalArea || !industry || !description) {
    throw createError({ statusCode: 400, message: 'Missing required fields (title, functionalArea, industry, description).' })
  }

  // Verify ownership
  const job = await DB
    .prepare('SELECT id, employer_id FROM jobs WHERE id = ?')
    .bind(id)
    .first<{ id: number; employer_id: number }>()

  if (!job) {
    throw createError({ statusCode: 404, message: 'Job posting not found.' })
  }

  if (job.employer_id !== userId) {
    throw createError({ statusCode: 403, message: 'You are not authorized to update this job posting.' })
  }

  const skillsString = skills ? JSON.stringify(skills) : '[]'

  const result = await DB
    .prepare(`
      UPDATE jobs SET
        title = ?,
        functional_area = ?,
        industry = ?,
        description = ?,
        vacancies = ?,
        exp_min = ?,
        exp_max = ?,
        sal_min = ?,
        sal_max = ?,
        country = ?,
        state = ?,
        city = ?,
        ug_qualification = ?,
        pg_qualification = ?,
        skills = ?,
        status = ?,
        expiry_date = ?,
        application_deadline = ?,
        ai_screening_enabled = ?,
        ai_screening_prompt = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `)
    .bind(
      title,
      functionalArea,
      industry,
      description,
      vacancies ? Number(vacancies) : 1,
      expMin !== undefined && expMin !== '' ? Number(expMin) : null,
      expMax !== undefined && expMax !== '' ? Number(expMax) : null,
      salMin !== undefined && salMin !== '' ? Number(salMin) : null,
      salMax !== undefined && salMax !== '' ? Number(salMax) : null,
      country || 'India',
      state || null,
      city || null,
      ugQualification || null,
      pgQualification || null,
      skillsString,
      status || 'active',
      expiryDate || null,
      applicationDeadline || null,
      aiScreeningEnabled ? 1 : 0,
      aiScreeningPrompt || null,
      id
    )
    .run()

  if (!result.success) {
    throw createError({ statusCode: 500, message: 'Failed to update job posting.' })
  }

  return {
    success: true,
    message: 'Job posting updated successfully.'
  }
})
