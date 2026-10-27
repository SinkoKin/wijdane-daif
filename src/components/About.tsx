import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useSmoothScroll } from '../context/SmoothScroll'
import { ABOUT, IMAGES, SITE } from '../data/site'
import { ArtImage } from './ArtImage'
import { MaskedLines } from './MaskedLines'
import { SectionTag } from './SectionTag'
import { ArrowUpRight } from './Icons'
import './about.css'

export function About() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      if (reducedMotion) return

      const media = root.current?.querySelector<HTMLElement>('.about__image')
      const image = media?.querySelector<HTMLImageElement>('img')

      if (media && image) {
        gsap.fromTo(
          media,
          { clipPath: 'inset(13% 11% 0% 11%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: media,
              start: 'top 84%',
              once: true,
            },
          },
        )

        gsap.fromTo(
          image,
          { yPercent: -5, scale: 1.12 },
          {
            yPercent: 5,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: media,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }

      gsap.from(
        gsap.utils.toArray<HTMLElement>('.about__reveal', root.current),
        {
          y: 28,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about__copy',
            start: 'top 78%',
            once: true,
          },
        },
      )

      gsap.to('.about__ghost', {
        xPercent: -5,
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
      id="about"
      ref={root}
      className="about"
      data-nav-theme="light"
      aria-label="About Wijdane Daif"
    >
      <span className="about__ghost" aria-hidden="true">
        ARTIST
      </span>

      <div className="about__shell">
        <SectionTag index="03">The artist</SectionTag>

        <div className="about__head">
          <MaskedLines
            as="h2"
            lines={ABOUT.title}
            className="about__title"
            ariaLabel={ABOUT.title.join(' ')}
            start="top 88%"
          />
          <p className="about__lead">{ABOUT.lead}</p>
        </div>

        <div className="about__grid">
          <figure className="about__media">
            <div className="about__image">
              <ArtImage
                asset={IMAGES.aboutPortrait}
                sizes="(max-width: 899px) 92vw, 40vw"
              />
            </div>
            <figcaption>
              <span>{IMAGES.aboutPortrait.credit}</span>
              <span>MA — 2026</span>
            </figcaption>
            <span className="about__arabic" lang="ar" dir="rtl" aria-hidden="true">
              {SITE.arabicName}
            </span>
          </figure>

          <div className="about__copy">
            <p className="about__paragraph about__paragraph--lead about__reveal">
              {ABOUT.paragraphs[0]}
            </p>
            <p className="about__paragraph about__reveal">
              {ABOUT.paragraphs[1]}
            </p>

            <dl className="about__facts about__reveal">
              {ABOUT.facts.map((fact) => (
                <div className="about__fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <blockquote className="about__quote about__reveal">
              <p>“{ABOUT.quote}”</p>
              <footer>{ABOUT.quoteNote}</footer>
            </blockquote>

            <div className="about__reveal">
              <a
                className="link-arrow"
                href="#music"
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo('#music', -54)
                }}
              >
                Enter the sound
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
