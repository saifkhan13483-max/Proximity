import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield, TrendingUp, FileText, BarChart2, LogOut,
  CheckCircle, Clock, Star, ArrowRight, Bell, Zap, CreditCard,
  BookOpen, Handshake, ShieldCheck, CalendarDays, Mail, Award,
  ChevronRight, Activity, Target, Sparkles, User, Home,
  AlertCircle, Info,
} from 'lucide-react'
import { useAuthStore } from '@store/authStore'
import { plans } from '@data/plans'
import ProximityLogo from '@components/ui/ProximityLogo'

const ALL_ACTIONS = {
  creditAnalysis: { label: 'Credit Analysis', desc: 'Full 3-bureau report review', icon: BarChart2, href: '/services#credit-analysis' },
  disputeFiling: { label: 'File a Dispute', desc: 'Remove inaccurate items', icon: FileText, href: '/services#dispute-filing' },
  scoreMonitoring: { label: 'Score Monitoring', desc: 'Real-time credit alerts', icon: TrendingUp, href: '/services#score-monitoring' },
  debtValidation: { label: 'Debt Validation', desc: 'Challenge unverifiable debts', icon: Shield, href: '/services#debt-validation' },
  educationalResources: { label: 'Educational Resources', desc: 'Guides, tools & tutorials', icon: BookOpen, href: '/services#educational-resources' },
  creditorNegotiation: { label: 'Creditor Negotiation', desc: 'Pay-for-delete & goodwill letters', icon: Handshake, href: '/services#creditor-negotiation' },
  identityProtection: { label: 'Identity Protection', desc: 'Dark web & fraud monitoring', icon: ShieldCheck, href: '/services#identity-protection' },
  bookConsultation: { label: 'Book Consultation', desc: 'Speak with an expert', icon: Star, href: '/contact' },
  advisorSession: { label: 'Book Advisor Session', desc: 'Weekly 1-on-1 strategy call', icon: CalendarDays, href: '/contact' },
}

function getPlanActions(plan: string) {
  const { creditAnalysis, disputeFiling, scoreMonitoring, debtValidation,
    educationalResources, creditorNegotiation, identityProtection,
    bookConsultation, advisorSession } = ALL_ACTIONS
  if (plan === 'VIP Plan') return [disputeFiling, creditorNegotiation, identityProtection, advisorSession]
  if (plan === 'Premium Plan') return [disputeFiling, creditorNegotiation, educationalResources, advisorSession]
  if (plan === 'Standard Plan') return [scoreMonitoring, debtValidation, educationalResources, bookConsultation]
  if (plan === 'Basic Plan') return [creditAnalysis, disputeFiling, bookConsultation, scoreMonitoring]
  return [creditAnalysis, disputeFiling, scoreMonitoring, bookConsultation]
}

const PLAN_BENEFITS: Record<string, string[]> = {
  'Free Consultation': ['Initial credit report review', 'One-time consultation session'],
  'Basic Plan': ['Up to 5 disputes/month', 'Monthly progress report', 'Email support'],
  'Standard Plan': ['Unlimited dispute letters', 'Credit score monitoring', 'Phone & live chat support'],
  'Premium Plan': ['Dedicated credit advisor', 'Weekly strategy sessions', 'Priority dispute processing'],
  'VIP Plan': ['Unlimited advisor access', 'Identity theft protection', '72-hour dispute processing', 'Satisfaction guarantee'],
}

const PLAN_TIER_COLORS: Record<string, string> = {
  'Free Consultation': 'text-white/50 border-white/20 bg-white/5',
  'Basic Plan': 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  'Standard Plan': 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  'Premium Plan': 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  'VIP Plan': 'text-gold-primary border-gold-primary/50 bg-gold-primary/15',
}

function getScoreInfo(score: number | null) {
  if (!score) return { label: 'Not linked', color: '#ffffff30', ring: '#ffffff15', pct: 0 }
  if (score >= 800) return { label: 'Exceptional', color: '#10b981', ring: '#10b981', pct: 100 }
  if (score >= 740) return { label: 'Very Good', color: '#22c55e', ring: '#22c55e', pct: 82 }
  if (score >= 670) return { label: 'Good', color: '#eab308', ring: '#eab308', pct: 68 }
  if (score >= 580) return { label: 'Fair', color: '#f97316', ring: '#f97316', pct: 52 }
  return { label: 'Poor', color: '#ef4444', ring: '#ef4444', pct: 28 }
}

function CreditScoreRing({ score }: { score: number | null }) {
  const size = 180
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const min = 300
  const max = 850
  const capped = score ? Math.min(Math.max(score, min), max) : min
  const progress = score ? (capped - min) / (max - min) : 0
  const dashOffset = circumference * (1 - progress * 0.75)
  const rotation = -225
  const { label, color } = getScoreInfo(score)

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="#ffffff08" strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeDashoffset={0}
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
          />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            initial={{ strokeDashoffset: circumference * 0.25 + circumference * 0.75 }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            style={{ filter: score ? `drop-shadow(0 0 10px ${color}99)` : 'none' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="font-heading font-black text-4xl text-white leading-none"
          >
            {score ?? '—'}
          </motion.span>
          <span className="font-body text-[11px] text-white/40 mt-1 tracking-widest uppercase">FICO Score</span>
          <span className="font-body text-xs font-bold mt-1" style={{ color }}>{label}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-1 text-[10px] font-body text-white/25">
        <span>300</span>
        <div className="flex-1 h-px bg-white/10 w-16" />
        <span>850</span>
      </div>
    </div>
  )
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

function getDaysActive(createdAt?: string) {
  if (!createdAt) return 1
  const diff = Date.now() - new Date(createdAt).getTime()
  return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)))
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

const ACTIVITY = [
  { icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10', text: 'Account created successfully', time: 'Just now' },
  { icon: Info, color: 'text-gold-primary', bg: 'bg-gold-primary/10', text: 'Credit profile setup complete', time: 'Today' },
  { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-400/10', text: 'Schedule your first consultation', time: 'Pending' },
]

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

  const daysActive = getDaysActive(user?.createdAt)
  const currentPlan = user?.plan || 'Free Consultation'
  const benefits = PLAN_BENEFITS[currentPlan] || []
  const isUpgradeable = currentPlan !== 'VIP Plan'
  const quickActions = getPlanActions(currentPlan)
  const planTierClass = PLAN_TIER_COLORS[currentPlan] || PLAN_TIER_COLORS['Free Consultation']

  const matchedPlan = plans.find((p) => `${p.name} Plan` === currentPlan)
  const nextPlan = matchedPlan
    ? plans[Math.min(plans.indexOf(matchedPlan) + 1, plans.length - 1)]
    : plans[0]

  const creditScore = user?.creditScore ?? null
  const { color: scoreColor } = getScoreInfo(creditScore)
  const initials = user?.name ? getInitials(user.name) : 'U'
  const firstName = user?.name?.split(' ')[0] || 'Client'

  return (
    <div className="min-h-screen bg-[#060606]">

      {/* ── Top Nav ── */}
      <div className="border-b border-white/6 bg-[#080808]/95 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <ProximityLogo size={32} />
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-white text-sm leading-none group-hover:text-gold-primary transition-colors duration-200">Proximity</p>
              <p className="font-body text-white/30 text-[10px] tracking-widest uppercase">Client Portal</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Dashboard', icon: Home, href: '/dashboard', active: true },
              { label: 'Services', icon: Shield, href: '/services', active: false },
              { label: 'Pricing', icon: CreditCard, href: '/pricing', active: false },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs font-medium transition-all ${
                  item.active
                    ? 'bg-gold-primary/10 text-gold-primary'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                <item.icon size={12} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/35 hover:text-white/60 hover:bg-white/8 transition-all">
              <Bell size={14} />
            </button>
            <div className="w-px h-5 bg-white/10 hidden sm:block" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-400 font-body text-xs font-medium transition-all duration-200"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ── Greeting ── */}
        <motion.div {...fadeUp(0)} className="mb-7">
          <p className="font-body text-white/35 text-sm mb-0.5">{getGreeting()},</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white">
            {firstName} <span className="text-gold-primary">👋</span>
          </h1>
          <p className="font-body text-white/35 text-sm mt-1">Here's your credit journey at a glance.</p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* Profile Card — 2 cols */}
          <motion.div {...fadeUp(0.05)} className="lg:col-span-2">
            <div className="relative overflow-hidden bg-[#0f0f0f] border border-white/8 rounded-2xl h-full">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-primary/4 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-500/3 blur-3xl pointer-events-none" />

              <div className="relative p-6 sm:p-7">
                {/* Avatar + name */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="w-[72px] h-[72px] rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold-md">
                      <span className="font-heading font-black text-2xl text-white tracking-wide">{initials}</span>
                    </div>
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0f0f0f] flex items-center justify-center">
                      <CheckCircle size={11} className="text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h2 className="font-heading text-xl sm:text-2xl font-black text-white">{user?.name || 'Client'}</h2>
                      <span className={`inline-flex items-center gap-1.5 border rounded-full px-2.5 py-0.5 font-body text-[11px] font-bold tracking-wide ${planTierClass}`}>
                        <Award size={9} />{currentPlan}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                      <span className="flex items-center gap-1.5 text-white/35 font-body text-xs">
                        <Mail size={11} />{user?.email}
                      </span>
                      <span className="flex items-center gap-1.5 text-white/25 font-body text-xs">
                        <Clock size={11} />Member since {memberSince}
                      </span>
                      <span className="flex items-center gap-1.5 text-white/25 font-body text-xs">
                        <User size={11} />{user?.role === 'admin' ? 'Administrator' : 'Client Account'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Plan benefits */}
                {benefits.length > 0 && (
                  <div className="mb-6">
                    <p className="font-body text-[11px] text-white/25 uppercase tracking-widest mb-2.5 font-semibold">Plan Includes</p>
                    <div className="flex flex-wrap gap-2">
                      {benefits.map((b) => (
                        <span key={b} className="inline-flex items-center gap-1.5 bg-white/4 border border-white/8 rounded-full px-3 py-1 font-body text-[11px] text-white/50">
                          <CheckCircle size={9} className="text-emerald-400 flex-shrink-0" />{b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upgrade / Free CTA */}
                {isUpgradeable && nextPlan && currentPlan !== 'Free Consultation' && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-gold-primary/5 border border-gold-primary/15">
                    <div>
                      <p className="font-body text-white/60 text-xs">
                        <span className="text-gold-primary font-semibold">Upgrade available</span> — unlock more with {nextPlan.name} Plan
                      </p>
                    </div>
                    <Link
                      to="/pricing"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient text-white font-heading font-bold text-xs shadow-gold-sm hover:shadow-gold-md transition-all whitespace-nowrap"
                    >
                      <Zap size={11} /> Upgrade Now
                    </Link>
                  </div>
                )}

                {currentPlan === 'Free Consultation' && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-gold-primary/5 border border-gold-primary/15">
                    <p className="font-body text-white/40 text-xs">
                      Choose a plan to begin your credit repair journey.
                    </p>
                    <Link
                      to="/pricing"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient text-white font-heading font-bold text-xs shadow-gold-sm hover:shadow-gold-md transition-all whitespace-nowrap"
                    >
                      <Zap size={11} /> View Plans
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Credit Score Card — 1 col */}
          <motion.div {...fadeUp(0.1)}>
            <div className="relative overflow-hidden bg-[#0f0f0f] border border-white/8 rounded-2xl h-full">
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 40%, ${scoreColor}12 0%, transparent 70%)` }} />
              <div className="relative p-6 flex flex-col items-center justify-center h-full gap-5">
                <div className="text-center">
                  <p className="font-body text-[11px] text-white/25 uppercase tracking-widest font-semibold mb-1">Credit Score</p>
                  <CreditScoreRing score={creditScore} />
                </div>

                <div className="w-full space-y-2">
                  {[
                    { label: 'Exceptional', range: '800–850', color: '#10b981' },
                    { label: 'Good', range: '670–739', color: '#eab308' },
                    { label: 'Poor', range: '300–579', color: '#ef4444' },
                  ].map((tier) => (
                    <div key={tier.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tier.color }} />
                        <span className="font-body text-[11px] text-white/35">{tier.label}</span>
                      </div>
                      <span className="font-body text-[11px] text-white/20">{tier.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats Row ── */}
        <motion.div {...fadeUp(0.15)} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {[
            {
              label: 'Disputes Filed',
              value: '0',
              sub: 'No disputes yet',
              icon: FileText,
              gradient: 'from-blue-500/8 to-transparent',
              border: 'border-blue-500/15',
              iconBg: 'bg-blue-500/12',
              iconColor: 'text-blue-400',
              badge: 'Active',
              badgeColor: 'text-blue-400 bg-blue-400/8',
            },
            {
              label: 'Items Resolved',
              value: '0',
              sub: 'Keep pushing forward',
              icon: CheckCircle,
              gradient: 'from-emerald-500/8 to-transparent',
              border: 'border-emerald-500/15',
              iconBg: 'bg-emerald-500/12',
              iconColor: 'text-emerald-400',
              badge: 'Completed',
              badgeColor: 'text-emerald-400 bg-emerald-400/8',
            },
            {
              label: 'Days Active',
              value: String(daysActive),
              sub: `Since ${memberSince}`,
              icon: Target,
              gradient: 'from-purple-500/8 to-transparent',
              border: 'border-purple-500/15',
              iconBg: 'bg-purple-500/12',
              iconColor: 'text-purple-400',
              badge: 'Ongoing',
              badgeColor: 'text-purple-400 bg-purple-400/8',
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
              className={`relative overflow-hidden bg-gradient-to-br ${card.gradient} bg-[#0f0f0f] border ${card.border} rounded-2xl p-5`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                  <card.icon size={17} className={card.iconColor} />
                </div>
                <span className={`font-body text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
              <p className="font-heading text-3xl font-black text-white mb-0.5">{card.value}</p>
              <p className="font-body text-white/55 text-xs font-semibold">{card.label}</p>
              <p className="font-body text-white/25 text-[11px] mt-1">{card.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom Grid: Actions + Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* Quick Actions — 2 cols */}
          <motion.div {...fadeUp(0.22)} className="lg:col-span-2">
            <div className="bg-[#0f0f0f] border border-white/8 rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gold-primary/10 flex items-center justify-center">
                    <Sparkles size={14} className="text-gold-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm leading-none">Your Plan Features</h3>
                    <p className="font-body text-white/25 text-[11px] mt-0.5">{currentPlan}</p>
                  </div>
                </div>
                <Link
                  to="/pricing"
                  className="flex items-center gap-1 text-white/25 hover:text-gold-primary font-body text-xs transition-colors"
                >
                  Explore all <ChevronRight size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickActions.map((action, i) => (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 + i * 0.06, duration: 0.4 }}
                    className="group flex items-center gap-3.5 bg-white/3 hover:bg-white/6 border border-white/6 hover:border-gold-primary/25 rounded-xl p-4 transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gold-primary/8 group-hover:bg-gold-primary/16 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                      <action.icon size={16} className="text-gold-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-white text-sm leading-tight">{action.label}</p>
                      <p className="font-body text-white/35 text-[11px] mt-0.5">{action.desc}</p>
                    </div>
                    <ArrowRight size={13} className="text-white/15 group-hover:text-gold-primary transition-colors duration-200 flex-shrink-0" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Activity Feed — 1 col */}
          <motion.div {...fadeUp(0.26)}>
            <div className="bg-[#0f0f0f] border border-white/8 rounded-2xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Activity size={14} className="text-white/50" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-sm leading-none">Recent Activity</h3>
                  <p className="font-body text-white/25 text-[11px] mt-0.5">Your latest updates</p>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {ACTIVITY.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <item.icon size={13} className={item.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-white/60 text-xs leading-snug">{item.text}</p>
                      <p className="font-body text-white/20 text-[11px] mt-0.5">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/5">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-white/4 hover:bg-white/7 border border-white/6 text-white/40 hover:text-white/60 font-body text-xs font-medium transition-all"
                >
                  <Star size={11} />Book a consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── CTA Banner ── */}
        <motion.div {...fadeUp(0.32)}>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="bg-gold-gradient p-px rounded-2xl">
              <div className="bg-[#0f0f0f] rounded-[calc(1rem-1px)] p-6 sm:p-8">
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold-primary/10 blur-3xl" />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-gold-primary/5 blur-3xl" />
                </div>
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-gold-primary/20 flex items-center justify-center">
                        <TrendingUp size={12} className="text-gold-primary" />
                      </div>
                      <span className="font-body text-xs text-gold-primary font-semibold tracking-wide uppercase">Your Next Step</span>
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-black text-white mb-1.5">
                      Ready to transform your credit, {firstName}?
                    </h3>
                    <p className="font-body text-white/45 text-sm max-w-md">
                      Our specialists are ready to build your personalized recovery plan.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-white font-heading font-bold text-sm rounded-xl px-5 py-2.5 hover:opacity-90 transition-opacity shadow-gold-sm whitespace-nowrap"
                    >
                      Book Consultation <ArrowRight size={14} />
                    </a>
                    <Link
                      to="/pricing"
                      className="inline-flex items-center justify-center gap-2 border border-white/12 text-white/60 hover:text-white hover:border-white/25 font-heading font-bold text-sm rounded-xl px-5 py-2.5 transition-all whitespace-nowrap"
                    >
                      View Plans
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
