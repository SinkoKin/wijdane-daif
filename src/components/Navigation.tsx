import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import { SITE, SOCIALS } from '../data/site'
import { useSmoothScroll } from '../context/SmoothScroll'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ArrowUpRight } from './Icons'
import { WDLogo } from './WDLogo'
import './navigation.css'

type NavTheme = 'light' | 'dark'

interface NavigationProps {
  ready: boolean
}

export function Navigation({ ready }: NavigationProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<NavTheme>('dark')
  const { scrollTo, stop, start } = useSmoothScroll()
  const reducedMotion = useReducedMotion()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-theme]'),
    )

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const target = entry.target as HTMLElement
          setTheme(target.dataset.navTheme === 'light' ? 'light' : 'dark')
        }
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return

    stop()
    const node = menuRef.current

    const focusables = () =>
      Array.from(
        node?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null)

    const timer = window.setTimeout(() => focusables()[0]?.focus(), 220)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (event.key !== 'Tab') return
      const items = [toggleRef.current, ...focusables()].filter(
        (element): element is HTMLElement => Boolean(element && element.offsetParent !== null),
      )
      if (!items.length) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null
      const activeIndex = active ? items.indexOf(active) : -1

      if (event.shiftKey && (active === first || activeIndex === -1)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || activeIndex === -1)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKeyDown)
      start()
      toggleRef.current?.focus()
    }
  }, [open, start, stop])

  const handleAnchor = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault()
      const offset = href === '#top' ? 0 : -54

      if (open) {
        setOpen(false)
        window.setTimeout(
          () => scrollTo(href, offset),
          reducedMotion ? 0 : 380,
        )
        return
      }

      scrollTo(href, offset)
    },
    [open, reducedMotion, scrollTo],
  )

  const onMenuAnchor = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    handleAnchor(event, href)
  }

  return (
    <>
      <header
        className={[
          'nav',
          `nav--${theme}`,
          scrolled ? 'is-scrolled' : '',
          ready ? 'is-ready' : '',
          open ? 'is-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="nav__inner">
          <a
            className="nav__brand"
            href="#top"
            onClick={(event) => handleAnchor(event, '#top')}
            aria-label="Wijdane Daif — back to the top"
          >
            <span className="nav__mark">
              <WDLogo size={28} />
            </span>
            <span className="nav__brand-text">Wijdane Daif</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {SITE.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleAnchor(event, item.href)}
                className="nav__link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a
              className="nav__listen"
              href="#music"
              tabIndex={open ? -1 : undefined}
              aria-hidden={open ? true : undefined}
              onClick={(event) => handleAnchor(event, '#music')}
            >
              <span className="nav__listen-dot" aria-hidden="true" />
              <span>Listen</span>
              <ArrowUpRight size={13} />
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={menuRef}
        className={`menu${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="menu__inner">
          <div className="menu__top">
            <p className="menu__eyebrow">Index — Wijdane Daif</p>
            <p className="menu__arabic" lang="ar" dir="rtl">
              {SITE.arabicName}
            </p>
          </div>

          <nav className="menu__nav" aria-label="Menu">
            {SITE.nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="menu__link"
                tabIndex={open ? 0 : -1}
                onClick={(event) => onMenuAnchor(event, item.href)}
              >
                <span className="menu__link-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="menu__link-label">{item.label}</span>
                <span className="menu__link-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </a>
            ))}
          </nav>

          <div className="menu__foot">
            <div className="menu__socials">
              {SOCIALS.filter((social) =>
                ['Instagram', 'YouTube', 'TikTok'].includes(social.label),
              ).map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="menu__social"
                  target="_blank"
                  rel="noreferrer noopener"
                  tabIndex={open ? 0 : -1}
                >
                  {social.label}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>

            <p className="menu__note">
              Singer & songwriter
              <br />
              Morocco — 2026
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
