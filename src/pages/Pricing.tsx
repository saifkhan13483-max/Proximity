import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Zap, ArrowRight, Shield, Star, Phone } from 'lucide-react'
import { plans } from '@data/plans'
import { selectPlan } from '@services/planService'
import { useAuthStore } from '@store/authStore'
import { cn } from '@lib/utils'

const FAQS = [
  { q: 'Can I switch plans anytime?', a: 'Yes — upgrade or downgrade at any time. Changes take effect immediately and billing is prorated.' },
  { q: 'Is there a contract or commitment?', a: 'No long-term contracts. All plans are month-to-month and you can cancel anytime from your dashboard.' },
  { q: 'What if I don\'t see results?', a: 'Our VIP plan includes a full satisfaction guarantee. If we don\'t improve your score within 6 months, you get a complete refund.' },
  { q: 'How quickly will I see improvements?', a: 'Most clients see measurable improvement within 30–60 days. Significant score jumps typically occur within 3–6 months.' },
]

function ToggleSwitch({ annual, onToggle }: { annual: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn('font-body text-sm font-semibold transition-colors', !annual ? 'text-white' : 'text-white/40')}>
        Monthly
      </span>
      <button
        onClick={onToggle}
        className={cn(
          'relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none',
          annual ? 'bg-gold-gradient' : 'bg-white/15'
        )}
        aria-checked={annual}
        role="switch"
      >
        <motion.span
          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
          animate={{ left: annual ? '26px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      </button>
      <span className={cn('font-body text-sm font-semibold transition-colors', annual ? 'text-white' : 'text-white/40')}>
        Annual
        <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20">
          Save 20%
        </span>
      </span>
    </div>
  )
}

function PlanCard({
  plan,
  annual,
  currentPlan,
  onSelect,
  loading,
  loggedIn,
  delay,
}: {
  plan: (typeof plans)[0]
  annual: boolean
  currentPlan: string
  onSelect: (id: string) => void
  loading: string | null
  loggedIn: boolean
  delay: number
}) {
  const price = annual ? plan.annualPrice : plan.monthlyPrice
  const planLabel = `${plan.name} Plan`
  const isCurrentPlan = currentPlan === planLabel
  const isLoading = loading === plan.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'relative flex flex-col rounded-2xl border transition-all duration-300',
        plan.highlighted
          ? 'bg-[#131313] border-gold-primary/40 shadow-gold-lg scale-[1.02]'
          : 'bg-[#0e0e0e] border-white/8 hover:border-gold-primary/20'
      )}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-gradient text-white font-heading font-bold text-xs rounded-full shadow-gold-sm whitespace-nowrap">
            <Star size={10} fill="white" />
            {plan.badge}
          </span>
        </div>
      )}

      <div className={cn('p-6 pb-5 rounded-t-2xl bg-gradient-to-br', plan.color)}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-heading font-black text-white text-xl">{plan.name}</h3>
            <p className="font-body text-white/50 text-sm mt-0.5">{plan.description}</p>
          </div>
          {isCurrentPlan && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-body text-xs font-bold rounded-full">
              <Check size={10} />
              Active
            </span>
          )}
        </div>

        <div className="flex items-end gap-1.5 mt-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${plan.id}-${annual}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="font-heading font-black text-white text-4xl"
            >
              ${price}
            </motion.span>
          </AnimatePresence>
          <span className="font-body text-white/40 text-sm mb-1.5">/month</span>
        </div>
        {annual && (
          <p className="font-body text-white/35 text-xs mt-1">
            Billed as ${price * 12}/year · <span className="text-emerald-400">Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr</span>
          </p>
        )}
      </div>

      <div className="flex-1 p-6 space-y-2.5">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={9} className="text-emerald-400" />
            </div>
            <span className="font-body text-white/75 text-sm">{feature}</span>
          </div>
        ))}
        {plan.notIncluded?.map((feature) => (
          <div key={feature} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <X size={9} className="text-white/25" />
            </div>
            <span className="font-body text-white/25 text-sm line-through">{feature}</span>
          </div>
        ))}
      </div>

      <div className="p-6 pt-0">
        {isCurrentPlan ? (
          <div className="w-full py-3 rounded-xl border border-emerald-500/25 bg-emerald-500/8 text-emerald-400 font-heading font-bold text-sm text-center">
            Current Plan
          </div>
        ) : (
          <button
            onClick={() => onSelect(plan.id)}
            disabled={isLoading}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-bold text-sm transition-all duration-200 disabled:opacity-60',
              plan.highlighted
                ? 'bg-gold-gradient text-white shadow-gold-sm hover:shadow-gold-md'
                : 'bg-white/8 hover:bg-white/12 text-white border border-white/10 hover:border-gold-primary/25'
            )}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing…
              </span>
            ) : (
              <>
                {loggedIn ? (
                  plan.highlighted ? <><Zap size={14} /> {plan.ctaLabel}</> : <>{plan.ctaLabel} <ArrowRight size={14} /></>
                ) : (
                  <>{plan.ctaLabel} <ArrowRight size={14} /></>
                )}
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const [successPlan, setSuccessPlan] = useState<string | null>(null)
  const [error, setError] = useState('')
  const { user, isAuthenticated, setAuth, token } = useAuthStore()
  const loggedIn = isAuthenticated()
  const navigate = useNavigate()

  async function handleSelect(planId: string) {
    if (!loggedIn) {
      navigate('/register', { state: { from: '/pricing' } })
      return
    }
    setError('')
    setLoading(planId)
    try {
      const { plan } = await selectPlan(planId)
      if (user && token) {
        setAuth({ ...user, plan }, token)
      }
      setSuccessPlan(plan)
      setTimeout(() => setSuccessPlan(null), 4000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to update plan')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-primary/6 rounded-full blur-[80px]" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-gold-primary/10 border border-gold-primary/20 rounded-full px-4 py-1.5 mb-5">
              <Shield size={13} className="text-gold-primary" />
              <span className="font-body text-gold-primary text-xs font-semibold tracking-wider uppercase">Transparent Pricing</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Choose Your <span className="gold-gradient-text">Credit Repair</span> Plan
            </h1>
            <p className="font-body text-white/50 text-lg max-w-2xl mx-auto mb-8">
              No hidden fees, no long-term contracts. Start with any plan and scale as your credit improves.
            </p>
            <ToggleSwitch annual={annual} onToggle={() => setAnnual((v) => !v)} />
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <AnimatePresence>
            {successPlan && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mb-6 max-w-lg mx-auto bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-5 py-3.5 text-center"
              >
                <p className="font-body text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2">
                  <Check size={15} />
                  You're now on the <strong>{successPlan}</strong>!
                </p>
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6 max-w-lg mx-auto bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-3.5 text-center font-body text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                annual={annual}
                currentPlan={user?.plan || ''}
                onSelect={handleSelect}
                loading={loading}
                loggedIn={loggedIn}
                delay={i * 0.07}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 max-w-2xl mx-auto text-center"
          >
            <p className="font-body text-white/30 text-sm flex flex-wrap items-center justify-center gap-4">
              <span className="flex items-center gap-1.5"><Check size={12} className="text-gold-primary" /> Cancel anytime</span>
              <span className="flex items-center gap-1.5"><Check size={12} className="text-gold-primary" /> No setup fees</span>
              <span className="flex items-center gap-1.5"><Check size={12} className="text-gold-primary" /> Secure & encrypted</span>
              <span className="flex items-center gap-1.5"><Check size={12} className="text-gold-primary" /> 30-day free trial</span>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-3xl font-black text-white mb-2">Frequently Asked Questions</h2>
            <p className="font-body text-white/40 text-sm">Everything you need to know about our plans</p>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#0e0e0e] border border-white/8 rounded-xl p-5"
              >
                <h3 className="font-heading font-bold text-white text-sm mb-2">{faq.q}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl font-black text-white mb-2">Not sure which plan is right for you?</h2>
            <p className="font-body text-white/40 text-sm mb-6">Talk to a credit specialist — we'll match you to the perfect plan for your situation.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-gold-gradient text-white font-heading font-bold text-sm shadow-gold-sm hover:shadow-gold-md transition-all"
              >
                Book Free Consultation <ArrowRight size={14} />
              </a>
              <a
                href="tel:+18005550192"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-gold-primary/25 text-gold-primary font-body font-semibold text-sm hover:bg-gold-primary/8 transition-all"
              >
                <Phone size={14} />
                (800) 555-0192
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
