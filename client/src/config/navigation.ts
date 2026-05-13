import type { NavLink } from '@/types/index'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'AI Tools', href: '/ai-credit-reviewer' },
  { label: 'Contact', href: '/contact' },
]

export const AI_TOOLS_DROPDOWN = [
  {
    label: 'Dispute Autopilot',
    href: '/ai-dispute-autopilot',
    desc: 'Full package — all items at once',
    badge: 'New',
  },
  {
    label: 'Credit Reviewer',
    href: '/ai-credit-reviewer',
    desc: 'Personalized AI credit analysis',
    badge: null,
  },
  {
    label: 'Dispute Letter Generator',
    href: '/dispute-letter-generator',
    desc: 'Single FCRA dispute letter',
    badge: null,
  },
]

export const footerServiceLinks: NavLink[] = [
  { label: 'Credit Analysis', href: '/services#credit-analysis' },
  { label: 'Dispute Filing', href: '/services#dispute-filing' },
  { label: 'Score Monitoring', href: '/services#score-monitoring' },
  { label: 'Debt Validation', href: '/services#debt-validation' },
]
