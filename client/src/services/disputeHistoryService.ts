import { db } from '@config/firebase'
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import type { GeneratedLetter, CreditReviewResult } from '@services/geminiService'

export type DisputeStatus = 'Generated' | 'Mailed' | 'Under Review' | 'Resolved'

export interface DisputeRecord {
  id: string
  createdAt: string
  status: DisputeStatus
  letterCount: number
  bureaus: string[]
  itemNames: string[]
  letters: Array<{
    bureau: string
    creditorName: string
    accountNumber: string
    disputeReason: string
    letterText: string
  }>
}

export interface CreditReviewRecord {
  id: string
  createdAt: string
  firstName: string
  currentScore: string
  goalScore: string
  result: CreditReviewResult
}

function tsToIso(val: unknown): string {
  if (!val) return new Date().toISOString()
  if (val instanceof Timestamp) return val.toDate().toISOString()
  if (typeof val === 'string') return val
  return new Date().toISOString()
}

export async function saveDisputePackage(
  userId: string,
  letters: GeneratedLetter[]
): Promise<string> {
  if (!db) throw new Error('Firebase not initialized')
  const ref = collection(db, 'users', userId, 'disputePackages')
  const docRef = await addDoc(ref, {
    createdAt: serverTimestamp(),
    status: 'Generated' as DisputeStatus,
    letterCount: letters.length,
    bureaus: [...new Set(letters.map((l) => l.bureau))],
    itemNames: [...new Set(letters.map((l) => l.creditorName))],
    letters: letters.map((l) => ({
      bureau: l.bureau,
      creditorName: l.creditorName,
      accountNumber: l.accountNumber,
      disputeReason: l.disputeReason,
      letterText: l.letterText,
    })),
  })
  return docRef.id
}

export async function fetchDisputePackages(
  userId: string,
  maxCount = 10
): Promise<DisputeRecord[]> {
  if (!db) return []
  try {
    const ref = collection(db, 'users', userId, 'disputePackages')
    const q = query(ref, orderBy('createdAt', 'desc'), limit(maxCount))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({
      id: d.id,
      createdAt: tsToIso(d.data().createdAt),
      status: (d.data().status as DisputeStatus) || 'Generated',
      letterCount: d.data().letterCount || 0,
      bureaus: d.data().bureaus || [],
      itemNames: d.data().itemNames || [],
      letters: d.data().letters || [],
    }))
  } catch {
    return []
  }
}

export async function updateDisputeStatus(
  userId: string,
  packageId: string,
  status: DisputeStatus
): Promise<void> {
  if (!db) return
  const ref = doc(db, 'users', userId, 'disputePackages', packageId)
  await updateDoc(ref, { status })
}

export async function saveCreditReview(
  userId: string,
  firstName: string,
  currentScore: string,
  goalScore: string,
  result: CreditReviewResult
): Promise<string> {
  if (!db) throw new Error('Firebase not initialized')
  const ref = collection(db, 'users', userId, 'creditReviews')
  const docRef = await addDoc(ref, {
    createdAt: serverTimestamp(),
    firstName,
    currentScore,
    goalScore,
    result,
  })
  return docRef.id
}

export async function fetchCreditReviews(
  userId: string,
  maxCount = 5
): Promise<CreditReviewRecord[]> {
  if (!db) return []
  try {
    const ref = collection(db, 'users', userId, 'creditReviews')
    const q = query(ref, orderBy('createdAt', 'desc'), limit(maxCount))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({
      id: d.id,
      createdAt: tsToIso(d.data().createdAt),
      firstName: d.data().firstName || '',
      currentScore: d.data().currentScore || '',
      goalScore: d.data().goalScore || '',
      result: d.data().result as CreditReviewResult,
    }))
  } catch {
    return []
  }
}
