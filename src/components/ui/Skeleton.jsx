// Skeleton.jsx — S: Only renders shimmer loading placeholders

export const SkeletonBlock = ({ className = '' }) => (
  <div className={`skeleton ${className}`} aria-hidden="true" />
)

export const ProductCardSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-card__image" aria-hidden="true" />
    <div className="skeleton-card__body">
      <div className="skeleton skeleton-text" style={{ width: '40%', height: '10px' }} />
      <div className="skeleton skeleton-text" style={{ width: '80%', height: '14px' }} />
      <div className="skeleton skeleton-text" style={{ width: '55%', height: '12px' }} />
      <div className="skeleton skeleton-text" style={{ width: '30%', height: '16px' }} />
      <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
        <div className="skeleton" style={{ flex: 1, height: '36px', borderRadius: '10px' }} />
        <div className="skeleton" style={{ width: '36px', height: '36px', borderRadius: '10px' }} />
      </div>
    </div>
  </div>
)

export const ProductGridSkeleton = ({ count = 12 }) => (
  <div className="product-grid">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)
