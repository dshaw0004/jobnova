/**
 * POST /api/jobs/withdraw
 * Withdraws the authenticated jobseeker's application from a job.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Please log in to withdraw your application.' })
  }

  // Verify the user is a jobseeker
  const user = await DB
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(userId)
    .first<{ role: string }>()

  if (!user || user.role !== 'jobseeker') {
    throw createError({ statusCode: 403, message: 'Only jobseeker accounts can withdraw applications.' })
  }

  const body = await readBody(event)
  const { applicationId } = body ?? {}

  if (!applicationId) {
    throw createError({ statusCode: 400, message: 'Missing application ID.' })
  }

  // Verify the application belongs to this jobseeker
  const application = await DB
    .prepare('SELECT id, jobseeker_id, status FROM job_applications WHERE id = ?')
    .bind(applicationId)
    .first<{ id: number; jobseeker_id: number; status: string }>()

  if (!application) {
    throw createError({ statusCode: 404, message: 'Application not found.' })
  }

  if (application.jobseeker_id !== userId) {
    throw createError({ statusCode: 403, message: 'You are not authorized to withdraw this application.' })
  }

  // Only allow withdrawal if still in 'applied' state
  if (application.status !== 'applied') {
    throw createError({ statusCode: 400, message: 'You can only withdraw applications that are still under review.' })
  }

  const result = await DB
    .prepare('DELETE FROM job_applications WHERE id = ?')
    .bind(applicationId)
    .run()

  if (!result.success) {
    throw createError({ statusCode: 500, message: 'Failed to withdraw application.' })
  }

  return {
    success: true,
    message: 'Application withdrawn successfully.'
  }
})
