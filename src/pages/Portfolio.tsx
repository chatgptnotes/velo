import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Briefcase, 
  Receipt, 
  Target, 
  Shield, 
  FileText, 
  Settings,

  Search,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import Layout from '../components/Layout'
import { mockHoldings, formatCurrency } from '../data/mockData'
import type { Holding } from '../data/mockData'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Tax Center', href: '/tax-center', icon: Receipt },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Risk Analysis', href: '/risk-analysis', icon: Shield },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const categories = [
  { id: 'all', name: 'All Assets' },
  { id: 'equity', name: 'Equity' },
  { id: 'fixed-income', name: 'Fixed Income' },
  { id: 'real-estate', name: 'Real Estate' },
  { id: 'gold', name: 'Gold' },
  { id: 'alternatives', name: 'Alternatives' },
  { id: 'cash', name: 'Cash' }
]

export default function Portfolio() {
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: keyof Holding; direction: 'asc' | 'desc' } | null>(null)

  const filteredHoldings = mockHoldings.filter(holding => {
    const matchesCategory = activeCategory === 'all' || holding.category === activeCategory
    const matchesSearch = holding.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         holding.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedHoldings = React.useMemo(() => {
    if (!sortConfig) return filteredHoldings
    
    return [...filteredHoldings].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      return 0
    })
  }, [filteredHoldings, sortConfig])

  const handleSort = (key: keyof Holding) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const totalValue = filteredHoldings.reduce((sum, holding) => sum + holding.currentValue, 0)
  const totalPnL = filteredHoldings.reduce((sum, holding) => sum + holding.pnl, 0)
  const totalPnLPercent = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0

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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
              <p className="text-gray-600 mt-2">Your complete investment holdings and performance</p>
            </div>

            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total P&L</p>
                    <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-success' : 'text-danger'}`}>
                      {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
                    </p>
                  </div>
                  {totalPnL >= 0 ? (
                    <TrendingUp className="h-8 w-8 text-success" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-danger" />
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overall Return</p>
                    <p className={`text-2xl font-bold ${totalPnLPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                      {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
                    </p>
                  </div>
                  {totalPnLPercent >= 0 ? (
                    <TrendingUp className="h-8 w-8 text-success" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-danger" />
                  )}
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 flex-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary text-white'
                          : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search holdings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Holdings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('name')}
                      >
                        Name
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('ticker')}
                      >
                        Ticker
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('quantity')}
                      >
                        Quantity
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('avgCost')}
                      >
                        Avg Cost
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('currentPrice')}
                      >
                        Current Price
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('currentValue')}
                      >
                        Current Value
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('pnl')}
                      >
                        P&L
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('pnlPercent')}
                      >
                        P&L %
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('allocation')}
                      >
                        Allocation %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedHoldings.map((holding) => (
                      <tr key={holding.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{holding.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{holding.category.replace('-', ' ')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {holding.ticker}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {holding.quantity.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(holding.avgCost)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(holding.currentPrice)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(holding.currentValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${holding.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                            {holding.pnl >= 0 ? '+' : ''}{formatCurrency(holding.pnl)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${holding.pnlPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                            {holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {holding.allocation.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Footer */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Showing {sortedHoldings.length} of {mockHoldings.length} holdings</span>
                <div className="flex space-x-6">
                  <div className="text-gray-600">
                    Total Value: <span className="font-semibold text-gray-900">{formatCurrency(totalValue)}</span>
                  </div>
                  <div className="text-gray-600">
                    Total P&L: <span className={`font-semibold ${totalPnL >= 0 ? 'text-success' : 'text-danger'}`}>
                      {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}