import { mockPortfolio } from '../lib/mockData'
import { Calculator, Calendar, TrendingDown, AlertTriangle, CheckCircle, FileText } from 'lucide-react'

const TaxCenter = () => {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else {
      return `₹${amount.toLocaleString()}`
    }
  }

  const { taxCenter } = mockPortfolio

  const deductionProgress = (used: number, limit: number) => (used / limit) * 100

  const taxHarvestingOpportunities = [
    { stock: 'Wipro Ltd', currentLoss: -45000, suggestedAction: 'Sell to harvest loss' },
    { stock: 'Bharti Airtel', currentLoss: -32000, suggestedAction: 'Consider harvesting' },
    { stock: 'Asian Paints', currentLoss: -18000, suggestedAction: 'Monitor for opportunity' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Tax Center</h1>
          <p className="text-primary-text-secondary mt-1">Optimize your tax strategy and track deductions</p>
        </div>
        <button className="bg-primary-gold text-primary-bg px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-danger bg-opacity-10 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary-danger" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-text-secondary">Estimated Tax Liability</p>
              <p className="text-2xl font-bold text-primary-text">{formatCurrency(taxCenter.estimatedTaxLiability)}</p>
            </div>
          </div>
        </div>

        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-success bg-opacity-10 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-primary-success" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-text-secondary">Deductions Used</p>
              <p className="text-2xl font-bold text-primary-text">{formatCurrency(taxCenter.deductionsUsed)}</p>
            </div>
          </div>
        </div>

        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-gold bg-opacity-10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary-gold" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-text-secondary">Tax Saved YTD</p>
              <p className="text-2xl font-bold text-primary-text">{formatCurrency(mockPortfolio.taxSavedYTD)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Capital Gains Summary */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-primary-text mb-4">Capital Gains Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-bg p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-primary-text">Short Term Capital Gains (STCG)</h4>
              <span className="text-sm text-primary-text-secondary">Less than 1 year</span>
            </div>
            <p className="text-2xl font-bold text-primary-text mb-2">{formatCurrency(taxCenter.capitalGains.stcg)}</p>
            <p className="text-sm text-primary-text-secondary">Tax rate: 15%</p>
            <p className="text-sm text-primary-danger">Est. tax: ₹{(taxCenter.capitalGains.stcg * 0.15).toLocaleString()}</p>
          </div>
          <div className="bg-primary-bg p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-primary-text">Long Term Capital Gains (LTCG)</h4>
              <span className="text-sm text-primary-text-secondary">More than 1 year</span>
            </div>
            <p className="text-2xl font-bold text-primary-text mb-2">{formatCurrency(taxCenter.capitalGains.ltcg)}</p>
            <p className="text-sm text-primary-text-secondary">Tax rate: 10% (above ₹1L)</p>
            <p className="text-sm text-primary-danger">Est. tax: ₹{((taxCenter.capitalGains.ltcg - 100000) * 0.1).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Deduction Trackers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 80C */}
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-primary-text mb-4">Section 80C Deductions</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-primary-text font-medium">Investment limit</span>
                <span className="text-primary-text">{formatCurrency(taxCenter.section80C.used)} / {formatCurrency(taxCenter.section80C.limit)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-primary-gold h-3 rounded-full transition-all duration-300"
                  style={{ width: `${deductionProgress(taxCenter.section80C.used, taxCenter.section80C.limit)}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-primary-success">
                  {deductionProgress(taxCenter.section80C.used, taxCenter.section80C.limit).toFixed(0)}% utilized
                </span>
                <span className="text-primary-text-secondary">
                  Remaining: {formatCurrency(taxCenter.section80C.limit - taxCenter.section80C.used)}
                </span>
              </div>
            </div>
            <div className="text-sm text-primary-text-secondary">
              <p>Eligible investments: PPF, ELSS, LIC premiums, NSC, tax-saving FDs</p>
            </div>
          </div>
        </div>

        {/* Section 80D */}
        <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-primary-text mb-4">Section 80D - Health Insurance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-primary-text font-medium">Premium limit</span>
                <span className="text-primary-text">{formatCurrency(taxCenter.section80D.used)} / {formatCurrency(taxCenter.section80D.limit)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-primary-success h-3 rounded-full transition-all duration-300"
                  style={{ width: `${deductionProgress(taxCenter.section80D.used, taxCenter.section80D.limit)}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-primary-success">
                  {deductionProgress(taxCenter.section80D.used, taxCenter.section80D.limit).toFixed(0)}% utilized
                </span>
                <span className="text-primary-text-secondary">
                  Remaining: {formatCurrency(taxCenter.section80D.limit - taxCenter.section80D.used)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax-Loss Harvesting */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-text">Tax-Loss Harvesting Opportunities</h3>
          <AlertTriangle className="w-5 h-5 text-primary-gold" />
        </div>
        <div className="space-y-3">
          {taxHarvestingOpportunities.map((opportunity, index) => (
            <div key={index} className="bg-primary-bg p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-primary-text">{opportunity.stock}</p>
                <p className="text-sm text-primary-text-secondary">{opportunity.suggestedAction}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-primary-danger">{formatCurrency(Math.abs(opportunity.currentLoss))}</p>
                <p className="text-xs text-primary-text-secondary">Unrealized loss</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg">
          <p className="text-sm text-yellow-400">
            <strong>Note:</strong> Harvesting losses can offset gains and reduce your tax liability. Consult your advisor before making decisions.
          </p>
        </div>
      </div>

      {/* Advance Tax Calendar */}
      <div className="bg-primary-card p-6 rounded-lg border border-gray-700">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-primary-gold mr-2" />
          <h3 className="text-lg font-semibold text-primary-text">Advance Tax Payment Schedule</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {taxCenter.advanceTax.map((payment, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              payment.status === 'paid' 
                ? 'border-primary-success bg-primary-success bg-opacity-10' 
                : 'border-primary-gold bg-primary-gold bg-opacity-10'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-text-secondary">Q{index + 1} Payment</span>
                {payment.status === 'paid' ? (
                  <CheckCircle className="w-4 h-4 text-primary-success" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-primary-gold" />
                )}
              </div>
              <p className="font-medium text-primary-text">{formatCurrency(payment.amount)}</p>
              <p className="text-sm text-primary-text-secondary">Due: {payment.dueDate}</p>
              <p className={`text-xs font-medium mt-1 ${
                payment.status === 'paid' ? 'text-primary-success' : 'text-primary-gold'
              }`}>
                {payment.status === 'paid' ? 'Paid' : 'Pending'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaxCenter