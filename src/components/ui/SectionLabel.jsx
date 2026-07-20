import { motion } from 'framer-motion'

const COLOR_MAP = {
  pink: 'text-pink',
  purple: 'text-purple',
}

export default function SectionLabel({ children, light = false, color, className = '' }) {
  // `light` is kept for backward compatibility; `color` (if passed) wins.
  const resolvedColor = color ?? (light ? 'purple' : 'pink')
  const textClass = COLOR_MAP[resolvedColor] ?? COLOR_MAP.pink

  return (
    <p
      className={`
        inline-flex items-center gap-2
        text-xs font-bold tracking-[3px] uppercase mb-3
        ${textClass} ${className}
      `}
    >
      <motion.span
        className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current shrink-0"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      {children}
    </p>
  )
}