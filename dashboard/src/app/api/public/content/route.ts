import { getCompanySettings, listJobs, listServices, listSocials, toPublicContent } from '@/lib/cms'
import { json, publicCorsHeaders } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: publicCorsHeaders(request.headers.get('origin')) })
}

export async function GET(request: Request) {
  const origin = request.headers.get('origin')
  const [contact, services, jobs, socials] = await Promise.all([
    getCompanySettings(),
    listServices({ publishedOnly: true }),
    listJobs({ openOnly: true }),
    listSocials({ publishedOnly: true }),
  ])

  if (!contact) {
    return json({ error: 'Site content is not configured.' }, 503, origin)
  }

  return json(toPublicContent(contact, services, jobs, socials), 200, origin)
}
