import PageWrapper from '../components/PageWrapper'
import { formatCurrency, correlationMatrix } from '../data/mockData'
import { Shield, AlertTriangle, Activity, TrendingDown } from 'lucide-react'

export default function RiskAnalysis() {
  // Correlation color
  const getColor = (v: number) => {
    if (v >= 0.8) return 'bg-red-500 text-white'
    if (v >= 0.4) return 'bg-red-200 text-red-900'
    if (v >= 0.1) return 'bg-yellow-100 text-yellow-900'
    if (v >= -0.1) return 'bg-gray-100 text-gray-700'
    if (v >= -0.4) return 'bg-blue-100 text-blue-900'
    return 'bg-blue-400 text-white'
  }

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Risk Analysis</h1>
        <p className="text-gray-600 mt-2">Comprehensive risk assessment and recommendations</p>
      </div>

      {/* Risk Score */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8 text-center">
        <div className="relative w-40 h-40 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#F59E0B" strokeWidth="8" strokeDasharray={`${62 * 2.83} ${100 * 2.83}`} strokeLinecap="round" transform="rotate(-90 50 50)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div><div className="text-3xl font-bold text-warning">62</div><div className="text-xs text-gray-600">Risk Score</div></div>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Moderate Risk Profile</h2>
        <p className="text-gray-600 mt-1 text-sm">Balanced risk exposure with optimization opportunities</p>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center"><div className="p-2 bg-success/10 rounded-lg"><Shield className="h-6 w-6 text-success" /></div>
          <div className="ml-4"><p className="text-sm text-gray-600">Diversification</p><p className="text-lg font-semibold text-success">78/100</p></div></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center"><div className="p-2 bg-warning/10 rounded-lg"><AlertTriangle className="h-6 w-6 text-warning" /></div>
          <div className="ml-4"><p className="text-sm text-gray-600">Concentration Risk</p><p className="text-lg font-semibold text-warning">Medium</p></div></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center"><div className="p-2 bg-[#0F4C75]/10 rounded-lg"><Activity className="h-6 w-6 text-[#0F4C75]" /></div>
          <div className="ml-4"><p className="text-sm text-gray-600">Volatility (1Y)</p><p className="text-lg font-semibold text-[#0F4C75]">12.4%</p></div></div>
        </div>
      </div>

      {/* Asset Correlation Matrix (Feature 2) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Correlation Matrix</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-3 py-2 text-xs text-gray-500"></th>
                {correlationMatrix.assets.map(a => <th key={a} className="px-3 py-2 text-xs font-medium text-gray-700">{a}</th>)}
              </tr>
            </thead>
            <tbody>
              {correlationMatrix.assets.map((a, i) => (
                <tr key={a}>
                  <td className="px-3 py-2 text-xs font-medium text-gray-700">{a}</td>
                  {correlationMatrix.data[i].map((v, j) => (
                    <td key={j} className="px-3 py-2">
                      <div className={`text-center text-xs font-medium rounded-lg p-2 ${getColor(v)}`}>{v.toFixed(2)}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center"><div className="w-3 h-3 bg-blue-400 rounded mr-1"></div> Negative</span>
          <span className="flex items-center"><div className="w-3 h-3 bg-gray-100 rounded mr-1 border"></div> Neutral</span>
          <span className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded mr-1"></div> Positive</span>
        </div>
      </div>

      {/* Stress Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Market Crash (-20%)', current: 24783500, stress: 19826800, loss: 4956700 },
          { title: 'Interest Rate Rise (+2%)', current: 2505950, stress: 2255355, loss: 250595 },
          { title: 'Currency Devaluation (-10%)', current: 1239175, stress: 1115258, loss: 123917 },
        ].map((t, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.title}</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-600">Current</span><span className="font-medium">{formatCurrency(t.current)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-600">Stress Value</span><span className="font-medium text-danger">{formatCurrency(t.stress)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-600">Loss</span><span className="font-medium text-danger">-{formatCurrency(t.loss)}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Risk Recommendations</h3>
        <div className="space-y-4">
          {[
            { icon: AlertTriangle, color: 'warning', title: 'Reduce Concentration Risk', text: 'Top 3 holdings represent 68% of equity. Diversify into mid-cap or international funds.' },
            { icon: Shield, color: '[#0F4C75]', title: 'Enhance Fixed Income', text: 'Increase fixed income from 20% to 25-30% for better downside protection.' },
            { icon: TrendingDown, color: 'success', title: 'Add Defensive Sectors', text: 'Add FMCG and pharma exposure to reduce volatility during downturns.' },
          ].map((r, i) => (
            <div key={i} className={`flex items-start space-x-3 p-4 bg-${r.color}/5 border border-${r.color}/20 rounded-lg`}>
              <r.icon className={`h-5 w-5 text-${r.color} mt-0.5 flex-shrink-0`} />
              <div><h4 className="text-sm font-medium text-gray-900">{r.title}</h4><p className="text-sm text-gray-600 mt-1">{r.text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
