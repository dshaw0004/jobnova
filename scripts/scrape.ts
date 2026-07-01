import { writeFileSync, unlinkSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

const TARGET_URL = 'https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All'
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

async function main() {
  console.log('Fetching job listings from Employment News...')
  const response = await fetch(TARGET_URL, { headers: HEADERS })
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

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
      // Escape single quotes for SQL safety
      const cellText = tdMatch[1]
        .replace(/<[^>]+>/g, '') // Strip inner HTML tags
        .replace(/&nbsp;/g, ' ') // Replace HTML non-breaking spaces
        .replace(/'/g, "''")     // Escape quotes for SQL
        .trim()
      cols.push(cellText)
    }

    if (cols.length >= 5) {
      if (isHeader) {
        isHeader = false
        continue
      }
      scrapedJobs.push({
        issued_date: cols[0],
        organisation: cols[1],
        post: cols[2],
        method: cols[3],
        last_date: cols[4]
      })
    }
  }

  if (scrapedJobs.length === 0) {
    console.log('No jobs found.')
    return
  }

  console.log(`Parsed ${scrapedJobs.length} jobs. Generating SQL script...`)

  // Generate SQL insert statements
  const sqlStatements = scrapedJobs.map(job => {
    return `INSERT OR IGNORE INTO govt_jobs (issued_date, organisation, post, method, last_date) VALUES ('${job.issued_date}', '${job.organisation}', '${job.post}', '${job.method}', '${job.last_date}');`
  }).join('\n')

  const tempFilePath = join(process.cwd(), 'temp_govt_jobs.sql')
  writeFileSync(tempFilePath, sqlStatements, 'utf-8')

  try {
    const isRemote = process.argv.includes('--remote')
    console.log(`Executing SQL queries against D1 ${isRemote ? 'production (remote)' : 'development (local)'}...`)
    
    const command = `bun wrangler d1 execute jobnova_db ${isRemote ? '--remote' : '--local'} --file="${tempFilePath}"`
    execSync(command, { stdio: 'inherit' })
    console.log('Scraper script completed successfully!')
  } catch (error) {
    console.error('Failed to execute D1 queries:', error)
  } finally {
    try {
      unlinkSync(tempFilePath)
    } catch (e) {
      // Ignore if file doesn't exist
    }
  }
}

main().catch(console.error)
