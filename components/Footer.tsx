import Link from 'next/link'
import { LogoIcon } from './Logo'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <LogoIcon size={20} className="[&_path]:stroke-[#1D9E75] [&_circle]:fill-[#1D9E75]" />
            <span className="text-white font-semibold">Lacet</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              CGU
            </Link>
            <Link href="/support" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
          <p className="text-sm">© Lacet 2026</p>
        </div>
      </div>
    </footer>
  )
}
