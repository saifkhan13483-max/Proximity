/**
 * Standalone seed script for local development.
 * Run: node firebase/functions/src/seed.js
 *
 * Requires: firebase/functions/.env file with credentials.
 */
require('dotenv').config({ path: `${__dirname}/../.env` })

const { db, adminAuth } = require('./firebase-admin')

const DEFAULT_SERVICES = [
  {
    id: 'credit-analysis',
    icon: 'BarChart2',
    title: 'Credit Analysis',
    shortDescription:
      'A thorough review of your full credit report to identify errors, negative items, and opportunities for improvement.',
    description:
      'Our certified specialists perform a comprehensive, three-bureau credit analysis to map every factor affecting your score.',
    benefits: [
      'Identify all negative items dragging your score down',
      'Spot reporting errors and inaccuracies across all three bureaus',
      'Receive a personalized, prioritized repair strategy',
      'Understand exactly what is impacting your score and why',
      'Get a clear baseline to measure your progress against',
    ],
    order: 0,
  },
  {
    id: 'dispute-filing',
    icon: 'FileText',
    title: 'Dispute Filing',
    shortDescription:
      'We draft and submit expert dispute letters to all three credit bureaus on your behalf.',
    description:
      'Our experienced dispute specialists craft legally precise challenge letters targeting inaccurate, unverifiable, or outdated items.',
    benefits: [
      "Expert dispute letters tailored to each bureau's requirements",
      'Track the status of every open dispute in real time',
      'Follow-up correspondence handled entirely on your behalf',
      'Challenge collections, late payments, charge-offs, and more',
      'Legally compliant with the Fair Credit Reporting Act (FCRA)',
    ],
    order: 1,
  },
  {
    id: 'score-monitoring',
    icon: 'TrendingUp',
    title: 'Score Monitoring',
    shortDescription:
      'Real-time alerts and monthly reports so you always know exactly where your credit stands.',
    description:
      'Stay fully informed with dedicated score monitoring that tracks changes across all three credit bureaus.',
    benefits: [
      'Real-time alerts for any new negative items or inquiries',
      'Monthly three-bureau score summary reports',
      'Track score improvements as disputes are resolved',
      'Identify potential fraud or identity theft early',
      'Expert analysis of each change and what it means for you',
    ],
    order: 2,
  },
]

async function seed() {
  if (!db) {
    console.error('[seed] Firebase not initialized. Check your .env file.')
    process.exit(1)
  }

  console.log('[seed] Seeding services collection...')
  const batch = db.batch()
  for (const svc of DEFAULT_SERVICES) {
    batch.set(db.collection('services').doc(svc.id), svc)
  }
  await batch.commit()
  console.log(`[seed] Seeded ${DEFAULT_SERVICES.length} services.`)

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

  if (ADMIN_EMAIL && ADMIN_PASSWORD && adminAuth) {
    console.log(`[seed] Seeding admin user: ${ADMIN_EMAIL}`)
    let adminUser
    try {
      adminUser = await adminAuth.getUserByEmail(ADMIN_EMAIL.toLowerCase())
      console.log('[seed] Admin user already exists.')
    } catch {
      adminUser = await adminAuth.createUser({
        email: ADMIN_EMAIL.toLowerCase(),
        password: ADMIN_PASSWORD,
        displayName: 'Administrator',
        emailVerified: true,
      })
      console.log('[seed] Admin user created.')
    }
    await adminAuth.setCustomUserClaims(adminUser.uid, { role: 'admin' })
    const ref = db.collection('users').doc(adminUser.uid)
    const doc = await ref.get()
    if (!doc.exists) {
      await ref.set({
        id: adminUser.uid,
        name: 'Administrator',
        email: ADMIN_EMAIL.toLowerCase(),
        createdAt: new Date().toISOString(),
        plan: 'Admin',
        role: 'admin',
        creditScore: null,
      })
      console.log('[seed] Admin Firestore profile created.')
    }
  } else {
    console.warn('[seed] ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping admin seed.')
  }

  console.log('[seed] Done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('[seed] Fatal error:', err.message)
  process.exit(1)
})
