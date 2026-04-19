'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-200"
      style={{
        background: scrolled ? 'rgba(240,237,232,0.88)' : 'rgba(240,237,232,0.72)',
        borderColor: 'rgba(217,209,196,0.6)',
      }}
    >
      <div className="max-w-[1180px] mx-auto px-7 h-[68px] flex items-center justify-between">
        <Link href="/" aria-label="Lacet — Accueil">
          <Logo />
        </Link>
        <div className="flex items-center gap-7">
          <Link
            href="/support"
            className="text-sm font-medium text-ink-soft hover:text-forest-deep transition-colors"
          >
            Support
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium text-ink-soft hover:text-forest-deep transition-colors"
          >
            Confidentialité
          </Link>
          <a
            href="#download"
            className="text-[13px] font-semibold text-paper bg-ink hover:bg-forest-deep px-4 py-[9px] rounded-full transition-all hover:-translate-y-[1px]"
          >
            Télécharger
          </a>
        </div>
      </div>
    </nav>
  )
}
