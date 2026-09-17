// SearchBar.jsx — Local state for instant typing, syncs to Redux on debounce
// This prevents Redux re-renders from blocking/losing keystrokes
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  setSearchQuery,
  clearFilters,
  selectSearchQuery,
} from '../../store/slices/productsSlice'

const SearchBar = ({ placeholder = 'Search products...', className = '' }) => {
  const dispatch      = useDispatch()
  const navigate      = useNavigate()
  const location      = useLocation()
  const reduxQuery    = useSelector(selectSearchQuery)

  // Local state — updates instantly on every keystroke (no Redux overhead)
  const [localValue, setLocalValue] = useState(reduxQuery)
  const debounceRef  = useRef(null)
  const isTypingRef  = useRef(false)

  // Keep local state in sync when Redux clears externally (e.g. "Clear filters")
  useEffect(() => {
    if (!isTypingRef.current) {
      setLocalValue(reduxQuery)
    }
  }, [reduxQuery])

  const handleChange = (e) => {
    const value = e.target.value
    isTypingRef.current = true

    // Update local state immediately — shows characters instantly
    setLocalValue(value)

    // Debounce the Redux dispatch (400ms) — doesn't affect typing display
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      isTypingRef.current = false
      dispatch(setSearchQuery(value))
      if (value && location.pathname !== '/products') {
        navigate('/products')
      }
    }, 400)
  }

  const handleClear = () => {
    setLocalValue('')
    isTypingRef.current = false
    clearTimeout(debounceRef.current)
    dispatch(clearFilters())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Fire immediately on Enter without waiting for debounce
      clearTimeout(debounceRef.current)
      isTypingRef.current = false
      dispatch(setSearchQuery(localValue))
      if (location.pathname !== '/products') {
        navigate('/products')
      }
    }
    if (e.key === 'Escape') {
      handleClear()
    }
  }

  // Cleanup on unmount
  useEffect(() => () => clearTimeout(debounceRef.current), [])

  return (
    <div className={`search-bar ${className}`}>
      <span className="search-bar__icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </span>

      <input
        type="search"
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search products"
        className="search-bar__input"
        autoComplete="off"
        spellCheck="false"
      />

      {localValue && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="search-bar__clear"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
