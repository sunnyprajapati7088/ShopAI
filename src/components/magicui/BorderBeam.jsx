// BorderBeam — Magic UI (ported using motion/react)
// Source: https://magicui.design/r/border-beam.json
import { motion } from 'motion/react'

const BorderBeam = ({
  size = 50,
  duration = 6,
  delay = 0,
  colorFrom = '#4f46e5',
  colorTo = '#a78bfa',
  borderWidth = 1.5,
  reverse = false,
  initialOffset = 0,
  className = '',
}) => (
  <div
    aria-hidden="true"
    className={`border-beam-wrap ${className}`}
    style={{ '--border-beam-width': `${borderWidth}px` }}
  >
    <motion.div
      className="border-beam-light"
      style={{
        width: size,
        height: size,
        offsetPath: `rect(0 auto auto 0 round ${size}px)`,
        '--color-from': colorFrom,
        '--color-to': colorTo,
      }}
      initial={{ offsetDistance: `${initialOffset}%` }}
      animate={{
        offsetDistance: reverse
          ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
          : [`${initialOffset}%`, `${100 + initialOffset}%`],
      }}
      transition={{
        repeat: Infinity,
        ease: 'linear',
        duration,
        delay: -delay,
      }}
    />
  </div>
)

export default BorderBeam
