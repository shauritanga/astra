'use client'

import type { ReactNode } from 'react'
import type { JobOpening } from '@/lib/db'

const inputClass =
  'w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

export default function JobForm({
  action,
  job,
  embedded = false,
  footer,
}: {
  action: (formData: FormData) => void | Promise<void>
  job?: JobOpening
  embedded?: boolean
  footer?: ReactNode
}) {
  return (
    <form
      action={action}
      className={embedded ? 'flex min-h-0 flex-1 flex-col' : 'mt-8 max-w-3xl space-y-5 rounded-xl border border-slate-200 bg-white p-6'}
    >
      <div className={embedded ? 'min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6' : 'space-y-5'}>
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-navy-900">
            Job title
          </label>
          <input
            id="title"
            name="title"
            required
            autoFocus={embedded}
            defaultValue={job?.title}
            className={inputClass}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="department" className="mb-1.5 block text-sm font-medium text-navy-900">
              Department
            </label>
            <input id="department" name="department" required defaultValue={job?.department} className={inputClass} />
          </div>
          <div>
            <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-navy-900">
              Location
            </label>
            <input
              id="location"
              name="location"
              required
              defaultValue={job?.location ?? 'Dar es Salaam, Tanzania'}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-navy-900">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={embedded ? 4 : 6}
            defaultValue={job?.description}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="sortOrder" className="mb-1.5 block text-sm font-medium text-navy-900">
            Sort order
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={job?.sort_order ?? 0}
            className={inputClass}
          />
        </div>
        <label className="flex min-h-11 items-center gap-2 text-sm text-navy-900">
          <input
            type="checkbox"
            name="isOpen"
            defaultChecked={job?.is_open ?? true}
            className="h-4 w-4 rounded border-slate-300 text-accent-500"
          />
          Open on the careers page
        </label>
      </div>
      {embedded ? (
        <div className="flex shrink-0 justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
          {footer}
        </div>
      ) : (
        <button
          type="submit"
          className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 hover:bg-accent-400"
        >
          Save job
        </button>
      )}
    </form>
  )
}
