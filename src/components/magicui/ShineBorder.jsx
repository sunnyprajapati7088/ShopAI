// ShineBorder — Magic UI (ported to plain JS/CSS, no deps)
// Source: https://magicui.design/r/shine-border.json
// Wrap any card/element with this for an animated border shine

const ShineBorder = ({
  borderWidth = 1,
  duration = 14,
  shineColor = ['#4f46e5', '#7c3aed', '#a78bfa'],
  className = '',
  style = {},
}) => {
  const colors = Array.isArray(shineColor) ? shineColor.join(',') : shineColor

  return (
    <div
      aria-hidden="true"
      className={`shine-border ${className}`}
      style={{
        '--border-width': `${borderWidth}px`,
        '--duration': `${duration}s`,
        backgroundImage: `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`,
        backgroundSize: '300% 300%',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        padding: 'var(--border-width)',
        ...style,
      }}
    />
  )
}

export default ShineBorder
