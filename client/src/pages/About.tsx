import { useState } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import { useInView } from 'react-intersection-observer'
  import { Shield, Award, TrendingUp, Heart } from 'lucide-react'
  import PageWrapper from '@components/layout/PageWrapper'
  import SEOHead from '@components/layout/SEOHead'
  import Section from '@components/layout/Section'
  import SectionLabel from '@components/ui/SectionLabel'
  import { Card, OptimizedImage } from '@components/ui'
  import { fadeUp } from '@lib/animations'
  import { teamMembers } from '@data/team'
  import { siteMetadata } from '@config/siteMetadata'

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Proximity Credit Repair',
    url: siteMetadata.siteUrl,
    description: 'Expert credit repair services helping clients improve their credit scores through proven dispute strategies.',
  }

  const values = [
    { icon: Shield, title: 'Transparency', description: 'We believe you deserve to know exactly what we are doing and why at every stage of your credit repair journey.' },
    { icon: Award, title: 'Expertise', description: 'Our certified specialists bring deep, proven knowledge to every dispute, strategy, and recommendation we make.' },
    { icon: TrendingUp, title: 'Results', description: 'We measure our success by your success. Real, measurable score improvements are our only acceptable outcome.' },
    { icon: Heart, title: 'Dedication', description: 'Every client receives the same committed, personalized attention we would give to our own family.' },
  ]

  function TeamCard({ member }: { member: typeof teamMembers[0] }) {
    const [hovered, setHovered] = useState(false)
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

    return (
      <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
        <Card variant="light" hover>
          <div
            className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <OptimizedImage
              src={member.photoUrl}
              alt={`Photo of ${member.name}, ${member.title} at Proximity Credit Repair`}
              className="w-full h-full object-cover"
              width={400}
              height={192}
            />
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gold-primary/90 rounded-lg flex items-center justify-center p-4"
                >
                  <p className="text-white text-caption text-center font-body">{member.bio}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <h4 className="font-heading font-bold text-body-text">{member.name}</h4>
          <p className="text-gold-primary text-caption font-semibold">{member.title}</p>
        </Card>
      </motion.div>
    )
  }

  export default function About() {
    return (
      <PageWrapper dark>
        <SEOHead
          title="About Us — Our Mission, Team & Values"
          description="Meet the expert team behind Proximity Credit Repair. Dedicated to empowering clients with proven, transparent credit repair strategies. Discover our mission, values, and the specialists fighting for your financial future."
          canonicalPath="/about"
          schemaMarkup={aboutSchema}
          keywords="credit repair team, about proximity credit repair, credit repair experts, certified credit specialists, credit repair company"
        />

        <div className="bg-hero-gradient py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-h2 font-heading font-black text-white">About Us</h1>
            <p className="text-muted-text text-caption mt-3">Home / About</p>
          </div>
        </div>

        <Section>
          <SectionLabel>OUR MISSION</SectionLabel>
          <div className="flex flex-col md:flex-row mt-6">
            <div className="w-full md:w-1.5 h-1.5 md:h-auto self-stretch bg-gold-gradient rounded-full mb-6 md:mb-0 md:mr-8 flex-shrink-0" />
            <blockquote className="text-h3 font-heading font-semibold text-body-text">
              At Proximity Credit Repair, our mission is to empower individuals to take control of
              their financial future through expert guidance, proven strategies, and unwavering
              dedication to every client we serve.
            </blockquote>
          </div>
        </Section>

        <Section dark>
          <SectionLabel>OUR VALUES</SectionLabel>
          <h2 className="font-heading font-bold text-h2 text-white mt-2 mb-12">
            What Drives Everything We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <Card key={v.title} variant="dark" hover>
                <v.icon className="text-gold-primary mb-3" size={32} />
                <h3 className="font-heading font-bold text-white mb-2">{v.title}</h3>
                <p className="text-muted-text font-body text-caption">{v.description}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section alt>
          <SectionLabel>OUR TEAM</SectionLabel>
          <h2 className="font-heading font-bold text-h2 text-body-text mt-2 mb-12">
            Meet the Experts Behind Your Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Section>
      </PageWrapper>
    )
  }
  