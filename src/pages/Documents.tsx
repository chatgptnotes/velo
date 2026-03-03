import { useState } from 'react'
import { mockPortfolio } from '../lib/mockData'
import { Search, Download, Upload, FileText, Shield, Filter, Calendar } from 'lucide-react'

const Documents = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'property', label: 'Property' },
    { value: 'wills', label: 'Wills & Trusts' },
    { value: 'tax_returns', label: 'Tax Returns' },
    { value: 'bank_statements', label: 'Bank Statements' },
    { value: 'investments', label: 'Investments' }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'insurance':
        return '🛡️'
      case 'property':
        return '🏠'
      case 'wills':
        return '📜'
      case 'tax_returns':
        return '📊'
      case 'bank_statements':
        return '🏦'
      case 'investments':
        return '📈'
      default:
        return '📄'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'insurance':
        return 'text-blue-400'
      case 'property':
        return 'text-green-400'
      case 'wills':
        return 'text-purple-400'
      case 'tax_returns':
        return 'text-yellow-400'
      case 'bank_statements':
        return 'text-indigo-400'
      case 'investments':
        return 'text-primary-gold'
      default:
        return 'text-gray-400'
    }
  }

  const formatFileSize = (sizeStr: string) => {
    return sizeStr
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredDocuments = mockPortfolio.documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryStats = () => {
    const stats: { [key: string]: number } = {}
    mockPortfolio.documents.forEach(doc => {
      stats[doc.category] = (stats[doc.category] || 0) + 1
    })
    return stats
  }

  const categoryStats = getCategoryStats()

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Secure Document Vault</h1>
          <p className="text-primary-text-secondary mt-1">Store and manage your important financial documents securely</p>
        </div>
        <button className="bg-primary-gold text-primary-bg px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-primary-success bg-opacity-10 border border-primary-success p-4 rounded-lg">
        <div className="flex items-center">
          <Shield className="w-5 h-5 text-primary-success mr-3" />
          <div>
            <h3 className="font-medium text-primary-success">AES-256 Encrypted Storage</h3>
            <p className="text-sm text-primary-text-secondary">
              Your documents are encrypted using bank-grade security and stored with zero-knowledge access.
            </p>
          </div>
        </div>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary-card p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-primary-text-secondary mb-1">Total Documents</p>
          <p className="text-2xl font-bold text-primary-text">{mockPortfolio.documents.length}</p>
        </div>
        <div className="bg-primary-card p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-primary-text-secondary mb-1">Storage Used</p>
          <p className="text-2xl font-bold text-primary-gold">12.8 MB</p>
        </div>
        <div className="bg-primary-card p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-primary-text-secondary mb-1">Categories</p>
          <p className="text-2xl font-bold text-primary-text">{Object.keys(categoryStats).length}</p>
        </div>
        <div className="bg-primary-card p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-primary-text-secondary mb-1">Last Upload</p>
          <p className="text-2xl font-bold text-primary-success">Feb 28</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-primary-card p-4 rounded-lg border border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-primary-text-secondary" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-primary-bg border border-gray-600 rounded-lg px-3 py-2 text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-gold"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label} {categoryStats[category.value] ? `(${categoryStats[category.value]})` : ''}
                </option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-text-secondary" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-primary-bg border border-gray-600 rounded-lg text-primary-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-gold"
            />
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.slice(1).map(category => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedCategory === category.value
                ? 'border-primary-gold bg-primary-gold bg-opacity-10'
                : 'border-gray-700 bg-primary-card hover:border-gray-600'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{getCategoryIcon(category.value)}</div>
              <p className="text-sm font-medium text-primary-text">{category.label}</p>
              <p className="text-xs text-primary-text-secondary">
                {categoryStats[category.value] || 0} files
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div className="bg-primary-card rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-primary-text">
            {selectedCategory === 'all' ? 'All Documents' : categories.find(c => c.value === selectedCategory)?.label}
            <span className="text-primary-text-secondary ml-2">({filteredDocuments.length})</span>
          </h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {filteredDocuments.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-primary-text-secondary mx-auto mb-4" />
              <p className="text-primary-text-secondary">No documents found matching your criteria</p>
            </div>
          ) : (
            filteredDocuments.map((document, index) => (
              <div key={index} className="p-6 hover:bg-primary-bg hover:bg-opacity-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`text-2xl ${getCategoryColor(document.category)}`}>
                      {getCategoryIcon(document.category)}
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-text mb-1">{document.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-primary-text-secondary">
                        <span className="capitalize">{document.category.replace('_', ' ')}</span>
                        <span>•</span>
                        <span>{formatFileSize(document.size)}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{formatDate(document.uploadedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-primary-text-secondary hover:text-primary-gold transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-1.5 bg-primary-gold text-primary-bg rounded text-sm font-medium hover:bg-opacity-90 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-primary-card p-8 rounded-lg border-2 border-dashed border-gray-600 text-center">
        <Upload className="w-12 h-12 text-primary-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-primary-text mb-2">Upload New Documents</h3>
        <p className="text-primary-text-secondary mb-4">
          Drag and drop files here, or click to select
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="bg-primary-gold text-primary-bg px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
            Choose Files
          </button>
          <span className="text-sm text-primary-text-secondary">
            Supports: PDF, DOCX, PNG, JPG (Max 10MB)
          </span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-primary-text mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-success rounded-full"></div>
              <span className="text-primary-text">Mutual Fund Statements uploaded</span>
            </div>
            <span className="text-sm text-primary-text-secondary">2 days ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
              <span className="text-primary-text">ITR 2024-25 downloaded</span>
            </div>
            <span className="text-sm text-primary-text-secondary">5 days ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-success rounded-full"></div>
              <span className="text-primary-text">SBI Bank Statement uploaded</span>
            </div>
            <span className="text-sm text-primary-text-secondary">1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documents