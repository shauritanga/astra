import { useState, type FormEvent } from 'react'
import { Headset, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import { phoneDisplay, phoneTel } from '../data/contact'
import CtaStrip from '../components/CtaStrip'
import Reveal from '../components/Reveal'

const inputClass =
  'w-full rounded-md border border-white/15 bg-navy-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

export default function GetQuote() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <h1 className="font-display text-5xl font-black uppercase leading-tight tracking-tight text-white sm:text-6xl">
              Get A<br />
              <span className="text-accent-500">Quote</span>
            </h1>
            <span className="mt-4 block h-1 w-16 bg-accent-500" />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
              We handle more than <span className="text-accent-500">just road freight.</span>{' '}
              Whether it&rsquo;s moving cargo <span className="text-accent-500">across borders</span> or{' '}
              <span className="text-accent-500">sourcing and supplying mining equipment and materials,</span>{' '}
              our team is ready to understand your needs and provide a competitive quote.
            </p>

            <img
              src="/assets/quote_truck.png"
              alt="Astra Nova truck at sunset"
              className="mt-8 h-64 w-full rounded-xl object-cover shadow-2xl lg:h-80"
            />

            <div className="mt-8 rounded-xl border border-accent-500/40 bg-navy-900 p-6">
              <div className="flex items-center gap-3">
                <Headset size={22} className="text-accent-500" />
                <div>
                  <p className="font-display text-sm font-bold uppercase text-accent-500">
                    Prefer to speak with us?
                  </p>
                  <p className="text-xs text-slate-400">Our team is ready to assist you.</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-200">
                <span className="flex items-center gap-2">
                  <Phone size={15} className="text-accent-500" />
                  <a href={`tel:${phoneTel}`} className="hover:text-accent-500">
                    {phoneDisplay}
                  </a>
                </span>
                <span className="flex items-center gap-2">
                  <Mail size={15} className="text-accent-500" /> operations@astranova.co.tz
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={15} className="text-accent-500" /> Mon – Fri: 08:00 AM – 05:00 PM (EAT)
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="rounded-xl border border-accent-500/40 bg-navy-900 p-8">
            <h2 className="font-display text-2xl font-bold uppercase text-white">
              Request A <span className="text-accent-500">Quote</span>
            </h2>
            <span className="mt-2 block h-0.5 w-14 bg-accent-500" />

            {submitted ? (
              <div className="mt-8 rounded-md bg-emerald-500/10 p-6 text-sm font-medium text-emerald-400">
                Thank you — your quote request has been received. Our team will be in touch shortly.
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-200">
                    Company Name <span className="text-accent-500">*</span>
                  </label>
                  <input required type="text" placeholder="Enter company name" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-200">
                    Contact Person <span className="text-accent-500">*</span>
                  </label>
                  <input required type="text" placeholder="Enter contact person name" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-200">
                    Phone Number <span className="text-accent-500">*</span>
                  </label>
                  <input required type="tel" placeholder="Enter phone number" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-200">
                    Email Address <span className="text-accent-500">*</span>
                  </label>
                  <input required type="email" placeholder="Enter email address" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-200">
                    Service Type <span className="text-accent-500">*</span>
                  </label>
                  <select required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Select service type
                    </option>
                    <option>Road Freight</option>
                    <option>Cross-Border Cargo Movement</option>
                    <option>Logistics Coordination</option>
                    <option>Mining Supply Solutions</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-200">
                    Additional Information <span className="text-accent-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details pertaining to the service you require"
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-accent-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 active:scale-95"
                >
                  Submit Request <ArrowRight size={16} />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-10">
        <Reveal>
          <CtaStrip />
        </Reveal>
      </section>
    </>
  )
}
