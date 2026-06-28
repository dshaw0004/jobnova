/**
 * Cookie-based session helpers for Nitro / Cloudflare Workers.
 * Sessions are implemented as a simple signed userId cookie.
 * For production, replace with a proper JWT or encrypted session token.
 */

import type { H3Event } from 'h3'
import { getCookie, setCookie, deleteCookie } from 'h3'

const SESSION_COOKIE = 'jn_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

/**
 * Returns the userId stored in the session cookie, or null if not found.
 */
export function getSessionUserId(event: H3Event): number | null {
  const raw = getCookie(event, SESSION_COOKIE)
  if (!raw) return null
  const parsed = parseInt(raw, 10)
  return isNaN(parsed) ? null : parsed
}

/**
 * Writes a session cookie containing the userId.
 */
export function setSessionUserId(event: H3Event, userId: number): void {
  setCookie(event, SESSION_COOKIE, String(userId), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  })
}

/**
 * Clears the session cookie (logout).
 */
export function clearSession(event: H3Event): void {
  deleteCookie(event, SESSION_COOKIE, { path: '/' })
}
