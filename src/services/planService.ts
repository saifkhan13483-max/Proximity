import { useAuthStore } from '@store/authStore'
import { API_BASE, apiRequest } from './api'

export async function selectPlan(planId: string): Promise<{ plan: string }> {
  const token = useAuthStore.getState().token
  return apiRequest<{ plan: string }>(`${API_BASE}/api/users/plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ planId }),
  })
}
