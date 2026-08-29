import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import Reveal from './Reveal'
import { navItems } from '../data/nav'
import { useSiteContent } from '../context/SiteContent'
import type { SocialNetwork } from '../data/siteContent'

const extraLinks = [
  { label: 'Why Astra Nova', path: '/why-astra-nova' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Get a Quote', path: '/get-a-quote' },
]

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
    </svg>
  )
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 9.5H4V20h2.5V9.5ZM5.25 4A1.75 1.75 0 1 0 5.25 7.5 1.75 1.75 0 0 0 5.25 4ZM20 20h-2.5v-5.6c0-1.9-.7-2.6-1.8-2.6-1.2 0-1.9.9-1.9 2.6V20H11.3s.03-9.3 0-10.5H13.8v1.6c.5-.9 1.6-1.9 3.4-1.9 2.3 0 4.8 1.4 4.8 5.5V20Z" />
    </svg>
  )
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 3c.4 2.4 1.8 4.3 4.1 5v3c-1.5 0-2.9-.5-4.1-1.3V15a6.5 6.5 0 1 1-6.5-6.5c.3 0 .7 0 1 .1v3.1a3.4 3.4 0 1 0 2.4 3.3V3h3.1Z" />
    </svg>
  )
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.7 10.3 22 2h-2.2l-6.4 7.2L8.2 2H2l7.7 10.9L2 22h2.2l6.8-7.7L15.8 22H22l-7.3-11.7Zm-2.4 2.7-.8-1.1L5 3.5h2.5l5.1 7.1.8 1.1 6.7 9.3H17l-4.7-6.9Z" />
    </svg>
  )
}

const socialIcons: Record<SocialNetwork, typeof FacebookIcon> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  tiktok: TikTokIcon,
}

const socialNames: Record<SocialNetwork, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  x: 'X',
  tiktok: 'TikTok',
}

export default function Footer() {
  const { contact, socials } = useSiteContent()
  const contacts = [
    { icon: Phone, label: contact.phoneDisplay, href: `tel:${contact.phoneTel}` },
    { icon: Mail, label: contact.emailInfo, href: `mailto:${contact.emailInfo}` },
    { icon: MapPin, label: `${contact.addressLine1} ${contact.addressLine2}`.replace(/\s+/g, ' ').trim() },
  ]

  return (
    <footer className="border-t border-accent-500/30 bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-accent-500/20 lg:px-10">
        <Reveal className="flex flex-col items-start">
          <img src="/assets/logo.svg" alt="Astra Nova Holdings Ltd" className="h-24 w-auto" />
          <p className="mt-3 text-sm font-semibold leading-snug text-accent-500">
            Moving Business Forward
            <span className="mt-0.5 block font-medium text-slate-300">
              Across East and Southern Africa
            </span>
          </p>
          {socials.length > 0 ? (
            <div className="mt-5 flex items-center gap-2.5" aria-label="Social networks">
              {socials.map(({ network, url }) => {
                const Icon = socialIcons[network]
                if (!Icon) return null
                return (
                  <a
                    key={network}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialNames[network]}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500 transition-colors hover:bg-accent-500 hover:text-navy-950"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="lg:px-8">
          <h3 className="text-lg font-bold uppercase tracking-wide text-accent-500">Explore</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {[...navItems.filter((item) => item.path !== '/'), ...extraLinks].map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="text-sm text-slate-200 transition-colors hover:text-accent-500"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2} className="lg:pl-8">
          <h3 className="text-lg font-bold uppercase tracking-wide text-accent-500">Contact Us</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {contacts.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-slate-200">
                <Icon size={16} className="shrink-0 text-accent-500" aria-hidden="true" />
                {href ? (
                  <a href={href} className="transition-colors hover:text-accent-500">
                    {label}
                  </a>
                ) : (
                  label
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="border-t border-accent-500/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-center sm:flex-row sm:text-left lg:px-10">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Astra Nova Holdings Ltd. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Driven by reliability. <span className="text-accent-500">Delivered with pride.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
