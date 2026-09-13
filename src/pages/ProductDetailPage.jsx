// ProductDetailPage.jsx — Magic UI: BorderBeam on image gallery, ShimmerButton for cart CTA
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productService } from '../services/productService'
import { useCart, useIsInCart } from '../hooks/useCart'
import { useWishlist, useIsWishlisted } from '../hooks/useWishlist'
import { useAISummary } from '../hooks/useAISummary'
import { useCarousel } from '../hooks/useCarousel'
import StarRating from '../components/ui/StarRating'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { SkeletonBlock } from '../components/ui/Skeleton'
import BorderBeam from '../components/magicui/BorderBeam'
import ShimmerButton from '../components/magicui/ShimmerButton'

/* ── Loading skeleton ── */
const DetailSkeleton = () => (
  <main className="detail-page">
    <div className="detail-layout">
      <div>
        <SkeletonBlock className="skeleton" style={{ height: '340px', width: '100%', borderRadius: 'var(--radius-2xl)' }} />
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          {[...Array(4)].map((_, i) => (
            <SkeletonBlock key={i} className="skeleton" style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-lg)' }} />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <SkeletonBlock className="skeleton" style={{ height: '22px', width: '28%', borderRadius: 'var(--radius-full)' }} />
        <SkeletonBlock className="skeleton" style={{ height: '36px', width: '90%', borderRadius: 'var(--radius-lg)' }} />
        <SkeletonBlock className="skeleton" style={{ height: '20px', width: '44%', borderRadius: 'var(--radius-full)' }} />
        <SkeletonBlock className="skeleton" style={{ height: '40px', width: '35%', borderRadius: 'var(--radius-full)' }} />
        <SkeletonBlock className="skeleton" style={{ height: '110px', width: '100%', borderRadius: 'var(--radius-xl)' }} />
        <div style={{ display: 'flex', gap: '12px' }}>
          <SkeletonBlock className="skeleton" style={{ flex: 1, height: '52px', borderRadius: 'var(--radius-xl)' }} />
          <SkeletonBlock className="skeleton" style={{ width: '56px', height: '52px', borderRadius: 'var(--radius-xl)' }} />
        </div>
      </div>
    </div>
  </main>
)

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const { addToCart, removeFromCart } = useCart()
  const { toggleWishlist }            = useWishlist()
  const isInCart     = useIsInCart(Number(id))
  const isWishlisted = useIsWishlisted(Number(id))
  const { summary, status: aiStatus, isLocal, generateSummary, reset: resetAI } = useAISummary()

  const images = product?.images ?? []
  const { activeIndex, goToNext, goToPrev, goToIndex } = useCarousel(images.length)

  useEffect(() => {
    setLoading(true)
    setError(null)
    resetAI()
    productService
      .getProductById(id)
      .then(setProduct)
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <DetailSkeleton />

  if (error || !product) {
    return (
      <main className="detail-page" style={{ textAlign: 'center', paddingTop: 'var(--space-20)' }}>
        <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-5)' }}>
          😕 {error ?? 'Product not found'}
        </p>
        <Link to="/products">
          <Button variant="primary">Back to Products</Button>
        </Link>
      </main>
    )
  }

  const handleCartToggle = () => {
    if (isInCart) removeFromCart(product.id)
    else addToCart({
      id: product.id, title: product.title,
      price: product.price, thumbnail: product.thumbnail,
    })
  }

  const handleWishlistToggle = () => {
    toggleWishlist({
      id: product.id, title: product.title, price: product.price,
      thumbnail: product.thumbnail, rating: product.rating, category: product.category,
    })
  }

  const inrPrice = Math.round(product.price * 83).toLocaleString('en-IN')

  return (
    <main className="detail-page animate-fade-in">

      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/"         className="breadcrumb__link">Home</Link>
        <span className="breadcrumb__sep" aria-hidden="true">›</span>
        <Link to="/products" className="breadcrumb__link">Products</Link>
        <span className="breadcrumb__sep" aria-hidden="true">›</span>
        <span className="breadcrumb__current">{product.category}</span>
      </nav>

      <div className="detail-layout">

        {/* ── Left: Image Gallery ── */}
        <div className="image-gallery">
          <div className="image-gallery__main has-shine" style={{ position: 'relative' }}>
            <img
              src={images[activeIndex] ?? product.thumbnail}
              alt={`${product.title} — image ${activeIndex + 1}`}
              className="image-gallery__main-img"
            />
            <BorderBeam size={80} duration={8} colorFrom="#4f46e5" colorTo="#a78bfa" borderWidth={1.5} />

            {images.length > 1 && (
              <>
                <button onClick={goToPrev} aria-label="Previous image" className="image-gallery__nav image-gallery__nav--prev">‹</button>
                <button onClick={goToNext} aria-label="Next image"     className="image-gallery__nav image-gallery__nav--next">›</button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="image-gallery__thumbs scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goToIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`image-gallery__thumb ${i === activeIndex ? 'image-gallery__thumb--active' : ''}`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Product Info ── */}
        <div className="product-info">

          {/* Category badge — inline, not stretched */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Badge color="indigo">{product.category}</Badge>
          </div>

          <h1 className="product-info__title">{product.title}</h1>

          <StarRating rating={product.rating ?? 0} size="lg" />

          {/* Price row */}
          <div className="product-info__price-row">
            <span className="product-info__price">₹{inrPrice}</span>
            {product.discountPercentage > 0 && (
              <span className="badge-discount">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          {/* Description / AI Summary box */}
          <div className="description-box">
            <div className="description-box__header">
              <span className="description-box__label">
                {aiStatus === 'success' ? (isLocal ? '📝 Smart Summary' : '✨ AI Summary') : 'Description'}
              </span>

              <button
                className="description-box__ai-btn"
                onClick={() => aiStatus === 'success' ? resetAI() : generateSummary(product)}
                disabled={aiStatus === 'loading'}
                aria-label={aiStatus === 'success' ? 'Show original description' : 'Generate AI summary'}
              >
                {aiStatus === 'loading' && (
                  <><span className="animate-spin" style={{ display:'inline-block' }} aria-hidden="true">⟳</span> Generating…</>
                )}
                {aiStatus === 'success'  && '↩ Original'}
                {aiStatus === 'idle'     && '✨ AI Summary'}
              </button>
            </div>

            <p className="description-box__text">
              {aiStatus === 'success' ? summary : product.description}
            </p>

            {aiStatus === 'success' && isLocal && (
              <p style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-gray-400)',
                marginTop: 'var(--space-2)',
                fontStyle: 'italic',
              }}>
                Generated locally — add a free HF token for AI-powered summaries.
              </p>
            )}
          </div>

          {/* Stock */}
          <p className="product-info__stock">
            In stock: <strong>{product.stock} units</strong>
          </p>

          {/* Actions */}
          <div className="product-actions">
            <div className="product-actions__main">
              {isInCart ? (
                <Button
                  variant="danger"
                  size="lg"
                  onClick={handleCartToggle}
                  style={{ width: '100%' }}
                >
                  🗑 Remove from Cart
                </Button>
              ) : (
                <ShimmerButton
                  shimmerColor="rgba(255,255,255,0.7)"
                  shimmerDuration="2.8s"
                  borderRadius="12px"
                  background="linear-gradient(135deg, #4f46e5, #7c3aed)"
                  onClick={handleCartToggle}
                  style={{ width: '100%', justifyContent: 'center', padding: '13px 24px' }}
                >
                  🛒 Add to Cart
                </ShimmerButton>
              )}
            </div>

            <div className="product-actions__wish">
              <Button
                variant={isWishlisted ? 'danger' : 'outline'}
                size="lg"
                onClick={handleWishlistToggle}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className="btn-icon"
              >
                {isWishlisted ? '♥' : '♡'}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default ProductDetailPage
