import type { InquiryStatus } from '../lib/types'

const styles: Record<InquiryStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  closed: 'bg-emerald-100 text-emerald-700',
}

const labels: Record<InquiryStatus, string> = {
  new: 'New',
  in_progress: 'In Progress',
  closed: 'Closed',
}

export default function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
