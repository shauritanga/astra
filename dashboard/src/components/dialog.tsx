'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'
import { Icon } from '@/components/icon'

export default function Dialog({
  open,
  onClose,
  title,
  description,
  icon,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  icon: IconSvgElement
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={onClose}
      onClick={(e) => {
        const box = e.currentTarget.getBoundingClientRect()
        const outside =
          e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom
        if (outside) onClose()
      }}
      className="fixed inset-0 z-50 m-auto h-fit max-h-[min(90dvh,52rem)] w-[calc(100%-1.5rem)] max-w-2xl rounded-xl border-0 bg-white p-0 text-navy-950 shadow-2xl backdrop:bg-navy-950/75 open:flex open:flex-col"
    >
      <div className="flex shrink-0 items-start gap-4 bg-navy-950 px-5 py-4 sm:px-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-accent-500/40 text-accent-500">
          <Icon icon={icon} size={20} />
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 id={titleId} className="font-display text-lg font-bold uppercase tracking-wide text-white">
            {title}
          </h2>
          {description ? (
            <p id={descId} className="mt-1 text-sm text-slate-300">
              {description}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <Icon icon={Cancel01Icon} size={18} />
        </button>
      </div>
      {children}
    </dialog>
  )
}
