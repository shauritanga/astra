const DEFAULT_ORIGINS =
  'http://localhost:5173,http://127.0.0.1:5173,https://astranova.co.tz,https://www.astranova.co.tz'

export function publicCorsHeaders(origin: string | null) {
  const allowed = (process.env.PUBLIC_ORIGINS || DEFAULT_ORIGINS).split(',').map((s) => s.trim())
  const allowOrigin = origin && allowed.includes(origin) ? origin : allowed[0]
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}

export function json(data: unknown, status = 200, origin: string | null = null) {
  return Response.json(data, { status, headers: publicCorsHeaders(origin) })
}
