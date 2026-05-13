import type { NavLink } from '@/types/index'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'AI Reviewer', href: '/ai-credit-reviewer' },
  { label: 'Contact', href: '/contact' },
]

export const footerServiceLinks: NavLink[] = [
  { label: 'Credit Analysis', href: '/services#credit-analysis' },
  { label: 'Dispute Filing', href: '/services#dispute-filing' },
  { label: 'Score Monitoring', href: '/services#score-monitoring' },
  { label: 'Debt Validation', href: '/services#debt-validation' },
]
