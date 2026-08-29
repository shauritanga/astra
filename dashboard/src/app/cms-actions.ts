'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireSession } from '@/lib/auth'
import { pool, type ServiceIconKey } from '@/lib/db'

const ICON_KEYS: ServiceIconKey[] = ['truck', 'globe', 'clipboard', 'hardhat']
const NETWORKS = ['facebook', 'instagram', 'linkedin', 'x', 'tiktok'] as const

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return slug || 'service'
}

function str(form: FormData, key: string) {
  return String(form.get(key) ?? '').trim()
}

function int(form: FormData, key: string, fallback = 0) {
  const n = Number.parseInt(str(form, key), 10)
  return Number.isFinite(n) ? n : fallback
}

function checked(form: FormData, key: string) {
  return form.get(key) === 'on'
}

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = slugify(base)
  for (let i = 2; i < 50; i += 1) {
    const { rows } = await pool.query<{ id: string }>(
      excludeId
        ? 'select id::text from services where slug = $1 and id <> $2'
        : 'select id::text from services where slug = $1',
      excludeId ? [slug, excludeId] : [slug],
    )
    if (!rows[0]) return slug
    slug = `${slugify(base)}-${i}`
  }
  return `${slugify(base)}-${Date.now()}`
}

function parseIcon(value: string): ServiceIconKey {
  return ICON_KEYS.includes(value as ServiceIconKey) ? (value as ServiceIconKey) : 'truck'
}

function revalidateWebsite() {
  revalidatePath('/website/services')
  revalidatePath('/website/jobs')
  revalidatePath('/settings')
}

export async function updateCompanySettings(formData: FormData) {
  await requireSession()
  const phoneDisplay = str(formData, 'phoneDisplay')
  const phoneTel = str(formData, 'phoneTel')
  const emailInfo = str(formData, 'emailInfo')
  const emailOperations = str(formData, 'emailOperations')
  const addressLine1 = str(formData, 'addressLine1')
  const addressLine2 = str(formData, 'addressLine2')
  const hoursWeekday = str(formData, 'hoursWeekday')
  const hoursSaturday = str(formData, 'hoursSaturday')

  if (
    !phoneDisplay ||
    !phoneTel ||
    !emailInfo ||
    !emailOperations ||
    !addressLine1 ||
    !addressLine2 ||
    !hoursWeekday ||
    !hoursSaturday
  ) {
    throw new Error('All contact fields are required')
  }

  await pool.query(
    `update company_settings
        set phone_display = $1,
            phone_tel = $2,
            email_info = $3,
            email_operations = $4,
            address_line1 = $5,
            address_line2 = $6,
            hours_weekday = $7,
            hours_saturday = $8,
            updated_at = now()
      where id = 1`,
    [
      phoneDisplay,
      phoneTel,
      emailInfo,
      emailOperations,
      addressLine1,
      addressLine2,
      hoursWeekday,
      hoursSaturday,
    ],
  )
  revalidateWebsite()
}

export async function createService(formData: FormData) {
  await requireSession()
  const title = str(formData, 'title')
  const summary = str(formData, 'summary')
  const body = str(formData, 'body')
  const imageUrl = str(formData, 'imageUrl')
  const iconKey = parseIcon(str(formData, 'iconKey'))
  const sortOrder = int(formData, 'sortOrder')
  const isPublished = checked(formData, 'isPublished')
  if (!title || !summary || !body || !imageUrl) throw new Error('Required service fields are missing')

  const slug = await uniqueSlug(title)
  await pool.query(
    `insert into services (slug, title, summary, body, image_url, icon_key, sort_order, is_published)
     values ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [slug, title, summary, body, imageUrl, iconKey, sortOrder, isPublished],
  )
  revalidateWebsite()
}

export async function updateService(id: string, formData: FormData) {
  await requireSession()
  const title = str(formData, 'title')
  const summary = str(formData, 'summary')
  const body = str(formData, 'body')
  const imageUrl = str(formData, 'imageUrl')
  const iconKey = parseIcon(str(formData, 'iconKey'))
  const sortOrder = int(formData, 'sortOrder')
  const isPublished = checked(formData, 'isPublished')
  if (!title || !summary || !body || !imageUrl) throw new Error('Required service fields are missing')

  await pool.query(
    `update services
        set title = $1,
            summary = $2,
            body = $3,
            image_url = $4,
            icon_key = $5,
            sort_order = $6,
            is_published = $7,
            updated_at = now()
      where id = $8`,
    [title, summary, body, imageUrl, iconKey, sortOrder, isPublished, id],
  )
  revalidateWebsite()
  revalidatePath(`/website/services/${id}`)
}

export async function deleteService(id: string) {
  await requireSession()
  await pool.query('delete from services where id = $1', [id])
  revalidateWebsite()
  redirect('/website/services')
}

export async function createJob(formData: FormData) {
  await requireSession()
  const title = str(formData, 'title')
  const department = str(formData, 'department')
  const location = str(formData, 'location') || 'Dar es Salaam, Tanzania'
  const description = str(formData, 'description')
  const sortOrder = int(formData, 'sortOrder')
  const isOpen = checked(formData, 'isOpen')
  if (!title || !department) throw new Error('Title and department are required')

  await pool.query(
    `insert into job_openings (title, department, location, description, is_open, sort_order)
     values ($1, $2, $3, $4, $5, $6)`,
    [title, department, location, description, isOpen, sortOrder],
  )
  revalidateWebsite()
}

export async function updateJob(id: string, formData: FormData) {
  await requireSession()
  const title = str(formData, 'title')
  const department = str(formData, 'department')
  const location = str(formData, 'location') || 'Dar es Salaam, Tanzania'
  const description = str(formData, 'description')
  const sortOrder = int(formData, 'sortOrder')
  const isOpen = checked(formData, 'isOpen')
  if (!title || !department) throw new Error('Title and department are required')

  await pool.query(
    `update job_openings
        set title = $1,
            department = $2,
            location = $3,
            description = $4,
            is_open = $5,
            sort_order = $6,
            updated_at = now()
      where id = $7`,
    [title, department, location, description, isOpen, sortOrder, id],
  )
  revalidateWebsite()
  revalidatePath(`/website/jobs/${id}`)
}

export async function deleteJob(id: string) {
  await requireSession()
  await pool.query('delete from job_openings where id = $1', [id])
  revalidateWebsite()
  redirect('/website/jobs')
}

export async function updateSocials(formData: FormData) {
  await requireSession()
  for (const network of NETWORKS) {
    const url = str(formData, `${network}_url`)
    const isPublished = checked(formData, `${network}_published`)
    await pool.query(
      `update social_links
          set url = $1, is_published = $2, updated_at = now()
        where network = $3`,
      [url, isPublished, network],
    )
  }
  revalidateWebsite()
}
