import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { apiGet } from '../lib/api'
import type { AdminUser } from '../lib/types'

type AuthState = {
  user: AdminUser | null
  loading: boolean
  setUser: (user: AdminUser | null) => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet<{ user: AdminUser }>('me.php')
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  return <AuthContext.Provider value={{ user, loading, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
