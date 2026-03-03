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
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-bg flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-card to-primary-bg items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h1 className="text-6xl font-bold text-primary-gold mb-6">Velo</h1>
          <h2 className="text-2xl font-semibold text-primary-text mb-4">
            Private Wealth Management
          </h2>
          <p className="text-primary-text-secondary text-lg leading-relaxed">
            Sophisticated wealth management solutions designed for discerning investors who demand institutional-grade service and performance.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-gold mb-2">Velo</h1>
            <p className="text-primary-text-secondary">Private Wealth Management</p>
          </div>

          {/* Back to home link */}
          <Link
            to="/"
            className="inline-flex items-center text-primary-text-secondary hover:text-primary-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="bg-primary-card p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-primary-text mb-2">Welcome Back</h2>
            <p className="text-primary-text-secondary mb-8">
              Access your private wealth dashboard
            </p>

            {error && (
              <div className="bg-primary-danger bg-opacity-10 border border-primary-danger text-primary-danger p-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-primary-bg border border-gray-600 rounded-lg text-primary-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-primary-bg border border-gray-600 rounded-lg text-primary-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-gold"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-gold text-primary-bg py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-primary-text-secondary text-sm mb-4">
                Don't have access yet?
              </p>
              <Link
                to="#"
                className="text-primary-gold hover:text-primary-gold/80 font-medium transition-colors"
              >
                Request Access
              </Link>
            </div>
          </div>

          {/* Demo credentials info */}
          <div className="mt-6 p-4 bg-primary-bg border border-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-primary-text mb-2">Demo Access:</h3>
            <p className="text-xs text-primary-text-secondary">
              This is a demonstration. Use any email and password to sign in.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage