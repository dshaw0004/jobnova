/**
 * GET /api/jobs/get
 * Retrieves details of a specific job posting.
 */

import { defineEventHandler, getQuery, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const query = getQuery(event)
  const id = query.id

  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing job ID.' })
  }

  const job = await DB
    .prepare('SELECT * FROM jobs WHERE id = ?')
    .bind(id)
    .first<any>()

  if (!job) {
    throw createError({ statusCode: 404, message: 'Job posting not found.' })
  }

  let parsedSkills = []
  try {
    parsedSkills = job.skills ? JSON.parse(job.skills) : []
  } catch {
    parsedSkills = []
  }

  return {
    success: true,
    job: {
      ...job,
      skills: parsedSkills
    }
  }
})
