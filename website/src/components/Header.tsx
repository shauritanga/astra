import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '../data/nav'

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 lg:px-10">
          <NavLink to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
            <motion.img
              src="/assets/logo.svg"
              alt="Astra Nova Holdings Ltd"
              className="hidden h-16 w-auto lg:block"
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            <motion.img
              src="/assets/mark.svg"
              alt="Astra Nova Holdings Ltd"
              className="h-14 w-auto lg:hidden"
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
            className="relative z-[80] ml-auto flex min-h-11 min-w-11 items-center justify-center text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
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
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="drawer-backdrop"
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-navy-950/70 backdrop-blur-[2px] lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="mobile-drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 38 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(22rem,88vw)] flex-col border-l border-accent-500/30 bg-navy-950 pt-[5.5rem] shadow-[-16px_0_40px_rgba(0,0,0,0.35)] lg:hidden"
            >
              <div className="border-b border-white/10 px-5 py-5">
                <img src="/assets/mark.svg" alt="" className="h-12 w-auto" />
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-md px-4 py-3.5 text-sm font-semibold uppercase tracking-wide transition ${
                        isActive
                          ? 'bg-white/5 text-accent-500'
                          : 'text-white hover:bg-white/5 hover:text-accent-500'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 px-5 py-5">
                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white"
                >
                  Get In Touch <ArrowRight size={16} />
                </NavLink>
                <NavLink
                  to="/get-a-quote"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-center rounded-md bg-accent-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-navy-950"
                >
                  Get a Quote
                </NavLink>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
