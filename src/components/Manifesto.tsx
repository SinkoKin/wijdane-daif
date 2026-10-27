import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { MANIFESTO, SITE } from '../data/site'
import { SectionTag } from './SectionTag'
import { StarMark } from './Icons'
import './manifesto.css'

export function Manifesto() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion || !root.current) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px)', () => {
        const words = gsap.utils.toArray<HTMLElement>(
          '.manifesto__word',
          root.current,
        )

        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: '+=88%',
              scrub: true,
              pin: true,
              anticipatePin: 1,
            },
          },
        )
      })

      mm.add('(max-width: 899px)', () => {
        const words = gsap.utils.toArray<HTMLElement>(
          '.manifesto__word',
          root.current,
        )

        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            duration: 0.7,
            stagger: 0.045,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.manifesto__grid',
              start: 'top 78%',
              once: true,
            },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <section
      id="manifesto"
      ref={root}
      className="manifesto"
      data-nav-theme="light"
      aria-label="The premise"
    >
      <span className="manifesto__ghost" aria-hidden="true">
        02
      </span>

      <div className="manifesto__inner">
        <SectionTag index="02">The premise</SectionTag>

        <div className="manifesto__grid">
          <h2 className="manifesto__statement">
            {MANIFESTO.lines.map((line) => (
              <span className="manifesto__line" key={line}>
                {line.split(' ').map((word, index) => (
                  <span className="manifesto__word" key={`${word}-${index}`}>
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <aside className="manifesto__aside">
            <span className="manifesto__aside-rule" aria-hidden="true" />
            <p className="manifesto__body">{MANIFESTO.body}</p>
            <p className="manifesto__arabic" lang="ar" dir="rtl">
              {SITE.arabicName}
            </p>
          </aside>
        </div>

        <div className="manifesto__marquee" aria-hidden="true">
          <div className="manifesto__marquee-track">
            {[0, 1].map((group) => (
              <div className="manifesto__marquee-group" key={group}>
                {MANIFESTO.marquee.map((item) => (
                  <span className="manifesto__marquee-item" key={`${group}-${item}`}>
                    {item}
                    <StarMark size={9} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
