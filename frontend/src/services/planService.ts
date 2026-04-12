import { useAuthStore } from '@store/authStore'
import { API_BASE } from './api'

export async function selectPlan(planId: string): Promise<{ plan: string }> {
  const token = useAuthStore.getState().token
  const res = await fetch(`${API_BASE}/api/users/plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ planId }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to update plan')
  return data
}
