import { useState, type FormEvent } from 'react'
import {
  Headset,
  ShieldCheck,
  Handshake,
  Lock,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  MessageCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import { adminApiUrl } from '../data/api'
import { useSiteContent } from '../context/SiteContent'
import { serviceIconMap } from '../data/siteContent'

const trust = [
  { icon: Headset, label: 'Responsive Team' },
  { icon: ShieldCheck, label: 'Reliable Solutions' },
  { icon: Handshake, label: 'Strong Partnerships' },
  { icon: Lock, label: 'Your Cargo, Our Priority' },
]

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

export default function ContactUs() {
  const { contact, services } = useSiteContent()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const info = [
    { icon: MapPin, title: 'Head Office', lines: [contact.addressLine1, contact.addressLine2] },
    { icon: Phone, title: 'Phone', lines: [contact.phoneDisplay], href: `tel:${contact.phoneTel}` },
    { icon: Mail, title: 'Email', lines: [contact.emailOperations], href: `mailto:${contact.emailOperations}` },
    { icon: Clock, title: 'Business Hours', lines: [contact.hoursWeekday, contact.hoursSaturday] },
  ]

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setPending(true)
    const form = new FormData(e.currentTarget)
    try {
      const res = await fetch(`${adminApiUrl}/api/public/contacts.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.get('fullName'),
          companyName: form.get('companyName'),
          email: form.get('email'),
          phone: form.get('phone'),
          subject: form.get('subject'),
          message: form.get('message'),
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error || 'Could not send the message.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the message.')
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-14 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <h1 className="font-display text-5xl font-black uppercase tracking-tight text-white">
              Contact <span className="text-accent-500">Us</span>
            </h1>
            <span className="mt-4 block h-1 w-16 bg-accent-500" />
            <p className="mt-6 max-w-md text-slate-300">
              We are here to answer your questions and provide the information you need. Reach
              out to our team and we&rsquo;ll get back to you as soon as possible.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {trust.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-slate-200">
                  <Icon size={20} className="text-accent-500" strokeWidth={1.75} />
                  {label}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <img
              src="/assets/contact_truck.png"
              alt="Astra Nova trucks at the yard"
              className="w-full rounded-xl object-cover shadow-2xl"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-12 lg:grid-cols-[1.2fr_1fr] lg:px-10">
        <Reveal className="rounded-xl bg-white p-8 shadow-lg">
          <h2 className="font-display text-2xl font-bold text-navy-900">Send Us a Message</h2>
          <span className="mt-2 block h-0.5 w-14 bg-accent-500" />

          {submitted ? (
            <div className="mt-8 rounded-md bg-emerald-50 p-6 text-sm font-medium text-emerald-700">
              Thank you — your message has been received. Our team will get back to you shortly.
            </div>
          ) : (
            <form className="mt-6 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-900">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input required name="fullName" type="text" placeholder="Enter your full name" className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-900">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input required name="companyName" type="text" placeholder="Enter your company name" className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-900">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input required name="email" type="email" placeholder="Enter your email address" className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-900">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input required name="phone" type="tel" placeholder="Enter your phone number" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-navy-900">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select required name="subject" defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option>General Inquiry</option>
                  <option>Request a Quote</option>
                  <option>Partnership</option>
                  <option>Careers</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-navy-900">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea required name="message" rows={4} placeholder="Type your message here..." className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center gap-2 rounded-md bg-accent-500 px-7 py-3 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 active:scale-95 disabled:opacity-60"
                >
                  {pending ? 'Sending…' : 'Send Message'} <ArrowRight size={16} />
                </button>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <Lock size={12} /> Your information is secure and will only be used to respond to
                  your inquiry.
                </p>
              </div>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
          <div className="rounded-xl border border-accent-500/40 bg-navy-900 p-8">
            <h2 className="font-display text-lg font-bold uppercase text-accent-500">
              Our Contact Information
            </h2>
            <span className="mt-2 block h-0.5 w-14 bg-accent-500" />
            <div className="mt-6 space-y-5">
              {info.map(({ icon: Icon, title, lines, href }) => (
                <div key={title} className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-none">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-white">{title}</p>
                    {lines.map((l) =>
                      href ? (
                        <a key={l} href={href} className="block text-sm text-slate-300 hover:text-accent-500">
                          {l}
                        </a>
                      ) : (
                        <p key={l} className="text-sm text-slate-300">
                          {l}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-56 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,#dce4ea_0%,#e9eef2_40%,#cfe0ea_100%)]" />
            <span className="absolute left-[15%] top-[20%] text-[11px] font-medium text-slate-500">Kinondoni</span>
            <span className="absolute left-[65%] top-[15%] text-[11px] font-medium text-slate-500">Oyster Bay</span>
            <span className="absolute left-[68%] top-[35%] text-[11px] font-medium text-slate-500">Masaki</span>
            <span className="absolute left-[75%] top-[70%] text-[11px] font-medium text-slate-500">Ilala</span>
            <span className="absolute left-[70%] top-[85%] text-[11px] font-medium text-slate-500">Kigamboni</span>
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MapPin size={30} className="fill-navy-900 text-navy-900" />
              <span className="mt-1 rounded bg-white/90 px-2 py-0.5 text-xs font-bold text-navy-900 shadow">
                Dar es Salaam
              </span>
            </motion.div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <Reveal className="grid gap-8 rounded-xl bg-white p-8 shadow-lg sm:grid-cols-2 lg:grid-cols-5">
          {services.map(({ iconKey, title, summary }) => {
            const Icon = serviceIconMap[iconKey] ?? MessageCircle
            return (
            <div key={title} className="flex flex-col items-start gap-3">
              <Icon size={26} className="text-accent-500" strokeWidth={1.75} />
              <div>
                <h3 className="font-display text-sm font-bold text-navy-900">{title}</h3>
                <p className="mt-1 text-xs text-slate-600">{summary}</p>
              </div>
            </div>
            )
          })}
          <div className="flex flex-col items-start gap-3">
            <MessageCircle size={26} className="text-accent-500" strokeWidth={1.75} />
            <div>
              <h3 className="font-display text-sm font-bold text-navy-900">Let&rsquo;s Talk Logistics</h3>
              <p className="mt-1 text-xs text-slate-600">We&rsquo;re ready to discuss how we can support your business.</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
