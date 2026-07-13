import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll() // in case the page loads already scrolled down
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#schedule"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.9 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.9 }}
          whileHover={reducedMotion ? {} : { scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          // Hidden from tab order and screen readers while off-screen, so
          // keyboard focus can't land on an invisible link below the fold.

          
          tabIndex={visible ? 0 : -1}
          aria-hidden={!visible}
          className="
            fixed bottom-6 right-6 z-50
            flex items-center gap-2
            text-white text-sm font-bold
            px-5 py-3.5 rounded-full
            [background:linear-gradient(135deg,#FF2D78,#FF6B35)]
            shadow-[0_8px_30px_rgba(255,45,120,0.5)]
            no-underline
          "
          aria-label="Book a free trial class"
        >
          <span
            className={`w-2 h-2 bg-white rounded-full ${reducedMotion ? '' : 'animate-blink'}`}
            aria-hidden="true"
          />
          Book Free Trial
        </motion.a>
      )}
    </AnimatePresence>
  )
}