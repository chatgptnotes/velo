
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Briefcase, 
  Receipt, 
  Target, 
  Shield, 
  FileText, 
  Settings,
  Calendar,
  TrendingDown,
  PieChart
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

export default function TaxCenter() {
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
                          ? 'bg-blue-50 border-r-2 border-[#0F4C75] text-[#0F4C75]'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-3 py-3 text-sm font-medium rounded-l-lg`}
                    >
                      <Icon
                        className={`${
                          isActive ? 'text-[#0F4C75]' : 'text-gray-400 group-hover:text-gray-500'
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
              <h1 className="text-3xl font-bold text-gray-900">Tax Center</h1>
              <p className="text-gray-600 mt-2">Optimize your tax strategy and maximize savings</p>
            </div>

            {/* Tax Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-danger/10 rounded-lg">
                    <Receipt className="h-6 w-6 text-danger" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Estimated Liability</p>
                    <p className="text-lg font-semibold text-danger">{formatCurrency(850000)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <TrendingDown className="h-6 w-6 text-success" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Deductions</p>
                    <p className="text-lg font-semibold text-success">{formatCurrency(425000)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-[#0F4C75]/10 rounded-lg">
                    <PieChart className="h-6 w-6 text-[#0F4C75]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Effective Rate</p>
                    <p className="text-lg font-semibold text-[#0F4C75]">18.5%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-[#00B4D8]/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-[#00B4D8]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tax Saved YTD</p>
                    <p className="text-lg font-semibold text-[#00B4D8]">{formatCurrency(285000)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Capital Gains & Deductions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Capital Gains */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Capital Gains Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Short Term Capital Gains (STCG)</p>
                      <p className="text-xs text-gray-600">Tax Rate: 15%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(125000)}</p>
                      <p className="text-xs text-danger">Tax: {formatCurrency(18750)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Long Term Capital Gains (LTCG)</p>
                      <p className="text-xs text-gray-600">Tax Rate: 10% (above ₹1L)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(285000)}</p>
                      <p className="text-xs text-danger">Tax: {formatCurrency(18500)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Deductions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Tax Deductions</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">Section 80C</span>
                      <span className="text-sm text-gray-600">{formatCurrency(150000)} / {formatCurrency(150000)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">Section 80D (Health Insurance)</span>
                      <span className="text-sm text-gray-600">{formatCurrency(35000)} / {formatCurrency(50000)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">Section 80G (Donations)</span>
                      <span className="text-sm text-gray-600">{formatCurrency(25000)} / No Limit</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#0F4C75] h-2 rounded-full w-1/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Loss Harvesting */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Tax-Loss Harvesting Opportunities</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-warning/20 bg-warning/5 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">ITC Ltd</p>
                    <p className="text-xs text-gray-600">Unrealized Loss: {formatCurrency(-8500)}</p>
                  </div>
                  <button className="px-4 py-2 bg-warning text-white rounded-lg text-sm font-medium hover:bg-warning/90">
                    Book Loss
                  </button>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-warning/20 bg-warning/5 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Axis Bluechip Fund</p>
                    <p className="text-xs text-gray-600">Unrealized Loss: {formatCurrency(-12500)}</p>
                  </div>
                  <button className="px-4 py-2 bg-warning text-white rounded-lg text-sm font-medium hover:bg-warning/90">
                    Book Loss
                  </button>
                </div>
              </div>
            </div>

            {/* Advance Tax Calendar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Advance Tax Calendar FY 2025-26</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg text-center">
                  <p className="text-sm font-medium text-gray-900">Q1 - 15th June</p>
                  <p className="text-lg font-semibold text-[#0F4C75] mt-1">{formatCurrency(212500)}</p>
                  <p className="text-xs text-success mt-1">Paid</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg text-center">
                  <p className="text-sm font-medium text-gray-900">Q2 - 15th Sept</p>
                  <p className="text-lg font-semibold text-[#0F4C75] mt-1">{formatCurrency(212500)}</p>
                  <p className="text-xs text-success mt-1">Paid</p>
                </div>
                
                <div className="p-4 border border-[#0F4C75] bg-[#0F4C75]/5 rounded-lg text-center">
                  <p className="text-sm font-medium text-gray-900">Q3 - 15th Dec</p>
                  <p className="text-lg font-semibold text-[#0F4C75] mt-1">{formatCurrency(212500)}</p>
                  <p className="text-xs text-warning mt-1">Due Soon</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg text-center">
                  <p className="text-sm font-medium text-gray-900">Q4 - 15th Mar</p>
                  <p className="text-lg font-semibold text-[#0F4C75] mt-1">{formatCurrency(212500)}</p>
                  <p className="text-xs text-gray-500 mt-1">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}