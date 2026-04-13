import { useAuthStore } from '@store/authStore'
import { API_BASE, apiRequest } from './api'

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

function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  return apiRequest<T>(url, { ...options, headers: { ...getHeaders(), ...(options.headers || {}) } })
}

export async function fetchAdminStats(): Promise<AdminStats> {
  return request(`${API_BASE}/api/admin/stats`)
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  return request(`${API_BASE}/api/admin/users`)
}

export async function updateUser(id: string, data: Partial<{ plan: string; creditScore: number | null }>): Promise<AdminUser> {
  return request(`${API_BASE}/api/admin/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
}

export async function deleteUser(id: string): Promise<void> {
  return request(`${API_BASE}/api/admin/users/${id}`, { method: 'DELETE' })
}

export async function fetchAdminContacts(): Promise<AdminContact[]> {
  return request(`${API_BASE}/api/admin/contacts`)
}

export async function updateContactStatus(id: string, status: AdminContact['status']): Promise<AdminContact> {
  return request(`${API_BASE}/api/admin/contacts/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
}

export async function deleteContact(id: string): Promise<void> {
  return request(`${API_BASE}/api/admin/contacts/${id}`, { method: 'DELETE' })
}

export interface AdminService {
  id: string
  title: string
  icon: string
  shortDescription: string
  description: string
  benefits: string[]
  order: number
}

export async function fetchAdminServices(): Promise<AdminService[]> {
  return request(`${API_BASE}/api/admin/services`)
}

export async function createService(data: Omit<AdminService, 'id' | 'order'>): Promise<AdminService> {
  return request(`${API_BASE}/api/admin/services`, { method: 'POST', body: JSON.stringify(data) })
}

export async function updateService(id: string, data: Partial<Omit<AdminService, 'id' | 'order'>>): Promise<AdminService> {
  return request(`${API_BASE}/api/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteService(id: string): Promise<void> {
  return request(`${API_BASE}/api/admin/services/${id}`, { method: 'DELETE' })
}
