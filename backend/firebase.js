const admin = require('firebase-admin')

let db = null
let adminAuth = null

function buildCredential() {
  // Preferred: full service account JSON as a single secret (avoids private key formatting issues)
  let fullJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (fullJson) {
    // Strip accidental "KEY_NAME=..." prefix (Replit sometimes stores it that way)
    const eqIdx = fullJson.indexOf('={')
    if (eqIdx !== -1) fullJson = fullJson.slice(eqIdx + 1)
    const plainIdx = fullJson.indexOf('{')
    if (plainIdx > 0 && !fullJson.slice(0, plainIdx).includes('\n')) fullJson = fullJson.slice(plainIdx)
    try {
      const sa = JSON.parse(fullJson)
      console.log(`[firebase] Using FIREBASE_SERVICE_ACCOUNT_JSON. project=${sa.project_id}, account=${sa.client_email}`)
      return admin.credential.cert(sa)
    } catch (err) {
      console.error('[firebase] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', err.message)
    }
  }

  // Fallback: individual fields
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const rawKey = process.env.FIREBASE_PRIVATE_KEY

  if (!projectId || !clientEmail || !rawKey) {
    console.warn('[firebase] WARNING: Firebase Admin credentials are not configured.')
    return null
  }

  // Normalize the private key — handles all common paste formats
  let privateKey = rawKey
  if ((privateKey.startsWith('"') && privateKey.endsWith('"')) ||
      (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
    privateKey = privateKey.slice(1, -1)
  }
  privateKey = privateKey.replace(/\\n/g, '\n').replace(/\r/g, '').trim()

  const lines = privateKey.split('\n')
  console.log(`[firebase] Using individual fields. project=${projectId}, account=${clientEmail}, key_lines=${lines.length}, key_chars=${privateKey.length}`)

  return admin.credential.cert({ projectId, clientEmail, privateKey })
}

try {
  if (!admin.apps.length) {
    const credential = buildCredential()
    if (credential) {
      admin.initializeApp({ credential })
      db = admin.firestore()
      adminAuth = admin.auth()
      console.log('[firebase] Admin SDK initialized successfully.')
    } else {
      console.warn('[firebase] Skipping initialization — no credentials available.')
    }
  } else {
    db = admin.firestore()
    adminAuth = admin.auth()
  }
} catch (err) {
  console.error('[firebase] Failed to initialize Firebase Admin SDK:', err.message)
  db = null
  adminAuth = null
}

module.exports = { db, adminAuth }
