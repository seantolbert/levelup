import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LuminaFilm — Premium Window Film Solutions',
  description:
    'Premium automotive, residential, and commercial window film installation in Austin, TX. Ceramic, carbon, and solar films with lifetime warranty.',
  keywords: 'window tint, window film, automotive tint, residential film, commercial film, Austin TX',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className="min-h-full">{children}</body>
    </html>
  )
}
