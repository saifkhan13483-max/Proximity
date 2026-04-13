import type { SiteMetadata } from '@/types/index'

export const siteMetadata: SiteMetadata = {
  siteTitle: 'Proximity Credit Repair',
  siteDescription:
    'Expert credit repair services that deliver real results. Join 10,000+ clients who have improved their credit scores with Proximity Credit Repair.',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://proximity-credit-repair.replit.app',
  ogImage: '/og-image.png',
  twitterHandle: '@proximitycredit',
}
