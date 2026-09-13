// WishlistPage.jsx — Magic UI: ShineBorder on wishlist items
import { Link } from 'react-router-dom'
import { useWishlist } from '../hooks/useWishlist'
import { useCart, useIsInCart } from '../hooks/useCart'
import StarRating from '../components/ui/StarRating'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import ShineBorder from '../components/magicui/ShineBorder'

const WishlistItem = ({ item, onRemove }) => {
  const { addToCart, removeFromCart } = useCart()
  const isInCart = useIsInCart(item.id)

  const handleCartToggle = () => {
    if (isInCart) removeFromCart(item.id)
    else addToCart({ id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail })
  }

  return (
    <article className="wishlist-item has-shine">
      {/* Magic UI — ShineBorder on each wishlist card */}
      <ShineBorder
        borderWidth={1}
        duration={16}
        shineColor={['#4f46e5', '#a78bfa', '#7c3aed']}
      />

      <Link to={`/product/${item.id}`} className="wishlist-item__image-wrap">
        <img src={item.thumbnail} alt={item.title} className="wishlist-item__image" />
      </Link>

      <div className="wishlist-item__info">
        <Badge color="indigo">{item.category}</Badge>
        <Link to={`/product/${item.id}`} className="wishlist-item__title">{item.title}</Link>
        <StarRating rating={item.rating ?? 0} />
        <p className="wishlist-item__price">₹{(item.price * 83).toFixed(0)}</p>
      </div>

      <div className="wishlist-item__actions">
        <Button variant={isInCart ? 'danger' : 'primary'} size="sm" onClick={handleCartToggle}>
          {isInCart ? '✕ Remove' : '+ Cart'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id)}
          style={{ color: 'var(--color-rose-500)', fontWeight: 'var(--font-weight-semibold)' }}
          aria-label={`Remove ${item.title} from wishlist`}
        >
          ♥ Unsave
        </Button>
      </div>
    </article>
  )
}

const WishlistPage = () => {
  const { items, removeFromWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <main className="wishlist-page">
        <h1 className="wishlist-page__title">Wishlist</h1>
        <EmptyState title="Your wishlist is empty" message="Save products you love by clicking the ♡ icon on any product.">
          <Link to="/products" style={{ marginTop: 'var(--space-4)', display: 'inline-block' }}>
            <Button variant="primary" size="lg">Browse Products</Button>
          </Link>
        </EmptyState>
      </main>
    )
  }

  return (
    <main className="wishlist-page">
      <h1 className="wishlist-page__title">
        Wishlist <span>({items.length})</span>
      </h1>
      <div className="wishlist-list">
        {items.map((item) => (
          <WishlistItem key={item.id} item={item} onRemove={removeFromWishlist} />
        ))}
      </div>
    </main>
  )
}

export default WishlistPage
