import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { apiGet, apiPatch, apiDelete, ApiError } from '../../lib/api'
import type { Job } from '../../lib/types'
import JobForm, { type JobFormValues } from '../../components/JobForm'

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [job, setJob] = useState<Job | null>(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!id) return
    apiGet<Job>(`jobs.php?id=${id}`)
      .then(setJob)
      .catch(() => setError('Could not load this job opening.'))
  }, [id])

  async function handleSubmit(values: JobFormValues) {
    if (!id) return
    setError('')
    setPending(true)
    try {
      await apiPatch(`jobs.php?id=${id}`, values)
      navigate('/website/jobs')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save this job opening.')
    } finally {
      setPending(false)
    }
  }

  async function handleDelete() {
    if (!id) return
    if (!confirm('Delete this job opening? This cannot be undone.')) return
    try {
      await apiDelete(`jobs.php?id=${id}`)
      navigate('/website/jobs')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete this job opening.')
    }
  }

  if (error && !job) {
    return <p className="text-sm text-red-600">{error}</p>
  }
  if (!job) {
    return <p className="text-sm text-slate-500">Loading…</p>
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/website/jobs')}
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy-950"
        >
          <ArrowLeft size={16} /> Back to jobs
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>

      <h1 className="mb-6 font-display text-2xl font-bold text-navy-950">{job.title}</h1>

      <JobForm
        submitLabel="Save Changes"
        pending={pending}
        error={error}
        initial={{
          title: job.title,
          department: job.department,
          location: job.location,
          description: job.description,
          sortOrder: job.sort_order,
          isOpen: job.is_open,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
