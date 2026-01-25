import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com'
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Spirit Numeral",
  "url": siteUrl
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Spirit Numeral",
  "url": siteUrl,
  "logo": `${siteUrl}/favicon.svg`
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Spiritual Numerology Guide - Spirit Numeral',
  description: 'Discover angel numbers and life path meanings. Decode your spiritual path with the power of numerology.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased bg-zinc-950 text-zinc-100 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
