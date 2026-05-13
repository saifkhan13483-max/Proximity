const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const { rateLimit } = require('express-rate-limit')
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')
const { db, adminAuth } = require('./firebase-admin')
const { isConfigured: cloudinaryConfigured, validateUpload, uploadBuffer } = require('./cloudinary')

const app = express()

// ── Security Headers ──────────────────────────────────────────────────────────

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  })
)

// ── Compression ───────────────────────────────────────────────────────────────

app.use(compression())

// ── CORS ──────────────────────────────────────────────────────────────────────

const rawOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:5000,http://localhost:3000'
const allowedOrigins = rawOrigins
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (origin.endsWith('.replit.dev') || origin.endsWith('.repl.co')) return callback(null, true)
      if (origin.endsWith('.replit.app')) return callback(null, true)
      if (origin.endsWith('.vercel.app')) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error(`CORS: origin ${origin} is not allowed`))
    },
    credentials: true,
  })
)

app.set('trust proxy', 1)
app.use(express.json({ limit: '10kb' }))

// ── Request Logger ────────────────────────────────────────────────────────────

app.use((req, _res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  }
  next()
})

// ── Health Check ──────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      firestore: !!db,
      auth: !!adminAuth,
      cloudinary: cloudinaryConfigured,
    },
  })
})

// ── Rate Limiters ─────────────────────────────────────────────────────────────

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many contact submissions, please try again later.' },
})

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Upload limit reached. Please try again later.' },
})

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})

app.use('/api/', generalLimiter)

// ── Auth Middleware ───────────────────────────────────────────────────────────

async function authenticateToken(req, res, next) {
  if (!adminAuth) {
    return res.status(503).json({
      error: 'Authentication service unavailable. Firebase credentials are not configured.',
    })
  }
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Access token required' })
  try {
    const decoded = await adminAuth.verifyIdToken(token)
    req.user = { id: decoded.uid, email: decoded.email, role: decoded.role || 'user' }
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required' })
  next()
}

// ── Input Validators ──────────────────────────────────────────────────────────

function validateEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function sanitizeString(str, maxLen = 500) {
  if (typeof str !== 'string') return ''
  return str.trim().slice(0, maxLen)
}

// ── Admin Seeding ─────────────────────────────────────────────────────────────
// Exposed as a separate export so it can be called from index.js on cold start.

async function seedAdmin() {
  if (!adminAuth || !db) {
    console.warn('[seedAdmin] Skipping: Firebase Admin SDK not initialized.')
    return
  }

  try {
    const adminDocs = await db.collection('users').where('role', '==', 'admin').get()
    for (const doc of adminDocs.docs) {
      const data = doc.data()
      try {
        const firebaseUser = await adminAuth.getUser(doc.id)
        const claims = firebaseUser.customClaims || {}
        if (claims.role !== 'admin') {
          await adminAuth.setCustomUserClaims(doc.id, { role: 'admin' })
          console.log(`[seedAdmin] Admin custom claims applied to: ${data.email}`)
        }
      } catch (err) {
        console.warn(`[seedAdmin] Could not sync claims for ${data.email}:`, err.message)
      }
    }
  } catch (err) {
    console.warn('[seedAdmin] Could not sync existing admin claims:', err.message)
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.warn('[seedAdmin] ADMIN_EMAIL or ADMIN_PASSWORD not set. Skipping seed.')
    return
  }

  let adminUser
  try {
    adminUser = await adminAuth.getUserByEmail(ADMIN_EMAIL.toLowerCase())
  } catch {
    adminUser = await adminAuth.createUser({
      email: ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASSWORD,
      displayName: 'Administrator',
      emailVerified: true,
    })
    console.log(`[seedAdmin] Admin Firebase Auth user created: ${ADMIN_EMAIL}`)
  }

  const claims = adminUser.customClaims || {}
  if (claims.role !== 'admin') {
    await adminAuth.setCustomUserClaims(adminUser.uid, { role: 'admin' })
    console.log(`[seedAdmin] Admin custom claims set for: ${ADMIN_EMAIL}`)
  }

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
    console.log(`[seedAdmin] Admin Firestore profile created: ${ADMIN_EMAIL}`)
  }
}

// ── Auth Routes ───────────────────────────────────────────────────────────────

app.post('/api/auth/profile', authLimiter, authenticateToken, async (req, res) => {
  try {
    const { name } = req.body
    const ref = db.collection('users').doc(req.user.id)
    const existing = await ref.get()
    if (existing.exists) {
      const { passwordHash, ...safe } = existing.data()
      return res.json(safe)
    }
    const safeName = sanitizeString(name || req.user.email.split('@')[0], 100)
    const profile = {
      id: req.user.id,
      name: safeName,
      email: req.user.email.toLowerCase(),
      createdAt: new Date().toISOString(),
      plan: 'Free Consultation',
      role: 'user',
      creditScore: null,
    }
    await ref.set(profile)
    res.status(201).json(profile)
  } catch (err) {
    console.error('Profile create error:', err)
    res.status(500).json({ error: 'Server error during profile creation' })
  }
})

app.get('/api/auth/me', authLimiter, authenticateToken, async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.user.id).get()
    if (!doc.exists) return res.status(404).json({ error: 'User not found' })
    const user = doc.data()
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      role: user.role || 'user',
      createdAt: user.createdAt,
      creditScore: user.creditScore ?? null,
    })
  } catch (err) {
    console.error('Me error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── Contact Form ──────────────────────────────────────────────────────────────

app.post('/api/contacts', contactLimiter, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database service unavailable.' })
  try {
    const { fullName, email, phone, serviceOfInterest, message } = req.body

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }
    if (sanitizeString(fullName, 100).length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' })
    }
    if (sanitizeString(message, 5000).length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters' })
    }

    const id = uuidv4()
    const contact = {
      id,
      fullName: sanitizeString(fullName, 100),
      email: email.toLowerCase().trim(),
      phone: sanitizeString(phone || '', 20),
      serviceOfInterest: sanitizeString(serviceOfInterest || 'General Inquiry', 100),
      message: sanitizeString(message, 5000),
      status: 'new',
      createdAt: new Date().toISOString(),
    }
    await db.collection('contacts').doc(id).set(contact)
    res.status(201).json({
      success: true,
      message: "Your message has been received. We'll be in touch shortly!",
    })
  } catch (err) {
    console.error('Contact submit error:', err)
    res.status(500).json({ error: 'Failed to submit contact form' })
  }
})

// ── Cloudinary Upload ─────────────────────────────────────────────────────────

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
})

app.post(
  '/api/upload',
  uploadLimiter,
  authenticateToken,
  upload.single('file'),
  async (req, res) => {
    if (!cloudinaryConfigured) {
      return res.status(503).json({ error: 'File upload service is not configured.' })
    }
    const validation = validateUpload(req.file)
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error })
    }
    try {
      const folder = sanitizeString(req.body.folder || 'general', 50)
      const result = await uploadBuffer(req.file.buffer, {
        folder: `proximity-credit-repair/${folder}`,
      })
      res.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      })
    } catch (err) {
      console.error('Upload error:', err)
      res.status(500).json({ error: 'File upload failed. Please try again.' })
    }
  }
)

// ── Admin Routes ──────────────────────────────────────────────────────────────

app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [usersSnap, contactsSnap, listResult] = await Promise.all([
      db.collection('users').get(),
      db.collection('contacts').get(),
      adminAuth.listUsers(1000),
    ])
    const firestoreUsers = usersSnap.docs.map((d) => d.data())
    const contacts = contactsSnap.docs.map((d) => d.data())
    const now = new Date()
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000)

    const adminUids = new Set(
      firestoreUsers.filter((u) => u.role === 'admin').map((u) => u.id)
    )
    const firestoreMap = {}
    firestoreUsers
      .filter((u) => u.role !== 'admin')
      .forEach((u) => {
        firestoreMap[u.id] = u
      })

    const regularUsers = listResult.users
      .filter(
        (u) =>
          !adminUids.has(u.uid) &&
          !(u.customClaims && u.customClaims.role === 'admin')
      )
      .map(
        (u) =>
          firestoreMap[u.uid] || {
            id: u.uid,
            plan: 'Free Consultation',
            createdAt: u.metadata.creationTime || new Date().toISOString(),
          }
      )

    res.json({
      totalUsers: regularUsers.length,
      newUsersThisMonth: regularUsers.filter((u) => new Date(u.createdAt) > thirtyDaysAgo).length,
      totalContacts: contacts.length,
      newContactsThisMonth: contacts.filter((c) => new Date(c.createdAt) > thirtyDaysAgo).length,
      unreadContacts: contacts.filter((c) => c.status === 'new').length,
      plans: regularUsers.reduce((acc, u) => {
        acc[u.plan] = (acc[u.plan] || 0) + 1
        return acc
      }, {}),
    })
  } catch (err) {
    console.error('Admin stats error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [snapshot, listResult] = await Promise.all([
      db.collection('users').get(),
      adminAuth.listUsers(1000),
    ])

    const firestoreMap = {}
    snapshot.docs.forEach((d) => {
      const data = d.data()
      if (data.role !== 'admin') {
        const { passwordHash, ...safe } = data
        firestoreMap[d.id] = safe
      }
    })

    const adminUids = new Set(
      snapshot.docs.filter((d) => d.data().role === 'admin').map((d) => d.id)
    )

    const merged = []
    for (const authUser of listResult.users) {
      if (adminUids.has(authUser.uid)) continue
      if (authUser.customClaims && authUser.customClaims.role === 'admin') continue

      if (firestoreMap[authUser.uid]) {
        merged.push(firestoreMap[authUser.uid])
      } else {
        merged.push({
          id: authUser.uid,
          name: authUser.displayName || authUser.email.split('@')[0],
          email: authUser.email,
          plan: 'Free Consultation',
          role: 'user',
          createdAt: authUser.metadata.creationTime || new Date().toISOString(),
          creditScore: null,
        })
      }
    }

    res.json(merged)
  } catch (err) {
    console.error('Admin users error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.patch('/api/admin/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const ref = db.collection('users').doc(req.params.id)
    let doc = await ref.get()

    if (!doc.exists) {
      let authUser
      try {
        authUser = await adminAuth.getUser(req.params.id)
      } catch {
        return res.status(404).json({ error: 'User not found' })
      }
      if (authUser.customClaims && authUser.customClaims.role === 'admin') {
        return res.status(403).json({ error: 'Cannot modify admin users' })
      }
      await ref.set({
        id: authUser.uid,
        name: authUser.displayName || authUser.email.split('@')[0],
        email: authUser.email,
        plan: 'Free Consultation',
        role: 'user',
        createdAt: authUser.metadata.creationTime || new Date().toISOString(),
        creditScore: null,
      })
      doc = await ref.get()
    }

    if (doc.data().role === 'admin')
      return res.status(403).json({ error: 'Cannot modify admin users' })

    const { plan, creditScore } = req.body
    const updates = {}
    if (plan !== undefined) updates.plan = sanitizeString(plan, 50)
    if (creditScore !== undefined) {
      const score = Number(creditScore)
      if (!Number.isNaN(score) && (score === null || (score >= 300 && score <= 850))) {
        updates.creditScore = creditScore === null ? null : score
      }
    }
    await ref.update(updates)
    const { passwordHash, ...safe } = (await ref.get()).data()
    res.json(safe)
  } catch (err) {
    console.error('Admin patch user error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.delete('/api/admin/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.params.id).get()
    if (!doc.exists) return res.status(404).json({ error: 'User not found' })
    if (doc.data().role === 'admin')
      return res.status(403).json({ error: 'Cannot delete admin users' })
    await adminAuth.deleteUser(req.params.id).catch(() => {})
    await db.collection('users').doc(req.params.id).delete()
    res.json({ success: true })
  } catch (err) {
    console.error('Admin delete user error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/api/admin/contacts', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('contacts').get()
    const contacts = snapshot.docs
      .map((d) => d.data())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    res.json(contacts)
  } catch (err) {
    console.error('Admin contacts error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.patch('/api/admin/contacts/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const ref = db.collection('contacts').doc(req.params.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ error: 'Contact not found' })
    const { status } = req.body
    const validStatuses = ['new', 'in-progress', 'resolved']
    if (status && validStatuses.includes(status)) {
      await ref.update({ status })
    }
    res.json((await ref.get()).data())
  } catch (err) {
    console.error('Admin patch contact error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.delete('/api/admin/contacts/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const doc = await db.collection('contacts').doc(req.params.id).get()
    if (!doc.exists) return res.status(404).json({ error: 'Contact not found' })
    await db.collection('contacts').doc(req.params.id).delete()
    res.json({ success: true })
  } catch (err) {
    console.error('Admin delete contact error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── Admin Services CRUD ───────────────────────────────────────────────────────

const DEFAULT_SERVICES = [
  {
    id: 'credit-analysis',
    icon: 'BarChart2',
    title: 'Credit Analysis',
    shortDescription:
      'A thorough review of your full credit report to identify errors, negative items, and opportunities for improvement.',
    description:
      'Our certified specialists perform a comprehensive, three-bureau credit analysis to map every factor affecting your score. We identify every inaccuracy, outdated record, and negative item, then build a custom action plan tailored to your unique credit profile.',
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
      'Our experienced dispute specialists craft legally precise challenge letters targeting inaccurate, unverifiable, or outdated items on your credit report. We manage the entire process — from drafting to follow-up — so you never have to navigate the bureaucracy alone.',
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
      'Stay fully informed with dedicated score monitoring that tracks changes across all three credit bureaus. Our monthly progress reports break down every improvement and flag any new negative items the moment they appear, so you are always one step ahead.',
    benefits: [
      'Real-time alerts for any new negative items or inquiries',
      'Monthly three-bureau score summary reports',
      'Track score improvements as disputes are resolved',
      'Identify potential fraud or identity theft early',
      'Expert analysis of each change and what it means for you',
    ],
    order: 2,
  },
  {
    id: 'debt-validation',
    icon: 'Shield',
    title: 'Debt Validation',
    shortDescription:
      'We demand proof that collectors have the legal right to collect — and challenge what they cannot verify.',
    description:
      'Under the Fair Debt Collection Practices Act, debt collectors are legally required to validate the debts they claim you owe. Our team sends certified validation requests to collectors and challenges any debt that cannot be properly verified, protecting your rights and your credit.',
    benefits: [
      'Force collectors to prove the debt is legally valid and accurate',
      'Remove unverifiable or statute-barred debts from your report',
      'Protect your rights under the FDCPA',
      'Challenge inflated balances and unauthorized fees',
      'Negotiate removal of verified debts as part of payment agreements',
    ],
    order: 3,
  },
  {
    id: 'creditor-negotiation',
    icon: 'Handshake',
    title: 'Creditor Negotiation',
    shortDescription:
      'Our specialists negotiate directly with creditors to settle, reduce, or remove negative accounts on your behalf.',
    description:
      'Navigating creditor negotiations alone can be overwhelming and costly. Our Premium and VIP clients benefit from direct, professional negotiation with creditors — whether that means arranging pay-for-delete agreements, settling past-due balances at a reduced amount, or securing goodwill removals.',
    benefits: [
      'Pay-for-delete agreements to remove settled accounts from your report',
      'Negotiate reduced settlement amounts on outstanding balances',
      'Goodwill letter campaigns targeting creditors for compassionate removals',
      'Legal demand letters where creditors are in violation',
      'Full documentation of all negotiation outcomes for your records',
    ],
    order: 4,
  },
  {
    id: 'educational-resources',
    icon: 'BookOpen',
    title: 'Educational Resources',
    shortDescription:
      'Gain the financial knowledge you need to maintain excellent credit long after your repair is complete.',
    description:
      'A strong credit score requires ongoing knowledge and habits. Standard, Premium, and VIP clients get full access to our library of guides, video tutorials, and interactive tools covering credit fundamentals, budgeting strategies, and score optimization.',
    benefits: [
      'Step-by-step guides on credit scoring, reporting, and improvement',
      'Video tutorials on budgeting, debt management, and financial planning',
      'Interactive credit score simulator to model future decisions',
      'Monthly newsletters with insider tips and industry updates',
      'Direct access to our knowledge base and expert Q&A library',
    ],
    order: 5,
  },
  {
    id: 'identity-protection',
    icon: 'ShieldCheck',
    title: 'Identity Theft Protection',
    shortDescription:
      'Continuous monitoring and rapid response to protect your identity and credit from fraud.',
    description:
      'Identity theft can undo months of credit repair progress in days. Our VIP clients receive comprehensive identity protection — including dark web monitoring, real-time fraud alerts, and dedicated recovery support if your identity is ever compromised.',
    benefits: [
      'Dark web monitoring for your personal and financial data',
      'Instant alerts if your information is found in a data breach',
      'Dedicated identity theft recovery specialist on standby',
      'Assistance filing fraud alerts and security freezes with all three bureaus',
      'Reimbursement support documentation for identity theft losses',
    ],
    order: 6,
  },
]

async function getServicesCollection() {
  const snap = await db.collection('services').orderBy('order', 'asc').get()
  if (snap.empty) {
    const batch = db.batch()
    for (const svc of DEFAULT_SERVICES) {
      batch.set(db.collection('services').doc(svc.id), svc)
    }
    await batch.commit()
    return DEFAULT_SERVICES
  }
  return snap.docs.map((d) => d.data())
}

app.get('/api/admin/services', authenticateToken, requireAdmin, async (req, res) => {
  try {
    res.json(await getServicesCollection())
  } catch (err) {
    console.error('Admin get services error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/api/admin/services', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, icon, shortDescription, description, benefits } = req.body
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' })
    }
    const snap = await db.collection('services').get()
    const maxOrder = snap.empty
      ? 0
      : Math.max(...snap.docs.map((d) => d.data().order || 0)) + 1
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const service = {
      id,
      title: sanitizeString(title, 100),
      icon: sanitizeString(icon || 'Star', 50),
      shortDescription: sanitizeString(shortDescription || '', 300),
      description: sanitizeString(description, 2000),
      benefits: Array.isArray(benefits)
        ? benefits.map((b) => sanitizeString(b, 200)).filter(Boolean)
        : [],
      order: maxOrder,
    }
    await db.collection('services').doc(id).set(service)
    res.status(201).json(service)
  } catch (err) {
    console.error('Admin create service error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.put('/api/admin/services/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const ref = db.collection('services').doc(req.params.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ error: 'Service not found' })
    const { title, icon, shortDescription, description, benefits } = req.body
    const updates = {}
    if (title !== undefined) updates.title = sanitizeString(title, 100)
    if (icon !== undefined) updates.icon = sanitizeString(icon, 50)
    if (shortDescription !== undefined)
      updates.shortDescription = sanitizeString(shortDescription, 300)
    if (description !== undefined) updates.description = sanitizeString(description, 2000)
    if (Array.isArray(benefits))
      updates.benefits = benefits.map((b) => sanitizeString(b, 200)).filter(Boolean)
    await ref.update(updates)
    res.json((await ref.get()).data())
  } catch (err) {
    console.error('Admin update service error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.delete('/api/admin/services/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const doc = await db.collection('services').doc(req.params.id).get()
    if (!doc.exists) return res.status(404).json({ error: 'Service not found' })
    await db.collection('services').doc(req.params.id).delete()
    res.json({ success: true })
  } catch (err) {
    console.error('Admin delete service error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── Plan Selection ─────────────────────────────────────────────────────────────

app.post('/api/users/plan', authLimiter, authenticateToken, async (req, res) => {
  try {
    const { planId } = req.body
    const validPlans = [
      'Free Consultation',
      'Basic Plan',
      'Standard Plan',
      'Premium Plan',
      'VIP Plan',
    ]
    if (!planId || !validPlans.includes(planId)) {
      return res.status(400).json({ error: 'Invalid plan selected.' })
    }
    const ref = db.collection('users').doc(req.user.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ error: 'User profile not found.' })
    await ref.update({ plan: planId })
    res.json({ plan: planId })
  } catch (err) {
    console.error('Plan selection error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── 404 ───────────────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// ── Error Handler ─────────────────────────────────────────────────────────────

app.use((err, _req, res, _next) => {
  console.error('[unhandled error]', err.message)
  res.status(500).json({ error: 'Internal server error' })
})

module.exports = { app, seedAdmin }
