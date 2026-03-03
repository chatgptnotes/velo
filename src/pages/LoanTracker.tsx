import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { loans, formatCurrency, formatCurrencyFull } from '../data/mockData'
import { Landmark, Calculator } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function LoanTracker() {
  const [prepayAmount, setPrepayAmount] = useState(100000)
  const [selectedLoan, setSelectedLoan] = useState(loans[0])
  
  const totalOutstanding = loans.reduce((s, l) => s + l.outstanding, 0)
  const totalEMI = loans.reduce((s, l) => s + l.emi, 0)

  // Simple prepayment calc
  const monthlyRate = selectedLoan.rate / 12 / 100
  const currentMonths = selectedLoan.remaining
  const afterPrepay = selectedLoan.outstanding - prepayAmount
  const newMonths = afterPrepay > 0 ? Math.ceil(Math.log(selectedLoan.emi / (selectedLoan.emi - afterPrepay * monthlyRate)) / Math.log(1 + monthlyRate)) : 0
  const interestSaved = (currentMonths * selectedLoan.emi - selectedLoan.outstanding) - (Math.min(newMonths, currentMonths) * selectedLoan.emi - afterPrepay)

  const loanChartData = loans.map(l => ({
    name: l.name.split(' - ')[0],
    outstanding: l.outstanding,
    paid: l.principal - l.outstanding,
  }))

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Loan Tracker</h1>
        <p className="text-gray-600 mt-2">Track EMIs, outstanding loans, and prepayment benefits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600">Total Outstanding</p>
          <p className="text-2xl font-bold text-danger mt-1">{formatCurrency(totalOutstanding)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600">Monthly EMI</p>
          <p className="text-2xl font-bold text-[#0F4C75] mt-1">{formatCurrencyFull(totalEMI)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600">Active Loans</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{loans.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loanChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(v) => `${(v/100000).toFixed(0)}L`} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip formatter={(v: number) => formatCurrencyFull(v)} />
                <Bar dataKey="paid" stackId="a" fill="#16A34A" name="Paid" />
                <Bar dataKey="outstanding" stackId="a" fill="#DC2626" name="Outstanding" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><Calculator className="h-5 w-5 mr-2" /> Prepayment Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Select Loan</label>
              <select className="w-full mt-1 p-2 border rounded-lg" value={selectedLoan.id} onChange={(e) => setSelectedLoan(loans.find(l => l.id === e.target.value) || loans[0])}>
                {loans.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Prepayment Amount</label>
              <input type="range" min={50000} max={selectedLoan.outstanding} step={50000} value={prepayAmount} onChange={e => setPrepayAmount(Number(e.target.value))} className="w-full mt-1" />
              <p className="text-right text-sm font-medium text-[#0F4C75]">{formatCurrencyFull(prepayAmount)}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm"><span>Tenure reduced by</span><span className="font-semibold text-success">{Math.max(0, currentMonths - newMonths)} months</span></div>
              <div className="flex justify-between text-sm"><span>Interest saved (approx)</span><span className="font-semibold text-success">{formatCurrency(Math.max(0, interestSaved))}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">Loan Details</h3></div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Outstanding</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">EMI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remaining</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loans.map(l => {
              const progress = ((l.principal - l.outstanding) / l.principal) * 100
              return (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><div className="text-sm font-medium text-gray-900">{l.name}</div><div className="text-xs text-gray-500">{l.type}</div></td>
                  <td className="px-6 py-4 text-sm font-medium text-danger">{formatCurrency(l.outstanding)}</td>
                  <td className="px-6 py-4 text-sm">{formatCurrencyFull(l.emi)}/mo</td>
                  <td className="px-6 py-4 text-sm">{l.rate}%</td>
                  <td className="px-6 py-4 text-sm">{l.remaining} months</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-success" style={{ width: `${progress}%` }}></div></div>
                    <span className="text-xs text-gray-500">{progress.toFixed(0)}% paid</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  )
}
