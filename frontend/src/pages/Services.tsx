import { motion } from 'framer-motion'
  import { useInView } from 'react-intersection-observer'
  import { Link } from 'react-router-dom'
  import { BarChart2, FileText, TrendingUp, Shield, CheckCircle } from 'lucide-react'
  import type { LucideIcon } from 'lucide-react'
  import PageWrapper from '@components/layout/PageWrapper'
  import SEOHead from '@components/layout/SEOHead'
  import Section from '@components/layout/Section'
  import { Button } from '@components/ui'
  import { fadeUp } from '@lib/animations'
  import { services } from '@data/services'

  const iconMap: Record<string, LucideIcon> = { BarChart2, FileText, TrendingUp, Shield }

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: 'Credit Analysis', provider: { '@type': 'Organization', name: 'Proximity Credit Repair' } },
      { '@type': 'Service', name: 'Dispute Filing', provider: { '@type': 'Organization', name: 'Proximity Credit Repair' } },
      { '@type': 'Service', name: 'Score Monitoring', provider: { '@type': 'Organization', name: 'Proximity Credit Repair' } },
      { '@type': 'Service', name: 'Debt Validation', provider: { '@type': 'Organization', name: 'Proximity Credit Repair' } },
    ],
  }

  function ServiceBlock({ service, index }: { service: typeof services[0]; index: number }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
    const isEven = index % 2 === 0
    const Icon = iconMap[service.icon]

    const InfoCol = (
      <div className="flex flex-col">
        {Icon && <Icon className="text-gold-primary mb-4" size={64} />}
        <h2 className="font-heading font-bold text-h3 text-body-text">{service.title}</h2>
        <p className="font-body text-body-base text-body-text mt-3">{service.description}</p>
      </div>
    )

    const BenefitsCol = (
      <div>
        <h3 className="font-heading font-semibold text-subheading text-body-text mb-4">Key Benefits</h3>
        <ul className="flex flex-col gap-3">
          {service.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <CheckCircle className="text-gold-primary flex-shrink-0 mt-0.5" size={20} />
              <span className="font-body text-body-base">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    )

    return (
      <Section alt={isEven} id={service.id}>
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {isEven ? <>{InfoCol}{BenefitsCol}</> : <>{BenefitsCol}{InfoCol}</>}
        </motion.div>
      </Section>
    )
  }

  export default function Services() {
    return (
      <PageWrapper dark>
        <SEOHead
          title="Credit Repair Services — Analysis, Disputes, Monitoring & Debt Validation"
          description="Explore Proximity Credit Repair's full suite of services: Credit Analysis, Dispute Filing, Score Monitoring, and Debt Validation. Expert strategies tailored to your unique credit profile."
          canonicalPath="/services"
          schemaMarkup={servicesSchema}
          keywords="credit analysis, dispute filing, score monitoring, debt validation, credit repair services, remove negative items, credit bureau disputes"
        />

        <div className="bg-hero-gradient py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-h2 font-heading font-black text-white">Our Services</h1>
            <p className="text-muted-text text-caption mt-3">Home / Services</p>
          </div>
        </div>

        {services.map((service, index) => (
          <ServiceBlock key={service.id} service={service} index={index} />
        ))}

        <Section dark>
          <div className="text-center">
            <h2 className="text-h3 font-heading font-semibold text-white">
              Not sure where to start? Talk to an expert.
            </h2>
            <div className="mt-8">
              <Link to="/contact">
                <Button size="lg">Get Your Free Consultation</Button>
              </Link>
            </div>
          </div>
        </Section>
      </PageWrapper>
    )
  }
  