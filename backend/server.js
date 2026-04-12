const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3001
const JWT_SECRET = process.env.JWT_SECRET || 'proximity-credit-repair-secret-2026'
const USERS_FILE = path.join(__dirname, 'users.json')
const CONTACTS_FILE = path.join(__dirname, 'contacts.json')

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

// ── Data Helpers ───────────────────────────────────────────────────────────

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return []
  try { return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) } catch { return [] }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

function loadContacts() {
  if (!fs.existsSync(CONTACTS_FILE)) return []
  try { return JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8')) } catch { return [] }
}

function saveContacts(contacts) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2))
}

// ── Seed Admin User ─────────────────────────────────────────────────────────

async function seedAdmin() {
  const users = loadUsers()
  const adminExists = users.find((u) => u.role === 'admin')
  if (!adminExists) {
    const passwordHash = await bcrypt.hash('Admin@2026!', 12)
    users.push({
      id: uuidv4(),
      name: 'Admin',
      email: 'admin@proximity.com',
      passwordHash,
      createdAt: new Date().toISOString(),
      plan: 'Admin',
      role: 'admin',
      creditScore: null,
    })
    saveUsers(users)
    console.log('Admin account seeded: admin@proximity.com / Admin@2026!')
  }
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

    const users = loadUsers()
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
      return res.status(409).json({ error: 'An account with this email already exists' })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = {
      id: uuidv4(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      createdAt: new Date().toISOString(),
      plan: 'Free Consultation',
      role: 'user',
      creditScore: null,
    }
    users.push(user)
    saveUsers(users)

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

    const users = loadUsers()
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!user) return res.status(401).json({ error: 'Invalid email or password' })

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' })

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

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const users = loadUsers()
  const user = users.find((u) => u.id === req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ id: user.id, name: user.name, email: user.email, plan: user.plan, role: user.role || 'user', createdAt: user.createdAt })
})

// ── Contact Form Route ───────────────────────────────────────────────────────

app.post('/api/contacts', async (req, res) => {
  try {
    const { fullName, email, phone, serviceOfInterest, message } = req.body
    if (!fullName || !email || !message)
      return res.status(400).json({ error: 'Name, email, and message are required' })

    const contacts = loadContacts()
    const contact = {
      id: uuidv4(),
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone || '',
      serviceOfInterest: serviceOfInterest || 'General Inquiry',
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    }
    contacts.push(contact)
    saveContacts(contacts)

    res.status(201).json({ success: true, message: 'Your message has been received. We\'ll be in touch shortly!' })
  } catch (err) {
    console.error('Contact submit error:', err)
    res.status(500).json({ error: 'Failed to submit contact form' })
  }
})

// ── Admin Routes ─────────────────────────────────────────────────────────────

app.get('/api/admin/stats', authenticateToken, requireAdmin, (req, res) => {
  const users = loadUsers()
  const contacts = loadContacts()
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
})

app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  const users = loadUsers()
  const safeUsers = users
    .filter((u) => u.role !== 'admin')
    .map(({ passwordHash, ...u }) => u)
  res.json(safeUsers)
})

app.patch('/api/admin/users/:id', authenticateToken, requireAdmin, (req, res) => {
  const users = loadUsers()
  const idx = users.findIndex((u) => u.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'User not found' })
  if (users[idx].role === 'admin') return res.status(403).json({ error: 'Cannot modify admin users' })

  const { plan, creditScore } = req.body
  if (plan !== undefined) users[idx].plan = plan
  if (creditScore !== undefined) users[idx].creditScore = creditScore

  saveUsers(users)
  const { passwordHash, ...safe } = users[idx]
  res.json(safe)
})

app.delete('/api/admin/users/:id', authenticateToken, requireAdmin, (req, res) => {
  const users = loadUsers()
  const idx = users.findIndex((u) => u.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'User not found' })
  if (users[idx].role === 'admin') return res.status(403).json({ error: 'Cannot delete admin users' })

  users.splice(idx, 1)
  saveUsers(users)
  res.json({ success: true })
})

app.get('/api/admin/contacts', authenticateToken, requireAdmin, (req, res) => {
  const contacts = loadContacts()
  res.json(contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
})

app.patch('/api/admin/contacts/:id', authenticateToken, requireAdmin, (req, res) => {
  const contacts = loadContacts()
  const idx = contacts.findIndex((c) => c.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Contact not found' })

  const { status } = req.body
  if (status) contacts[idx].status = status
  saveContacts(contacts)
  res.json(contacts[idx])
})

app.delete('/api/admin/contacts/:id', authenticateToken, requireAdmin, (req, res) => {
  const contacts = loadContacts()
  const idx = contacts.findIndex((c) => c.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Contact not found' })

  contacts.splice(idx, 1)
  saveContacts(contacts)
  res.json({ success: true })
})

// ── Health ───────────────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── Start ─────────────────────────────────────────────────────────────────────

seedAdmin().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Proximity Auth API running on port ${PORT}`)
  })
})
