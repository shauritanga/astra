import { Link } from 'react-router-dom'
import { ShieldCheck, Users, Target, Settings, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import AfricaIcon from '../components/icons/AfricaIcon'
import Reveal from '../components/Reveal'

const stats = [
  { icon: ShieldCheck, title: 'Reliable', desc: 'We deliver on our promises.' },
  { icon: Users, title: 'Partnership', desc: 'We work together for your success.' },
  { icon: Target, title: 'Focused', desc: 'Every shipment matters.' },
  { icon: Settings, title: 'Efficient', desc: 'Practical solutions. Better outcomes.' },
  {
    icon: AfricaIcon,
    title: 'Regional Reach',
    desc: 'Connecting markets across East and Southern Africa.',
  },
]

export default function AboutUs() {
  return (
    <>
      <section className="bg-slate-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <h1 className="font-display text-5xl font-black uppercase tracking-tight text-navy-900 sm:text-6xl">
              About <span className="text-accent-500">Us</span>
            </h1>
            <span className="mt-4 block h-1 w-16 bg-accent-500" />

            <div className="mt-6 space-y-5 text-slate-700">
              <p>
                <strong className="text-navy-900">Astra Nova Holdings Ltd</strong> is a Tanzanian
                logistics and supply solutions company focused on keeping goods, businesses and
                opportunities moving across East and Southern Africa.
              </p>
              <p>
                We specialize in{' '}
                <strong className="text-navy-900">
                  regional road freight, cross-border cargo movement, logistics coordination and
                  mining supply solutions,
                </strong>{' '}
                providing practical and dependable support to businesses that need their cargo
                moved safely, efficiently and on schedule.
              </p>
              <p>
                Our approach is built around a simple understanding of logistics: every shipment
                matters. Whether it is a full-load consignments travelling across borders, cargo
                requiring coordinated movement through multiple stages, or specialized supplies
                destined for a mining operation, we take responsibility for the process from
                planning through delivery.
              </p>
              <p>
                As a growing Tanzanian company, we are committed to building long-term
                relationships with our clients by combining responsive service, careful planning
                and dependable execution. We work closely with clients, transport partners,
                clearing agents and other stakeholders to ensure that each movement is properly
                coordinated and handled with the attention it deserves.
              </p>
              <p>
                Our operations are designed around the realities of regional trade, including
                border procedures, changing road conditions, delivery schedules and the practical
                demands of moving cargo across different markets.
              </p>
              <p>
                At Astra Nova Holdings Ltd, we believe that reliability is more than delivering a
                shipment. It is about being available when needed, communicating clearly, keeping
                commitments and taking pride in the work we do.
              </p>
              <p className="text-lg font-bold text-accent-600">
                Driven by reliability. Delivered with pride.
              </p>
              <Link
                to="/why-astra-nova"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-navy-900 hover:text-accent-600"
              >
                Why choose Astra Nova <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="grid grid-cols-2 gap-4">
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              src="/assets/hero_truck.png"
              alt="Astra Nova truck on the highway"
              className="col-span-2 h-64 w-full rounded-xl object-cover shadow-lg sm:h-80"
            />
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              src="/assets/contact_truck.png"
              alt="Cargo trucks at the border"
              className="h-40 w-full rounded-xl object-cover shadow-lg"
            />
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              src="/assets/quote_truck.png"
              alt="Astra Nova truck at dusk"
              className="h-40 w-full rounded-xl object-cover shadow-lg"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-12 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/10 lg:px-10">
          {stats.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-3 px-3 text-center lg:items-start lg:text-left">
                <Icon size={30} className="text-accent-500" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
