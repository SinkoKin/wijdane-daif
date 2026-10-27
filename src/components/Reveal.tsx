import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  className?: string
  y?: number
  delay?: number
  duration?: number
  start?: string
  immediate?: boolean
}

export function Reveal({
  children,
  className,
  y = 26,
  delay = 0,
  duration = 1,
  start = 'top 86%',
  immediate = false,
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion || !root.current) return
      gsap.from(root.current, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: 'power3.out',
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
    <div ref={root} className={className}>
      {children}
    </div>
  )
}
