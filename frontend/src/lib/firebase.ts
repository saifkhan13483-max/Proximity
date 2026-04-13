import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence, type Firestore } from 'firebase/firestore'

declare const __FB_API_KEY__: string
declare const __FB_AUTH_DOMAIN__: string
declare const __FB_PROJECT_ID__: string
declare const __FB_STORAGE_BUCKET__: string
declare const __FB_MESSAGING_SENDER_ID__: string
declare const __FB_APP_ID__: string

const apiKey = typeof __FB_API_KEY__ !== 'undefined' ? __FB_API_KEY__ : ''

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

if (apiKey) {
  try {
    const firebaseConfig = {
      apiKey,
      authDomain: __FB_AUTH_DOMAIN__,
      projectId: __FB_PROJECT_ID__,
      storageBucket: __FB_STORAGE_BUCKET__,
      messagingSenderId: __FB_MESSAGING_SENDER_ID__,
      appId: __FB_APP_ID__,
    }
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)

    enableIndexedDbPersistence(db).catch((err: { code: string }) => {
      if (err.code === 'failed-precondition') {
        console.warn('[firebase] Firestore offline persistence unavailable: multiple tabs open.')
      } else if (err.code === 'unimplemented') {
        console.warn('[firebase] Firestore offline persistence is not available in this browser.')
      } else {
        console.warn('[firebase] Firestore offline persistence error:', err)
      }
    })
  } catch (err) {
    console.warn('[firebase] Failed to initialize Firebase client SDK:', err)
  }
} else {
  console.warn('[firebase] Firebase API key is not configured. Authentication features will be unavailable.')
}

export { auth, db }
export default app
