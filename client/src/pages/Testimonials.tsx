import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, PlayCircle, Award, ThumbsUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PageWrapper from '@components/layout/PageWrapper'
import SEOHead from '@components/layout/SEOHead'
import Section from '@components/layout/Section'
import SectionLabel from '@components/ui/SectionLabel'
import { Card, Badge } from '@components/ui'
import { staggerContainer, fadeUp } from '@lib/animations'
import { testimonials } from '@data/testimonials'

const trustBadges: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Award, label: 'BBB Accredited Business', sub: 'Accredited Business' },
  { icon: Star, label: 'Google Reviews', sub: '5.0 / 5.0 Rating' },
  { icon: ThumbsUp, label: 'Trustpilot Excellent', sub: 'Excellent Rating' },
]

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <PageWrapper dark>
      <SEOHead
        title="Client Testimonials & Credit Repair Success Stories"
        description="Read real success stories from Proximity Credit Repair clients who improved their credit scores by 100–175+ points. Before/after results from clients across the United States."
        canonicalPath="/testimonials"
        keywords="credit repair testimonials, credit repair success stories, credit score improvement results, credit repair reviews"
      />

      <div className="bg-hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-h2 font-heading font-black text-white">Client Success Stories</h1>
          <p className="text-muted-text text-caption mt-3">Home / Testimonials</p>
        </div>
      </div>

      <Section>
        <SectionLabel>TRUSTED & VERIFIED</SectionLabel>
        <h2 className="font-heading font-bold text-h2 text-body-text mt-2 mb-12">
          Why Clients Trust Proximity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustBadges.map((badge) => (
            <Card key={badge.label} variant="light" hover>
              <div className="flex flex-col items-center text-center">
                <badge.icon className="text-gold-primary mb-3" size={40} />
                <h3 className="font-heading font-bold text-body-text mb-1">{badge.label}</h3>
                <p className="text-muted-text text-caption">{badge.sub}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section alt>
        <SectionLabel>WHAT OUR CLIENTS SAY</SectionLabel>
        <h2 className="font-heading font-bold text-h2 text-body-text mt-2 mb-12">
          Real Results from Real People
        </h2>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              className="bg-card-black border-t-2 border-gold-primary rounded-card p-6 relative overflow-hidden flex flex-col"
            >
              <span className="absolute top-4 left-4 text-8xl font-heading text-gold-primary/10 leading-none pointer-events-none select-none">
                &ldquo;
              </span>
              <div className="flex items-center gap-2 mb-3 relative z-10 flex-wrap">
                <Badge variant="neutral">{t.beforeScore}</Badge>
                <span className="text-white/40 text-sm">→</span>
                <Badge variant="success">{t.afterScore}</Badge>
                <span className="text-gold-primary font-semibold text-caption">
                  +{t.afterScore - t.beforeScore} pts
                </span>
              </div>
              <div className="flex gap-0.5 mb-4 relative z-10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-gold-primary w-4 h-4" />
                ))}
              </div>
              <p className="font-body text-body-base text-white/90 relative z-10 flex-1">{t.text}</p>
              <p className="text-gold-primary font-semibold text-caption mt-4 relative z-10">
                {t.clientName} — {t.city}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section dark>
        <SectionLabel>FEATURED STORY</SectionLabel>
        <h2 className="font-heading font-bold text-h2 text-white mt-2 mb-12">
          Watch Marcus's Journey
        </h2>
        <div className="bg-card-black rounded-card aspect-video flex flex-col items-center justify-center max-w-3xl mx-auto">
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
            <PlayCircle className="text-gold-primary" size={80} />
          </motion.div>
        </div>
        <p className="text-muted-text text-caption italic text-center mt-4">
          Marcus T. — From 521 to 694 in 6 months
        </p>
      </Section>
    </PageWrapper>
  )
}
