import { updateContact, updateQuote } from '@/app/actions'
import type { InquiryStatus } from '@/lib/db'

export default function InquiryForm({
  kind,
  id,
  status,
  notes,
}: {
  kind: 'quote' | 'contact'
  id: string
  status: InquiryStatus
  notes: string | null
}) {
  const action = kind === 'quote' ? updateQuote.bind(null, id) : updateContact.bind(null, id)

  return (
    <form action={action} className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <div>
        <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-navy-900">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
        >
          <option value="new">New</option>
          <option value="in_progress">In progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-navy-900">
          Internal notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={notes ?? ''}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 hover:bg-accent-400"
      >
        Save
      </button>
    </form>
  )
}
