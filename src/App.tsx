import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
          <Route path="/tax-center" element={<ProtectedRoute><TaxCenter /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/risk-analysis" element={<ProtectedRoute><RiskAnalysis /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/family" element={<ProtectedRoute><FamilyPortfolio /></ProtectedRoute>} />
          <Route path="/insurance" element={<ProtectedRoute><InsuranceGap /></ProtectedRoute>} />
          <Route path="/loans" element={<ProtectedRoute><LoanTracker /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute><ComparisonTool /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><ExpenseTracker /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
