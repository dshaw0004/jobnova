/**
 * GET /api/jobs/list
 * Retrieves all job postings created by the authenticated employer.
 */

import { defineEventHandler, getQuery, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  // Verify user is an employer
  const user = await DB
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(userId)
    .first<{ role: string }>()

  if (!user || user.role !== 'employer') {
    throw createError({ statusCode: 403, message: 'Only employer accounts can list their jobs.' })
  }

  const query = getQuery(event)
  const statusFilter = query.status ? String(query.status).toLowerCase() : 'all'
  const searchFilter = query.search ? String(query.search).trim() : ''
  const sortFilter = query.sort ? String(query.sort).toLowerCase() : 'newest'

  let sql = `
    SELECT *,
      (SELECT COUNT(*) FROM job_applications ja WHERE ja.job_id = jobs.id) as applicantsCount
    FROM jobs
    WHERE employer_id = ?
  `
  const params: any[] = [userId]

  if (statusFilter !== 'all' && ['active', 'draft', 'expired'].includes(statusFilter)) {
    sql += ' AND status = ?'
    params.push(statusFilter)
  }

  if (searchFilter) {
    sql += ' AND title LIKE ?'
    params.push(`%${searchFilter}%`)
  }

  if (sortFilter === 'oldest') {
    sql += ' ORDER BY created_at ASC'
  } else {
    sql += ' ORDER BY created_at DESC'
  }

  const result = await DB
    .prepare(sql)
    .bind(...params)
    .all<any>()

  // Map jobs and parse skills
  const jobs = (result.results || []).map(job => {
    let parsedSkills = []
    try {
      parsedSkills = job.skills ? JSON.parse(job.skills) : []
    } catch {
      parsedSkills = []
    }
    return {
      ...job,
      skills: parsedSkills
    }
  })

  // Calculate summary counts for dashboard widgets
  const summaryResult = await DB
    .prepare(`
      SELECT
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as activeCount,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draftCount,
        SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) as expiredCount,
        COUNT(*) as totalCount
      FROM jobs
      WHERE employer_id = ?
    `)
    .bind(userId)
    .first<any>()

  const summary = {
    active: summaryResult?.activeCount || 0,
    draft: summaryResult?.draftCount || 0,
    expired: summaryResult?.expiredCount || 0,
    total: summaryResult?.totalCount || 0
  }

  return {
    success: true,
    jobs,
    summary
  }
})
