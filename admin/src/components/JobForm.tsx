import { useState, type FormEvent } from 'react'

export type JobFormValues = {
  title: string
  department: string
  location: string
  description: string
  sortOrder: number
  isOpen: boolean
}

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

export default function JobForm({
  initial,
  submitLabel,
  pending,
  error,
  onSubmit,
}: {
  initial: JobFormValues
  submitLabel: string
  pending: boolean
  error: string
  onSubmit: (values: JobFormValues) => void
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
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Department</label>
        <input
          required
          value={values.department}
          onChange={(e) => setValues({ ...values, department: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Location</label>
        <input
          value={values.location}
          placeholder="Dar es Salaam, Tanzania"
          onChange={(e) => setValues({ ...values, location: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          rows={5}
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Sort Order</label>
          <input
            type="number"
            value={values.sortOrder}
            onChange={(e) => setValues({ ...values, sortOrder: Number(e.target.value) })}
            className={inputClass}
          />
        </div>
        <label className="flex items-end gap-2 pb-2.5 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={values.isOpen}
            onChange={(e) => setValues({ ...values, isOpen: e.target.checked })}
          />
          Open
        </label>
      </div>
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
