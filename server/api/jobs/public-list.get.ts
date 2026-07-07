/**
 * GET /api/jobs/public-list
 * Retrieves all active job postings for jobseekers.
 */

import { defineEventHandler, getQuery } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  const query = getQuery(event)

  const search = query.search ? String(query.search).trim() : ''
  const location = query.location ? String(query.location).trim() : ''
  const experience = query.experience ? String(query.experience) : ''
  const industry = query.industry ? String(query.industry) : ''

  // Build query
  let sql = `
    SELECT
      j.*,
      ep.company_name,
      ep.company_type,
      ep.industry_type as company_industry
    FROM jobs j
    LEFT JOIN employer_profiles ep ON j.employer_id = ep.user_id
    WHERE j.status = 'active' AND (j.expiry_date IS NULL OR date(j.expiry_date) >= date('now'))
  `
  const params: any[] = []

  if (search) {
    sql += ' AND (j.title LIKE ? OR j.skills LIKE ? OR ep.company_name LIKE ?)'
    params.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }

  if (location) {
    sql += ' AND (j.city LIKE ? OR j.state LIKE ?)'
    params.push(`%${location}%`, `%${location}%`)
  }

  if (experience && experience !== 'Experience') {
    if (experience === 'Fresher') {
      sql += ' AND (j.exp_min IS NULL OR j.exp_min = 0)'
    } else if (experience === '1-3 Years') {
      sql += ' AND j.exp_min >= 1 AND j.exp_min <= 3'
    } else if (experience === '3-5 Years') {
      sql += ' AND j.exp_min >= 3 AND j.exp_min <= 5'
    } else if (experience === '5+ Years') {
      sql += ' AND j.exp_min >= 5'
    }
  }

  if (industry) {
    sql += ' AND j.industry = ?'
    params.push(industry)
  }

  sql += ' ORDER BY j.created_at DESC'

  const result = await DB.prepare(sql).bind(...params).all<any>()
  const rawJobs = result.results || []

  // Check which jobs the authenticated jobseeker has already applied to
  let appliedJobIds: number[] = []
  if (userId) {
    const apps = await DB
      .prepare('SELECT job_id FROM job_applications WHERE jobseeker_id = ?')
      .bind(userId)
      .all<{ job_id: number }>()
    appliedJobIds = (apps.results || []).map(a => a.job_id)
  }

  const jobs = rawJobs.map(job => {
    let parsedSkills = []
    try {
      parsedSkills = job.skills ? JSON.parse(job.skills) : []
    } catch {
      parsedSkills = []
    }
    return {
      ...job,
      skills: parsedSkills,
      hasApplied: appliedJobIds.includes(job.id)
    }
  })

  return {
    success: true,
    jobs
  }
})
