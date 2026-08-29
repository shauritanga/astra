import { useState } from 'react'
import { CheckCircle2, Users, Mail, ArrowRight, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import CtaStrip from '../components/CtaStrip'
import Reveal from '../components/Reveal'
import { useSiteContent } from '../context/SiteContent'

const perks = [
  'Be part of a growing logistics company with regional impact',
  'Work with a passionate and supportive team',
  'Opportunities for learning, growth and career development',
  'Make a difference in connecting businesses across Africa',
]

export default function Careers() {
  const { jobs, contact } = useSiteContent()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-14 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <h1 className="font-display text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              Build Your Journey.
              <br />
              <span className="text-accent-500">Move the Region Forward.</span>
            </h1>
            <span className="mt-4 block h-px w-20 bg-accent-500" />
            <p className="mt-6 text-slate-300">
              At Astra Nova Holdings Ltd, our people are at the heart of everything we do. We are
              building a team of dedicated professionals who are passionate about logistics,
              driven by reliability and committed to delivering with pride.
            </p>
            <p className="mt-4 text-slate-300">
              When you join Astra Nova, you become part of a growing company with big ambitions
              and a culture that values teamwork, integrity and excellence.
            </p>
            <p className="mt-4 font-semibold text-accent-500">
              Driven by reliability. Delivered with pride.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <img
              src="/assets/contact_truck.png"
              alt="Astra Nova team members"
              className="w-full rounded-xl object-cover shadow-2xl"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-12 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <div className="h-full rounded-xl border border-white/10 bg-navy-900 p-8">
            <h2 className="font-display text-2xl font-bold uppercase text-white">
              Why Join Astra Nova?
            </h2>
            <span className="mt-2 block h-0.5 w-14 bg-accent-500" />
            <ul className="mt-6 space-y-4">
              {perks.map((perk, i) => (
                <motion.li
                  key={perk}
                  className="flex items-start gap-3 text-slate-200"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-accent-500" />
                  {perk}
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-xl bg-slate-100 p-8">
            <h2 className="font-display text-2xl font-bold uppercase text-navy-900">
              Our People. Our Strength.
            </h2>
            <span className="mt-2 block h-0.5 w-14 bg-accent-500" />
            <div className="mt-6 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500">
                <Users size={26} strokeWidth={1.75} />
              </div>
              <p className="text-slate-700">
                We believe in building strong relationships, developing talent and creating a
                workplace where everyone can thrive. We value honesty, respect and accountability
                in everything we do.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <div className="rounded-xl bg-slate-100 p-8">
            <h2 className="font-display text-xl font-bold uppercase text-navy-900">
              Current Opportunities
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Explore current openings and find a role that matches your skills and passion.
            </p>
            <div className="mt-6 divide-y divide-slate-300">
              {jobs.length === 0 ? (
                <p className="py-6 text-sm text-slate-600">There are no open roles right now.</p>
              ) : (
                jobs.map((job) => {
                  const open = openId === job.id
                  return (
                    <div key={job.id} className="py-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-navy-900">{job.title}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={12} /> {job.location} &nbsp;·&nbsp; {job.department}
                          </p>
                        </div>
                        <motion.button
                          type="button"
                          whileHover={{ x: 3 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setOpenId(open ? null : job.id)}
                          aria-expanded={open}
                          className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-navy-900 px-4 py-2 text-xs font-bold uppercase tracking-wide text-accent-500"
                        >
                          {open ? 'Hide details' : 'View details'} <ArrowRight size={13} />
                        </motion.button>
                      </div>
                      {open && job.description ? (
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">{job.description}</p>
                      ) : null}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-center gap-4 rounded-xl border border-accent-500/40 bg-navy-900 p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500">
              <Mail size={24} strokeWidth={1.75} />
            </div>
            <h3 className="font-display text-lg font-bold text-white">Don&rsquo;t see the right role?</h3>
            <p className="text-sm text-slate-300">
              Send us your CV and tell us how you can add value to our team.
            </p>
            <a
              href={`mailto:${contact.emailInfo}`}
              className="inline-flex w-fit items-center gap-2 rounded-md border border-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-accent-500 transition hover:bg-accent-500 hover:text-navy-950 active:scale-95"
            >
              Send Your CV <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </section>

      <section className="px-6 pb-16 lg:px-10">
        <Reveal>
          <CtaStrip />
        </Reveal>
      </section>
    </>
  )
}
