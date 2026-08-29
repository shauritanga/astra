import Link from 'next/link'
import { pool, type ContactMessage } from '@/lib/db'
import StatusBadge from '@/components/status-badge'

export default async function MessagesPage() {
  const { rows } = await pool.query<ContactMessage>(
    `select id::text, full_name, company_name, email, phone, subject, message, status, notes, created_at, updated_at
     from contact_messages
     order by created_at desc`,
  )

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">Messages</h1>
      <p className="mt-2 text-sm text-slate-600">Enquiries submitted from the public Contact Us form.</p>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Received</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                  No messages yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/messages/${row.id}`} className="font-semibold text-navy-900 hover:text-accent-600">
                      {row.full_name}
                    </Link>
                    <div className="text-xs text-slate-500">{row.company_name}</div>
                  </td>
                  <td className="px-4 py-3">{row.subject}</td>
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
