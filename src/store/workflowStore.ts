import { create } from 'zustand'
import type { DisputeItemInput, CreditReviewResult } from '@services/geminiService'

interface PendingPersonalInfo {
  yourName: string
  yourAddress: string
  yourCity: string
  yourState: string
  yourZip: string
}

interface WorkflowStore {
  pendingDisputeItems: DisputeItemInput[] | null
  pendingPersonalInfo: PendingPersonalInfo | null
  lastCreditReview: CreditReviewResult | null
  lastCreditReviewDate: string | null
  setPendingDisputes: (items: DisputeItemInput[], personal?: PendingPersonalInfo | null) => void
  setLastCreditReview: (result: CreditReviewResult) => void
  clearPendingDisputes: () => void
  clearAll: () => void
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  pendingDisputeItems: null,
  pendingPersonalInfo: null,
  lastCreditReview: null,
  lastCreditReviewDate: null,

  setPendingDisputes: (items, personal = null) =>
    set({ pendingDisputeItems: items, pendingPersonalInfo: personal }),

  setLastCreditReview: (result) =>
    set({ lastCreditReview: result, lastCreditReviewDate: new Date().toISOString() }),

  clearPendingDisputes: () =>
    set({ pendingDisputeItems: null, pendingPersonalInfo: null }),

  clearAll: () =>
    set({
      pendingDisputeItems: null,
      pendingPersonalInfo: null,
      lastCreditReview: null,
      lastCreditReviewDate: null,
    }),
}))
