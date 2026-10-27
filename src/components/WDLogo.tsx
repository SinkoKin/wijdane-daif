import { type IconProps } from './Icons'
import { forwardRef, useId } from 'react'

/**
 * WD Logo — artistic rendering of "وجدان ضايف" (Wijdane Daif in Arabic)
 * Using the Aref Ruqaa font family for authentic Arabic calligraphy feel.
 * Single source of truth for the logo SVG.
 */
export const WDLogo = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 48, ...props }, ref) => {
  // Gradient/filter ids must be unique: the logo appears in the nav and preloader.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const goldId = `wd-gold-${uid}`
  const goldVerticalId = `wd-gold-vertical-${uid}`
  const glowId = `wd-glow-${uid}`
  const innerGlowId = `wd-inner-glow-${uid}`

  return (
    <svg
      ref={ref}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id={goldId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a227" />
          <stop offset="50%" stopColor="#e8c766" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
        <linearGradient id={goldVerticalId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#a9542f" />
          <stop offset="40%" stopColor="#c9a227" />
          <stop offset="70%" stopColor="#e8c766" />
          <stop offset="100%" stopColor="#f4efe6" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={innerGlowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feComposite in="blur" in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dark background roundel — subtle, like a seal */}
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="#0b0a08"
        stroke={`url(#${goldId})`}
        strokeWidth="1"
        opacity="0.9"
      />

      {/* Arabic calligraphy: وجدان ضايف */}
      <g filter={`url(#${glowId})`}>
        {/* "وجدان" (Wijdane) - top line */}
        <text
          x="60"
          y="52"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'Aref Ruqaa', 'Noto Naskh Arabic', serif"
          fontSize="32"
          fontWeight="700"
          fill={`url(#${goldVerticalId})`}
          filter={`url(#${innerGlowId})`}
          letterSpacing="1.2"
        >
          وجدان
        </text>

        {/* "ضايف" (Daif) - bottom line */}
        <text
          x="60"
          y="78"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'Aref Ruqaa', 'Noto Naskh Arabic', serif"
          fontSize="27"
          fontWeight="400"
          fill={`url(#${goldId})`}
          filter={`url(#${innerGlowId})`}
          letterSpacing="1.8"
          opacity="0.95"
        >
          ضايف
        </text>
      </g>

      {/* Subtle decorative accents — diamond markers at sides */}
      <g fill={`url(#${goldId})`} opacity="0.6">
        {/* Left diamond */}
        <polygon
          points="22,60 25,56 28,60 25,64"
          transform="rotate(-90 25 60)"
        />
        {/* Right diamond */}
        <polygon
          points="98,60 95,56 92,60 95,64"
          transform="rotate(90 95 60)"
        />
      </g>

      {/* Thin ornamental line beneath — suggests a seal impression */}
      <path
        d="M35 88 Q60 84 85 88"
        stroke={`url(#${goldId})`}
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.4"
        fill="none"
      />
    </svg>
  )
})

WDLogo.displayName = 'WDLogo'