/**
 * Password hashing and verification using the Web Crypto API.
 * Works natively in Cloudflare Workers (no Node.js crypto needed).
 */

const ITERATIONS = 100_000
const HASH_ALGO = 'SHA-256'
const KEY_LENGTH = 32 // bytes

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function hexToBuf(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return bytes
}

/**
 * Hash a plaintext password using PBKDF2.
 * Returns a hex string: `salt:hash`
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const enc = new TextEncoder()

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const derived = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt as any,
      iterations: ITERATIONS,
      hash: HASH_ALGO
    },
    keyMaterial,
    KEY_LENGTH * 8
  )

  return `${bufToHex(salt.buffer)}:${bufToHex(derived)}`
}

/**
 * Verify a plaintext password against a stored `salt:hash` string.
 */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':')
  if (!saltHex || !hashHex) return false

  const salt = hexToBuf(saltHex)
  const enc = new TextEncoder()

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const derived = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt as any,
      iterations: ITERATIONS,
      hash: HASH_ALGO
    },
    keyMaterial,
    KEY_LENGTH * 8
  )

  return bufToHex(derived) === hashHex
}
