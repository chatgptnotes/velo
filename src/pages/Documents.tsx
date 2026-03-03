import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { formatCurrency } from '../data/mockData'
import { Home, Briefcase, Receipt, Target, Shield, FileText, Settings, Upload, Download, Eye, Lock, File, Printer } from 'lucide-react'

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
  const [showReportModal, setShowReportModal] = useState(false)

  return (
    <PageWrapper>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-2">Securely store and manage your financial documents</p>
        </div>
        <div className="flex space-x-3">
          {/* PDF Report (Feature 14) */}
          <button onClick={() => setShowReportModal(true)} className="bg-[#3282B8] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#3282B8]/90 flex items-center space-x-2">
            <Printer className="h-5 w-5" /><span>Generate Report</span>
          </button>
          <button className="bg-[#0F4C75] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#093049] flex items-center space-x-2">
            <Upload className="h-5 w-5" /><span>Upload</span>
          </button>
        </div>
      </div>

      {/* PDF Report Modal (Feature 14) */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 max-w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Portfolio Report</h3>
            <div className="space-y-3 mb-6">
              {['Full Portfolio Summary', 'Tax Report FY 2025-26', 'Asset Allocation Report', 'Performance Report'].map(r => (
                <label key={r} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#0F4C75]" />
                  <span className="text-sm font-medium text-gray-900">{r}</span>
                </label>
              ))}
            </div>
            <div className="flex space-x-3">
              <button onClick={() => setShowReportModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">Cancel</button>
              <button onClick={() => { setShowReportModal(false); alert('Report generated! (Demo)') }} className="flex-1 px-4 py-2 bg-[#0F4C75] text-white rounded-lg">Generate PDF</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#00B4D8]/5 border border-[#00B4D8]/20 rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-3">
          <Lock className="h-6 w-6 text-[#00B4D8]" />
          <div><h3 className="text-lg font-semibold text-gray-900">AES-256 Encryption</h3><p className="text-sm text-gray-600">Bank-grade security for all documents.</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {documentCategories.map(c => {
          const Icon = c.icon
          return (
            <div key={c.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#0F4C75]/10 rounded-lg"><Icon className="h-8 w-8 text-[#0F4C75]" /></div>
                <div><h3 className="text-lg font-semibold text-gray-900">{c.name}</h3><p className="text-sm text-gray-600">{c.count} documents</p></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3></div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentDocuments.map(doc => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center"><File className="h-5 w-5 text-gray-400 mr-3" /><span className="text-sm font-medium text-gray-900">{doc.name}</span></td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium bg-[#0F4C75]/10 text-[#0F4C75] rounded-full">{doc.category}</span></td>
                <td className="px-6 py-4 text-sm">{doc.size}</td>
                <td className="px-6 py-4 text-sm">{new Date(doc.date).toLocaleDateString('en-IN')}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button className="text-[#0F4C75]"><Eye className="h-4 w-4" /></button>
                  <button className="text-gray-400"><Download className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  )
}
