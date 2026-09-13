// ProductGrid.jsx — S: Renders the grid of product cards only
// O: onReset prop lets the parent define reset behavior
import ProductCard from './ProductCard'
import { ProductGridSkeleton } from '../ui/Skeleton'
import EmptyState from '../ui/EmptyState'

const ProductGrid = ({ products, status, onReset }) => {
  if (status === 'loading') {
    return <ProductGridSkeleton count={12} />
  }

  if (status === 'failed') {
    return (
      <EmptyState
        title="Failed to load products"
        message="Something went wrong while fetching products. Please try again."
        onReset={onReset}
        resetLabel="Try again"
      />
    )
  }

  if (status === 'succeeded' && products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        message="Try a different search term or browse another category."
        onReset={onReset}
      />
    )
  }

  return (
    <div className="product-grid stagger" role="list" aria-label="Products">
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid
