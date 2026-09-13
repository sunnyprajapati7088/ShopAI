// ProductsPage.jsx — S: Composes products listing page; delegates data to hooks
import { useDispatch } from 'react-redux'
import { setCurrentPage, clearFilters } from '../store/slices/productsSlice'
import { useProducts } from '../hooks/useProducts'
import CategoryFilter from '../components/filters/CategoryFilter'
import ProductGrid from '../components/products/ProductGrid'
import Pagination from '../components/pagination/Pagination'

const ProductsPage = () => {
  const dispatch  = useDispatch()
  const {
    products, status, total, currentPage,
    totalPages, searchQuery, activeCategory,
  } = useProducts()

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => dispatch(clearFilters())

  return (
    <main className="products-page">
      {/* Page header */}
      <div className="products-page__header">
        <h1 className="products-page__title">Products</h1>
        <p className="products-page__count">
          {status === 'succeeded'
            ? `${total} product${total !== 1 ? 's' : ''} found${
                searchQuery ? ` for "${searchQuery}"` : ''
              }${activeCategory ? ` in "${activeCategory}"` : ''}`
            : 'Loading…'}
        </p>
      </div>

      <div className="products-layout">
        {/* ── Sidebar ── */}
        <aside className="sidebar">
          <div className="sidebar-panel">
            <CategoryFilter />
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="main-content">
          {/* Active filters bar */}
          {(searchQuery || activeCategory) && (
            <div className="active-filters animate-fade-in">
              <span className="active-filters__label">Active filters:</span>

              {searchQuery && (
                <span className="filter-pill">
                  🔍 {searchQuery}
                  <button
                    className="filter-pill__remove"
                    onClick={handleReset}
                    aria-label="Remove search filter"
                  >
                    ✕
                  </button>
                </span>
              )}

              {activeCategory && (
                <span className="filter-pill" style={{
                  background: 'linear-gradient(135deg, #f3e8ff, #ede9fe)',
                  color: 'var(--color-accent-600)',
                  borderColor: 'var(--color-accent-400)',
                }}>
                  📂 {activeCategory}
                  <button
                    className="filter-pill__remove"
                    onClick={handleReset}
                    aria-label="Remove category filter"
                    style={{ background: 'var(--color-accent-200)', color: 'var(--color-accent-700)' }}
                  >
                    ✕
                  </button>
                </span>
              )}

              <button className="active-filters__clear" onClick={handleReset}>
                Clear all
              </button>
            </div>
          )}

          {/* Products grid */}
          <ProductGrid products={products} status={status} onReset={handleReset} />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  )
}

export default ProductsPage
