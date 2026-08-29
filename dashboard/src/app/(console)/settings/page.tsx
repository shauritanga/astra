import SettingsView from '@/components/settings-view'
import { getCompanySettings, listSocials } from '@/lib/cms'

export default async function SettingsPage() {
  const [contact, socials] = await Promise.all([getCompanySettings(), listSocials()])
  return (
    <SettingsView
      contact={contact}
      socials={socials.map((s) => ({ network: s.network, url: s.url, is_published: s.is_published }))}
    />
  )
}
