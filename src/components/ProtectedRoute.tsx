import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'

interface ProtectedRouteProps {
  children: ReactNode
  user: User | null
}

const ProtectedRoute = ({ children, user }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute