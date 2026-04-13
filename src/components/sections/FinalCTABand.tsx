import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import Section from '@components/layout/Section'
import { Button } from '@components/ui'
import { fadeUp } from '@lib/animations'

export default function FinalCTABand() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <Section dark>
      <div className="text-center" ref={ref}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-heading font-bold text-h2 text-white"
        >
          Your Better Credit Score{' '}
          <span className="gold-gradient-text">Starts Today</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.15 }}
          className="text-muted-text font-body text-body-lg mt-6 max-w-xl mx-auto"
        >
          Join 10,000+ clients who transformed their financial future with Proximity.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <Link to="/contact">
            <Button size="lg">Start Your Free Consultation</Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  )
}
