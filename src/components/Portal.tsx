import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

/**
 * The app is client-rendered, so the portal target exists during render.
 * Rendering immediately (instead of waiting for an effect) lets dialog refs
 * be attached before useDialog measures focusable children.
 */
export function Portal({ children }: { children: ReactNode }) {
  if (typeof document === 'undefined') return null
  return createPortal(children, document.body)
}
