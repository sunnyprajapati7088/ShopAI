// PageLoader.jsx — Full-screen pixel-perfect branded splash loader
import { useEffect, useState } from 'react'

const PageLoader = ({ onDone }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // 'loading' | 'done' | 'hidden'

  useEffect(() => {
    // Simulate realistic loading progress
    const steps = [
      { target: 30, delay: 80  },
      { target: 60, delay: 180 },
      { target: 80, delay: 280 },
      { target: 95, delay: 400 },
      { target: 100, delay: 600 },
    ]

    let current = 0
    const timers = []

    steps.forEach(({ target, delay }) => {
      const t = setTimeout(() => {
        setProgress(target)
        if (target === 100) {
          const t2 = setTimeout(() => {
            setPhase('done')
            const t3 = setTimeout(() => {
              setPhase('hidden')
              onDone?.()
            }, 600)
            timers.push(t3)
          }, 300)
          timers.push(t2)
        }
      }, delay)
      timers.push(t)
    })

    return () => timers.forEach(clearTimeout)
  }, [onDone])

  if (phase === 'hidden') return null

  return (
    <div className={`page-loader ${phase === 'done' ? 'page-loader--exit' : ''}`} role="status" aria-label="Loading">
      {/* Background gradient mesh */}
      <div className="page-loader__bg" aria-hidden="true" />
      <div className="page-loader__orb page-loader__orb--1" aria-hidden="true" />
      <div className="page-loader__orb page-loader__orb--2" aria-hidden="true" />

      <div className="page-loader__content">
        {/* Spinning ring */}
        <div className="page-loader__ring" aria-hidden="true">
          <div className="page-loader__ring-inner" />
          <div className="page-loader__ring-pulse" />
        </div>

        {/* Logo */}
        <div className="page-loader__logo">
          <span className="page-loader__logo-icon">🛍️</span>
          <span className="page-loader__logo-text">ShopAI</span>
        </div>

        {/* Tagline */}
        <p className="page-loader__tagline">Loading your experience…</p>

        {/* Progress bar */}
        <div className="page-loader__bar-wrap" aria-hidden="true">
          <div
            className="page-loader__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress number */}
        <span className="page-loader__pct" aria-hidden="true">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}

export default PageLoader
