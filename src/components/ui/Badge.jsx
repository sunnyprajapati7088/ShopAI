// Badge.jsx — L: Reusable, substitutable label component

const COLORS = {
  indigo: 'badge-indigo',
  green:  'badge-green',
  yellow: 'badge-yellow',
  red:    'badge-red',
  gray:   'badge-gray',
  ghost:  'badge-ghost',
  ai:     'badge-ai',
}

const Badge = ({ children, color = 'indigo', className = '' }) => (
  <span className={`badge ${COLORS[color] ?? 'badge-gray'} ${className}`}>
    {children}
  </span>
)

export default Badge
