import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { mockPortfolioData, mockMarketData, formatCurrency, formatCurrencyFull, netWorthTimeline, cashFlowData, marketSparklines } from '../data/mockData'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts'
import { ArrowUpRight, ArrowDownRight, Briefcase, TrendingUp, PieChart, Receipt, Plus, Zap, Calculator, FileText } from 'lucide-react'

const assetAllocationData = [
  { name: 'Equity', value: 35, amount: 8674225, color: '#0F4C75' },
  { name: 'Real Estate', value: 25, amount: 6195875, color: '#3282B8' },
  { name: 'Fixed Income', value: 20, amount: 4956700, color: '#B8860B' },
  { name: 'Gold', value: 10, amount: 2478350, color: '#16A34A' },
  { name: 'Alternatives', value: 7, amount: 1734845, color: '#F59E0B' },
  { name: 'Cash', value: 3, amount: 743505, color: '#DC2626' },
]

const recentActivities = [
  { id: 1, action: 'Dividend Received', stock: 'TCS', amount: 12500, date: '2026-03-03' },
  { id: 2, action: 'Purchase', stock: 'HDFC Bank', amount: -152000, date: '2026-03-02' },
  { id: 3, action: 'Dividend Received', stock: 'Reliance', amount: 8750, date: '2026-03-01' },
  { id: 4, action: 'SIP Investment', stock: 'PPFAS Flexi Cap', amount: -25000, date: '2026-03-01' },
]

// Quick Actions (Feature 19)
const quickActions = [
  { label: 'Add Investment', icon: Plus, href: '/portfolio', color: '#0F4C75' },
  { label: 'SIP Calculator', icon: Calculator, href: '/goals', color: '#3282B8' },
  { label: 'Tax Report', icon: FileText, href: '/tax-center', color: '#B8860B' },
  { label: 'Quick Review', icon: Zap, href: '/risk-analysis', color: '#16A34A' },
]

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y')

  // Mini sparkline renderer
  const Sparkline = ({ data, color }: { data: number[], color: string }) => (
    <svg viewBox="0 0 70 24" className="w-16 h-6">
      <polyline fill="none" stroke={color} strokeWidth="1.5"
        points={data.map((v, i) => {
          const min = Math.min(...data), max = Math.max(...data)
          const x = (i / (data.length - 1)) * 70
          const y = max === min ? 12 : 22 - ((v - min) / (max - min)) * 20
          return `${x},${y}`
        }).join(' ')} />
    </svg>
  )

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Rajesh. Here's your portfolio overview.</p>
      </div>

      {/* Net Worth Card */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Net Worth</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{formatCurrency(mockPortfolioData.netWorth)}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-success mr-1" />
                <span className="text-success font-medium">+{mockPortfolioData.monthlyReturn}%</span>
                <span className="text-gray-500 ml-1">this month</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Annual Return</p>
              <p className="text-2xl font-semibold text-success">+{mockPortfolioData.annualYield}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions (Feature 19) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickActions.map(qa => (
          <a key={qa.label} href={qa.href} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: qa.color + '15' }}>
              <qa.icon className="h-5 w-5" style={{ color: qa.color }} />
            </div>
            <span className="text-sm font-medium text-gray-900">{qa.label}</span>
          </a>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg"><Briefcase className="h-6 w-6 text-[#0F4C75]" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total AUM</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(mockPortfolioData.totalAUM)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-success/10 rounded-lg"><TrendingUp className="h-6 w-6 text-success" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Return</p>
              <p className="text-lg font-semibold text-success">+{mockPortfolioData.monthlyReturn}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-[#00B4D8]/10 rounded-lg"><PieChart className="h-6 w-6 text-[#00B4D8]" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Annual Yield</p>
              <p className="text-lg font-semibold text-[#00B4D8]">+{mockPortfolioData.annualYield}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-[#3282B8]/10 rounded-lg"><Receipt className="h-6 w-6 text-[#3282B8]" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tax Saved YTD</p>
              <p className="text-lg font-semibold text-[#3282B8]">{formatCurrency(mockPortfolioData.taxSavedYTD)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Net Worth Timeline (Feature 1) + Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Net Worth Timeline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={netWorthTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={v => `${(v / 10000000).toFixed(1)}Cr`} />
                <Tooltip formatter={(v: number) => formatCurrencyFull(v)} />
                <Line type="monotone" dataKey="value" stroke="#0F4C75" strokeWidth={2} dot={{ fill: '#0F4C75' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Allocation</h3>
          <div className="space-y-3">
            {assetAllocationData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900 mr-3">{item.value}%</span>
                    <span className="text-xs text-gray-500">{formatCurrency(item.amount)}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cash Flow (Feature 11) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Cash Flow</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={v => `${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v: number) => formatCurrencyFull(v)} />
              <Legend />
              <Bar dataKey="income" fill="#16A34A" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#DC2626" name="Expenses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity + Market Pulse (Feature 10) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.stock}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
                <div className={`text-sm font-medium ${activity.amount > 0 ? 'text-success' : 'text-gray-900'}`}>
                  {activity.amount > 0 ? '+' : ''}{formatCurrencyFull(Math.abs(activity.amount))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Market Pulse</h3>
          <div className="space-y-5">
            {[
              { name: 'Nifty 50', data: marketSparklines.nifty, ...mockMarketData.nifty50, suffix: '' },
              { name: 'Sensex', data: marketSparklines.sensex, ...mockMarketData.sensex, suffix: '' },
              { name: 'Gold', data: marketSparklines.gold, ...mockMarketData.gold, suffix: '/10g' },
              { name: 'USD/INR', data: marketSparklines.usdInr, ...mockMarketData.usdInr, suffix: '' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 w-20">{item.name}</span>
                <Sparkline data={item.data} color={item.change > 0 ? '#16A34A' : '#DC2626'} />
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{item.suffix === '/10g' ? '₹' : ''}{item.value.toLocaleString()}{item.suffix}</div>
                  <div className={`text-xs flex items-center justify-end ${item.change > 0 ? 'text-success' : 'text-danger'}`}>
                    {item.change > 0 ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                    {Math.abs(item.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
