import { motion } from 'framer-motion'
import { staggerContainer, fadeIn } from '@lib/animations'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-near-black z-[200] flex flex-col items-center justify-center gap-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="font-heading font-black text-4xl gold-gradient-text">Proximity</p>
        <p className="font-body text-white text-sm tracking-widest uppercase mt-1">Credit Repair</p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            variants={fadeIn}
            className="w-2 h-2 rounded-full bg-gold-primary"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
