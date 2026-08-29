'use client'

import type { ReactNode } from 'react'
import type { Service } from '@/lib/db'

const inputClass =
  'w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

const icons = [
  { value: 'truck', label: 'Truck' },
  { value: 'globe', label: 'Globe' },
  { value: 'clipboard', label: 'Clipboard' },
  { value: 'hardhat', label: 'Hard hat' },
]

export default function ServiceForm({
  action,
  service,
  embedded = false,
  footer,
}: {
  action: (formData: FormData) => void | Promise<void>
  service?: Service
  embedded?: boolean
  footer?: ReactNode
}) {
  const compact = embedded

  return (
    <form
      action={action}
      className={embedded ? 'flex min-h-0 flex-1 flex-col' : 'mt-8 max-w-3xl space-y-5 rounded-xl border border-slate-200 bg-white p-6'}
    >
      <div className={embedded ? 'min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6' : 'space-y-5'}>
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-navy-900">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            autoFocus={embedded}
            defaultValue={service?.title}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="summary" className="mb-1.5 block text-sm font-medium text-navy-900">
            Short summary
          </label>
          <p className="mb-1.5 text-xs text-slate-500">Home cards, quote form, and contact strip.</p>
          <textarea
            id="summary"
            name="summary"
            required
            rows={compact ? 2 : 3}
            defaultValue={service?.summary}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="body" className="mb-1.5 block text-sm font-medium text-navy-900">
            Full description
          </label>
          <p className="mb-1.5 text-xs text-slate-500">Separate paragraphs with a blank line.</p>
          <textarea
            id="body"
            name="body"
            required
            rows={compact ? 5 : 10}
            defaultValue={service?.body}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="mb-1.5 block text-sm font-medium text-navy-900">
            Image path or URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            required
            defaultValue={service?.image_url}
            placeholder="/assets/quote_truck.png"
            className={inputClass}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="iconKey" className="mb-1.5 block text-sm font-medium text-navy-900">
              Icon
            </label>
            <select id="iconKey" name="iconKey" defaultValue={service?.icon_key ?? 'truck'} className={inputClass}>
              {icons.map((icon) => (
                <option key={icon.value} value={icon.value}>
                  {icon.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder" className="mb-1.5 block text-sm font-medium text-navy-900">
              Sort order
            </label>
            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={service?.sort_order ?? 0}
              className={inputClass}
            />
          </div>
        </div>
        <label className="flex min-h-11 items-center gap-2 text-sm text-navy-900">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={service?.is_published ?? true}
            className="h-4 w-4 rounded border-slate-300 text-accent-500"
          />
          Published on the website
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
          Save service
        </button>
      )}
    </form>
  )
}
