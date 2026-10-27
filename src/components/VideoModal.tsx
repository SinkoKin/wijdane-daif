import { useDialog } from '../hooks/useDialog'
import type { Release } from '../data/site'
import { Portal } from './Portal'
import { ArrowUpRight, CloseIcon } from './Icons'
import './modal.css'

interface VideoModalProps {
  release: Release
  onClose: () => void
}

export function VideoModal({ release, onClose }: VideoModalProps) {
  const dialogRef = useDialog(true, onClose)

  return (
    <Portal>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        <button
          type="button"
          className="modal__backdrop"
          aria-label="Close video"
          tabIndex={-1}
          onClick={onClose}
        />

        <div className="modal__panel">
          <header className="modal__head">
            <div>
              <p className="modal__eyebrow">
                Official music video — {release.year}
              </p>
              <h2 id="video-modal-title" className="modal__title">
                {release.title}
              </h2>
            </div>
            <button
              type="button"
              className="modal__close"
              onClick={onClose}
              aria-label="Close video"
            >
              <span>Close</span>
              <CloseIcon size={18} />
            </button>
          </header>

          <div className="modal__video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${release.videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={`${release.title} — official music video by Wijdane Daif`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <footer className="modal__foot">
            <p>
              {release.credits[0].label}: {release.credits[0].value}
            </p>
            <a
              href={release.youtubeUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Watch on YouTube
              <ArrowUpRight size={12} />
            </a>
          </footer>
        </div>
      </div>
    </Portal>
  )
}
