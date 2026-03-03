import { mockPortfolio } from '../lib/mockData'
import { Plus, Target, Calendar, TrendingUp, DollarSign } from 'lucide-react'

const Goals = () => {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else {
      return `₹${amount.toLocaleString()}`
    }
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const calculateMonthsToGoal = (targetDate: string) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    return Math.max(diffMonths, 0)
  }

  const getGoalIcon = (category: string) => {
    switch (category) {
      case 'retirement':
        return '🏖️'
      case 'education':
        return '🎓'
      case 'property':
        return '🏠'
      case 'emergency':
        return '🛡️'
      case 'travel':
        return '✈️'
      default:
        return '🎯'
    }
  }



  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Financial Goals</h1>
          <p className="text-primary-text-secondary mt-1">Track and achieve your long-term financial objectives</p>
        </div>
        <button className="bg-primary-gold text-primary-bg px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </button>
      </div>

      {/* Goals Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary-card p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-primary-text-secondary mb-1">Total Goals</p>
          <p className="text-2xl font-bold text-primary-text">{mockPortfolio.goals.length}</p>
        </div>
        <div className="bg-primary-card p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-primary-text-secondary mb-1">Target Amount</p>
          <p className="text-2xl font-bold text-primary-gold">
            {formatCurrency(mockPortfolio.goals.reduce((sum, goal) => sum + goal.targetAmount, 0))}
          </p>
        </div>
        <div className="bg-primary-card p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-primary-text-secondary mb-1">Current Progress</p>
          <p className="text-2xl font-bold text-primary-text">
            {formatCurrency(mockPortfolio.goals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
          </p>
        </div>
        <div className="bg-primary-card p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-primary-text-secondary mb-1">Monthly SIPs</p>
          <p className="text-2xl font-bold text-primary-success">
            {formatCurrency(mockPortfolio.goals.reduce((sum, goal) => sum + goal.monthlySip, 0))}
          </p>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockPortfolio.goals.map((goal, index) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
          const monthsRemaining = calculateMonthsToGoal(goal.targetDate)
          const yearsRemaining = Math.floor(monthsRemaining / 12)
          const remainingMonths = monthsRemaining % 12

          return (
            <div key={index} className="bg-primary-card p-6 rounded-lg border border-gray-700 hover:border-primary-gold transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{getGoalIcon(goal.category)}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text">{goal.name}</h3>
                    <p className="text-sm text-primary-text-secondary capitalize">{goal.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-gold">{progress.toFixed(0)}%</p>
                  <p className="text-xs text-primary-text-secondary">Complete</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-primary-text-secondary mb-2">
                  <span>Progress</span>
                  <span>{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-primary-gold h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Goal Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-primary-bg p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Calendar className="w-4 h-4 text-primary-gold mr-1" />
                    <span className="text-primary-text-secondary">Target Date</span>
                  </div>
                  <p className="text-primary-text font-medium">
                    {new Date(goal.targetDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-primary-text-secondary">
                    {yearsRemaining > 0 && `${yearsRemaining}y `}
                    {remainingMonths > 0 && `${remainingMonths}m`} remaining
                  </p>
                </div>

                <div className="bg-primary-bg p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <DollarSign className="w-4 h-4 text-primary-success mr-1" />
                    <span className="text-primary-text-secondary">Monthly SIP</span>
                  </div>
                  <p className="text-primary-text font-medium">{formatCurrency(goal.monthlySip)}</p>
                  <p className="text-xs text-primary-text-secondary">Auto-investment</p>
                </div>
              </div>

              {/* Projected Completion */}
              <div className="mt-4 p-3 bg-primary-success bg-opacity-10 border border-primary-success rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-primary-success mr-2" />
                    <span className="text-sm text-primary-success font-medium">On Track</span>
                  </div>
                  <span className="text-xs text-primary-text-secondary">
                    At current pace: {new Date(goal.targetDate).getFullYear()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-primary-bg border border-gray-600 text-primary-text py-2 px-3 rounded-lg text-sm hover:border-primary-gold transition-colors">
                  Adjust SIP
                </button>
                <button className="flex-1 bg-primary-gold text-primary-bg py-2 px-3 rounded-lg text-sm hover:bg-opacity-90 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Goal Insights */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center">
          <Target className="w-5 h-5 text-primary-gold mr-2" />
          Goal Insights & Recommendations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-primary-bg p-4 rounded-lg border border-primary-success">
              <h4 className="font-medium text-primary-success mb-2">Well on Track</h4>
              <p className="text-sm text-primary-text-secondary mb-2">
                Your retirement and emergency fund goals are progressing excellently. Current SIP amounts are sufficient.
              </p>
              <p className="text-xs text-primary-success">↗️ Above target pace</p>
            </div>

            <div className="bg-primary-bg p-4 rounded-lg border border-yellow-500">
              <h4 className="font-medium text-yellow-400 mb-2">Needs Attention</h4>
              <p className="text-sm text-primary-text-secondary mb-2">
                Children Education goal may need a SIP increase of ₹15,000/month to meet the 2032 deadline comfortably.
              </p>
              <p className="text-xs text-yellow-400">⚠️ Consider adjustment</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-primary-bg p-4 rounded-lg">
              <h4 className="font-medium text-primary-text mb-3">Optimization Suggestions</h4>
              <ul className="space-y-2 text-sm text-primary-text-secondary">
                <li className="flex items-start">
                  <span className="text-primary-gold mr-2">•</span>
                  Consider increasing equity allocation for long-term goals (10+ years)
                </li>
                <li className="flex items-start">
                  <span className="text-primary-gold mr-2">•</span>
                  Europe Travel goal is achievable 6 months earlier than planned
                </li>
                <li className="flex items-start">
                  <span className="text-primary-gold mr-2">•</span>
                  Emergency fund is nearly complete, consider redirecting excess to other goals
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Goals