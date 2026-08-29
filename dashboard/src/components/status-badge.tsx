import type { InquiryStatus } from '@/lib/db'

const styles: Record<InquiryStatus, string> = {
  new: 'bg-accent-500/15 text-accent-700',
  in_progress: 'bg-sky-100 text-sky-800',
  closed: 'bg-slate-200 text-slate-600',
}

const labels: Record<InquiryStatus, string> = {
  new: 'New',
  in_progress: 'In progress',
  closed: 'Closed',
}

export default function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
