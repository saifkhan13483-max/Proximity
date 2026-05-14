import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, ChevronRight, ChevronLeft, Loader2, CheckCircle,
  TrendingUp, AlertTriangle, Star, Target, Clock, Zap,
  FileText, DollarSign, BarChart2, Shield, RefreshCw, ArrowRight,
  Wand2, Save,
} from 'lucide-react'
import PageWrapper from '@components/layout/PageWrapper'
import SEOHead from '@components/layout/SEOHead'
import Section from '@components/layout/Section'
import SectionLabel from '@components/ui/SectionLabel'
import { Button } from '@components/ui'
import { generateCreditReview } from '@services/geminiService'
import type { CreditReviewInput, CreditReviewResult, ActionStep, DisputeItemInput } from '@services/geminiService'
import { fadeUp, staggerContainer } from '@lib/animations'
import { useWorkflowStore } from '@store/workflowStore'
import { useAuthStore } from '@store/authStore'
import { saveCreditReview } from '@services/disputeHistoryService'

const STEPS = ['Your Profile', 'Credit Details', 'Your Goals', 'Review']

const scoreRangeOptions = [
  { value: 'Very Poor (300–579)', label: 'Very Poor (300–579)' },
  { value: 'Fair (580–669)', label: 'Fair (580–669)' },
  { value: 'Good (670–739)', label: 'Good (670–739)' },
  { value: 'Very Good (740–799)', label: 'Very Good (740–799)' },
  { value: 'Exceptional (800–850)', label: 'Exceptional (800–850)' },
]

const paymentHistoryOptions = [
  { value: 'Always on time', label: 'Always on time' },
  { value: '1-2 late payments', label: '1–2 late payments (30 days)' },
  { value: 'Several late payments', label: 'Several late payments' },
  { value: 'Collections or charge-offs', label: 'Collections or charge-offs' },
  { value: 'Bankruptcy or judgments', label: 'Bankruptcy or judgments' },
]

const creditAgeOptions = [
  { value: 'Less than 1 year', label: 'Less than 1 year' },
  { value: '1-2 years', label: '1–2 years' },
  { value: '3-5 years', label: '3–5 years' },
  { value: '6-10 years', label: '6–10 years' },
  { value: 'Over 10 years', label: 'Over 10 years' },
]

const goalOptions = [
  { value: 'Buy a home', label: 'Buy a home' },
  { value: 'Buy a car', label: 'Buy a car' },
  { value: 'Get a personal loan', label: 'Get a personal loan' },
  { value: 'Lower interest rates', label: 'Lower interest rates' },
  { value: 'Business credit', label: 'Build business credit' },
  { value: 'General improvement', label: 'General credit improvement' },
]

const goalScoreOptions = [
  { value: '620', label: '620 — Minimum mortgage qualification' },
  { value: '670', label: '670 — Good credit tier' },
  { value: '700', label: '700 — Strong credit standing' },
  { value: '740', label: '740 — Very Good credit' },
  { value: '780', label: '780 — Near-prime rates' },
  { value: '800', label: '800+ — Exceptional credit' },
]

const PRIORITY_COLORS: Record<ActionStep['priority'], string> = {
  High: 'text-red-400 bg-red-400/10 border-red-400/30',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  Low: 'text-green-400 bg-green-400/10 border-green-400/30',
}

const defaultInput: CreditReviewInput = {
  firstName: '',
  currentScore: '',
  scoreRange: '',
  negativeItems: '',
  totalDebt: '',
  monthlyIncome: '',
  paymentHistory: '',
  creditAge: '',
  creditUtilization: '',
  goalScore: '',
  primaryGoal: '',
  additionalContext: '',
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <motion.div
              animate={{
                backgroundColor: i < step ? '#B8924A' : i === step ? '#B8924A' : 'rgba(255,255,255,0.1)',
                borderColor: i <= step ? '#B8924A' : 'rgba(255,255,255,0.15)',
              }}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-heading"
            >
              {i < step ? <CheckCircle size={14} className="text-white" /> : (
                <span className={i === step ? 'text-white' : 'text-white/30'}>{i + 1}</span>
              )}
            </motion.div>
            <span className={`hidden sm:block text-xs font-body font-medium ${i === step ? 'text-gold-primary' : i < step ? 'text-white/60' : 'text-white/25'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className="hidden sm:block w-8 lg:w-16 h-px bg-white/10 mx-1" />
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-white/10 rounded-full h-1">
        <motion.div
          className="h-1 rounded-full bg-gold-gradient"
          animate={{ width: `${((step) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
}

function Field({
  label, required, error, children
}: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-body text-sm font-semibold text-white/80 mb-1.5">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

function StyledInput({ value, onChange, placeholder, type = 'text', prefix }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; prefix?: string
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-primary font-semibold">{prefix}</span>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white/5 border border-white/15 rounded-lg py-3 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30 transition-all ${prefix ? 'pl-7 pr-4' : 'px-4'}`}
      />
    </div>
  )
}

function StyledSelect({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30 transition-all appearance-none [&>option]:bg-[#1a1a1a] [&>option]:text-white"
    >
      <option value="" disabled>{placeholder || 'Select…'}</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

function StyledTextarea({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30 transition-all resize-none"
    />
  )
}

function ResultCard({
  result,
  onReset,
  onAutomate,
  savedToAccount,
}: {
  result: CreditReviewResult
  onReset: () => void
  onAutomate?: () => void
  savedToAccount?: boolean
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-primary/15 border border-gold-primary/30 mb-4">
          <CheckCircle size={16} className="text-gold-primary" />
          <span className="text-gold-primary font-heading font-semibold text-sm">AI Credit Review Complete</span>
        </div>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">Your Personalized Credit Report</h2>
        <p className="text-white/50 font-body text-sm">Powered by Google Gemini AI — for informational purposes only</p>
      </motion.div>

      {/* Overall Assessment */}
      <motion.div variants={fadeUp} className="bg-gradient-to-br from-gold-primary/15 to-gold-primary/5 border border-gold-primary/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gold-primary/20 flex items-center justify-center">
            <Brain size={20} className="text-gold-primary" />
          </div>
          <h3 className="font-heading font-bold text-white text-lg">Overall Assessment</h3>
        </div>
        <p className="font-body text-white/80 leading-relaxed">{result.overallAssessment}</p>
      </motion.div>

      {/* Score Analysis */}
      <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
            <BarChart2 size={20} className="text-blue-400" />
          </div>
          <h3 className="font-heading font-bold text-white text-lg">Credit Score Analysis</h3>
        </div>
        <p className="font-body text-white/70 leading-relaxed">{result.creditScoreAnalysis}</p>
      </motion.div>

      {/* Strengths & Issues */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star size={18} className="text-green-400" />
            <h3 className="font-heading font-bold text-white">Key Strengths</h3>
          </div>
          <ul className="space-y-2">
            {result.keyStrengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-white/70">
                <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-red-400" />
            <h3 className="font-heading font-bold text-white">Critical Issues</h3>
          </div>
          <ul className="space-y-2">
            {result.criticalIssues.map((issue, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-white/70">
                <AlertTriangle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Action Plan */}
      <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gold-primary/15 flex items-center justify-center">
            <Target size={20} className="text-gold-primary" />
          </div>
          <h3 className="font-heading font-bold text-white text-lg">Your Action Plan</h3>
        </div>
        <div className="space-y-4">
          {result.actionPlan.map((step, i) => (
            <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/8">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gold-primary/20 flex items-center justify-center text-gold-primary font-heading font-bold text-xs">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="font-body font-semibold text-white text-sm">{step.action}</p>
                  <span className={`flex-shrink-0 text-[11px] font-heading font-bold px-2 py-0.5 rounded-full border ${PRIORITY_COLORS[step.priority]}`}>
                    {step.priority}
                  </span>
                </div>
                <p className="font-body text-white/50 text-xs">{step.impact}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock size={11} className="text-gold-primary/60" />
                  <span className="text-gold-primary/60 font-body text-[11px]">{step.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline & Projection */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={18} className="text-gold-primary" />
            <h3 className="font-heading font-bold text-white">Timeline Estimate</h3>
          </div>
          <p className="font-body text-white/70 text-sm leading-relaxed">{result.timelineEstimate}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-green-400" />
            <h3 className="font-heading font-bold text-white">Score Projection</h3>
          </div>
          <p className="font-body text-white/70 text-sm leading-relaxed">{result.scoreProjection}</p>
        </div>
      </motion.div>

      {/* Priority Disputes */}
      {result.priorityDisputes && result.priorityDisputes.length > 0 && (
        <motion.div variants={fadeUp} className="bg-amber-500/8 border border-amber-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <FileText size={20} className="text-amber-400" />
            </div>
            <h3 className="font-heading font-bold text-white text-lg">Priority Disputes to File</h3>
          </div>
          <ul className="space-y-2">
            {result.priorityDisputes.map((item, i) => (
              <li key={i} className="flex items-center gap-2 font-body text-sm text-white/70">
                <Shield size={13} className="text-amber-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Automate CTA — primary action */}
      {onAutomate && result.priorityDisputes && result.priorityDisputes.length > 0 && (
        <motion.div variants={fadeUp} className="bg-gradient-to-br from-gold-primary/25 to-gold-primary/5 border-2 border-gold-primary/40 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold-primary/10 blur-2xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-primary/20 border border-gold-primary/40 mb-4">
              <Wand2 size={13} className="text-gold-primary" />
              <span className="text-gold-primary font-heading font-bold text-[11px] uppercase tracking-wider">One-Click Automation</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-2">
              Automate Your Disputes Instantly
            </h3>
            <p className="font-body text-white/60 text-sm mb-2 max-w-sm mx-auto">
              We've identified <span className="text-gold-primary font-semibold">{result.priorityDisputes.length} priority dispute{result.priorityDisputes.length !== 1 ? 's' : ''}</span> from your review. One click will pre-fill your complete dispute package — ready to generate in seconds.
            </p>
            <ul className="flex flex-wrap justify-center gap-2 mb-6">
              {result.priorityDisputes.slice(0, 4).map((item, i) => (
                <li key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-body text-[11px] text-white/60">
                  <Shield size={10} className="text-gold-primary flex-shrink-0" />
                  <span className="truncate max-w-[180px]">{item}</span>
                </li>
              ))}
              {result.priorityDisputes.length > 4 && (
                <li className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-body text-[11px] text-white/40">
                  +{result.priorityDisputes.length - 4} more
                </li>
              )}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onAutomate}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-near-black font-heading font-bold text-sm shadow-gold-md hover:shadow-gold-lg transition-all duration-200"
              >
                <Wand2 size={16} />
                Auto-Generate Dispute Package
                <ArrowRight size={16} />
              </button>
              <Button href="/contact" variant="secondary" size="md">
                Get Expert Help
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Saved confirmation */}
      {savedToAccount && (
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25"
        >
          <Save size={16} className="text-emerald-400 flex-shrink-0" />
          <p className="font-body text-emerald-400 text-sm">
            This review has been saved to your account — find it in your dashboard.
          </p>
        </motion.div>
      )}

      {/* Secondary CTA */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
        <Button href="/contact" size="md" className="flex-1 justify-center">
          Get Expert Help <ArrowRight size={16} />
        </Button>
        <Button variant="secondary" size="md" onClick={onReset} className="flex-1 justify-center">
          <RefreshCw size={16} /> Start New Review
        </Button>
      </motion.div>

      {/* Disclaimer */}
      <motion.div variants={fadeUp}>
        <p className="font-body text-white/30 text-xs text-center leading-relaxed">{result.disclaimer}</p>
      </motion.div>
    </motion.div>
  )
}

const DISPUTE_REASON_KEYWORDS: Array<{ keywords: string[]; reason: string }> = [
  { keywords: ['late payment', 'late payments', 'payment history'], reason: 'Incorrect payment history — payments were on time' },
  { keywords: ['collection', 'collections'], reason: 'Collection account — debt is not valid or already paid' },
  { keywords: ['charge-off', 'charge off', 'chargeoff'], reason: 'Charge-off amount is incorrect' },
  { keywords: ['not mine', 'does not belong', 'identity theft', 'fraud'], reason: 'Account does not belong to me (identity theft or mixed file)' },
  { keywords: ['paid', 'settled', 'pay'], reason: 'Account was paid in full but still shows as unpaid or delinquent' },
  { keywords: ['7-year', '7 year', 'reporting limit', 'time limit'], reason: 'Account is past the 7-year reporting limit and should be removed' },
  { keywords: ['duplicate'], reason: 'Duplicate account listing on credit report' },
  { keywords: ['balance', 'incorrect balance', 'limit'], reason: 'Incorrect balance or credit limit reported' },
  { keywords: ['bankruptcy'], reason: 'Account included in bankruptcy but still showing negative' },
  { keywords: ['status', 'open', 'closed'], reason: 'Incorrect account status (open vs. closed)' },
]

function mapDisputeReason(text: string): string {
  const lower = text.toLowerCase()
  for (const { keywords, reason } of DISPUTE_REASON_KEYWORDS) {
    if (keywords.some((k) => lower.includes(k))) return reason
  }
  return 'Account does not belong to me (identity theft or mixed file)'
}

function parseDisputeItems(priorityDisputes: string[], firstName: string): DisputeItemInput[] {
  return priorityDisputes.map((item) => {
    const lower = item.toLowerCase()
    let creditorName = item
    const fromMatch = item.match(/from\s+([^—\-–(]+)/i)
    const withMatch = item.match(/with\s+([^—\-–(]+)/i)
    const onMatch = item.match(/on\s+([^—\-–(]+)/i)
    if (fromMatch) creditorName = fromMatch[1].trim()
    else if (withMatch) creditorName = withMatch[1].trim()
    else if (onMatch) creditorName = onMatch[1].trim()
    else if (item.length > 40) creditorName = item.substring(0, 40).trim() + '…'

    const acctMatch = item.match(/(?:account|acct)[^0-9]*([0-9X*-]{4,})/i) ||
      item.match(/ending in\s+([0-9X*]{4})/i)
    const accountNumber = acctMatch ? acctMatch[1] : 'See credit report'

    return {
      creditorName: creditorName.replace(/[.,;]+$/, '').trim(),
      accountNumber,
      disputeReason: mapDisputeReason(lower),
      bureaus: ['Equifax', 'Experian', 'TransUnion'],
    }
  })
}

export default function CreditReviewer() {
  const navigate = useNavigate()
  const { setPendingDisputes, setLastCreditReview } = useWorkflowStore()
  const { user } = useAuthStore()

  const [step, setStep] = useState(0)
  const [input, setInput] = useState<CreditReviewInput>(defaultInput)
  const [errors, setErrors] = useState<Partial<Record<keyof CreditReviewInput, string>>>({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CreditReviewResult | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [savedToAccount, setSavedToAccount] = useState(false)

  function set(field: keyof CreditReviewInput, value: string) {
    setInput(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function validateStep(s: number): boolean {
    const newErrors: Partial<Record<keyof CreditReviewInput, string>> = {}
    if (s === 0) {
      if (!input.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!input.currentScore.trim()) newErrors.currentScore = 'Current score is required'
      if (!input.scoreRange) newErrors.scoreRange = 'Please select a score range'
    }
    if (s === 1) {
      if (!input.negativeItems.trim()) newErrors.negativeItems = 'This field is required'
      if (!input.totalDebt.trim()) newErrors.totalDebt = 'Total debt is required'
      if (!input.monthlyIncome.trim()) newErrors.monthlyIncome = 'Monthly income is required'
      if (!input.paymentHistory) newErrors.paymentHistory = 'Please select payment history'
      if (!input.creditAge) newErrors.creditAge = 'Please select credit age'
      if (!input.creditUtilization.trim()) newErrors.creditUtilization = 'Utilization is required'
    }
    if (s === 2) {
      if (!input.goalScore) newErrors.goalScore = 'Please select a goal score'
      if (!input.primaryGoal) newErrors.primaryGoal = 'Please select your primary goal'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function next() {
    if (validateStep(step)) setStep(s => s + 1)
  }

  function back() {
    setStep(s => s - 1)
    setErrors({})
  }

  async function handleSubmit() {
    if (!validateStep(2)) return
    setLoading(true)
    setApiError(null)
    try {
      const review = await generateCreditReview(input)
      setResult(review)
      setLastCreditReview(review)
      setStep(4)

      if (user) {
        try {
          await saveCreditReview(user.id, input.firstName, input.currentScore, input.goalScore, review)
          setSavedToAccount(true)
        } catch {
          // silent — saving to account is non-critical
        }
      }
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleAutomate() {
    if (!result?.priorityDisputes?.length) return
    const items = parseDisputeItems(result.priorityDisputes, input.firstName)
    setPendingDisputes(items, null)
    navigate('/ai-dispute-autopilot')
  }

  function reset() {
    setInput(defaultInput)
    setResult(null)
    setStep(0)
    setErrors({})
    setApiError(null)
    setSavedToAccount(false)
  }

  const slideVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  }

  return (
    <PageWrapper dark noPaddingTop>
      <SEOHead
        title="AI Credit Reviewer — Free Personalized Credit Analysis"
        description="Get an instant AI-powered credit review powered by Google Gemini. Receive a personalized action plan to improve your credit score fast."
        canonicalPath="/ai-credit-reviewer"
        keywords="AI credit review, credit score analysis, credit repair plan, free credit analysis, Gemini AI credit"
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
              Full AI Credit <span className="gold-gradient-text">Reviewer</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Answer a few questions about your credit profile and our Google Gemini AI will generate a comprehensive, personalized credit repair plan — instantly and for free.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 mt-8">
              {[
                { icon: Zap, label: 'Instant Analysis' },
                { icon: Brain, label: 'Gemini AI Powered' },
                { icon: Shield, label: '100% Private' },
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

      {/* Main Tool */}
      <Section dark className="py-16">
        <div className="max-w-2xl mx-auto">
          {result ? (
            <ResultCard
              result={result}
              onReset={reset}
              onAutomate={handleAutomate}
              savedToAccount={savedToAccount}
            />
          ) : (
            <div className="bg-white/4 border border-white/10 rounded-3xl p-6 md:p-10">
              <ProgressBar step={step} />

              <AnimatePresence mode="wait">
                {/* Step 0: Profile */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-heading font-bold text-xl text-white mb-1">Tell us about yourself</h2>
                    <p className="font-body text-white/45 text-sm mb-6">We'll use this to personalize your credit review.</p>
                    <div className="space-y-5">
                      <Field label="First Name" required error={errors.firstName}>
                        <StyledInput value={input.firstName} onChange={v => set('firstName', v)} placeholder="e.g. Marcus" />
                      </Field>
                      <FieldGroup>
                        <Field label="Current Credit Score" required error={errors.currentScore}>
                          <StyledInput value={input.currentScore} onChange={v => set('currentScore', v)} placeholder="e.g. 582" type="number" />
                        </Field>
                        <Field label="Score Range" required error={errors.scoreRange}>
                          <StyledSelect value={input.scoreRange} onChange={v => set('scoreRange', v)} options={scoreRangeOptions} placeholder="Select range" />
                        </Field>
                      </FieldGroup>
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Credit Details */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-heading font-bold text-xl text-white mb-1">Your credit details</h2>
                    <p className="font-body text-white/45 text-sm mb-6">The more accurate your information, the better your review.</p>
                    <div className="space-y-5">
                      <Field label="Negative Items on Report" required error={errors.negativeItems}>
                        <StyledInput
                          value={input.negativeItems}
                          onChange={v => set('negativeItems', v)}
                          placeholder="e.g. 3 collections, 1 charge-off, 2 late payments"
                        />
                      </Field>
                      <FieldGroup>
                        <Field label="Total Outstanding Debt" required error={errors.totalDebt}>
                          <StyledInput value={input.totalDebt} onChange={v => set('totalDebt', v)} placeholder="e.g. 12000" type="number" prefix="$" />
                        </Field>
                        <Field label="Monthly Income" required error={errors.monthlyIncome}>
                          <StyledInput value={input.monthlyIncome} onChange={v => set('monthlyIncome', v)} placeholder="e.g. 4500" type="number" prefix="$" />
                        </Field>
                      </FieldGroup>
                      <FieldGroup>
                        <Field label="Payment History" required error={errors.paymentHistory}>
                          <StyledSelect value={input.paymentHistory} onChange={v => set('paymentHistory', v)} options={paymentHistoryOptions} placeholder="Select history" />
                        </Field>
                        <Field label="Length of Credit History" required error={errors.creditAge}>
                          <StyledSelect value={input.creditAge} onChange={v => set('creditAge', v)} options={creditAgeOptions} placeholder="Select age" />
                        </Field>
                      </FieldGroup>
                      <Field label="Credit Utilization %" required error={errors.creditUtilization}>
                        <StyledInput
                          value={input.creditUtilization}
                          onChange={v => set('creditUtilization', v)}
                          placeholder="e.g. 78 (percentage of credit limit used)"
                          type="number"
                        />
                      </Field>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Goals */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-heading font-bold text-xl text-white mb-1">What are your goals?</h2>
                    <p className="font-body text-white/45 text-sm mb-6">Your goals shape the AI's recommendations and timeline.</p>
                    <div className="space-y-5">
                      <FieldGroup>
                        <Field label="Target Credit Score" required error={errors.goalScore}>
                          <StyledSelect value={input.goalScore} onChange={v => set('goalScore', v)} options={goalScoreOptions} placeholder="Select target" />
                        </Field>
                        <Field label="Primary Goal" required error={errors.primaryGoal}>
                          <StyledSelect value={input.primaryGoal} onChange={v => set('primaryGoal', v)} options={goalOptions} placeholder="Select goal" />
                        </Field>
                      </FieldGroup>
                      <Field label="Additional Context (Optional)">
                        <StyledTextarea
                          value={input.additionalContext}
                          onChange={v => set('additionalContext', v)}
                          placeholder="Anything else we should know? e.g. recent job change, divorce, medical debt, bankruptcy discharge date..."
                        />
                      </Field>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-heading font-bold text-xl text-white mb-1">Ready to generate your review</h2>
                    <p className="font-body text-white/45 text-sm mb-6">Here's a summary of what you've entered. Click Generate when you're ready.</p>

                    <div className="space-y-3 mb-6">
                      {[
                        { icon: Star, label: 'Name', value: input.firstName },
                        { icon: BarChart2, label: 'Current Score', value: `${input.currentScore} (${input.scoreRange})` },
                        { icon: AlertTriangle, label: 'Negative Items', value: input.negativeItems },
                        { icon: DollarSign, label: 'Total Debt', value: `$${Number(input.totalDebt).toLocaleString()}` },
                        { icon: TrendingUp, label: 'Goal Score', value: input.goalScore },
                        { icon: Target, label: 'Primary Goal', value: input.primaryGoal },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                          <Icon size={15} className="text-gold-primary flex-shrink-0" />
                          <span className="font-body text-white/40 text-sm w-28 flex-shrink-0">{label}</span>
                          <span className="font-body text-white text-sm font-medium truncate">{value}</span>
                        </div>
                      ))}
                    </div>

                    {apiError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl mb-4">
                        <p className="text-red-400 font-body text-sm">{apiError}</p>
                      </div>
                    )}

                    <div className="bg-gold-primary/8 border border-gold-primary/20 rounded-xl p-4 text-center">
                      <p className="font-body text-white/50 text-xs">
                        Your AI Credit Review will be generated using Google Gemini and is for informational purposes only.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nav Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
                <button
                  onClick={back}
                  disabled={step === 0 || loading}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-body font-semibold text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} /> Back
                </button>

                {step < 3 && (
                  <Button onClick={next} size="sm">
                    Continue <ChevronRight size={16} />
                  </Button>
                )}

                {step === 3 && (
                  <Button onClick={handleSubmit} disabled={loading} size="sm">
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Analyzing…
                      </>
                    ) : (
                      <>
                        <Brain size={16} />
                        Generate Review
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Features strip */}
      {!result && (
        <Section dark className="pb-20 pt-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Brain, title: 'Gemini AI Analysis', desc: 'Google\'s most advanced AI analyzes your full credit profile' },
                { icon: FileText, title: 'Full Action Plan', desc: 'Step-by-step dispute and improvement roadmap' },
                { icon: TrendingUp, title: 'Score Projection', desc: '6, 12, and 24 month score projections based on your data' },
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
