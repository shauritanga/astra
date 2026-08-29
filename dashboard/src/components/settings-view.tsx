'use client'

import { useEffect, useState, type ReactNode } from 'react'
import {
  Call02Icon,
  Clock01Icon,
  Location01Icon,
  LockPasswordIcon,
  Mail01Icon,
  Share01Icon,
} from '@hugeicons/core-free-icons'
import { Icon } from '@/components/icon'
import { updatePassword } from '@/app/actions'
import { updateCompanySettings, updateSocials } from '@/app/cms-actions'
import type { CompanySettings } from '@/lib/db'

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

const tabs = [
  { id: 'contact', label: 'Company', icon: Call02Icon },
  { id: 'socials', label: 'Socials', icon: Share01Icon },
  { id: 'account', label: 'Password', icon: LockPasswordIcon },
] as const

type TabId = (typeof tabs)[number]['id']

const socialLabels: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  x: 'X',
  tiktok: 'TikTok',
}

function Field({
  id,
  name,
  label,
  hint,
  children,
}: {
  id: string
  name?: string
  label: string
  hint?: string
  children?: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
      </label>
      {children ?? (
        <input id={id} name={name ?? id} required className={inputClass} />
      )}
      {hint ? <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{hint}</p> : null}
    </div>
  )
}

function Card({
  icon,
  title,
  description,
  children,
}: {
  icon: typeof Call02Icon
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start gap-4 border-b border-white/10 bg-navy-950 px-6 py-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-accent-500/40 text-accent-500">
          <Icon icon={icon} size={20} />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-300">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export default function SettingsView({
  contact,
  socials,
}: {
  contact: CompanySettings | null
  socials: { network: string; url: string; is_published: boolean }[]
}) {
  const [tab, setTab] = useState<TabId>('contact')

  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '')
    if (fromHash === 'contact' || fromHash === 'socials' || fromHash === 'account') {
      setTab(fromHash)
    }
  }, [])

  function selectTab(id: TabId) {
    setTab(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">Dashboard</p>
      <h1 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">
        Settings
      </h1>
      <span className="mt-3 block h-1 w-14 bg-accent-500" />
      <p className="mt-3 max-w-2xl text-sm text-slate-600">
        Details shown on astranova.co.tz, plus the password for this account.
      </p>

      <div
        role="tablist"
        aria-label="Settings sections"
        className="mt-8 flex gap-1 rounded-lg bg-navy-950 p-1"
      >
        {tabs.map(({ id, label, icon }) => {
          const active = tab === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectTab(id)}
              className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
                active
                  ? 'bg-accent-500 text-navy-950'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon icon={icon} size={16} />
              {label}
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        {tab === 'contact' ? (
          contact ? (
            <Card
              icon={Call02Icon}
              title="Company contact"
              description="Used in the footer, contact page, quote form, and careers page."
            >
              <form action={updateCompanySettings} className="space-y-8 p-6">
                <fieldset>
                  <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Icon icon={Call02Icon} size={14} /> Phone
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="phoneDisplay" name="phoneDisplay" label="Shown on the site" hint="With spaces, as visitors should read it.">
                      <input
                        id="phoneDisplay"
                        name="phoneDisplay"
                        required
                        defaultValue={contact.phone_display}
                        className={inputClass}
                      />
                    </Field>
                    <Field id="phoneTel" name="phoneTel" label="Tap-to-call number" hint="Digits only, with country code.">
                      <input
                        id="phoneTel"
                        name="phoneTel"
                        required
                        defaultValue={contact.phone_tel}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Icon icon={Mail01Icon} size={14} /> Email
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="emailInfo" name="emailInfo" label="General" hint="Footer, careers, and regional reach.">
                      <input
                        id="emailInfo"
                        name="emailInfo"
                        type="email"
                        required
                        defaultValue={contact.email_info}
                        className={inputClass}
                      />
                    </Field>
                    <Field
                      id="emailOperations"
                      name="emailOperations"
                      label="Operations"
                      hint="Contact form and quote requests."
                    >
                      <input
                        id="emailOperations"
                        name="emailOperations"
                        type="email"
                        required
                        defaultValue={contact.email_operations}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Icon icon={Location01Icon} size={14} /> Office
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="addressLine1" name="addressLine1" label="Address line 1">
                      <input
                        id="addressLine1"
                        name="addressLine1"
                        required
                        defaultValue={contact.address_line1}
                        className={inputClass}
                      />
                    </Field>
                    <Field id="addressLine2" name="addressLine2" label="Address line 2">
                      <input
                        id="addressLine2"
                        name="addressLine2"
                        required
                        defaultValue={contact.address_line2}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Icon icon={Clock01Icon} size={14} /> Hours
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="hoursWeekday" name="hoursWeekday" label="Monday – Friday">
                      <input
                        id="hoursWeekday"
                        name="hoursWeekday"
                        required
                        defaultValue={contact.hours_weekday}
                        className={inputClass}
                      />
                    </Field>
                    <Field id="hoursSaturday" name="hoursSaturday" label="Saturday">
                      <input
                        id="hoursSaturday"
                        name="hoursSaturday"
                        required
                        defaultValue={contact.hours_saturday}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </fieldset>

                <div className="flex justify-end border-t border-slate-100 pt-5">
                  <button
                    type="submit"
                    className="min-h-11 rounded-md bg-accent-500 px-6 text-sm font-bold uppercase tracking-wide text-navy-950 hover:bg-accent-400"
                  >
                    Save contact
                  </button>
                </div>
              </form>
            </Card>
          ) : (
            <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              Company contact is not configured yet.
            </p>
          )
        ) : null}

        {tab === 'socials' ? (
          <Card
            icon={Share01Icon}
            title="Social links"
            description="Footer icons appear only when a URL is saved. Leave a row blank to hide it."
          >
            <form action={updateSocials} className="p-6">
              <ul className="divide-y divide-slate-100">
                {socials.map((social) => (
                  <li key={social.network} className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7.5rem_1fr_auto] sm:items-center">
                    <label
                      htmlFor={`${social.network}_url`}
                      className="text-sm font-semibold text-navy-900"
                    >
                      {socialLabels[social.network] ?? social.network}
                    </label>
                    <input
                      id={`${social.network}_url`}
                      name={`${social.network}_url`}
                      type="text"
                      placeholder="https://"
                      defaultValue={social.url}
                      className={inputClass}
                    />
                    <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        name={`${social.network}_published`}
                        defaultChecked={social.is_published}
                        className="peer sr-only"
                      />
                      <span className="relative h-6 w-11 shrink-0 rounded-full bg-slate-300 transition peer-checked:bg-accent-500 peer-focus-visible:ring-2 peer-focus-visible:ring-accent-500/40 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5" />
                      On site
                    </label>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex justify-end border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  className="min-h-11 rounded-md bg-accent-500 px-6 text-sm font-bold uppercase tracking-wide text-navy-950 hover:bg-accent-400"
                >
                  Save socials
                </button>
              </div>
            </form>
          </Card>
        ) : null}

        {tab === 'account' ? (
          <Card
            icon={LockPasswordIcon}
            title="Password"
            description="Changes the password for the account you are signed in with."
          >
            <form action={updatePassword} className="space-y-5 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="currentPassword" name="currentPassword" label="Current password">
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    required
                    autoComplete="current-password"
                    className={inputClass}
                  />
                </Field>
                <Field
                  id="newPassword"
                  name="newPassword"
                  label="New password"
                  hint="At least 8 characters."
                >
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="flex justify-end border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  className="min-h-11 rounded-md bg-accent-500 px-6 text-sm font-bold uppercase tracking-wide text-navy-950 hover:bg-accent-400"
                >
                  Update password
                </button>
              </div>
            </form>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
