import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { onIdTokenChanged } from 'firebase/auth'
import App from './App'
import ErrorBoundary from './components/layout/ErrorBoundary'
import { useAuthStore } from '@store/authStore'
import { auth } from '@lib/firebase'
import './styles/globals.css'

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

if (auth) {
  onIdTokenChanged(auth, async (firebaseUser) => {
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
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
