// HomePage.jsx — Magic UI: ShimmerButton on CTA, AnimatedGradientText on section title
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchFeaturedProducts,
  selectFeatured,
  selectFeaturedStatus,
} from '../store/slices/productsSlice'
import Carousel from '../components/carousel/Carousel'
import HeroSlide from '../components/carousel/HeroSlide'
import ProductCard from '../components/products/ProductCard'
import { SkeletonBlock } from '../components/ui/Skeleton'
import Button from '../components/ui/Button'
import ShimmerButton from '../components/magicui/ShimmerButton'
import AnimatedGradientText from '../components/magicui/AnimatedGradientText'

const FeaturedSkeletons = () => (
  <div className="featured-grid">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="skeleton-card">
        <div className="skeleton-card__image" />
        <div className="skeleton-card__body">
          <div className="skeleton skeleton-text" style={{ width: '40%', height: '10px' }} />
          <div className="skeleton skeleton-text" style={{ width: '85%', height: '14px' }} />
          <div className="skeleton skeleton-text" style={{ width: '30%', height: '16px' }} />
        </div>
      </div>
    ))}
  </div>
)

const HomePage = () => {
  const dispatch       = useDispatch()
  const featured       = useSelector(selectFeatured)
  const featuredStatus = useSelector(selectFeaturedStatus)

  useEffect(() => {
    if (featuredStatus === 'idle') dispatch(fetchFeaturedProducts())
  }, [dispatch, featuredStatus])

  return (
    <main className="home-page">
      {/* ── Hero Carousel ── */}
      <section className="hero-section" aria-label="Featured products carousel">
        {featuredStatus === 'loading' ? (
          <div className="hero-carousel">
            <SkeletonBlock className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-2xl)' }} />
          </div>
        ) : (
          <div className="hero-carousel">
            <Carousel
              slides={featured}
              renderSlide={(product) => <HeroSlide product={product} />}
            />
          </div>
        )}
      </section>

      {/* ── Featured Products ── */}
      <section className="featured-section" aria-label="Featured products">
        <div className="section-header">
          {/* Magic UI — Animated gradient on section title */}
          <h2 className="section-title">
            ✨{' '}
            <AnimatedGradientText colorFrom="#4f46e5" colorTo="#7c3aed" speed={0.7}>
              Featured Products
            </AnimatedGradientText>
          </h2>
          <Link to="/products">
            <Button variant="outline" size="sm">View All →</Button>
          </Link>
        </div>

        {featuredStatus === 'loading' ? (
          <FeaturedSkeletons />
        ) : (
          <div className="featured-grid stagger">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA Banner — Magic UI ShimmerButton ── */}
      <div className="cta-banner">
        <div className="cta-banner__inner">
          <h2 className="cta-banner__title">Explore All Products</h2>
          <p className="cta-banner__sub">Search, filter by category, and discover what you love</p>
          <Link to="/products">
            {/* Magic UI — ShimmerButton replaces plain CTA */}
            <ShimmerButton
              shimmerColor="rgba(255,255,255,0.7)"
              shimmerDuration="2.5s"
              borderRadius="14px"
              background="rgba(255,255,255,0.15)"
              style={{ backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Browse Products →
            </ShimmerButton>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage
