import { doc, setDoc } from 'firebase/firestore'
import { db } from '@config/firebase'
import type { ContactFormData } from '@/types/index'

function sanitize(str: string, max = 500): string {
  if (typeof str !== 'string') return ''
  return str.trim().slice(0, max)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  if (!db) {
    return {
      success: false,
      message: 'Service temporarily unavailable. Please call us directly.',
    }
  }

  const { fullName, email, phone, serviceOfInterest, message } = data

  if (!fullName || !email || !message) {
    return { success: false, message: 'Name, email, and message are required.' }
  }
  if (!isValidEmail(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }
  if (sanitize(fullName, 100).length < 2) {
    return { success: false, message: 'Please enter your full name.' }
  }
  if (sanitize(message, 5000).length < 10) {
    return { success: false, message: 'Message must be at least 10 characters.' }
  }

  try {
    const id = crypto.randomUUID()
    const contact = {
      id,
      fullName: sanitize(fullName, 100),
      email: email.toLowerCase().trim(),
      phone: sanitize(phone || '', 20),
      serviceOfInterest: sanitize(serviceOfInterest || 'General Inquiry', 100),
      message: sanitize(message, 5000),
      status: 'new',
      createdAt: new Date().toISOString(),
    }
    await setDoc(doc(db, 'contacts', id), contact)
    return {
      success: true,
      message: "Your message has been received. We'll be in touch shortly!",
    }
  } catch (err) {
    console.error('[contactService] Submit error:', err)
    return {
      success: false,
      message: 'Something went wrong. Please try again or call us directly.',
    }
  }
}
