import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

interface AdminRouteProps {
  children: React.ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
  const isAdmin = useAuthStore((state) => state.isAdmin())

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return <>{children}</>
}
