import type { SiteMetadata } from '@/types/index'

export const siteConfig = {
  name: 'Proximity Credit Repair',
  tagline: 'Restore Your Credit, Reclaim Your Life',
  description:
    'Proximity Credit Repair helps clients remove negative items, boost credit scores, and achieve financial freedom through expert dispute filing and personalized service.',
  phone: '(800) 555-0192',
  phoneHref: 'tel:+18005550192',
  email: 'hello@proximitycreditrepair.com',
  address: '123 Financial Plaza, Suite 400, Atlanta, GA 30301',
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  },
}

export const siteMetadata: SiteMetadata = {
  siteTitle: 'Proximity Credit Repair',
  siteDescription:
    'Expert credit repair services that deliver real results. Join 10,000+ clients who have improved their credit scores with Proximity Credit Repair.',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://proximity-credit-repair.replit.app',
  ogImage: '/og-image.png',
  twitterHandle: '@proximitycredit',
}
