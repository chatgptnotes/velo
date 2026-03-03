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
  return `₹${amount.toLocaleString('en-IN')}`
}

export const mockHoldings: Holding[] = [
  {
    id: '1',
    name: 'Reliance Industries Ltd',
    ticker: 'RELIANCE',
    category: 'equity',
    quantity: 250,
    avgCost: 2480,
    currentPrice: 2650,
    currentValue: 662500,
    pnl: 42500,
    pnlPercent: 6.85,
    allocation: 26.78
  },
  {
    id: '2',
    name: 'Tata Consultancy Services',
    ticker: 'TCS',
    category: 'equity',
    quantity: 150,
    avgCost: 3580,
    currentPrice: 3750,
    currentValue: 562500,
    pnl: 25500,
    pnlPercent: 4.75,
    allocation: 22.74
  }
]

export const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Retirement Planning',
    targetAmount: 50000000,
    currentAmount: 8500000,
    monthlyContribution: 180000,
    projectedDate: '2040-12-31',
    priority: 'high'
  }
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