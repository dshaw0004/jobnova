/**
 * POST /api/auth/logout
 * Logs out the current user by clearing the session cookie.
 */

import { defineEventHandler } from 'h3'
import { clearSession } from '../../utils/session'

export default defineEventHandler((event) => {
  clearSession(event)
  return { success: true, message: 'Logged out successfully.' }
})
