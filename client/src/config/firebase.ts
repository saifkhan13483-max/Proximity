import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  getFirestore,
  type Firestore,
} from 'firebase/firestore'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

if (apiKey) {
  try {
    const firebaseConfig = {
      apiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
      appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
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
    '[firebase] VITE_FIREBASE_API_KEY is not set. Authentication features will be unavailable.'
  )
}

export { auth, db }
export default app
