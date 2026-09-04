import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { apiGet } from '../../lib/api'
import type { Service } from '../../lib/types'

export default function ServicesListPage() {
  const [services, setServices] = useState<Service[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    apiGet<Service[]>('services.php')
      .then(setServices)
      .catch(() => setError('Could not load services.'))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy-950">Services</h1>
        <Link
          to="/website/services/new"
          className="flex items-center gap-2 rounded-md bg-accent-500 px-4 py-2 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-accent-400"
        >
          <Plus size={16} /> New Service
        </Link>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-max text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Icon</th>
              <th className="px-4 py-3">Sort</th>
              <th className="px-4 py-3">Published</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services?.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link to={`/website/services/${s.id}`} className="font-medium text-navy-950 hover:text-accent-600">
                    {s.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{s.icon_key}</td>
                <td className="px-4 py-3 text-slate-600">{s.sort_order}</td>
                <td className="px-4 py-3 text-slate-600">{s.is_published ? 'Yes' : 'No'}</td>
              </tr>
            ))}
            {services && services.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
                  No services yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
