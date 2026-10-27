import { useCallback, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { GALLERY } from '../data/site'
import { ArtImage } from './ArtImage'
import { Lightbox } from './Lightbox'
import { MaskedLines } from './MaskedLines'
import { SectionTag } from './SectionTag'
import { ArrowUpRight } from './Icons'
import './visuals.css'

export function Visuals() {
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  const closeLightbox = useCallback(() => setActive(null), [])
  const navigateLightbox = useCallback((index: number) => setActive(index), [])

  useGSAP(
    () => {
      if (reducedMotion || !root.current) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px)', () => {
        const trackEl = track.current
        const viewportEl = viewport.current
        const sectionEl = root.current

        if (!trackEl || !viewportEl || !sectionEl) return

        const distance = () =>
          Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth)

        gsap.from('.gallery-card', {
          y: 30,
          opacity: 0,
          duration: 1.1,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 72%',
            once: true,
          },
        })

        gsap.to(trackEl, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.28}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) {
                gsap.set(progress.current, { scaleX: self.progress })
              }
            },
          },
        })

        return () => {
          ScrollTrigger.refresh()
        }
      })

      mm.add('(max-width: 899px)', () => {
        gsap.from('.gallery-card', {
          y: 36,
          opacity: 0,
          duration: 0.95,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.visuals__track',
            start: 'top 84%',
            once: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <section
      id="visuals"
      ref={root}
      className="visuals"
      data-nav-theme="light"
      aria-label="Visual world of Wijdane Daif"
    >
      <div className="visuals__inner">
        <div className="visuals__head">
          <div className="visuals__head-main">
            <SectionTag index="05">The visual world</SectionTag>
            <MaskedLines
              as="h2"
              lines={['A visual', 'language.']}
              className="visuals__title"
              ariaLabel="A visual language."
              start="top 86%"
            />
          </div>

          <div className="visuals__aside">
            <p>
              Release artwork, official portraits and film stills — the 2026
              visual world of Wijdane Daif.
            </p>
            <span className="visuals__aside-count">Six frames — 2026</span>
          </div>
        </div>

        <div className="visuals__viewport" ref={viewport}>
          <div className="visuals__track" ref={track}>
            {GALLERY.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={`gallery-card gallery-card--${item.size} gallery-card--align-${item.align}`}
                onClick={() => setActive(index)}
                aria-label={`Open frame ${index + 1}: ${item.title}, ${item.meta}`}
              >
                <span className="gallery-card__frame">
                  <ArtImage
                    asset={item.image}
                    sizes="(max-width: 899px) 92vw, 46vw"
                  />
                  <span className="gallery-card__veil" aria-hidden="true" />
                  <span className="gallery-card__num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="gallery-card__view" aria-hidden="true">
                    View
                  </span>
                </span>
                <span className="gallery-card__meta">
                  <span className="gallery-card__title">{item.title}</span>
                  <span className="gallery-card__label">{item.meta}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="visuals__foot">
          <p className="visuals__hint">
            <span className="visuals__hint-desktop">
              Scroll to move through the frames
            </span>
            <span className="visuals__hint-mobile">Tap a frame to enlarge</span>
            <span className="visuals__hint-static">Select a frame to enlarge</span>
          </p>

          <div className="visuals__progress" aria-hidden="true">
            <span ref={progress} />
          </div>

          <button
            type="button"
            className="visuals__open"
            onClick={() => setActive(0)}
          >
            View all frames
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>

      {active !== null ? (
        <Lightbox
          items={GALLERY}
          index={active}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      ) : null}
    </section>
  )
}
