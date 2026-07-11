import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#schedule"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
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
            className="w-2 h-2 bg-white rounded-full animate-blink"
            aria-hidden="true"
          />
          Book Free Trial
        </motion.a>
      )}
    </AnimatePresence>
  )
}