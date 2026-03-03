import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Briefcase, 
  Receipt, 
  Target, 
  Shield, 
  FileText, 
  Settings,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PieChart
} from 'lucide-react'
import Layout from '../components/Layout'
import { mockPortfolioData, mockMarketData, formatCurrency } from '../data/mockData'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Tax Center', href: '/tax-center', icon: Receipt },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Risk Analysis', href: '/risk-analysis', icon: Shield },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const assetAllocationData = [
  { name: 'Equity', value: 35, amount: 8674225, color: '#0F4C75' },
  { name: 'Real Estate', value: 25, amount: 6195875, color: '#3282B8' },
  { name: 'Fixed Income', value: 20, amount: 4956700, color: '#B8860B' },
  { name: 'Gold', value: 10, amount: 2478350, color: '#16A34A' },
  { name: 'Alternatives', value: 7, amount: 1734845, color: '#F59E0B' },
  { name: 'Cash', value: 3, amount: 743505, color: '#DC2626' },
]

const performanceData = [
  { month: 'Oct', value: 2.38 },
  { month: 'Nov', value: 2.42 },
  { month: 'Dec', value: 2.45 },
  { month: 'Jan', value: 2.41 },
  { month: 'Feb', value: 2.46 },
  { month: 'Mar', value: 2.48 },
]

const recentActivities = [
  { id: 1, action: 'Dividend Received', stock: 'TCS', amount: 12500, date: '2026-03-03' },
  { id: 2, action: 'Purchase', stock: 'HDFC Bank', amount: -152000, date: '2026-03-02' },
  { id: 3, action: 'Dividend Received', stock: 'Reliance', amount: 8750, date: '2026-03-01' },
  { id: 4, action: 'SIP Investment', stock: 'PPFAS Flexi Cap', amount: -25000, date: '2026-03-01' },
]

export default function Dashboard() {
  const location = useLocation()
  const [selectedPeriod, setSelectedPeriod] = useState('1Y')

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
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, Rajesh. Here's your portfolio overview.</p>
            </div>

            {/* Net Worth Card */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Net Worth</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">
                      {formatCurrency(mockPortfolioData.netWorth)}
                    </p>
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

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total AUM</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(mockPortfolioData.totalAUM)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Return</p>
                    <p className="text-lg font-semibold text-success">+{mockPortfolioData.monthlyReturn}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <PieChart className="h-6 w-6 text-accent" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Annual Yield</p>
                    <p className="text-lg font-semibold text-accent">+{mockPortfolioData.annualYield}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Receipt className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tax Saved YTD</p>
                    <p className="text-lg font-semibold text-secondary">{formatCurrency(mockPortfolioData.taxSavedYTD)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Asset Allocation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Allocation</h3>
                <div className="flex items-center space-x-8">
                  <div className="w-48 h-48 flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-20"></div>
                      <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">35%</div>
                          <div className="text-xs text-gray-600">Equity</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {assetAllocationData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-3"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{item.value}%</div>
                          <div className="text-xs text-gray-500">{formatCurrency(item.amount)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                  <div className="flex space-x-2">
                    {['1M', '3M', '6M', '1Y', '3Y', '5Y'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1 text-sm font-medium rounded ${
                          selectedPeriod === period
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)}Cr`, 'Value']} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#0F4C75" 
                        strokeWidth={2}
                        dot={{ fill: '#0F4C75' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Activity and Market Pulse */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
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
                        {activity.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(activity.amount))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Pulse */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Market Pulse</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Nifty 50</span>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{mockMarketData.nifty50.value.toLocaleString()}</div>
                      <div className={`text-xs flex items-center ${mockMarketData.nifty50.change > 0 ? 'text-success' : 'text-danger'}`}>
                        {mockMarketData.nifty50.change > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {Math.abs(mockMarketData.nifty50.change)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Sensex</span>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{mockMarketData.sensex.value.toLocaleString()}</div>
                      <div className={`text-xs flex items-center ${mockMarketData.sensex.change > 0 ? 'text-success' : 'text-danger'}`}>
                        {mockMarketData.sensex.change > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {Math.abs(mockMarketData.sensex.change)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Gold</span>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">₹{mockMarketData.gold.value.toLocaleString()}/10g</div>
                      <div className={`text-xs flex items-center ${mockMarketData.gold.change > 0 ? 'text-success' : 'text-danger'}`}>
                        {mockMarketData.gold.change > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {Math.abs(mockMarketData.gold.change)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">USD/INR</span>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">₹{mockMarketData.usdInr.value}</div>
                      <div className={`text-xs flex items-center ${mockMarketData.usdInr.change > 0 ? 'text-success' : 'text-danger'}`}>
                        {mockMarketData.usdInr.change > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {Math.abs(mockMarketData.usdInr.change)}%
                      </div>
                    </div>
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