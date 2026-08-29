import { motion, type Variants } from 'framer-motion'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Home() {
  return (
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
  )
}
