import Image from 'next/image'

interface LogoProps {
  size?: number
  className?: string
}

export function LogoIcon({ size = 40, className = '' }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Lacet logo"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    />
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcon size={40} />
      <span
        style={{ fontFamily: 'Popsies, cursive', color: '#4B9C78', fontSize: '2rem', lineHeight: 1 }}
        aria-label="Lacet"
      >
        lacet
      </span>
    </div>
  )
}
