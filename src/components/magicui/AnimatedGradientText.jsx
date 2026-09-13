// AnimatedGradientText — Magic UI (ported to plain JS/CSS)
// Source: https://magicui.design/r/animated-gradient-text.json

const AnimatedGradientText = ({
  children,
  colorFrom = '#4f46e5',
  colorTo = '#7c3aed',
  speed = 1,
  className = '',
}) => (
  <span
    className={`magic-gradient-text ${className}`}
    style={{
      '--bg-size': `${speed * 300}%`,
      '--color-from': colorFrom,
      '--color-to': colorTo,
    }}
  >
    {children}
  </span>
)

export default AnimatedGradientText
