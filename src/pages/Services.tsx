import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  BarChart2,
  FileText,
  TrendingUp,
  Shield,
  CheckCircle,
  Handshake,
  BookOpen,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PageWrapper from '@components/layout/PageWrapper'
import SEOHead from '@components/layout/SEOHead'
import Section from '@components/layout/Section'
import { Button } from '@components/ui'
import { fadeUp, staggerContainer } from '@lib/animations'
import { services } from '@data/services'

const iconMap: Record<string, LucideIcon> = {
  BarChart2,
  FileText,
  TrendingUp,
  Shield,
  Handshake,
  BookOpen,
  ShieldCheck,
}

const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': services.map((s) => ({
    '@type': 'Service',
    name: s.title,
    description: s.description,
    provider: { '@type': 'Organization', name: 'Proximity Credit Repair' },
  })),
}

function QuickNavCard({ service }: { service: typeof services[0] }) {
  const Icon = iconMap[service.icon]
  return (
    <a
      href={`#${service.id}`}
      className="group bg-card-black border border-white/10 hover:border-gold-primary rounded-card p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1"
    >
      {Icon && <Icon className="text-gold-primary" size={28} />}
      <span className="font-heading font-semibold text-white text-sm leading-snug group-hover:text-gold-primary transition-colors">
        {service.title}
      </span>
    </a>
  )
}

function ServiceBlock({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const isDark = index % 2 === 0
  const Icon = iconMap[service.icon]

  const InfoCol = (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 mb-5">
        <div className="bg-gold-primary/10 border border-gold-primary/30 rounded-xl p-3 flex-shrink-0">
          {Icon && <Icon className="text-gold-primary" size={36} />}
        </div>
        <span className="font-heading font-bold text-gold-primary text-sm tracking-widest uppercase">
          Service {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h2 className={`font-heading font-bold text-h3 mb-4 ${isDark ? 'text-white' : 'text-body-text'}`}>
        {service.title}
      </h2>
      <p className={`font-body text-body-base leading-relaxed ${isDark ? 'text-muted-text' : 'text-body-text/80'}`}>
        {service.description}
      </p>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 text-gold-primary font-semibold text-sm mt-6 hover:text-gold-light transition-colors group w-fit"
      >
        Get Started
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )

  const BenefitsCol = (
    <div className={`rounded-card p-8 border ${isDark ? 'bg-card-black border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
      <h3 className={`font-heading font-semibold text-subheading mb-6 ${isDark ? 'text-white' : 'text-body-text'}`}>
        Key Benefits
      </h3>
      <ul className="flex flex-col gap-4">
        {service.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3">
            <CheckCircle className="text-gold-primary flex-shrink-0 mt-0.5" size={20} />
            <span className={`font-body text-body-base ${isDark ? 'text-muted-text' : 'text-body-text/80'}`}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <Section dark={isDark} alt={!isDark} id={service.id}>
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
      >
        {isDark ? <>{InfoCol}{BenefitsCol}</> : <>{BenefitsCol}{InfoCol}</>}
      </motion.div>
    </Section>
  )
}

export default function Services() {
  const { ref: overviewRef, inView: overviewInView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <PageWrapper dark>
      <SEOHead
        title="Credit Repair Services — Analysis, Disputes, Monitoring, Debt Validation & More"
        description="Explore Proximity Credit Repair's full suite of services: Credit Analysis, Dispute Filing, Score Monitoring, Debt Validation, Creditor Negotiation, Educational Resources, and Identity Theft Protection."
        canonicalPath="/services"
        schemaMarkup={servicesSchema}
        keywords="credit analysis, dispute filing, score monitoring, debt validation, creditor negotiation, identity theft protection, credit repair services, remove negative items, credit bureau disputes"
      />

      {/* Hero */}
      <div className="bg-hero-gradient py-28 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #C9A84C 0%, transparent 60%)' }}
        />
        <div className="container mx-auto text-center relative z-10 max-w-3xl">
          <p className="text-gold-primary font-heading font-semibold text-sm tracking-widest uppercase mb-4">
            Full Service Suite
          </p>
          <h1 className="text-h1 font-heading font-black text-white leading-tight mb-5">
            Everything You Need to<br />
            <span className="gold-gradient-text">Restore Your Credit</span>
          </h1>
          <p className="text-muted-text font-body text-body-base max-w-xl mx-auto">
            Seven comprehensive services designed to repair, protect, and strengthen your credit — handled by certified specialists at every step.
          </p>
          <p className="text-muted-text/50 text-caption mt-5">Home / Services</p>
        </div>
      </div>

      {/* Quick-nav overview */}
      <div className="bg-near-black py-14 px-4 border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-muted-text font-body text-sm mb-8 uppercase tracking-widest">
            Jump to a Service
          </p>
          <motion.div
            ref={overviewRef}
            variants={staggerContainer}
            initial="hidden"
            animate={overviewInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={fadeUp}>
                <QuickNavCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Service detail blocks */}
      {services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}

      {/* CTA footer */}
      <Section dark>
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-gold-primary font-heading font-semibold text-sm tracking-widest uppercase mb-4">
            Ready to Start?
          </p>
          <h2 className="text-h2 font-heading font-semibold text-white mb-4">
            Not sure where to start?<br />Talk to an expert.
          </h2>
          <p className="text-muted-text font-body text-body-base mb-10 max-w-lg mx-auto">
            Our specialists will review your credit profile and recommend the right combination of services to hit your goals.
          </p>
          <Link to="/contact">
            <Button size="lg">Get Your Free Consultation</Button>
          </Link>
        </div>
      </Section>
    </PageWrapper>
  )
}
