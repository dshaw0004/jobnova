/**
 * GET /api/employers/profile
 * Retrieves public information for an employer company and their active job listings.
 */

import { defineEventHandler, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }
  const query = getQuery(event)
  const employerId = query.id

  if (!employerId) {
    throw createError({ statusCode: 400, message: 'Employer ID is required.' })
  }

  // 1. Fetch employer company details
  const company = await DB
    .prepare(`
      SELECT 
        user_id as id,
        company_name,
        industry_type as industry,
        city as location,
        description as about_company,
        logo_url,
        NULL as website,
        NULL as founded_in,
        NULL as team_size
      FROM employer_profiles
      WHERE user_id = ?
    `)
    .bind(employerId)
    .first<any>()

  if (!company) {
    throw createError({ statusCode: 404, message: 'Employer profile not found.' })
  }

  // 2. Fetch active jobs posted by this employer
  const jobsResult = await DB
    .prepare(`
      SELECT 
        id,
        title,
        city,
        state,
        exp_min,
        exp_max,
        sal_min,
        sal_max,
        'Full Time' as job_type,
        created_at
      FROM jobs
      WHERE employer_id = ? AND status = 'active'
      ORDER BY created_at DESC
    `)
    .bind(employerId)
    .all<any>()

  return {
    success: true,
    company,
    jobs: jobsResult.results || []
  }
})
