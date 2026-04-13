import type { AuthUser } from '@store/authStore'
import { API_BASE, apiRequest } from './api'

const BASE = `${API_BASE}/api/auth`

interface AuthResponse {
  token: string
  user: AuthUser
}

export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export async function fetchCurrentUser(token: string): Promise<AuthUser> {
  return apiRequest<AuthUser>(`${BASE}/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
}
