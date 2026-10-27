interface StarPatternProps {
  id: string
  className?: string
}

export function StarPattern({ id, className }: StarPatternProps) {
  return (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} width="96" height="96" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.65">
            <rect x="24" y="24" width="48" height="48" />
            <rect x="24" y="24" width="48" height="48" transform="rotate(45 48 48)" />
            <path d="M48 0v14M48 82v14M0 48h14M82 48h14" />
            <circle cx="48" cy="48" r="2.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
