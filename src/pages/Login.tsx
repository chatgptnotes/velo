import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    // Demo mode: accept any credentials
    setTimeout(() => {
      setLoading(false)
      navigate("/dashboard")
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F4C75] to-[#3282B8] items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <h1 className="text-6xl font-bold text-[#B8860B] mb-6">Velo</h1>
          <h2 className="text-2xl font-semibold mb-4">
            Private Wealth Management
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Sophisticated wealth management solutions designed for discerning investors who demand institutional-grade service and performance.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-[#0F4C75] mb-2">Velo</h1>
            <p className="text-gray-500">Private Wealth Management</p>
          </div>

          {/* Back to home link */}
          <Link
            to="/"
            className="inline-flex items-center text-gray-500 hover:text-[#0F4C75] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8">
              Access your private wealth dashboard
            </p>

            {error && (
              <div className="bg-red-50 border border-primary-danger text-primary-danger p-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C75] focus:border-[#0F4C75]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C75] focus:border-[#0F4C75] pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0F4C75]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F4C75] text-white py-3 rounded-lg font-semibold hover:bg-[#093049] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm mb-4">
                Don't have access yet?
              </p>
              <Link
                to="#"
                className="text-[#0F4C75] hover:text-[#3282B8] font-medium transition-colors"
              >
                Request Access
              </Link>
            </div>
          </div>

          {/* Demo credentials info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Access:</h3>
            <p className="text-xs text-gray-500">
              This is a demonstration. Use any email and password to sign in.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage