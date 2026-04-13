import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { signOut } from 'firebase/auth'
import { auth } from '@lib/firebase'

export interface AuthUser {
  id: string
  name: string
  email: string
  plan: string
  role: 'user' | 'admin'
  createdAt: string
  creditScore?: number | null
}

interface AuthStore {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  setAuth: (user: AuthUser, token: string) => void
  setLoading: (loading: boolean) => void
  updateUser: (user: AuthUser) => void
  logout: () => void
  isAuthenticated: () => boolean
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      setAuth: (user, token) => set({ user, token }),
      setLoading: (isLoading) => set({ isLoading }),
      updateUser: (user) => set({ user }),
      logout: () => {
        if (auth) signOut(auth).catch(() => {})
        set({ user: null, token: null })
      },
      isAuthenticated: () => !!get().token && !!get().user,
      isAdmin: () => get().user?.role === 'admin',
    }),
    {
      name: 'proximity-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)
