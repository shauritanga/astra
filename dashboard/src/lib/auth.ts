import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { pool, type AdminUser } from './db'
import { createSessionToken, readSessionFromToken, SESSION_COOKIE, type Session } from './session'

export { SESSION_COOKIE, createSessionToken, type Session }

export async function getSession(): Promise<Session | null> {
  const jar = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  if (!token) return null
  return readSessionFromToken(token)
}

export async function requireSession() {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')
  return session
}

export async function findUserByEmail(email: string): Promise<AdminUser | null> {
  const { rows } = await pool.query<AdminUser>(
    'select id::text, email, name, role, password_hash from admin_users where email = $1 limit 1',
    [email.toLowerCase()],
  )
  return rows[0] ?? null
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}
