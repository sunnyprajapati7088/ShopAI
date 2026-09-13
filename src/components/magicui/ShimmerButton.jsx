// ShimmerButton — Magic UI (ported to plain JS/CSS)
// Source: https://magicui.design/r/shimmer-button.json

const ShimmerButton = ({
  children,
  shimmerColor = '#ffffff',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '10px',
  background = 'linear-gradient(135deg, #4f46e5, #7c3aed)',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`shimmer-btn ${className}`}
    style={{
      '--spread': '90deg',
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background,
    }}
    {...props}
  >
    {/* Shimmer spark */}
    <div className="shimmer-btn__spark" aria-hidden="true">
      <div className="shimmer-btn__spark-inner">
        <div className="shimmer-btn__spark-rotate" />
      </div>
    </div>

    {/* Content */}
    <span className="shimmer-btn__content">{children}</span>

    {/* Highlight overlay */}
    <div className="shimmer-btn__highlight" aria-hidden="true" />

    {/* Backdrop */}
    <div className="shimmer-btn__backdrop" aria-hidden="true" />
  </button>
)

export default ShimmerButton
