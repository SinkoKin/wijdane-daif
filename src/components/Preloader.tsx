import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { SITE } from '../data/site'
import { WDLogo } from './WDLogo'
import './preloader.css'

interface PreloaderProps {
  onReveal: () => void
  onDone: () => void
}

export function Preloader({ onReveal, onDone }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const accent = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const logo = useRef<SVGSVGElement>(null)
  const reducedMotion = useReducedMotion()

  const revealRef = useRef(onReveal)
  const doneRef = useRef(onDone)
  revealRef.current = onReveal
  doneRef.current = onDone

  useGSAP(
    () => {
      if (!root.current) return

      if (reducedMotion) {
        const timeout = window.setTimeout(() => {
          revealRef.current()
          doneRef.current()
        }, 300)
        return () => window.clearTimeout(timeout)
      }

      const counter = { value: 0 }
      const tl = gsap.timeline()

      gsap.set([panel.current, accent.current], { yPercent: 0 })
      gsap.set('.preloader__logo', { scale: 0.8, opacity: 0 })
      gsap.set('.preloader__arabic', { y: 20, opacity: 0 })
      gsap.set('.preloader__eyebrow', { y: 16, opacity: 0 })
      gsap.set('.preloader__tagline', { y: 12, opacity: 0 })

      tl.to('.preloader__logo', {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'expo.out',
      }, 0)
        .to('.preloader__arabic', {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
        }, 0.15)
        .to('.preloader__eyebrow', {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }, 0.35)
        .to('.preloader__tagline', {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }, 0.45)
        .to(counter, {
          value: 100,
          duration: 2.2,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count.current) {
              count.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
            }
          },
        }, 0.2)
        .fromTo(bar.current, { scaleX: 0 }, {
          scaleX: 1,
          duration: 2.2,
          ease: 'power2.inOut',
        }, 0.2)
        .to('.preloader__content', { opacity: 0, duration: 0.4, ease: 'power2.out' }, 2.3)
        .add(() => revealRef.current(), 2.4)
        .to(panel.current, {
          yPercent: -100,
          duration: 1,
          ease: 'expo.inOut',
          onComplete: () => doneRef.current(),
        }, 2.4)
        .to(accent.current, {
          yPercent: -100,
          duration: 1,
          ease: 'expo.inOut',
        }, 2.5)

      // Ambient logo breath while loading
      gsap.to(logo.current, {
        filter: 'drop-shadow(0 0 30px rgba(198, 161, 91, 0.4))',
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      return () => {
        tl.kill()
        gsap.killTweensOf(logo.current)
      }
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <div
      ref={root}
      className="preloader"
      role="status"
      aria-label="Loading the Wijdane Daif experience"
    >
      <div ref={accent} className="preloader__accent" aria-hidden="true" />
      <div ref={panel} className="preloader__panel">
        <div className="preloader__content">
          <div className="preloader__center">
            {/* Arabic logo — the heart of the brand */}
            <WDLogo
              ref={logo}
              className="preloader__logo"
              size={72}
            />

            {/* Arabic name in Ruqaa script */}
            <p className="preloader__arabic" lang="ar" dir="rtl">
              {SITE.arabicName}
            </p>

            <p className="preloader__eyebrow">A voice between heritage and modernity</p>

            <p className="preloader__tagline">
              <span className="preloader__tagline-accent">Official artist world</span>
              <span className="preloader__tagline-year">— 2026</span>
            </p>
          </div>

          <div className="preloader__bottom">
            <span ref={count} className="preloader__count" aria-label="Loading progress">
              000
            </span>
            <div className="preloader__bar" aria-hidden="true">
              <span ref={bar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}