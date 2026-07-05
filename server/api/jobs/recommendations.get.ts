/**
 * GET /api/jobs/recommendations
 * Recommends jobs based on the authenticated jobseeker's profile (skills, sector, location).
 */

import { defineEventHandler, createError } from 'h3'
import { getSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const userId = getSessionUserId(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated.' })
  }

  // 1. Fetch user & verify jobseeker role
  const user = await DB
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(userId)
    .first<{ role: string }>()

  if (!user || user.role !== 'jobseeker') {
    throw createError({ statusCode: 403, message: 'Only jobseekers can get job recommendations.' })
  }

  // 2. Fetch jobseeker profile
  const profile = await DB
    .prepare(`
      SELECT skills, sector, location
      FROM jobseeker_profiles
      WHERE user_id = ?
    `)
    .bind(userId)
    .first<any>()

  if (!profile) {
    return { success: true, recommendations: [] }
  }

  // Parse skills
  let userSkills: string[] = []
  if (typeof profile.skills === 'string') {
    try { userSkills = JSON.parse(profile.skills) } catch { userSkills = [] }
  } else if (Array.isArray(profile.skills)) {
    userSkills = profile.skills
  }

  const userSector = (profile.sector || '').trim().toLowerCase()
  const userLocation = (profile.location || '').trim().toLowerCase()

  // 3. Fetch all active jobs
  const jobsResult = await DB
    .prepare(`
      SELECT
        j.id, j.title, j.city, j.state, j.skills, j.sal_min, j.sal_max, j.exp_min, j.exp_max, j.industry,
        ep.company_name, ep.logo_url, ep.user_id as employer_id
      FROM jobs j
      LEFT JOIN employer_profiles ep ON j.employer_id = ep.user_id
      WHERE j.status = 'active'
    `)
    .all<any>()

  const activeJobs = jobsResult.results || []

  // Check if user has already applied to these jobs to exclude them
  const appliedResult = await DB
    .prepare('SELECT job_id FROM job_applications WHERE jobseeker_id = ?')
    .bind(userId)
    .all<{ job_id: number }>()
  
  const appliedJobIds = new Set((appliedResult.results || []).map(r => r.job_id))

  const recommendations = activeJobs
    .filter(job => !appliedJobIds.has(job.id))
    .map(job => {
      // Parse job skills
      let jobSkills: string[] = []
      if (typeof job.skills === 'string') {
        try { jobSkills = JSON.parse(job.skills) } catch { jobSkills = [] }
      } else if (Array.isArray(job.skills)) {
        jobSkills = job.skills
      }

      let score = 0
      let matchBreakdown = { sector: false, skills: 0, location: false }

      // Sector matching (Weight: 40%)
      if (userSector) {
        const titleLower = (job.title || '').toLowerCase()
        const industryLower = (job.industry || '').toLowerCase()
        if (titleLower.includes(userSector) || userSector.includes(titleLower) || industryLower.includes(userSector)) {
          score += 40
          matchBreakdown.sector = true
        }
      } else {
        // Fallback baseline if no sector defined
        score += 20
      }

      // Skills matching (Weight: 40%)
      if (jobSkills.length > 0 && userSkills.length > 0) {
        const matches = jobSkills.filter(js => 
          userSkills.some(us => us.toLowerCase().trim() === js.toLowerCase().trim())
        )
        const matchRatio = matches.length / jobSkills.length
        score += Math.round(matchRatio * 40)
        matchBreakdown.skills = matches.length
      } else if (jobSkills.length === 0) {
        // If job requires no skills, full points
        score += 40
      }

      // Location matching (Weight: 20%)
      if (userLocation) {
        const jobCity = (job.city || '').toLowerCase()
        const jobState = (job.state || '').toLowerCase()
        if (
          jobCity.includes('remote') || 
          userLocation.includes(jobCity) || 
          (jobCity && userLocation.includes(jobCity)) ||
          (jobState && userLocation.includes(jobState))
        ) {
          score += 20
          matchBreakdown.location = true
        }
      } else {
        score += 10
      }

      // If user has complete blank profile, make baseline match percentage
      if (!userSector && userSkills.length === 0 && !userLocation) {
        score = 50
      }

      // Cap at 100
      score = Math.min(score, 100)

      return {
        ...job,
        matchScore: score,
        matchBreakdown
      }
    })
    // Filter out very low matches if there is enough data
    .filter(job => job.matchScore >= 30)
    // Sort descending by match score
    .sort((a, b) => b.matchScore - a.matchScore)
    // Return top 5 recommendations
    .slice(0, 5)

  return {
    success: true,
    recommendations
  }
})
