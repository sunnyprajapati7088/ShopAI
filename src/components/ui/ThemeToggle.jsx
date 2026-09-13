// ThemeToggle.jsx — Animated sun/moon toggle button
import { useTheme } from '../../hooks/useTheme'

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggle } = useTheme()

  return (
    <button
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : ''} ${className}`}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb">
          <span className="theme-toggle__icon">
            {isDark ? '🌙' : '☀️'}
          </span>
        </span>
      </span>
    </button>
  )
}

export default ThemeToggle
