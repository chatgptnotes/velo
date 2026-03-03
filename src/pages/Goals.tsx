import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { mockGoals, formatCurrency, formatCurrencyFull, retirementData } from '../data/mockData'
import { Target, Plus, Calendar, Calculator, Clock } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts'

export default function Goals() {
  const [activeTab, setActiveTab] = useState('Goals')
  
  // SIP Calculator (Feature 4)
  const [sipAmount, setSipAmount] = useState(25000)
  const [sipYears, setSipYears] = useState(10)
  const [sipReturn, setSipReturn] = useState(12)

  const sipProjection = Array.from({ length: sipYears * 12 + 1 }, (_, i) => {
    const r = sipReturn / 12 / 100
    const invested = sipAmount * i
    const futureValue = i === 0 ? 0 : sipAmount * ((Math.pow(1 + r, i) - 1) / r) * (1 + r)
    return { month: i, invested, value: Math.round(futureValue) }
  }).filter((_, i) => i % (sipYears > 5 ? 12 : 6) === 0 || i === sipYears * 12)

  const sipFinalValue = sipProjection[sipProjection.length - 1]?.value || 0
  const sipTotalInvested = sipAmount * sipYears * 12
  const sipWealth = sipFinalValue - sipTotalInvested

  // Retirement (Feature 12)
  const yearsToRetire = retirementData.retirementAge - retirementData.currentAge
  const retirementProjection = Array.from({ length: yearsToRetire + 1 }, (_, i) => {
    const r = retirementData.expectedReturn / 100
    const corpus = retirementData.currentCorpus * Math.pow(1 + r, i) + retirementData.currentMonthlySavings * 12 * ((Math.pow(1 + r, i) - 1) / r)
    return { year: retirementData.currentAge + i, corpus: Math.round(corpus), required: retirementData.requiredCorpus }
  })

  return (
    <PageWrapper>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600 mt-2">Track progress and plan ahead</p>
        </div>
        <button className="bg-[#0F4C75] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#093049] flex items-center space-x-2">
          <Plus className="h-5 w-5" /><span>Add Goal</span>
        </button>
      </div>

      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {['Goals', 'SIP Calculator', 'Retirement'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === tab ? 'bg-white text-[#0F4C75] shadow-sm' : 'text-gray-600'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Goals' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {mockGoals.map(goal => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100
              const remaining = goal.targetAmount - goal.currentAmount
              return (
                <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${goal.priority === 'high' ? 'bg-danger/10' : goal.priority === 'medium' ? 'bg-warning/10' : 'bg-success/10'}`}>
                        <Target className={`h-6 w-6 ${goal.priority === 'high' ? 'text-danger' : goal.priority === 'medium' ? 'text-warning' : 'text-success'}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                        <p className={`text-xs font-medium uppercase ${goal.priority === 'high' ? 'text-danger' : goal.priority === 'medium' ? 'text-warning' : 'text-success'}`}>{goal.priority} Priority</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1"><span className="text-sm text-gray-700">Progress</span><span className="text-sm font-medium">{progress.toFixed(1)}%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-[#0F4C75] h-3 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div></div>
                  </div>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between"><span className="text-gray-600">Target</span><span className="font-medium">{formatCurrency(goal.targetAmount)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Current</span><span className="font-medium text-[#0F4C75]">{formatCurrency(goal.currentAmount)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Monthly SIP</span><span className="font-medium text-[#3282B8]">{formatCurrency(goal.monthlyContribution)}</span></div>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Target: {new Date(goal.projectedDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals Summary</h3>
            <div className="grid grid-cols-4 gap-6 text-center">
              <div><p className="text-2xl font-bold text-[#0F4C75]">{formatCurrency(mockGoals.reduce((s, g) => s + g.targetAmount, 0))}</p><p className="text-sm text-gray-600">Total Target</p></div>
              <div><p className="text-2xl font-bold text-success">{formatCurrency(mockGoals.reduce((s, g) => s + g.currentAmount, 0))}</p><p className="text-sm text-gray-600">Current Savings</p></div>
              <div><p className="text-2xl font-bold text-[#3282B8]">{formatCurrency(mockGoals.reduce((s, g) => s + g.monthlyContribution, 0))}</p><p className="text-sm text-gray-600">Monthly SIPs</p></div>
              <div><p className="text-2xl font-bold text-gray-900">{((mockGoals.reduce((s, g) => s + g.currentAmount, 0) / mockGoals.reduce((s, g) => s + g.targetAmount, 0)) * 100).toFixed(1)}%</p><p className="text-sm text-gray-600">Overall Progress</p></div>
            </div>
          </div>
        </>
      )}

      {/* SIP Calculator (Feature 4) */}
      {activeTab === 'SIP Calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center"><Calculator className="h-5 w-5 mr-2" /> SIP Projection</h3>
            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-600 flex justify-between"><span>Monthly SIP</span><span className="font-medium text-[#0F4C75]">{formatCurrencyFull(sipAmount)}</span></label>
                <input type="range" min={1000} max={500000} step={1000} value={sipAmount} onChange={e => setSipAmount(Number(e.target.value))} className="w-full mt-2" />
              </div>
              <div>
                <label className="text-sm text-gray-600 flex justify-between"><span>Duration</span><span className="font-medium text-[#0F4C75]">{sipYears} years</span></label>
                <input type="range" min={1} max={30} value={sipYears} onChange={e => setSipYears(Number(e.target.value))} className="w-full mt-2" />
              </div>
              <div>
                <label className="text-sm text-gray-600 flex justify-between"><span>Expected Return</span><span className="font-medium text-[#0F4C75]">{sipReturn}% p.a.</span></label>
                <input type="range" min={4} max={25} step={0.5} value={sipReturn} onChange={e => setSipReturn(Number(e.target.value))} className="w-full mt-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center"><p className="text-xs text-gray-500">Invested</p><p className="text-lg font-bold text-gray-900">{formatCurrency(sipTotalInvested)}</p></div>
                <div className="text-center"><p className="text-xs text-gray-500">Wealth Gained</p><p className="text-lg font-bold text-success">{formatCurrency(sipWealth)}</p></div>
                <div className="text-center"><p className="text-xs text-gray-500">Total Value</p><p className="text-lg font-bold text-[#0F4C75]">{formatCurrency(sipFinalValue)}</p></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Projection</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sipProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={v => `${Math.round(v/12)}Y`} />
                  <YAxis tickFormatter={v => `${(v/100000).toFixed(0)}L`} />
                  <Tooltip formatter={(v: number) => formatCurrencyFull(v)} labelFormatter={l => `Month ${l}`} />
                  <Area type="monotone" dataKey="invested" stroke="#9CA3AF" fill="#9CA3AF" fillOpacity={0.3} name="Invested" />
                  <Area type="monotone" dataKey="value" stroke="#0F4C75" fill="#0F4C75" fillOpacity={0.1} name="Value" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Retirement (Feature 12) */}
      {activeTab === 'Retirement' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#0F4C75] to-[#3282B8] rounded-xl p-8 text-white">
            <div className="flex items-center space-x-3 mb-4"><Clock className="h-6 w-6" /><h3 className="text-xl font-bold">Retirement Countdown</h3></div>
            <div className="grid grid-cols-4 gap-6">
              <div><p className="text-sm opacity-70">Years to Retire</p><p className="text-3xl font-bold">{yearsToRetire}</p></div>
              <div><p className="text-sm opacity-70">Required Corpus</p><p className="text-3xl font-bold">{formatCurrency(retirementData.requiredCorpus)}</p></div>
              <div><p className="text-sm opacity-70">Projected</p><p className="text-3xl font-bold">{formatCurrency(retirementData.projectedCorpus)}</p></div>
              <div><p className="text-sm opacity-70">Status</p><p className={`text-3xl font-bold ${retirementData.onTrack ? 'text-green-300' : 'text-red-300'}`}>{retirementData.onTrack ? 'On Track' : 'Behind'}</p></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Current Age</p><p className="text-xl font-bold">{retirementData.currentAge}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Retirement Age</p><p className="text-xl font-bold">{retirementData.retirementAge}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Monthly Expenses</p><p className="text-xl font-bold">{formatCurrency(retirementData.monthlyExpenses)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Monthly Savings</p><p className="text-xl font-bold text-[#0F4C75]">{formatCurrency(retirementData.currentMonthlySavings)}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Corpus Projection</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retirementProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={v => `${(v/10000000).toFixed(1)}Cr`} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Line type="monotone" dataKey="corpus" stroke="#0F4C75" strokeWidth={2} name="Projected Corpus" />
                  <Line type="monotone" dataKey="required" stroke="#DC2626" strokeDasharray="5 5" strokeWidth={2} name="Required" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
