import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@lib/utils'
import { fadeUp } from '@lib/animations'
import type { CardProps } from '@/types/component-props'

const variantClasses = {
  dark: 'bg-card-black border-t-2 border-gold-primary backdrop-blur-sm text-white rounded-card shadow-gold-sm',
  light: 'bg-white border border-gray-100 text-body-text rounded-card shadow-sm',
}

export default function Card({ variant = 'dark', hover = false, children, className }: CardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const hoverProps = hover
    ? {
        whileHover: {
          y: -6,
          boxShadow: '0 4px 24px color-mix(in srgb, var(--color-gold-primary) 35%, transparent)',
        },
        transition: { duration: 0.3, ease: 'easeOut' },
      }
    : {}

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={cn('p-6', variantClasses[variant], className)}
      {...hoverProps}
    >
      {children}
    </motion.div>
  )
}
