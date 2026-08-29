import Link from 'next/link'
import AddServiceDialog from '@/components/add-service-dialog'
import { listServices } from '@/lib/cms'

export default async function ServicesCmsPage() {
  const services = await listServices()

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">
            Services
          </h1>
          <p className="mt-2 text-sm text-slate-600">Shown on the home page, services page, and quote form.</p>
        </div>
        <AddServiceDialog />
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Order</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-slate-500">
                  No services yet.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/website/services/${service.id}`}
                      className="font-semibold text-navy-900 hover:text-accent-600"
                    >
                      {service.title}
                    </Link>
                    <div className="text-xs text-slate-500">{service.summary}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        service.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {service.is_published ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{service.sort_order}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
