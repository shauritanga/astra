import { pool } from '@/lib/db'
import { json, publicCorsHeaders } from '@/lib/cors'

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: publicCorsHeaders(request.headers.get('origin')) })
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null

  const companyName = String(body?.companyName ?? '').trim()
  const contactPerson = String(body?.contactPerson ?? '').trim()
  const phone = String(body?.phone ?? '').trim()
  const email = String(body?.email ?? '').trim()
  const serviceType = String(body?.serviceType ?? '').trim()
  const details = String(body?.details ?? '').trim()

  if (!companyName || !contactPerson || !phone || !email || !serviceType || !details) {
    return json({ error: 'All fields are required.' }, 400, origin)
  }
  if (details.length > 8000 || companyName.length > 200) {
    return json({ error: 'One or more fields are too long.' }, 400, origin)
  }

  await pool.query(
    `insert into quote_requests
      (company_name, contact_person, phone, email, service_type, details)
     values ($1, $2, $3, $4, $5, $6)`,
    [companyName, contactPerson, phone, email, serviceType, details],
  )

  return json({ ok: true }, 201, origin)
}
