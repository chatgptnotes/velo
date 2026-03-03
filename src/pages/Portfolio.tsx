import { useState } from 'react'
import { mockPortfolio } from '../lib/mockData'
import { Plus, Filter, TrendingUp, TrendingDown } from 'lucide-react'

const Portfolio = () => {
  const [selectedAssetClass, setSelectedAssetClass] = useState('all')
  const [sortBy, setSortBy] = useState('allocation')

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else {
      return `₹${amount.toLocaleString()}`
    }
  }

  const calculatePL = (holding: any) => {
    const totalValue = holding.quantity * holding.currentPrice
    const totalCost = holding.quantity * holding.avgCost
    return totalValue - totalCost
  }

  const calculatePLPercent = (holding: any) => {
    return ((holding.currentPrice - holding.avgCost) / holding.avgCost) * 100
  }

  const calculateAllocation = (holding: any) => {
    const holdingValue = holding.quantity * holding.currentPrice
    return (holdingValue / mockPortfolio.netWorth) * 100
  }

  const filteredHoldings = mockPortfolio.holdings.filter(holding => {
    if (selectedAssetClass === 'all') return true
    return holding.assetClass === selectedAssetClass
  })

  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'pl':
        return calculatePL(b) - calculatePL(a)
      case 'allocation':
        return calculateAllocation(b) - calculateAllocation(a)
      default:
        return 0
    }
  })

  const assetClasses = [
    { value: 'all', label: 'All Assets' },
    { value: 'equity', label: 'Equity' },
    { value: 'fixed_income', label: 'Fixed Income' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'gold', label: 'Gold' },
    { value: 'alternatives', label: 'Alternatives' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Portfolio</h1>
          <p className="text-primary-text-secondary mt-1">Your complete investment holdings and performance</p>
        </div>
        <button className="bg-primary-gold text-primary-bg px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Investment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-primary-border shadow-card">
          <p className="text-sm text-primary-text-secondary mb-1">Total Portfolio Value</p>
          <p className="text-xl font-bold text-primary-main">{formatCurrency(mockPortfolio.netWorth)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-primary-border shadow-card">
          <p className="text-sm text-primary-text-secondary mb-1">Total Holdings</p>
          <p className="text-xl font-bold text-primary-text">{mockPortfolio.holdings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-primary-border shadow-card">
          <p className="text-sm text-primary-text-secondary mb-1">Day's P&L</p>
          <p className="text-xl font-bold text-primary-success flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +₹2,85,000
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-primary-border shadow-card">
          <p className="text-sm text-primary-text-secondary mb-1">Overall P&L</p>
          <p className="text-xl font-bold text-primary-success">+₹4,25,00,000</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-primary-border shadow-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-primary-text-secondary" />
            <select
              value={selectedAssetClass}
              onChange={(e) => setSelectedAssetClass(e.target.value)}
              className="bg-white border border-primary-border rounded-lg px-3 py-2 text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-main"
            >
              {assetClasses.map(asset => (
                <option key={asset.value} value={asset.value}>{asset.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-primary-text-secondary">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-primary-border rounded-lg px-3 py-2 text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-main"
            >
              <option value="allocation">Allocation %</option>
              <option value="name">Name</option>
              <option value="pl">P&L</option>
            </select>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-lg border border-primary-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-primary-text-secondary">Name</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-primary-text-secondary">Ticker</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-primary-text-secondary">Quantity</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-primary-text-secondary">Avg Cost</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-primary-text-secondary">Current Price</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-primary-text-secondary">P&L</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-primary-text-secondary">P&L%</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-primary-text-secondary">Allocation%</th>
              </tr>
            </thead>
            <tbody>
              {sortedHoldings.map((holding, index) => {
                const pl = calculatePL(holding)
                const plPercent = calculatePLPercent(holding)
                const allocation = calculateAllocation(holding)
                const isPositive = pl >= 0

                return (
                  <tr key={index} className="border-t border-primary-border hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-primary-text font-medium">{holding.name}</p>
                        <p className="text-sm text-primary-text-secondary">{holding.sector}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-primary-text">{holding.ticker}</td>
                    <td className="py-4 px-6 text-right text-primary-text">
                      {holding.quantity.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right text-primary-text">
                      ₹{holding.avgCost.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right text-primary-text">
                      ₹{holding.currentPrice.toLocaleString()}
                    </td>
                    <td className={`py-4 px-6 text-right font-medium flex items-center justify-end ${
                      isPositive ? 'text-primary-success' : 'text-primary-danger'
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {isPositive ? '+' : ''}{formatCurrency(Math.abs(pl))}
                    </td>
                    <td className={`py-4 px-6 text-right font-medium ${
                      isPositive ? 'text-primary-success' : 'text-primary-danger'
                    }`}>
                      {isPositive ? '+' : ''}{plPercent.toFixed(1)}%
                    </td>
                    <td className="py-4 px-6 text-right text-primary-text">
                      {allocation.toFixed(2)}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Class Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPortfolio.assetAllocation.map((asset) => (
          <div key={asset.name} className="bg-white p-6 rounded-lg border border-primary-border shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-primary-text">{asset.name}</h3>
              <span className="text-primary-main font-medium">{asset.value}%</span>
            </div>
            <p className="text-2xl font-bold text-primary-text mb-2">{formatCurrency(asset.amount)}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-main h-2 rounded-full transition-all duration-300"
                style={{ width: `${asset.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio