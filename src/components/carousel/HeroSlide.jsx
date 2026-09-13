// HeroSlide.jsx — Grid-based layout, no overflow, always shows image
import { Link } from 'react-router-dom'

const HeroSlide = ({ product }) => {
  if (!product) return null

  return (
    <article className="hero-slide">
      {/* ── Background: blurred full-bleed thumbnail ── */}
      <div
        className="hero-slide__bg"
        style={{ backgroundImage: `url(${product.thumbnail})` }}
        aria-hidden="true"
      />
      {/* Dark scrim overlay */}
      <div className="hero-slide__scrim" aria-hidden="true" />

      {/* ── Two-column grid ── */}
      <div className="hero-slide__grid">

        {/* LEFT: text */}
        <div className="hero-slide__text">
          <span className="hero-slide__tag">{product.category}</span>
          <h2 className="hero-slide__title">{product.title}</h2>
          <p className="hero-slide__desc">{product.description}</p>
          <div className="hero-slide__meta">
            <span className="hero-slide__price">₹{Math.round(product.price * 83).toLocaleString('en-IN')}</span>
            <Link to={`/product/${product.id}`} className="hero-slide__btn">
              Shop Now →
            </Link>
          </div>
        </div>

        {/* RIGHT: product image */}
        <div className="hero-slide__img-col" aria-hidden="true">
          <div className="hero-slide__img-glow" />
          <img
            src={product.thumbnail}
            alt=""
            className="hero-slide__img"
          />
        </div>

      </div>
    </article>
  )
}

export default HeroSlide
