import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../lib/api'
import type { Quote } from '../lib/types'
import StatusBadge from '../components/StatusBadge'

export default function QuotesListPage() {
  const [quotes, setQuotes] = useState<Quote[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    apiGet<Quote[]>('quotes.php')
      .then(setQuotes)
      .catch(() => setError('Could not load quote requests.'))
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy-950">Quote Requests</h1>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-max text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quotes?.map((q) => (
              <tr key={q.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link to={`/quotes/${q.id}`} className="font-medium text-navy-950 hover:text-accent-600">
                    {q.company_name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{q.contact_person}</td>
                <td className="px-4 py-3 text-slate-600">{q.service_type}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={q.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">{new Date(q.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {quotes && quotes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  No quote requests yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
