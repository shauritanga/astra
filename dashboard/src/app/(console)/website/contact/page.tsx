import { redirect } from 'next/navigation'

export default function ContactRedirectPage() {
  redirect('/settings#contact')
}
