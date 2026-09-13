// Button.jsx — O: Extend via variant/size without modifying internals
// L: Substitutable anywhere a clickable action is needed

const VARIANTS = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  outline:   'btn-outline',
  ghost:     'btn-ghost',
  danger:    'btn-danger',
}

const SIZES = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`btn ${VARIANTS[variant] ?? 'btn-primary'} ${SIZES[size] ?? 'btn-md'} ${className}`}
    {...props}
  >
    {children}
  </button>
)

export default Button
