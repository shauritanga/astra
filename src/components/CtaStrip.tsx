import { Handshake } from 'lucide-react'

interface CtaStripProps {
  variant?: 'dark' | 'light'
}

export default function CtaStrip({ variant = 'dark' }: CtaStripProps) {
  const isDark = variant === 'dark'
  return (
    <div
      className={`mx-auto flex max-w-7xl flex-col items-center gap-4 rounded-xl border px-6 py-6 text-center sm:flex-row sm:text-left ${
        isDark
          ? 'border-accent-500/40 bg-navy-900 text-white'
          : 'border-slate-200 bg-white text-navy-900'
      }`}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500 ${
          isDark ? '' : ''
        }`}
      >
        <Handshake size={26} strokeWidth={1.75} />
      </div>
      <div className="h-px w-full bg-white/10 sm:h-10 sm:w-px" />
      <p className="text-lg font-semibold">
        <span className="text-accent-500">Driven by reliability.</span>{' '}
        <span className={isDark ? 'text-white' : 'text-navy-900'}>Delivered with pride.</span>
      </p>
      <div className="hidden h-10 w-px bg-white/10 sm:block" />
      <p className={`max-w-md text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        We are committed to delivering dependable logistics and supply solutions that help
        businesses grow and move forward across the region.
      </p>
      <div className="hidden h-10 w-px bg-white/10 sm:block" />
      <img src="/assets/logo.svg" alt="Astra Nova Holdings Ltd" className="h-12 w-auto shrink-0" />
    </div>
  )
}
