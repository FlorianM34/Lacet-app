import type { Metadata } from 'next'
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Lacet — trouve ta prochaine rando, avec les bonnes personnes',
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
    <html
      lang="fr"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
