import { notFound } from 'next/navigation'
import { pool, type QuoteRequest } from '@/lib/db'
import Breadcrumb from '@/components/breadcrumb'
import StatusBadge from '@/components/status-badge'
import InquiryForm from '@/components/inquiry-form'

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { rows } = await pool.query<QuoteRequest>(
    `select id::text, company_name, contact_person, phone, email, service_type, details, status, notes, created_at, updated_at
     from quote_requests where id = $1`,
    [id],
  )
  const quote = rows[0]
  if (!quote) notFound()

  return (
    <div className="max-w-3xl">
      <Breadcrumb
        items={[
          { label: 'Overview', href: '/' },
          { label: 'Quotes', href: '/quotes' },
          { label: quote.company_name },
        ]}
      />
      <div className="mt-5 flex items-start justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">
          {quote.company_name}
        </h1>
        <StatusBadge status={quote.status} />
      </div>
      <dl className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Contact</dt>
          <dd className="mt-1">{quote.contact_person}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Email</dt>
          <dd className="mt-1">
            <a href={`mailto:${quote.email}`} className="text-accent-600">
              {quote.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Phone</dt>
          <dd className="mt-1">
            <a href={`tel:${quote.phone}`} className="text-accent-600">
              {quote.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Service</dt>
          <dd className="mt-1">{quote.service_type}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Details</dt>
          <dd className="mt-1 whitespace-pre-wrap text-slate-700">{quote.details}</dd>
        </div>
      </dl>
      <InquiryForm kind="quote" id={quote.id} status={quote.status} notes={quote.notes} />
    </div>
  )
}
