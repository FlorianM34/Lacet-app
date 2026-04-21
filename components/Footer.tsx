import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer
      className="relative z-10 border-t px-4 sm:px-6 md:px-7 py-8 md:py-10"
      style={{ background: 'var(--bg-deep)', borderColor: 'var(--line)' }}
    >
      <div className="max-w-[1180px] mx-auto flex flex-col items-center text-center gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:text-left md:gap-6 text-[13px] text-ink-soft">
        <Logo wordSize={20} />
        <div className="flex flex-wrap justify-center gap-5">
          <Link href="/support" className="hover:text-forest-deep transition-colors">
            Support
          </Link>
          <Link href="/privacy" className="hover:text-forest-deep transition-colors">
            Confidentialité
          </Link>
          <Link href="/terms" className="hover:text-forest-deep transition-colors">
            CGU
          </Link>
        </div>
        <div className="font-mono text-xs text-stone">© Lacet 2026</div>
      </div>
    </footer>
  )
}
