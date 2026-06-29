/**
 * POST /api/jobs/delete
 * Deletes a job posting.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  const body = await readBody(event)
  const { id } = body ?? {}

  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing job ID.' })
  }

  // Verify the job exists and belongs to this employer
  const job = await DB
    .prepare('SELECT id, employer_id FROM jobs WHERE id = ?')
    .bind(id)
    .first<{ id: number; employer_id: number }>()

  if (!job) {
    throw createError({ statusCode: 404, message: 'Job not found.' })
  }

  if (job.employer_id !== userId) {
    throw createError({ statusCode: 403, message: 'You are not authorized to delete this job posting.' })
  }

  // Delete the job posting
  const result = await DB
    .prepare('DELETE FROM jobs WHERE id = ?')
    .bind(id)
    .run()

  if (!result.success) {
    throw createError({ statusCode: 500, message: 'Failed to delete job posting.' })
  }

  return {
    success: true,
    message: 'Job posting deleted successfully.'
  }
})
