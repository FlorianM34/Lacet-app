import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer
      className="relative z-10 border-t px-7 py-10"
      style={{ background: 'var(--bg-deep)', borderColor: 'var(--line)' }}
    >
      <div className="max-w-[1180px] mx-auto flex flex-wrap items-center justify-between gap-6 text-[13px] text-ink-soft">
        <Logo wordSize={20} />
        <div className="flex gap-5">
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
        <div className="font-mono text-xs text-stone">© Lacet 2026 · fabriqué à Grenoble</div>
      </div>
    </footer>
  )
}
