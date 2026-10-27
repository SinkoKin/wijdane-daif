import { useCallback, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { RELEASES, SOCIALS, type Release } from '../data/site'
import { ArtImage } from './ArtImage'
import { MaskedLines } from './MaskedLines'
import { Magnetic } from './Magnetic'
import { SectionTag } from './SectionTag'
import { ArrowUpRight, PlayIcon, StarMark } from './Icons'
import { VideoModal } from './VideoModal'
import './music.css'

const APPLE_MUSIC =
  SOCIALS.find((social) => social.label === 'Apple Music')?.href ??
  'https://music.apple.com/ma/artist/wijdane-daif/1896328371'

interface ReleasePanelProps {
  release: Release
  onWatch: (release: Release) => void
}

function ReleasePanel({ release, onWatch }: ReleasePanelProps) {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion) return

      const cover = root.current?.querySelector<HTMLElement>('.release__cover')
      const image = cover?.querySelector<HTMLImageElement>('img')

      if (cover && image) {
        gsap.fromTo(
          cover,
          { clipPath: 'inset(12% 9% 12% 9%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cover,
              start: 'top 82%',
              once: true,
            },
          },
        )

        gsap.fromTo(
          image,
          { scale: 1.16 },
          {
            scale: 1,
            duration: 1.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cover,
              start: 'top 82%',
              once: true,
            },
          },
        )
      }

      gsap.from(
        gsap.utils.toArray<HTMLElement>('.release__fade', root.current),
        {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.release__info',
            start: 'top 78%',
            once: true,
          },
        },
      )

      gsap.fromTo(
        '.release__title',
        { xPercent: 3 },
        {
          xPercent: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        '.release__ghost',
        { yPercent: 14 },
        {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <article
      ref={root}
      id={release.id}
      className={`release release--${release.id}`}
      aria-label={`${release.title} — ${release.format}, ${release.year}`}
    >
      <div className="release__atmosphere" aria-hidden="true">
        <ArtImage
          asset={release.backdrop}
          sizes="70vw"
          objectPosition="50% 35%"
        />
      </div>

      <div className="release__inner">
        <div className="release__top">
          <span>
            <i className="release__top-dot" aria-hidden="true" />
            Single {release.index} / Official release
          </span>
          <span>{release.format} — {release.year}</span>
        </div>

        <div className="release__body">
          <div className="release__media">
            <span className="release__ghost" aria-hidden="true">
              {release.index}
            </span>

            <figure className="release__cover">
              <ArtImage
                asset={release.cover}
                sizes="(max-width: 899px) 92vw, 42vw"
              />
            </figure>

            <div className="release__play-wrap">
              <Magnetic>
                <button
                  type="button"
                  className="release__play"
                  onClick={() => onWatch(release)}
                  data-cursor="Play"
                  aria-label={`Play the official ${release.title} music video`}
                >
                  <span className="release__play-icon" aria-hidden="true">
                    <PlayIcon size={15} />
                  </span>
                  <span>Watch the film</span>
                </button>
              </Magnetic>
            </div>
          </div>

          <div className="release__info">
            <div className="release__eyebrow release__fade">
              <span>{release.format}</span>
              <span>{release.year}</span>
            </div>

            <MaskedLines
              as="h3"
              lines={release.title.split(' ')}
              className="release__title"
              ariaLabel={release.title}
              start="top 84%"
            />

            <p className="release__desc release__fade">{release.description}</p>

            <dl className="release__credits release__fade">
              {release.credits.map((credit) => (
                <div className="release__credit" key={credit.label}>
                  <dt>{credit.label}</dt>
                  <dd>{credit.value}</dd>
                </div>
              ))}
            </dl>

            <div className="release__actions release__fade">
              <a
                className="release__cta"
                href={release.appleMusicUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Listen on Apple Music
                <ArrowUpRight size={13} />
              </a>
              <a
                className="release__text-link"
                href={release.youtubeUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                YouTube
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Music() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState<Release | null>(null)
  const close = useCallback(() => setActive(null), [])

  return (
    <>
      <section
        id="music"
        ref={root}
        className="music"
        data-nav-theme="dark"
        aria-label="Music by Wijdane Daif"
      >
        <div className="music__intro">
          <SectionTag index="04">The sound</SectionTag>

          <div className="music__head">
            <MaskedLines
              as="h2"
              lines={['Two releases.', 'One language.']}
              className="music__title"
              ariaLabel="Two releases. One language."
              start="top 84%"
            />

            <div className="music__aside">
              <p>
                In 2026, Wijdane Daif released two singles — the slow-burning
                debut <em>Slow Motion</em>, and the brighter <em>Bomba</em>.
                Both are available to listen and watch through the official
                channels.
              </p>
              <a
                className="link-arrow"
                href={APPLE_MUSIC}
                target="_blank"
                rel="noreferrer noopener"
              >
                All releases on Apple Music
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        <div className="music__releases">
          {RELEASES.map((release) => (
            <ReleasePanel
              key={release.id}
              release={release}
              onWatch={setActive}
            />
          ))}
        </div>

        <div className="music__coda">
          <span className="music__coda-rule" aria-hidden="true" />
          <p>
            Slow Motion and Bomba are also available on YouTube and major
            streaming services.
          </p>
          <span className="music__coda-mark" aria-hidden="true">
            <StarMark size={18} />
          </span>
        </div>
      </section>

      {active ? <VideoModal release={active} onClose={close} /> : null}
    </>
  )
}
