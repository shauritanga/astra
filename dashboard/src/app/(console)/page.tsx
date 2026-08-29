import Link from 'next/link'
import { InboxIcon, Message01Icon } from '@hugeicons/core-free-icons'
import { Icon } from '@/components/icon'
import { pool } from '@/lib/db'

export default async function OverviewPage() {
  const [quotes, messages] = await Promise.all([
    pool.query<{ total: number; new_count: number }>(
      `select count(*)::int as total, count(*) filter (where status = 'new')::int as new_count from quote_requests`,
    ),
    pool.query<{ total: number; new_count: number }>(
      `select count(*)::int as total, count(*) filter (where status = 'new')::int as new_count from contact_messages`,
    ),
  ])

  const q = quotes.rows[0]
  const m = messages.rows[0]

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">
        Overview
      </h1>
      <p className="mt-2 text-sm text-slate-600">Inbound quotes and messages from astranova.co.tz</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/quotes"
          className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-accent-500"
        >
          <Icon icon={InboxIcon} size={24} className="text-accent-500" />
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Quote requests</p>
          <p className="mt-1 font-display text-4xl font-black text-navy-950">{q.total}</p>
          <p className="mt-2 text-sm text-accent-600">{q.new_count} new</p>
        </Link>
        <Link
          href="/messages"
          className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-accent-500"
        >
          <Icon icon={Message01Icon} size={24} className="text-accent-500" />
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Contact messages</p>
          <p className="mt-1 font-display text-4xl font-black text-navy-950">{m.total}</p>
          <p className="mt-2 text-sm text-accent-600">{m.new_count} new</p>
        </Link>
      </div>
    </div>
  )
}
