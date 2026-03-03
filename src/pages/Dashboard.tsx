import { useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import AnimatedCounter from '../components/AnimatedCounter'
import { useToast } from '../components/ToastNotification'
import { mockPortfolioData, mockMarketData, formatCurrency, formatCurrencyFull, netWorthTimeline, cashFlowData, marketSparklines } from '../data/mockData'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts'
import { ArrowUpRight, ArrowDownRight, Briefcase, TrendingUp, PieChart, Receipt, Plus, Zap, Calculator, FileText, Download } from 'lucide-react'

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

const quickActions = [
  { label: 'Add Investment', icon: Plus, href: '/portfolio', color: '#0F4C75' },
  { label: 'SIP Calculator', icon: Calculator, href: '/goals', color: '#3282B8' },
  { label: 'Tax Report', icon: FileText, href: '/tax-center', color: '#B8860B' },
  { label: 'Quick Review', icon: Zap, href: '/risk-analysis', color: '#16A34A' },
]

const currencyTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {formatCurrencyFull(p.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function exportChartAsPNG(chartId: string) {
  const el = document.getElementById(chartId)
  if (!el) return
  const svg = el.querySelector('svg')
  if (!svg) return
  const svgData = new XMLSerializer().serializeToString(svg)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.onload = () => {
    canvas.width = img.width * 2
    canvas.height = img.height * 2
    ctx!.scale(2, 2)
    ctx!.fillStyle = 'white'
    ctx!.fillRect(0, 0, canvas.width, canvas.height)
    ctx!.drawImage(img, 0, 0)
    const a = document.createElement('a')
    a.download = `${chartId}.png`
    a.href = canvas.toDataURL('image/png')
    a.click()
  }
  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
}

export default function Dashboard() {
  const { addToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => addToast('Welcome back, Rajesh!', 'info'), 800)
    return () => clearTimeout(timer)
  }, [])

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Net Worth</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">
                <AnimatedCounter value={mockPortfolioData.netWorth} formatter={formatCurrency} />
              </p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+{mockPortfolioData.monthlyReturn}%</span>
                <span className="text-gray-500 ml-1">this month</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Annual Return</p>
              <p className="text-2xl font-semibold text-green-600">+{mockPortfolioData.annualYield}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickActions.map(qa => (
          <a key={qa.label} href={qa.href} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover-card flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: qa.color + '15' }}>
              <qa.icon className="h-5 w-5" style={{ color: qa.color }} />
            </div>
            <span className="text-sm font-medium text-gray-900">{qa.label}</span>
          </a>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Briefcase, label: 'Total AUM', value: mockPortfolioData.totalAUM, color: '#0F4C75', bg: 'bg-blue-50' },
          { icon: TrendingUp, label: 'Monthly Return', text: `+${mockPortfolioData.monthlyReturn}%`, color: '#16A34A', bg: 'bg-green-50' },
          { icon: PieChart, label: 'Annual Yield', text: `+${mockPortfolioData.annualYield}%`, color: '#00B4D8', bg: 'bg-cyan-50' },
          { icon: Receipt, label: 'Tax Saved YTD', value: mockPortfolioData.taxSavedYTD, color: '#3282B8', bg: 'bg-blue-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover-card">
            <div className="flex items-center">
              <div className={`p-2 ${s.bg} rounded-lg`}><s.icon className="h-6 w-6" style={{ color: s.color }} /></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{s.label}</p>
                <p className="text-lg font-semibold" style={{ color: s.color }}>
                  {s.value ? <AnimatedCounter value={s.value} formatter={formatCurrency} /> : s.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6" id="chart-networth">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Net Worth Timeline</h3>
            <button onClick={() => exportChartAsPNG('chart-networth')} className="p-1.5 text-gray-400 hover:text-[#0F4C75] rounded-lg hover:bg-gray-100" title="Export as PNG">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={netWorthTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={v => `${(v / 10000000).toFixed(1)}Cr`} tick={{ fontSize: 12 }} />
                <Tooltip content={currencyTooltip} />
                <Line type="monotone" dataKey="value" stroke="#0F4C75" strokeWidth={2} dot={{ fill: '#0F4C75', r: 3 }} activeDot={{ r: 6, fill: '#0F4C75' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Allocation</h3>
          <div className="space-y-3">
            {assetAllocationData.map((item, index) => (
              <div key={index} className="group">
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
                  <div className="h-2 rounded-full transition-all duration-1000 group-hover:opacity-80" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cash Flow */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8" id="chart-cashflow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Cash Flow</h3>
          <button onClick={() => exportChartAsPNG('chart-cashflow')} className="p-1.5 text-gray-400 hover:text-[#0F4C75] rounded-lg hover:bg-gray-100" title="Export as PNG">
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={v => `${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 12 }} />
              <Tooltip content={currencyTooltip} />
              <Legend />
              <Bar dataKey="income" fill="#16A34A" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#DC2626" name="Expenses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity + Market */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.stock}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
                <div className={`text-sm font-medium ${activity.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
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
              <div key={i} className="flex items-center justify-between hover:bg-gray-50 -mx-2 px-2 py-1 rounded-lg transition-colors">
                <span className="text-sm font-medium text-gray-900 w-20">{item.name}</span>
                <Sparkline data={item.data} color={item.change > 0 ? '#16A34A' : '#DC2626'} />
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{item.suffix === '/10g' ? '\u20B9' : ''}{item.value.toLocaleString()}{item.suffix}</div>
                  <div className={`text-xs flex items-center justify-end ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
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
