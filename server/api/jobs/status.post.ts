/**
 * POST /api/jobs/status
 * Updates the status (active, draft, expired) of a job posting.
 */

import { defineEventHandler, readBody, createError } from 'h3'
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
    throw createError({ statusCode: 403, message: 'Only employer accounts can manage jobs.' })
  }

  const body = await readBody(event)
  const { id, status } = body ?? {}

  if (!id || !status) {
    throw createError({ statusCode: 400, message: 'Missing required fields (id, status).' })
  }

  if (!['active', 'draft', 'expired'].includes(status)) {
    throw createError({ statusCode: 400, message: 'Invalid status value.' })
  }

  // Verify ownership
  const job = await DB
    .prepare('SELECT id, employer_id FROM jobs WHERE id = ?')
    .bind(id)
    .first<{ id: number; employer_id: number }>()

  if (!job) {
    throw createError({ statusCode: 404, message: 'Job posting not found.' })
  }

  if (job.employer_id !== userId) {
    throw createError({ statusCode: 403, message: 'You are not authorized to modify this job posting.' })
  }

  const result = await DB
    .prepare('UPDATE jobs SET status = ?, updated_at = datetime(\'now\') WHERE id = ?')
    .bind(status, id)
    .run()

  if (!result.success) {
    throw createError({ statusCode: 500, message: 'Failed to update job status.' })
  }

  return {
    success: true,
    message: `Job status updated to ${status} successfully.`
  }
})
