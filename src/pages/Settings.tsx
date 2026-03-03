import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Briefcase, 
  Receipt, 
  Target, 
  Shield, 
  FileText, 
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Users,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'
import Layout from '../components/Layout'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Tax Center', href: '/tax-center', icon: Receipt },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Risk Analysis', href: '/risk-analysis', icon: Shield },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
]

export default function Settings() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    portfolio: true,
    market: true,
    tax: true
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'advisor', name: 'Advisor Access', icon: Users },
  ]

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
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-2">Manage your account preferences and security settings</p>
            </div>

            {/* Settings Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                          activeTab === tab.id
                            ? 'border-[#0F4C75] text-[#0F4C75]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        } flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="max-w-2xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-[#0F4C75]/10 rounded-full flex items-center justify-center">
                          <User className="h-10 w-10 text-[#0F4C75]" />
                        </div>
                        <button className="px-4 py-2 bg-[#0F4C75]/10 text-[#0F4C75] rounded-lg hover:bg-primary/20 transition-colors">
                          Change Photo
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            defaultValue="Rajesh Kumar"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            defaultValue="rajesh.kumar@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            defaultValue="+91 98765 43210"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                          <input
                            type="text"
                            defaultValue="ABCDE****F"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            disabled
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button className="bg-[#0F4C75] text-white px-6 py-2 rounded-lg hover:bg-[#093049] transition-colors flex items-center space-x-2">
                          <Save className="h-4 w-4" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="max-w-2xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
                    
                    <div className="space-y-6">
                      {/* Change Password */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Change Password</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <div className="relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </div>
                          <button className="bg-[#0F4C75] text-white px-4 py-2 rounded-lg hover:bg-[#093049] transition-colors">
                            Update Password
                          </button>
                        </div>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-md font-medium text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                          </div>
                          <button
                            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              twoFactorEnabled ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Active Sessions */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Active Sessions</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Current session</p>
                              <p className="text-xs text-gray-600">Chrome on Windows • Mumbai, India</p>
                            </div>
                            <span className="text-xs text-success bg-success/10 px-2 py-1 rounded">Active</span>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Mobile app</p>
                              <p className="text-xs text-gray-600">iOS • Last active 2 hours ago</p>
                            </div>
                            <button className="text-xs text-danger hover:text-danger/80">Revoke</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="max-w-2xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Delivery Methods</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                              <p className="text-xs text-gray-600">Receive updates via email</p>
                            </div>
                            <button
                              onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notifications.email ? 'bg-primary' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notifications.email ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                              <p className="text-xs text-gray-600">Receive alerts via SMS</p>
                            </div>
                            <button
                              onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notifications.sms ? 'bg-primary' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notifications.sms ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Notification Types</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Portfolio Updates</p>
                              <p className="text-xs text-gray-600">Weekly portfolio performance reports</p>
                            </div>
                            <button
                              onClick={() => setNotifications(prev => ({ ...prev, portfolio: !prev.portfolio }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notifications.portfolio ? 'bg-primary' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notifications.portfolio ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Market Alerts</p>
                              <p className="text-xs text-gray-600">Important market movements and news</p>
                            </div>
                            <button
                              onClick={() => setNotifications(prev => ({ ...prev, market: !prev.market }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notifications.market ? 'bg-primary' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notifications.market ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Tax Reminders</p>
                              <p className="text-xs text-gray-600">Important tax dates and deadlines</p>
                            </div>
                            <button
                              onClick={() => setNotifications(prev => ({ ...prev, tax: !prev.tax }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notifications.tax ? 'bg-primary' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notifications.tax ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Advisor Access Tab */}
                {activeTab === 'advisor' && (
                  <div className="max-w-2xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Advisor Access Management</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Current Advisor</h4>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-[#3282B8]/10 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-[#3282B8]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Priya Sharma, CFP</p>
                            <p className="text-xs text-gray-600">Senior Wealth Advisor • WealthCorp Advisory</p>
                            <p className="text-xs text-gray-600">priya.sharma@wealthcorp.in • +91 99988 77766</p>
                          </div>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Change Advisor
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Access Permissions</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-900">View Portfolio</span>
                            <span className="text-xs text-success bg-success/10 px-2 py-1 rounded">Granted</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-900">Make Transactions</span>
                            <span className="text-xs text-danger bg-danger/10 px-2 py-1 rounded">Denied</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-900">Access Tax Documents</span>
                            <span className="text-xs text-success bg-success/10 px-2 py-1 rounded">Granted</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-900">Rebalance Portfolio</span>
                            <span className="text-xs text-warning bg-warning/10 px-2 py-1 rounded">Approval Required</span>
                          </div>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-[#0F4C75] text-white rounded-lg hover:bg-[#093049] transition-colors">
                          Modify Permissions
                        </button>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Session History</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Login</span>
                            <span className="text-gray-900">March 2, 2026 at 2:30 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Portfolio Review</span>
                            <span className="text-gray-900">February 28, 2026 at 11:15 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Document Access</span>
                            <span className="text-gray-900">February 25, 2026 at 4:45 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}