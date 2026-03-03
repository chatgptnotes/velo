import { type ReactNode, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from './Layout'
import Sidebar from './Sidebar'
import NotificationBell from './NotificationBell'
import GlobalSearch from './GlobalSearch'
import ErrorBoundary from './ErrorBoundary'
import { PageSkeleton } from './SkeletonLoader'
import { Menu, X, Printer } from 'lucide-react'

export default function PageWrapper({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <Layout isAuthenticated={true} showFooter={false}>
      <div className="flex h-screen bg-[#F8FAFC]">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/25 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar - hidden on mobile unless open */}
        <div className={`fixed inset-y-0 left-0 z-40 transform lg:relative lg:translate-x-0 transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} data-print-hidden`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>

        <div className="flex-1 overflow-auto flex flex-col min-w-0">
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between data-print-hidden">
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-[#0F4C75] rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex-1 flex justify-center lg:justify-start lg:ml-0">
              <GlobalSearch />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="p-2 text-gray-400 hover:text-[#0F4C75] rounded-lg hover:bg-gray-100"
                title="Print Report"
              >
                <Printer className="h-5 w-5" />
              </button>
              <NotificationBell />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-8">
            <ErrorBoundary>
              {loading ? <PageSkeleton /> : (
                <div className="animate-fade-in">
                  {children}
                </div>
              )}
            </ErrorBoundary>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-200 py-3 px-6 bg-white text-center text-xs text-gray-400 data-print-hidden">
            Powered by Velo | drmhope.com | A Bettroi Product | v1.3
          </footer>
        </div>
      </div>
    </Layout>
  )
}
