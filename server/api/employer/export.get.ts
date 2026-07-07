/**
 * GET /api/employer/export
 * Exports all applications for an employer's jobs as CSV.
 */

import { defineEventHandler, getQuery, createError, setHeader } from 'h3'
import { getSessionUserId } from '../../utils/session'

function escapeCsvField(value: any): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return dateStr
  }
}

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  const user = await DB
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(userId)
    .first<{ role: string }>()

  if (!user || user.role !== 'employer') {
    throw createError({ statusCode: 403, message: 'Only employer accounts can export applications.' })
  }

  const query = getQuery(event)
  const jobIdFilter = query.jobId ? Number(query.jobId) : null
  const statusFilter = query.status ? String(query.status) : ''

  let sql = `
    SELECT
      ja.id as application_id,
      ja.status as application_status,
      ja.created_at as applied_at,
      ja.cover_letter,
      j.id as job_id,
      j.title as job_title,
      u.email as candidate_email,
      jp.full_name as candidate_name,
      jp.sector as candidate_sector,
      jp.location as candidate_location,
      jp.experience_years as candidate_experience
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

  sql += ' ORDER BY ja.created_at DESC'

  const result = await DB.prepare(sql).bind(...params).all<any>()
  const applications = result.results || []

  // Build CSV
  const headers = [
    'Application ID',
    'Candidate Name',
    'Candidate Email',
    'Job Title',
    'Sector',
    'Location',
    'Experience',
    'Status',
    'Applied Date',
    'Cover Letter'
  ]

  const rows = applications.map(app => [
    app.application_id,
    app.candidate_name || 'N/A',
    app.candidate_email || 'N/A',
    app.job_title || 'N/A',
    app.candidate_sector || 'N/A',
    app.candidate_location || 'N/A',
    app.candidate_experience ?? 'N/A',
    app.application_status || 'N/A',
    formatDate(app.applied_at),
    app.cover_letter || ''
  ].map(escapeCsvField).join(','))

  const csv = [headers.join(','), ...rows].join('\n')

  setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
  setHeader(event, 'Content-Disposition', `attachment; filename="applications_export_${Date.now()}.csv"`)

  return csv
})
