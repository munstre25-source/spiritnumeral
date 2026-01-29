import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ReadingProgress, ScrollToTop, MobileBottomNav } from '@/components/UXEnhancements'
import { EmailCapture } from '@/components/EmailCapture'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'

// Premium fonts for spiritual/numerology aesthetic
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

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
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${inter.variable}`}>
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
      <body className="antialiased bg-zinc-950 text-zinc-100 flex flex-col min-h-screen font-sans">
        {/* Cosmic background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-[150px] animate-pulse-slow animation-delay-4000" />

          {/* Star field */}
          <div className="stars absolute inset-0 opacity-40" />
        </div>

        <div className="relative z-10">
          <ReadingProgress />
          <Navbar />
          <AnalyticsTracker />
          <div className="flex-grow pb-20 md:pb-0">
            {children}
          </div>
          <Footer />
          <ScrollToTop />
          <MobileBottomNav />
          <EmailCapture />
        </div>
      </body>
    </html>
  )
}
