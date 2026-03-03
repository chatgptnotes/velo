import React, { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { mockHoldings, formatCurrency, formatCurrencyFull, rebalancingData, feeAnalysis, dividendCalendar, dividendSummary, realEstateProperties, goldHoldings } from '../data/mockData'
import type { Holding } from '../data/mockData'
import { Briefcase, TrendingUp, TrendingDown, Search, RefreshCw, DollarSign, Home, Circle } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const categories = [
  { id: 'all', name: 'All Assets' }, { id: 'equity', name: 'Equity' }, { id: 'fixed-income', name: 'Fixed Income' },
  { id: 'real-estate', name: 'Real Estate' }, { id: 'gold', name: 'Gold' }, { id: 'alternatives', name: 'Alternatives' }, { id: 'cash', name: 'Cash' }
]

const tabs = ['Holdings', 'Dividends', 'Rebalance', 'Fees', 'Real Estate', 'Gold']

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Holdings')
  const [sortConfig, setSortConfig] = useState<{ key: keyof Holding; direction: 'asc' | 'desc' } | null>(null)

  const filteredHoldings = mockHoldings.filter(h => {
    const matchesCategory = activeCategory === 'all' || h.category === activeCategory
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedHoldings = React.useMemo(() => {
    if (!sortConfig) return filteredHoldings
    return [...filteredHoldings].sort((a, b) => {
      const aV = a[sortConfig.key], bV = b[sortConfig.key]
      if (typeof aV === 'number' && typeof bV === 'number') return sortConfig.direction === 'asc' ? aV - bV : bV - aV
      if (typeof aV === 'string' && typeof bV === 'string') return sortConfig.direction === 'asc' ? aV.localeCompare(bV) : bV.localeCompare(aV)
      return 0
    })
  }, [filteredHoldings, sortConfig])

  const handleSort = (key: keyof Holding) => {
    setSortConfig(c => ({ key, direction: c?.key === key && c.direction === 'asc' ? 'desc' : 'asc' }))
  }

  const totalValue = filteredHoldings.reduce((s, h) => s + h.currentValue, 0)
  const totalPnL = filteredHoldings.reduce((s, h) => s + h.pnl, 0)

  const rebalanceChartData = rebalancingData.current.map(r => ({ name: r.asset, Current: r.current, Target: r.target }))

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
        <p className="text-gray-600 mt-2">Your complete investment holdings and performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-600">Total Value</p><p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p></div>
            <Briefcase className="h-8 w-8 text-[#0F4C75]" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-600">Total P&L</p><p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-success' : 'text-danger'}`}>{totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}</p></div>
            {totalPnL >= 0 ? <TrendingUp className="h-8 w-8 text-success" /> : <TrendingDown className="h-8 w-8 text-danger" />}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-600">Annual Dividends</p><p className="text-2xl font-bold text-[#3282B8]">{formatCurrency(dividendSummary.projectedAnnual)}</p></div>
            <DollarSign className="h-8 w-8 text-[#3282B8]" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab ? 'bg-white text-[#0F4C75] shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Holdings Tab */}
      {activeTab === 'Holdings' && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-wrap gap-2 flex-1">
                {categories.map(c => (
                  <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`px-4 py-2 text-sm font-medium rounded-lg ${activeCategory === c.id ? 'bg-[#0F4C75] text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'}`}>{c.name}</button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F4C75]" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['name','ticker','quantity','avgCost','currentPrice','currentValue','pnl','pnlPercent','allocation'].map(k => (
                    <th key={k} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort(k as keyof Holding)}>
                      {k === 'pnlPercent' ? 'P&L %' : k === 'pnl' ? 'P&L' : k === 'avgCost' ? 'Avg Cost' : k === 'currentPrice' ? 'Price' : k === 'currentValue' ? 'Value' : k.charAt(0).toUpperCase() + k.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedHoldings.map(h => (
                  <tr key={h.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><div className="text-sm font-medium text-gray-900">{h.name}</div><div className="text-xs text-gray-500 capitalize">{h.category.replace('-',' ')}</div></td>
                    <td className="px-4 py-3 text-sm">{h.ticker}</td>
                    <td className="px-4 py-3 text-sm">{h.quantity}</td>
                    <td className="px-4 py-3 text-sm">{formatCurrencyFull(h.avgCost)}</td>
                    <td className="px-4 py-3 text-sm">{formatCurrencyFull(h.currentPrice)}</td>
                    <td className="px-4 py-3 text-sm font-medium">{formatCurrency(h.currentValue)}</td>
                    <td className={`px-4 py-3 text-sm font-medium ${h.pnl >= 0 ? 'text-success' : 'text-danger'}`}>{h.pnl >= 0 ? '+' : ''}{formatCurrencyFull(h.pnl)}</td>
                    <td className={`px-4 py-3 text-sm font-medium ${h.pnlPercent >= 0 ? 'text-success' : 'text-danger'}`}>{h.pnlPercent >= 0 ? '+' : ''}{h.pnlPercent.toFixed(2)}%</td>
                    <td className="px-4 py-3 text-sm">{h.allocation.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Dividends Tab (Feature 3) */}
      {activeTab === 'Dividends' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Total Received</p>
              <p className="text-xl font-bold text-success">{formatCurrency(dividendSummary.totalReceived)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Projected Annual</p>
              <p className="text-xl font-bold text-[#0F4C75]">{formatCurrency(dividendSummary.projectedAnnual)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Avg Yield</p>
              <p className="text-xl font-bold text-[#3282B8]">{dividendSummary.averageYield}%</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">DRIP Enabled</p>
              <p className="text-xl font-bold text-gray-900">{dividendSummary.dripEnabled.length} stocks</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Dividends</h3>
            <div className="space-y-3">
              {dividendCalendar.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center bg-[#0F4C75] text-white rounded-lg p-2 w-14">
                      <div className="text-xs">{new Date(d.date).toLocaleDateString('en-IN', { month: 'short' })}</div>
                      <div className="text-lg font-bold">{new Date(d.date).getDate()}</div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{d.stock}</p>
                      <p className="text-sm text-gray-500">{formatCurrencyFull(d.amount)}/share x {d.totalShares} shares</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-success">{formatCurrencyFull(d.amount * d.totalShares)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Rebalance Tab (Feature 5) */}
      {activeTab === 'Rebalance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current vs Target Allocation</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rebalanceChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => `${v}%`} />
                  <Bar dataKey="Current" fill="#0F4C75" radius={[4,4,0,0]} />
                  <Bar dataKey="Target" fill="#B8860B" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rebalancing Suggestions</h3>
            <div className="space-y-4">
              {rebalancingData.suggestions.map((s, i) => (
                <div key={i} className={`p-4 rounded-lg border ${s.action === 'Sell' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`text-sm font-bold ${s.action === 'Sell' ? 'text-danger' : 'text-success'}`}>{s.action}</span>
                      <span className="text-sm font-medium text-gray-900 ml-2">{s.asset}</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(s.amount)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{s.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fees Tab (Feature 6) */}
      {activeTab === 'Fees' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Weighted Expense Ratio</p>
              <p className="text-xl font-bold text-[#0F4C75]">{feeAnalysis.weightedExpenseRatio}%</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Annual Fees</p>
              <p className="text-xl font-bold text-warning">{formatCurrencyFull(feeAnalysis.totalAnnualFees)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">10-Year Fee Impact</p>
              <p className="text-xl font-bold text-danger">{formatCurrency(feeAnalysis.totalTenYearImpact)}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fund</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expense Ratio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Annual Fee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">10Y Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {feeAnalysis.holdings.map((h, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{h.name}</td>
                    <td className="px-6 py-4 text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${h.expenseRatio > 1 ? 'bg-red-100 text-red-700' : h.expenseRatio > 0.5 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{h.expenseRatio}%</span></td>
                    <td className="px-6 py-4 text-sm">{formatCurrency(h.value)}</td>
                    <td className="px-6 py-4 text-sm text-warning">{formatCurrencyFull(h.annualFee)}</td>
                    <td className="px-6 py-4 text-sm text-danger">{formatCurrencyFull(h.tenYearImpact)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Real Estate Tab (Feature 15) */}
      {activeTab === 'Real Estate' && (
        <div className="space-y-4">
          {realEstateProperties.map(p => {
            const appreciation = ((p.currentValue - p.purchasePrice) / p.purchasePrice * 100)
            return (
              <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-[#3282B8]/10 rounded-lg"><Home className="h-6 w-6 text-[#3282B8]" /></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{p.name}</h4>
                      <p className="text-sm text-gray-500">{p.type} | {p.area}</p>
                      <p className="text-xs text-gray-400 mt-1">Purchased: {new Date(p.purchaseDate).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(p.currentValue)}</p>
                    <p className="text-sm text-success">+{appreciation.toFixed(1)}% appreciation</p>
                    <p className="text-xs text-gray-500 mt-1">Rental: {formatCurrencyFull(p.rentalIncome)}/mo</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Gold Tab (Feature 16) */}
      {activeTab === 'Gold' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] rounded-xl p-6 text-white">
            <p className="text-sm opacity-80">Total Gold Value</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(goldHoldings.totalValue)}</p>
            <p className="text-sm mt-2">Gold Rate: {formatCurrencyFull(goldHoldings.goldRate)}/10g ({goldHoldings.goldRateChange}%)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Physical Gold</p>
              <p className="text-lg font-bold text-gray-900">{goldHoldings.physical.weight}g {goldHoldings.physical.purity}</p>
              <p className="text-sm text-gray-500">{formatCurrency(goldHoldings.physical.value)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Sovereign Gold Bonds</p>
              <p className="text-lg font-bold text-gray-900">{goldHoldings.sgb.reduce((s, g) => s + g.units, 0)} units</p>
              <p className="text-sm text-gray-500">{formatCurrency(goldHoldings.sgb.reduce((s, g) => s + g.units * g.currentPrice, 0))}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Gold ETF</p>
              <p className="text-lg font-bold text-gray-900">{goldHoldings.etf.units} units</p>
              <p className="text-sm text-gray-500">{formatCurrency(goldHoldings.etf.value)}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">SGB Holdings</h3>
            {goldHoldings.sgb.map((s, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <div><p className="text-sm font-medium">{s.series}</p><p className="text-xs text-gray-500">Maturity: {new Date(s.maturityDate).toLocaleDateString('en-IN')}</p></div>
                <div className="text-right">
                  <p className="text-sm font-medium">{s.units} units at {formatCurrencyFull(s.buyPrice)}</p>
                  <p className="text-sm text-success">+{((s.currentPrice - s.buyPrice) / s.buyPrice * 100).toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
