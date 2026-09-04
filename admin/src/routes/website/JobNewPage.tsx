import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { apiPost, ApiError } from '../../lib/api'
import JobForm, { type JobFormValues } from '../../components/JobForm'

export default function JobNewPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(values: JobFormValues) {
    setError('')
    setPending(true)
    try {
      await apiPost('jobs.php', values)
      navigate('/website/jobs')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not create this job opening.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <button
        type="button"
        onClick={() => navigate('/website/jobs')}
        className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy-950"
      >
        <ArrowLeft size={16} /> Back to jobs
      </button>

      <h1 className="mb-6 font-display text-2xl font-bold text-navy-950">New Job Opening</h1>

      <JobForm
        submitLabel="Create Job"
        pending={pending}
        error={error}
        initial={{ title: '', department: '', location: '', description: '', sortOrder: 0, isOpen: true }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
