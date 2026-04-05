interface LogoProps {
  size?: number
  className?: string
}

export function LogoIcon({ size = 32, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 38 L14 18 L22 30 L30 12 L38 24 L44 16"
        stroke="#1D9E75"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="38" r="3" fill="#1D9E75" />
      <circle cx="44" cy="16" r="3" fill="#1D9E75" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcon size={28} />
      <span className="text-xl font-bold tracking-tight text-gray-900">Lacet</span>
    </div>
  )
}
