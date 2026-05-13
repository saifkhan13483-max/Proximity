import { create } from 'zustand'
import type { ContactFormData } from '@/types/index'

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

interface FormStore {
  submissionStatus: SubmissionStatus
  setSubmissionStatus: (status: SubmissionStatus) => void

  validationErrors: Record<string, string>
  setValidationErrors: (errors: Record<string, string>) => void
  clearValidationErrors: () => void

  formData: Partial<ContactFormData>
  setFormData: (data: Partial<ContactFormData>) => void
  resetForm: () => void
}

export const useFormStore = create<FormStore>((set) => ({
  submissionStatus: 'idle',
  setSubmissionStatus: (status) => set({ submissionStatus: status }),

  validationErrors: {},
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  clearValidationErrors: () => set({ validationErrors: {} }),

  formData: {},
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ formData: {}, submissionStatus: 'idle', validationErrors: {} }),
}))
