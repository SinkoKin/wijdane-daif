import type { ReactNode } from 'react'

interface SectionTagProps {
  index: string
  children: ReactNode
  className?: string
}

export function SectionTag({ index, children, className }: SectionTagProps) {
  return (
    <p className={`section-tag${className ? ` ${className}` : ''}`}>
      <span className="section-tag__index">{index}</span>
      <span className="section-tag__rule" aria-hidden="true" />
      <span className="section-tag__label">{children}</span>
    </p>
  )
}
