import { useAuthStore } from '@store/authStore'

export interface AdminUser {
  id: string
  name: string
  email: string
  plan: string
  role: string
  createdAt: string
  creditScore: number | null
}

export interface AdminContact {
  id: string
  fullName: string
  email: string
  phone: string
  serviceOfInterest: string
  message: string
  status: 'new' | 'in-progress' | 'resolved'
  createdAt: string
}

export interface AdminStats {
  totalUsers: number
  newUsersThisMonth: number
  totalContacts: number
  newContactsThisMonth: number
  unreadContacts: number
  plans: Record<string, number>
}

function getHeaders() {
  const token = useAuthStore.getState().token
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, { ...options, headers: { ...getHeaders(), ...(options.headers || {}) } })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data as T
}

export async function fetchAdminStats(): Promise<AdminStats> {
  return request('/api/admin/stats')
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  return request('/api/admin/users')
}

export async function updateUser(id: string, data: Partial<{ plan: string; creditScore: number | null }>): Promise<AdminUser> {
  return request(`/api/admin/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
}

export async function deleteUser(id: string): Promise<void> {
  return request(`/api/admin/users/${id}`, { method: 'DELETE' })
}

export async function fetchAdminContacts(): Promise<AdminContact[]> {
  return request('/api/admin/contacts')
}

export async function updateContactStatus(id: string, status: AdminContact['status']): Promise<AdminContact> {
  return request(`/api/admin/contacts/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
}

export async function deleteContact(id: string): Promise<void> {
  return request(`/api/admin/contacts/${id}`, { method: 'DELETE' })
}
