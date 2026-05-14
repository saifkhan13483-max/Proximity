import { create } from 'zustand'
import type { ToastItem } from '@/types/index'

interface UIStore {
  mobileMenuOpen: boolean
  openMobileMenu: () => void
  closeMobileMenu: () => void
  toggleMobileMenu: () => void

  scrollY: number
  setScrollY: (y: number) => void

  activeNavItem: string
  setActiveNavItem: (href: string) => void

  toastQueue: ToastItem[]
  addToast: (toast: Omit<ToastItem, 'id'>) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  mobileMenuOpen: false,
  openMobileMenu: () => set({ mobileMenuOpen: true }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),

  activeNavItem: '/',
  setActiveNavItem: (href) => set({ activeNavItem: href }),

  toastQueue: [],
  addToast: (toast) =>
    set((state) => ({
      toastQueue: [...state.toastQueue, { ...toast, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toastQueue: state.toastQueue.filter((t) => t.id !== id),
    })),
}))
