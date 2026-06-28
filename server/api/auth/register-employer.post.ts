/**
 * POST /api/auth/register-employer
 * Creates a new employer account, initializes the profile, and starts the session.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { hashPassword } from '../../utils/hash'
import { setSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const body = await readBody(event)
  const { email, password, companyName, phone } = body ?? {}

  // --- Validation ---
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw createError({ statusCode: 400, message: 'A valid business email address is required.' })
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    throw createError({ statusCode: 400, message: 'Password must be at least 8 characters.' })
  }
  if (!companyName || typeof companyName !== 'string' || !companyName.trim()) {
    throw createError({ statusCode: 400, message: 'Company name is required.' })
  }

  // --- Check for duplicate email ---
  const existing = await DB
    .prepare('SELECT id FROM users WHERE email = ?')
    .bind(email.toLowerCase().trim())
    .first()

  if (existing) {
    throw createError({ statusCode: 409, message: 'An account with this email already exists.' })
  }

  // --- Hash password & create user ---
  const passwordHash = await hashPassword(password)

  const result = await DB
    .prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?) RETURNING id')
    .bind(email.toLowerCase().trim(), passwordHash, 'employer')
    .first<{ id: number }>()

  if (!result) {
    throw createError({ statusCode: 500, message: 'Failed to create account. Please try again.' })
  }

  // --- Create initial employer profile ---
  await DB
    .prepare(`
      INSERT INTO employer_profiles (user_id, company_name, executive_phone)
      VALUES (?, ?, ?)
    `)
    .bind(result.id, companyName.trim(), phone ? phone.trim() : null)
    .run()

  // --- Set session cookie ---
  setSessionUserId(event, result.id)

  return {
    success: true,
    message: 'Employer account created successfully.',
    userId: result.id
  }
})
