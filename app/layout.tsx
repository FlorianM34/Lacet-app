import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Lacet — Randonnées en groupe',
    template: '%s | Lacet',
  },
  description:
    'Lacet connecte les randonneurs par niveau, région et envies pour vivre des aventures en groupe mémorables.',
  metadataBase: new URL('https://lacet.app'),
  openGraph: {
    title: 'Lacet — Randonnées en groupe',
    description:
      'Trouve ta prochaine rando avec les bonnes personnes. Matching par niveau, chat de groupe, itinéraires GPX.',
    url: 'https://lacet.app',
    siteName: 'Lacet',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
