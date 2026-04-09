import Image from 'next/image'

interface LogoProps {
  size?: number
  className?: string
}

export function LogoIcon({ size = 32, className = '' }: LogoProps) {
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
      <span className="text-xl font-bold tracking-tight text-gray-900">Lacet</span>
    </div>
  )
}
