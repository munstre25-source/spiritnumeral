import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import RootShell from '@/components/RootShell'

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

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com').replace(/\/+$/, '')
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
  openGraph: {
    siteName: 'Spirit Numeral',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Spirit Numeral - Angel Number Meanings' }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="zXcsELRY5U2UqLnQv55g4w"
          async
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1694972681105314"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t!=='dark')document.documentElement.classList.add('light');})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased bg-page text-primary flex flex-col min-h-screen font-sans">
        <RootShell>
          {children}
        </RootShell>
      </body>
    </html>
  )
}
