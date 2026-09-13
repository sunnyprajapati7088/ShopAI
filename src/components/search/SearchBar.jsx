// SearchBar.jsx — S: Search input + navigate to /products on type
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  setSearchQuery,
  setActiveCategory,
  selectSearchQuery,
} from '../../store/slices/productsSlice'

const SearchBar = ({ placeholder = 'Search products...', className = '' }) => {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const location  = useLocation()
  const searchQuery = useSelector(selectSearchQuery)

  const handleChange = (e) => {
    const value = e.target.value
    dispatch(setSearchQuery(value))
    if (value) dispatch(setActiveCategory(''))
    // Auto-navigate to products page so results are visible
    if (value && location.pathname !== '/products') {
      navigate('/products')
    }
  }

  const handleClear = () => dispatch(setSearchQuery(''))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && location.pathname !== '/products') {
      navigate('/products')
    }
  }

  return (
    <div className={`search-bar ${className}`}>
      <span className="search-bar__icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </span>
      <input
        type="search"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search products"
        className="search-bar__input"
        autoComplete="off"
      />
      {searchQuery && (
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
