import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, Loader2, Copy, Download, CheckCircle2, AlertTriangle,
  Plus, Trash2, Shield, Zap, Package, FileText, ChevronDown,
  ArrowRight, RefreshCw, CheckCircle, RotateCcw, Building2,
} from 'lucide-react'
import PageWrapper from '@components/layout/PageWrapper'
import SEOHead from '@components/layout/SEOHead'
import { Button } from '@components/ui'
import { generateDisputePackage } from '@services/geminiService'
import type { DisputeItemInput, DisputePackageInput, GeneratedLetter } from '@services/geminiService'
import { fadeUp, staggerContainer } from '@lib/animations'

const DISPUTE_REASONS = [
  'Account does not belong to me (identity theft or mixed file)',
  'Account was paid in full but still shows as unpaid or delinquent',
  'Account was settled but still shows balance owed',
  'Incorrect payment history — payments were on time',
  'Account is past the 7-year reporting limit and should be removed',
  'Duplicate account listing on credit report',
  'Incorrect account status (open vs. closed)',
  'Incorrect balance or credit limit reported',
  'Account included in bankruptcy but still showing negative',
  'Fraudulent account — victim of identity theft',
  'Charge-off amount is incorrect',
  'Collection account — debt is not valid or already paid',
]

const BUREAUS = ['Equifax', 'Experian', 'TransUnion']

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC']

const BUREAU_COLORS: Record<string, string> = {
  Equifax: 'bg-red-500/10 border-red-500/30 text-red-400',
  Experian: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  TransUnion: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
}

const BUREAU_DOT: Record<string, string> = {
  Equifax: 'bg-red-400',
  Experian: 'bg-blue-400',
  TransUnion: 'bg-purple-400',
}

const STEPS = ['Your Info', 'Negative Items', 'Review & Generate']

function emptyItem(): DisputeItemInput {
  return { creditorName: '', accountNumber: '', disputeReason: '', bureaus: [] }
}

function StyledInput({
  value, onChange, placeholder, disabled,
}: { value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-white/5 border border-white/12 rounded-lg px-4 py-2.5 text-white placeholder-white/20 font-body text-sm focus:outline-none focus:border-[#B8924A] focus:ring-1 focus:ring-[#B8924A]/30 transition-all disabled:opacity-40"
    />
  )
}

function StyledSelect({
  value, onChange, options, placeholder, disabled,
}: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string; disabled?: boolean }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className="w-full bg-white/5 border border-white/12 rounded-lg px-4 py-2.5 text-white font-body text-sm focus:outline-none focus:border-[#B8924A] focus:ring-1 focus:ring-[#B8924A]/30 transition-all appearance-none [&>option]:bg-[#1a1a1a] [&>option]:text-white disabled:opacity-40"
    >
      <option value="" disabled>{placeholder || 'Select…'}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4 justify-center">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-heading transition-all duration-300 ${
              i < step ? 'bg-[#B8924A] border-[#B8924A]' : i === step ? 'border-[#B8924A] text-[#B8924A]' : 'border-white/15 text-white/30'
            }`}>
              {i < step ? <CheckCircle2 size={14} className="text-white" /> : <span>{i + 1}</span>}
            </div>
            <span className={`hidden sm:block text-xs font-body font-medium ${i === step ? 'text-[#B8924A]' : i < step ? 'text-white/60' : 'text-white/25'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="hidden sm:block w-6 lg:w-10 h-px bg-white/10 mx-1" />}
          </div>
        ))}
      </div>
      <div className="w-full bg-white/8 rounded-full h-1">
        <motion.div
          className="h-1 rounded-full bg-gradient-to-r from-[#B8924A] to-[#D4AF72]"
          animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function LetterCard({ letter, index }: { letter: GeneratedLetter; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(letter.letterText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  function handleDownload() {
    const blob = new Blob([letter.letterText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dispute-${letter.bureau.toLowerCase()}-${letter.creditorName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-[#111111] border border-white/8 rounded-2xl overflow-hidden hover:border-[#B8924A]/25 transition-all duration-300"
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#B8924A]/15 flex items-center justify-center">
            <FileText size={18} className="text-[#B8924A]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-heading font-bold ${BUREAU_COLORS[letter.bureau] || 'bg-white/8 border-white/15 text-white/70'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${BUREAU_DOT[letter.bureau] || 'bg-white/50'}`} />
                {letter.bureau}
              </span>
              <span className="font-heading font-bold text-white text-sm truncate max-w-[200px]">
                {letter.creditorName}
              </span>
            </div>
            <p className="font-body text-[#7A7A7A] text-xs truncate">
              Account: {letter.accountNumber} &nbsp;·&nbsp; {letter.disputeReason.split('—')[0].trim()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/6 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 font-body text-xs transition-all"
          >
            {copied ? <CheckCircle size={12} className="text-green-400" /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/6 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 font-body text-xs transition-all"
          >
            <Download size={12} />
            Save
          </button>
          <button
            onClick={() => setExpanded(v => !v)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#B8924A]/10 border border-[#B8924A]/20 text-[#D4AF72] hover:bg-[#B8924A]/20 font-body text-xs transition-all"
          >
            {expanded ? 'Collapse' : 'View'}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={12} />
            </motion.span>
          </button>
        </div>
      </div>

      {/* Expandable letter */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/6 px-5 py-5 bg-white/[0.02]">
              <pre className="font-body text-white/75 text-xs leading-relaxed whitespace-pre-wrap break-words max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                {letter.letterText}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function PackageResult({
  letters,
  packageName,
  onReset,
}: {
  letters: GeneratedLetter[]
  packageName: string
  onReset: () => void
}) {
  const bureauGroups = BUREAUS.reduce((acc, b) => {
    acc[b] = letters.filter(l => l.bureau === b)
    return acc
  }, {} as Record<string, GeneratedLetter[]>)

  function downloadAll() {
    const allText = letters.map((l, i) =>
      `${'='.repeat(60)}\nLETTER ${i + 1} — ${l.bureau} / ${l.creditorName}\n${'='.repeat(60)}\n\n${l.letterText}`
    ).join('\n\n\n')

    const blob = new Blob([allText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dispute-package-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const activeBureaus = BUREAUS.filter(b => bureauGroups[b].length > 0)

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">

      {/* Success header */}
      <motion.div variants={fadeUp} className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/25 mb-5">
          <CheckCircle size={16} className="text-green-400" />
          <span className="text-green-400 font-heading font-semibold text-sm">Dispute Package Ready</span>
        </div>
        <h2 className="font-heading font-bold text-white text-2xl md:text-3xl mb-2">
          {letters.length} Letter{letters.length !== 1 ? 's' : ''} Generated
        </h2>
        <p className="font-body text-[#7A7A7A] text-sm">
          Your complete dispute package is ready. Review each letter, then send via Certified Mail.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
        {activeBureaus.map(bureau => (
          <div key={bureau} className={`rounded-xl border p-4 text-center ${BUREAU_COLORS[bureau]}`}>
            <p className="font-heading font-black text-2xl mb-1">{bureauGroups[bureau].length}</p>
            <p className="font-body text-xs font-medium opacity-80">{bureau}</p>
          </div>
        ))}
      </motion.div>

      {/* Download all */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={downloadAll}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#B8924A]/15 border border-[#B8924A]/30 text-[#D4AF72] hover:bg-[#B8924A]/25 font-heading font-semibold text-sm transition-all"
        >
          <Package size={16} />
          Download Full Package ({letters.length} letters)
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white/60 hover:text-white hover:bg-white/8 font-heading font-semibold text-sm transition-all"
        >
          <RotateCcw size={15} />
          New Package
        </button>
      </motion.div>

      {/* Letters by bureau */}
      {activeBureaus.map(bureau => (
        <motion.div key={bureau} variants={fadeUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-heading font-bold ${BUREAU_COLORS[bureau]}`}>
              <span className={`w-2 h-2 rounded-full ${BUREAU_DOT[bureau]}`} />
              {bureau}
            </div>
            <span className="font-body text-[#5A5A5A] text-xs">{bureauGroups[bureau].length} letter{bureauGroups[bureau].length !== 1 ? 's' : ''}</span>
            <div className="flex-1 h-px bg-white/6" />
          </div>
          <div className="space-y-3">
            {bureauGroups[bureau].map((letter, i) => (
              <LetterCard key={letter.id} letter={letter} index={i} />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Mailing instructions */}
      <motion.div variants={fadeUp} className="bg-[#B8924A]/8 border border-[#B8924A]/20 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-[#D4AF72]" />
          <h3 className="font-heading font-bold text-white text-sm">How to Send These Letters</h3>
        </div>
        <ol className="space-y-2 font-body text-[#9A9A9A] text-sm">
          <li className="flex gap-2"><span className="text-[#B8924A] font-bold flex-shrink-0">1.</span> Replace all [DATE], [SIGNATURE], and bracketed placeholders with your actual information.</li>
          <li className="flex gap-2"><span className="text-[#B8924A] font-bold flex-shrink-0">2.</span> Print each letter and sign it by hand.</li>
          <li className="flex gap-2"><span className="text-[#B8924A] font-bold flex-shrink-0">3.</span> Gather supporting documents: government ID, proof of address, and any relevant account statements.</li>
          <li className="flex gap-2"><span className="text-[#B8924A] font-bold flex-shrink-0">4.</span> Send each letter via <strong className="text-white">Certified Mail with Return Receipt</strong> — keep all tracking numbers as legal proof.</li>
          <li className="flex gap-2"><span className="text-[#B8924A] font-bold flex-shrink-0">5.</span> Bureaus have 30 days to investigate under FCRA law. Follow up if you don't receive a response.</li>
        </ol>
      </motion.div>

      {/* CTA */}
      <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#B8924A]/15 to-transparent border border-[#B8924A]/25 rounded-2xl p-6 text-center">
        <h3 className="font-heading font-bold text-white text-lg mb-2">Want Us to Handle All of This?</h3>
        <p className="font-body text-[#7A7A7A] text-sm mb-5 max-w-md mx-auto">
          Our team sends, tracks, and follows up on every dispute for you — faster results, zero paperwork on your end.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/contact" size="sm">
            Get Professional Help <ArrowRight size={15} />
          </Button>
          <Button variant="secondary" size="sm" onClick={onReset}>
            <RefreshCw size={14} /> Generate New Package
          </Button>
        </div>
      </motion.div>

    </motion.div>
  )
}

const defaultPersonal = {
  yourName: '', yourAddress: '', yourCity: '', yourState: '', yourZip: ''
}

export default function DisputeAutopilot() {
  const [step, setStep] = useState(0)
  const [personal, setPersonal] = useState({ ...defaultPersonal })
  const [items, setItems] = useState<DisputeItemInput[]>([emptyItem()])
  const [personalErrors, setPersonalErrors] = useState<Partial<typeof defaultPersonal>>({})
  const [itemErrors, setItemErrors] = useState<Record<number, Partial<Omit<DisputeItemInput, 'bureaus'> & { bureaus: string }>>>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [result, setResult] = useState<GeneratedLetter[] | null>(null)

  function setP(field: keyof typeof defaultPersonal, value: string) {
    setPersonal(prev => ({ ...prev, [field]: value }))
    if (personalErrors[field]) setPersonalErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function setItem(index: number, field: keyof DisputeItemInput, value: string | string[]) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
    if (itemErrors[index]?.[field as keyof typeof itemErrors[0]]) {
      setItemErrors(prev => ({
        ...prev,
        [index]: { ...prev[index], [field]: undefined }
      }))
    }
  }

  function toggleBureau(index: number, bureau: string) {
    const current = items[index].bureaus
    const next = current.includes(bureau)
      ? current.filter(b => b !== bureau)
      : [...current, bureau]
    setItem(index, 'bureaus', next)
  }

  function addItem() {
    if (items.length < 6) setItems(prev => [...prev, emptyItem()])
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
    setItemErrors(prev => {
      const next = { ...prev }
      delete next[index]
      return next
    })
  }

  function validatePersonal(): boolean {
    const e: Partial<typeof defaultPersonal> = {}
    if (!personal.yourName.trim()) e.yourName = 'Required'
    if (!personal.yourAddress.trim()) e.yourAddress = 'Required'
    if (!personal.yourCity.trim()) e.yourCity = 'Required'
    if (!personal.yourState) e.yourState = 'Required'
    if (!personal.yourZip.trim()) e.yourZip = 'Required'
    setPersonalErrors(e)
    return Object.keys(e).length === 0
  }

  function validateItems(): boolean {
    const errs: typeof itemErrors = {}
    items.forEach((item, i) => {
      const e: Partial<Omit<DisputeItemInput, 'bureaus'> & { bureaus: string }> = {}
      if (!item.creditorName.trim()) e.creditorName = 'Required'
      if (!item.accountNumber.trim()) e.accountNumber = 'Required'
      if (!item.disputeReason) e.disputeReason = 'Required'
      if (item.bureaus.length === 0) e.bureaus = 'Select at least one bureau'
      if (Object.keys(e).length > 0) errs[i] = e
    })
    setItemErrors(errs)
    return Object.keys(errs).length === 0
  }

  function nextStep() {
    if (step === 0 && !validatePersonal()) return
    if (step === 1 && !validateItems()) return
    setStep(s => Math.min(s + 1, STEPS.length - 1))
  }

  function backStep() {
    setStep(s => Math.max(s - 1, 0))
  }

  async function handleGenerate() {
    setLoading(true)
    setApiError(null)
    try {
      const packageInput: DisputePackageInput = { ...personal, items }
      const pkg = await generateDisputePackage(packageInput)
      setResult(pkg.letters)
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setStep(0)
    setPersonal({ ...defaultPersonal })
    setItems([emptyItem()])
    setPersonalErrors({})
    setItemErrors({})
    setApiError(null)
    setResult(null)
  }

  const totalLetters = items.reduce((sum, item) => sum + item.bureaus.length, 0)

  return (
    <PageWrapper dark noPaddingTop>
      <SEOHead
        title="AI Dispute Autopilot — Generate Your Full Dispute Package"
        description="Let AI automatically handle your entire credit dispute process. Enter all your negative items and generate a complete, ready-to-mail dispute package in seconds."
        canonicalPath="/ai-dispute-autopilot"
        keywords="AI dispute autopilot, credit dispute package, bulk dispute letters, automated credit repair, FCRA dispute letters"
      />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] to-[#0A0A0A] pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,146,74,0.12),transparent_70%)]" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/25 font-heading font-semibold text-[0.68rem] tracking-[0.18em] uppercase text-[#D4AF72] mb-5">
                <Zap size={11} className="text-[#D4AF72]" />
                AI-Powered Automation
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
              Dispute <span className="bg-gradient-to-r from-[#D4AF72] via-[#B8924A] to-[#8B6A2E] bg-clip-text text-transparent">Autopilot</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Enter all your negative credit items at once. Our AI generates your complete, bureau-specific dispute package — ready to mail in minutes.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 mt-8">
              {[
                { icon: Brain, label: 'Gemini AI Written' },
                { icon: Package, label: 'Full Package at Once' },
                { icon: Shield, label: 'FCRA Compliant' },
                { icon: Building2, label: 'All 3 Bureaus' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/50 font-body text-sm">
                  <Icon size={14} className="text-[#B8924A]" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main tool */}
      <section className="bg-[#0A0A0A] py-16">
        <div className="max-w-2xl mx-auto px-4">

          {result ? (
            <PackageResult letters={result} packageName={personal.yourName} onReset={reset} />
          ) : (
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
              <ProgressBar step={step} />

              <AnimatePresence mode="wait">

                {/* ── Step 0: Personal Info ─────────────── */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2 className="font-heading font-bold text-xl text-white mb-1">Your Information</h2>
                    <p className="font-body text-white/40 text-sm mb-7">This goes on every letter as the sender information.</p>

                    <div className="space-y-5">
                      <div>
                        <label className="block font-body text-sm font-semibold text-white/70 mb-1.5">
                          Full Legal Name <span className="text-red-400">*</span>
                        </label>
                        <StyledInput value={personal.yourName} onChange={v => setP('yourName', v)} placeholder="e.g. Marcus Williams" />
                        {personalErrors.yourName && <p className="text-red-400 text-xs mt-1">{personalErrors.yourName}</p>}
                      </div>
                      <div>
                        <label className="block font-body text-sm font-semibold text-white/70 mb-1.5">
                          Street Address <span className="text-red-400">*</span>
                        </label>
                        <StyledInput value={personal.yourAddress} onChange={v => setP('yourAddress', v)} placeholder="e.g. 123 Main Street, Apt 4B" />
                        {personalErrors.yourAddress && <p className="text-red-400 text-xs mt-1">{personalErrors.yourAddress}</p>}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-body text-sm font-semibold text-white/70 mb-1.5">City <span className="text-red-400">*</span></label>
                          <StyledInput value={personal.yourCity} onChange={v => setP('yourCity', v)} placeholder="Atlanta" />
                          {personalErrors.yourCity && <p className="text-red-400 text-xs mt-1">{personalErrors.yourCity}</p>}
                        </div>
                        <div>
                          <label className="block font-body text-sm font-semibold text-white/70 mb-1.5">State <span className="text-red-400">*</span></label>
                          <StyledSelect value={personal.yourState} onChange={v => setP('yourState', v)} options={US_STATES} placeholder="State" />
                          {personalErrors.yourState && <p className="text-red-400 text-xs mt-1">{personalErrors.yourState}</p>}
                        </div>
                        <div>
                          <label className="block font-body text-sm font-semibold text-white/70 mb-1.5">ZIP <span className="text-red-400">*</span></label>
                          <StyledInput value={personal.yourZip} onChange={v => setP('yourZip', v)} placeholder="30301" />
                          {personalErrors.yourZip && <p className="text-red-400 text-xs mt-1">{personalErrors.yourZip}</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 1: Items ─────────────────────── */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2 className="font-heading font-bold text-xl text-white mb-1">Negative Items</h2>
                    <p className="font-body text-white/40 text-sm mb-7">Add each negative item you want to dispute. You can add up to 6 items.</p>

                    <div className="space-y-5">
                      {items.map((item, index) => (
                        <div key={index} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 relative">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-heading font-bold text-[#B8924A] text-xs tracking-wider uppercase">
                              Item {index + 1}
                            </span>
                            {items.length > 1 && (
                              <button
                                onClick={() => removeItem(index)}
                                className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block font-body text-xs font-semibold text-white/60 mb-1.5">Creditor / Collection Agency <span className="text-red-400">*</span></label>
                              <StyledInput value={item.creditorName} onChange={v => setItem(index, 'creditorName', v)} placeholder="e.g. Midland Credit Mgmt" />
                              {itemErrors[index]?.creditorName && <p className="text-red-400 text-xs mt-1">{itemErrors[index].creditorName}</p>}
                            </div>
                            <div>
                              <label className="block font-body text-xs font-semibold text-white/60 mb-1.5">Account Number <span className="text-red-400">*</span></label>
                              <StyledInput value={item.accountNumber} onChange={v => setItem(index, 'accountNumber', v)} placeholder="e.g. XXXX-1234" />
                              {itemErrors[index]?.accountNumber && <p className="text-red-400 text-xs mt-1">{itemErrors[index].accountNumber}</p>}
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="block font-body text-xs font-semibold text-white/60 mb-1.5">Dispute Reason <span className="text-red-400">*</span></label>
                            <StyledSelect value={item.disputeReason} onChange={v => setItem(index, 'disputeReason', v)} options={DISPUTE_REASONS} placeholder="Select reason" />
                            {itemErrors[index]?.disputeReason && <p className="text-red-400 text-xs mt-1">{itemErrors[index].disputeReason}</p>}
                          </div>

                          <div>
                            <label className="block font-body text-xs font-semibold text-white/60 mb-2">
                              Dispute With <span className="text-red-400">*</span>
                              <span className="ml-1 text-white/25 font-normal">(select all that apply)</span>
                            </label>
                            <div className="flex gap-2 flex-wrap">
                              {BUREAUS.map(bureau => (
                                <button
                                  key={bureau}
                                  type="button"
                                  onClick={() => toggleBureau(index, bureau)}
                                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-heading font-semibold transition-all duration-200 ${
                                    item.bureaus.includes(bureau)
                                      ? BUREAU_COLORS[bureau]
                                      : 'bg-white/4 border-white/10 text-white/40 hover:border-white/20'
                                  }`}
                                >
                                  {item.bureaus.includes(bureau) && <CheckCircle2 size={12} />}
                                  {bureau}
                                </button>
                              ))}
                            </div>
                            {itemErrors[index]?.bureaus && <p className="text-red-400 text-xs mt-1">{itemErrors[index].bureaus}</p>}
                          </div>
                        </div>
                      ))}

                      {items.length < 6 && (
                        <button
                          onClick={addItem}
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-dashed border-white/15 text-white/40 hover:text-[#B8924A] hover:border-[#B8924A]/40 font-body text-sm transition-all duration-200"
                        >
                          <Plus size={16} />
                          Add Another Item {items.length < 6 ? `(${6 - items.length} remaining)` : ''}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Review ────────────────────── */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2 className="font-heading font-bold text-xl text-white mb-1">Review & Generate</h2>
                    <p className="font-body text-white/40 text-sm mb-7">Confirm your dispute details before generating the package.</p>

                    {/* Personal summary */}
                    <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 mb-5">
                      <p className="font-heading font-semibold text-[#B8924A] text-xs tracking-wider uppercase mb-3">Sender</p>
                      <p className="font-body text-white text-sm font-semibold">{personal.yourName}</p>
                      <p className="font-body text-white/50 text-sm">{personal.yourAddress}, {personal.yourCity}, {personal.yourState} {personal.yourZip}</p>
                    </div>

                    {/* Items summary */}
                    <div className="space-y-3 mb-6">
                      {items.map((item, i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <p className="font-body text-white text-sm font-semibold">{item.creditorName}</p>
                            <span className="font-body text-white/40 text-xs flex-shrink-0">{item.accountNumber}</span>
                          </div>
                          <p className="font-body text-white/50 text-xs mb-3 leading-relaxed">{item.disputeReason}</p>
                          <div className="flex gap-1.5 flex-wrap">
                            {item.bureaus.map(b => (
                              <span key={b} className={`px-2 py-0.5 rounded-full border text-[10px] font-heading font-bold ${BUREAU_COLORS[b]}`}>
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total count */}
                    <div className="flex items-center justify-center gap-3 py-4 bg-[#B8924A]/8 border border-[#B8924A]/20 rounded-xl mb-6">
                      <Brain size={18} className="text-[#D4AF72]" />
                      <p className="font-heading font-bold text-white text-sm">
                        AI will generate <span className="text-[#D4AF72]">{totalLetters} letter{totalLetters !== 1 ? 's' : ''}</span> across {items.reduce<string[]>((acc, item) => [...new Set([...acc, ...item.bureaus])], []).length} bureau{items.reduce<string[]>((acc, item) => [...new Set([...acc, ...item.bureaus])], []).length !== 1 ? 's' : ''}
                      </p>
                    </div>

                    {apiError && (
                      <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/25 rounded-xl mb-5">
                        <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 font-body text-sm">{apiError}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              {!result && (
                <div className="flex gap-3 mt-8">
                  {step > 0 && (
                    <button
                      onClick={backStep}
                      disabled={loading}
                      className="px-5 py-2.5 rounded-xl border border-white/12 text-white/60 hover:text-white hover:bg-white/5 font-body font-semibold text-sm transition-all disabled:opacity-40"
                    >
                      Back
                    </button>
                  )}
                  {step < STEPS.length - 1 ? (
                    <Button onClick={nextStep} size="md" className="flex-1 justify-center">
                      Continue <ArrowRight size={15} />
                    </Button>
                  ) : (
                    <Button onClick={handleGenerate} disabled={loading} size="md" className="flex-1 justify-center">
                      {loading ? (
                        <><Loader2 size={16} className="animate-spin" /> Generating {totalLetters} Letter{totalLetters !== 1 ? 's' : ''}…</>
                      ) : (
                        <><Brain size={16} /> Generate Dispute Package</>
                      )}
                    </Button>
                  )}
                </div>
              )}

              {loading && (
                <p className="text-white/25 font-body text-xs text-center mt-3">
                  Generating {totalLetters} letters in parallel via Google Gemini AI…
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Feature strip */}
      {!result && (
        <section className="bg-[#0A0A0A] pb-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Package, title: 'Full Package at Once', desc: 'Add up to 6 items across all 3 bureaus — letters generated simultaneously' },
                { icon: Brain, title: 'Bureau-Specific Letters', desc: 'Each letter is tailored to the correct bureau address and format' },
                { icon: Shield, title: 'FCRA Section 611', desc: 'Every letter cites your legal rights and demands investigation within 30 days' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center p-5 bg-white/[0.03] border border-white/8 rounded-2xl">
                  <div className="w-11 h-11 rounded-xl bg-[#B8924A]/15 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-[#B8924A]" />
                  </div>
                  <h4 className="font-heading font-bold text-white text-sm mb-1">{title}</h4>
                  <p className="font-body text-white/40 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  )
}
