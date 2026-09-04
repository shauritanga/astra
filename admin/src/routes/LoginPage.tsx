import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { apiPost, ApiError } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import type { AdminUser } from '../lib/types'

const inputClass =
  'w-full rounded-md border border-white/15 bg-navy-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

export default function LoginPage() {
  const { user, loading, setUser } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  if (!loading && user) {
    return <Navigate to={searchParams.get('from') || '/'} replace />
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setPending(true)
    const form = new FormData(e.currentTarget)
    try {
      const data = await apiPost<{ ok: true; user: AdminUser }>('login.php', {
        email: form.get('email'),
        password: form.get('password'),
      })
      setUser(data.user)
      navigate(searchParams.get('from') || '/')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not log in.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-navy-900 p-8">
        <h1 className="font-display text-2xl font-black uppercase text-white">
          Astra Nova <span className="text-accent-500">Admin</span>
        </h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">Email</label>
            <input required name="email" type="email" autoComplete="email" className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">Password</label>
            <input required name="password" type="password" autoComplete="current-password" className={inputClass} />
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-accent-500 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 disabled:opacity-60"
          >
            {pending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
