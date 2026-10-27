import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useSmoothScroll } from '../context/SmoothScroll'
import { CONTACT_NOTE, SITE, SOCIALS } from '../data/site'
import { MaskedLines } from './MaskedLines'
import { SectionTag } from './SectionTag'
import { ArrowUpRight } from './Icons'
import './contact.css'

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      if (reducedMotion) return

      gsap.from(
        gsap.utils.toArray<HTMLElement>('.contact__reveal', root.current),
        {
          y: 26,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact__shell',
            start: 'top 72%',
            once: true,
          },
        },
      )
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <footer
      id="contact"
      ref={root}
      className="contact"
      data-nav-theme="light"
      aria-label="Contact and social links"
    >
      <div className="contact__shell">
        <SectionTag index="07">The invitation</SectionTag>

        <div className="contact__head">
          <MaskedLines
            as="h2"
            lines={['Let’s', 'connect.']}
            className="contact__title"
            ariaLabel="Let’s connect."
            start="top 86%"
          />
          <p className="contact__lead">
            For collaborations, press and bookings, reach Wijdane through the
            official channels below.
          </p>
        </div>

        <a
          className="contact__primary contact__reveal"
          href={SITE.instagram}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor="Open"
        >
          <span className="contact__primary-top">
            <span className="contact__primary-label">Instagram — official</span>
            <span className="contact__primary-handle">@wijdanedaif</span>
          </span>
          <span className="contact__primary-arrow" aria-hidden="true">
            <ArrowUpRight size={26} />
          </span>
        </a>

        <ul className="contact__socials">
          {SOCIALS.map((social) => (
            <li className="contact__social contact__reveal" key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="Open"
              >
                <span className="contact__social-label">{social.label}</span>
                <span className="contact__social-handle">{social.handle}</span>
                <span className="contact__social-note">{social.note}</span>
                <span className="contact__social-arrow" aria-hidden="true">
                  <ArrowUpRight size={15} />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="contact__note contact__reveal">{CONTACT_NOTE}</p>

        <div className="contact__closing contact__reveal">
          <p className="contact__arabic" lang="ar" dir="rtl">
            {SITE.arabicName}
          </p>
          <p className="contact__signature">Wijdane Daif</p>
        </div>
      </div>

      <div className="contact__footer">
        <span className="contact__footer-word" aria-hidden="true">
          Wijdane Daif
        </span>
        <div className="contact__footer-row">
          <span>© 2026 Wijdane Daif — all rights reserved</span>
          <span className="contact__footer-center">
            Official artist world — Morocco
          </span>
          <a
            className="contact__credit"
            href="https://www.instagram.com/yovsses/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Created by @yovsses
          </a>
          <button
            type="button"
            className="contact__top"
            onClick={() => scrollTo('#top', 0)}
          >
            Back to top
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
