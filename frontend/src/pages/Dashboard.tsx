import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield, TrendingUp, FileText, BarChart2, LogOut,
  User, CheckCircle, Clock, Star, ArrowRight, Bell, Zap, CreditCard,
} from 'lucide-react'
import { useAuthStore } from '@store/authStore'
import { plans } from '@data/plans'
import ProximityLogo from '@components/ui/ProximityLogo'

const STAT_CARDS = [
  { label: 'Credit Score', value: '—', sub: 'Link your report to track', icon: TrendingUp, color: 'from-gold-primary/20 to-gold-dark/10' },
  { label: 'Disputes Filed', value: '0', sub: 'No disputes yet', icon: FileText, color: 'from-blue-500/10 to-blue-600/5' },
  { label: 'Items Resolved', value: '0', sub: 'Keep going!', icon: CheckCircle, color: 'from-emerald-500/10 to-emerald-600/5' },
  { label: 'Days Active', value: '1', sub: 'Member since today', icon: Clock, color: 'from-purple-500/10 to-purple-600/5' },
]

const QUICK_ACTIONS = [
  { label: 'Start Credit Analysis', desc: 'Get a full 3-bureau review', icon: BarChart2, href: '/services#credit-analysis' },
  { label: 'File a Dispute', desc: 'Remove inaccurate items', icon: FileText, href: '/services#dispute-filing' },
  { label: 'Score Monitoring', desc: 'Real-time credit alerts', icon: TrendingUp, href: '/services#score-monitoring' },
  { label: 'Book Consultation', desc: 'Speak with an expert', icon: Star, href: '/contact' },
]

const PLAN_BENEFITS: Record<string, string[]> = {
  'Free Consultation': ['Initial credit report review', 'One-time consultation session'],
  'Basic Plan': ['Up to 5 disputes/month', 'Monthly progress report', 'Email support'],
  'Standard Plan': ['Unlimited dispute letters', 'Credit score monitoring', 'Phone & live chat support'],
  'Premium Plan': ['Dedicated credit advisor', 'Weekly strategy sessions', 'Priority dispute processing'],
  'VIP Plan': ['Unlimited advisor access', 'Identity theft protection', '72-hour dispute processing', 'Satisfaction guarantee'],
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: 'easeOut' },
  }
}

export default function Dashboard() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently'

  const currentPlan = user?.plan || 'Free Consultation'
  const benefits = PLAN_BENEFITS[currentPlan] || []
  const isUpgradeable = currentPlan === 'Free Consultation' || currentPlan === 'Basic Plan'

  const matchedPlan = plans.find((p) => `${p.name} Plan` === currentPlan)
  const nextPlan = matchedPlan
    ? plans[Math.min(plans.indexOf(matchedPlan) + 1, plans.length - 1)]
    : plans[0]

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="border-b border-gold-primary/15 bg-[#0d0d0d]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ProximityLogo size={34} />
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-white text-sm leading-none">Proximity</p>
              <p className="font-body text-white/35 text-[10px] tracking-widest uppercase">Client Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-all">
              <Bell size={15} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white font-body text-sm transition-all duration-200"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div {...fadeUp(0)} className="mb-6">
          <div className="flex items-start gap-4 bg-[#111111] border border-gold-primary/20 rounded-2xl p-6">
            <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold-sm">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-heading text-xl font-bold text-white truncate">
                Welcome back, {user?.name?.split(' ')[0] || 'Client'}!
              </h2>
              <p className="font-body text-white/40 text-sm mt-0.5 truncate">{user?.email}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 bg-gold-primary/15 border border-gold-primary/30 rounded-full px-3 py-1 text-gold-primary font-body text-xs font-semibold">
                  <Shield size={11} /> {currentPlan}
                </span>
                <span className="font-body text-white/30 text-xs">Member since {memberSince}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.08)} className="mb-6">
          <div className="bg-[#111111] border border-white/8 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-primary/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard size={18} className="text-gold-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-sm">Your Plan: <span className="text-gold-primary">{currentPlan}</span></p>
                  <p className="font-body text-white/35 text-xs mt-0.5">
                    {benefits.length > 0 ? `Includes: ${benefits.slice(0, 2).join(', ')}` : 'Start your credit repair journey'}
                    {benefits.length > 2 && ` +${benefits.length - 2} more`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isUpgradeable && nextPlan && (
                  <Link
                    to="/pricing"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient text-white font-heading font-bold text-xs shadow-gold-sm hover:shadow-gold-md transition-all"
                  >
                    <Zap size={12} />
                    Upgrade to {nextPlan.name}
                  </Link>
                )}
                <Link
                  to="/pricing"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 font-body text-xs font-semibold transition-all"
                >
                  View All Plans <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {benefits.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={8} className="text-emerald-400" />
                    </div>
                    <span className="font-body text-white/50 text-xs">{benefit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.14)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {STAT_CARDS.map((card) => (
            <div
              key={card.label}
              className={`bg-gradient-to-br ${card.color} border border-white/8 rounded-2xl p-5`}
            >
              <div className="flex items-center justify-between mb-3">
                <card.icon size={18} className="text-white/40" />
              </div>
              <p className="font-heading text-2xl font-black text-white">{card.value}</p>
              <p className="font-body text-white/60 text-xs font-semibold mt-0.5">{card.label}</p>
              <p className="font-body text-white/30 text-[11px] mt-1">{card.sub}</p>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="mb-6">
          <h3 className="font-heading text-base font-bold text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="group flex items-center gap-4 bg-[#111111] border border-white/8 hover:border-gold-primary/30 rounded-2xl p-5 transition-all duration-200 hover:bg-[#141414]"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-primary/10 group-hover:bg-gold-primary/20 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <action.icon size={18} className="text-gold-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-white text-sm">{action.label}</p>
                  <p className="font-body text-white/40 text-xs mt-0.5">{action.desc}</p>
                </div>
                <ArrowRight size={14} className="text-white/20 group-hover:text-gold-primary transition-colors duration-200 flex-shrink-0" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.26)}>
          <div className="bg-gold-gradient rounded-2xl p-6 text-center">
            <h3 className="font-heading text-xl font-black text-white mb-2">Ready to Transform Your Credit?</h3>
            <p className="font-body text-white/75 text-sm mb-4">Our experts are standing by to build your personalized credit recovery plan.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-near-black font-heading font-bold text-sm rounded-pill px-6 py-2.5 hover:bg-white/90 transition-colors shadow-md"
              >
                Book Free Consultation <ArrowRight size={14} />
              </a>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-heading font-bold text-sm rounded-pill px-6 py-2.5 hover:bg-white/10 transition-colors"
              >
                View Plans <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
