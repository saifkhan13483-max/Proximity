import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  getFirestore,
  type Firestore,
} from 'firebase/firestore'

// Supports both the legacy Replit define() approach and standard VITE_* env vars.
// For /client (Vercel deployment), only VITE_* vars are used.
function getEnv(viteKey: string, legacyGlobal: string): string {
  // Standard VITE_* env vars (Vercel + local .env)
  const viteVal = import.meta.env[viteKey] as string | undefined
  if (viteVal) return viteVal

  // Legacy Replit define() globals (backward-compat for root-level Replit app)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = (globalThis as any)[legacyGlobal]
    if (typeof val === 'string' && val) return val
  } catch {
    // not defined — ignore
  }

  return ''
}

const apiKey = getEnv('VITE_FIREBASE_API_KEY', '__FB_API_KEY__')

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

if (apiKey) {
  try {
    const firebaseConfig = {
      apiKey,
      authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN', '__FB_AUTH_DOMAIN__'),
      projectId: getEnv('VITE_FIREBASE_PROJECT_ID', '__FB_PROJECT_ID__'),
      storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET', '__FB_STORAGE_BUCKET__'),
      messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', '__FB_MESSAGING_SENDER_ID__'),
      appId: getEnv('VITE_FIREBASE_APP_ID', '__FB_APP_ID__'),
    }
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)

    try {
      db = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      })
    } catch {
      db = getFirestore(app)
    }
  } catch (err) {
    console.warn('[firebase] Failed to initialize Firebase client SDK:', err)
  }
} else {
  console.warn(
    '[firebase] Firebase API key is not configured. Set VITE_FIREBASE_API_KEY or apiKey env var.'
  )
}

export { auth, db }
export default app
