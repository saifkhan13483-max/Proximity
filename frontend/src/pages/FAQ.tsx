import { useState } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import { ChevronDown } from 'lucide-react'
  import { Link } from 'react-router-dom'
  import PageWrapper from '@components/layout/PageWrapper'
  import SEOHead from '@components/layout/SEOHead'
  import Section from '@components/layout/Section'
  import SectionLabel from '@components/ui/SectionLabel'
  import { Button } from '@components/ui'
  import { faqs } from '@data/faqs'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const categories = [
    { key: 'about-credit-repair' as const, label: 'About Credit Repair' },
    { key: 'working-with-proximity' as const, label: 'Working with Proximity' },
  ]

  export default function FAQ() {
    const [openId, setOpenId] = useState<string | null>(null)
    const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

    return (
      <PageWrapper dark>
        <SEOHead
          title="FAQ — Your Credit Repair Questions Answered"
          description="Find answers to the most common credit repair questions. Learn about the process, timeline, compliance, and what to expect when working with Proximity Credit Repair."
          canonicalPath="/faq"
          schemaMarkup={faqSchema}
          keywords="credit repair FAQ, how does credit repair work, credit repair questions, credit score questions, credit repair timeline"
        />

        <div className="bg-hero-gradient py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-h2 font-heading font-black text-white">Frequently Asked Questions</h1>
            <p className="text-muted-text text-caption mt-3">Home / FAQ</p>
          </div>
        </div>

        <Section>
          <SectionLabel>HAVE QUESTIONS?</SectionLabel>
          <h2 className="font-heading font-bold text-h2 text-body-text mt-2 mb-4">
            Everything You Need to Know
          </h2>

          {categories.map((cat) => (
            <div key={cat.key}>
              <h3 className="font-heading font-bold text-subheading text-body-text mb-4 mt-10">
                {cat.label}
              </h3>
              <div>
                {faqs
                  .filter((f) => f.category === cat.key)
                  .map((item) => (
                    <div key={item.id} className="border-b border-gold-primary/20">
                      <button
                        className="w-full flex justify-between items-center py-4 text-left font-body font-semibold text-body-base text-body-text"
                        onClick={() => toggle(item.id)}
                        aria-expanded={openId === item.id}
                        aria-controls={`answer-${item.id}`}
                      >
                        {item.question}
                        <motion.span
                          animate={{ rotate: openId === item.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 ml-4"
                        >
                          <ChevronDown size={20} className="text-gold-primary" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {openId === item.id && (
                          <motion.div
                            id={`answer-${item.id}`}
                            role="region"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <p className="font-body text-body-base text-muted-text pb-4 leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </Section>

        <Section alt>
          <div className="text-center">
            <p className="font-heading font-bold text-subheading text-body-text mb-6">
              Still have questions? We're here to help.
            </p>
            <Link to="/contact">
              <Button variant="secondary">Contact Us</Button>
            </Link>
          </div>
        </Section>
      </PageWrapper>
    )
  }
  