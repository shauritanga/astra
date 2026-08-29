'use client'

import { useFormStatus } from 'react-dom'

export default function SubmitButton({ children }: { children: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="min-h-11 rounded-md bg-accent-500 px-6 text-sm font-bold uppercase tracking-wide text-navy-950 hover:bg-accent-400 disabled:opacity-60"
    >
      {pending ? 'Saving…' : children}
    </button>
  )
}
