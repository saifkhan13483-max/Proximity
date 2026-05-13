import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'
import { auth } from '@config/firebase'
import type { AuthUser } from '@store/authStore'
import { API_BASE, apiRequest } from './api'

const BASE = `${API_BASE}/api/auth`

interface AuthResponse {
  token: string
  user: AuthUser
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

function firebaseErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code: string }).code
    console.error('[auth] Firebase error code:', code, error)
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
      case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.': return 'Firebase API key is invalid. Please check the VITE_FIREBASE_API_KEY configuration.'
      case 'auth/app-not-authorized': return 'This app is not authorized to use Firebase Authentication.'
      default: return `Authentication error (${code}). Please try again.`
    }
  }
  console.error('[auth] Non-Firebase error:', error)
  return error instanceof Error ? error.message : 'Authentication failed'
}

function buildFallbackUser(uid: string, email: string, name: string): AuthUser {
  return {
    id: uid,
    name: name || email.split('@')[0],
    email: email.toLowerCase(),
    plan: 'Free Consultation',
    role: 'user',
    createdAt: new Date().toISOString(),
    creditScore: null,
  }
}

export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  if (!auth) throw new Error('Authentication is not configured. Please contact the site administrator.')
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credential.user, { displayName: name })
    const token = await credential.user.getIdToken()

    try {
      const user = await apiRequest<AuthUser>(`${BASE}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
        body: JSON.stringify({ name }),
      })
      return { token, user }
    } catch {
      return { token, user: buildFallbackUser(credential.user.uid, email, name) }
    }
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err) {
      throw new Error(firebaseErrorMessage(err))
    }
    throw err
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  if (!auth) throw new Error('Authentication is not configured. Please contact the site administrator.')
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    // Force-refresh the token so any custom claims (e.g. role: admin) set server-side are included
    const token = await credential.user.getIdToken(true)
    const user = await apiRequest<AuthUser>(`${BASE}/me`, {
      method: 'GET',
      headers: authHeaders(token),
    })
    return { token, user }
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err) {
      throw new Error(firebaseErrorMessage(err))
    }
    throw err
  }
}

export async function fetchCurrentUser(storedToken: string): Promise<AuthUser> {
  const token = auth?.currentUser ? await auth.currentUser.getIdToken() : storedToken
  return apiRequest<AuthUser>(`${BASE}/me`, {
    method: 'GET',
    headers: authHeaders(token),
  })
}

export async function logoutUser(): Promise<void> {
  if (auth) await signOut(auth)
}
