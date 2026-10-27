import { useEffect } from 'react'
import { useDialog } from '../hooks/useDialog'
import type { GalleryItem } from '../data/site'
import { ArtImage } from './ArtImage'
import { Portal } from './Portal'
import { ArrowLeft, ArrowRight, CloseIcon } from './Icons'
import './lightbox.css'

interface LightboxProps {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useDialog(true, onClose)
  const item = items[index]
  const total = items.length

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate((index + 1) % total)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onNavigate((index - 1 + total) % total)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [index, onNavigate, total])

  return (
    <Portal>
      <div
        ref={dialogRef}
        className="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} — image ${index + 1} of ${total}`}
      >
        <div className="lightbox__top">
          <span className="lightbox__count">
            {String(index + 1).padStart(2, '0')}
            <i aria-hidden="true">/</i>
            {String(total).padStart(2, '0')}
          </span>

          <button
            type="button"
            className="lightbox__close"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <span>Close</span>
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="lightbox__stage">
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => onNavigate((index - 1 + total) % total)}
            aria-label="Previous image"
          >
            <ArrowLeft size={20} />
          </button>

          <figure className="lightbox__figure" key={item.id}>
            <ArtImage
              asset={item.image}
              sizes="(max-width: 899px) 92vw, 78vw"
              loading="eager"
              fetchPriority="high"
            />
            <figcaption>
              <span className="lightbox__title">{item.title}</span>
              <span className="lightbox__meta">
                {item.meta} — {item.credit}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => onNavigate((index + 1) % total)}
            aria-label="Next image"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        <p className="lightbox__hint">
          Use <kbd>←</kbd> <kbd>→</kbd> to move between frames · <kbd>Esc</kbd> to
          close
        </p>
      </div>
    </Portal>
  )
}
