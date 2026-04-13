const admin = require('firebase-admin')

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY

if (!projectId || !clientEmail || !privateKey) {
  console.warn(
    '[firebase] WARNING: Firebase Admin credentials are not configured. ' +
    'Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables. ' +
    'The API will start but database operations will fail until credentials are provided.'
  )
}

let db, adminAuth

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey ? privateKey.replace(/\\n/g, '\n') : undefined,
      }),
    })
  }
  db = admin.firestore()
  adminAuth = admin.auth()
} catch (err) {
  console.error('[firebase] Failed to initialize Firebase Admin SDK:', err.message)
  db = null
  adminAuth = null
}

module.exports = { db, adminAuth }
