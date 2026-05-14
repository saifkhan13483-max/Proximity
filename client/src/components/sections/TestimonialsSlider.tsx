import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Section from '@components/layout/Section'
import SectionLabel from '@components/ui/SectionLabel'
import { Badge } from '@components/ui'
import { useIsMobile } from '@hooks/useMediaQuery'
import { testimonials } from '@data/testimonials'

export default function TestimonialsSlider() {
  const isMobile = useIsMobile()
  const visibleCount = isMobile ? 1 : 3
  const maxIndex = testimonials.length - visibleCount
  const [currentIndex, setCurrentIndex] = useState(0)
  const isPaused = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [maxIndex])

  const goNext = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  const goPrev = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))

  const visible = Array.from({ length: visibleCount }, (_, i) => {
    return testimonials[(currentIndex + i) % testimonials.length]
  })

  const dotCount = maxIndex + 1

  return (
    <Section dark>
      <SectionLabel>CLIENT SUCCESS STORIES</SectionLabel>
      <h2 className="font-heading font-bold text-h2 text-white mt-2 mb-12">
        Real People. Real Results.
      </h2>

      <div
        className="relative"
        onMouseEnter={() => { isPaused.current = true }}
        onMouseLeave={() => { isPaused.current = false }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {visible.map((t) => (
              <div
                key={t.id}
                className="bg-card-black border-t-2 border-gold-primary rounded-card p-6 relative overflow-hidden flex flex-col"
              >
                <span className="absolute top-4 left-4 text-8xl font-heading text-gold-primary/10 leading-none pointer-events-none select-none">
                  &ldquo;
                </span>

                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Badge variant="neutral">{t.beforeScore}</Badge>
                  <span className="text-muted-text-dark text-sm">→</span>
                  <Badge variant="success">{t.afterScore}</Badge>
                </div>

                <div className="flex gap-0.5 mb-4 relative z-10">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className="text-gold-primary" />
                  ))}
                </div>

                <p className="font-body text-body-base text-white/90 relative z-10 flex-1">
                  {t.text}
                </p>

                <p className="text-gold-primary font-semibold text-caption mt-4 relative z-10">
                  {t.clientName} — {t.city}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-gold-primary/40 text-gold-primary flex items-center justify-center hover:bg-gold-primary hover:text-near-black transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-gold-primary' : 'bg-gold-primary/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-gold-primary/40 text-gold-primary flex items-center justify-center hover:bg-gold-primary hover:text-near-black transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  )
}
