// ProductCard.jsx — S: Renders a single product card only
// Magic UI: ShineBorder on hover, glare-card effect
import { Link } from 'react-router-dom'
import { useCart, useIsInCart } from '../../hooks/useCart'
import { useWishlist, useIsWishlisted } from '../../hooks/useWishlist'
import StarRating from '../ui/StarRating'
import Button from '../ui/Button'
import ShineBorder from '../magicui/ShineBorder'

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart } = useCart()
  const { toggleWishlist } = useWishlist()
  const isInCart     = useIsInCart(product.id)
  const isWishlisted = useIsWishlisted(product.id)

  const handleCartToggle = (e) => {
    e.preventDefault()
    if (isInCart) removeFromCart(product.id)
    else addToCart({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail })
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    toggleWishlist({
      id: product.id, title: product.title, price: product.price,
      thumbnail: product.thumbnail, rating: product.rating, category: product.category,
    })
  }

  return (
    <article className="product-card glare-card has-shine">
      {/* Magic UI — ShineBorder: animated border beam on hover */}
      <ShineBorder
        borderWidth={1.5}
        duration={12}
        shineColor={['#4f46e5', '#7c3aed', '#a78bfa']}
      />

      {/* Image */}
      <Link to={`/product/${product.id}`} aria-label={`View ${product.title}`}>
        <div className="product-card__image-wrap">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="product-card__image"
          />
          <button
            onClick={handleWishlistToggle}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`product-card__wishlist ${isWishlisted ? 'product-card__wishlist--active' : ''}`}
          >
            {isWishlisted ? '♥' : '♡'}
          </button>
        </div>
      </Link>

      {/* Body */}
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card__title">{product.title}</h3>
        </Link>
        <StarRating rating={product.rating ?? 0} />
        <div className="product-card__footer">
          <span className="product-card__price">₹{(product.price * 83).toFixed(0)}</span>
          <Button
            variant={isInCart ? 'danger' : 'primary'}
            size="sm"
            onClick={handleCartToggle}
            aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
          >
            {isInCart ? '✕ Remove' : '+ Cart'}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
