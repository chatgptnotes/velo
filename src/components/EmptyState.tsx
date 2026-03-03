import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ElementType
  title?: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export default function EmptyState({ icon: Icon = Inbox, title = 'No data yet', description = 'Data will appear here once available.', action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-4">{description}</p>
      {action && (
        <button onClick={action.onClick} className="px-4 py-2 bg-[#0F4C75] text-white rounded-lg text-sm font-medium hover:bg-[#093049]">
          {action.label}
        </button>
      )}
    </div>
  )
}
