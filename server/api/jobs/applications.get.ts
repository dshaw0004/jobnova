/**
 * GET /api/jobs/applications
 * Retrieves all job applications submitted by the authenticated jobseeker.
 */

import { defineEventHandler, getQuery, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  // Verify the user role is jobseeker
  const user = await DB
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(userId)
    .first<{ role: string }>()

  if (!user || user.role !== 'jobseeker') {
    throw createError({ statusCode: 403, message: 'Only jobseekers can view their job applications.' })
  }

  const query = getQuery(event)
  const statusFilter = query.status ? String(query.status).toLowerCase() : ''
  const searchFilter = query.search ? String(query.search).trim() : ''

  let sql = `
    SELECT
      ja.id as application_id,
      ja.status as application_status,
      ja.created_at as applied_at,
      j.id as job_id,
      j.title as job_title,
      j.city as job_city,
      j.state as job_state,
      j.sal_min as job_sal_min,
      j.sal_max as job_sal_max,
      j.exp_min as job_exp_min,
      j.exp_max as job_exp_max,
      ep.company_name
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    LEFT JOIN employer_profiles ep ON j.employer_id = ep.user_id
    WHERE ja.jobseeker_id = ?
  `
  const params: any[] = [userId]

  if (statusFilter) {
    sql += ' AND ja.status = ?'
    params.push(statusFilter)
  }

  if (searchFilter) {
    sql += ' AND (j.title LIKE ? OR ep.company_name LIKE ?)'
    params.push(`%${searchFilter}%`, `%${searchFilter}%`)
  }

  sql += ' ORDER BY ja.created_at DESC'

  const result = await DB.prepare(sql).bind(...params).all<any>()
  const applications = result.results || []

  // Fetch summary counts
  const summaryResult = await DB
    .prepare(`
      SELECT
        COUNT(*) as totalCount,
        SUM(CASE WHEN status = 'applied' THEN 1 ELSE 0 END) as appliedCount,
        SUM(CASE WHEN status = 'shortlisted' THEN 1 ELSE 0 END) as shortlistedCount,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejectedCount,
        SUM(CASE WHEN status = 'offered' THEN 1 ELSE 0 END) as offeredCount
      FROM job_applications
      WHERE jobseeker_id = ?
    `)
    .bind(userId)
    .first<any>()

  const summary = {
    total: summaryResult?.totalCount || 0,
    applied: summaryResult?.appliedCount || 0,
    shortlisted: summaryResult?.shortlistedCount || 0,
    rejected: summaryResult?.rejectedCount || 0,
    offered: summaryResult?.offeredCount || 0
  }

  return {
    success: true,
    applications,
    summary
  }
})
