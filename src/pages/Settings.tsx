import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { User, Bell, Lock, Users, Save, Eye, EyeOff } from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [notifications, setNotifications] = useState({ email: true, sms: false, portfolio: true, market: true, tax: true })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'advisor', name: 'Advisor Access', icon: Users },
  ]

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-[#0F4C75]' : 'bg-gray-300'}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and security</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-[#0F4C75] text-[#0F4C75]' : 'border-transparent text-gray-500'}`}>
                <tab.icon className="h-5 w-5" /><span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-[#0F4C75]/10 rounded-full flex items-center justify-center"><User className="h-10 w-10 text-[#0F4C75]" /></div>
                <button className="px-4 py-2 bg-[#0F4C75]/10 text-[#0F4C75] rounded-lg">Change Photo</button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[['Full Name', 'Rajesh Kumar', 'text'], ['Email', 'rajesh.kumar@example.com', 'email'], ['Phone', '+91 98765 43210', 'tel'], ['PAN', 'ABCDE****F', 'text']].map(([label, val, type]) => (
                  <div key={label as string}><label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input type={type as string} defaultValue={val as string} disabled={label === 'PAN'} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                ))}
              </div>
              <button className="bg-[#0F4C75] text-white px-6 py-2 rounded-lg flex items-center space-x-2"><Save className="h-4 w-4" /><span>Save</span></button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h4 className="font-medium text-gray-900">Change Password</h4>
                <div><label className="block text-sm text-gray-700 mb-1">Current Password</label>
                <div className="relative"><input type={showPassword ? 'text' : 'password'} className="w-full px-3 py-2 pr-10 border rounded-lg" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}</button></div></div>
                <div><label className="block text-sm text-gray-700 mb-1">New Password</label><input type="password" className="w-full px-3 py-2 border rounded-lg" /></div>
                <button className="bg-[#0F4C75] text-white px-4 py-2 rounded-lg">Update Password</button>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
                <div><h4 className="font-medium text-gray-900">Two-Factor Authentication</h4><p className="text-sm text-gray-600">Extra security layer</p></div>
                <Toggle value={twoFactorEnabled} onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="max-w-2xl space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'sms', label: 'SMS Notifications', desc: 'Receive alerts via SMS' },
                { key: 'portfolio', label: 'Portfolio Updates', desc: 'Weekly performance reports' },
                { key: 'market', label: 'Market Alerts', desc: 'Important market movements' },
                { key: 'tax', label: 'Tax Reminders', desc: 'Tax dates and deadlines' },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div><p className="text-sm font-medium text-gray-900">{n.label}</p><p className="text-xs text-gray-600">{n.desc}</p></div>
                  <Toggle value={(notifications as any)[n.key]} onChange={() => setNotifications(prev => ({ ...prev, [n.key]: !(prev as any)[n.key] }))} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'advisor' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#3282B8]/10 rounded-full flex items-center justify-center"><Users className="h-6 w-6 text-[#3282B8]" /></div>
                  <div className="flex-1"><p className="font-medium text-gray-900">Priya Sharma, CFP</p><p className="text-xs text-gray-600">Senior Wealth Advisor</p></div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <h4 className="font-medium text-gray-900">Access Permissions</h4>
                {[['View Portfolio', 'Granted', 'success'], ['Make Transactions', 'Denied', 'danger'], ['Tax Documents', 'Granted', 'success'], ['Rebalance', 'Approval Required', 'warning']].map(([perm, status, color]) => (
                  <div key={perm as string} className="flex justify-between"><span className="text-sm">{perm}</span><span className={`text-xs bg-${color}/10 text-${color} px-2 py-1 rounded`}>{status}</span></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
