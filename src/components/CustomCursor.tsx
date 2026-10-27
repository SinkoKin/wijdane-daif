import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = root.current
    if (!el || reducedMotion) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    gsap.set(el, { xPercent: -50, yPercent: -50, x: -100, y: -100 })
    document.documentElement.classList.add('has-custom-cursor')

    const xTo = gsap.quickTo(el, 'x', { duration: 0.38, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.38, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX)
      yTo(event.clientY)
      el.classList.remove('is-hidden')
    }

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        'a, button, [data-cursor]',
      )
      if (!target) {
        el.classList.remove('is-active', 'is-labelled')
        if (label.current) label.current.textContent = ''
        return
      }
      el.classList.add('is-active')
      const text = target.dataset.cursor ?? ''
      if (label.current) label.current.textContent = text
      el.classList.toggle('is-labelled', Boolean(text))
    }

    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')
    const onLeave = () => el.classList.add('is-hidden')
    const onEnter = () => el.classList.remove('is-hidden')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerout', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.classList.remove('has-custom-cursor')
      gsap.killTweensOf(el)
    }
  }, [reducedMotion])

  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <span className="cursor__dot" />
      <span ref={label} className="cursor__label" />
    </div>
  )
}
