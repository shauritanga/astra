import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { apiGet, apiPatch, apiDelete, ApiError } from '../../lib/api'
import type { Service } from '../../lib/types'
import ServiceForm, { type ServiceFormValues } from '../../components/ServiceForm'

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [service, setService] = useState<Service | null>(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!id) return
    apiGet<Service>(`services.php?id=${id}`)
      .then(setService)
      .catch(() => setError('Could not load this service.'))
  }, [id])

  async function handleSubmit(values: ServiceFormValues) {
    if (!id) return
    setError('')
    setPending(true)
    try {
      await apiPatch(`services.php?id=${id}`, values)
      navigate('/website/services')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save this service.')
    } finally {
      setPending(false)
    }
  }

  async function handleDelete() {
    if (!id) return
    if (!confirm('Delete this service? This cannot be undone.')) return
    try {
      await apiDelete(`services.php?id=${id}`)
      navigate('/website/services')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete this service.')
    }
  }

  if (error && !service) {
    return <p className="text-sm text-red-600">{error}</p>
  }
  if (!service) {
    return <p className="text-sm text-slate-500">Loading…</p>
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/website/services')}
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy-950"
        >
          <ArrowLeft size={16} /> Back to services
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>

      <h1 className="mb-6 font-display text-2xl font-bold text-navy-950">{service.title}</h1>

      <ServiceForm
        submitLabel="Save Changes"
        pending={pending}
        error={error}
        initial={{
          title: service.title,
          summary: service.summary,
          body: service.body,
          imageUrl: service.image_url,
          iconKey: service.icon_key,
          sortOrder: service.sort_order,
          isPublished: service.is_published,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
