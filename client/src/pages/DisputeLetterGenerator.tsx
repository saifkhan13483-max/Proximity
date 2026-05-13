import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Brain, Loader2, Copy, Download, CheckCircle, ArrowRight, RefreshCw, Shield, AlertTriangle } from 'lucide-react'
import PageWrapper from '@components/layout/PageWrapper'
import SEOHead from '@components/layout/SEOHead'
import Section from '@components/layout/Section'
import SectionLabel from '@components/ui/SectionLabel'
import { Button } from '@components/ui'
import { generateDisputeLetter } from '@services/geminiService'
import type { DisputeLetterInput } from '@services/geminiService'
import { fadeUp, staggerContainer } from '@lib/animations'

const BUREAU_OPTIONS = [
  { value: 'Equifax', label: 'Equifax' },
  { value: 'Experian', label: 'Experian' },
  { value: 'TransUnion', label: 'TransUnion' },
]

const DISPUTE_REASONS = [
  { value: 'Account does not belong to me (identity theft or mixed file)', label: 'Not my account (identity theft / mixed file)' },
  { value: 'Account was paid in full but still shows as unpaid or delinquent', label: 'Paid but showing as unpaid' },
  { value: 'Account was settled but still shows balance owed', label: 'Settled but showing balance' },
  { value: 'Incorrect payment history — payments were on time', label: 'Incorrect late payment history' },
  { value: 'Account is past the 7-year reporting limit and should be removed', label: 'Past 7-year reporting limit' },
  { value: 'Duplicate account listing on credit report', label: 'Duplicate account listing' },
  { value: 'Incorrect account status (open vs. closed)', label: 'Wrong account status' },
  { value: 'Incorrect balance or credit limit reported', label: 'Wrong balance or credit limit' },
  { value: 'Account included in bankruptcy but still showing negative', label: 'Included in bankruptcy' },
  { value: 'Fraudulent account — I am a victim of identity theft', label: 'Fraudulent / identity theft account' },
  { value: 'Charge-off amount is incorrect', label: 'Incorrect charge-off amount' },
  { value: 'Collection account — debt is not valid or already paid', label: 'Invalid or paid collection' },
]

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC']

const defaultInput: DisputeLetterInput = {
  yourName: '', yourAddress: '', yourCity: '', yourState: '', yourZip: '',
  bureauName: '', creditorName: '', accountNumber: '', disputeReason: '', additionalDetails: '',
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-body text-sm font-semibold text-white/75 mb-1.5">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

function StyledInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/12 rounded-lg px-4 py-2.5 text-white placeholder-white/20 font-body text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30 transition-all"
    />
  )
}

function StyledSelect({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/12 rounded-lg px-4 py-2.5 text-white font-body text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30 transition-all appearance-none [&>option]:bg-[#1a1a1a] [&>option]:text-white"
    >
      <option value="" disabled>{placeholder || 'Select…'}</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

export default function DisputeLetterGenerator() {
  const [input, setInput] = useState<DisputeLetterInput>(defaultInput)
  const [errors, setErrors] = useState<Partial<Record<keyof DisputeLetterInput, string>>>({})
  const [loading, setLoading] = useState(false)
  const [letter, setLetter] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function set(field: keyof DisputeLetterInput, value: string) {
    setInput(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function validate(): boolean {
    const e: Partial<Record<keyof DisputeLetterInput, string>> = {}
    if (!input.yourName.trim()) e.yourName = 'Required'
    if (!input.yourAddress.trim()) e.yourAddress = 'Required'
    if (!input.yourCity.trim()) e.yourCity = 'Required'
    if (!input.yourState) e.yourState = 'Required'
    if (!input.yourZip.trim()) e.yourZip = 'Required'
    if (!input.bureauName) e.bureauName = 'Required'
    if (!input.creditorName.trim()) e.creditorName = 'Required'
    if (!input.accountNumber.trim()) e.accountNumber = 'Required'
    if (!input.disputeReason) e.disputeReason = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleGenerate() {
    if (!validate()) return
    setLoading(true)
    setApiError(null)
    try {
      const result = await generateDisputeLetter(input)
      setLetter(result)
      setTimeout(() => {
        document.getElementById('letter-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!letter) return
    navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  function handleDownload() {
    if (!letter) return
    const blob = new Blob([letter], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dispute-letter-${input.bureauName.toLowerCase()}-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  function reset() {
    setInput(defaultInput)
    setLetter(null)
    setErrors({})
    setApiError(null)
  }

  return (
    <PageWrapper dark noPaddingTop>
      <SEOHead
        title="AI Dispute Letter Generator — Free FCRA Credit Dispute Letters"
        description="Generate a professional, legally-worded FCRA credit dispute letter instantly using Google Gemini AI. Free, personalized, and ready to mail."
        canonicalPath="/dispute-letter-generator"
        keywords="FCRA dispute letter, credit dispute letter generator, free dispute letter, credit bureau dispute, remove negative items"
      />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] to-near-black pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,146,74,0.12),transparent_70%)]" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <SectionLabel>AI-Powered</SectionLabel>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
              Dispute Letter <span className="gold-gradient-text">Generator</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Generate a professional, FCRA-compliant credit dispute letter in seconds using Google Gemini AI. Personalized, legally precise, and ready to mail.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 mt-8">
              {[
                { icon: Shield, label: 'FCRA Compliant' },
                { icon: Brain, label: 'Gemini AI Written' },
                { icon: FileText, label: 'Print & Mail Ready' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/50 font-body text-sm">
                  <Icon size={15} className="text-gold-primary" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Section dark className="py-16">
        <div className="max-w-2xl mx-auto space-y-8">

          {/* Form */}
          {!letter && (
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white/4 border border-white/10 rounded-3xl p-6 md:p-10">
              <h2 className="font-heading font-bold text-xl text-white mb-1">Your Information</h2>
              <p className="font-body text-white/40 text-sm mb-6">Fill in the details below to generate your personalized dispute letter.</p>

              <div className="space-y-6">
                {/* Personal info */}
                <div>
                  <p className="font-heading font-semibold text-gold-primary text-xs tracking-widest uppercase mb-3">Your Details</p>
                  <div className="space-y-4">
                    <Field label="Full Name" required error={errors.yourName}>
                      <StyledInput value={input.yourName} onChange={v => set('yourName', v)} placeholder="e.g. Marcus Williams" />
                    </Field>
                    <Field label="Street Address" required error={errors.yourAddress}>
                      <StyledInput value={input.yourAddress} onChange={v => set('yourAddress', v)} placeholder="e.g. 123 Main Street, Apt 4B" />
                    </Field>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <Field label="City" required error={errors.yourCity}>
                        <StyledInput value={input.yourCity} onChange={v => set('yourCity', v)} placeholder="Atlanta" />
                      </Field>
                      <Field label="State" required error={errors.yourState}>
                        <StyledSelect
                          value={input.yourState}
                          onChange={v => set('yourState', v)}
                          options={US_STATES.map(s => ({ value: s, label: s }))}
                          placeholder="State"
                        />
                      </Field>
                      <Field label="ZIP Code" required error={errors.yourZip}>
                        <StyledInput value={input.yourZip} onChange={v => set('yourZip', v)} placeholder="30301" />
                      </Field>
                    </div>
                  </div>
                </div>

                {/* Dispute info */}
                <div className="border-t border-white/8 pt-6">
                  <p className="font-heading font-semibold text-gold-primary text-xs tracking-widest uppercase mb-3">Dispute Details</p>
                  <div className="space-y-4">
                    <Field label="Credit Bureau" required error={errors.bureauName}>
                      <StyledSelect value={input.bureauName} onChange={v => set('bureauName', v)} options={BUREAU_OPTIONS} placeholder="Select bureau" />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Creditor / Collection Agency" required error={errors.creditorName}>
                        <StyledInput value={input.creditorName} onChange={v => set('creditorName', v)} placeholder="e.g. Midland Credit Mgmt" />
                      </Field>
                      <Field label="Account Number (last 4 digits)" required error={errors.accountNumber}>
                        <StyledInput value={input.accountNumber} onChange={v => set('accountNumber', v)} placeholder="e.g. XXXX-1234" />
                      </Field>
                    </div>
                    <Field label="Reason for Dispute" required error={errors.disputeReason}>
                      <StyledSelect value={input.disputeReason} onChange={v => set('disputeReason', v)} options={DISPUTE_REASONS} placeholder="Select reason" />
                    </Field>
                    <Field label="Additional Details (Optional)">
                      <textarea
                        value={input.additionalDetails}
                        onChange={e => set('additionalDetails', e.target.value)}
                        placeholder="Any additional context, dates, or facts that support your dispute..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/12 rounded-lg px-4 py-2.5 text-white placeholder-white/20 font-body text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30 transition-all resize-none"
                      />
                    </Field>
                  </div>
                </div>

                {apiError && (
                  <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/25 rounded-xl">
                    <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 font-body text-sm">{apiError}</p>
                  </div>
                )}

                <div className="pt-2">
                  <Button onClick={handleGenerate} disabled={loading} size="md" className="w-full justify-center">
                    {loading ? (
                      <><Loader2 size={17} className="animate-spin" /> Generating Letter…</>
                    ) : (
                      <><Brain size={17} /> Generate Dispute Letter</>
                    )}
                  </Button>
                  <p className="text-white/25 font-body text-xs text-center mt-3">
                    Generated by Google Gemini AI • For informational purposes only
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Result */}
          <AnimatePresence>
            {letter && (
              <motion.div
                id="letter-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                {/* Success header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-400" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-white text-lg">Your Dispute Letter</h2>
                      <p className="font-body text-white/40 text-xs">Ready to print and mail to {input.bureauName}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/8 border border-white/12 text-white/70 hover:text-white hover:bg-white/12 font-body text-sm font-medium transition-all"
                    >
                      {copied ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/8 border border-white/12 text-white/70 hover:text-white hover:bg-white/12 font-body text-sm font-medium transition-all"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </div>

                {/* Letter body */}
                <div className="bg-white/4 border border-white/10 rounded-2xl p-6 md:p-8">
                  <pre className="font-body text-white/80 text-sm leading-relaxed whitespace-pre-wrap break-words">{letter}</pre>
                </div>

                {/* Instructions */}
                <div className="bg-amber-500/8 border border-amber-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={16} className="text-amber-400" />
                    <h3 className="font-heading font-bold text-white text-sm">How to Send This Letter</h3>
                  </div>
                  <ol className="space-y-1.5 font-body text-white/60 text-sm">
                    <li className="flex gap-2"><span className="text-gold-primary font-bold">1.</span> Replace [DATE], [SIGNATURE] and any other bracketed placeholders with your actual information.</li>
                    <li className="flex gap-2"><span className="text-gold-primary font-bold">2.</span> Print the letter and sign it by hand.</li>
                    <li className="flex gap-2"><span className="text-gold-primary font-bold">3.</span> Gather copies of supporting documents (ID, proof of address, account statements).</li>
                    <li className="flex gap-2"><span className="text-gold-primary font-bold">4.</span> Send via <strong className="text-white">Certified Mail with Return Receipt</strong> — keep the tracking number as proof.</li>
                    <li className="flex gap-2"><span className="text-gold-primary font-bold">5.</span> The bureau has 30 days to investigate and respond under FCRA law.</li>
                  </ol>
                </div>

                {/* Actions */}
                <div className="bg-gradient-to-br from-gold-primary/15 to-transparent border border-gold-primary/25 rounded-2xl p-6 text-center">
                  <h3 className="font-heading font-bold text-white text-lg mb-1">Want Expert Help?</h3>
                  <p className="font-body text-white/50 text-sm mb-5">Our team handles disputes, follow-ups, and escalations for you — faster and more effectively.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button href="/contact" size="sm">Get Professional Help <ArrowRight size={15} /></Button>
                    <Button variant="secondary" size="sm" onClick={reset}><RefreshCw size={14} /> Generate New Letter</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {/* Features row */}
      {!letter && (
        <Section dark className="pb-20 pt-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Shield, title: 'FCRA Section 611', desc: 'Letters reference your legal rights and demand 30-day investigation' },
                { icon: Brain, title: 'AI Personalized', desc: 'Every letter is unique to your specific dispute — not a generic template' },
                { icon: FileText, title: 'Print & Mail Ready', desc: 'Properly formatted with address blocks, salutation, and signature line' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center p-5 bg-white/3 border border-white/8 rounded-2xl">
                  <div className="w-11 h-11 rounded-xl bg-gold-primary/15 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-gold-primary" />
                  </div>
                  <h4 className="font-heading font-bold text-white text-sm mb-1">{title}</h4>
                  <p className="font-body text-white/40 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
    </PageWrapper>
  )
}
