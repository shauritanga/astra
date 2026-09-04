import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { apiPost, ApiError } from '../../lib/api'
import ServiceForm, { type ServiceFormValues } from '../../components/ServiceForm'

export default function ServiceNewPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(values: ServiceFormValues) {
    setError('')
    setPending(true)
    try {
      await apiPost('services.php', values)
      navigate('/website/services')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not create this service.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <button
        type="button"
        onClick={() => navigate('/website/services')}
        className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy-950"
      >
        <ArrowLeft size={16} /> Back to services
      </button>

      <h1 className="mb-6 font-display text-2xl font-bold text-navy-950">New Service</h1>

      <ServiceForm
        submitLabel="Create Service"
        pending={pending}
        error={error}
        initial={{
          title: '',
          summary: '',
          body: '',
          imageUrl: '',
          iconKey: 'truck',
          sortOrder: 0,
          isPublished: true,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
