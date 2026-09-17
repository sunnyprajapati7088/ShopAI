// useTheme — singleton theme store, no competing states across components
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'shopai-theme'

// ── Module-level singleton ──
// All hook instances share this state, no competing setState calls
const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

let _theme = getInitialTheme()
const _listeners = new Set()

const setGlobalTheme = (theme) => {
  _theme = theme
  try {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  } catch { /* ignore */ }
  _listeners.forEach(fn => fn(theme))
}

// Apply immediately on module load (prevents flash)
document.documentElement.setAttribute('data-theme', _theme)

export const useTheme = () => {
  const [theme, setLocalTheme] = useState(_theme)

  useEffect(() => {
    // Subscribe to global changes
    _listeners.add(setLocalTheme)
    // Sync in case it changed between render and effect
    if (theme !== _theme) setLocalTheme(_theme)
    return () => _listeners.delete(setLocalTheme)
  }, [])

  const toggle = useCallback(() => {
    setGlobalTheme(_theme === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, toggle, isDark: theme === 'dark' }
}
