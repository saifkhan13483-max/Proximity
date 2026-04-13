import { motion } from 'framer-motion'
  import { useInView } from 'react-intersection-observer'
  import { Link } from 'react-router-dom'
  import { Phone, FileSearch, FileEdit, BarChart2 } from 'lucide-react'
  import type { LucideIcon } from 'lucide-react'
  import PageWrapper from '@components/layout/PageWrapper'
  import SEOHead from '@components/layout/SEOHead'
  import Section from '@components/layout/Section'
  import SectionLabel from '@components/ui/SectionLabel'
  import { Button } from '@components/ui'
  import { fadeUp } from '@lib/animations'

  interface Step {
    number: string
    title: string
    description: string
    Icon: LucideIcon
  }

  const steps: Step[] = [
    {
      number: '01',
      title: 'Free Consultation',
      Icon: Phone,
      description: 'We begin with a no-obligation consultation to review your credit situation, understand your goals, and build a clear picture of the path forward. There is no pressure, no commitment — just expert guidance.',
    },
    {
      number: '02',
      title: 'Full Credit Review',
      Icon: FileSearch,
      description: 'Our certified specialists pull and analyze all three credit bureau reports in detail. We identify every error, outdated item, inaccuracy, and negative mark that is impacting your score.',
    },
    {
      number: '03',
      title: 'Dispute & Repair',
      Icon: FileEdit,
      description: 'We draft and submit legally precise dispute letters to the credit bureaus on your behalf. We manage every follow-up, appeal, and response, handling the entire process from start to finish.',
    },
    {
      number: '04',
      title: 'Monitor Your Progress',
      Icon: BarChart2,
      description: 'We track every bureau update, alert you to every change, and send you monthly progress reports. You always know exactly where your score stands and what is improving.',
    },
  ]

  function ConnectorLine() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
    return (
      <motion.div
        ref={ref}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
        className="h-px flex-1 bg-gold-gradient mx-2 mt-8 min-w-[20px]"
      />
    )
  }

  export default function HowItWorks() {
    return (
      <PageWrapper dark>
        <SEOHead
          title="How Credit Repair Works — Our Proven 4-Step Process"
          description="Learn exactly how Proximity Credit Repair works. From your free consultation to full credit review, expert dispute filing, and ongoing progress monitoring — four steps to a better score."
          canonicalPath="/how-it-works"
          keywords="how credit repair works, credit repair process, credit repair steps, credit dispute process, how to fix credit score"
        />

        <div className="bg-hero-gradient py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-h2 font-heading font-black text-white">How It Works</h1>
            <p className="text-muted-text text-caption mt-3">Home / How It Works</p>
          </div>
        </div>

        <Section>
          <SectionLabel>THE PROCESS</SectionLabel>
          <h2 className="font-heading font-bold text-h2 text-body-text mt-2 mb-16">
            Four Steps to a Better Credit Score
          </h2>

          <div className="hidden md:flex flex-row items-start gap-0">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-row items-start flex-1">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center text-center flex-1"
                >
                  <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center mb-4">
                    <step.Icon className="text-white" size={28} />
                  </div>
                  <span className="font-heading font-black text-gold-primary text-xl mb-1">{step.number}</span>
                  <h3 className="font-heading font-bold text-body-text text-subheading mb-3">{step.title}</h3>
                  <p className="font-body text-caption text-muted-text max-w-xs">{step.description}</p>
                </motion.div>
                {index < steps.length - 1 && <ConnectorLine />}
              </div>
            ))}
          </div>

          <div className="flex md:hidden flex-col gap-0">
            {steps.map((step, index) => (
              <div key={step.number}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center mb-4">
                    <step.Icon className="text-white" size={28} />
                  </div>
                  <span className="font-heading font-black text-gold-primary text-xl mb-1">{step.number}</span>
                  <h3 className="font-heading font-bold text-body-text text-subheading mb-3">{step.title}</h3>
                  <p className="font-body text-caption text-muted-text max-w-xs">{step.description}</p>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="w-px h-12 bg-gold-gradient ml-[calc(50%-0.5px)]" />
                )}
              </div>
            ))}
          </div>
        </Section>

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
  