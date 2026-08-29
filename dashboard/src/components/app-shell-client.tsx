'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Briefcase01Icon,
  DashboardSquare01Icon,
  InboxIcon,
  Message01Icon,
  SidebarLeft01Icon,
  TruckIcon,
} from '@hugeicons/core-free-icons'
import { Icon } from '@/components/icon'
import UserMenu from '@/components/user-menu'

const SIDEBAR_COOKIE = 'astra_sidebar'

const links = [
  { href: '/', label: 'Overview', icon: DashboardSquare01Icon },
  { href: '/quotes', label: 'Quotes', icon: InboxIcon },
  { href: '/messages', label: 'Messages', icon: Message01Icon },
  { href: '/website/services', label: 'Services', icon: TruckIcon },
  { href: '/website/jobs', label: 'Careers', icon: Briefcase01Icon },
]

export default function AppShellClient({
  children,
  collapsed: initialCollapsed,
  name,
  email,
  role,
}: {
  children: React.ReactNode
  collapsed: boolean
  name: string
  email: string
  role: string
}) {
  const [collapsed, setCollapsed] = useState(initialCollapsed)

  function toggleSidebar() {
    const next = !collapsed
    setCollapsed(next)
    document.cookie = `${SIDEBAR_COOKIE}=${next ? '1' : '0'}; Path=/; Max-Age=31536000; SameSite=Lax`
  }

  return (
    <div className="flex h-dvh overflow-hidden">
      <aside
        id="console-sidebar"
        className={`flex h-full shrink-0 flex-col bg-navy-950 py-6 text-white transition-[width] duration-200 ease-out motion-reduce:transition-none ${
          collapsed ? 'w-[4.5rem] px-2' : 'w-64 px-4'
        }`}
      >
        <Link
          href="/"
          className={`flex shrink-0 items-center gap-3 ${collapsed ? 'justify-center px-0' : 'px-2'}`}
        >
          <img src="/mark.svg" alt={collapsed ? 'Astra Nova' : ''} className="h-10 w-auto" />
          {collapsed ? null : (
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wide">Astra Nova</p>
              <p className="text-[11px] text-accent-500">Operations</p>
            </div>
          )}
        </Link>
        <nav className="mt-8 flex min-h-0 flex-1 flex-col gap-1 overflow-hidden">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-md py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-accent-500 ${
                collapsed ? 'justify-center px-0' : 'px-3'
              }`}
            >
              <Icon icon={icon} size={18} />
              {collapsed ? <span className="sr-only">{label}</span> : label}
            </Link>
          ))}
        </nav>
        <div className="shrink-0 border-t border-white/10 pt-4">
          <UserMenu name={name} email={email} role={role} collapsed={collapsed} />
        </div>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-expanded={!collapsed}
            aria-controls="console-sidebar"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-navy-900 transition hover:bg-slate-100"
          >
            <Icon icon={SidebarLeft01Icon} size={22} />
          </button>
          <div>
            <p className="text-sm font-semibold text-navy-900">Astra Nova Holdings Ltd</p>
            <p className="text-xs text-slate-500">Admin dashboard · admin.astranova.co.tz</p>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto px-8 py-8">{children}</main>
      </div>
    </div>
  )
}
