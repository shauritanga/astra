import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { apiGet, apiPatch, ApiError } from '../lib/api'
import type { InquiryStatus, Message } from '../lib/types'

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

export default function MessageDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [message, setMessage] = useState<Message | null>(null)
  const [status, setStatus] = useState<InquiryStatus>('new')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!id) return
    apiGet<Message>(`messages.php?id=${id}`)
      .then((data) => {
        setMessage(data)
        setStatus(data.status)
        setNotes(data.notes ?? '')
      })
      .catch(() => setError('Could not load this message.'))
  }, [id])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!id) return
    setError('')
    setSaved(false)
    setPending(true)
    try {
      await apiPatch(`messages.php?id=${id}`, { status, notes })
      setSaved(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save changes.')
    } finally {
      setPending(false)
    }
  }

  if (error && !message) {
    return <p className="text-sm text-red-600">{error}</p>
  }
  if (!message) {
    return <p className="text-sm text-slate-500">Loading…</p>
  }

  return (
    <div className="max-w-3xl">
      <button
        type="button"
        onClick={() => navigate('/messages')}
        className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy-950"
      >
        <ArrowLeft size={16} /> Back to messages
      </button>

      <h1 className="font-display text-2xl font-bold text-navy-950">{message.subject}</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-6 text-sm shadow-sm">
        <div>
          <p className="text-slate-500">Full Name</p>
          <p className="font-medium text-navy-950">{message.full_name}</p>
        </div>
        <div>
          <p className="text-slate-500">Company</p>
          <p className="font-medium text-navy-950">{message.company_name}</p>
        </div>
        <div>
          <p className="text-slate-500">Email</p>
          <p className="font-medium text-navy-950">{message.email}</p>
        </div>
        <div>
          <p className="text-slate-500">Phone</p>
          <p className="font-medium text-navy-950">{message.phone}</p>
        </div>
        <div className="col-span-2">
          <p className="text-slate-500">Message</p>
          <p className="whitespace-pre-wrap text-navy-950">{message.message}</p>
        </div>
      </div>

      <form className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as InquiryStatus)}
            className={inputClass}
          >
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Internal Notes</label>
          <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {saved ? <p className="text-sm text-emerald-600">Saved.</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 disabled:opacity-60"
        >
          {pending ? 'Saving…' : 'Save Changes'}
        </button>
      </form>

      <Link to="/messages" className="mt-4 inline-block text-sm text-slate-500 hover:text-navy-950">
        ← All messages
      </Link>
    </div>
  )
}
