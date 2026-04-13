const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const db = require('./firebase')

// ── Process-level error protection ───────────────────────────────────────────

process.on('uncaughtException', (err) => {
  console.error('[uncaughtException] Server will continue:', err.message)
})

process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection] Server will continue:', reason)
})

// ── Startup validation ────────────────────────────────────────────────────────

if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is not set. Refusing to start.')
  process.exit(1)
}

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET

// ── CORS ──────────────────────────────────────────────────────────────────────

const rawOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:5000,http://localhost:3000'
const allowedOrigins = rawOrigins.split(',').map((o) => o.trim()).filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS: origin ${origin} is not allowed`))
      }
    },
    credentials: true,
  })
)

app.set('trust proxy', 1)
app.use(express.json())

// ── Seed Admin User ─────────────────────────────────────────────────────────
// Re-seeds on every startup so the admin account survives ephemeral redeploys.

const ADMIN_EMAIL = 'saifkhan13483@gmail.com'
const ADMIN_PASSWORD = 'saifkhan13483@gmail.com'

async function seedAdmin() {
  const snapshot = await db.collection('users')
    .where('email', '==', ADMIN_EMAIL.toLowerCase())
    .get()

  if (!snapshot.empty) return

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12)
  const id = uuidv4()
  await db.collection('users').doc(id).set({
    id,
    name: 'Saif Khan',
    email: ADMIN_EMAIL.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
    plan: 'Admin',
    role: 'admin',
    creditScore: null,
  })
  console.log(`Admin account seeded: ${ADMIN_EMAIL}`)
}

// ── Middleware ──────────────────────────────────────────────────────────────

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Access token required' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
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

// ── Auth Routes ─────────────────────────────────────────────────────────────

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ error: 'Name, email, and password are required' })
    if (password.length < 8)
      return res.status(400).json({ error: 'Password must be at least 8 characters' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: 'Invalid email address' })

    const normalizedEmail = email.toLowerCase().trim()

    if (normalizedEmail === ADMIN_EMAIL.toLowerCase())
      return res.status(409).json({ error: 'An account with this email already exists' })

    const existing = await db.collection('users').where('email', '==', normalizedEmail).get()
    if (!existing.empty)
      return res.status(409).json({ error: 'An account with this email already exists' })

    const passwordHash = await bcrypt.hash(password, 12)
    const id = uuidv4()
    const user = {
      id,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date().toISOString(),
      plan: 'Free Consultation',
      role: 'user',
      creditScore: null,
    }
    await db.collection('users').doc(id).set(user)

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, plan: user.plan, role: user.role, createdAt: user.createdAt },
    })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ error: 'Server error during registration' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' })

    const snapshot = await db.collection('users')
      .where('email', '==', email.toLowerCase().trim())
      .limit(1)
      .get()

    if (snapshot.empty)
      return res.status(401).json({ error: 'Invalid email or password' })

    const user = snapshot.docs[0].data()
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid)
      return res.status(401).json({ error: 'Invalid email or password' })

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role || 'user' },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, plan: user.plan, role: user.role || 'user', createdAt: user.createdAt },
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Server error during login' })
  }
})

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.user.id).get()
    if (!doc.exists) return res.status(404).json({ error: 'User not found' })
    const user = doc.data()
    res.json({ id: user.id, name: user.name, email: user.email, plan: user.plan, role: user.role || 'user', createdAt: user.createdAt, creditScore: user.creditScore ?? null })
  } catch (err) {
    console.error('Me error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── Contact Form Route ───────────────────────────────────────────────────────

app.post('/api/contacts', async (req, res) => {
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
    const newUsersThisMonth = regularUsers.filter((u) => new Date(u.createdAt) > thirtyDaysAgo)
    const newContactsThisMonth = contacts.filter((c) => new Date(c.createdAt) > thirtyDaysAgo)
    const newContacts = contacts.filter((c) => c.status === 'new')

    res.json({
      totalUsers: regularUsers.length,
      newUsersThisMonth: newUsersThisMonth.length,
      totalContacts: contacts.length,
      newContactsThisMonth: newContactsThisMonth.length,
      unreadContacts: newContacts.length,
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
    const user = doc.data()
    if (user.role === 'admin') return res.status(403).json({ error: 'Cannot modify admin users' })

    const { plan, creditScore } = req.body
    const updates = {}
    if (plan !== undefined) updates.plan = plan
    if (creditScore !== undefined) updates.creditScore = creditScore

    await ref.update(updates)
    const updated = (await ref.get()).data()
    const { passwordHash, ...safe } = updated
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
    const updated = (await ref.get()).data()
    res.json(updated)
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
    if (!planId || !VALID_PLANS[planId]) {
      return res.status(400).json({ error: 'Invalid plan selected' })
    }
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

function healthResponse() {
  return { status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() }
}

app.get('/health', (_req, res) => res.json(healthResponse()))
app.get('/api/health', (_req, res) => res.json(healthResponse()))

// ── Start ─────────────────────────────────────────────────────────────────────

seedAdmin().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Proximity Auth API running on port ${PORT}`)
  })
})
