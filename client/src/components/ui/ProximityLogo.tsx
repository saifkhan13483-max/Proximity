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
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Proximity Credit Repair logo"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F0CC72" />
          <stop offset="35%" stopColor="#C9963E" />
          <stop offset="70%" stopColor="#A0722A" />
          <stop offset="100%" stopColor="#6B4A14" />
        </linearGradient>
        <linearGradient id={`${uid}-shine`} x1="24" y1="2" x2="24" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.38)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id={`${uid}-edge`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE199" />
          <stop offset="100%" stopColor="#8A5E1A" />
        </linearGradient>
        <linearGradient id={`${uid}-p`} x1="24" y1="13" x2="24" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="rgba(255,240,190,0.90)" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="1 0.75 0 0 0.05  0.75 0.55 0 0 0  0 0 0 0 0  0 0 0 0.55 0"
            result="golden" />
          <feMerge>
            <feMergeNode in="golden" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uid}-inner-shadow`} x="-10%" y="-10%" width="120%" height="120%">
          <feOffset dx="0" dy="1" />
          <feGaussianBlur stdDeviation="0.8" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="rgba(0,0,0,0.35)" floodOpacity="1" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* Shield outer glow layer */}
      <path
        d="M24 2.5 L43 9.5 L43 25 C43 36.5 34 43.5 24 46.5 C14 43.5 5 36.5 5 25 L5 9.5 Z"
        fill={`url(#${uid}-bg)`}
        filter={`url(#${uid}-glow)`}
      />

      {/* Gold rim / border */}
      <path
        d="M24 2.5 L43 9.5 L43 25 C43 36.5 34 43.5 24 46.5 C14 43.5 5 36.5 5 25 L5 9.5 Z"
        fill="none"
        stroke={`url(#${uid}-edge)`}
        strokeWidth="0.8"
      />

      {/* Inner inset shield */}
      <path
        d="M24 6 L39.5 12 L39.5 25 C39.5 34.8 32 41 24 43.5 C16 41 8.5 34.8 8.5 25 L8.5 12 Z"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.6"
      />

      {/* Shine highlight */}
      <path
        d="M24 2.5 L43 9.5 L43 25 C43 36.5 34 43.5 24 46.5 C14 43.5 5 36.5 5 25 L5 9.5 Z"
        fill={`url(#${uid}-shine)`}
        style={{ mixBlendMode: 'overlay' }}
      />

      {/* Small diamond accent at top */}
      <polygon
        points="24,5 26,8.5 24,10 22,8.5"
        fill="rgba(255,230,130,0.55)"
      />

      {/* "P" lettermark — path-drawn for crisp rendering */}
      <text
        x="24"
        y="33"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="900"
        fill={`url(#${uid}-p)`}
        textAnchor="middle"
        letterSpacing="-0.5"
        filter={`url(#${uid}-inner-shadow)`}
      >
        P
      </text>

      {/* Bottom accent line */}
      <line
        x1="17" y1="37.5" x2="31" y2="37.5"
        stroke="rgba(255,220,120,0.30)"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </svg>
  )
}
