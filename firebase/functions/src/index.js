require('dotenv').config()

const functions = require('firebase-functions')
const { app, seedAdmin } = require('./app')

// ── Main API Export ───────────────────────────────────────────────────────────
// All routes defined in app.js are served under a single Firebase Function.
// This avoids cold-start overhead from multiple function exports.
// In production: https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/api

exports.api = functions
  .runWith({
    timeoutSeconds: 60,
    memory: '256MB',
  })
  .https.onRequest(app)

// ── Admin Seed (HTTP trigger for first-time setup) ────────────────────────────
// Call this once after deployment to seed the admin account:
// https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/seedAdmin
// Protected by a seed token to prevent unauthorized access.

exports.seedAdminFn = functions.https.onRequest(async (req, res) => {
  const expectedToken = process.env.SEED_ADMIN_TOKEN
  const providedToken = req.headers['x-seed-token'] || req.query.token

  if (!expectedToken || providedToken !== expectedToken) {
    return res.status(403).json({ error: 'Forbidden: invalid or missing seed token.' })
  }

  try {
    await seedAdmin()
    res.json({ success: true, message: 'Admin seed completed successfully.' })
  } catch (err) {
    console.error('[seedAdminFn] Error:', err.message)
    res.status(500).json({ error: 'Seed failed', details: err.message })
  }
})
