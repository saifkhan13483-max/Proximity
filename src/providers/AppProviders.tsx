import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { onIdTokenChanged } from 'firebase/auth'
import { auth } from '@config/firebase'
import { useAuthStore } from '@store/authStore'
import ErrorBoundary from '@components/layout/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function AuthTokenObserver() {
  useEffect(() => {
    if (!auth) return
    return onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const freshToken = await firebaseUser.getIdToken()
          const store = useAuthStore.getState()
          if (store.user) {
            store.setToken(freshToken)
          }
        } catch {
          // Token refresh failed; will prompt login on next protected action
        }
      } else {
        const store = useAuthStore.getState()
        if (store.user) {
          store.logout()
        }
      }
    })
  }, [])
  return null
}

interface AppProvidersProps {
  children: React.ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthTokenObserver />
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
