import PageWrapper from '@components/layout/PageWrapper'
  import SEOHead from '@components/layout/SEOHead'
  import HeroSection from '@components/sections/HeroSection'
  import ServicesPreview from '@components/sections/ServicesPreview'
  import HowItWorksStrip from '@components/sections/HowItWorksStrip'
  import TestimonialsSlider from '@components/sections/TestimonialsSlider'
  import FinalCTABand from '@components/sections/FinalCTABand'
  import { siteMetadata } from '@config/site'

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Proximity Credit Repair',
    url: siteMetadata.siteUrl,
    description: siteMetadata.siteDescription,
    areaServed: 'United States',
    serviceType: 'Credit Repair',
    priceRange: '$$',
  }

  export default function Home() {
    return (
      <PageWrapper noPaddingTop>
        <SEOHead
          title="Expert Credit Repair Services That Deliver Real Results"
          description={siteMetadata.siteDescription}
          canonicalPath="/"
          schemaMarkup={homeSchema}
          keywords="credit repair, fix credit score, remove negative items, credit dispute, credit repair service, boost credit score, credit restoration"
        />
        <HeroSection />
        <ServicesPreview />
        <HowItWorksStrip />
        <TestimonialsSlider />
        <FinalCTABand />
      </PageWrapper>
    )
  }
  