import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Phone, Mail, MapPin, Loader2, CheckCircle } from 'lucide-react'
import PageWrapper from '@components/layout/PageWrapper'
import SEOHead from '@components/layout/SEOHead'
import Section from '@components/layout/Section'
import SectionLabel from '@components/ui/SectionLabel'
import { Button, Card, Input, Textarea, Select } from '@components/ui'
import { contactFormSchema } from '@lib/validators'
import { formatPhone } from '@lib/utils'
import { useFormStore } from '@store/formStore'
import { useUIStore } from '@store/uiStore'
import { submitContactForm } from '@services/contactService'
import { siteConfig } from '@config/site'
import type { ContactFormData } from '@/types/index'

const serviceOptions = [
  { value: 'Credit Analysis', label: 'Credit Analysis' },
  { value: 'Dispute Filing', label: 'Dispute Filing' },
  { value: 'Score Monitoring', label: 'Score Monitoring' },
  { value: 'Debt Validation', label: 'Debt Validation' },
  { value: 'Not Sure', label: 'Not Sure — Help Me Decide' },
]

export default function Contact() {
  const { submissionStatus, setSubmissionStatus, resetForm } = useFormStore()
  const addToast = useUIStore((state) => state.addToast)
  const errorResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setSubmissionStatus('idle')
    return () => {
      if (errorResetTimer.current) clearTimeout(errorResetTimer.current)
    }
  }, [setSubmissionStatus])

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: ContactFormData) => {
    if (submissionStatus === 'loading') return
    setSubmissionStatus('loading')
    const result = await submitContactForm(data)
    if (result.success) {
      setSubmissionStatus('success')
      addToast({
        message: "Message sent! We'll be in touch within 24 hours.",
        type: 'success',
        duration: 5000,
      })
    } else {
      setSubmissionStatus('error')
      addToast({
        message: result.message,
        type: 'error',
        duration: 6000,
      })
      errorResetTimer.current = setTimeout(() => {
        setSubmissionStatus('idle')
      }, 5000)
    }
  }

  const handleSendAnother = () => {
    resetForm()
    reset()
  }

  return (
    <PageWrapper dark>
      <SEOHead
        title="Contact Us — Start Your Free Credit Consultation"
        description="Get in touch with Proximity Credit Repair. Schedule your free consultation and take the first step toward rebuilding your credit. Call, email, or use our contact form."
        canonicalPath="/contact"
        keywords="contact credit repair, free credit consultation, credit repair near me, speak to credit expert"
      />

      <div className="bg-hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-h2 font-heading font-black text-white">Contact Us</h1>
          <p className="text-muted-text-dark text-caption mt-3">Home / Contact</p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionLabel className="text-[#8B6A2E]">GET IN TOUCH</SectionLabel>
            <h2 className="font-heading font-bold text-h2 text-body-text mt-2 mb-8">
              Let's Start Your Credit Journey
            </h2>
            <div className="flex items-start gap-3 mb-5">
              <Phone className="text-gold-primary flex-shrink-0 mt-0.5" size={20} />
              <a
                href={siteConfig.phoneHref}
                className="font-body text-body-base text-body-text hover:text-gold-primary transition-colors duration-200"
              >
                {siteConfig.phone}
              </a>
            </div>
            <div className="flex items-start gap-3 mb-5">
              <Mail className="text-gold-primary flex-shrink-0 mt-0.5" size={20} />
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-body text-body-base text-body-text hover:text-gold-primary transition-colors duration-200"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-start gap-3 mb-5">
              <MapPin className="text-gold-primary flex-shrink-0 mt-0.5" size={20} />
              <span className="font-body text-body-base text-body-text">
                {siteConfig.address}
              </span>
            </div>
            <div className="rounded-card overflow-hidden mt-6 h-56 border border-gold-primary/10">
              <iframe
                title="Proximity Credit Repair office location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424143.73836082885!2d-84.56201937588938!3d33.76731936017985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5045d6993098d%3A0x66fede2f990b630b!2sAtlanta%2C%20GA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <Card variant="light">
              <AnimatePresence mode="wait">
                {submissionStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <CheckCircle className="text-gold-primary mb-4" size={80} />
                    <h3 className="font-heading font-bold text-h3 text-body-text mb-2">
                      Thank you, {getValues('fullName')}!
                    </h3>
                    <p className="text-muted-text font-body mb-6">We'll reach out within 24 hours.</p>
                    <button
                      onClick={handleSendAnother}
                      className="font-body text-gold-primary underline text-body-base hover:text-gold-dark transition-colors duration-200"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    <Input
                      label="Full Name"
                      name="fullName"
                      register={register('fullName')}
                      error={errors.fullName?.message}
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      register={register('email')}
                      error={errors.email?.message}
                      required
                    />
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      register={register('phone', {
                        onChange: (e) => {
                          const formatted = formatPhone(e.target.value)
                          setValue('phone', formatted, { shouldValidate: true })
                        },
                      })}
                      error={errors.phone?.message}
                      required
                    />
                    <Select
                      label="Service of Interest"
                      name="serviceOfInterest"
                      register={register('serviceOfInterest')}
                      error={errors.serviceOfInterest?.message}
                      options={serviceOptions}
                      required
                    />
                    <Textarea
                      label="Message"
                      name="message"
                      register={register('message')}
                      error={errors.message?.message}
                      rows={5}
                      required
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={submissionStatus === 'loading'}
                      className="w-full justify-center"
                    >
                      {submissionStatus === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={20} className="animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                    {submissionStatus === 'error' && (
                      <p role="alert" className="text-red-400 text-label text-center font-body">
                        Something went wrong. Please try again or call us at{' '}
                        <a
                          href={siteConfig.phoneHref}
                          className="underline hover:text-red-300 transition-colors"
                        >
                          {siteConfig.phone}
                        </a>
                        .
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </Section>
    </PageWrapper>
  )
}
