import Lenis from 'lenis'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

type ScrollTarget = string | HTMLElement | number

interface SmoothScrollValue {
  lenis: Lenis | null
  scrollTo: (target: ScrollTarget, offset?: number) => void
  stop: () => void
  start: () => void
}

const SmoothScrollContext = createContext<SmoothScrollValue | null>(null)

function toggleLock(locked: boolean) {
  document.documentElement.classList.toggle('is-locked', locked)
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null)
      return
    }

    const instance = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      syncTouch: false,
      autoRaf: false,
    })

    instance.stop()
    lenisRef.current = instance
    setLenis(instance)

    instance.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(tick)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (!lenis) return
    const onVisibility = () => {
      if (document.hidden) lenis.stop()
      else if (!document.documentElement.classList.contains('is-locked')) lenis.start()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [lenis])

  const scrollTo = useCallback((target: ScrollTarget, offset = -72) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.4 })
      return
    }

    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'

    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior })
      return
    }

    const el =
      typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior })
  }, [])

  const stop = useCallback(() => {
    lenisRef.current?.stop()
    toggleLock(true)
  }, [])

  const start = useCallback(() => {
    lenisRef.current?.start()
    toggleLock(false)
  }, [])

  const value = useMemo(
    () => ({ lenis, scrollTo, stop, start }),
    [lenis, scrollTo, stop, start],
  )

  return (
    <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
  )
}

export function useSmoothScroll() {
  const value = useContext(SmoothScrollContext)
  if (!value) throw new Error('useSmoothScroll must be used inside SmoothScrollProvider')
  return value
}
