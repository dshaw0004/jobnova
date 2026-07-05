export default defineTask({
  meta: {
    name: 'govt:scrape',
    description: 'Scrapes government jobs from Employment News and saves them to D1 database',
  },
  async run({ payload, context }) {
    console.log('[Task govt:scrape] Fired. Accessing Cloudflare environment...')

    // 1. Get D1 Database binding from Cloudflare environment context
    const cf = (context as any).cloudflare
    const DB = cf?.env?.DB as D1Database | undefined

    if (!DB) {
      console.error('[Task govt:scrape] D1 Database binding (DB) is missing in context. Make sure wrangler/D1 is configured.')
      return {
        result: {
          success: false,
          error: 'Database binding (DB) is missing.',
        }
      } as any
    }

    const TARGET_URL = 'https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All'
    const HEADERS = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }

    console.log(`[Task govt:scrape] Fetching job listings from Employment News...`)

    let response: Response
    try {
      response = await fetch(TARGET_URL, { headers: HEADERS })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
    } catch (err: any) {
      console.error('[Task govt:scrape] Error accessing portal:', err)
      return {
        result: {
          success: false,
          error: `Error accessing job portal: ${err.message}`,
        }
      } as any
    }

    // 2. Parse HTML using a platform-agnostic regex parser (works in both Node.js/local and Cloudflare/production)
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
      const rowContent = match[1] || ''
      const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi
      let tdMatch
      const cols: string[] = []

      while ((tdMatch = tdRegex.exec(rowContent)) !== null) {
        const cellText = (tdMatch[1] || '')
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
          issued_date: cols[0] || '',
          organisation: cols[1] || '',
          post: cols[2] || '',
          method: cols[3] || '',
          last_date: cols[4] || '',
        })
      }
    }

    if (scrapedJobs.length === 0) {
      console.log('[Task govt:scrape] No jobs found on page or page format changed.')
      return {
        result: {
          success: true,
          scrapedCount: 0,
          newJobsCount: 0,
          message: 'No jobs found on page or page format changed.',
        }
      } as any
    }

    console.log(`[Task govt:scrape] Parsed ${scrapedJobs.length} jobs. Inserting new ones...`)

    // 3. Batch insert new jobs using D1 to minimize database roundtrips
    const insertStatements = scrapedJobs.map((job) => {
      return DB.prepare(
        `INSERT OR IGNORE INTO govt_jobs (issued_date, organisation, post, method, last_date)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(job.issued_date, job.organisation, job.post, job.method, job.last_date)
    })

    const results = await DB.batch(insertStatements)

    // Track which jobs were actually newly inserted
    const newJobs = scrapedJobs.filter((_, idx) => {
      const meta = results[idx]?.meta
      return meta && meta.changes > 0
    })

    console.log(`[Task govt:scrape] Complete. Total parsed: ${scrapedJobs.length}, New inserted: ${newJobs.length}`)

    return {
      result: {
        success: true,
        scrapedCount: scrapedJobs.length,
        newJobsCount: newJobs.length,
        newJobs,
      }
    } as any
  },
})
