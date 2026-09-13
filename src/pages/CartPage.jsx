// CartPage.jsx — Magic UI: ShimmerButton on checkout, BorderBeam on summary card
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import ShimmerButton from '../components/magicui/ShimmerButton'
import BorderBeam from '../components/magicui/BorderBeam'

// Convert USD → INR at a fixed rate
const toINR = (usd) => Math.round(usd * 83)
const fmt   = (inr) => `₹${inr.toLocaleString('en-IN')}`

/* ── Cart Item ── */
const CartItem = ({ item, onUpdateQty, onRemove }) => (
  <article className="cart-item">
    <Link to={`/product/${item.id}`} className="cart-item__image-wrap" aria-label={item.title}>
      <img src={item.thumbnail} alt={item.title} className="cart-item__image" />
    </Link>
    <div className="cart-item__info">
      <Link to={`/product/${item.id}`} className="cart-item__title">{item.title}</Link>
      <p className="cart-item__price-unit">{fmt(toINR(item.price))} each</p>
    </div>
    <div className="cart-item__right">
      <div className="qty-control">
        <button
          className="qty-control__btn"
          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >−</button>
        <span className="qty-control__value">{item.quantity}</span>
        <button
          className="qty-control__btn"
          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
          aria-label="Increase quantity"
        >+</button>
      </div>
      <p className="cart-item__total">{fmt(toINR(item.price) * item.quantity)}</p>
      <button className="cart-item__remove" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.title}`}>
        Remove ✕
      </button>
    </div>
  </article>
)

/* ── Order Summary — Magic UI BorderBeam ── */
const OrderSummary = ({ items, total, onCheckout }) => {
  const itemCount  = items.reduce((a, i) => a + i.quantity, 0)
  const inrTotal   = toINR(total)
  const inrTax     = Math.round(inrTotal * 0.18)   // 18% GST
  const inrGrand   = inrTotal + inrTax

  return (
    <div className="order-summary has-shine" style={{ position: 'relative', overflow: 'hidden' }}>
      <BorderBeam size={60} duration={10} colorFrom="#4f46e5" colorTo="#a78bfa" borderWidth={1.5} />

      <h2 className="order-summary__title">Order Summary</h2>

      <div className="order-summary__row">
        <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
        <span>{fmt(inrTotal)}</span>
      </div>
      <div className="order-summary__row">
        <span>Shipping</span>
        <span className="order-summary__free">Free</span>
      </div>
      <div className="order-summary__row">
        <span>GST (18%)</span>
        <span>{fmt(inrTax)}</span>
      </div>

      <div className="order-summary__divider" aria-hidden="true" />

      <div className="order-summary__total-row">
        <span className="order-summary__total-label">Total</span>
        <span className="order-summary__total-value">{fmt(inrGrand)}</span>
      </div>

      {/* Magic UI — ShimmerButton for checkout */}
      <ShimmerButton
        shimmerColor="rgba(255,255,255,0.6)"
        shimmerDuration="2.5s"
        borderRadius="10px"
        background="linear-gradient(135deg, #4f46e5, #7c3aed)"
        onClick={onCheckout}
        style={{ width: '100%', justifyContent: 'center', fontSize: 'var(--font-size-base)' }}
      >
        Checkout →
      </ShimmerButton>

      <div style={{ textAlign: 'center', marginTop: 'var(--space-3)' }}>
        <Link to="/products" style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-primary-600)',
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
        }}>
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}

/* ── Cart Page ── */
const CartPage = () => {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-page__header">
          <h1 className="cart-page__title">Shopping Cart</h1>
        </div>
        <EmptyState title="Your cart is empty" message="Add some products to your cart to get started.">
          <Link to="/products" style={{ marginTop: 'var(--space-4)', display: 'inline-block' }}>
            <Button variant="primary" size="lg">Browse Products</Button>
          </Link>
        </EmptyState>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="cart-page__header">
        <h1 className="cart-page__title">
          Shopping Cart
          <span style={{ marginLeft: 'var(--space-3)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-normal)', color: 'var(--color-gray-400)' }}>
            ({items.reduce((a, i) => a + i.quantity, 0)})
          </span>
        </h1>
        <Button variant="ghost" size="sm" onClick={clearCart} style={{ color: 'var(--color-danger-500)' }}>
          🗑 Clear all
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} onUpdateQty={updateQuantity} onRemove={removeFromCart} />
        ))}
      </div>

      <OrderSummary items={items} total={total} onCheckout={() => alert('Checkout coming soon! 🎉')} />
    </main>
  )
}

export default CartPage
