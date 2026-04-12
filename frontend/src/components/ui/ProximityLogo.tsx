interface ProximityLogoProps {
  size?: number
  className?: string
}

export default function ProximityLogo({ size = 34, className = '' }: ProximityLogoProps) {
  const uid = `pcr-${size}`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Proximity Credit Repair logo"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF72" />
          <stop offset="50%" stopColor="#B8924A" />
          <stop offset="100%" stopColor="#7A5C22" />
        </linearGradient>
        <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="0" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id={`${uid}-p`} x1="14" y1="10" x2="14" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.80)" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0.8 0 0 0  0.8 0.6 0 0 0  0 0 0 0 0  0 0 0 0.6 0" result="golden" />
          <feMerge><feMergeNode in="golden" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Shield body */}
      <path
        d="M20 2.5 L36.5 8.5 L36.5 22 C36.5 31.5 28.5 37.8 20 39.5 C11.5 37.8 3.5 31.5 3.5 22 L3.5 8.5 Z"
        fill={`url(#${uid}-bg)`}
        filter={`url(#${uid}-glow)`}
      />

      {/* Inner border */}
      <path
        d="M20 5 L34 10.5 L34 22 C34 29.8 27.5 35.5 20 37 C12.5 35.5 6 29.8 6 22 L6 10.5 Z"
        fill="none"
        stroke="rgba(255,255,255,0.20)"
        strokeWidth="0.75"
      />

      {/* Shine top half */}
      <path
        d="M20 2.5 L36.5 8.5 L36.5 22 C36.5 31.5 28.5 37.8 20 39.5 C11.5 37.8 3.5 31.5 3.5 22 L3.5 8.5 Z"
        fill={`url(#${uid}-shine)`}
        style={{ mixBlendMode: 'overlay' }}
      />

      {/* "P" lettermark — centered in shield */}
      <text
        x="20"
        y="27"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="20"
        fontWeight="900"
        fill={`url(#${uid}-p)`}
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        P
      </text>
    </svg>
  )
}
