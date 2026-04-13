const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const { db, adminAuth } = require('./firebase')

// ── Process-level error protection ───────────────────────────────────────────

process.on('uncaughtException', (err) => {
  console.error('[uncaughtException] Server will continue:', err.message)
})

process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection] Server will continue:', reason)
})

const app = express()
const PORT = process.env.PORT || 3001

// ── CORS ──────────────────────────────────────────────────────────────────────

const rawOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:5000,http://localhost:3000'
const allowedOrigins = rawOrigins.split(',').map((o) => o.trim()).filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. same-origin proxy, curl)
      if (!origin) return callback(null, true)
      // Allow any replit.dev subdomain for the dev preview
      if (origin.endsWith('.replit.dev') || origin.endsWith('.repl.co')) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error(`CORS: origin ${origin} is not allowed`))
    },
    credentials: true,
  })
)

app.set('trust proxy', 1)
app.use(express.json())

// ── Seed Admin User ──────────────────────────────────────────────────────────
// Creates the admin in Firebase Auth + Firestore on every startup if missing.

const ADMIN_EMAIL = 'saifkhan13483@gmail.com'
const ADMIN_PASSWORD = 'saifkhan13483@gmail.com'

async function seedAdmin() {
  if (!adminAuth || !db) {
    console.warn('[seedAdmin] Skipping: Firebase Admin SDK not initialized.')
    return
  }
  let adminUser
  try {
    adminUser = await adminAuth.getUserByEmail(ADMIN_EMAIL.toLowerCase())
  } catch {
    adminUser = await adminAuth.createUser({
      email: ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASSWORD,
      displayName: 'Saif Khan',
      emailVerified: true,
    })
    console.log(`Admin Firebase Auth user created: ${ADMIN_EMAIL}`)
  }

  // Ensure admin custom claim is set
  const claims = adminUser.customClaims || {}
  if (claims.role !== 'admin') {
    await adminAuth.setCustomUserClaims(adminUser.uid, { role: 'admin' })
    console.log(`Admin custom claims set for: ${ADMIN_EMAIL}`)
  }

  // Ensure Firestore profile exists with Firebase UID as document ID
  const ref = db.collection('users').doc(adminUser.uid)
  const doc = await ref.get()
  if (!doc.exists) {
    await ref.set({
      id: adminUser.uid,
      name: 'Saif Khan',
      email: ADMIN_EMAIL.toLowerCase(),
      createdAt: new Date().toISOString(),
      plan: 'Admin',
      role: 'admin',
      creditScore: null,
    })
    console.log(`Admin Firestore profile created: ${ADMIN_EMAIL}`)

    // Clean up any old UUID-based admin documents
    const oldDocs = await db.collection('users')
      .where('email', '==', ADMIN_EMAIL.toLowerCase())
      .where('role', '==', 'admin')
      .get()
    for (const old of oldDocs.docs) {
      if (old.id !== adminUser.uid) {
        await old.ref.delete()
      }
    }
  }
}

// ── Middleware ──────────────────────────────────────────────────────────────

async function authenticateToken(req, res, next) {
  if (!adminAuth) return res.status(503).json({ error: 'Firebase not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.' })
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Access token required' })
  try {
    const decoded = await adminAuth.verifyIdToken(token)
    req.user = {
      id: decoded.uid,
      email: decoded.email,
      role: decoded.role || 'user',
    }
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}

// ── Auth Routes ──────────────────────────────────────────────────────────────

// Called after Firebase registration to create the Firestore user profile
app.post('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body
    const ref = db.collection('users').doc(req.user.id)
    const existing = await ref.get()
    if (existing.exists) {
      const { passwordHash, ...safe } = existing.data()
      return res.json(safe)
    }
    const profile = {
      id: req.user.id,
      name: name || req.user.email.split('@')[0],
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

// Returns the current user's profile from Firestore
app.get('/api/auth/me', authenticateToken, async (req, res) => {
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

// ── Contact Form Route ───────────────────────────────────────────────────────

app.post('/api/contacts', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Firebase not configured.' })
  try {
    const { fullName, email, phone, serviceOfInterest, message } = req.body
    if (!fullName || !email || !message)
      return res.status(400).json({ error: 'Name, email, and message are required' })

    const id = uuidv4()
    const contact = {
      id,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone || '',
      serviceOfInterest: serviceOfInterest || 'General Inquiry',
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    }
    await db.collection('contacts').doc(id).set(contact)
    res.status(201).json({ success: true, message: "Your message has been received. We'll be in touch shortly!" })
  } catch (err) {
    console.error('Contact submit error:', err)
    res.status(500).json({ error: 'Failed to submit contact form' })
  }
})

// ── Admin Routes ─────────────────────────────────────────────────────────────

app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [usersSnap, contactsSnap] = await Promise.all([
      db.collection('users').get(),
      db.collection('contacts').get(),
    ])
    const users = usersSnap.docs.map((d) => d.data())
    const contacts = contactsSnap.docs.map((d) => d.data())
    const now = new Date()
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000)
    const regularUsers = users.filter((u) => u.role !== 'admin')
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
    const snapshot = await db.collection('users').get()
    const safeUsers = snapshot.docs
      .map((d) => d.data())
      .filter((u) => u.role !== 'admin')
      .map(({ passwordHash, ...u }) => u)
    res.json(safeUsers)
  } catch (err) {
    console.error('Admin users error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.patch('/api/admin/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const ref = db.collection('users').doc(req.params.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ error: 'User not found' })
    if (doc.data().role === 'admin') return res.status(403).json({ error: 'Cannot modify admin users' })
    const { plan, creditScore } = req.body
    const updates = {}
    if (plan !== undefined) updates.plan = plan
    if (creditScore !== undefined) updates.creditScore = creditScore
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
    // Delete from Firebase Auth as well
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
    if (status) await ref.update({ status })
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

// ── User Plan Selection ──────────────────────────────────────────────────────

const VALID_PLANS = {
  basic: 'Basic Plan',
  standard: 'Standard Plan',
  premium: 'Premium Plan',
  vip: 'VIP Plan',
}

app.post('/api/users/plan', authenticateToken, async (req, res) => {
  try {
    const { planId } = req.body
    if (!planId || !VALID_PLANS[planId])
      return res.status(400).json({ error: 'Invalid plan selected' })
    const ref = db.collection('users').doc(req.user.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ error: 'User not found' })
    if (doc.data().role === 'admin') return res.status(403).json({ error: 'Admin accounts cannot select plans' })
    await ref.update({ plan: VALID_PLANS[planId] })
    res.json({ plan: VALID_PLANS[planId] })
  } catch (err) {
    console.error('Plan selection error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── Health ───────────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() }))

// ── Start ─────────────────────────────────────────────────────────────────────

seedAdmin().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Proximity Auth API running on port ${PORT}`)
  })
})
