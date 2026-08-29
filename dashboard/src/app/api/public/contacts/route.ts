import { pool } from '@/lib/db'
import { json, publicCorsHeaders } from '@/lib/cors'

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: publicCorsHeaders(request.headers.get('origin')) })
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null

  const fullName = String(body?.fullName ?? '').trim()
  const companyName = String(body?.companyName ?? '').trim()
  const email = String(body?.email ?? '').trim()
  const phone = String(body?.phone ?? '').trim()
  const subject = String(body?.subject ?? '').trim()
  const message = String(body?.message ?? '').trim()

  if (!fullName || !companyName || !email || !phone || !subject || !message) {
    return json({ error: 'All fields are required.' }, 400, origin)
  }
  if (message.length > 8000) {
    return json({ error: 'Message is too long.' }, 400, origin)
  }

  await pool.query(
    `insert into contact_messages
      (full_name, company_name, email, phone, subject, message)
     values ($1, $2, $3, $4, $5, $6)`,
    [fullName, companyName, email, phone, subject, message],
  )

  return json({ ok: true }, 201, origin)
}
