import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import CtaStrip from '../components/CtaStrip'
import Reveal from '../components/Reveal'
import { useSiteContent } from '../context/SiteContent'
import { paragraphs, serviceIconMap } from '../data/siteContent'
import { HardHat } from 'lucide-react'

export default function Services() {
  const { services } = useSiteContent()

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
          {services.map(({ iconKey, imageUrl, title, body }, i) => {
            const Icon = serviceIconMap[iconKey] ?? HardHat
            return (
              <Reveal key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-900 shadow-lg shadow-black/20 transition-colors hover:border-accent-500/40"
                >
                  <div className="overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="h-44 w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-8 text-center">
                    <div className="mb-4 -mt-14 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-500 bg-navy-900 text-accent-500">
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                      {title}
                    </h3>
                    <span className="mt-2 h-0.5 w-10 bg-accent-500" />
                    <div className="mt-4 space-y-3 text-left text-sm leading-relaxed text-slate-300">
                      {paragraphs(body).map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
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
