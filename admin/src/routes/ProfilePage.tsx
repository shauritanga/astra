import { useState, type FormEvent } from 'react'
import { apiPatch, ApiError } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import type { AdminUser } from '../lib/types'

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [profileError, setProfileError] = useState('')
  const [profileSaved, setProfileSaved] = useState(false)
  const [pendingProfile, setPendingProfile] = useState(false)

  const [passwordError, setPasswordError] = useState('')
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [pendingPassword, setPendingPassword] = useState(false)

  async function handleProfileSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setProfileError('')
    setProfileSaved(false)
    setPendingProfile(true)
    try {
      const data = await apiPatch<{ ok: true; user: AdminUser }>('profile.php', { name })
      setUser(data.user)
      setProfileSaved(true)
    } catch (err) {
      setProfileError(err instanceof ApiError ? err.message : 'Could not update profile.')
    } finally {
      setPendingProfile(false)
    }
  }

  async function handlePasswordSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPasswordError('')
    setPasswordSaved(false)
    setPendingPassword(true)
    const form = new FormData(e.currentTarget)
    try {
      await apiPatch('password.php', {
        currentPassword: form.get('currentPassword'),
        newPassword: form.get('newPassword'),
      })
      setPasswordSaved(true)
      e.currentTarget.reset()
    } catch (err) {
      setPasswordError(err instanceof ApiError ? err.message : 'Could not update password.')
    } finally {
      setPendingPassword(false)
    }
  }

  return (
    <div className="max-w-xl space-y-8">
      <h1 className="font-display text-2xl font-bold text-navy-950">Profile</h1>

      <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleProfileSubmit}>
        <h2 className="font-display text-lg font-bold text-navy-950">Your Details</h2>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <input disabled value={user?.email ?? ''} className={`${inputClass} bg-slate-100 text-slate-500`} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        {profileError ? <p className="text-sm text-red-600">{profileError}</p> : null}
        {profileSaved ? <p className="text-sm text-emerald-600">Saved.</p> : null}
        <button
          type="submit"
          disabled={pendingProfile}
          className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 disabled:opacity-60"
        >
          {pendingProfile ? 'Saving…' : 'Save Profile'}
        </button>
      </form>

      <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handlePasswordSubmit}>
        <h2 className="font-display text-lg font-bold text-navy-950">Change Password</h2>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Current Password</label>
          <input required name="currentPassword" type="password" autoComplete="current-password" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">New Password</label>
          <input
            required
            name="newPassword"
            type="password"
            minLength={8}
            autoComplete="new-password"
            className={inputClass}
          />
        </div>
        {passwordError ? <p className="text-sm text-red-600">{passwordError}</p> : null}
        {passwordSaved ? <p className="text-sm text-emerald-600">Password updated.</p> : null}
        <button
          type="submit"
          disabled={pendingPassword}
          className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 disabled:opacity-60"
        >
          {pendingPassword ? 'Saving…' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}
