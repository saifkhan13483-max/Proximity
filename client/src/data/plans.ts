export interface PricingPlan {
  id: string
  name: string
  monthlyPrice: number
  annualPrice: number
  description: string
  badge?: string
  highlighted: boolean
  features: string[]
  notIncluded?: string[]
  ctaLabel: string
  color: string
}

export const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'Perfect for getting started on your credit repair journey.',
    highlighted: false,
    color: 'from-blue-500/10 to-blue-600/5',
    ctaLabel: 'Get Started',
    features: [
      'Full 3-bureau credit report review',
      'Up to 5 dispute letters per month',
      'Dedicated client portal access',
      'Email support (48h response)',
      'Monthly progress report',
    ],
    notIncluded: [
      'Phone & live chat support',
      'Unlimited dispute filing',
      'Credit score monitoring',
      'Debt validation service',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'Our most popular plan for serious credit recovery.',
    badge: 'Most Popular',
    highlighted: true,
    color: 'from-gold-primary/15 to-gold-dark/5',
    ctaLabel: 'Start Standard',
    features: [
      'Everything in Basic',
      'Unlimited dispute letters',
      'Real-time credit score monitoring',
      'Phone & live chat support',
      'Debt validation assistance',
      'Bi-weekly progress updates',
      'Access to educational resources',
    ],
    notIncluded: [
      'Dedicated credit advisor',
      'Identity theft protection',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 149,
    annualPrice: 119,
    description: 'Advanced tools and a dedicated advisor by your side.',
    highlighted: false,
    color: 'from-purple-500/10 to-purple-600/5',
    ctaLabel: 'Go Premium',
    features: [
      'Everything in Standard',
      'Dedicated credit repair advisor',
      'Weekly 1-on-1 strategy sessions',
      'Priority dispute processing',
      'Creditor negotiation support',
      'Advanced score analysis',
      'Weekly progress reports',
    ],
    notIncluded: [
      'Identity theft protection',
    ],
  },
  {
    id: 'vip',
    name: 'VIP',
    monthlyPrice: 199,
    annualPrice: 159,
    description: 'White-glove service for maximum results, fast.',
    badge: 'Best Results',
    highlighted: false,
    color: 'from-amber-500/10 to-amber-600/5',
    ctaLabel: 'Join VIP',
    features: [
      'Everything in Premium',
      'Unlimited advisor access',
      'Identity theft protection',
      'Legal demand letter service',
      'Goodwill letter campaigns',
      'Rapid 72-hour dispute processing',
      'Concierge onboarding',
      'Guaranteed results or full refund',
    ],
  },
]

export const PLAN_MAP: Record<string, string> = {
  basic: 'Basic Plan',
  standard: 'Standard Plan',
  premium: 'Premium Plan',
  vip: 'VIP Plan',
  'free-consultation': 'Free Consultation',
}
