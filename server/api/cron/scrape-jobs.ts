import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
  // 1. Get D1 Database binding from Cloudflare environment
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }
  if (!DB) {
    throw createError({
      statusCode: 500,
      message: 'Database binding (DB) is missing. Make sure wrangler/D1 is configured properly.',
    })
  }

  // 2. Validate cron secret to authorize the scheduled job run
  const config = useRuntimeConfig()
  const authHeader = event.headers.get('Authorization')
  const expectedSecret = config.cronSecret || process.env.CRON_SECRET || 'local-development-secret-key'
  
  if (authHeader !== `Bearer ${expectedSecret}`) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized. Invalid CRON_SECRET token.',
    })
  }

  const TARGET_URL = 'https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All'
  const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }

  console.log(`[${new Date().toISOString()}] Fetching job listings from Employment News...`)

  let response: Response
  try {
    response = await fetch(TARGET_URL, { headers: HEADERS })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (err: any) {
    console.error('Error accessing portal:', err)
    throw createError({
      statusCode: 502,
      message: `Error accessing job portal: ${err.message}`,
    })
  }

  // 3. Parse HTML using a platform-agnostic regex parser (works in both Node.js/local and Cloudflare/production)
  const html = await response.text()
  const scrapedJobs: Array<{
    issued_date: string
    organisation: string
    post: string
    method: string
    last_date: string
  }> = []

  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
  let match
  let isHeader = true

  while ((match = trRegex.exec(html)) !== null) {
    const rowContent = match[1]
    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi
    let tdMatch
    const cols: string[] = []

    while ((tdMatch = tdRegex.exec(rowContent)) !== null) {
      const cellText = tdMatch[1]
        .replace(/<[^>]+>/g, '') // Strip inner HTML tags
        .replace(/&nbsp;/g, ' ') // Replace HTML non-breaking spaces
        .trim()
      cols.push(cellText)
    }

    if (cols.length >= 5) {
      if (isHeader) {
        isHeader = false // Skip table header row
        continue
      }
      scrapedJobs.push({
        issued_date: cols[0],
        organisation: cols[1],
        post: cols[2],
        method: cols[3],
        last_date: cols[4],
      })
    }
  }

  if (scrapedJobs.length === 0) {
    return {
      success: true,
      inserted: 0,
      message: 'No jobs found on page or page format changed.',
    }
  }

  // 4. Batch insert new jobs using D1 to minimize database roundtrips
  const insertStatements = scrapedJobs.map((job) => {
    return DB.prepare(
      `INSERT OR IGNORE INTO govt_jobs (issued_date, organisation, post, method, last_date)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(job.issued_date, job.organisation, job.post, job.method, job.last_date)
  })

  // D1 executes batched statements inside a single transaction
  const results = await DB.batch(insertStatements)

  // Track which jobs were actually newly inserted
  const newJobs = scrapedJobs.filter((_, idx) => {
    const meta = results[idx]?.meta
    return meta && meta.changes > 0
  })

  console.log(`Scraping complete. Found ${newJobs.length} new jobs.`)

  return {
    success: true,
    scrapedCount: scrapedJobs.length,
    newJobsCount: newJobs.length,
    newJobs,
  }
})
