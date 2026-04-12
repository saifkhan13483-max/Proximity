import type { NavLink } from '@/types/index'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const footerServiceLinks: NavLink[] = [
  { label: 'Credit Analysis', href: '/services#credit-analysis' },
  { label: 'Dispute Filing', href: '/services#dispute-filing' },
  { label: 'Score Monitoring', href: '/services#score-monitoring' },
  { label: 'Debt Validation', href: '/services#debt-validation' },
]
