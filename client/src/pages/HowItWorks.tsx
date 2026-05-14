import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { PhoneCall, FileSearch, ShieldCheck, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PageWrapper from '@components/layout/PageWrapper'
import SEOHead from '@components/layout/SEOHead'
import { Button } from '@components/ui'

interface Step {
  number: string
  title: string
  subtitle: string
  description: string
  Icon: LucideIcon
  bullets: string[]
  tag: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Free Consultation',
    subtitle: 'No cost. No commitment.',
    Icon: PhoneCall,
    tag: 'Where it begins',
    description:
      'We start with a focused, no-obligation strategy call. Our specialists take the time to understand your full credit history, current situation, and long-term goals — then map out a clear, personalized action plan designed around you.',
    bullets: [
      'Review your credit goals in detail',
      'Identify problem areas at a high level',
      'Walk you through our proven approach',
      'Zero pressure, zero cost',
    ],
  },
  {
    number: '02',
    title: 'Full Credit Review',
    subtitle: 'All 3 bureaus covered.',
    Icon: FileSearch,
    tag: 'Deep analysis',
    description:
      'Our certified analysts pull and forensically examine your reports from Equifax, Experian, and TransUnion. Every error, outdated record, inaccuracy, and negative item is catalogued — building the foundation for a precision dispute strategy.',
    bullets: [
      'Equifax, Experian & TransUnion reviewed',
      'Every negative item identified and flagged',
      'Inaccuracies and outdated records logged',
      'Custom dispute roadmap created for you',
    ],
  },
  {
    number: '03',
    title: 'Dispute & Repair',
    subtitle: 'We handle everything.',
    Icon: ShieldCheck,
    tag: 'Execution phase',
    description:
      'We craft legally precise, bureau-specific dispute letters and submit them on your behalf. Every response, follow-up, appeal, and escalation is managed by our team — you don\'t lift a finger while we fight for your score.',
    bullets: [
      'Expert dispute letters drafted per bureau',
      'Submitted and tracked on your behalf',
      'All follow-ups and appeals handled',
      'Creditor negotiations managed by us',
    ],
  },
  {
    number: '04',
    title: 'Monitor Progress',
    subtitle: 'Full transparency.',
    Icon: TrendingUp,
    tag: 'Ongoing results',
    description:
      'We track every bureau update in real time and send you detailed monthly progress reports. You\'ll always know exactly what changed, what improved, and what\'s still in progress — complete visibility at every stage.',
    bullets: [
      'Real-time bureau update alerts',
      'Monthly score progress reports',
      'Transparent milestone tracking',
      'Continued support until your goals are met',
    ],
  },
]

function StepRow({ step, index }: { step: Step; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const isEven = index % 2 === 0
  const Icon = step.Icon

  return (
    <div ref={ref} className="relative">
      {/* Vertical timeline line */}
      {index < steps.length - 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-20 bg-gradient-to-b from-[#B8924A]/50 to-transparent hidden lg:block" />
      )}

      <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex-1 max-w-lg"
        >
          {/* Tag */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/25 font-heading font-semibold text-[0.68rem] tracking-[0.18em] uppercase text-[#D4AF72] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF72]" />
            {step.tag}
          </span>

          {/* Step number + title */}
          <div className="flex items-baseline gap-4 mb-3">
            <span className="font-heading font-black text-[3.5rem] leading-none bg-gradient-to-br from-[#D4AF72] to-[#8B6A2E] bg-clip-text text-transparent select-none">
              {step.number}
            </span>
            <h2 className="font-heading font-bold text-white text-2xl lg:text-3xl leading-tight">
              {step.title}
            </h2>
          </div>

          {/* Subtitle */}
          <p className="font-heading font-semibold text-[#B8924A] text-[0.85rem] tracking-wide uppercase mb-4">
            {step.subtitle}
          </p>

          {/* Description */}
          <p className="font-body text-[#9A9A9A] text-[0.95rem] leading-relaxed mb-7">
            {step.description}
          </p>

          {/* Bullets */}
          <ul className="space-y-3">
            {step.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#B8924A] flex-shrink-0 mt-0.5" strokeWidth={2} />
                <span className="font-body text-[#C8C8C8] text-[0.88rem] leading-snug">{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Card side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="flex-1 w-full max-w-lg"
        >
          <div className="relative rounded-2xl border border-white/8 bg-[#111111] p-10 overflow-hidden group hover:border-[#B8924A]/35 transition-all duration-500 hover:shadow-[0_0_60px_rgba(184,146,74,0.1)]">

            {/* Large watermark number */}
            <span className="absolute -bottom-4 -right-2 font-heading font-black text-[9rem] leading-none text-white/[0.025] select-none pointer-events-none">
              {step.number}
            </span>

            {/* Icon */}
            <div className="mb-8 inline-flex">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B8924A] to-[#6B4F22] flex items-center justify-center shadow-[0_0_30px_rgba(184,146,74,0.3)] group-hover:shadow-[0_0_45px_rgba(184,146,74,0.45)] transition-shadow duration-500">
                <Icon className="w-9 h-9 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Card title */}
            <h3 className="font-heading font-bold text-white text-xl mb-3">{step.title}</h3>

            {/* Gold divider */}
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#D4AF72] to-[#B8924A] rounded-full mb-5" />

            {/* Short description */}
            <p className="font-body text-[#9A9A9A] text-[0.88rem] leading-relaxed">
              {step.description.split('.')[0]}.
            </p>

            {/* Bottom edge glow on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8924A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default function HowItWorks() {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <PageWrapper dark>
      <SEOHead
        title="How Credit Repair Works — Our Proven 4-Step Process"
        description="Learn exactly how Proximity Credit Repair works. From your free consultation to full credit review, expert dispute filing, and ongoing progress monitoring — four steps to a better score."
        canonicalPath="/how-it-works"
        keywords="how credit repair works, credit repair process, credit repair steps, credit dispute process, how to fix credit score"
      />

      {/* ── Hero Banner ───────────────────────────────────── */}
      <section className="relative bg-[#0A0A0A] pt-32 pb-24 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#B8924A]/8 rounded-full blur-[120px]" />
        </div>

        {/* Breadcrumb */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="font-heading text-[0.7rem] tracking-[0.2em] uppercase text-[#8F8F8F] mb-6">
            Home&nbsp;&nbsp;/&nbsp;&nbsp;How It Works
          </p>

          <div ref={heroRef}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/25 font-heading font-semibold text-[0.68rem] tracking-[0.18em] uppercase text-[#D4AF72] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF72]" />
              Our Proven System
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
            >
              Four Steps to a
              <span className="block bg-gradient-to-r from-[#D4AF72] via-[#B8924A] to-[#8B6A2E] bg-clip-text text-transparent">
                Better Credit Score
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-[#9A9A9A] text-base max-w-xl mx-auto leading-relaxed mb-10"
            >
              Our structured, transparent process removes every obstacle between you and the credit score you deserve — with zero guesswork and full expert support at every stage.
            </motion.p>

            {/* Step pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {steps.map((s) => (
                <div key={s.number} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] border border-white/8">
                  <span className="font-heading font-black text-[#B8924A] text-xs">{s.number}</span>
                  <span className="font-heading font-semibold text-white text-xs">{s.title}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </section>

      {/* ── Steps ─────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-28">
          {steps.map((step, index) => (
            <StepRow key={step.number} step={step} index={index} />
          ))}
        </div>
      </section>

      {/* ── What to expect strip ──────────────────────────── */}
      <section className="bg-[#0D0D0D] border-y border-white/5 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '30–90', label: 'Days avg. to first results', suffix: ' days' },
              { value: '3', label: 'Credit bureaus covered', suffix: ' bureaus' },
              { value: '100%', label: 'Disputes managed by us', suffix: '' },
              { value: '24/7', label: 'Score monitoring active', suffix: '' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="font-heading font-black text-3xl lg:text-4xl bg-gradient-to-br from-[#D4AF72] to-[#8B6A2E] bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="font-body text-[#9A9A9A] text-[0.8rem] leading-snug max-w-[120px]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#B8924A]/7 rounded-full blur-[100px]" />
        </div>

        <div ref={ctaRef} className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/25 font-heading font-semibold text-[0.68rem] tracking-[0.18em] uppercase text-[#D4AF72] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF72]" />
              Ready to start?
            </span>

            <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight mb-5">
              Not sure where to begin?
              <span className="block text-[#D4AF72]">Talk to an expert — free.</span>
            </h2>

            <p className="font-body text-[#9A9A9A] text-[0.95rem] leading-relaxed mb-10 max-w-lg mx-auto">
              Your first consultation is completely free. No pressure, no commitment — just a straight answer on what it will take to fix your credit.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg">
                  Get Your Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="lg">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  )
}
