import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '../data/nav'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 lg:px-10">
        <NavLink to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <motion.img
            src="/assets/logo.svg"
            alt="Astra Nova Holdings Ltd"
            className="h-16 w-auto"
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </NavLink>

        <nav className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-7">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `relative pb-1 text-sm font-semibold uppercase tracking-wide transition hover:text-accent-500 ${
                  isActive ? 'text-accent-500' : 'text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent-500"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <NavLink
            to="/contact"
            className="flex items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-accent-500 hover:text-accent-500 active:scale-95"
          >
            Get In Touch <ArrowRight size={16} />
          </NavLink>
          <NavLink
            to="/get-a-quote"
            className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400 active:scale-95"
          >
            Get a Quote
          </NavLink>
        </div>

        <button
          type="button"
          className="ml-auto text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-1 overflow-hidden border-t border-white/10 bg-navy-950 px-5 pb-5 pt-3 lg:hidden"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition ${
                    isActive ? 'bg-white/5 text-accent-500' : 'text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white"
            >
              Get In Touch <ArrowRight size={16} />
            </NavLink>
            <NavLink
              to="/get-a-quote"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-950"
            >
              Get a Quote
            </NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
