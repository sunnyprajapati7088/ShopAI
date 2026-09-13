// NotFoundPage.jsx
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const NotFoundPage = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-20) var(--gutter)',
    textAlign: 'center',
    minHeight: '60vh',
  }}>
    <p style={{ fontSize: '5rem', lineHeight: 1, marginBottom: 'var(--space-4)' }}>🔍</p>
    <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-extrabold)', marginBottom: 'var(--space-3)', color: 'var(--color-gray-900)' }}>
      404
    </h1>
    <p style={{ color: 'var(--color-gray-500)', marginBottom: 'var(--space-6)' }}>
      Page not found
    </p>
    <Link to="/">
      <Button variant="primary">Go Home</Button>
    </Link>
  </div>
)

export default NotFoundPage
