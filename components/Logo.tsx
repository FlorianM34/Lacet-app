import Image from 'next/image'

interface LogoProps {
  size?: number
  className?: string
}

export function LogoIcon({ size = 32, className = '' }: LogoProps) {
  return (
    <span
      className={`inline-grid place-items-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image src="/logo.png" alt="" width={size} height={size} style={{ objectFit: 'contain' }} />
    </span>
  )
}

export function Logo({
  className = '',
  wordSize = 26,
}: {
  className?: string
  wordSize?: number
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon size={32} />
      <span
        className="font-serif italic leading-none text-forest-deep"
        style={{ fontSize: wordSize, letterSpacing: '-0.01em', paddingTop: 2 }}
        aria-label="Lacet"
      >
        lacet
      </span>
    </div>
  )
}
