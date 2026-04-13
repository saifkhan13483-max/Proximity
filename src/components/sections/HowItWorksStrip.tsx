import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Section from '@components/layout/Section'
import SectionLabel from '@components/ui/SectionLabel'
import { Button } from '@components/ui'
import { fadeUp } from '@lib/animations'

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    description: 'We start with a no-cost call to understand your credit goals and situation.',
  },
  {
    number: '02',
    title: 'Full Credit Review',
    description: 'We pull and analyze all three bureau reports to identify every opportunity.',
  },
  {
    number: '03',
    title: 'Dispute & Repair',
    description: 'We submit expert dispute letters and manage the entire process on your behalf.',
  },
  {
    number: '04',
    title: 'Monitor Progress',
    description: 'We track every change and keep you updated throughout your journey.',
  },
]

function StepItem({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.15 }}
      className="flex flex-col items-center text-center flex-1"
    >
      <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center font-heading font-black text-white text-sm mb-4">
        {step.number}
      </div>
      <h4 className="font-heading font-semibold text-body-text mb-2">{step.title}</h4>
      <p className="font-body text-caption text-muted-text">{step.description}</p>
    </motion.div>
  )
}

export default function HowItWorksStrip() {
  return (
    <Section alt>
      <SectionLabel>THE PROCESS</SectionLabel>
      <h2 className="font-heading font-bold text-h2 text-body-text mt-2 mb-12">
        Four Simple Steps to a Better Score
      </h2>

      <div className="hidden md:flex flex-row items-start gap-0">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-row items-start flex-1">
            <StepItem step={step} index={index} />
            {index < steps.length - 1 && (
              <div className="h-px flex-1 bg-gold-gradient mt-6 mx-2 flex-shrink-0 min-w-[20px]" />
            )}
          </div>
        ))}
      </div>

      <div className="flex md:hidden flex-col gap-8">
        {steps.map((step, index) => (
          <StepItem key={step.number} step={step} index={index} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/how-it-works">
          <Button variant="secondary">View Full Process</Button>
        </Link>
      </div>
    </Section>
  )
}
