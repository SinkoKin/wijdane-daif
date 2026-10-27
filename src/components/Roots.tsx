import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { HERITAGE, IMAGES, SITE } from '../data/site'
import { ArtImage } from './ArtImage'
import { MaskedLines } from './MaskedLines'
import { SectionTag } from './SectionTag'
import { ArchIcon, RebabIcon, RhythmIcon, TeaIcon } from './Icons'
import './roots.css'

const ICONS = [RebabIcon, RhythmIcon, ArchIcon, TeaIcon]

export function Roots() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion || !root.current) return

      const image = root.current.querySelector<HTMLElement>('.roots__image')

      if (image) {
        gsap.fromTo(
          image,
          { clipPath: 'inset(16% 12% 0% 12%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: image,
              start: 'top 84%',
              once: true,
            },
          },
        )

        const img = image.querySelector('img')
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        }
      }

      gsap.from(
        gsap.utils.toArray<HTMLElement>('.roots__item', root.current),
        {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.roots__list',
            start: 'top 80%',
            once: true,
          },
        },
      )

      gsap.to('.roots__ghost', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <section
      id="roots"
      ref={root}
      className="roots"
      data-nav-theme="dark"
      aria-label="Moroccan heritage behind the work"
    >
      <span className="roots__ghost" lang="ar" dir="rtl" aria-hidden="true">
        {SITE.arabicName}
      </span>

      <div className="roots__shell">
        <SectionTag index="06">The roots</SectionTag>

        <div className="roots__head">
          <MaskedLines
            as="h2"
            lines={['Heritage,', 'held in motion.']}
            className="roots__title"
            ariaLabel="Heritage, held in motion."
            start="top 86%"
          />
          <p>
            Moroccan sound and image are the material here — Amazigh strings,
            Haït al-Gharbawi rhythm, hand-worked cloth, courtyard light. Not
            decoration. A continuing conversation.
          </p>
        </div>

        <div className="roots__grid">
          <div className="roots__visual">
            <div className="roots__image">
              <ArtImage
                asset={IMAGES.caftanDetail}
                sizes="(max-width: 899px) 88vw, 34vw"
                objectPosition="50% 25%"
              />
            </div>
            <p className="roots__caption">
              <span>{IMAGES.caftanDetail.credit}</span>
              <span>Detail</span>
            </p>
          </div>

          <div className="roots__list">
            {HERITAGE.map((item, index) => {
              const Icon = ICONS[index] ?? ArchIcon
              return (
                <article className="roots__item" key={item.index}>
                  <div className="roots__item-top">
                    <span>{item.index}</span>
                    <span>{item.label}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Icon className="roots__icon" />
                </article>
              )
            })}
          </div>
        </div>

        <p className="roots__source">
          References — official Slow Motion release notes and 2026 press
          coverage.
        </p>
      </div>
    </section>
  )
}
