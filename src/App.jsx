// App.jsx — D: Depends on abstractions (store, router), not concrete implementations
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import NotFoundPage from './pages/NotFoundPage'
import PageLoader from './components/ui/PageLoader'

const App = () => {
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <Provider store={store}>
      {/* Page loader — shown on first mount, fades out when done */}
      {!loaderDone && <PageLoader onDone={() => setLoaderDone(true)} />}

      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="app-shell__main">
            <Routes>
              <Route path="/"            element={<HomePage />} />
              <Route path="/products"    element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart"        element={<CartPage />} />
              <Route path="/wishlist"    element={<WishlistPage />} />
              <Route path="*"            element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
