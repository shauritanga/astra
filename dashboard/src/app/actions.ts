'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { createSessionToken, requireSession, SESSION_COOKIE, verifyPassword } from '@/lib/auth'
import { pool, type InquiryStatus } from '@/lib/db'

const STATUSES: InquiryStatus[] = ['new', 'in_progress', 'closed']

function parseStatus(value: FormDataEntryValue | null): InquiryStatus | null {
  const status = String(value ?? '')
  return STATUSES.includes(status as InquiryStatus) ? (status as InquiryStatus) : null
}

export async function updateQuote(id: string, formData: FormData) {
  await requireSession()
  const status = parseStatus(formData.get('status'))
  const notes = String(formData.get('notes') ?? '').trim() || null
  if (!status) throw new Error('Invalid status')

  await pool.query(
    `update quote_requests
        set status = $1, notes = $2, updated_at = now()
      where id = $3`,
    [status, notes, id],
  )
  revalidatePath('/quotes')
  revalidatePath(`/quotes/${id}`)
  revalidatePath('/')
}

export async function updateContact(id: string, formData: FormData) {
  await requireSession()
  const status = parseStatus(formData.get('status'))
  const notes = String(formData.get('notes') ?? '').trim() || null
  if (!status) throw new Error('Invalid status')

  await pool.query(
    `update contact_messages
        set status = $1, notes = $2, updated_at = now()
      where id = $3`,
    [status, notes, id],
  )
  revalidatePath('/messages')
  revalidatePath(`/messages/${id}`)
  revalidatePath('/')
}

export async function updateProfile(formData: FormData) {
  const session = await requireSession()
  const name = String(formData.get('name') ?? '').trim()
  if (!name) throw new Error('Name is required')

  await pool.query('update admin_users set name = $1 where id = $2', [name, session.id])

  const jar = await cookies()
  jar.set(
    SESSION_COOKIE,
    await createSessionToken({ ...session, name }),
    {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    },
  )
  revalidatePath('/', 'layout')
}

export async function updatePassword(formData: FormData) {
  const session = await requireSession()
  const current = String(formData.get('currentPassword') ?? '')
  const next = String(formData.get('newPassword') ?? '')
  if (next.length < 8) throw new Error('New password must be at least 8 characters')

  const { rows } = await pool.query<{ password_hash: string }>(
    'select password_hash from admin_users where id = $1',
    [session.id],
  )
  const user = rows[0]
  if (!user) throw new Error('User not found')

  if (!(await verifyPassword(current, user.password_hash))) {
    throw new Error('Current password is incorrect')
  }

  const hash = await bcrypt.hash(next, 12)
  await pool.query('update admin_users set password_hash = $1 where id = $2', [hash, session.id])
  revalidatePath('/settings')
}
