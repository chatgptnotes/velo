
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Briefcase, 
  Receipt, 
  Target, 
  Shield, 
  FileText, 
  Settings,
  Upload,
  Download,
  Eye,
  Lock,

  File
} from 'lucide-react'
import Layout from '../components/Layout'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Tax Center', href: '/tax-center', icon: Receipt },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Risk Analysis', href: '/risk-analysis', icon: Shield },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const documentCategories = [
  { id: 'insurance', name: 'Insurance', count: 8, icon: Shield },
  { id: 'property', name: 'Property Documents', count: 12, icon: Home },
  { id: 'wills', name: 'Wills & Trusts', count: 4, icon: FileText },
  { id: 'tax', name: 'Tax Returns', count: 6, icon: Receipt },
  { id: 'bank', name: 'Bank Statements', count: 24, icon: Briefcase },
  { id: 'investment', name: 'Investment Reports', count: 18, icon: Target },
]

const recentDocuments = [
  { id: 1, name: 'FY2025-26 ITR Form', type: 'PDF', size: '2.4 MB', date: '2026-03-01', category: 'Tax Returns' },
  { id: 2, name: 'HDFC Life Insurance Policy', type: 'PDF', size: '1.8 MB', date: '2026-02-28', category: 'Insurance' },
  { id: 3, name: 'Property Registration - Nagpur', type: 'PDF', size: '3.2 MB', date: '2026-02-25', category: 'Property Documents' },
  { id: 4, name: 'SBI Account Statement - Feb 2026', type: 'PDF', size: '892 KB', date: '2026-02-24', category: 'Bank Statements' },
  { id: 5, name: 'PPFAS Fund Statement', type: 'PDF', size: '1.2 MB', date: '2026-02-20', category: 'Investment Reports' },
]

export default function Documents() {
  const location = useLocation()

  return (
    <Layout isAuthenticated={true} showFooter={false}>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200">
          <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive
                          ? 'bg-primary-50 border-r-2 border-primary text-primary'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-3 py-3 text-sm font-medium rounded-l-lg`}
                    >
                      <Icon
                        className={`${
                          isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
                        } mr-3 h-5 w-5`}
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
                <p className="text-gray-600 mt-2">Securely store and manage your important financial documents</p>
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Document</span>
              </button>
            </div>

            {/* Security Banner */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3">
                <Lock className="h-6 w-6 text-accent" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AES-256 Encryption</h3>
                  <p className="text-sm text-gray-600">All your documents are encrypted with bank-grade security and stored in compliance with financial regulations.</p>
                </div>
              </div>
            </div>

            {/* Document Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {documentCategories.map((category) => {
                const Icon = category.icon
                return (
                  <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.count} documents</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Recent Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <File className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {doc.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {doc.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {doc.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(doc.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="text-primary hover:text-primary-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing 5 of 72 documents
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
                      Previous
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-white bg-primary rounded hover:bg-primary-600">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">72</div>
                <div className="text-sm text-gray-600">Total Documents</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-2xl font-bold text-success mb-1">245 MB</div>
                <div className="text-sm text-gray-600">Storage Used</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-2xl font-bold text-secondary mb-1">6</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-1">5GB</div>
                <div className="text-sm text-gray-600">Storage Limit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}