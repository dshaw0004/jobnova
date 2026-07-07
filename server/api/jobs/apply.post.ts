/**
 * POST /api/jobs/apply
 * Applies the authenticated jobseeker to a job posting.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Please log in to apply for jobs.' })
  }

  // Verify the user is a jobseeker
  const user = await DB
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(userId)
    .first<{ role: string }>()

  if (!user || user.role !== 'jobseeker') {
    throw createError({ statusCode: 403, message: 'Only jobseeker accounts can apply for jobs.' })
  }

  const body = await readBody(event)
  const { jobId, coverLetter } = body ?? {}

  if (!jobId) {
    throw createError({ statusCode: 400, message: 'Missing job ID.' })
  }

  // Verify the job exists and is active
  const job = await DB
    .prepare("SELECT id, status, application_deadline FROM jobs WHERE id = ?")
    .bind(jobId)
    .first<{ id: number; status: string; application_deadline: string | null }>()

  if (!job) {
    throw createError({ statusCode: 404, message: 'Job posting not found.' })
  }

  if (job.status !== 'active') {
    throw createError({ statusCode: 400, message: 'This job posting is no longer active.' })
  }

  // Validate application deadline
  if (job.application_deadline) {
    const deadline = new Date(job.application_deadline)
    deadline.setHours(23, 59, 59, 999) // end of deadline day
    if (new Date() > deadline) {
      throw createError({ statusCode: 400, message: 'The application deadline for this job has passed.' })
    }
  }

  // Check if they have already applied
  const existingApp = await DB
    .prepare('SELECT id FROM job_applications WHERE job_id = ? AND jobseeker_id = ?')
    .bind(jobId, userId)
    .first()

  if (existingApp) {
    throw createError({ statusCode: 400, message: 'You have already applied for this job.' })
  }

  // Create the application
  const result = await DB
    .prepare('INSERT INTO job_applications (job_id, jobseeker_id, status, cover_letter) VALUES (?, ?, ?, ?)')
    .bind(jobId, userId, 'applied', coverLetter || null)
    .run()

  if (!result.success) {
    throw createError({ statusCode: 500, message: 'Failed to submit application.' })
  }

  return {
    success: true,
    message: 'Application submitted successfully.'
  }
})
