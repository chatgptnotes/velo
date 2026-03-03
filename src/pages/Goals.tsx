
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Briefcase, 
  Receipt, 
  Target, 
  Shield, 
  FileText, 
  Settings,
  Plus,

  Calendar
} from 'lucide-react'
import Layout from '../components/Layout'
import { mockGoals, formatCurrency } from '../data/mockData'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Tax Center', href: '/tax-center', icon: Receipt },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Risk Analysis', href: '/risk-analysis', icon: Shield },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Goals() {
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
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
                <p className="text-gray-600 mt-2">Track your progress towards your financial objectives</p>
              </div>
              <button className="bg-[#0F4C75] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#093049] transition-colors flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add Goal</span>
              </button>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {mockGoals.map((goal) => {
                const progressPercent = (goal.currentAmount / goal.targetAmount) * 100
                const remainingAmount = goal.targetAmount - goal.currentAmount
                const monthsToTarget = remainingAmount / goal.monthlyContribution
                const targetDate = new Date(goal.projectedDate)
                
                return (
                  <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          goal.priority === 'high' ? 'bg-danger/10' :
                          goal.priority === 'medium' ? 'bg-warning/10' :
                          'bg-success/10'
                        }`}>
                          <Target className={`h-6 w-6 ${
                            goal.priority === 'high' ? 'text-danger' :
                            goal.priority === 'medium' ? 'text-warning' :
                            'text-success'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                          <p className={`text-xs font-medium uppercase tracking-wide ${
                            goal.priority === 'high' ? 'text-danger' :
                            goal.priority === 'medium' ? 'text-warning' :
                            'text-success'
                          }`}>
                            {goal.priority} Priority
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{progressPercent.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-[#0F4C75] h-3 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progressPercent, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Financial Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Target Amount</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(goal.targetAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Current Amount</span>
                        <span className="text-sm font-medium text-[#0F4C75]">{formatCurrency(goal.currentAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Remaining</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(remainingAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Monthly SIP</span>
                        <span className="text-sm font-medium text-[#3282B8]">{formatCurrency(goal.monthlyContribution)}</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Target Date</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {targetDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {Math.ceil(monthsToTarget)} months remaining at current contribution rate
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 bg-[#0F4C75]/10 text-[#0F4C75] px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                        Adjust Goal
                      </button>
                      <button className="flex-1 bg-[#3282B8]/10 text-[#3282B8] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3282B8]/20 transition-colors">
                        Add Funds
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Goal Summary */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Goals Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0F4C75] mb-1">
                    {formatCurrency(mockGoals.reduce((sum, goal) => sum + goal.targetAmount, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total Target</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">
                    {formatCurrency(mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Current Savings</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3282B8] mb-1">
                    {formatCurrency(mockGoals.reduce((sum, goal) => sum + goal.monthlyContribution, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Monthly SIPs</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {((mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0) / 
                       mockGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Overall Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}