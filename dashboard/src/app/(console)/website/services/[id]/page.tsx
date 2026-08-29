import { notFound } from 'next/navigation'
import { deleteService, updateService } from '@/app/cms-actions'
import Breadcrumb from '@/components/breadcrumb'
import ConfirmDelete from '@/components/confirm-delete'
import ServiceForm from '@/components/service-form'
import { getService } from '@/lib/cms'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = await getService(id)
  if (!service) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Overview', href: '/' },
          { label: 'Services', href: '/website/services' },
          { label: service.title },
        ]}
      />
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-navy-950">
          {service.title}
        </h1>
        <ConfirmDelete action={deleteService.bind(null, service.id)} label="service" />
      </div>
      <ServiceForm action={updateService.bind(null, service.id)} service={service} />
    </div>
  )
}
