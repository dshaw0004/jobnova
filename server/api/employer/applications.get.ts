import { defineEventHandler, createError, getQuery } from 'h3'
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
    throw createError({ statusCode: 403, message: 'Only employer accounts can view applicants.' })
  }

  const query = getQuery(event)
  const statusFilter = query.status ? String(query.status) : ''
  const searchFilter = query.search ? String(query.search) : ''
  const jobIdFilter = query.jobId ? Number(query.jobId) : null

  // Fetch applications
  let sql = `
    SELECT
      ja.id as application_id,
      ja.status as application_status,
      ja.created_at as applied_at,
      j.id as job_id,
      j.title as job_title,
      u.email as candidate_email,
      jp.full_name as candidate_name,
      jp.sector as candidate_sector,
      jp.location as candidate_location,
      jp.academic_info as candidate_academic,
      jp.professional_info as candidate_professional
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    JOIN users u ON ja.jobseeker_id = u.id
    LEFT JOIN jobseeker_profiles jp ON ja.jobseeker_id = jp.user_id
    WHERE j.employer_id = ?
  `
  const params: any[] = [userId]

  if (statusFilter) {
    sql += ' AND ja.status = ?'
    params.push(statusFilter)
  }

  if (jobIdFilter) {
    sql += ' AND j.id = ?'
    params.push(jobIdFilter)
  }

  if (searchFilter) {
    sql += ' AND (jp.full_name LIKE ? OR j.title LIKE ?)'
    params.push(`%${searchFilter}%`, `%${searchFilter}%`)
  }

  sql += ' ORDER BY ja.created_at DESC'

  const result = await DB.prepare(sql).bind(...params).all<any>()
  const applications = result.results || []

  // Fetch summary counts for the employer's jobs
  const summaryResult = await DB
    .prepare(`
      SELECT
        COUNT(*) as totalCount,
        SUM(CASE WHEN ja.status = 'applied' THEN 1 ELSE 0 END) as appliedCount,
        SUM(CASE WHEN ja.status = 'shortlisted' THEN 1 ELSE 0 END) as shortlistedCount,
        SUM(CASE WHEN ja.status = 'rejected' THEN 1 ELSE 0 END) as rejectedCount
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.id
      WHERE j.employer_id = ?
    `)
    .bind(userId)
    .first<any>()

  const summary = {
    total: summaryResult?.totalCount || 0,
    applied: summaryResult?.appliedCount || 0,
    shortlisted: summaryResult?.shortlistedCount || 0,
    rejected: summaryResult?.rejectedCount || 0
  }

  // Fetch jobs list for the employer to populate dropdown filters
  const jobsResult = await DB
    .prepare('SELECT id, title FROM jobs WHERE employer_id = ? ORDER BY created_at DESC')
    .bind(userId)
    .all<{ id: number; title: string }>()

  return {
    success: true,
    applications,
    summary,
    jobs: jobsResult.results || []
  }
})
