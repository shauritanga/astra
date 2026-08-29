import {
  Building2,
  Container,
  Factory,
  Fuel,
  HardHat,
  Wheat,
  ArrowRight,
  Truck,
  Globe,
  ClipboardList,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { whyPoints } from '../data/why'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const homeServices = [
  {
    icon: Truck,
    image: '/assets/quote_truck.png',
    title: 'Road Freight',
    desc: 'Reliable road transportation for commercial and industrial cargo across Tanzania and the wider East and Southern African region.',
  },
  {
    icon: Globe,
    image: '/assets/border_crossing_tanzania.png',
    title: 'Cross-Border Cargo Movement',
    desc: 'Coordinated cargo movements along regional trade corridors, with documentation and border processes handled as part of the journey.',
  },
  {
    icon: ClipboardList,
    image: '/assets/astra_nova_worker.png',
    title: 'Logistics Coordination',
    desc: 'Routing, scheduling, documentation and communication brought together so shipments stay visible and on track.',
  },
  {
    icon: HardHat,
    image: '/assets/mining_truck_excavator.png',
    title: 'Mining Supply Solutions',
    desc: 'Sourcing and supplying mining equipment, gear and materials — and moving them to remote and cross-border sites.',
  },
]

const industries = [
  {
    icon: HardHat,
    title: 'Mining',
    desc: 'Equipment, gear and operational materials for contractors and operators, including remote and cross-border sites.',
  },
  {
    icon: Building2,
    title: 'Construction',
    desc: 'Project materials, plant and industrial cargo moved to site on schedule, including heavy and specialized loads.',
  },
  {
    icon: Wheat,
    title: 'Agriculture',
    desc: 'Inputs, produce and commercial loads along regional trade corridors, planned around harvest and delivery windows.',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    desc: 'Industrial and commercial cargo between plants, suppliers and markets across East and Southern Africa.',
  },
  {
    icon: Fuel,
    title: 'Energy',
    desc: 'Fuel, equipment and operational materials that keep energy and related field operations supplied and moving.',
  },
  {
    icon: Container,
    title: 'Trade & Import-Export',
    desc: 'Cross-border cargo for traders and wholesalers, with coordinated routing, documentation and border processes.',
  },
]

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950">
        <div className="absolute inset-y-0 right-0 hidden w-[64%] lg:block">
          <img
            src="/assets/hero_truck.png"
            alt="Astra Nova Holdings truck on the road at sunset"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-navy-950 to-transparent" />
        </div>

        <img
          src="/assets/hero_truck.png"
          alt="Astra Nova Holdings truck on the road at sunset"
          className="h-64 w-full object-cover lg:hidden"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:py-24">
          <motion.div className="max-w-xl" variants={container} initial="hidden" animate="show">
            <h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              <motion.span className="block" variants={item}>
                Moving
              </motion.span>
              <motion.span className="block text-accent-500" variants={item}>
                Business
              </motion.span>
              <motion.span className="block" variants={item}>
                Forward
              </motion.span>
            </h1>
            <motion.p
              className="mt-4 max-w-md font-display text-2xl font-extrabold uppercase leading-snug text-white sm:text-3xl"
              variants={item}
            >
              Across East and
              <br />
              Southern Africa
            </motion.p>
            <motion.span className="mt-6 block h-px w-24 bg-accent-500" variants={item} style={{ originX: 0 }} />
            <motion.div className="mt-6 space-y-1 text-base text-slate-200 sm:text-lg" variants={item}>
              <p>Reliable road freight.</p>
              <p>Seamless cross-border solutions.</p>
              <p className="font-semibold text-accent-500">Delivering value, every kilometer.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-navy-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <SectionHeading
              dark
              lead="OUR"
              accent="SERVICES"
              subtitle="Practical logistics and supply solutions designed to keep your business moving."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeServices.map(({ icon: Icon, image, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <Link to="/services" className="block h-full">
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-900 shadow-lg shadow-black/20 transition-colors hover:border-accent-500/40"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={image}
                        alt=""
                        className="h-36 w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-8 text-center">
                      <div className="mb-4 -mt-14 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-500 bg-navy-900 text-accent-500">
                        <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                        {title}
                      </h3>
                      <span className="mt-2 h-0.5 w-10 bg-accent-500" />
                      <p className="mt-4 text-left text-sm leading-relaxed text-slate-300">{desc}</p>
                    </div>
                  </motion.article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <SectionHeading
              lead="INDUSTRIES"
              accent="WE SERVE"
              subtitle="Practical freight and supply support for the sectors that keep regional trade moving."
            />
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <motion.article
                  className="flex items-start gap-5"
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-900 text-accent-500">
                    <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <SectionHeading
              dark
              lead="WHY"
              accent="ASTRA NOVA"
              subtitle="Practical solutions, clear communication, and dependable execution across the region."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="flex h-full flex-col rounded-xl border border-white/10 bg-navy-900 p-6 transition-colors hover:border-accent-500/40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500">
                    <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-white">
                    {title}
                  </h3>
                  <span className="mt-2 h-0.5 w-10 bg-accent-500" />
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{desc}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center">
              <Link
                to="/why-astra-nova"
                className="inline-flex items-center gap-2 rounded-md bg-accent-500 px-7 py-3 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 active:scale-95"
              >
                Why choose Astra Nova <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
