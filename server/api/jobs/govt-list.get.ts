/**
 * GET /api/jobs/govt-list
 * Retrieves scraped government job listings from the D1 database.
 */

import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }
  if (!DB) {
    return {
      success: false,
      message: 'Database binding (DB) is missing.',
      jobs: []
    }
  }

  const query = getQuery(event)
  const search = query.search ? String(query.search).trim() : ''
  const organisation = query.organisation ? String(query.organisation).trim() : ''
  const limit = query.limit ? Math.min(parseInt(String(query.limit)), 100) : 50

  let sql = 'SELECT * FROM govt_jobs WHERE 1=1'
  const params: any[] = []

  if (search) {
    sql += ' AND (organisation LIKE ? OR post LIKE ? OR method LIKE ?)'
    params.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }

  if (organisation) {
    sql += ' AND organisation LIKE ?'
    params.push(`%${organisation}%`)
  }

  sql += ' ORDER BY scraped_at DESC LIMIT ?'
  params.push(limit)

  try {
    const result = await DB.prepare(sql).bind(...params).all<any>()
    const jobs = result.results || []

    return {
      success: true,
      jobs
    }
  } catch (error: any) {
    console.error('Error fetching government jobs:', error)
    return {
      success: false,
      message: error.message || 'Failed to fetch government jobs',
      jobs: []
    }
  }
})
