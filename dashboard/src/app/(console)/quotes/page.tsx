import Link from 'next/link'
import { pool, type QuoteRequest } from '@/lib/db'
import StatusBadge from '@/components/status-badge'

export default async function QuotesPage() {
  const { rows } = await pool.query<QuoteRequest>(
    `select id::text, company_name, contact_person, phone, email, service_type, details, status, notes, created_at, updated_at
     from quote_requests
     order by created_at desc`,
  )

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">Quotes</h1>
      <p className="mt-2 text-sm text-slate-600">Requests submitted from the public Get a Quote form.</p>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Received</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                  No quote requests yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/quotes/${row.id}`} className="font-semibold text-navy-900 hover:text-accent-600">
                      {row.company_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.contact_person}
                    <div className="text-xs">{row.email}</div>
                  </td>
                  <td className="px-4 py-3">{row.service_type}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(row.created_at).toLocaleString('en-GB', { timeZone: 'Africa/Dar_es_Salaam' })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
