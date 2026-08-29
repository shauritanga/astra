import { Truck, Globe, ClipboardList, HardHat } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import CtaStrip from '../components/CtaStrip'
import Reveal from '../components/Reveal'

const services = [
  {
    icon: Truck,
    image: '/assets/hero_truck.png',
    title: 'Road Freight',
    paragraphs: [
      'We provide reliable road transportation for commercial and industrial cargo across Tanzania and the wider East and Southern African region. Our road freight solutions are structured around the specific requirements of each shipment, including cargo type, destination, timing and route.',
      'From standard commercial loads to heavy and specialized cargo, we focus on safe handling, proper trip planning and dependable delivery. Our objective is straightforward: to get cargo where it needs to be, in good condition and within the agreed timeframe.',
    ],
  },
  {
    icon: Globe,
    image: '/assets/contact_truck.png',
    title: 'Cross-Border Cargo Movement',
    paragraphs: [
      'Moving cargo across borders requires more than a truck and a destination. It involves careful coordination, accurate documentation, border procedures and close communication between everyone involved in the shipment.',
      'Astra Nova supports cross-border cargo movements along regional trade corridors, coordinating the different stages of transportation to help minimize unnecessary delays and keep shipments progressing. We work with relevant transport and logistics partners to ensure that cargo moves efficiently from origin to destination.',
      'Our regional focus enables us to support businesses moving goods between Tanzania and markets across East and Southern Africa.',
    ],
  },
  {
    icon: ClipboardList,
    image: '/assets/quote_truck.png',
    title: 'Logistics Coordination & Planning',
    paragraphs: [
      'Effective logistics starts long before a vehicle leaves the yard. We provide logistics coordination and planning services that bring together transportation, routing, scheduling, documentation and communication into one organized process.',
      'We help clients plan the movement of their cargo based on the nature of the shipment, required delivery timelines and route conditions. Where several parties are involved, we coordinate the different activities to ensure that everyone is working toward the same delivery objective.',
      'Our role is to make the logistics process easier for our clients, giving them better visibility and a dependable point of coordination throughout the movement.',
    ],
  },
  {
    icon: HardHat,
    image: '/assets/hero_truck.png',
    title: 'Mining Supply Solutions',
    paragraphs: [
      'We provide supply support to the mining sector, with a focus on sourcing and supplying quality mining-related equipment, gear and operational materials.',
      'Understanding that mining operations depend on the availability of the right equipment and supplies, we work with clients to identify their requirements and source suitable products from reliable suppliers. Our solutions can support mining contractors, operators and other businesses involved in the sector.',
      'Beyond supply, our logistics capabilities allow us to support the movement of mining equipment and materials to their required destinations, including remote and cross-border locations where careful planning is essential.',
    ],
  },
]

export default function Services() {
  return (
    <>
      <section className="bg-navy-950 px-6 py-16 lg:px-10">
        <Reveal>
          <SectionHeading
            lead="OUR"
            accent="SERVICES"
            dark
            subtitle="Practical logistics and supply solutions designed to keep your business moving."
          />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, image, title, paragraphs }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-900 shadow-lg shadow-black/20 transition-colors hover:border-accent-500/40"
              >
                <div className="overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="h-44 w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-8 text-center">
                  <div className="flex h-14 w-14 -mt-14 mb-4 items-center justify-center rounded-full border-2 border-accent-500 bg-navy-900 text-accent-500">
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                    {title}
                  </h3>
                  <span className="mt-2 h-0.5 w-10 bg-accent-500" />
                  <div className="mt-4 space-y-3 text-left text-sm leading-relaxed text-slate-300">
                    {paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
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
