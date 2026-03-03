import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { monthlyExpenses, expenseCategories, formatCurrencyFull } from '../data/mockData'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts'

export default function ExpenseTracker() {
  const [selectedMonth, setSelectedMonth] = useState(monthlyExpenses.length - 1)
  const current = monthlyExpenses[selectedMonth]
  const total = expenseCategories.reduce((s, c) => s + ((current as any)[c.key] || 0), 0)

  const pieData = expenseCategories.map(c => ({ name: c.name, value: (current as any)[c.key] || 0, color: c.color }))
  
  const trendData = monthlyExpenses.map(m => ({
    month: m.month,
    total: expenseCategories.reduce((s, c) => s + ((m as any)[c.key] || 0), 0)
  }))

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
        <p className="text-gray-600 mt-2">Monthly expenses by category</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrencyFull(total)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600">6-Month Average</p>
          <p className="text-2xl font-bold text-[#0F4C75] mt-1">{formatCurrencyFull(Math.round(trendData.reduce((s, t) => s + t.total, 0) / trendData.length))}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600">Highest Category</p>
          <p className="text-2xl font-bold text-warning mt-1">{pieData.sort((a, b) => b.value - a.value)[0]?.name}</p>
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        {monthlyExpenses.map((m, i) => (
          <button key={i} onClick={() => setSelectedMonth(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${i === selectedMonth ? 'bg-[#0F4C75] text-white' : 'bg-gray-100 text-gray-600'}`}>
            {m.month}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData.sort((a,b) => b.value - a.value)} cx="50%" cy="50%" outerRadius={100} innerRadius={60} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => formatCurrencyFull(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={v => `${(v/100000).toFixed(0)}L`} />
                <Tooltip formatter={(v: number) => formatCurrencyFull(v)} />
                <Area type="monotone" dataKey="total" stroke="#0F4C75" fill="#0F4C75" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Details - {current.month}</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {expenseCategories.map(c => (
            <div key={c.key} className="p-3 rounded-lg border border-gray-100">
              <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: c.color }}></div>
              <p className="text-xs text-gray-500">{c.name}</p>
              <p className="text-sm font-semibold text-gray-900">{formatCurrencyFull((current as any)[c.key] || 0)}</p>
              <p className="text-xs text-gray-400">{((((current as any)[c.key] || 0) / total) * 100).toFixed(1)}%</p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
