import { notFound } from 'next/navigation'
import { deleteJob, updateJob } from '@/app/cms-actions'
import Breadcrumb from '@/components/breadcrumb'
import ConfirmDelete from '@/components/confirm-delete'
import JobForm from '@/components/job-form'
import { getJob } from '@/lib/cms'

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await getJob(id)
  if (!job) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Overview', href: '/' },
          { label: 'Careers', href: '/website/jobs' },
          { label: job.title },
        ]}
      />
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">{job.title}</h1>
        <ConfirmDelete action={deleteJob.bind(null, job.id)} label="job" />
      </div>
      <JobForm action={updateJob.bind(null, job.id)} job={job} />
    </div>
  )
}
