import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, Users, TrendingUp, DollarSign } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@components/ui'
import SectionLabel from '@components/ui/SectionLabel'
import { useCountUp } from '@hooks/useCountUp'
import { fadeUp, staggerContainer } from '@lib/animations'
import { stats } from '@data/stats'
import type { Stat } from '@/types/index'

const PARTICLE_POSITIONS = [
  { top: 15, left: 10 }, { top: 25, left: 85 }, { top: 40, left: 20 },
  { top: 60, left: 75 }, { top: 75, left: 30 }, { top: 85, left: 60 },
  { top: 10, left: 50 }, { top: 50, left: 90 }, { top: 30, left: 40 },
  { top: 70, left: 15 }, { top: 20, left: 65 }, { top: 45, left: 55 },
  { top: 80, left: 45 }, { top: 35, left: 80 },
]

const PARTICLE_DURATIONS = [3, 4, 5, 3.5, 4.5, 6, 3, 5, 4, 3.5, 5.5, 4, 6, 3.5]
const PARTICLE_DELAYS = [0, 0.5, 1, 1.5, 0.2, 0.8, 1.2, 0.3, 0.7, 1.8, 0.4, 0.9, 0.6, 1.1]

const statIconMap: Record<string, LucideIcon> = { Users, TrendingUp, DollarSign }

const HEADLINE_WORDS = ['Rebuild', 'Your', 'Credit.', 'Reclaim', 'Your', 'Life.']

function StatItem({ stat }: { stat: Stat }) {
  const { formattedValue, ref } = useCountUp({
    end: stat.value,
    prefix: stat.prefix ?? '',
    suffix: stat.suffix,
    separator: ',',
    duration: 2.5,
  })
  const Icon = statIconMap[stat.icon]
  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      {Icon && <Icon className="text-gold-primary mb-1" size={32} />}
      <div className="font-heading font-extrabold text-4xl md:text-5xl text-gold-primary">
        {formattedValue}
      </div>
      <p className="text-white/60 text-sm font-body">{stat.label}</p>
    </div>
  )
}

export default function HeroSection() {
  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.getElementById('services')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen bg-hero-gradient relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-0 bg-gold-glow pointer-events-none" />

      {PARTICLE_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full bg-gold-primary/30${i >= 8 ? ' hidden sm:block' : ''}`}
          style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            repeat: Infinity,
            duration: PARTICLE_DURATIONS[i],
            delay: PARTICLE_DELAYS[i],
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full pt-32 pb-16">
        <SectionLabel>Proximity Credit Repair</SectionLabel>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-heading font-black text-4xl md:text-6xl lg:text-h1 text-white leading-tight mt-4"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span key={i} variants={fadeUp}>
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-body text-subheading text-muted-text mt-6 max-w-2xl"
        >
          Proven strategies. Transparent process. Real results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <Button size="lg" href="/contact">
            Get Your Free Consultation
          </Button>
          <Button variant="secondary" size="lg" href="/how-it-works">
            See How It Works
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 rounded-card border border-gold-primary/20 bg-card-black/60 backdrop-blur-sm p-6"
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <a
          href="#services"
          aria-label="Scroll down to services"
          onClick={handleScrollDown}
          className="block"
        >
          <ChevronDown className="text-gold-primary/60" size={32} />
        </a>
      </motion.div>
    </section>
  )
}
