import PageWrapper from '../components/PageWrapper'
import { familyMembers, familySummary, formatCurrency } from '../data/mockData'
import { Users } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

const COLORS = ['#0F4C75', '#3282B8', '#00B4D8', '#B8860B']

export default function FamilyPortfolio() {
  const pieData = familyMembers.map(m => ({ name: m.name, value: m.netWorth }))

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Family Portfolio</h1>
        <p className="text-gray-600 mt-2">Combined family wealth overview</p>
      </div>

      <div className="bg-gradient-to-r from-[#0F4C75] to-[#3282B8] rounded-xl p-8 mb-8 text-white">
        <p className="text-sm opacity-80">Combined Family Net Worth</p>
        <p className="text-4xl font-bold mt-2">{formatCurrency(familySummary.combinedNetWorth)}</p>
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div><p className="text-xs opacity-70">Equity</p><p className="font-semibold">{formatCurrency(familySummary.totalEquity)}</p></div>
          <div><p className="text-xs opacity-70">Fixed Income</p><p className="font-semibold">{formatCurrency(familySummary.totalDebt)}</p></div>
          <div><p className="text-xs opacity-70">Gold</p><p className="font-semibold">{formatCurrency(familySummary.totalGold)}</p></div>
          <div><p className="text-xs opacity-70">Real Estate</p><p className="font-semibold">{formatCurrency(familySummary.totalRealEstate)}</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wealth Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          {familyMembers.map(member => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#0F4C75] text-white flex items-center justify-center font-bold">{member.avatar}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.relation}</p>
                    </div>
                    <p className="text-lg font-bold text-[#0F4C75]">{formatCurrency(member.netWorth)}</p>
                  </div>
                  <div className="flex space-x-4 mt-2 text-xs text-gray-500">
                    <span>Equity: {formatCurrency(member.equity)}</span>
                    <span>Debt: {formatCurrency(member.debt)}</span>
                    <span>Gold: {formatCurrency(member.gold)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
