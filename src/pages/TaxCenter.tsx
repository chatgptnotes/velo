import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { formatCurrency, formatCurrencyFull, taxHarvestingOpportunities } from '../data/mockData'
import { Receipt, TrendingDown, PieChart, Calendar, Scissors } from 'lucide-react'

export default function TaxCenter() {
  const [activeTab, setActiveTab] = useState('Overview')
  const totalHarvestable = taxHarvestingOpportunities.reduce((s, t) => s + t.unrealizedLoss, 0)
  const totalTaxSaving = taxHarvestingOpportunities.reduce((s, t) => s + t.taxSaving, 0)

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tax Center</h1>
        <p className="text-gray-600 mt-2">Optimize your tax strategy and maximize savings</p>
      </div>

      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {['Overview', 'Tax Harvesting'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === tab ? 'bg-white text-[#0F4C75] shadow-sm' : 'text-gray-600'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center"><div className="p-2 bg-danger/10 rounded-lg"><Receipt className="h-6 w-6 text-danger" /></div>
              <div className="ml-4"><p className="text-sm font-medium text-gray-600">Estimated Liability</p><p className="text-lg font-semibold text-danger">{formatCurrency(850000)}</p></div></div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center"><div className="p-2 bg-success/10 rounded-lg"><TrendingDown className="h-6 w-6 text-success" /></div>
              <div className="ml-4"><p className="text-sm font-medium text-gray-600">Total Deductions</p><p className="text-lg font-semibold text-success">{formatCurrency(425000)}</p></div></div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center"><div className="p-2 bg-[#0F4C75]/10 rounded-lg"><PieChart className="h-6 w-6 text-[#0F4C75]" /></div>
              <div className="ml-4"><p className="text-sm font-medium text-gray-600">Effective Rate</p><p className="text-lg font-semibold text-[#0F4C75]">18.5%</p></div></div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center"><div className="p-2 bg-[#00B4D8]/10 rounded-lg"><Calendar className="h-6 w-6 text-[#00B4D8]" /></div>
              <div className="ml-4"><p className="text-sm font-medium text-gray-600">Tax Saved YTD</p><p className="text-lg font-semibold text-[#00B4D8]">{formatCurrency(285000)}</p></div></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Capital Gains Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div><p className="text-sm font-medium text-gray-900">Short Term Capital Gains (STCG)</p><p className="text-xs text-gray-600">Tax Rate: 15%</p></div>
                  <div className="text-right"><p className="text-lg font-semibold">{formatCurrency(125000)}</p><p className="text-xs text-danger">Tax: {formatCurrencyFull(18750)}</p></div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div><p className="text-sm font-medium text-gray-900">Long Term Capital Gains (LTCG)</p><p className="text-xs text-gray-600">Tax Rate: 10% (above 1L)</p></div>
                  <div className="text-right"><p className="text-lg font-semibold">{formatCurrency(285000)}</p><p className="text-xs text-danger">Tax: {formatCurrencyFull(18500)}</p></div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Tax Deductions</h3>
              <div className="space-y-4">
                {[
                  { name: '80C', used: 150000, limit: 150000 },
                  { name: '80D (Health)', used: 35000, limit: 50000 },
                  { name: '80G (Donations)', used: 25000, limit: 100000 },
                ].map(d => (
                  <div key={d.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">Section {d.name}</span>
                      <span className="text-sm text-gray-600">{formatCurrencyFull(d.used)} / {formatCurrencyFull(d.limit)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${d.used >= d.limit ? 'bg-success' : 'bg-warning'}`} style={{ width: `${Math.min(100, (d.used / d.limit) * 100)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Advance Tax Calendar FY 2025-26</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { q: 'Q1 - 15th June', status: 'Paid', active: false },
                { q: 'Q2 - 15th Sept', status: 'Paid', active: false },
                { q: 'Q3 - 15th Dec', status: 'Due Soon', active: true },
                { q: 'Q4 - 15th Mar', status: 'Pending', active: false },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-lg text-center border ${item.active ? 'border-[#0F4C75] bg-[#0F4C75]/5' : 'border-gray-200'}`}>
                  <p className="text-sm font-medium text-gray-900">{item.q}</p>
                  <p className="text-lg font-semibold text-[#0F4C75] mt-1">{formatCurrency(212500)}</p>
                  <p className={`text-xs mt-1 ${item.status === 'Paid' ? 'text-success' : item.status === 'Due Soon' ? 'text-warning' : 'text-gray-500'}`}>{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Tax Harvesting Tab (Feature 7) */}
      {activeTab === 'Tax Harvesting' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Total Harvestable Losses</p>
              <p className="text-xl font-bold text-danger">{formatCurrencyFull(totalHarvestable)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Potential Tax Savings</p>
              <p className="text-xl font-bold text-success">{formatCurrencyFull(totalTaxSaving)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-600">Opportunities</p>
              <p className="text-xl font-bold text-[#0F4C75]">{taxHarvestingOpportunities.length} positions</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900 flex items-center"><Scissors className="h-5 w-5 mr-2" /> Tax-Loss Harvesting Opportunities</h3></div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unrealized Loss</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Holding Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tax Saving</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {taxHarvestingOpportunities.map((t, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.stock}</td>
                    <td className="px-6 py-4 text-sm text-danger font-medium">{formatCurrencyFull(t.unrealizedLoss)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{t.holdingPeriod}</td>
                    <td className="px-6 py-4 text-sm text-success font-medium">{formatCurrencyFull(t.taxSaving)}</td>
                    <td className="px-6 py-4 text-xs text-gray-500">{t.action}</td>
                    <td className="px-6 py-4"><button className="px-3 py-1.5 bg-warning text-white rounded-lg text-sm font-medium hover:bg-warning/90">Harvest</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
