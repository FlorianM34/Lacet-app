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
      {/* L(+0), a(+25), c(+50), e(+60), t(+85) */}
      <svg viewBox="70 70 430 150" role="img" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto" aria-label="Lacet">
        {/* L */}
        <path d="M 100 80 C 95 82, 88 100, 90 160 C 91 175, 95 185, 105 188 C 118 191, 135 187, 148 183" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        {/* liaison L -> a */}
        <path d="M 148 183 C 160 180, 172 165, 190 155" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" />
        {/* a (+25) */}
        <path d="M 190 155 C 193 138, 210 128, 225 132 C 243 137, 247 158, 240 172 C 233 186, 218 190, 207 186 C 195 182, 190 172, 193 162" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" />
        <path d="M 240 140 C 243 155, 245 172, 247 190" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" />
        {/* liaison a -> c */}
        <path d="M 247 190 C 260 186, 275 175, 292 165" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" />
        {/* c (+50) */}
        <path d="M 318 132 C 302 126, 286 138, 284 155 C 282 172, 292 188, 308 191 C 320 193, 332 187, 338 178" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" />
        {/* liaison c -> e (raccourcie) */}
        <path d="M 338 178 C 342 175, 350 164, 358 155" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" />
        {/* e (+50) */}
        <path d="M 358 155 C 360 138, 378 128, 394 133 C 408 138, 412 155, 405 155 C 390 155, 366 155, 358 158 C 354 165, 358 178, 370 185 C 384 192, 402 188, 412 180" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" />
        {/* liaison e -> t */}
        <path d="M 412 180 C 424 174, 438 162, 455 152" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" />
        {/* t : montant vertical (+75) */}
        <path d="M 460 95 C 459 120, 457 155, 455 175 C 453 188, 457 195, 465 196 C 475 197, 485 190, 490 182" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" />
        {/* t : barre horizontale (+75) */}
        <path d="M 440 148 C 450 146, 465 145, 480 147" fill="none" stroke="#4B9C78" strokeWidth="10" strokeLinecap="round" />
      </svg>
    </div>
  )
}
