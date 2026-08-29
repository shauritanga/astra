import { SignJWT, jwtVerify } from 'jose'

export const SESSION_COOKIE = 'astra_admin'

export type Session = {
  id: string
  email: string
  name: string
  role: string
}

function secretKey() {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(user: Session) {
  return new SignJWT({ email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey())
}

export async function readSessionFromToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey())
    if (!payload.sub || typeof payload.email !== 'string' || typeof payload.name !== 'string') {
      return null
    }
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: typeof payload.role === 'string' ? payload.role : 'Administrator',
    }
  } catch {
    return null
  }
}
