import { Shield, AlertTriangle, TrendingUp, BarChart3, Target } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts'

const RiskAnalysis = () => {
  const riskScore = 62 // 0-100 scale
  const diversificationScore = 78
  
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else {
      return `₹${amount.toLocaleString()}`
    }
  }

  const getRiskLevel = (score: number) => {
    if (score <= 30) return { level: 'Conservative', color: 'text-green-400', bg: 'bg-green-400' }
    if (score <= 60) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400' }
    return { level: 'Aggressive', color: 'text-red-400', bg: 'bg-red-400' }
  }

  const riskLevel = getRiskLevel(riskScore)

  const concentrationRisk = [
    { name: 'Reliance Industries', allocation: 2.85, amount: 712500 },
    { name: 'Real Estate Holdings', allocation: 25.0, amount: 6250000 },
    { name: 'PPFAS Flexi Cap Fund', allocation: 10.6, amount: 2652000 },
    { name: 'TCS', allocation: 2.21, amount: 552000 },
    { name: 'HDFC Bank', allocation: 2.06, amount: 516000 }
  ]

  const stressTestScenarios = [
    { scenario: 'Market Crash (-20%)', currentValue: 25000000, projectedValue: 22500000, impact: -2500000 },
    { scenario: 'Interest Rate Rise (+2%)', currentValue: 25000000, projectedValue: 23750000, impact: -1250000 },
    { scenario: 'Currency Depreciation (-10%)', currentValue: 25000000, projectedValue: 24250000, impact: -750000 },
    { scenario: 'Sector Rotation', currentValue: 25000000, projectedValue: 24000000, impact: -1000000 }
  ]

  const volatilityData = [
    { period: 'Jan', portfolio: 12.5, benchmark: 15.2 },
    { period: 'Feb', portfolio: 8.7, benchmark: 11.8 },
    { period: 'Mar', portfolio: 15.2, benchmark: 18.9 },
    { period: 'Apr', portfolio: 9.8, benchmark: 13.2 },
    { period: 'May', portfolio: 11.3, benchmark: 14.7 },
    { period: 'Jun', portfolio: 7.9, benchmark: 10.5 }
  ]

  const riskScoreData = [
    { name: 'Risk Score', value: riskScore, fill: '#D4AF37' }
  ]

  const diversificationData = [
    { name: 'Diversified', value: diversificationScore, fill: '#00C853' },
    { name: 'Concentrated', value: 100 - diversificationScore, fill: '#374151' }
  ]

  const recommendations = [
    {
      priority: 'High',
      title: 'Reduce Real Estate Concentration',
      description: 'Real estate represents 25% of your portfolio. Consider reducing to 15-20% for better diversification.',
      action: 'Consider partial sale or REITs allocation',
      impact: 'Risk Reduction: 8-12 points'
    },
    {
      priority: 'Medium',
      title: 'International Exposure',
      description: 'Add 10-15% international equity exposure to reduce India-specific risks.',
      action: 'Invest in global funds or US index ETFs',
      impact: 'Diversification: +15%'
    },
    {
      priority: 'Low',
      title: 'Gold Allocation Review',
      description: 'Current 10% gold allocation is appropriate but consider SGBs over physical gold.',
      action: 'Switch physical gold to SGBs',
      impact: 'Better liquidity & returns'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Risk Analysis</h1>
          <p className="text-primary-text-secondary mt-1">Comprehensive portfolio risk assessment and optimization</p>
        </div>
        <button className="bg-primary-gold text-primary-bg px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center">
          <Target className="w-4 h-4 mr-2" />
          Optimize Portfolio
        </button>
      </div>

      {/* Risk Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portfolio Risk Score */}
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-text">Portfolio Risk Score</h3>
            <Shield className="w-5 h-5 text-primary-gold" />
          </div>
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={riskScoreData}>
                    <RadialBar dataKey="value" cornerRadius={10} fill="#D4AF37" />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-text">{riskScore}</span>
              </div>
            </div>
            <p className={`mt-2 font-medium ${riskLevel.color}`}>{riskLevel.level}</p>
            <p className="text-sm text-primary-text-secondary">Risk Profile</p>
          </div>
        </div>

        {/* Diversification Score */}
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-text">Diversification Score</h3>
            <BarChart3 className="w-5 h-5 text-primary-success" />
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diversificationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {diversificationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-2xl font-bold text-primary-success mb-1">{diversificationScore}%</p>
            <p className="text-sm text-primary-text-secondary">Well Diversified</p>
          </div>
        </div>

        {/* Risk-Return Profile */}
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-text">Risk-Return Profile</h3>
            <TrendingUp className="w-5 h-5 text-primary-gold" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-primary-text-secondary">Expected Return</span>
              <span className="text-primary-text font-medium">12.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-text-secondary">Volatility</span>
              <span className="text-primary-text font-medium">14.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-text-secondary">Sharpe Ratio</span>
              <span className="text-primary-success font-medium">0.85</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-text-secondary">Max Drawdown</span>
              <span className="text-primary-danger font-medium">-18.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Concentration Risk */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-primary-text mb-4">Concentration Risk - Top 5 Holdings</h3>
        <div className="space-y-3">
          {concentrationRisk.map((holding, index) => (
            <div key={index} className="bg-primary-bg p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-primary-text">{holding.name}</span>
                <span className="text-primary-gold font-bold">{holding.allocation.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-text-secondary">{formatCurrency(holding.amount)}</span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${holding.allocation > 15 ? 'bg-primary-danger' : holding.allocation > 10 ? 'bg-yellow-400' : 'bg-primary-success'}`}
                    style={{ width: `${Math.min(holding.allocation * 3, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm text-yellow-400">
              <strong>Warning:</strong> Real estate allocation (25%) exceeds recommended 20% limit
            </span>
          </div>
        </div>
      </div>

      {/* Volatility Comparison */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-primary-text mb-4">Portfolio Volatility vs Benchmark</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volatilityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="period" stroke="#9E9E9E" />
              <YAxis stroke="#9E9E9E" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1F2E',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F5F5F5'
                }}
                formatter={(value) => [`${value}%`, '']}
              />
              <Bar dataKey="portfolio" fill="#D4AF37" name="Your Portfolio" />
              <Bar dataKey="benchmark" fill="#C0C0C0" name="Nifty 50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-sm text-primary-text-secondary text-center">
          Your portfolio shows lower volatility than the benchmark, indicating better risk management
        </p>
      </div>

      {/* Stress Test */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-primary-text mb-4">Stress Test Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stressTestScenarios.map((test, index) => (
            <div key={index} className="bg-primary-bg p-4 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-primary-text">{test.scenario}</h4>
                <span className="text-primary-danger font-bold">
                  {((test.impact / test.currentValue) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-text-secondary">Current Value</span>
                  <span className="text-primary-text">{formatCurrency(test.currentValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-text-secondary">Projected Value</span>
                  <span className="text-primary-text">{formatCurrency(test.projectedValue)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-primary-danger">Impact</span>
                  <span className="text-primary-danger">{formatCurrency(Math.abs(test.impact))}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-primary-text mb-4">Risk Optimization Recommendations</h3>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-primary-bg p-4 rounded-lg border border-gray-600">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                    rec.priority === 'High' ? 'bg-primary-danger' : 
                    rec.priority === 'Medium' ? 'bg-yellow-400' : 'bg-primary-success'
                  }`} />
                  <h4 className="font-medium text-primary-text">{rec.title}</h4>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  rec.priority === 'High' ? 'bg-primary-danger bg-opacity-20 text-primary-danger' : 
                  rec.priority === 'Medium' ? 'bg-yellow-400 bg-opacity-20 text-yellow-400' : 'bg-primary-success bg-opacity-20 text-primary-success'
                }`}>
                  {rec.priority} Priority
                </span>
              </div>
              <p className="text-sm text-primary-text-secondary mb-3">{rec.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-gold font-medium">{rec.action}</span>
                <span className="text-primary-success">{rec.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RiskAnalysis