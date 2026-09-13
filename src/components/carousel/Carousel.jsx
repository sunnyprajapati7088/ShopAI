// Carousel.jsx — Auto-play only, progress bar, dot indicators
import { useState, useEffect, useRef } from 'react'
import { useCarousel } from '../../hooks/useCarousel'

const AUTO_PLAY_MS = 5000

const Carousel = ({
  slides = [],
  renderSlide,
  autoPlayInterval = AUTO_PLAY_MS,
  className = '',
}) => {
  const { activeIndex, goToIndex, pause, play, isPlaying } =
    useCarousel(slides.length, autoPlayInterval)

  // rAF-driven progress bar
  const [progress, setProgress] = useState(0)
  const rafRef   = useRef(null)
  const t0Ref    = useRef(null)

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (!isPlaying) { setProgress(0); return }

    setProgress(0)
    t0Ref.current = performance.now()

    const tick = (now) => {
      const pct = Math.min(((now - t0Ref.current) / autoPlayInterval) * 100, 100)
      setProgress(pct)
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [activeIndex, isPlaying, autoPlayInterval])

  if (!slides.length) return null

  return (
    <div
      className={`hcarousel ${className}`}
      onMouseEnter={pause}
      onMouseLeave={play}
      role="region"
      aria-label="Featured products carousel"
    >
      {/* Slides track */}
      <div
        className="hcarousel__track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id ?? i}
            className="hcarousel__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== activeIndex}
          >
            {renderSlide(slide, i)}
          </div>
        ))}
      </div>

      {/* Bottom bar: dots + progress */}
      <div className="hcarousel__footer" aria-hidden="true">
        {/* Dot indicators */}
        <div className="hcarousel__dots" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goToIndex(i)}
              className={`hcarousel__dot${i === activeIndex ? ' hcarousel__dot--active' : ''}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <span className="hcarousel__counter">
          {activeIndex + 1} / {slides.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="hcarousel__progress" aria-hidden="true">
        <div
          className="hcarousel__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default Carousel
