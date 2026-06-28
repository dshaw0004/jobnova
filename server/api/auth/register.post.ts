/**
 * POST /api/auth/register
 * Creates a new jobseeker account with email and password.
 */

import { defineEventHandler, readBody, createError } from 'h3'
import { hashPassword } from '../../utils/hash'
import { setSessionUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const { DB } = event.context.cloudflare.env as unknown as { DB: D1Database }

  const body = await readBody(event)
  const { email, password } = body ?? {}

  // --- Validation ---
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw createError({ statusCode: 400, message: 'A valid email address is required.' })
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    throw createError({ statusCode: 400, message: 'Password must be at least 8 characters.' })
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
    .bind(email.toLowerCase().trim(), passwordHash, 'jobseeker')
    .first<{ id: number }>()

  if (!result) {
    throw createError({ statusCode: 500, message: 'Failed to create account. Please try again.' })
  }

  // --- Create empty profile skeleton ---
  await DB
    .prepare('INSERT INTO jobseeker_profiles (user_id) VALUES (?)')
    .bind(result.id)
    .run()

  // --- Set session cookie ---
  setSessionUserId(event, result.id)

  return {
    success: true,
    message: 'Account created successfully.',
    userId: result.id
  }
})
