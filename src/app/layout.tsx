import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Spiritual Numerology Guide',
  description: 'Discover angel numbers and life path meanings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-950 text-zinc-100">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
