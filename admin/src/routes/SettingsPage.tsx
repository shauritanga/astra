import { useEffect, useState, type FormEvent } from 'react'
import { apiGet, apiPatch, ApiError } from '../lib/api'
import type { CompanySettings, SettingsResponse, SocialLink, SocialNetwork } from '../lib/types'

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

const NETWORKS: SocialNetwork[] = ['facebook', 'instagram', 'linkedin', 'x', 'tiktok']
const NETWORK_LABELS: Record<SocialNetwork, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  x: 'X (Twitter)',
  tiktok: 'TikTok',
}

const CONTACT_FIELDS: { key: keyof CompanySettings; label: string }[] = [
  { key: 'phone_display', label: 'Phone (display)' },
  { key: 'phone_tel', label: 'Phone (tel: link)' },
  { key: 'email_info', label: 'Info Email' },
  { key: 'email_operations', label: 'Operations Email' },
  { key: 'address_line1', label: 'Address Line 1' },
  { key: 'address_line2', label: 'Address Line 2' },
  { key: 'hours_weekday', label: 'Weekday Hours' },
  { key: 'hours_saturday', label: 'Saturday Hours' },
]

export default function SettingsPage() {
  const [contact, setContact] = useState<CompanySettings | null>(null)
  const [socials, setSocials] = useState<Record<SocialNetwork, SocialLink> | null>(null)
  const [error, setError] = useState('')
  const [contactSaved, setContactSaved] = useState(false)
  const [socialsSaved, setSocialsSaved] = useState(false)
  const [pendingContact, setPendingContact] = useState(false)
  const [pendingSocials, setPendingSocials] = useState(false)

  useEffect(() => {
    apiGet<SettingsResponse>('settings.php')
      .then((data) => {
        setContact(data.contact)
        const map = {} as Record<SocialNetwork, SocialLink>
        for (const network of NETWORKS) {
          const found = data.socials.find((s) => s.network === network)
          map[network] = found ?? { network, url: '', is_published: false }
        }
        setSocials(map)
      })
      .catch(() => setError('Could not load settings.'))
  }, [])

  async function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!contact) return
    setError('')
    setContactSaved(false)
    setPendingContact(true)
    try {
      await apiPatch('settings.php', {
        contact: {
          phoneDisplay: contact.phone_display,
          phoneTel: contact.phone_tel,
          emailInfo: contact.email_info,
          emailOperations: contact.email_operations,
          addressLine1: contact.address_line1,
          addressLine2: contact.address_line2,
          hoursWeekday: contact.hours_weekday,
          hoursSaturday: contact.hours_saturday,
        },
      })
      setContactSaved(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save contact settings.')
    } finally {
      setPendingContact(false)
    }
  }

  async function handleSocialsSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!socials) return
    setError('')
    setSocialsSaved(false)
    setPendingSocials(true)
    try {
      const body: Record<string, { url: string; is_published: boolean }> = {}
      for (const network of NETWORKS) {
        body[network] = { url: socials[network].url, is_published: socials[network].is_published }
      }
      await apiPatch('socials.php', body)
      setSocialsSaved(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save social links.')
    } finally {
      setPendingSocials(false)
    }
  }

  if (error && !contact) {
    return <p className="text-sm text-red-600">{error}</p>
  }
  if (!contact || !socials) {
    return <p className="text-sm text-slate-500">Loading…</p>
  }

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="font-display text-2xl font-bold text-navy-950">Settings</h1>

      <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleContactSubmit}>
        <h2 className="font-display text-lg font-bold text-navy-950">Contact Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {CONTACT_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
              <input
                required
                value={contact[key]}
                onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
                className={inputClass}
              />
            </div>
          ))}
        </div>
        {contactSaved ? <p className="text-sm text-emerald-600">Saved.</p> : null}
        <button
          type="submit"
          disabled={pendingContact}
          className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 disabled:opacity-60"
        >
          {pendingContact ? 'Saving…' : 'Save Contact Details'}
        </button>
      </form>

      <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSocialsSubmit}>
        <h2 className="font-display text-lg font-bold text-navy-950">Social Links</h2>
        <div className="space-y-3">
          {NETWORKS.map((network) => (
            <div key={network} className="flex items-center gap-3">
              <span className="w-24 flex-shrink-0 text-sm font-medium text-slate-700">
                {NETWORK_LABELS[network]}
              </span>
              <input
                type="url"
                placeholder="https://…"
                value={socials[network].url}
                onChange={(e) => setSocials({ ...socials, [network]: { ...socials[network], url: e.target.value } })}
                className={inputClass}
              />
              <label className="flex flex-shrink-0 items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={socials[network].is_published}
                  onChange={(e) =>
                    setSocials({ ...socials, [network]: { ...socials[network], is_published: e.target.checked } })
                  }
                />
                Published
              </label>
            </div>
          ))}
        </div>
        {socialsSaved ? <p className="text-sm text-emerald-600">Saved.</p> : null}
        <button
          type="submit"
          disabled={pendingSocials}
          className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 disabled:opacity-60"
        >
          {pendingSocials ? 'Saving…' : 'Save Social Links'}
        </button>
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}
