
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Briefcase, 
  Receipt, 
  Target, 
  Shield, 
  FileText, 
  Settings,
  AlertTriangle,
  TrendingDown,
  Activity
} from 'lucide-react'
import Layout from '../components/Layout'
import { formatCurrency } from '../data/mockData'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Tax Center', href: '/tax-center', icon: Receipt },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Risk Analysis', href: '/risk-analysis', icon: Shield },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function RiskAnalysis() {
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Risk Analysis</h1>
              <p className="text-gray-600 mt-2">Comprehensive risk assessment and recommendations</p>
            </div>

            {/* Risk Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                  <div className="absolute inset-0 rounded-full border-8 border-warning border-t-transparent transform rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-warning">62</div>
                      <div className="text-sm text-gray-600">Risk Score</div>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Moderate Risk Profile</h2>
                <p className="text-gray-600 mt-2">Your portfolio shows balanced risk exposure with opportunities for optimization</p>
              </div>
            </div>

            {/* Risk Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <Shield className="h-6 w-6 text-success" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Diversification Score</p>
                    <p className="text-lg font-semibold text-success">78/100</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-warning" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Concentration Risk</p>
                    <p className="text-lg font-semibold text-warning">Medium</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Volatility (1Y)</p>
                    <p className="text-lg font-semibold text-primary">12.4%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Concentration Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Concentration Risk Analysis</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Top 5 Holdings</span>
                    <span className="text-sm text-warning">42.3% of portfolio</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reliance Industries</span>
                      <span className="text-gray-900">26.8%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">TCS</span>
                      <span className="text-gray-900">22.7%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">HDFC Bank</span>
                      <span className="text-gray-900">18.4%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Infosys</span>
                      <span className="text-gray-900">14.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">PPFAS Flexi Cap</span>
                      <span className="text-gray-900">14.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stress Tests */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Crash (-20%)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current Value</span>
                    <span className="text-sm font-medium">{formatCurrency(24783500)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Stress Value</span>
                    <span className="text-sm font-medium text-danger">{formatCurrency(19826800)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Potential Loss</span>
                    <span className="text-sm font-medium text-danger">-{formatCurrency(4956700)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interest Rate Rise (+2%)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bond Portfolio</span>
                    <span className="text-sm font-medium">{formatCurrency(2505950)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Stress Value</span>
                    <span className="text-sm font-medium text-danger">{formatCurrency(2255355)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Impact</span>
                    <span className="text-sm font-medium text-danger">-{formatCurrency(250595)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Currency Devaluation (-10%)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">International Assets</span>
                    <span className="text-sm font-medium">{formatCurrency(1239175)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Stress Value</span>
                    <span className="text-sm font-medium text-danger">{formatCurrency(1115258)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Currency Impact</span>
                    <span className="text-sm font-medium text-danger">-{formatCurrency(123917)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Risk Recommendations</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-warning/5 border border-warning/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Reduce Concentration Risk</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Consider rebalancing your top 3 holdings which represent 68% of your equity portfolio. 
                      Diversifying into mid-cap or international funds could reduce concentration risk.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Enhance Fixed Income Allocation</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Your fixed income allocation of 20% could be increased to 25-30% to provide better 
                      downside protection during market volatility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-success/5 border border-success/20 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Add Defensive Sectors</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Consider adding exposure to defensive sectors like FMCG and pharmaceuticals to 
                      reduce portfolio volatility during economic downturns.
                    </p>
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