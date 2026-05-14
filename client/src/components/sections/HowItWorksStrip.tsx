import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Section from '@components/layout/Section'
import { Button } from '@components/ui'
import { PhoneCall, FileSearch, ShieldCheck, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    description:
      'We start with a no-cost strategy call to understand your credit goals, review your situation, and map out a custom plan.',
    icon: PhoneCall,
    highlight: 'No cost. No commitment.',
  },
  {
    number: '02',
    title: 'Full Credit Review',
    description:
      'We pull and deeply analyze all three bureau reports — Equifax, Experian, and TransUnion — to identify every dispute opportunity.',
    icon: FileSearch,
    highlight: 'All 3 bureaus covered.',
  },
  {
    number: '03',
    title: 'Dispute & Repair',
    description:
      'Our experts craft and submit precision dispute letters, managing every back-and-forth with creditors entirely on your behalf.',
    icon: ShieldCheck,
    highlight: 'We handle everything.',
  },
  {
    number: '04',
    title: 'Monitor Progress',
    description:
      'We track every update in real time and keep you informed at every milestone until your score reflects your true potential.',
    icon: TrendingUp,
    highlight: 'Full transparency.',
  },
]

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="relative flex-1 group"
    >
      <div className="relative rounded-2xl border border-white/8 bg-[#111111] p-7 h-full flex flex-col gap-5 overflow-hidden transition-all duration-500 hover:border-gold-primary/40 hover:shadow-[0_0_40px_rgba(184,146,74,0.12)]">

        {/* Background step number watermark */}
        <span className="absolute -top-3 -right-1 font-heading font-black text-[7rem] leading-none text-white/[0.03] select-none pointer-events-none">
          {step.number}
        </span>

        {/* Icon + number row */}
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#B8924A] to-[#9E7A3D] flex items-center justify-center shadow-[0_0_20px_rgba(184,146,74,0.25)] group-hover:shadow-[0_0_30px_rgba(184,146,74,0.4)] transition-shadow duration-500">
              <Icon className="w-6 h-6 text-near-black" strokeWidth={1.75} />
            </div>
          </div>
          <span className="font-heading font-black text-[2rem] leading-none bg-gradient-to-br from-[#D4AF72] to-[#9E7A3D] bg-clip-text text-transparent">
            {step.number}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-heading font-bold text-[1.15rem] text-white leading-snug">
          {step.title}
        </h4>

        {/* Description */}
        <p className="font-body text-[0.9rem] text-[#9A9A9A] leading-relaxed flex-1">
          {step.description}
        </p>

        {/* Highlight pill */}
        <div className="inline-flex items-center self-start gap-2 px-3 py-1.5 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF72] flex-shrink-0" />
          <span className="font-heading font-semibold text-[0.72rem] tracking-wider text-[#D4AF72] uppercase">
            {step.highlight}
          </span>
        </div>

        {/* Bottom gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8924A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}

function ConnectorLine({ index }: { index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div ref={ref} className="hidden lg:flex flex-col items-center justify-start pt-7 flex-shrink-0 w-10">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.35, ease: 'easeOut' }}
        style={{ originX: 0 }}
        className="w-full h-[2px] bg-gradient-to-r from-[#B8924A]/60 via-[#D4AF72]/80 to-[#B8924A]/60 rounded-full"
      />
    </div>
  )
}

export default function HowItWorksStrip() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">

      {/* Subtle radial glow behind section */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#B8924A]/5 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block font-heading font-semibold text-[0.7rem] tracking-[0.2em] uppercase text-[#B8924A] mb-4"
          >
            The Process
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight"
          >
            Four Simple Steps to a
            <span className="block bg-gradient-to-r from-[#D4AF72] via-[#B8924A] to-[#9E7A3D] bg-clip-text text-transparent">
              Better Score
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-body text-[#9A9A9A] text-[0.95rem] max-w-xl mx-auto leading-relaxed"
          >
            Our proven, structured approach removes the guesswork and puts your credit restoration on autopilot.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 lg:gap-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-row md:flex-row flex-1 items-stretch">
              <StepCard step={step} index={index} />
              {index < steps.length - 1 && <ConnectorLine index={index} />}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-center mt-14"
        >
          <Link to="/how-it-works">
            <Button variant="secondary">View Full Process</Button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
