'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowUp01Icon, Logout01Icon, Settings01Icon, UserIcon } from '@hugeicons/core-free-icons'
import { Icon } from '@/components/icon'

function initials(name: string, email: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  if (parts[0]?.length >= 2) return parts[0].slice(0, 2).toUpperCase()
  return email.slice(0, 2).toUpperCase()
}

export default function UserMenu({
  name,
  email,
  role,
  collapsed = false,
}: {
  name: string
  email: string
  role: string
  collapsed?: boolean
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointer(e: MouseEvent) {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  async function logout() {
    setOpen(false)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/login')
    router.refresh()
  }

  return (
    <div ref={root} className="relative">
      {open ? (
        <div
          role="menu"
          aria-label="Account menu"
          className={`absolute bottom-full z-20 mb-2 overflow-hidden rounded-lg border border-white/10 bg-navy-900 py-1 shadow-xl ${
            collapsed ? 'left-0 w-56' : 'left-0 right-0'
          }`}
        >
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center gap-3 px-3 py-2.5 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
          >
            <Icon icon={UserIcon} size={16} />
            Profile
          </Link>
          <Link
            href="/settings"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center gap-3 px-3 py-2.5 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
          >
            <Icon icon={Settings01Icon} size={16} />
            Settings
          </Link>
          <div className="my-1 border-t border-white/10" />
          <button
            type="button"
            role="menuitem"
            onClick={logout}
            className="flex min-h-11 w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
          >
            <Icon icon={Logout01Icon} size={16} />
            Log out
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`${email}, ${role}. Open account menu`}
        className={`flex w-full items-center rounded-lg text-left transition hover:bg-white/5 ${
          collapsed ? 'justify-center px-0 py-2' : 'gap-3 px-2 py-2'
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 font-display text-sm font-bold text-navy-950">
          {initials(name, email)}
        </span>
        {collapsed ? null : (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-white">{email}</span>
              <span className="block truncate text-xs text-accent-500">{role}</span>
            </span>
            <Icon
              icon={ArrowUp01Icon}
              size={16}
              className={`shrink-0 text-slate-400 transition ${open ? '' : 'rotate-180'}`}
            />
          </>
        )}
      </button>
    </div>
  )
}
