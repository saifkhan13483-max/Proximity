import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return scrollY
}

export default function BackToTopButton() {
  const scrollY = useScrollPosition()
  const visible = scrollY > 400

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-md"
        >
          <ChevronUp size={20} className="text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
