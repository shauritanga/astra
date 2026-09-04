export type InquiryStatus = 'new' | 'in_progress' | 'closed'

export type Quote = {
  id: string
  company_name: string
  contact_person: string
  phone: string
  email: string
  service_type: string
  details: string
  status: InquiryStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  full_name: string
  company_name: string
  email: string
  phone: string
  subject: string
  message: string
  status: InquiryStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export type ServiceIconKey = 'truck' | 'globe' | 'clipboard' | 'hardhat'
export type SocialNetwork = 'facebook' | 'instagram' | 'linkedin' | 'x' | 'tiktok'

export type Service = {
  id: string
  slug: string
  title: string
  summary: string
  body: string
  image_url: string
  icon_key: ServiceIconKey
  sort_order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export type Job = {
  id: string
  title: string
  department: string
  location: string
  description: string
  is_open: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type CompanySettings = {
  phone_display: string
  phone_tel: string
  email_info: string
  email_operations: string
  address_line1: string
  address_line2: string
  hours_weekday: string
  hours_saturday: string
}

export type SocialLink = {
  network: SocialNetwork
  url: string
  is_published: boolean
}

export type SettingsResponse = {
  contact: CompanySettings | null
  socials: SocialLink[]
}

export type AdminUser = {
  id: string
  email: string
  name: string
  role: string
}
