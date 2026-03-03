export interface Holding {
  id: string
  name: string
  ticker: string
  category: 'equity' | 'fixed-income' | 'real-estate' | 'gold' | 'alternatives' | 'cash'
  quantity: number
  avgCost: number
  currentPrice: number
  currentValue: number
  pnl: number
  pnlPercent: number
  allocation: number
  expenseRatio?: number
  dividendYield?: number
  lastDividend?: string
  nextDividend?: string
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  monthlyContribution: number
  projectedDate: string
  priority: 'high' | 'medium' | 'low'
}

export const formatCurrency = (amount: number): string => {
  if (Math.abs(amount) >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`
  if (Math.abs(amount) >= 100000) return `₹${(amount / 100000).toFixed(2)}L`
  return `₹${amount.toLocaleString('en-IN')}`
}

export const formatCurrencyFull = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`
}

export const mockHoldings: Holding[] = [
  { id: '1', name: 'Reliance Industries Ltd', ticker: 'RELIANCE', category: 'equity', quantity: 250, avgCost: 2480, currentPrice: 2650, currentValue: 662500, pnl: 42500, pnlPercent: 6.85, allocation: 26.78, expenseRatio: 0, dividendYield: 0.38, lastDividend: '2025-11-15', nextDividend: '2026-05-15' },
  { id: '2', name: 'Tata Consultancy Services', ticker: 'TCS', category: 'equity', quantity: 150, avgCost: 3580, currentPrice: 3750, currentValue: 562500, pnl: 25500, pnlPercent: 4.75, allocation: 22.74, expenseRatio: 0, dividendYield: 1.2, lastDividend: '2026-01-10', nextDividend: '2026-07-10' },
  { id: '3', name: 'HDFC Bank Ltd', ticker: 'HDFCBANK', category: 'equity', quantity: 300, avgCost: 1620, currentPrice: 1580, currentValue: 474000, pnl: -12000, pnlPercent: -2.47, allocation: 19.16, expenseRatio: 0, dividendYield: 1.1, lastDividend: '2025-09-20', nextDividend: '2026-03-20' },
  { id: '4', name: 'PPFAS Flexi Cap Fund', ticker: 'PPFAS', category: 'equity', quantity: 5000, avgCost: 65, currentPrice: 72, currentValue: 360000, pnl: 35000, pnlPercent: 10.77, allocation: 14.55, expenseRatio: 0.79, dividendYield: 0 },
  { id: '5', name: 'SBI Magnum Gilt Fund', ticker: 'SBIGILT', category: 'fixed-income', quantity: 8000, avgCost: 52, currentPrice: 54, currentValue: 432000, pnl: 16000, pnlPercent: 3.85, allocation: 17.47, expenseRatio: 0.46, dividendYield: 5.8 },
  { id: '6', name: 'Nippon Gold BeES', ticker: 'GOLDBEES', category: 'gold', quantity: 1200, avgCost: 48, currentPrice: 62, currentValue: 74400, pnl: 16800, pnlPercent: 29.17, allocation: 3.01, expenseRatio: 0.79 },
  { id: '7', name: 'Infosys Ltd', ticker: 'INFY', category: 'equity', quantity: 200, avgCost: 1450, currentPrice: 1380, currentValue: 276000, pnl: -14000, pnlPercent: -4.83, allocation: 11.15, expenseRatio: 0, dividendYield: 2.4, lastDividend: '2025-12-05', nextDividend: '2026-06-05' },
  { id: '8', name: 'ITC Ltd', ticker: 'ITC', category: 'equity', quantity: 500, avgCost: 460, currentPrice: 443, currentValue: 221500, pnl: -8500, pnlPercent: -3.70, allocation: 8.95, expenseRatio: 0, dividendYield: 3.2, lastDividend: '2025-08-15', nextDividend: '2026-08-15' },
  { id: '9', name: 'Axis Bluechip Fund', ticker: 'AXISBLU', category: 'equity', quantity: 3000, avgCost: 45, currentPrice: 40.83, currentValue: 122500, pnl: -12500, pnlPercent: -9.26, allocation: 4.95, expenseRatio: 1.62 },
  { id: '10', name: 'SGB 2028 Series', ticker: 'SGB2028', category: 'gold', quantity: 20, avgCost: 4800, currentPrice: 6200, currentValue: 124000, pnl: 28000, pnlPercent: 29.17, allocation: 5.01 },
]

export const mockGoals: Goal[] = [
  { id: '1', name: 'Retirement Planning', targetAmount: 50000000, currentAmount: 8500000, monthlyContribution: 180000, projectedDate: '2040-12-31', priority: 'high' },
  { id: '2', name: 'Children Education', targetAmount: 15000000, currentAmount: 3200000, monthlyContribution: 75000, projectedDate: '2035-06-30', priority: 'high' },
  { id: '3', name: 'Dream Home Upgrade', targetAmount: 20000000, currentAmount: 5500000, monthlyContribution: 100000, projectedDate: '2030-12-31', priority: 'medium' },
  { id: '4', name: 'Emergency Fund', targetAmount: 2500000, currentAmount: 2100000, monthlyContribution: 25000, projectedDate: '2026-12-31', priority: 'medium' },
  { id: '5', name: 'World Travel', targetAmount: 5000000, currentAmount: 800000, monthlyContribution: 30000, projectedDate: '2028-03-31', priority: 'low' },
]

export const mockPortfolioData = {
  totalAUM: 24783500,
  monthlyReturn: 2.3,
  annualYield: 14.2,
  taxSavedYTD: 285000,
  netWorth: 24783500,
  lastUpdated: '2026-03-03T12:00:00Z'
}

export const mockMarketData = {
  nifty50: { value: 22150.75, change: 1.2 },
  sensex: { value: 73247.90, change: 0.8 },
  gold: { value: 62000, change: -0.3 },
  usdInr: { value: 82.45, change: 0.1 }
}

// Net Worth Timeline (Feature 1)
export const netWorthTimeline = [
  { month: 'Apr 25', value: 20150000 },
  { month: 'May 25', value: 20480000 },
  { month: 'Jun 25', value: 20950000 },
  { month: 'Jul 25', value: 21320000 },
  { month: 'Aug 25', value: 21100000 },
  { month: 'Sep 25', value: 21780000 },
  { month: 'Oct 25', value: 22350000 },
  { month: 'Nov 25', value: 22800000 },
  { month: 'Dec 25', value: 23150000 },
  { month: 'Jan 26', value: 23600000 },
  { month: 'Feb 26', value: 24200000 },
  { month: 'Mar 26', value: 24783500 },
]

// Asset Correlation Matrix (Feature 2)
export const correlationMatrix = {
  assets: ['Equity', 'Fixed Income', 'Gold', 'Real Estate', 'Cash'],
  data: [
    [1.00, -0.25, 0.05, 0.35, 0.02],
    [-0.25, 1.00, 0.10, 0.15, 0.80],
    [0.05, 0.10, 1.00, 0.20, -0.05],
    [0.35, 0.15, 0.20, 1.00, 0.10],
    [0.02, 0.80, -0.05, 0.10, 1.00],
  ]
}

// Dividend Tracker (Feature 3)
export const dividendCalendar = [
  { date: '2026-03-20', stock: 'HDFC Bank', amount: 19, perShare: true, totalShares: 300 },
  { date: '2026-05-15', stock: 'Reliance', amount: 10, perShare: true, totalShares: 250 },
  { date: '2026-06-05', stock: 'Infosys', amount: 18, perShare: true, totalShares: 200 },
  { date: '2026-07-10', stock: 'TCS', amount: 75, perShare: true, totalShares: 150 },
  { date: '2026-08-15', stock: 'ITC', amount: 6.75, perShare: true, totalShares: 500 },
]

export const dividendSummary = {
  totalReceived: 145000,
  projectedAnnual: 285000,
  averageYield: 1.15,
  dripEnabled: ['TCS', 'HDFC Bank'],
}

// Rebalancing Advisor (Feature 5)
export const rebalancingData = {
  current: [
    { asset: 'Equity', current: 62, target: 55 },
    { asset: 'Fixed Income', current: 17, target: 25 },
    { asset: 'Gold', current: 8, target: 10 },
    { asset: 'Real Estate', current: 10, target: 8 },
    { asset: 'Cash', current: 3, target: 2 },
  ],
  suggestions: [
    { action: 'Sell', asset: 'Equity', amount: 1734845, reason: 'Overweight by 7%' },
    { action: 'Buy', asset: 'Fixed Income', amount: 1982080, reason: 'Underweight by 8%' },
    { action: 'Buy', asset: 'Gold', amount: 495670, reason: 'Underweight by 2%' },
  ]
}

// Fee Analyzer (Feature 6)
export const feeAnalysis = {
  holdings: [
    { name: 'PPFAS Flexi Cap Fund', expenseRatio: 0.79, value: 360000, annualFee: 2844, tenYearImpact: 34128 },
    { name: 'Axis Bluechip Fund', expenseRatio: 1.62, value: 122500, annualFee: 1985, tenYearImpact: 23814 },
    { name: 'SBI Magnum Gilt Fund', expenseRatio: 0.46, value: 432000, annualFee: 1987, tenYearImpact: 23847 },
    { name: 'Nippon Gold BeES', expenseRatio: 0.79, value: 74400, annualFee: 588, tenYearImpact: 7053 },
  ],
  totalAnnualFees: 7404,
  totalTenYearImpact: 88842,
  weightedExpenseRatio: 0.84,
}

// Tax Harvesting (Feature 7)
export const taxHarvestingOpportunities = [
  { stock: 'HDFC Bank', unrealizedLoss: -12000, buyDate: '2025-08-15', holdingPeriod: '7 months', taxSaving: 1800, action: 'Harvest STCG loss' },
  { stock: 'Infosys', unrealizedLoss: -14000, buyDate: '2024-06-10', holdingPeriod: '21 months', taxSaving: 1400, action: 'Harvest LTCG loss' },
  { stock: 'ITC', unrealizedLoss: -8500, buyDate: '2025-11-01', holdingPeriod: '4 months', taxSaving: 1275, action: 'Harvest STCG loss' },
  { stock: 'Axis Bluechip Fund', unrealizedLoss: -12500, buyDate: '2025-03-20', holdingPeriod: '12 months', taxSaving: 1250, action: 'Harvest LTCG loss' },
]

// Family Portfolio (Feature 8)
export const familyMembers = [
  { id: '1', name: 'Rajesh Kumar', relation: 'Self', netWorth: 24783500, equity: 15200000, debt: 5400000, gold: 2100000, realEstate: 2083500, avatar: 'RK' },
  { id: '2', name: 'Priya Kumar', relation: 'Spouse', netWorth: 12500000, equity: 5200000, debt: 3800000, gold: 1500000, realEstate: 2000000, avatar: 'PK' },
  { id: '3', name: 'Aarav Kumar', relation: 'Son', netWorth: 2800000, equity: 1500000, debt: 800000, gold: 500000, realEstate: 0, avatar: 'AK' },
  { id: '4', name: 'Ananya Kumar', relation: 'Daughter', netWorth: 1500000, equity: 800000, debt: 500000, gold: 200000, realEstate: 0, avatar: 'AK' },
]

export const familySummary = {
  combinedNetWorth: 41583500,
  totalEquity: 22700000,
  totalDebt: 10500000,
  totalGold: 4300000,
  totalRealEstate: 4083500,
}

// Insurance Gap (Feature 9)
export const insuranceData = {
  life: { current: 10000000, recommended: 25000000, gap: 15000000, premium: 45000 },
  health: { current: 1000000, recommended: 2500000, gap: 1500000, premium: 28000 },
  property: { current: 5000000, recommended: 15000000, gap: 10000000, premium: 12000 },
  policies: [
    { name: 'HDFC Life Click2Protect', type: 'Term Life', cover: 10000000, premium: 45000, expiry: '2045-04-15', status: 'Active' },
    { name: 'Star Health Family Floater', type: 'Health', cover: 1000000, premium: 28000, expiry: '2027-01-01', status: 'Active' },
    { name: 'ICICI Home Insurance', type: 'Property', cover: 5000000, premium: 12000, expiry: '2026-08-15', status: 'Active' },
  ]
}

// Market Pulse Sparklines (Feature 10)
export const marketSparklines = {
  nifty: [21800, 21950, 22100, 21900, 22050, 22200, 22150],
  sensex: [72500, 72800, 73100, 72700, 73000, 73400, 73248],
  gold: [61000, 61500, 62200, 61800, 62500, 62100, 62000],
  usdInr: [82.20, 82.35, 82.50, 82.30, 82.40, 82.55, 82.45],
}

// Cash Flow (Feature 11)
export const cashFlowData = [
  { month: 'Oct 25', income: 850000, expenses: 520000 },
  { month: 'Nov 25', income: 870000, expenses: 540000 },
  { month: 'Dec 25', income: 920000, expenses: 680000 },
  { month: 'Jan 26', income: 850000, expenses: 510000 },
  { month: 'Feb 26', income: 860000, expenses: 530000 },
  { month: 'Mar 26', income: 880000, expenses: 550000 },
]

// Retirement (Feature 12)
export const retirementData = {
  currentAge: 38,
  retirementAge: 55,
  currentCorpus: 8500000,
  monthlyExpenses: 150000,
  inflationRate: 6,
  expectedReturn: 12,
  requiredCorpus: 50000000,
  monthlySavingsNeeded: 180000,
  currentMonthlySavings: 180000,
  onTrack: true,
  projectedCorpus: 52300000,
}

// Notifications (Feature 13)
export const notifications = [
  { id: '1', type: 'alert', title: 'HDFC Bank near 52-week low', message: 'HDFC Bank is trading at 1580, near its 52-week low of 1545', time: '2h ago', read: false },
  { id: '2', type: 'sip', title: 'SIP due tomorrow', message: 'PPFAS Flexi Cap Fund SIP of 25,000 due on March 5', time: '4h ago', read: false },
  { id: '3', type: 'dividend', title: 'Dividend received', message: 'TCS dividend of 12,500 credited to your account', time: '1d ago', read: true },
  { id: '4', type: 'tax', title: 'Advance tax Q4 due', message: 'Q4 advance tax of 2,12,500 due by March 15', time: '2d ago', read: false },
  { id: '5', type: 'rebalance', title: 'Portfolio rebalance needed', message: 'Equity allocation at 62% vs target 55%. Consider rebalancing.', time: '3d ago', read: true },
]

// Real Estate (Feature 15)
export const realEstateProperties = [
  { id: '1', name: '3BHK Flat, Baner, Pune', purchasePrice: 8500000, currentValue: 12500000, purchaseDate: '2020-03-15', area: '1200 sqft', type: 'Residential', rentalIncome: 35000 },
  { id: '2', name: 'Commercial Space, Hinjewadi', purchasePrice: 4500000, currentValue: 6800000, purchaseDate: '2021-08-20', area: '650 sqft', type: 'Commercial', rentalIncome: 28000 },
]

// Gold Tracker (Feature 16)
export const goldHoldings = {
  physical: { weight: 120, unit: 'grams', value: 744000, purity: '24K' },
  sgb: [
    { series: 'SGB 2028-29 Series I', units: 20, buyPrice: 4800, currentPrice: 6200, maturityDate: '2028-11-15' },
    { series: 'SGB 2030-31 Series III', units: 10, buyPrice: 5100, currentPrice: 6200, maturityDate: '2030-05-20' },
  ],
  etf: { name: 'Nippon Gold BeES', units: 1200, nav: 62, value: 74400 },
  totalValue: 1004400,
  goldRate: 62000,
  goldRateChange: -0.3,
}

// Loan Tracker (Feature 17)
export const loans = [
  { id: '1', name: 'Home Loan - SBI', principal: 5000000, outstanding: 3200000, emi: 45000, rate: 8.5, tenure: 240, remaining: 96, startDate: '2018-06-15', type: 'Home' },
  { id: '2', name: 'Car Loan - HDFC', principal: 800000, outstanding: 280000, emi: 18000, rate: 9.2, tenure: 60, remaining: 18, startDate: '2024-03-10', type: 'Vehicle' },
]

// Comparison Tool (Feature 18)
export const comparisonInvestments = [
  { name: 'PPFAS Flexi Cap', returns1Y: 18.5, returns3Y: 22.1, returns5Y: 19.8, expenseRatio: 0.79, risk: 'High', category: 'Equity MF', minInvestment: 1000 },
  { name: 'Axis Bluechip', returns1Y: 8.2, returns3Y: 12.5, returns5Y: 14.1, expenseRatio: 1.62, risk: 'Moderate', category: 'Equity MF', minInvestment: 500 },
  { name: 'SBI Magnum Gilt', returns1Y: 7.8, returns3Y: 6.2, returns5Y: 7.5, expenseRatio: 0.46, risk: 'Low', category: 'Debt MF', minInvestment: 5000 },
  { name: 'Reliance Industries', returns1Y: 12.5, returns3Y: 15.8, returns5Y: 18.2, expenseRatio: 0, risk: 'High', category: 'Stock', minInvestment: 2650 },
  { name: 'TCS', returns1Y: 8.9, returns3Y: 11.2, returns5Y: 14.5, expenseRatio: 0, risk: 'Moderate', category: 'Stock', minInvestment: 3750 },
  { name: 'Gold ETF', returns1Y: 15.2, returns3Y: 12.8, returns5Y: 11.5, expenseRatio: 0.79, risk: 'Moderate', category: 'Commodity', minInvestment: 100 },
  { name: 'PPF', returns1Y: 7.1, returns3Y: 7.1, returns5Y: 7.1, expenseRatio: 0, risk: 'Low', category: 'Govt Scheme', minInvestment: 500 },
  { name: 'NPS Tier I', returns1Y: 11.5, returns3Y: 10.8, returns5Y: 12.2, expenseRatio: 0.09, risk: 'Moderate', category: 'Pension', minInvestment: 500 },
]

// Expense Tracker (Feature 20)
export const monthlyExpenses = [
  { month: 'Oct 25', housing: 125000, food: 45000, transport: 25000, utilities: 18000, healthcare: 35000, education: 60000, entertainment: 20000, shopping: 42000, insurance: 85000, other: 65000 },
  { month: 'Nov 25', housing: 125000, food: 48000, transport: 22000, utilities: 20000, healthcare: 30000, education: 60000, entertainment: 25000, shopping: 55000, insurance: 85000, other: 70000 },
  { month: 'Dec 25', housing: 125000, food: 52000, transport: 28000, utilities: 22000, healthcare: 28000, education: 60000, entertainment: 45000, shopping: 120000, insurance: 85000, other: 115000 },
  { month: 'Jan 26', housing: 125000, food: 44000, transport: 20000, utilities: 16000, healthcare: 32000, education: 60000, entertainment: 18000, shopping: 38000, insurance: 85000, other: 72000 },
  { month: 'Feb 26', housing: 125000, food: 46000, transport: 24000, utilities: 17000, healthcare: 30000, education: 60000, entertainment: 22000, shopping: 45000, insurance: 85000, other: 76000 },
  { month: 'Mar 26', housing: 130000, food: 47000, transport: 23000, utilities: 18000, healthcare: 35000, education: 60000, entertainment: 20000, shopping: 50000, insurance: 85000, other: 82000 },
]

export const expenseCategories = [
  { name: 'Housing', color: '#0F4C75', key: 'housing' },
  { name: 'Food', color: '#3282B8', key: 'food' },
  { name: 'Transport', color: '#00B4D8', key: 'transport' },
  { name: 'Utilities', color: '#B8860B', key: 'utilities' },
  { name: 'Healthcare', color: '#16A34A', key: 'healthcare' },
  { name: 'Education', color: '#F59E0B', key: 'education' },
  { name: 'Entertainment', color: '#8B5CF6', key: 'entertainment' },
  { name: 'Shopping', color: '#EC4899', key: 'shopping' },
  { name: 'Insurance', color: '#6366F1', key: 'insurance' },
  { name: 'Other', color: '#DC2626', key: 'other' },
]
