// Mock data for Velo - Indian context portfolio (~2.5 Crore total)
export const mockPortfolio = {
  netWorth: 25000000, // 2.5 Crore
  monthlyReturn: 1.85,
  annualYield: 14.2,
  taxSavedYTD: 185000,
  
  assetAllocation: [
    { name: 'Equity', value: 35, amount: 8750000 },
    { name: 'Real Estate', value: 25, amount: 6250000 },
    { name: 'Fixed Income', value: 20, amount: 5000000 },
    { name: 'Gold', value: 10, amount: 2500000 },
    { name: 'Alternatives', value: 7, amount: 1750000 },
    { name: 'Cash', value: 3, amount: 750000 }
  ],

  holdings: [
    // Equity - Stocks
    { name: 'Reliance Industries', ticker: 'RELIANCE', quantity: 250, avgCost: 2680, currentPrice: 2850, sector: 'Energy', assetClass: 'equity' },
    { name: 'Tata Consultancy Services', ticker: 'TCS', quantity: 150, avgCost: 3420, currentPrice: 3680, sector: 'IT', assetClass: 'equity' },
    { name: 'HDFC Bank', ticker: 'HDFCBANK', quantity: 300, avgCost: 1580, currentPrice: 1720, sector: 'Financial Services', assetClass: 'equity' },
    { name: 'Infosys', ticker: 'INFY', quantity: 200, avgCost: 1450, currentPrice: 1620, sector: 'IT', assetClass: 'equity' },
    { name: 'ITC Ltd', ticker: 'ITC', quantity: 500, avgCost: 420, currentPrice: 465, sector: 'FMCG', assetClass: 'equity' },
    { name: 'Bajaj Finance', ticker: 'BAJFINANCE', quantity: 50, avgCost: 6800, currentPrice: 7350, sector: 'Financial Services', assetClass: 'equity' },
    
    // Mutual Funds
    { name: 'PPFAS Long Term Equity Fund', ticker: 'PPFAS_FLEXI', quantity: 8500, avgCost: 285, currentPrice: 312, sector: 'Multi Cap', assetClass: 'equity' },
    { name: 'Axis Bluechip Fund', ticker: 'AXIS_BLUE', quantity: 12000, avgCost: 68, currentPrice: 75, sector: 'Large Cap', assetClass: 'equity' },
    { name: 'Mirae Asset Large Cap Fund', ticker: 'MIRAE_LC', quantity: 15000, avgCost: 95, currentPrice: 102, sector: 'Large Cap', assetClass: 'equity' },
    { name: 'Parag Parikh ELSS Tax Saver', ticker: 'PPELSS', quantity: 6000, avgCost: 52, currentPrice: 58, sector: 'ELSS', assetClass: 'equity' },
    
    // Fixed Income
    { name: 'SBI Fixed Deposit', ticker: 'SBI_FD', quantity: 2000000, avgCost: 1, currentPrice: 1.071, sector: 'Bank FD', assetClass: 'fixed_income' },
    { name: 'HDFC Bank FD', ticker: 'HDFC_FD', quantity: 1500000, avgCost: 1, currentPrice: 1.0725, sector: 'Bank FD', assetClass: 'fixed_income' },
    { name: 'Government Bond 2031', ticker: 'GOI_2031', quantity: 1000000, avgCost: 98.5, currentPrice: 101.2, sector: 'Government', assetClass: 'fixed_income' },
    
    // Real Estate
    { name: '2BHK Apartment - Nagpur', ticker: 'PROP_1', quantity: 1, avgCost: 4500000, currentPrice: 4850000, sector: 'Residential', assetClass: 'real_estate' },
    { name: 'Commercial Shop - Main Road', ticker: 'PROP_2', quantity: 1, avgCost: 8000000, currentPrice: 8750000, sector: 'Commercial', assetClass: 'real_estate' },
    
    // Gold
    { name: 'Physical Gold', ticker: 'GOLD_PHYS', quantity: 200, avgCost: 5800, currentPrice: 6200, sector: 'Precious Metals', assetClass: 'gold' },
    { name: 'Sovereign Gold Bonds', ticker: 'SGB_2025', quantity: 50, avgCost: 5200, currentPrice: 5850, sector: 'Government', assetClass: 'gold' }
  ],

  recentTransactions: [
    { date: '2026-03-01', type: 'dividend', description: 'TCS Dividend Credit', amount: 8500, units: 0 },
    { date: '2026-02-28', type: 'sip', description: 'PPFAS Flexi Cap SIP', amount: -25000, units: 78.5 },
    { date: '2026-02-25', type: 'interest', description: 'SBI FD Interest', amount: 12500, units: 0 },
    { date: '2026-02-20', type: 'buy', description: 'Bajaj Finance', amount: -147000, units: 20 },
    { date: '2026-02-15', type: 'dividend', description: 'HDFC Bank Dividend', amount: 4200, units: 0 }
  ],

  marketPulse: [
    { name: 'Nifty 50', value: 22845.75, change: 1.24 },
    { name: 'Sensex', value: 75428.66, change: 0.89 },
    { name: 'Gold (₹/10g)', value: 62000, change: -0.45 },
    { name: 'USD/INR', value: 83.25, change: 0.12 }
  ],

  goals: [
    { name: 'Retirement Planning', targetAmount: 50000000, currentAmount: 18500000, targetDate: '2040-01-01', category: 'retirement', monthlySip: 125000 },
    { name: 'Children Education', targetAmount: 15000000, currentAmount: 4200000, targetDate: '2032-06-01', category: 'education', monthlySip: 85000 },
    { name: 'Property Purchase', targetAmount: 12000000, currentAmount: 2800000, targetDate: '2028-12-01', category: 'property', monthlySip: 180000 },
    { name: 'Emergency Fund', targetAmount: 3000000, currentAmount: 2100000, targetDate: '2027-01-01', category: 'emergency', monthlySip: 45000 },
    { name: 'Europe Travel', targetAmount: 800000, currentAmount: 320000, targetDate: '2026-12-01', category: 'travel', monthlySip: 25000 }
  ],

  documents: [
    { name: 'LIC Policy Document', category: 'insurance', size: '2.4 MB', uploadedAt: '2025-12-15' },
    { name: 'Property Registration - Nagpur', category: 'property', size: '1.8 MB', uploadedAt: '2025-11-20' },
    { name: 'Will & Testament', category: 'wills', size: '650 KB', uploadedAt: '2025-10-05' },
    { name: 'ITR 2024-25', category: 'tax_returns', size: '1.2 MB', uploadedAt: '2025-09-30' },
    { name: 'SBI Bank Statement Q3', category: 'bank_statements', size: '890 KB', uploadedAt: '2026-01-15' },
    { name: 'Mutual Fund Statements', category: 'investments', size: '3.2 MB', uploadedAt: '2026-02-28' },
    { name: 'Health Insurance Policy', category: 'insurance', size: '1.5 MB', uploadedAt: '2025-08-12' },
    { name: 'Commercial Property Lease', category: 'property', size: '980 KB', uploadedAt: '2025-07-18' }
  ],

  taxCenter: {
    estimatedTaxLiability: 1850000,
    deductionsUsed: 980000,
    section80C: { used: 150000, limit: 150000 },
    section80D: { used: 55000, limit: 75000 },
    hra: { used: 240000, limit: 300000 },
    capitalGains: {
      stcg: 125000,
      ltcg: 85000
    },
    advanceTax: [
      { dueDate: '2026-06-15', amount: 462500, status: 'paid' },
      { dueDate: '2026-09-15', amount: 462500, status: 'paid' },
      { dueDate: '2026-12-15', amount: 462500, status: 'pending' },
      { dueDate: '2027-03-15', amount: 462500, status: 'pending' }
    ]
  }
};

export const performanceData = [
  { period: '1M', value: 1.85 },
  { period: '3M', value: 4.2 },
  { period: '6M', value: 8.7 },
  { period: '1Y', value: 14.2 },
  { period: '3Y', value: 11.8 },
  { period: '5Y', value: 13.1 },
  { period: 'ALL', value: 12.6 }
];