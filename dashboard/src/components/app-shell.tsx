import { cookies } from 'next/headers'
import { getSession } from '@/lib/auth'
import AppShellClient from '@/components/app-shell-client'

export default async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  const jar = await cookies()

  return (
    <AppShellClient
      collapsed={jar.get('astra_sidebar')?.value === '1'}
      name={session?.name ?? 'Admin'}
      email={session?.email ?? ''}
      role={session?.role ?? 'Administrator'}
    >
      {children}
    </AppShellClient>
  )
}
