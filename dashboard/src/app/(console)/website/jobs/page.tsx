import Link from 'next/link'
import AddJobDialog from '@/components/add-job-dialog'
import { listJobs } from '@/lib/cms'

export default async function JobsCmsPage() {
  const jobs = await listJobs()

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">
            Careers
          </h1>
          <p className="mt-2 text-sm text-slate-600">Open roles shown on the public careers page.</p>
        </div>
        <AddJobDialog />
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-slate-500">
                  No jobs yet.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/website/jobs/${job.id}`}
                      className="font-semibold text-navy-900 hover:text-accent-600"
                    >
                      {job.title}
                    </Link>
                    <div className="text-xs text-slate-500">{job.location}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{job.department}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        job.is_open ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {job.is_open ? 'Open' : 'Closed'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
