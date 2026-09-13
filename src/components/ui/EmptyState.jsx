// EmptyState.jsx — S: Displays empty/error states only
import Button from './Button'

const EmptyState = ({ title = 'Nothing found', message = '', onReset, resetLabel = 'Clear filters', children }) => (
  <div className="empty-state">
    <div className="empty-state__icon" aria-hidden="true">🔍</div>
    <h3 className="empty-state__title">{title}</h3>
    {message && <p className="empty-state__message">{message}</p>}
    {onReset && (
      <Button variant="outline" onClick={onReset}>
        {resetLabel}
      </Button>
    )}
    {children}
  </div>
)

export default EmptyState
