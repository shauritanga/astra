import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, MessageSquare } from 'lucide-react'
import { apiGet } from '../lib/api'
import type { Quote, Message } from '../lib/types'
import { useAuth } from '../context/AuthContext'

export default function OverviewPage() {
  const { user } = useAuth()
  const [quotes, setQuotes] = useState<Quote[] | null>(null)
  const [messages, setMessages] = useState<Message[] | null>(null)

  useEffect(() => {
    apiGet<Quote[]>('quotes.php').then(setQuotes).catch(() => setQuotes([]))
    apiGet<Message[]>('messages.php').then(setMessages).catch(() => setMessages([]))
  }, [])

  const newQuotes = quotes?.filter((q) => q.status === 'new').length ?? 0
  const newMessages = messages?.filter((m) => m.status === 'new').length ?? 0

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy-950">Welcome back{user ? `, ${user.name}` : ''}</h1>
      <p className="mt-1 text-sm text-slate-500">Here&rsquo;s what needs your attention.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          to="/quotes"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-accent-500"
        >
          <div>
            <p className="text-sm font-medium text-slate-500">Quote Requests</p>
            <p className="mt-1 text-3xl font-bold text-navy-950">{quotes?.length ?? '—'}</p>
            <p className="mt-1 text-xs text-accent-600">{newQuotes} new</p>
          </div>
          <FileText size={32} className="text-accent-500" />
        </Link>

        <Link
          to="/messages"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-accent-500"
        >
          <div>
            <p className="text-sm font-medium text-slate-500">Contact Messages</p>
            <p className="mt-1 text-3xl font-bold text-navy-950">{messages?.length ?? '—'}</p>
            <p className="mt-1 text-xs text-accent-600">{newMessages} new</p>
          </div>
          <MessageSquare size={32} className="text-accent-500" />
        </Link>
      </div>
    </div>
  )
}
