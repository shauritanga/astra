import { Truck, Globe, ClipboardList, HardHat, type LucideIcon } from 'lucide-react'
import { adminApiUrl } from './api'

export type ServiceIconKey = 'truck' | 'globe' | 'clipboard' | 'hardhat'
export type SocialNetwork = 'facebook' | 'instagram' | 'linkedin' | 'x' | 'tiktok'

export type SiteContact = {
  phoneDisplay: string
  phoneTel: string
  emailInfo: string
  emailOperations: string
  addressLine1: string
  addressLine2: string
  hoursWeekday: string
  hoursSaturday: string
}

export type SiteService = {
  id: string
  slug: string
  title: string
  summary: string
  body: string
  imageUrl: string
  iconKey: ServiceIconKey
}

export type SiteJob = {
  id: string
  title: string
  department: string
  location: string
  description: string
}

export type SiteSocial = {
  network: SocialNetwork
  url: string
}

export type SiteContent = {
  contact: SiteContact
  services: SiteService[]
  jobs: SiteJob[]
  socials: SiteSocial[]
}

export const serviceIconMap: Record<ServiceIconKey, LucideIcon> = {
  truck: Truck,
  globe: Globe,
  clipboard: ClipboardList,
  hardhat: HardHat,
}

export const fallbackContent: SiteContent = {
  contact: {
    phoneDisplay: '+255 629 593 331',
    phoneTel: '+255629593331',
    emailInfo: 'info@astranova.co.tz',
    emailOperations: 'operations@astranova.co.tz',
    addressLine1: 'P.O. Box 8676,',
    addressLine2: 'Dar es Salaam, Tanzania',
    hoursWeekday: 'Mon – Fri: 08:00 AM – 05:00 PM (EAT)',
    hoursSaturday: 'Saturday: 09:00 AM – 01:00 PM (EAT)',
  },
  services: [
    {
      id: 'road-freight',
      slug: 'road-freight',
      title: 'Road Freight',
      summary:
        'Reliable road transportation for commercial and industrial cargo across Tanzania and the wider East and Southern African region.',
      body: `We provide reliable road transportation for commercial and industrial cargo across Tanzania and the wider East and Southern African region. Our road freight solutions are structured around the specific requirements of each shipment, including cargo type, destination, timing and route.

From standard commercial loads to heavy and specialized cargo, we focus on safe handling, proper trip planning and dependable delivery. Our objective is straightforward: to get cargo where it needs to be, in good condition and within the agreed timeframe.`,
      imageUrl: '/assets/quote_truck.png',
      iconKey: 'truck',
    },
    {
      id: 'cross-border-cargo',
      slug: 'cross-border-cargo',
      title: 'Cross-Border Cargo Movement',
      summary:
        'Coordinated cargo movements along regional trade corridors, with documentation and border processes handled as part of the journey.',
      body: `Moving cargo across borders requires more than a truck and a destination. It involves careful coordination, accurate documentation, border procedures and close communication between everyone involved in the shipment.

Astra Nova supports cross-border cargo movements along regional trade corridors, coordinating the different stages of transportation to help minimize unnecessary delays and keep shipments progressing. We work with relevant transport and logistics partners to ensure that cargo moves efficiently from origin to destination.

Our regional focus enables us to support businesses moving goods between Tanzania and markets across East and Southern Africa.`,
      imageUrl: '/assets/border_crossing_tanzania.png',
      iconKey: 'globe',
    },
    {
      id: 'logistics-coordination',
      slug: 'logistics-coordination',
      title: 'Logistics Coordination & Planning',
      summary:
        'Routing, scheduling, documentation and communication brought together so shipments stay visible and on track.',
      body: `Effective logistics starts long before a vehicle leaves the yard. We provide logistics coordination and planning services that bring together transportation, routing, scheduling, documentation and communication into one organized process.

We help clients plan the movement of their cargo based on the nature of the shipment, required delivery timelines and route conditions. Where several parties are involved, we coordinate the different activities to ensure that everyone is working toward the same delivery objective.

Our role is to make the logistics process easier for our clients, giving them better visibility and a dependable point of coordination throughout the movement.`,
      imageUrl: '/assets/astra_nova_worker.png',
      iconKey: 'clipboard',
    },
    {
      id: 'mining-supply',
      slug: 'mining-supply',
      title: 'Mining Supply Solutions',
      summary:
        'Sourcing and supplying mining equipment, gear and materials — and moving them to remote and cross-border sites.',
      body: `We provide supply support to the mining sector, with a focus on sourcing and supplying quality mining-related equipment, gear and operational materials.

Understanding that mining operations depend on the availability of the right equipment and supplies, we work with clients to identify their requirements and source suitable products from reliable suppliers. Our solutions can support mining contractors, operators and other businesses involved in the sector.

Beyond supply, our logistics capabilities allow us to support the movement of mining equipment and materials to their required destinations, including remote and cross-border locations where careful planning is essential.`,
      imageUrl: '/assets/mining_truck_excavator.png',
      iconKey: 'hardhat',
    },
  ],
  jobs: [
    {
      id: '1',
      title: 'Logistics Coordinator',
      department: 'Operations',
      location: 'Dar es Salaam, Tanzania',
      description:
        'Coordinate shipments, documentation and partner communication so cargo stays on schedule across regional corridors.',
    },
    {
      id: '2',
      title: 'Transport Planner',
      department: 'Operations',
      location: 'Dar es Salaam, Tanzania',
      description: 'Plan routes, timing and vehicle allocation for commercial, industrial and cross-border movements.',
    },
    {
      id: '3',
      title: 'Fleet Maintenance Supervisor',
      department: 'Fleet & Maintenance',
      location: 'Dar es Salaam, Tanzania',
      description:
        'Oversee vehicle readiness, servicing schedules and workshop coordination so the fleet stays reliable.',
    },
    {
      id: '4',
      title: 'Business Development Executive',
      department: 'Business Development',
      location: 'Dar es Salaam, Tanzania',
      description: 'Build client relationships, understand cargo requirements and grow Astra Nova’s regional logistics work.',
    },
  ],
  socials: [],
}

export function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const res = await fetch(`${adminApiUrl}/api/public/content.php`)
  if (!res.ok) throw new Error('Could not load site content')
  return (await res.json()) as SiteContent
}
