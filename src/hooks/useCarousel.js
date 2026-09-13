// useCarousel — S: Only manages carousel index and auto-play logic
import { useState, useEffect, useCallback } from 'react'

export const useCarousel = (itemCount, autoPlayInterval = 4000) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % itemCount)
  }, [itemCount])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount)
  }, [itemCount])

  const goToIndex = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  const pause = useCallback(() => setIsPlaying(false), [])
  const play  = useCallback(() => setIsPlaying(true), [])

  useEffect(() => {
    if (!isPlaying || itemCount === 0) return
    const timer = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(timer)
  }, [isPlaying, itemCount, goToNext, autoPlayInterval])

  return { activeIndex, goToNext, goToPrev, goToIndex, pause, play, isPlaying }
}
