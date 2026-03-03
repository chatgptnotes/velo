import { useState } from 'react'
import { Bell, AlertTriangle, Calendar, TrendingDown, DollarSign, RefreshCw } from 'lucide-react'
import { notifications } from '../data/mockData'

const typeIcons: Record<string, typeof Bell> = {
  alert: AlertTriangle,
  sip: Calendar,
  dividend: DollarSign,
  tax: TrendingDown,
  rebalance: RefreshCw,
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 text-gray-600 hover:text-[#0F4C75] rounded-lg hover:bg-gray-100">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{unreadCount}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-gray-100 font-semibold text-gray-900">Notifications</div>
          {notifications.map(n => {
            const Icon = typeIcons[n.type] || Bell
            return (
              <div key={n.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                <div className="flex items-start space-x-3">
                  <Icon className="h-4 w-4 text-[#0F4C75] mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{n.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                  {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
