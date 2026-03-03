import PageWrapper from '../components/PageWrapper'
import { insuranceData, formatCurrency } from '../data/mockData'
import { ShieldCheck, AlertTriangle, Check } from 'lucide-react'

export default function InsuranceGap() {
  const gaps = [
    { label: 'Life Insurance', ...insuranceData.life, color: '#0F4C75' },
    { label: 'Health Insurance', ...insuranceData.health, color: '#16A34A' },
    { label: 'Property Insurance', ...insuranceData.property, color: '#B8860B' },
  ]

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Insurance Gap Analysis</h1>
        <p className="text-gray-600 mt-2">Coverage assessment vs recommended levels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {gaps.map(g => {
          const coveragePercent = (g.current / g.recommended) * 100
          const hasGap = g.gap > 0
          return (
            <div key={g.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{g.label}</h3>
                {hasGap ? <AlertTriangle className="h-5 w-5 text-warning" /> : <Check className="h-5 w-5 text-success" />}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Current</span><span className="font-medium">{formatCurrency(g.current)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Recommended</span><span className="font-medium">{formatCurrency(g.recommended)}</span></div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="h-3 rounded-full" style={{ width: `${Math.min(coveragePercent, 100)}%`, backgroundColor: g.color }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coverage</span>
                  <span className={`font-medium ${hasGap ? 'text-warning' : 'text-success'}`}>{coveragePercent.toFixed(0)}%</span>
                </div>
                {hasGap && (
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700 font-medium">Gap: {formatCurrency(g.gap)}</p>
                  </div>
                )}
                <div className="text-xs text-gray-500">Annual Premium: {formatCurrency(g.premium)}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-semibold text-gray-900">Active Policies</h3></div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cover</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {insuranceData.policies.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{p.type}</td>
                <td className="px-6 py-4 text-sm font-medium">{formatCurrency(p.cover)}</td>
                <td className="px-6 py-4 text-sm">{formatCurrency(p.premium)}/yr</td>
                <td className="px-6 py-4 text-sm">{new Date(p.expiry).toLocaleDateString('en-IN')}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  )
}
