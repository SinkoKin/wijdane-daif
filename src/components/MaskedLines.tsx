import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface MaskedLinesProps {
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  className?: string
  ariaLabel?: string
  start?: string
  stagger?: number
  delay?: number
  duration?: number
  immediate?: boolean
  yPercent?: number
}

export function MaskedLines({
  lines,
  as: Tag = 'h2',
  className,
  ariaLabel,
  start = 'top 82%',
  stagger = 0.09,
  delay = 0,
  duration = 1.15,
  immediate = false,
  yPercent = 112,
}: MaskedLinesProps) {
  const root = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion || !root.current) return
      const inners = root.current.querySelectorAll('.masked-line__inner')
      gsap.from(inners, {
        yPercent,
        duration,
        delay,
        stagger,
        ease: 'expo.out',
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: root.current,
              start,
              once: true,
            },
      })
    },
    { scope: root, dependencies: [reducedMotion, immediate] },
  )

  return (
    <Tag
      ref={root as never}
      className={`masked-lines${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
    >
      {lines.map((line, index) => (
        <span className="masked-line" key={index} aria-hidden={ariaLabel ? true : undefined}>
          <span className="masked-line__inner">{line}</span>
        </span>
      ))}
    </Tag>
  )
}
