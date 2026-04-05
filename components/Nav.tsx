import Link from 'next/link'
import { Logo } from './Logo'

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Lacet — Accueil">
          <Logo />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/support"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Support
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Confidentialité
          </Link>
        </div>
      </div>
    </nav>
  )
}
