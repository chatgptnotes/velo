import { useState } from 'react'
import { User, Shield, Bell, Download, UserCheck, Eye, EyeOff, Smartphone, Mail, Lock } from 'lucide-react'

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [advisorAccess, setAdvisorAccess] = useState(false)

  const [profileData, setProfileData] = useState({
    fullName: 'Rajesh Kumar Agarwal',
    email: 'rajesh.agarwal@example.com',
    phone: '+91 98765 43210',
    panNumber: 'ABCDE1234F'
  })

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const activeSessions = [
    { device: 'MacBook Pro', location: 'Mumbai, India', lastActive: '2 minutes ago', current: true },
    { device: 'iPhone 14 Pro', location: 'Mumbai, India', lastActive: '1 hour ago', current: false },
    { device: 'iPad Air', location: 'Delhi, India', lastActive: '3 days ago', current: false }
  ]

  const maskPAN = (pan: string) => {
    if (pan.length < 6) return pan
    return pan.substring(0, 5) + '*'.repeat(pan.length - 6) + pan.substring(pan.length - 1)
  }

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Account Settings</h1>
          <p className="text-primary-text-secondary mt-1">Manage your profile, security, and preferences</p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <div className="flex items-center mb-6">
          <User className="w-5 h-5 text-primary-gold mr-2" />
          <h2 className="text-xl font-semibold text-primary-text">Profile Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.fullName}
              onChange={(e) => handleProfileUpdate('fullName', e.target.value)}
              className="w-full px-4 py-3 bg-primary-bg border border-gray-600 rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleProfileUpdate('email', e.target.value)}
              className="w-full px-4 py-3 bg-primary-bg border border-gray-600 rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleProfileUpdate('phone', e.target.value)}
              className="w-full px-4 py-3 bg-primary-bg border border-gray-600 rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              PAN Number
            </label>
            <input
              type="text"
              value={maskPAN(profileData.panNumber)}
              readOnly
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-primary-text-secondary cursor-not-allowed"
            />
            <p className="text-xs text-primary-text-secondary mt-1">
              Contact support to update PAN details
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-primary-gold text-primary-bg px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
            Update Profile
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <div className="flex items-center mb-6">
          <Shield className="w-5 h-5 text-primary-gold mr-2" />
          <h2 className="text-xl font-semibold text-primary-text">Security</h2>
        </div>
        
        {/* Change Password */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-primary-text mb-4">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 bg-primary-bg border border-gray-600 rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent pr-12"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-gold"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-primary-bg border border-gray-600 rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                placeholder="Enter new password"
              />
            </div>
          </div>
          <button className="mt-4 bg-primary-gold text-primary-bg px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
            Update Password
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-primary-text">Two-Factor Authentication</h3>
              <p className="text-sm text-primary-text-secondary">
                Add an extra layer of security to your account
              </p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFactorEnabled ? 'bg-primary-gold' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {twoFactorEnabled && (
            <div className="bg-primary-bg p-4 rounded-lg">
              <div className="flex items-center text-primary-success mb-2">
                <Lock className="w-4 h-4 mr-2" />
                <span className="font-medium">2FA Enabled</span>
              </div>
              <p className="text-sm text-primary-text-secondary mb-3">
                Authenticator app is configured for your account
              </p>
              <button className="text-sm text-primary-gold hover:underline">
                View Recovery Codes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-primary-text mb-6">Active Sessions</h2>
        <div className="space-y-4">
          {activeSessions.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-primary-bg rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${session.current ? 'bg-primary-success' : 'bg-gray-500'}`} />
                <div>
                  <p className="font-medium text-primary-text">
                    {session.device} {session.current && '(Current)'}
                  </p>
                  <p className="text-sm text-primary-text-secondary">
                    {session.location} • {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <button className="text-sm text-primary-danger hover:underline">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <div className="flex items-center mb-6">
          <Bell className="w-5 h-5 text-primary-gold mr-2" />
          <h2 className="text-xl font-semibold text-primary-text">Notification Preferences</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-primary-text-secondary mr-3" />
              <div>
                <p className="font-medium text-primary-text">Email Notifications</p>
                <p className="text-sm text-primary-text-secondary">
                  Portfolio updates, market alerts, and security notifications
                </p>
              </div>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? 'bg-primary-gold' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Smartphone className="w-5 h-5 text-primary-text-secondary mr-3" />
              <div>
                <p className="font-medium text-primary-text">SMS Notifications</p>
                <p className="text-sm text-primary-text-secondary">
                  Critical alerts and transaction confirmations
                </p>
              </div>
            </div>
            <button
              onClick={() => setSmsNotifications(!smsNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                smsNotifications ? 'bg-primary-gold' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  smsNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Advisor Access */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <div className="flex items-center mb-6">
          <UserCheck className="w-5 h-5 text-primary-gold mr-2" />
          <h2 className="text-xl font-semibold text-primary-text">Advisor Access</h2>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium text-primary-text">Grant Advisor Access</p>
            <p className="text-sm text-primary-text-secondary">
              Allow your financial advisor to view your portfolio and documents
            </p>
          </div>
          <button
            onClick={() => setAdvisorAccess(!advisorAccess)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              advisorAccess ? 'bg-primary-gold' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                advisorAccess ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {advisorAccess && (
          <div className="bg-primary-bg p-4 rounded-lg">
            <p className="text-sm text-primary-text-secondary mb-3">
              Advisor permissions: View portfolio, documents, and performance reports
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary-text">advisor@wealthmanagement.com</span>
              <button className="text-sm text-primary-danger hover:underline">
                Revoke Access
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Export */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <div className="flex items-center mb-4">
          <Download className="w-5 h-5 text-primary-gold mr-2" />
          <h2 className="text-xl font-semibold text-primary-text">Data Export</h2>
        </div>
        
        <p className="text-primary-text-secondary mb-6">
          Download a complete copy of your portfolio data, transactions, and documents
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-primary-bg border border-gray-600 p-4 rounded-lg hover:border-primary-gold transition-colors">
            <h3 className="font-medium text-primary-text mb-2">Portfolio Data</h3>
            <p className="text-sm text-primary-text-secondary">Holdings, performance, allocations</p>
          </button>
          
          <button className="bg-primary-bg border border-gray-600 p-4 rounded-lg hover:border-primary-gold transition-colors">
            <h3 className="font-medium text-primary-text mb-2">Transaction History</h3>
            <p className="text-sm text-primary-text-secondary">Complete transaction records</p>
          </button>
          
          <button className="bg-primary-bg border border-gray-600 p-4 rounded-lg hover:border-primary-gold transition-colors">
            <h3 className="font-medium text-primary-text mb-2">Tax Reports</h3>
            <p className="text-sm text-primary-text-secondary">Capital gains, dividend records</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings