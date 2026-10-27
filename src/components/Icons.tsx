export type IconProps = {
  className?: string
  size?: number
}

export function ArrowUpRight({ className, size = 16 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path d="M3.5 12.5 12.5 3.5M5.5 3.5h7v7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function ArrowRight({ className, size = 18 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M2 10h15M11.5 4.5 17 10l-5.5 5.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function ArrowLeft({ className, size = 18 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M18 10H3M8.5 4.5 3 10l5.5 5.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function PlayIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M7 4.8v10.4L16 10 7 4.8Z" fill="currentColor" />
    </svg>
  )
}

export function CloseIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="m4 4 12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function StarMark({ className, size = 16 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="5.2" y="5.2" width="13.6" height="13.6" stroke="currentColor" strokeWidth="1" />
      <rect
        x="5.2"
        y="5.2"
        width="13.6"
        height="13.6"
        stroke="currentColor"
        strokeWidth="1"
        transform="rotate(45 12 12)"
      />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function CursorArrow({ className, size = 22 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M5 20 19 4M9 4h10v10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function RebabIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 64 64" fill="none">
      <path d="M28 10v30" stroke="currentColor" strokeWidth="1.1" />
      <path d="M24 10h8M25 6h6" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="28" cy="48" rx="10" ry="12" stroke="currentColor" strokeWidth="1.1" />
      <path d="M22 34c-4 4-5 10-3 15M34 34c4 4 5 10 3 15" stroke="currentColor" strokeWidth="1.1" />
      <path d="m40 8 12 46" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M42 54h8M38 54h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="28" cy="48" r="2" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

export function RhythmIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="3.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M42 22a14 14 0 0 1 0 20M22 22a14 14 0 0 0 0 20" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M50 14a26 26 0 0 1 0 36M14 14a26 26 0 0 0 0 36"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M32 8v6M32 50v6M8 32h6M50 32h6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

export function ArchIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 64 64" fill="none">
      <path
        d="M10 56V33c0-13 9-23 22-23s22 10 22 23v23"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M23 56V38c0-7 4-12 9-12s9 5 9 12v18"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M5 56h54" stroke="currentColor" strokeWidth="1.1" />
      <path d="M32 4v7M17 8l3 6M47 8l-3 6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

export function TeaIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 64 64" fill="none">
      <path
        d="M16 32h24v10a12 12 0 0 1-12 12h0a12 12 0 0 1-12-12V32Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M40 35h5a7 7 0 0 1 0 14h-5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M28 32V20M24 20h8" stroke="currentColor" strokeWidth="1.1" />
      <path d="m44 16 5-8M50 20h-6M56 12l-5 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M10 58h44" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}
