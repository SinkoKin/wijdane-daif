import { useEffect, useRef } from 'react'
import { useSmoothScroll } from '../context/SmoothScroll'

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Locks page scroll, traps keyboard focus inside the returned ref and restores
 * focus when the dialog closes. Keeps the close handler in a ref so the lock
 * does not restart on every parent render.
 */
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  const { stop, start } = useSmoothScroll()

  closeRef.current = onClose

  useEffect(() => {
    if (!open) return

    const node = ref.current
    const previous = document.activeElement as HTMLElement | null
    stop()

    const focusables = () =>
      Array.from(node?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (element) => {
          if (element.tabIndex < 0) return false
          const rect = element.getBoundingClientRect()
          return (
            rect.width > 0 &&
            rect.height > 0 &&
            window.getComputedStyle(element).visibility !== 'hidden'
          )
        },
      )

    const timer = window.setTimeout(() => focusables()[0]?.focus(), 60)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
        return
      }

      if (event.key !== 'Tab') return
      const items = focusables()
      if (!items.length) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !node?.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !node?.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKeyDown)
      start()
      previous?.focus?.()
    }
  }, [open, start, stop])

  return ref
}
