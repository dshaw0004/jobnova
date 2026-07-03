import { defineEventHandler, createError, readBody } from 'h3'
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
    throw createError({ statusCode: 403, message: 'Only employer accounts can update application status.' })
  }

  const body = await readBody(event)
  const { applicationId, status } = body ?? {}

  if (!applicationId || !status) {
    throw createError({ statusCode: 400, message: 'Missing required fields (applicationId, status).' })
  }

  // Validate status value
  const allowedStatuses = ['applied', 'shortlisted', 'rejected', 'offered']
  if (!allowedStatuses.includes(status)) {
    throw createError({ statusCode: 400, message: 'Invalid status value.' })
  }

  // Verify the job application belongs to a job posted by this employer
  const applicationOwner = await DB
    .prepare(`
      SELECT j.employer_id 
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.id
      WHERE ja.id = ?
    `)
    .bind(applicationId)
    .first<{ employer_id: number }>()

  if (!applicationOwner) {
    throw createError({ statusCode: 404, message: 'Job application not found.' })
  }

  if (applicationOwner.employer_id !== userId) {
    throw createError({ statusCode: 403, message: 'You do not have permission to update this application.' })
  }

  // Update application status
  const updateResult = await DB
    .prepare(`
      UPDATE job_applications
      SET status = ?, updated_at = (datetime('now'))
      WHERE id = ?
    `)
    .bind(status, applicationId)
    .run()

  if (!updateResult.success) {
    throw createError({ statusCode: 500, message: 'Failed to update application status.' })
  }

  return {
    success: true,
    message: 'Application status updated successfully.'
  }
})
