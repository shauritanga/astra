import { Truck, Globe, Box, HardHat, Phone, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'

const services = [
  { icon: Truck, label: 'Road Freight\nTransportation' },
  { icon: Globe, label: 'Cross-Border\nCargo Movement' },
  { icon: Box, label: 'Logistics\nCoordination' },
  { icon: HardHat, label: 'Mining Supply\nSolutions' },
]

const contacts = [
  { icon: Phone, label: '+255 000 000 000' },
  { icon: Mail, label: 'info@astranova.co.tz' },
  { icon: Globe, label: 'www.astranova.co.tz' },
  { icon: MapPin, label: 'P.O. Box 8676, Dar es Salaam, Tanzania' },
]

export default function Footer() {
  return (
    <footer className="border-t border-accent-500/30 bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr] lg:divide-x lg:divide-accent-500/20 lg:px-10">
        <Reveal className="flex flex-col items-start gap-4">
          <img src="/assets/logo.svg" alt="Astra Nova Holdings Ltd" className="h-24 w-auto" />
          <p className="text-sm font-semibold text-accent-500">Moving Business Forward</p>
          <p className="text-sm text-slate-300">Across East and Southern Africa</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:px-8">
          <h3 className="text-center text-lg font-bold uppercase tracking-wide text-accent-500 lg:text-center">
            Services
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:divide-x sm:divide-accent-500/20">
            {services.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                className="flex flex-col items-center gap-3 px-2 text-center"
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500 transition-colors hover:bg-accent-500 hover:text-navy-950">
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <p className="whitespace-pre-line text-xs font-medium uppercase tracking-wide text-slate-200">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="lg:pl-8">
          <h3 className="text-lg font-bold uppercase tracking-wide text-accent-500">Contact Us</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {contacts.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-slate-200">
                <Icon size={16} className="shrink-0 text-accent-500" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </footer>
  )
}
