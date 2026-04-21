'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-200"
      style={{
        background: scrolled ? 'rgba(240,237,232,0.88)' : 'rgba(240,237,232,0.72)',
        borderColor: 'rgba(217,209,196,0.6)',
      }}
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-7 h-14 md:h-[68px] flex items-center justify-between">
        <Link href="/" aria-label="Lacet — Accueil" onClick={close}>
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-7">
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

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-ink"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M4 8H18M4 14H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-14 left-0 right-0 border-b backdrop-blur-md"
          style={{
            background: 'rgba(240,237,232,0.96)',
            borderColor: 'rgba(217,209,196,0.6)',
          }}
        >
          <div className="max-w-[1180px] mx-auto px-4 py-5 flex flex-col gap-1">
            <Link
              href="/support"
              onClick={close}
              className="block py-3 text-base font-medium text-ink-soft hover:text-forest-deep transition-colors"
            >
              Support
            </Link>
            <Link
              href="/privacy"
              onClick={close}
              className="block py-3 text-base font-medium text-ink-soft hover:text-forest-deep transition-colors"
            >
              Confidentialité
            </Link>
            <a
              href="#download"
              onClick={close}
              className="mt-3 inline-flex items-center justify-center text-sm font-semibold text-paper bg-ink hover:bg-forest-deep px-5 py-3 rounded-full transition-colors"
            >
              Télécharger
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
