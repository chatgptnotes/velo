# Velo - Premium Wealth Management Platform

A sophisticated wealth management platform designed for high-net-worth individuals (HNIs) with institutional-grade features and elegant dark theme design.

## 🌟 Features

- **Portfolio Intelligence** - Advanced analytics and real-time market insights
- **Tax Optimization** - Comprehensive tax planning and loss harvesting strategies  
- **Risk Analysis** - Institutional-grade risk assessment and portfolio optimization
- **Goal Tracking** - Intelligent goal planning with SIP recommendations
- **Document Vault** - AES-256 encrypted document storage and management
- **Premium UI/UX** - Dark theme with gold accents, mobile-responsive design

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel

## 🎨 Design System

- **Background**: `#0F1419` (Deep Dark)
- **Cards**: `#1A1F2E` (Dark Navy)  
- **Gold Accent**: `#D4AF37` (Classic Gold)
- **Silver**: `#C0C0C0`
- **Success**: `#00C853` (Green)
- **Danger**: `#FF1744` (Red)
- **Text**: `#F5F5F5` (Primary), `#9E9E9E` (Secondary)

## 📱 Pages

1. **Landing Page** (`/`) - Premium dark landing with features showcase
2. **Login** (`/login`) - Elegant authentication with exclusive access feel
3. **Dashboard** (`/dashboard`) - Net worth overview, asset allocation, performance charts
4. **Portfolio** (`/portfolio`) - Complete holdings table with P&L and filters
5. **Tax Center** (`/tax`) - Capital gains, deductions tracker, tax optimization
6. **Goals** (`/goals`) - Financial goal tracking with progress indicators
7. **Risk Analysis** (`/risk`) - Portfolio risk scoring and optimization recommendations
8. **Documents** (`/documents`) - Secure encrypted document vault
9. **Settings** (`/settings`) - Profile, security, notifications, data export

## 🔐 Mock Data Context

Portfolio designed for Indian HNI context (~₹2.5 Crore total):

- **Equity**: Mix of blue-chip stocks (Reliance, TCS, HDFC Bank) + mutual funds
- **Real Estate**: Residential (₹45L) + Commercial (₹80L) properties
- **Fixed Income**: Bank FDs, Government bonds  
- **Gold**: Physical gold + Sovereign Gold Bonds
- **Returns**: 14.2% CAGR over 5 years with realistic Indian market data

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

## 📦 Build Rules

- ✅ No emojis in UI (lucide-react icons only)
- ✅ No em-dashes (use commas/periods)
- ✅ Footer: "drmhope.com | A Bettroi Product" + version
- ✅ Auto-versioning on git push (bump-version.sh + pre-push hook)
- ✅ TypeScript strict mode, no 'any' types
- ✅ Mobile-first responsive design
- ✅ Supabase integration with RLS policies

## 🌐 Deployment

**Live URL**: https://velo-two-tau.vercel.app

**Demo Access**: Use any email/password to sign in (authentication is mocked)

## 🔗 Links

- **Repository**: https://github.com/chatgptnotes/velo
- **Supabase Project**: ltlcydzsgrkywxretkww
- **Design Inspiration**: JP Morgan Private Bank, UBS Wealth Management

---

**drmhope.com | A Bettroi Product | v1.0.0**