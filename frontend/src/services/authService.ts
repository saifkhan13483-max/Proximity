import type { AuthUser } from '@store/authStore'
import { API_BASE } from './api'

const BASE = `${API_BASE}/api/auth`

interface AuthResponse {
  token: string
  user: AuthUser
}

interface ApiError {
  error: string
}

async function request<T>(url: string, options: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(url, options)
  } catch {
    throw new Error('Unable to connect to server. Please check your connection and try again.')
  }

  let data: unknown
  try {
    data = await res.json()
  } catch {
    throw new Error(res.ok ? 'Unexpected server response. Please try again.' : `Server error (${res.status}). Please try again.`)
  }

  if (!res.ok) {
    throw new Error((data as ApiError).error || `Request failed (${res.status}). Please try again.`)
  }
  return data as T
}

export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export async function fetchCurrentUser(token: string): Promise<AuthUser> {
  return request<AuthUser>(`${BASE}/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
}
