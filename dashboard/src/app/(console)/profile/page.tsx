import { getSession } from '@/lib/auth'
import { updateProfile } from '@/app/actions'

export default async function ProfilePage() {
  const session = await getSession()
  if (!session) return null

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">
        Profile
      </h1>
      <p className="mt-2 text-sm text-slate-600">Your account details for the Astra Nova dashboard.</p>

      <form action={updateProfile} className="mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-900">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={session.name}
            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-900">Email</label>
          <p className="rounded-md bg-slate-50 px-3 py-2.5 text-sm text-slate-600">{session.email}</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-900">Role</label>
          <p className="rounded-md bg-slate-50 px-3 py-2.5 text-sm text-slate-600">{session.role}</p>
        </div>
        <button
          type="submit"
          className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 hover:bg-accent-400"
        >
          Save profile
        </button>
      </form>
    </div>
  )
}
