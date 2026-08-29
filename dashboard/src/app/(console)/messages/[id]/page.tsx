import { notFound } from 'next/navigation'
import { pool, type ContactMessage } from '@/lib/db'
import Breadcrumb from '@/components/breadcrumb'
import StatusBadge from '@/components/status-badge'
import InquiryForm from '@/components/inquiry-form'

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { rows } = await pool.query<ContactMessage>(
    `select id::text, full_name, company_name, email, phone, subject, message, status, notes, created_at, updated_at
     from contact_messages where id = $1`,
    [id],
  )
  const item = rows[0]
  if (!item) notFound()

  return (
    <div className="max-w-3xl">
      <Breadcrumb
        items={[
          { label: 'Overview', href: '/' },
          { label: 'Messages', href: '/messages' },
          { label: item.subject },
        ]}
      />
      <div className="mt-5 flex items-start justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">
          {item.subject}
        </h1>
        <StatusBadge status={item.status} />
      </div>
      <dl className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Name</dt>
          <dd className="mt-1">{item.full_name}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Company</dt>
          <dd className="mt-1">{item.company_name}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Email</dt>
          <dd className="mt-1">
            <a href={`mailto:${item.email}`} className="text-accent-600">
              {item.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Phone</dt>
          <dd className="mt-1">
            <a href={`tel:${item.phone}`} className="text-accent-600">
              {item.phone}
            </a>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Message</dt>
          <dd className="mt-1 whitespace-pre-wrap text-slate-700">{item.message}</dd>
        </div>
      </dl>
      <InquiryForm kind="contact" id={item.id} status={item.status} notes={item.notes} />
    </div>
  )
}
