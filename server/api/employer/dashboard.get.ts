import { defineEventHandler, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  // Verify role is employer
  const user = await DB
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(userId)
    .first<{ role: string }>()

  if (!user || user.role !== 'employer') {
    throw createError({ statusCode: 403, message: 'Only employer accounts can access the dashboard API.' })
  }

  // Active jobs count
  const activeJobsResult = await DB
    .prepare("SELECT COUNT(*) as activeCount FROM jobs WHERE employer_id = ? AND status = 'active'")
    .bind(userId)
    .first<{ activeCount: number }>()

  // Applicants metrics
  const applicantsMetrics = await DB
    .prepare(`
      SELECT
        COUNT(ja.id) as totalCount,
        SUM(CASE WHEN ja.status = 'shortlisted' THEN 1 ELSE 0 END) as shortlistedCount,
        SUM(CASE WHEN ja.status = 'applied' THEN 1 ELSE 0 END) as pendingCount
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.id
      WHERE j.employer_id = ?
    `)
    .bind(userId)
    .first<any>()

  // Recent jobs
  const recentJobsResult = await DB
    .prepare(`
      SELECT 
        j.id, 
        j.title, 
        j.city, 
        j.state, 
        j.vacancies, 
        j.status,
        (SELECT COUNT(*) FROM job_applications ja WHERE ja.job_id = j.id) as applicant_count
      FROM jobs j
      WHERE j.employer_id = ?
      ORDER BY j.created_at DESC
      LIMIT 3
    `)
    .bind(userId)
    .all<any>()

  // Recent applicants list
  const recentApplicantsResult = await DB
    .prepare(`
      SELECT
        ja.id as application_id,
        ja.status as application_status,
        ja.created_at as applied_at,
        j.title as job_title,
        jp.full_name as candidate_name
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.id
      LEFT JOIN jobseeker_profiles jp ON ja.jobseeker_id = jp.user_id
      WHERE j.employer_id = ?
      ORDER BY ja.created_at DESC
      LIMIT 3
    `)
    .bind(userId)
    .all<any>()

  return {
    success: true,
    stats: {
      activeJobs: activeJobsResult?.activeCount || 0,
      totalApplicants: applicantsMetrics?.totalCount || 0,
      shortlisted: applicantsMetrics?.shortlistedCount || 0,
      pending: applicantsMetrics?.pendingCount || 0
    },
    recentJobs: recentJobsResult.results || [],
    recentApplicants: recentApplicantsResult.results || []
  }
})
