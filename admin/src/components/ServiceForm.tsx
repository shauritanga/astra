import { useState, type FormEvent } from 'react'
import type { ServiceIconKey } from '../lib/types'

export type ServiceFormValues = {
  title: string
  summary: string
  body: string
  imageUrl: string
  iconKey: ServiceIconKey
  sortOrder: number
  isPublished: boolean
}

const ICON_KEYS: ServiceIconKey[] = ['truck', 'globe', 'clipboard', 'hardhat']

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

export default function ServiceForm({
  initial,
  submitLabel,
  pending,
  error,
  onSubmit,
}: {
  initial: ServiceFormValues
  submitLabel: string
  pending: boolean
  error: string
  onSubmit: (values: ServiceFormValues) => void
}) {
  const [values, setValues] = useState(initial)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Title</label>
        <input
          required
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Summary</label>
        <textarea
          required
          rows={2}
          value={values.summary}
          onChange={(e) => setValues({ ...values, summary: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Body</label>
        <textarea
          required
          rows={6}
          value={values.body}
          onChange={(e) => setValues({ ...values, body: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Image URL</label>
        <input
          required
          value={values.imageUrl}
          onChange={(e) => setValues({ ...values, imageUrl: e.target.value })}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Icon</label>
          <select
            value={values.iconKey}
            onChange={(e) => setValues({ ...values, iconKey: e.target.value as ServiceIconKey })}
            className={inputClass}
          >
            {ICON_KEYS.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Sort Order</label>
          <input
            type="number"
            value={values.sortOrder}
            onChange={(e) => setValues({ ...values, sortOrder: Number(e.target.value) })}
            className={inputClass}
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={values.isPublished}
          onChange={(e) => setValues({ ...values, isPublished: e.target.checked })}
        />
        Published
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 disabled:opacity-60"
      >
        {pending ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
