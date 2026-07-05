/**
 * POST /api/profile/update-employer
 * Updates the employer/company profile details for the authenticated user.
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
    throw createError({ statusCode: 403, message: 'Only employer accounts can access this page.' })
  }

  const body = await readBody(event)
  const {
    companyName,
    companyType,
    industryType,
    executiveName,
    executivePhone,
    description,
    address,
    pincode,
    country,
    state,
    city,
    logoUrl
  } = body ?? {}

  // Update employer profile in the database
  const result = await DB
    .prepare(`
      UPDATE employer_profiles
      SET
        company_name = ?,
        company_type = ?,
        industry_type = ?,
        executive_name = ?,
        executive_phone = ?,
        description = ?,
        address = ?,
        pincode = ?,
        country = ?,
        state = ?,
        city = ?,
        logo_url = ?,
        updated_at = (datetime('now'))
      WHERE user_id = ?
    `)
    .bind(
      companyName || null,
      companyType || null,
      industryType || null,
      executiveName || null,
      executivePhone || null,
      description || null,
      address || null,
      pincode || null,
      country || 'India',
      state || null,
      city || null,
      logoUrl || null,
      userId
    )
    .run()

  if (!result.success) {
    throw createError({ statusCode: 500, message: 'Failed to update company profile.' })
  }

  return {
    success: true,
    message: 'Employer profile updated successfully.'
  }
})
