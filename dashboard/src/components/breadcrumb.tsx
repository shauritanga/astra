import Link from 'next/link'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { Icon } from '@/components/icon'

export default function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {i > 0 ? (
                <Icon icon={ArrowRight01Icon} size={14} className="text-slate-400" />
              ) : null}
              {last || !item.href ? (
                <span aria-current={last ? 'page' : undefined} className="font-medium text-navy-900">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-slate-500 transition hover:text-accent-600">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
