import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './components/ToastNotification'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import TaxCenter from './pages/TaxCenter'
import Goals from './pages/Goals'
import RiskAnalysis from './pages/RiskAnalysis'
import Documents from './pages/Documents'
import Settings from './pages/Settings'
import FamilyPortfolio from './pages/FamilyPortfolio'
import InsuranceGap from './pages/InsuranceGap'
import LoanTracker from './pages/LoanTracker'
import ComparisonTool from './pages/ComparisonTool'
import ExpenseTracker from './pages/ExpenseTracker'

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><ErrorBoundary><Dashboard /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/portfolio" element={<ProtectedRoute><ErrorBoundary><Portfolio /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/tax-center" element={<ProtectedRoute><ErrorBoundary><TaxCenter /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute><ErrorBoundary><Goals /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/risk-analysis" element={<ProtectedRoute><ErrorBoundary><RiskAnalysis /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><ErrorBoundary><Documents /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><ErrorBoundary><Settings /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/family" element={<ProtectedRoute><ErrorBoundary><FamilyPortfolio /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/insurance" element={<ProtectedRoute><ErrorBoundary><InsuranceGap /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/loans" element={<ProtectedRoute><ErrorBoundary><LoanTracker /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/compare" element={<ProtectedRoute><ErrorBoundary><ComparisonTool /></ErrorBoundary></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute><ErrorBoundary><ExpenseTracker /></ErrorBoundary></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App
