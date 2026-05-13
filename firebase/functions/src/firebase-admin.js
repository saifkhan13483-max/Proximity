const admin = require('firebase-admin')

let db = null
let adminAuth = null

function buildCredential() {
  let fullJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (fullJson) {
    const eqIdx = fullJson.indexOf('={')
    if (eqIdx !== -1) fullJson = fullJson.slice(eqIdx + 1)
    const plainIdx = fullJson.indexOf('{')
    if (plainIdx > 0 && !fullJson.slice(0, plainIdx).includes('\n')) {
      fullJson = fullJson.slice(plainIdx)
    }
    try {
      const sa = JSON.parse(fullJson)
      console.log(`[firebase-admin] Using service account JSON. project=${sa.project_id}`)
      return admin.credential.cert(sa)
    } catch (err) {
      console.error('[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', err.message)
    }
  }

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const rawKey = process.env.FIREBASE_PRIVATE_KEY

  if (!projectId || !clientEmail || !rawKey) {
    console.warn('[firebase-admin] WARNING: Firebase Admin credentials are not configured.')
    return null
  }

  let privateKey = rawKey
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1)
  }
  privateKey = privateKey.replace(/\\n/g, '\n').replace(/\r/g, '').trim()

  console.log(`[firebase-admin] Using individual fields. project=${projectId}, account=${clientEmail}`)
  return admin.credential.cert({ projectId, clientEmail, privateKey })
}

try {
  if (!admin.apps.length) {
    const credential = buildCredential()
    if (credential) {
      admin.initializeApp({ credential })
      db = admin.firestore()
      adminAuth = admin.auth()
      console.log('[firebase-admin] Admin SDK initialized successfully.')
    } else {
      console.warn('[firebase-admin] Skipping initialization — no credentials available.')
    }
  } else {
    db = admin.firestore()
    adminAuth = admin.auth()
  }
} catch (err) {
  console.error('[firebase-admin] Failed to initialize Firebase Admin SDK:', err.message)
  db = null
  adminAuth = null
}

module.exports = { db, adminAuth }
