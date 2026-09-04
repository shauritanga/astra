import {
  Truck,
  Users,
  ShieldCheck,
  Handshake,
  Headset,
  Phone,
  Mail,
  Clock,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import { useSiteContent } from '../context/SiteContent'
import { serviceIconMap } from '../data/siteContent'

const commitments = [
  {
    icon: Users,
    text: 'At Astra Nova Holdings Ltd, we know that our clients are not simply moving cargo. They are moving products, equipment, materials and resources that are important to their businesses.',
  },
  {
    icon: ShieldCheck,
    text: 'That is why we approach every assignment with care. We are committed to providing services that are dependable, transparent and responsive. We take the time to understand our clients’ requirements, plan the movement carefully and remain engaged throughout the process.',
  },
  {
    icon: Handshake,
    text: 'As a growing company, we see every assignment as an opportunity to demonstrate what Astra Nova stands for. We may be building our business, but our commitment to professional service, strong relationships and reliable execution is at the heart of everything we do.',
  },
]

export default function RegionalReach() {
  const { contact, services } = useSiteContent()

  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.4fr_1.4fr_0.6fr] lg:px-10">
          <Reveal>
            <h1 className="font-display text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              Our <span className="text-accent-500">Regional Reach</span>
            </h1>
            <span className="mt-4 block h-px w-16 bg-accent-500" />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300">
              <p>
                Tanzania&rsquo;s position on the East African coast provides an important
                connection between international markets and landlocked countries across the
                region. Astra Nova Holdings Ltd is positioned to support cargo movements along
                key East and Southern African trade corridors.
              </p>
              <p>
                Our focus is on developing dependable transportation and logistics solutions
                connecting{' '}
                <span className="text-accent-500">
                  Tanzania with neighbouring and regional markets,
                </span>{' '}
                including destinations across Zambia, the Democratic Republic of Congo, Malawi,
                Rwanda, Burundi, Uganda and other markets where our clients require support.
              </p>
              <p>
                We understand that regional cargo movement can involve long distances, border
                crossings, changing road conditions and multiple service providers. Our role is
                to coordinate these moving parts and provide clients with a practical, dependable
                logistics solution.
              </p>
              <p>
                As our business grows, we continue to develop our network of transporters,
                suppliers and logistics partners to strengthen our ability to serve clients
                across the region.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full min-h-[420px] overflow-hidden rounded-xl shadow-2xl">
            <img
              src="/assets/regional_map.png"
              alt="Map of Astra Nova Holdings' regional trade network across East and Southern Africa, connecting Dar es Salaam with Uganda, Rwanda, Burundi, DR Congo, Zambia and Malawi"
              className="h-full w-full scale-110 object-cover transition-transform duration-700 hover:scale-125"
            />
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="font-display text-lg font-bold uppercase text-accent-500">
              We Connect
              <br />
              the Region
            </h2>
            <ul className="mt-5 space-y-5">
              {services.map(({ iconKey, title }, i) => {
                const Icon = serviceIconMap[iconKey] ?? Truck
                return (
                <motion.li
                  key={title}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-accent-500 text-accent-500">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <span className="text-sm text-white">{title}</span>
                </motion.li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-900">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <img
              src="/assets/hero_truck.png"
              alt="Astra Nova truck on regional highway"
              className="h-72 w-full rounded-xl object-cover shadow-2xl lg:h-full"
            />
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="font-display text-3xl font-black uppercase text-white sm:text-4xl">
              Our <span className="text-accent-500">Commitment</span>
            </h2>
            <span className="mt-3 block h-px w-16 bg-accent-500" />
            <div className="mt-6 space-y-5">
              {commitments.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Icon size={20} className="mt-1 shrink-0 text-accent-500" strokeWidth={1.75} />
                  <p className="text-sm leading-relaxed text-slate-300">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-white/10 pt-5 text-lg font-semibold">
              <span className="text-accent-500">Driven by reliability.</span>{' '}
              <span className="text-white">Delivered with pride.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-6 text-center sm:flex-row sm:text-left lg:px-10">
          <div className="flex items-center gap-3">
            <Headset size={22} className="shrink-0 text-navy-900" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-navy-900">
                Prefer to speak with us?
              </p>
              <p className="text-xs text-slate-600">Our team is ready to assist you.</p>
            </div>
          </div>
          <span className="hidden h-10 w-px bg-slate-300 sm:block" />
          <div className="flex items-center gap-2 text-sm text-navy-900">
            <Phone size={16} className="text-navy-900" />
            <a href={`tel:${contact.phoneTel}`} className="hover:text-accent-600">
              {contact.phoneDisplay}
            </a>
          </div>
          <span className="hidden h-10 w-px bg-slate-300 sm:block" />
          <div className="flex items-center gap-2 text-sm text-navy-900">
            <Mail size={16} className="text-navy-900" /> {contact.emailInfo}
          </div>
          <span className="hidden h-10 w-px bg-slate-300 sm:block" />
          <div className="flex items-center gap-2 text-sm text-navy-900">
            <Clock size={16} className="text-navy-900" /> {contact.hoursWeekday}
          </div>
        </div>
      </section>
    </>
  )
}
