import type { ContactFormData } from '@/types/index'

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  const apiUrl = import.meta.env.VITE_CONTACT_API_URL

  if (!apiUrl) {
    return {
      success: false,
      message: 'Contact form is not configured. Please call or email us directly.',
    }
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`)
    }

    return await response.json()
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('[contactService] Submission failed:', err)
    }
    return {
      success: false,
      message: 'Something went wrong. Please try again or call us directly.',
    }
  }
}
