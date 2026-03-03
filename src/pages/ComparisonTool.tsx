import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { comparisonInvestments } from '../data/mockData'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'

const COLORS = ['#0F4C75', '#B8860B', '#16A34A', '#DC2626']

export default function ComparisonTool() {
  const [selected, setSelected] = useState<number[]>([0, 1])

  const toggleSelect = (idx: number) => {
    if (selected.includes(idx)) {
      if (selected.length > 1) setSelected(selected.filter(i => i !== idx))
    } else if (selected.length < 4) {
      setSelected([...selected, idx])
    }
  }

  const selectedItems = selected.map(i => comparisonInvestments[i])
  
  const radarData = [
    { metric: '1Y Returns', ...Object.fromEntries(selectedItems.map((s, i) => [`v${i}`, s.returns1Y])) },
    { metric: '3Y Returns', ...Object.fromEntries(selectedItems.map((s, i) => [`v${i}`, s.returns3Y])) },
    { metric: '5Y Returns', ...Object.fromEntries(selectedItems.map((s, i) => [`v${i}`, s.returns5Y])) },
    { metric: 'Low Cost', ...Object.fromEntries(selectedItems.map((s, i) => [`v${i}`, Math.max(0, 20 - s.expenseRatio * 10)])) },
  ]

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Investment Comparison</h1>
        <p className="text-gray-600 mt-2">Compare investments side by side (select 2-4)</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {comparisonInvestments.map((inv, idx) => (
          <button key={idx} onClick={() => toggleSelect(idx)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selected.includes(idx) ? 'bg-[#0F4C75] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {inv.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Radar Comparison</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis />
                {selectedItems.map((s, i) => (
                  <Radar key={i} name={s.name} dataKey={`v${i}`} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.15} />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
                {selectedItems.map((s, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: COLORS[i] }}>{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { label: '1Y Returns', key: 'returns1Y', suffix: '%' },
                { label: '3Y Returns', key: 'returns3Y', suffix: '%' },
                { label: '5Y Returns', key: 'returns5Y', suffix: '%' },
                { label: 'Expense Ratio', key: 'expenseRatio', suffix: '%' },
                { label: 'Risk Level', key: 'risk', suffix: '' },
                { label: 'Category', key: 'category', suffix: '' },
              ].map(row => (
                <tr key={row.label} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.label}</td>
                  {selectedItems.map((s, i) => (
                    <td key={i} className="px-4 py-3 text-sm text-gray-700">{(s as any)[row.key]}{row.suffix}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  )
}
