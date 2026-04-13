export interface Service {
  id: string
  title: string
  description: string
  shortDescription: string
  icon: string
  benefits: string[]
}

export interface Testimonial {
  id: string
  clientName: string
  city: string
  beforeScore: number
  afterScore: number
  rating: number
  text: string
  featured: boolean
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'about-credit-repair' | 'working-with-proximity'
}

export interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  photoUrl: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SiteMetadata {
  siteTitle: string
  siteDescription: string
  siteUrl: string
  ogImage: string
  twitterHandle: string
}

export interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration: number
}

export interface ContactFormData {
  fullName: string
  email: string
  phone: string
  serviceOfInterest: string
  message: string
}

export interface Stat {
  label: string
  value: number
  suffix: string
  prefix?: string
  icon: string
}
