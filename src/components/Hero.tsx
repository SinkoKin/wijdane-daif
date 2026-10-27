import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useSmoothScroll } from '../context/SmoothScroll'
import { IMAGES, SITE } from '../data/site'
import { ArtImage } from './ArtImage'
import { ArrowUpRight } from './Icons'
import { StarPattern } from './StarPattern'
import './hero.css'

interface HeroProps {
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      if (!ready || reducedMotion) return

      const q = gsap.utils.selector(root)
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.from(q('.hero__eyebrow > span'), {
        y: 16,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
      }, 0.15)
        .from(q('.hero__word'), {
          yPercent: 118,
          duration: 1.6,
          stagger: 0.14,
        }, 0.2)
        .fromTo(
          q('.hero__arch'),
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.9 },
          0.25,
        )
        .from(q('.hero__arch img'), {
          scale: 1.28,
          duration: 2.4,
        }, 0.25)
        .from(q('.hero__ring'), {
          opacity: 0,
          scale: 0.95,
          duration: 1.6,
        }, 0.8)
        .from(q('.hero__dusk'), {
          opacity: 0,
          scale: 0.98,
          duration: 2.8,
        }, 0.6)
        .from(q('.hero__aside > *'), {
          opacity: 0,
          y: 18,
          duration: 1,
          stagger: 0.1,
        }, 1.1)
        .from(q('.hero__bottom > *'), {
          y: 24,
          opacity: 0,
          duration: 1.2,
          stagger: 0.12,
        }, 0.85)
    },
    { scope: root, dependencies: [ready, reducedMotion] },
  )

  // Ambient drift for the starfield. The dusk glow breathes in CSS.
  useGSAP(
    () => {
      if (reducedMotion) return

      // Subtle starfield drift
      gsap.to('.hero__stars', {
        xPercent: 3,
        yPercent: -2,
        rotation: 0.5,
        duration: 25,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      })
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  useGSAP(
    () => {
      if (reducedMotion) return

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      tl.to('.hero__portrait', { yPercent: 14 }, 0)
        .to('.hero__arch img', { yPercent: 6, scale: 1.06 }, 0)
        .to('.hero__dusk', { yPercent: 9, opacity: 0.45 }, 0)
        .to('.hero__word-wrap--first', { xPercent: -6 }, 0)
        .to('.hero__word-wrap--last', { xPercent: 5 }, 0)
        .to('.hero__bottom', { opacity: 0.15, yPercent: -16 }, 0)
        .to('.hero__eyebrow', { opacity: 0, y: -12 }, 0)
        .to('.hero__stars', { yPercent: -8, rotation: 2 }, 0)
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <section
      id="top"
      ref={root}
      className="hero"
      data-nav-theme="dark"
      aria-label="Wijdane Daif — introduction"
    >
      <div className="hero__glow" aria-hidden="true" />
      <StarPattern id="hero-stars" className="hero__stars" />

      <div className="hero__frame">
        <div className="hero__eyebrow">
          <span>{SITE.role}</span>
          <span className="hero__eyebrow-right">
            <i aria-hidden="true" />
            Official artist world — 2026
          </span>
        </div>

        <h1 className="hero__name" aria-label="Wijdane Daif">
          <span className="hero__word-wrap hero__word-wrap--first">
            <span className="hero__word hero__word--first" aria-hidden="true">
              {SITE.firstName}
            </span>
          </span>
          <span className="hero__word-wrap hero__word-wrap--last">
            <span className="hero__word hero__word--last" aria-hidden="true">
              {SITE.lastName}
            </span>
          </span>
        </h1>

        <figure className="hero__portrait">
          <div className="hero__dusk" aria-hidden="true" />
          <div className="hero__arch">
            <ArtImage
              asset={IMAGES.heroDesert}
              sizes="(max-width: 480px) 88vw, (max-width: 760px) 78vw, 36vw"
              loading="eager"
              fetchPriority="high"
              objectPosition="50% 22%"
            />
            <span className="hero__arch-shade" aria-hidden="true" />
          </div>
          <span className="hero__ring" aria-hidden="true" />
          <figcaption>
            <span>Official press portrait</span>
            <span>2026</span>
          </figcaption>
        </figure>

        <div className="hero__aside" aria-hidden="true">
          <span className="hero__aside-arabic" lang="ar" dir="rtl">
            {SITE.arabicName}
          </span>
          <span className="hero__aside-rule" />
          <span className="hero__aside-meta">MA — 2026</span>
        </div>

        <div className="hero__bottom">
          <div className="hero__intro">
            <a
              className="hero__latest"
              href="#music"
              onClick={(event) => {
                event.preventDefault()
                scrollTo('#music', -54)
              }}
            >
              <span className="hero__latest-dot" aria-hidden="true" />
              <span>New single — Bomba</span>
              <span className="hero__latest-out">Out now</span>
              <ArrowUpRight size={12} />
            </a>
            <p className="hero__tagline">
              A voice between <em>heritage</em> and modernity.
            </p>
          </div>

          <p className="hero__footnote">
            Slow Motion — 2026
            <br />
            Bomba — 2026
          </p>

          <a
            className="hero__scroll"
            href="#manifesto"
            onClick={(event) => {
              event.preventDefault()
              scrollTo('#manifesto', 0)
            }}
          >
            <span className="hero__scroll-word">Scroll</span>
            <span className="hero__scroll-line" aria-hidden="true" />
            <span className="hero__scroll-word">To enter</span>
          </a>
        </div>
      </div>
    </section>
  )
}