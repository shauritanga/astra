import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Astra Nova Admin',
  description: 'Operations dashboard for Astra Nova Holdings Ltd',
  icons: {
    icon: [{ url: '/mark.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png' }],
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full overflow-hidden antialiased`}>
      <body className="h-full overflow-hidden bg-[#eef2f6] font-sans text-navy-950">{children}</body>
    </html>
  )
}
