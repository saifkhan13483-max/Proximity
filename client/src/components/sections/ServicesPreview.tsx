import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BarChart2, FileText, TrendingUp, Shield, Handshake, BookOpen, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section from '@components/layout/Section'
import SectionLabel from '@components/ui/SectionLabel'
import { fadeUp, staggerContainer } from '@lib/animations'
import { services } from '@data/services'

const iconMap: Record<string, LucideIcon> = { BarChart2, FileText, TrendingUp, Shield, Handshake, BookOpen, ShieldCheck }

export default function ServicesPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <Section dark id="services">
      <SectionLabel>OUR SERVICES</SectionLabel>
      <h2 className="font-heading font-bold text-h2 text-white mt-2 mb-12">
        Everything You Need to{' '}
        <span className="gold-gradient-text">Restore Your Credit</span>
      </h2>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon]
          return (
            <motion.div
              key={service.id}
              variants={fadeUp}
              className="bg-card-black border-t-2 border-gold-primary rounded-card p-6 flex flex-col hover:-translate-y-1.5 transition-transform duration-300"
            >
              {Icon && <Icon className="text-gold-primary mb-4" size={40} />}
              <h3 className="font-heading font-bold text-white text-subheading">
                {service.title}
              </h3>
              <p className="text-muted-text-dark font-body text-caption mt-2 flex-1">
                {service.shortDescription}
              </p>
              <Link
                to={`/services#${service.id}`}
                className="text-gold-primary text-caption font-semibold hover:text-gold-light transition-colors mt-4 inline-block"
              >
                Learn More →
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
