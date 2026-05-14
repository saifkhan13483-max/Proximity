import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore'
import { db } from '@config/firebase'

export interface AdminUser {
  id: string
  name: string
  email: string
  plan: string
  role: string
  createdAt: string
  creditScore: number | null
}

export interface AdminContact {
  id: string
  fullName: string
  email: string
  phone: string
  serviceOfInterest: string
  message: string
  status: 'new' | 'in-progress' | 'resolved'
  createdAt: string
}

export interface AdminStats {
  totalUsers: number
  newUsersThisMonth: number
  totalContacts: number
  newContactsThisMonth: number
  unreadContacts: number
  plans: Record<string, number>
}

export interface AdminService {
  id: string
  title: string
  icon: string
  shortDescription: string
  description: string
  benefits: string[]
  order: number
}

function requireDb() {
  if (!db) throw new Error('Database is not configured. Please set your Firebase credentials.')
  return db
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export async function fetchAdminStats(): Promise<AdminStats> {
  const firestore = requireDb()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [usersSnap, contactsSnap] = await Promise.all([
    getDocs(collection(firestore, 'users')),
    getDocs(collection(firestore, 'contacts')),
  ])

  const allUsers = usersSnap.docs.map((d) => d.data())
  const regularUsers = allUsers.filter((u) => u.role !== 'admin')
  const contacts = contactsSnap.docs.map((d) => d.data())

  return {
    totalUsers: regularUsers.length,
    newUsersThisMonth: regularUsers.filter(
      (u) => u.createdAt && new Date(u.createdAt) > thirtyDaysAgo
    ).length,
    totalContacts: contacts.length,
    newContactsThisMonth: contacts.filter(
      (c) => c.createdAt && new Date(c.createdAt) > thirtyDaysAgo
    ).length,
    unreadContacts: contacts.filter((c) => c.status === 'new').length,
    plans: regularUsers.reduce<Record<string, number>>((acc, u) => {
      const plan = u.plan || 'Free Consultation'
      acc[plan] = (acc[plan] || 0) + 1
      return acc
    }, {}),
  }
}

// ── Users ─────────────────────────────────────────────────────────────────────

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  const firestore = requireDb()
  const snapshot = await getDocs(
    query(collection(firestore, 'users'), where('role', '!=', 'admin'))
  )
  return snapshot.docs.map((d) => {
    const data = d.data()
    return {
      id: data.id || d.id,
      name: data.name || '',
      email: data.email || '',
      plan: data.plan || 'Free Consultation',
      role: data.role || 'user',
      createdAt: data.createdAt || new Date().toISOString(),
      creditScore: data.creditScore ?? null,
    }
  })
}

export async function updateUser(
  id: string,
  data: Partial<{ plan: string; creditScore: number | null }>
): Promise<AdminUser> {
  const firestore = requireDb()
  const ref = doc(firestore, 'users', id)
  const existing = await getDoc(ref)
  if (!existing.exists()) throw new Error('User not found')
  if (existing.data().role === 'admin') throw new Error('Cannot modify admin users')

  const updates: Record<string, unknown> = {}
  if (data.plan !== undefined) updates.plan = String(data.plan).slice(0, 50)
  if ('creditScore' in data) {
    const score = data.creditScore === null ? null : Number(data.creditScore)
    if (score === null || (Number.isFinite(score) && score >= 300 && score <= 850)) {
      updates.creditScore = score
    }
  }

  await updateDoc(ref, updates)
  const updated = (await getDoc(ref)).data()!
  return {
    id: updated.id || id,
    name: updated.name || '',
    email: updated.email || '',
    plan: updated.plan || 'Free Consultation',
    role: updated.role || 'user',
    createdAt: updated.createdAt || new Date().toISOString(),
    creditScore: updated.creditScore ?? null,
  }
}

export async function deleteUser(id: string): Promise<void> {
  const firestore = requireDb()
  const ref = doc(firestore, 'users', id)
  const existing = await getDoc(ref)
  if (!existing.exists()) throw new Error('User not found')
  if (existing.data().role === 'admin') throw new Error('Cannot delete admin users')
  await deleteDoc(ref)
  // Note: the Firebase Auth account is NOT deleted (requires Admin SDK).
  // The user's profile is removed from Firestore; they won't appear in the admin panel.
}

// ── Contacts ──────────────────────────────────────────────────────────────────

export async function fetchAdminContacts(): Promise<AdminContact[]> {
  const firestore = requireDb()
  const snapshot = await getDocs(
    query(collection(firestore, 'contacts'), orderBy('createdAt', 'desc'))
  )
  return snapshot.docs.map((d) => {
    const data = d.data()
    return {
      id: data.id || d.id,
      fullName: data.fullName || '',
      email: data.email || '',
      phone: data.phone || '',
      serviceOfInterest: data.serviceOfInterest || '',
      message: data.message || '',
      status: data.status || 'new',
      createdAt: data.createdAt || new Date().toISOString(),
    }
  })
}

export async function updateContactStatus(
  id: string,
  status: AdminContact['status']
): Promise<AdminContact> {
  const firestore = requireDb()
  const ref = doc(firestore, 'contacts', id)
  const existing = await getDoc(ref)
  if (!existing.exists()) throw new Error('Contact not found')

  const validStatuses: AdminContact['status'][] = ['new', 'in-progress', 'resolved']
  if (!validStatuses.includes(status)) throw new Error('Invalid status')

  await updateDoc(ref, { status })
  const updated = (await getDoc(ref)).data()!
  return {
    id: updated.id || id,
    fullName: updated.fullName || '',
    email: updated.email || '',
    phone: updated.phone || '',
    serviceOfInterest: updated.serviceOfInterest || '',
    message: updated.message || '',
    status: updated.status || 'new',
    createdAt: updated.createdAt || new Date().toISOString(),
  }
}

export async function deleteContact(id: string): Promise<void> {
  const firestore = requireDb()
  const ref = doc(firestore, 'contacts', id)
  const existing = await getDoc(ref)
  if (!existing.exists()) throw new Error('Contact not found')
  await deleteDoc(ref)
}

// ── Services ──────────────────────────────────────────────────────────────────

const DEFAULT_SERVICES: AdminService[] = [
  {
    id: 'credit-analysis', icon: 'BarChart2', title: 'Credit Analysis', order: 0,
    shortDescription: 'A thorough review of your full credit report to identify errors, negative items, and opportunities for improvement.',
    description: 'Our certified specialists perform a comprehensive, three-bureau credit analysis to map every factor affecting your score. We identify every inaccuracy, outdated record, and negative item, then build a custom action plan tailored to your unique credit profile.',
    benefits: ['Identify all negative items dragging your score down', 'Spot reporting errors and inaccuracies across all three bureaus', 'Receive a personalized, prioritized repair strategy', 'Understand exactly what is impacting your score and why', 'Get a clear baseline to measure your progress against'],
  },
  {
    id: 'dispute-filing', icon: 'FileText', title: 'Dispute Filing', order: 1,
    shortDescription: 'We draft and submit expert dispute letters to all three credit bureaus on your behalf.',
    description: 'Our experienced dispute specialists craft legally precise challenge letters targeting inaccurate, unverifiable, or outdated items on your credit report. We manage the entire process — from drafting to follow-up — so you never have to navigate the bureaucracy alone.',
    benefits: ["Expert dispute letters tailored to each bureau's requirements", 'Track the status of every open dispute in real time', 'Follow-up correspondence handled entirely on your behalf', 'Challenge collections, late payments, charge-offs, and more', 'Legally compliant with the Fair Credit Reporting Act (FCRA)'],
  },
  {
    id: 'score-monitoring', icon: 'TrendingUp', title: 'Score Monitoring', order: 2,
    shortDescription: 'Real-time alerts and monthly reports so you always know exactly where your credit stands.',
    description: 'Stay fully informed with dedicated score monitoring that tracks changes across all three credit bureaus. Our monthly progress reports break down every improvement and flag any new negative items the moment they appear, so you are always one step ahead.',
    benefits: ['Real-time alerts for any new negative items or inquiries', 'Monthly three-bureau score summary reports', 'Track score improvements as disputes are resolved', 'Identify potential fraud or identity theft early', 'Expert analysis of each change and what it means for you'],
  },
  {
    id: 'debt-validation', icon: 'Shield', title: 'Debt Validation', order: 3,
    shortDescription: 'We demand proof that collectors have the legal right to collect — and challenge what they cannot verify.',
    description: 'Under the Fair Debt Collection Practices Act, debt collectors are legally required to validate the debts they claim you owe. Our team sends certified validation requests to collectors and challenges any debt that cannot be properly verified, protecting your rights and your credit.',
    benefits: ['Force collectors to prove the debt is legally valid and accurate', 'Remove unverifiable or statute-barred debts from your report', 'Protect your rights under the FDCPA', 'Challenge inflated balances and unauthorized fees', 'Negotiate removal of verified debts as part of payment agreements'],
  },
  {
    id: 'creditor-negotiation', icon: 'Handshake', title: 'Creditor Negotiation', order: 4,
    shortDescription: 'Our specialists negotiate directly with creditors to settle, reduce, or remove negative accounts on your behalf.',
    description: 'Navigating creditor negotiations alone can be overwhelming and costly. Our Premium and VIP clients benefit from direct, professional negotiation with creditors — whether that means arranging pay-for-delete agreements, settling past-due balances, or securing goodwill removals.',
    benefits: ['Pay-for-delete agreements to remove settled accounts from your report', 'Negotiate reduced settlement amounts on outstanding balances', 'Goodwill letter campaigns targeting creditors for compassionate removals', 'Legal demand letters where creditors are in violation', 'Full documentation of all negotiation outcomes for your records'],
  },
  {
    id: 'educational-resources', icon: 'BookOpen', title: 'Educational Resources', order: 5,
    shortDescription: 'Gain the financial knowledge you need to maintain excellent credit long after your repair is complete.',
    description: 'A strong credit score requires ongoing knowledge and habits. Standard, Premium, and VIP clients get full access to our library of guides, video tutorials, and interactive tools covering credit fundamentals, budgeting strategies, and score optimization.',
    benefits: ['Step-by-step guides on credit scoring, reporting, and improvement', 'Video tutorials on budgeting, debt management, and financial planning', 'Interactive credit score simulator to model future decisions', 'Monthly newsletters with insider tips and industry updates', 'Direct access to our knowledge base and expert Q&A library'],
  },
  {
    id: 'identity-protection', icon: 'ShieldCheck', title: 'Identity Theft Protection', order: 6,
    shortDescription: 'Continuous monitoring and rapid response to protect your identity and credit from fraud.',
    description: 'Identity theft can undo months of credit repair progress in days. Our VIP clients receive comprehensive identity protection — including dark web monitoring, real-time fraud alerts, and dedicated recovery support if your identity is ever compromised.',
    benefits: ['Dark web monitoring for your personal and financial data', 'Instant alerts if your information is found in a data breach', 'Dedicated identity theft recovery specialist on standby', 'Assistance filing fraud alerts and security freezes with all three bureaus', 'Reimbursement support documentation for identity theft losses'],
  },
]

async function seedDefaultServices(firestore: ReturnType<typeof requireDb>): Promise<void> {
  for (const svc of DEFAULT_SERVICES) {
    await setDoc(doc(firestore, 'services', svc.id), svc)
  }
}

export async function fetchAdminServices(): Promise<AdminService[]> {
  const firestore = requireDb()
  const snapshot = await getDocs(
    query(collection(firestore, 'services'), orderBy('order', 'asc'))
  )
  if (snapshot.empty) {
    await seedDefaultServices(firestore)
    return DEFAULT_SERVICES
  }
  return snapshot.docs.map((d) => d.data() as AdminService)
}

export async function createService(
  data: Omit<AdminService, 'id' | 'order'>
): Promise<AdminService> {
  const firestore = requireDb()
  const snapshot = await getDocs(collection(firestore, 'services'))
  const maxOrder = snapshot.empty
    ? 0
    : Math.max(...snapshot.docs.map((d) => (d.data().order as number) || 0)) + 1

  const id = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)

  const service: AdminService = {
    id,
    title: String(data.title).trim().slice(0, 100),
    icon: String(data.icon || 'Star').slice(0, 50),
    shortDescription: String(data.shortDescription || '').trim().slice(0, 300),
    description: String(data.description || '').trim().slice(0, 2000),
    benefits: Array.isArray(data.benefits)
      ? data.benefits.map((b) => String(b).trim().slice(0, 200)).filter(Boolean)
      : [],
    order: maxOrder,
  }
  await setDoc(doc(firestore, 'services', id), service)
  return service
}

export async function updateService(
  id: string,
  data: Partial<Omit<AdminService, 'id' | 'order'>>
): Promise<AdminService> {
  const firestore = requireDb()
  const ref = doc(firestore, 'services', id)
  const existing = await getDoc(ref)
  if (!existing.exists()) throw new Error('Service not found')

  const updates: Record<string, unknown> = {}
  if (data.title !== undefined) updates.title = String(data.title).trim().slice(0, 100)
  if (data.icon !== undefined) updates.icon = String(data.icon).slice(0, 50)
  if (data.shortDescription !== undefined) updates.shortDescription = String(data.shortDescription).trim().slice(0, 300)
  if (data.description !== undefined) updates.description = String(data.description).trim().slice(0, 2000)
  if (Array.isArray(data.benefits)) {
    updates.benefits = data.benefits.map((b) => String(b).trim().slice(0, 200)).filter(Boolean)
  }

  await updateDoc(ref, updates)
  return (await getDoc(ref)).data() as AdminService
}

export async function deleteService(id: string): Promise<void> {
  const firestore = requireDb()
  const ref = doc(firestore, 'services', id)
  const existing = await getDoc(ref)
  if (!existing.exists()) throw new Error('Service not found')
  await deleteDoc(ref)
}
