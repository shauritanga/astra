import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../lib/api'
import type { Message } from '../lib/types'
import StatusBadge from '../components/StatusBadge'

export default function MessagesListPage() {
  const [messages, setMessages] = useState<Message[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    apiGet<Message[]>('messages.php')
      .then(setMessages)
      .catch(() => setError('Could not load contact messages.'))
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy-950">Contact Messages</h1>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-max text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {messages?.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link to={`/messages/${m.id}`} className="font-medium text-navy-950 hover:text-accent-600">
                    {m.full_name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{m.company_name}</td>
                <td className="px-4 py-3 text-slate-600">{m.subject}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={m.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">{new Date(m.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {messages && messages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  No messages yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
