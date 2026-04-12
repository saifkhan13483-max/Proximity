import type { ContactFormData } from '@/types/index'
import { API_BASE } from './api'

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE}/api/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.error || 'Something went wrong. Please try again or call us directly.',
      }
    }

    return {
      success: true,
      message: result.message || 'Your message has been received. We\'ll be in touch shortly!',
    }
  } catch {
    return {
      success: false,
      message: 'Something went wrong. Please try again or call us directly.',
    }
  }
}
