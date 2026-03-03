import { Link, useLocation } from 'react-router-dom'
import { 
  Home, Briefcase, Receipt, Target, Shield, FileText, Settings,
  Users, ShieldCheck, Landmark, GitCompare, Wallet, Gem
} from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Tax Center', href: '/tax-center', icon: Receipt },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Risk Analysis', href: '/risk-analysis', icon: Shield },
  { name: 'Family Portfolio', href: '/family', icon: Users },
  { name: 'Insurance Gap', href: '/insurance', icon: ShieldCheck },
  { name: 'Loan Tracker', href: '/loans', icon: Landmark },
  { name: 'Expense Tracker', href: '/expenses', icon: Wallet },
  { name: 'Compare', href: '/compare', icon: GitCompare },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  onNavigate?: () => void
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation()

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex-shrink-0 h-full">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F4C75] flex items-center justify-center">
              <Gem className="w-4 h-4 text-[#B8860B]" />
            </div>
            <h1 className="text-xl font-bold text-[#0F4C75]">Velo</h1>
          </div>
        </div>
        <div className="flex-1 flex flex-col pt-2 pb-4 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onNavigate}
                  className={`${
                    isActive
                      ? 'bg-[#0F4C75]/10 border-r-2 border-[#0F4C75] text-[#0F4C75] font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-3 py-2.5 text-sm font-medium rounded-l-lg transition-all duration-150`}
                >
                  <Icon
                    className={`${
                      isActive ? 'text-[#0F4C75]' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5 transition-colors`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
