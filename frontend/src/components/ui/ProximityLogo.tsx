interface ProximityLogoProps {
  size?: number
  className?: string
}

export default function ProximityLogo({ size = 36, className = '' }: ProximityLogoProps) {
  const id = `pcr-grad-${size}`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Proximity Credit Repair logo"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF72" />
          <stop offset="50%" stopColor="#B8924A" />
          <stop offset="100%" stopColor="#8B6A2E" />
        </linearGradient>
        <linearGradient id={`${id}-chip`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8CC88" />
          <stop offset="100%" stopColor="#A07030" />
        </linearGradient>
      </defs>

      {/* Outer card body — gold gradient background */}
      <rect x="0" y="0" width="36" height="36" rx="8" fill={`url(#${id})`} />

      {/* Credit card shape — white/translucent card */}
      <rect x="4" y="9" width="28" height="18" rx="2.5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />

      {/* Magnetic stripe across top of card */}
      <rect x="4" y="13" width="28" height="4" fill="rgba(0,0,0,0.30)" rx="0" />

      {/* EMV Chip — gold colored square with inner grid lines */}
      <rect x="7.5" y="19.5" width="6" height="5" rx="1" fill={`url(#${id}-chip)`} />
      <line x1="10.5" y1="19.5" x2="10.5" y2="24.5" stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />
      <line x1="7.5" y1="22" x2="13.5" y2="22" stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />

      {/* "P" lettermark — right side of card */}
      <text
        x="21"
        y="25.5"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="9.5"
        fontWeight="900"
        fill="rgba(255,255,255,0.90)"
        letterSpacing="-0.5"
      >
        P
      </text>

      {/* Contactless / signal rings — top right corner of card */}
      <path d="M27.5 20.5 Q29 20.5 29 22 Q29 23.5 27.5 23.5" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M26.5 19.5 Q30.5 19.5 30.5 22 Q30.5 24.5 26.5 24.5" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  )
}
