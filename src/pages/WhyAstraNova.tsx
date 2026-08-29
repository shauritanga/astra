import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import { whyPoints } from '../data/why'

export default function WhyAstraNova() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-14 lg:grid-cols-[0.6fr_1fr_1fr] lg:px-10">
          <motion.img
            src="/assets/mark.svg"
            alt=""
            className="mx-auto h-28 w-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl font-black text-white sm:text-5xl">
              Why Astra Nova
              <br />
              Holdings
            </h1>
            <span className="mt-4 block h-px w-16 bg-accent-500" />
            <p className="mt-6 max-w-md text-slate-300">
              We deliver practical solutions with clear communication. Our clients count on us
              for reliable logistics and mining supply services across the region.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <img
              src="/assets/quote_truck.png"
              alt="Astra Nova truck"
              className="w-full rounded-xl object-cover shadow-2xl"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-100">
        <div className="mx-auto max-w-5xl divide-y divide-slate-300 px-6 lg:px-10">
          {whyPoints.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <motion.div
                className="flex items-start gap-6 py-8"
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy-900 text-accent-500">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-10">
          <p className="text-lg font-semibold">
            <span className="text-white">Driven by reliability.</span>{' '}
            <span className="text-accent-500">Delivered with pride.</span>
          </p>
          <Link
            to="/get-a-quote"
            className="inline-flex items-center gap-2 rounded-md bg-accent-500 px-7 py-3 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 active:scale-95"
          >
            Get a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
