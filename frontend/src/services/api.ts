const rawBase = import.meta.env.VITE_API_URL || ''
export const API_BASE = rawBase.replace(/\/$/, '')

interface ApiError {
  error: string
}

export async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(url, options)
  } catch {
    throw new Error('Unable to connect to server. Please check your connection and try again.')
  }

  let data: unknown
  try {
    data = await res.json()
  } catch {
    throw new Error(res.ok ? 'Unexpected server response. Please try again.' : `Server error (${res.status}). Please try again.`)
  }

  if (!res.ok) {
    throw new Error((data as ApiError).error || `Request failed (${res.status}). Please try again.`)
  }
  return data as T
}
