// Navbar.jsx — S: Top navigation rendering only
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../../store/slices/cartSlice'
import { selectWishlistCount } from '../../store/slices/wishlistSlice'
import SearchBar from '../search/SearchBar'
import AnimatedGradientText from '../magicui/AnimatedGradientText'
import ThemeToggle from '../ui/ThemeToggle'

const Navbar = () => {
  const cartCount     = useSelector(selectCartCount)
  const wishlistCount = useSelector(selectWishlistCount)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link--active' : ''}`

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="ShopAI home">
            🛍️{' '}
            <AnimatedGradientText colorFrom="#4f46e5" colorTo="#7c3aed" speed={0.8}>
              ShopAI
            </AnimatedGradientText>
          </Link>

          {/* Desktop search */}
          <div className="navbar__search">
            <SearchBar />
          </div>

          {/* Desktop nav */}
          <div className="navbar__nav--desktop">
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            <NavLink to="/products" className={navLinkClass}>Products</NavLink>
            <NavLink to="/wishlist" className={navLinkClass} aria-label={`Wishlist, ${wishlistCount} items`}>
              <span aria-hidden="true">♥</span>
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="nav-badge nav-badge--red" aria-hidden="true">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </NavLink>
            <NavLink to="/cart" className={navLinkClass} aria-label={`Cart, ${cartCount} items`}>
              <span aria-hidden="true">🛒</span>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="nav-badge nav-badge--indigo" aria-hidden="true">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </NavLink>
            {/* Theme toggle — desktop */}
            <ThemeToggle className="navbar__theme-btn" />
          </div>

          {/* Mobile: icons + theme + hamburger */}
          <div className="navbar__mobile-icons">
            <NavLink
              to="/wishlist"
              className={({ isActive }) => `navbar__icon-btn ${isActive ? 'navbar__icon-btn--active' : ''}`}
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <span aria-hidden="true">♥</span>
              {wishlistCount > 0 && (
                <span className="nav-badge nav-badge--red nav-badge--dot">{wishlistCount > 9 ? '9+' : wishlistCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) => `navbar__icon-btn ${isActive ? 'navbar__icon-btn--active' : ''}`}
              aria-label={`Cart, ${cartCount} items`}
            >
              <span aria-hidden="true">🛒</span>
              {cartCount > 0 && (
                <span className="nav-badge nav-badge--indigo nav-badge--dot">{cartCount > 9 ? '9+' : cartCount}</span>
              )}
            </NavLink>

            {/* Theme toggle — mobile */}
            <ThemeToggle />

            <button
              className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile search row */}
        <div className="navbar__mobile-search">
          <SearchBar />
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <>
          <div className="navbar__backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <div className="navbar__mobile-menu" role="dialog" aria-label="Navigation menu">
            <NavLink to="/" className={navLinkClass} end onClick={() => setMenuOpen(false)}>🏠 Home</NavLink>
            <NavLink to="/products" className={navLinkClass} onClick={() => setMenuOpen(false)}>📦 Products</NavLink>
            <NavLink to="/wishlist" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              ♥ Wishlist {wishlistCount > 0 && <span className="nav-badge nav-badge--red">{wishlistCount}</span>}
            </NavLink>
            <NavLink to="/cart" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              🛒 Cart {cartCount > 0 && <span className="nav-badge nav-badge--indigo">{cartCount}</span>}
            </NavLink>
          </div>
        </>
      )}
    </header>
  )
}

export default Navbar
