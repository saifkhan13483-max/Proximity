const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const { rateLimit } = require('express-rate-limit')
const { v4: uuidv4 } = require('uuid')
const { db, adminAuth } = require('./firebase')

const app = express()

// ── Security Headers ──────────────────────────────────────────────────────────

app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false,
}))

// ── Compression ───────────────────────────────────────────────────────────────

app.use(compression())

// ── CORS ──────────────────────────────────────────────────────────────────────

const rawOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:5000,http://localhost:3000'
const allowedOrigins = rawOrigins.split(',').map((o) => o.trim()).filter(Boolean)

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
    const ts = new Date().toISOString()
    console.log(`[${ts}] ${req.method} ${req.path}`)
  }
  next()
})

// ── Rate Limiters ─────────────────────────────────────────────────────────────

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
  skipSuccessfulRequests: false,
})

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many contact submissions, please try again later.' },
})

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})

app.use('/api/', generalLimiter)

// ── Seed Admin User ───────────────────────────────────────────────────────────

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@proximitycreditrepair.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

async function seedAdmin() {
  if (!adminAuth || !db) {
    console.warn('[seedAdmin] Skipping: Firebase Admin SDK not initialized.')
    return
  }

  // Step 1: Sync custom claims for ALL users already marked as admin in Firestore
  try {
    const adminDocs = await db.collection('users').where('role', '==', 'admin').get()
    for (const doc of adminDocs.docs) {
      const data = doc.data()
      try {
        const firebaseUser = await adminAuth.getUser(doc.id)
        const claims = firebaseUser.customClaims || {}
        if (claims.role !== 'admin') {
          await adminAuth.setCustomUserClaims(doc.id, { role: 'admin' })
          console.log(`[seedAdmin] Admin custom claims applied to existing admin: ${data.email}`)
        } else {
          console.log(`[seedAdmin] Admin claims already set for: ${data.email}`)
        }
      } catch (err) {
        console.warn(`[seedAdmin] Could not sync claims for ${data.email}:`, err.message)
      }
    }
  } catch (err) {
    console.warn('[seedAdmin] Could not sync existing admin claims:', err.message)
  }

  // Step 2: Ensure the ADMIN_EMAIL account exists and has admin role
  if (!ADMIN_PASSWORD) {
    console.warn('[seedAdmin] Skipping ADMIN_EMAIL seed: ADMIN_PASSWORD environment variable is not set.')
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

    const oldDocs = await db.collection('users')
      .where('email', '==', ADMIN_EMAIL.toLowerCase())
      .where('role', '==', 'admin')
      .get()
    for (const old of oldDocs.docs) {
      if (old.id !== adminUser.uid) await old.ref.delete()
    }
  }
}

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
    firestoreUsers.filter((u) => u.role !== 'admin').forEach((u) => { firestoreMap[u.id] = u })

    const regularUsers = listResult.users
      .filter((u) => !adminUids.has(u.uid) && !(u.customClaims && u.customClaims.role === 'admin'))
      .map((u) => firestoreMap[u.uid] || {
        id: u.uid,
        plan: 'Free Consultation',
        createdAt: u.metadata.creationTime || new Date().toISOString(),
      })

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

    if (doc.data().role === 'admin') return res.status(403).json({ error: 'Cannot modify admin users' })
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
    if (doc.data().role === 'admin') return res.status(403).json({ error: 'Cannot delete admin users' })
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

// ── User Plan Selection ───────────────────────────────────────────────────────

const VALID_PLANS = {
  basic: 'Basic Plan',
  standard: 'Standard Plan',
  premium: 'Premium Plan',
  vip: 'VIP Plan',
}

app.post('/api/users/plan', authLimiter, authenticateToken, async (req, res) => {
  try {
    const { planId } = req.body
    if (!planId || !VALID_PLANS[planId]) {
      return res.status(400).json({ error: 'Invalid plan selected' })
    }
    const ref = db.collection('users').doc(req.user.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ error: 'User not found' })
    if (doc.data().role === 'admin') {
      return res.status(403).json({ error: 'Admin accounts cannot select plans' })
    }
    await ref.update({ plan: VALID_PLANS[planId] })
    res.json({ plan: VALID_PLANS[planId] })
  } catch (err) {
    console.error('Plan selection error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── Health ────────────────────────────────────────────────────────────────────

app.get('/health', (_req, res) =>
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() })
)
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() })
)

// ── 404 & Error Handler ───────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err, _req, res, _next) => {
  console.error('[unhandled error]', err.message)
  res.status(500).json({ error: 'Internal server error' })
})

module.exports = { app, seedAdmin }
