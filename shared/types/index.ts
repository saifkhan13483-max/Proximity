// ─────────────────────────────────────────────────────────────────────────────
// Shared types — used by both /client and /firebase/functions
// ─────────────────────────────────────────────────────────────────────────────

export interface Service {
  id: string
  title: string
  description: string
  shortDescription: string
  icon: string
  benefits: string[]
  order?: number
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

// ── Firestore Document Shapes ─────────────────────────────────────────────────

export interface UserDocument {
  id: string
  name: string
  email: string
  createdAt: string
  plan: 'Free Consultation' | 'Basic Plan' | 'Standard Plan' | 'Premium Plan' | 'VIP Plan' | 'Admin'
  role: 'user' | 'admin'
  creditScore: number | null
}

export interface ContactDocument {
  id: string
  fullName: string
  email: string
  phone: string
  serviceOfInterest: string
  message: string
  status: 'new' | 'in-progress' | 'resolved'
  createdAt: string
}

export interface ServiceDocument {
  id: string
  title: string
  icon: string
  shortDescription: string
  description: string
  benefits: string[]
  order: number
}

// ── API Response Shapes ───────────────────────────────────────────────────────

export interface ApiSuccessResponse {
  success: true
  message: string
}

export interface ApiErrorResponse {
  error: string
}

export interface AdminStats {
  totalUsers: number
  newUsersThisMonth: number
  totalContacts: number
  newContactsThisMonth: number
  unreadContacts: number
  plans: Record<string, number>
}

export interface UploadResponse {
  success: true
  url: string
  publicId: string
  width: number
  height: number
  format: string
  bytes: number
}
