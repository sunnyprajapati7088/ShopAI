// PageLoader.jsx — Full-screen branded splash loader
// Calls onDone as soon as exit animation starts so the app
// is fully interactive while the loader fades out.
import { useEffect, useState } from 'react'

const PageLoader = ({ onDone }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase]       = useState('loading') // 'loading' | 'exit' | 'hidden'

  useEffect(() => {
    const timers = []

    const schedule = (fn, delay) => {
      const t = setTimeout(fn, delay)
      timers.push(t)
    }

    // Rapid progress steps — total ~700ms
    schedule(() => setProgress(30),  80)
    schedule(() => setProgress(60),  200)
    schedule(() => setProgress(80),  350)
    schedule(() => setProgress(95),  500)
    schedule(() => setProgress(100), 650)

    // Start exit animation at 700ms
    schedule(() => {
      setPhase('exit')
      // ✅ Call onDone immediately when exit starts — app becomes
      //    fully interactive while loader fades out in background
      onDone?.()
    }, 700)

    // Remove from DOM after animation completes (550ms)
    schedule(() => setPhase('hidden'), 1300)

    return () => timers.forEach(clearTimeout)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'hidden') return null

  return (
    <div
      className={`page-loader ${phase === 'exit' ? 'page-loader--exit' : ''}`}
      role="status"
      aria-label="Loading"
      // Always non-interactive — never blocks the app underneath
      style={{ pointerEvents: 'none' }}
    >
      <div className="page-loader__bg"      aria-hidden="true" />
      <div className="page-loader__orb page-loader__orb--1" aria-hidden="true" />
      <div className="page-loader__orb page-loader__orb--2" aria-hidden="true" />

      <div className="page-loader__content">
        <div className="page-loader__ring" aria-hidden="true">
          <div className="page-loader__ring-inner" />
          <div className="page-loader__ring-pulse" />
        </div>

        <div className="page-loader__logo">
          <span className="page-loader__logo-icon">🛍️</span>
          <span className="page-loader__logo-text">ShopAI</span>
        </div>

        <p className="page-loader__tagline">Loading your experience…</p>

        <div className="page-loader__bar-wrap" aria-hidden="true">
          <div
            className="page-loader__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="page-loader__pct" aria-hidden="true">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}

export default PageLoader
