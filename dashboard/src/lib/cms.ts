import { pool, type CompanySettings, type JobOpening, type Service, type SocialLink } from './db'

const SERVICE_COLUMNS = `id::text, slug, title, summary, body, image_url, icon_key, sort_order, is_published, created_at, updated_at`
const JOB_COLUMNS = `id::text, title, department, location, description, is_open, sort_order, created_at, updated_at`
const SOCIAL_COLUMNS = `id::text, network, url, sort_order, is_published, updated_at`
const CONTACT_COLUMNS = `phone_display, phone_tel, email_info, email_operations, address_line1, address_line2, hours_weekday, hours_saturday`

export async function getCompanySettings() {
  const { rows } = await pool.query<CompanySettings>(
    `select ${CONTACT_COLUMNS} from company_settings where id = 1`,
  )
  return rows[0] ?? null
}

export async function listServices(opts: { publishedOnly?: boolean } = {}) {
  const { rows } = await pool.query<Service>(
    opts.publishedOnly
      ? `select ${SERVICE_COLUMNS} from services where is_published = true order by sort_order, id`
      : `select ${SERVICE_COLUMNS} from services order by sort_order, id`,
  )
  return rows
}

export async function getService(id: string) {
  const { rows } = await pool.query<Service>(`select ${SERVICE_COLUMNS} from services where id = $1`, [id])
  return rows[0] ?? null
}

export async function listJobs(opts: { openOnly?: boolean } = {}) {
  const { rows } = await pool.query<JobOpening>(
    opts.openOnly
      ? `select ${JOB_COLUMNS} from job_openings where is_open = true order by sort_order, id`
      : `select ${JOB_COLUMNS} from job_openings order by sort_order, id`,
  )
  return rows
}

export async function getJob(id: string) {
  const { rows } = await pool.query<JobOpening>(`select ${JOB_COLUMNS} from job_openings where id = $1`, [id])
  return rows[0] ?? null
}

export async function listSocials(opts: { publishedOnly?: boolean } = {}) {
  const { rows } = await pool.query<SocialLink>(
    opts.publishedOnly
      ? `select ${SOCIAL_COLUMNS} from social_links where is_published = true order by sort_order, id`
      : `select ${SOCIAL_COLUMNS} from social_links order by sort_order, id`,
  )
  return rows
}

export function toPublicContent(
  contact: CompanySettings,
  services: Service[],
  jobs: JobOpening[],
  socials: SocialLink[],
) {
  return {
    contact: {
      phoneDisplay: contact.phone_display,
      phoneTel: contact.phone_tel,
      emailInfo: contact.email_info,
      emailOperations: contact.email_operations,
      addressLine1: contact.address_line1,
      addressLine2: contact.address_line2,
      hoursWeekday: contact.hours_weekday,
      hoursSaturday: contact.hours_saturday,
    },
    services: services.map((s) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      summary: s.summary,
      body: s.body,
      imageUrl: s.image_url,
      iconKey: s.icon_key,
    })),
    jobs: jobs.map((j) => ({
      id: j.id,
      title: j.title,
      department: j.department,
      location: j.location,
      description: j.description,
    })),
    socials: socials
      .filter((s) => s.url.trim() && s.url.trim() !== '#')
      .map((s) => ({ network: s.network, url: s.url.trim() })),
  }
}
