import { useAuthStore } from '@store/authStore'
import { API_BASE } from './api'

export interface UploadResult {
  success: true
  url: string
  publicId: string
  width: number
  height: number
  format: string
  bytes: number
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE_MB = 10

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${ALLOWED_TYPES.map((t) => t.split('/')[1]).join(', ')}.`,
    }
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return { valid: false, error: `File must be under ${MAX_SIZE_MB}MB.` }
  }
  return { valid: true }
}

export async function uploadFile(
  file: File,
  folder: string = 'general'
): Promise<UploadResult> {
  const token = useAuthStore.getState().token
  if (!token) throw new Error('Authentication required to upload files.')

  const validation = validateFile(file)
  if (!validation.valid) throw new Error(validation.error)

  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const response = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || `Upload failed (${response.status}).`)
  }

  return data as UploadResult
}
