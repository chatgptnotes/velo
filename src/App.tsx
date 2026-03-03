import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import TaxCenter from './pages/TaxCenter'
import Goals from './pages/Goals'
import RiskAnalysis from './pages/RiskAnalysis'
import Documents from './pages/Documents'
import Settings from './pages/Settings'

// Layout
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="text-primary-text">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user}>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/portfolio" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user}>
              <Portfolio />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/tax" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user}>
              <TaxCenter />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/goals" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user}>
              <Goals />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/risk" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user}>
              <RiskAnalysis />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/documents" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user}>
              <Documents />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user}>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App