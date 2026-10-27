import { useCallback, useEffect, useState } from 'react'
import {
  SmoothScrollProvider,
  useSmoothScroll,
} from './context/SmoothScroll'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { About } from './components/About'
import { Music } from './components/Music'
import { Visuals } from './components/Visuals'
import { Roots } from './components/Roots'
import { Contact } from './components/Contact'
import { Preloader } from './components/Preloader'
import { CustomCursor } from './components/CustomCursor'
import { GrainOverlay } from './components/GrainOverlay'

function Experience() {
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(true)
  const { start } = useSmoothScroll()

  useEffect(() => {
    document.documentElement.classList.add('is-loading')
    document.body.classList.add('is-loading')

    return () => {
      document.documentElement.classList.remove('is-loading')
      document.body.classList.remove('is-loading')
    }
  }, [])

  useEffect(() => {
    if (!loading) return

    // Safety net: keep the site usable even if the animation layer fails.
    const timer = window.setTimeout(() => {
      setRevealed(true)
      setLoading(false)
      document.documentElement.classList.remove('is-loading')
      document.body.classList.remove('is-loading')
      start()
    }, 6000)

    return () => window.clearTimeout(timer)
  }, [loading, start])

  const handleReveal = useCallback(() => {
    setRevealed(true)
    document.documentElement.classList.remove('is-loading')
    document.body.classList.remove('is-loading')
  }, [])

  const handleDone = useCallback(() => {
    setLoading(false)
    start()
  }, [start])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <GrainOverlay />
      <CustomCursor />
      <Navigation ready={revealed} />

      <main id="main" tabIndex={-1}>
        <Hero ready={revealed} />
        <Manifesto />
        <About />
        <Music />
        <Visuals />
        <Roots />
        <Contact />
      </main>

      {loading ? (
        <Preloader onReveal={handleReveal} onDone={handleDone} />
      ) : null}
    </>
  )
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <Experience />
    </SmoothScrollProvider>
  )
}
