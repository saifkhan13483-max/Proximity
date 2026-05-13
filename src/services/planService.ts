import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@config/firebase'
import { useAuthStore } from '@store/authStore'

const VALID_PLANS = [
  'Free Consultation',
  'Basic Plan',
  'Standard Plan',
  'Premium Plan',
  'VIP Plan',
]

export async function selectPlan(planId: string): Promise<{ plan: string }> {
  if (!db) throw new Error('Database is not configured.')

  const userId = useAuthStore.getState().user?.id
  if (!userId) throw new Error('You must be signed in to select a plan.')

  if (!VALID_PLANS.includes(planId)) {
    throw new Error('Invalid plan selected.')
  }

  await updateDoc(doc(db, 'users', userId), { plan: planId })
  return { plan: planId }
}
