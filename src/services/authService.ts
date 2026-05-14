import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@config/firebase'
import type { AuthUser } from '@store/authStore'

interface AuthResponse {
  token: string
  user: AuthUser
}

function firebaseErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code: string }).code
    switch (code) {
      case 'auth/email-already-in-use': return 'An account with this email already exists'
      case 'auth/invalid-email': return 'Invalid email address'
      case 'auth/weak-password': return 'Password must be at least 6 characters'
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential': return 'Invalid email or password'
      case 'auth/too-many-requests': return 'Too many attempts. Please try again later'
      case 'auth/network-request-failed': return 'Network error. Please check your connection'
      case 'auth/operation-not-allowed': return 'Email/password sign-in is not enabled. Please contact the administrator.'
      case 'auth/invalid-api-key':
      case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.': return 'Firebase API key is invalid. Please check your configuration.'
      case 'auth/app-not-authorized': return 'This app is not authorized to use Firebase Authentication.'
      default: return `Authentication error (${code}). Please try again.`
    }
  }
  return error instanceof Error ? error.message : 'Authentication failed'
}

export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  if (!auth) throw new Error('Authentication is not configured. Please contact the site administrator.')
  if (!db) throw new Error('Database is not configured. Please contact the site administrator.')

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credential.user, { displayName: name })
    const token = await credential.user.getIdToken()

    const safeName = (name || email.split('@')[0]).trim().slice(0, 100)
    const profile: AuthUser = {
      id: credential.user.uid,
      name: safeName,
      email: email.toLowerCase().trim(),
      createdAt: new Date().toISOString(),
      plan: 'Free Consultation',
      role: 'user',
      creditScore: null,
    }

    await setDoc(doc(db, 'users', credential.user.uid), profile)
    return { token, user: profile }
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err) {
      throw new Error(firebaseErrorMessage(err))
    }
    throw err
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  if (!auth) throw new Error('Authentication is not configured. Please contact the site administrator.')
  if (!db) throw new Error('Database is not configured. Please contact the site administrator.')

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    const token = await credential.user.getIdToken(true)

    const userDoc = await getDoc(doc(db, 'users', credential.user.uid))

    if (userDoc.exists()) {
      const data = userDoc.data()
      const user: AuthUser = {
        id: data.id || credential.user.uid,
        name: data.name || credential.user.displayName || email.split('@')[0],
        email: data.email || email.toLowerCase(),
        plan: data.plan || 'Free Consultation',
        role: data.role || 'user',
        createdAt: data.createdAt || new Date().toISOString(),
        creditScore: data.creditScore ?? null,
      }
      return { token, user }
    }

    // Profile doesn't exist yet — create it on first login
    const profile: AuthUser = {
      id: credential.user.uid,
      name: credential.user.displayName || email.split('@')[0],
      email: email.toLowerCase().trim(),
      createdAt: new Date().toISOString(),
      plan: 'Free Consultation',
      role: 'user',
      creditScore: null,
    }
    await setDoc(doc(db, 'users', credential.user.uid), profile)
    return { token, user: profile }
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err) {
      throw new Error(firebaseErrorMessage(err))
    }
    throw err
  }
}

export async function fetchCurrentUser(_storedToken?: string): Promise<AuthUser> {
  if (!auth?.currentUser) throw new Error('Not authenticated')
  if (!db) throw new Error('Database is not configured.')

  const uid = auth.currentUser.uid
  const userDoc = await getDoc(doc(db, 'users', uid))

  if (!userDoc.exists()) throw new Error('User profile not found')

  const data = userDoc.data()
  return {
    id: data.id || uid,
    name: data.name || '',
    email: data.email || '',
    plan: data.plan || 'Free Consultation',
    role: data.role || 'user',
    createdAt: data.createdAt || new Date().toISOString(),
    creditScore: data.creditScore ?? null,
  }
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  if (!auth) throw new Error('Authentication is not configured. Please contact the site administrator.')
  if (!db) throw new Error('Database is not configured. Please contact the site administrator.')

  try {
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)
    const token = await credential.user.getIdToken()
    const uid = credential.user.uid

    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      const data = userDoc.data()
      return {
        token,
        user: {
          id: data.id || uid,
          name: data.name || credential.user.displayName || '',
          email: data.email || credential.user.email || '',
          plan: data.plan || 'Free Consultation',
          role: data.role || 'user',
          createdAt: data.createdAt || new Date().toISOString(),
          creditScore: data.creditScore ?? null,
        },
      }
    }

    const profile: AuthUser = {
      id: uid,
      name: credential.user.displayName || credential.user.email?.split('@')[0] || 'User',
      email: credential.user.email?.toLowerCase() ?? '',
      createdAt: new Date().toISOString(),
      plan: 'Free Consultation',
      role: 'user',
      creditScore: null,
    }
    await setDoc(doc(db, 'users', uid), profile)
    return { token, user: profile }
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err) {
      throw new Error(firebaseErrorMessage(err))
    }
    throw err
  }
}

export async function logoutUser(): Promise<void> {
  if (auth) await signOut(auth)
}
