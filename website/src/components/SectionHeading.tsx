interface SectionHeadingProps {
  lead: string
  accent: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export default function SectionHeading({
  lead,
  accent,
  subtitle,
  align = 'center',
  dark = false,
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <div className={`${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      <h2
        className={`font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl ${
          dark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {lead} <span className="text-accent-500">{accent}</span>
      </h2>
      <div
        className={`mt-4 flex items-center gap-2 ${isCenter ? 'justify-center' : 'justify-start'}`}
      >
        <span className="h-px w-16 bg-accent-500" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
      </div>
      {subtitle && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base ${dark ? 'text-slate-300' : 'text-slate-600'} ${
            isCenter ? '' : 'mx-0'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
