import type { ReactNode } from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'
import NotificationBell from './NotificationBell'

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <Layout isAuthenticated={true} showFooter={false}>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-3 flex justify-end">
            <NotificationBell />
          </div>
          <div className="p-8">
            {children}
          </div>
          <footer className="border-t border-gray-200 py-3 px-6 bg-white text-center text-xs text-gray-400">
            drmhope.com | A Bettroi Product | v1.2
          </footer>
        </div>
      </div>
    </Layout>
  )
}
