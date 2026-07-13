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

  const existing = await DB
    .prepare(`
      SELECT
        company_name, company_type, industry_type,
        executive_name, executive_phone, description,
        address, pincode, country, state, city,
        logo_url, verification_document_url, verification_document_name
      FROM employer_profiles
      WHERE user_id = ?
    `)
    .bind(userId)
    .first<any>()

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
    logoUrl,
    verificationDocumentUrl,
    verificationDocumentName
  } = body ?? {}

  let docUrlToSave = verificationDocumentUrl

  if (verificationDocumentUrl && verificationDocumentUrl.startsWith('data:')) {
    const { BUCKET } = event.context.cloudflare.env as unknown as { BUCKET: any }
    if (!BUCKET) {
      throw createError({ statusCode: 500, message: 'R2 Bucket is not configured.' })
    }

    const match = verificationDocumentUrl.match(/^data:([^;]+);base64,(.+)$/)
    if (!match) {
      throw createError({ statusCode: 400, message: 'Invalid verification document format.' })
    }

    const mimeType = match[1]
    const base64Data = match[2]
    const buffer = Buffer.from(base64Data, 'base64')

    const sanitizedFilename = (verificationDocumentName || 'document')
      .replace(/[^a-zA-Z0-9.-]/g, '_')
    const r2Path = `verification-docs/${userId}/${Date.now()}-${sanitizedFilename}`

    await BUCKET.put(r2Path, buffer, {
      httpMetadata: { contentType: mimeType }
    })

    docUrlToSave = `/files/${r2Path}`
  }

  // Construct final values, falling back to existing records if fields are not provided in request body
  const companyNameVal = companyName !== undefined ? (companyName || null) : (existing?.company_name ?? null)
  const companyTypeVal = companyType !== undefined ? (companyType || null) : (existing?.company_type ?? null)
  const industryTypeVal = industryType !== undefined ? (industryType || null) : (existing?.industry_type ?? null)
  const executiveNameVal = executiveName !== undefined ? (executiveName || null) : (existing?.executive_name ?? null)
  const executivePhoneVal = executivePhone !== undefined ? (executivePhone || null) : (existing?.executive_phone ?? null)
  const descriptionVal = description !== undefined ? (description || null) : (existing?.description ?? null)
  const addressVal = address !== undefined ? (address || null) : (existing?.address ?? null)
  const pincodeVal = pincode !== undefined ? (pincode || null) : (existing?.pincode ?? null)
  const countryVal = country !== undefined ? (country || 'India') : (existing?.country ?? 'India')
  const stateVal = state !== undefined ? (state || null) : (existing?.state ?? null)
  const cityVal = city !== undefined ? (city || null) : (existing?.city ?? null)
  const logoUrlVal = logoUrl !== undefined ? (logoUrl || null) : (existing?.logo_url ?? null)
  const verificationDocumentUrlVal = docUrlToSave !== undefined ? (docUrlToSave || null) : (existing?.verification_document_url ?? null)
  const verificationDocumentNameVal = verificationDocumentName !== undefined ? (verificationDocumentName || null) : (existing?.verification_document_name ?? null)

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
        verification_document_url = ?,
        verification_document_name = ?,
        updated_at = (datetime('now'))
      WHERE user_id = ?
    `)
    .bind(
      companyNameVal,
      companyTypeVal,
      industryTypeVal,
      executiveNameVal,
      executivePhoneVal,
      descriptionVal,
      addressVal,
      pincodeVal,
      countryVal,
      stateVal,
      cityVal,
      logoUrlVal,
      verificationDocumentUrlVal,
      verificationDocumentNameVal,
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
