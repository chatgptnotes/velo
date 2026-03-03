import { mockPortfolio, performanceData } from '../lib/mockData'
import { TrendingUp, TrendingDown, DollarSign, Percent, Calculator, Activity } from 'lucide-react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else {
      return `₹${amount.toLocaleString()}`
    }
  }

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const COLORS = ['#D4AF37', '#C0C0C0', '#8B7355', '#6B5B95', '#88D8B0', '#FFAAA5']

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Dashboard</h1>
          <p className="text-primary-text-secondary mt-1">Your wealth overview and portfolio performance</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-primary-text-secondary">Last updated</p>
          <p className="text-primary-text font-medium">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Net Worth Overview */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary-text">Net Worth</h2>
          <div className="flex items-center text-primary-success">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{formatPercent(mockPortfolio.monthlyReturn)}</span>
          </div>
        </div>
        <div className="text-4xl font-bold text-primary-gold mb-2">
          {formatCurrency(mockPortfolio.netWorth)}
        </div>
        <p className="text-primary-text-secondary">
          Monthly change: <span className="text-primary-success">+{formatCurrency(mockPortfolio.netWorth * 0.0185)}</span>
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-gold bg-opacity-10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-gold" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-text-secondary">Total AUM</p>
              <p className="text-2xl font-bold text-primary-text">{formatCurrency(mockPortfolio.netWorth)}</p>
            </div>
          </div>
        </div>

        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-success bg-opacity-10 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-primary-success" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-text-secondary">Annual Yield</p>
              <p className="text-2xl font-bold text-primary-text">{mockPortfolio.annualYield}%</p>
            </div>
          </div>
        </div>

        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-silver bg-opacity-10 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary-silver" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-text-secondary">Tax Saved YTD</p>
              <p className="text-2xl font-bold text-primary-text">{formatCurrency(mockPortfolio.taxSavedYTD)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-primary-text mb-4">Asset Allocation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPortfolio.assetAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                >
                  {mockPortfolio.assetAllocation.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Allocation']}
                  contentStyle={{
                    backgroundColor: '#1A1F2E',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F5F5F5'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {mockPortfolio.assetAllocation.map((item, index) => (
              <div key={item.name} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-primary-text">{item.name}</span>
                <span className="ml-auto text-primary-text-secondary">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Performance */}
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-primary-text mb-4">Portfolio Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="period" stroke="#9E9E9E" />
                <YAxis stroke="#9E9E9E" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Return']}
                  contentStyle={{
                    backgroundColor: '#1A1F2E',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F5F5F5'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#D4AF37" 
                  strokeWidth={2}
                  dot={{ fill: '#D4AF37', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-text">Recent Activity</h3>
            <Activity className="w-5 h-5 text-primary-gold" />
          </div>
          <div className="space-y-3">
            {mockPortfolio.recentTransactions.slice(0, 5).map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                <div>
                  <p className="text-primary-text font-medium">{transaction.description}</p>
                  <p className="text-sm text-primary-text-secondary">{transaction.date}</p>
                </div>
                <div className={`text-right ${transaction.amount > 0 ? 'text-primary-success' : 'text-primary-text'}`}>
                  <p className="font-medium">
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <p className="text-xs text-primary-text-secondary capitalize">{transaction.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Pulse */}
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-primary-text mb-4">Market Pulse</h3>
          <div className="space-y-3">
            {mockPortfolio.marketPulse.map((market, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-primary-text font-medium">{market.name}</span>
                <div className="text-right">
                  <div className="text-primary-text font-medium">{market.value.toLocaleString()}</div>
                  <div className={`text-sm flex items-center ${
                    market.change >= 0 ? 'text-primary-success' : 'text-primary-danger'
                  }`}>
                    {market.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {formatPercent(market.change)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard