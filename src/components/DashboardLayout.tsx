import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import {
  LayoutDashboard,
  PieChart,
  Calculator,
  Target,
  Shield,
  FileText,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
  user: User | null
}

const DashboardLayout = ({ children, user }: DashboardLayoutProps) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Portfolio', href: '/portfolio', icon: PieChart },
    { name: 'Tax Center', href: '/tax', icon: Calculator },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'Risk Analysis', href: '/risk', icon: Shield },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 bg-primary-card border-b border-gray-700">
          <div className="px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-primary-gold">Velo</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-primary-text hover:text-primary-gold"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary-card border-r border-gray-700 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:inset-0`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-primary-gold">Velo</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-gold text-primary-bg'
                      : 'text-primary-text hover:bg-gray-700 hover:text-primary-gold'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info and logout */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-primary-gold text-primary-bg flex items-center justify-center text-sm font-medium">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-primary-text truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="group flex w-full items-center px-3 py-2 text-sm font-medium text-primary-text hover:bg-gray-700 hover:text-primary-danger rounded-lg transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="pt-16 lg:pt-0">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="border-t border-gray-700 py-4 px-6">
          <div className="text-center text-xs text-primary-text-secondary">
            drmhope.com | A Bettroi Product | v1.0.0
          </div>
        </footer>
      </div>
    </div>
  )
}

export default DashboardLayout