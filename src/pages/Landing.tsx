import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import {
  TrendingUp, Shield, Calculator, FileText, Star,
  Lock, Award, ArrowRight, PieChart,
  Wallet, ChevronRight, Gem, Target, Check,
} from 'lucide-react'

const FEATURES = [
  { icon: PieChart, title: 'Portfolio Intelligence', desc: 'Real-time analytics across equities, mutual funds, FDs, real estate, and gold with AI-driven rebalancing.' },
  { icon: Calculator, title: 'Tax Optimization', desc: 'LTCG/STCG tracking, Section 80C/80D progress, tax-loss harvesting, and advance tax calendar.' },
  { icon: FileText, title: 'Estate Planning', desc: 'Secure document vault, nominee management, and succession planning for generational wealth transfer.' },
  { icon: Shield, title: 'Risk Management', desc: 'Stress testing, concentration analysis, and diversification scoring for portfolio resilience.' },
]

const STATS = [
  { value: 2500, suffix: '+', label: 'HNI Clients' },
  { value: 12000, prefix: '\u20B9', suffix: ' Cr', label: 'AUM Managed' },
  { value: 18.2, suffix: '%', label: 'Avg. CAGR' },
  { value: 99.9, suffix: '%', label: 'Uptime' },
]

const TESTIMONIALS = [
  { name: 'Rajesh Agarwal', role: 'Technology Entrepreneur', content: 'Velo transformed how I manage my portfolio. The tax optimization alone saved me 15 lakhs last year.', initials: 'RA' },
  { name: 'Priya Sharma', role: 'Investment Banking MD', content: 'Finally, a platform that understands the complexity of HNI portfolios in India. The risk analysis is exceptional.', initials: 'PS' },
  { name: 'Vikram Malhotra', role: 'Real Estate Investor', content: 'Estate planning and multi-asset tracking across 2.5 Crore portfolio. Exactly what I needed.', initials: 'VM' },
]

const PRICING = [
  { name: 'Essential', price: '9,999', period: '/month', features: ['Portfolio tracking up to 2Cr', 'Basic tax reports', 'Email support', '5 document uploads'], cta: 'Start Free Trial' },
  { name: 'Professional', price: '24,999', period: '/month', features: ['Unlimited portfolio size', 'Advanced tax optimization', 'Priority support', 'Unlimited documents', 'Family portfolio', 'Risk analysis'], cta: 'Get Started', popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['White-glove onboarding', 'Dedicated advisor', 'API access', 'Custom reporting', 'Multi-entity support', 'SLA guarantee'], cta: 'Contact Sales' },
]

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        const start = performance.now()
        const duration = 1500
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(value * eased)
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  const formatted = Number.isInteger(value) ? Math.round(display).toLocaleString('en-IN') : display.toFixed(1)
  return <div ref={ref}>{prefix}{formatted}{suffix}</div>
}

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#0F4C75] flex items-center justify-center">
                <Gem className="w-5 h-5 text-[#B8860B]" />
              </div>
              <span className="text-xl font-bold text-[#0F4C75] tracking-tight">Velo</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 font-medium">
              <a href="#features" className="hover:text-[#0F4C75] transition-colors">Features</a>
              <a href="#pricing" className="hover:text-[#0F4C75] transition-colors">Pricing</a>
              <a href="#testimonials" className="hover:text-[#0F4C75] transition-colors">Testimonials</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-gray-600 hover:text-[#0F4C75] font-medium">Sign In</Link>
              <Link to="/dashboard" className="text-sm bg-[#0F4C75] text-white px-4 py-2 rounded-lg hover:bg-[#093049] transition-colors font-medium">Client Access</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FAFBFC] via-white to-[#F0F7FF]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B8860B] rounded-full blur-[250px] opacity-[0.04]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0F4C75] rounded-full blur-[250px] opacity-[0.05]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-[#B8860B]/10 text-[#8B6914] px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider">
              <Gem className="w-3.5 h-3.5" />
              Private Wealth Management
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F4C75] leading-tight mb-6">
              Intelligent Wealth
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Preservation</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed">
              Institutional-grade portfolio management, tax optimization, and estate planning
              designed for India's distinguished investors.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/dashboard" className="inline-flex items-center gap-2 bg-[#0F4C75] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#093049] transition-all shadow-lg shadow-[#0F4C75]/20 hover:shadow-[#0F4C75]/30 hover:-translate-y-0.5">
                <Wallet className="w-4 h-4" />
                View Demo Portfolio
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 border-2 border-[#0F4C75]/20 text-[#0F4C75] px-6 py-3 rounded-xl font-semibold hover:border-[#0F4C75] transition-all">
                Request Access
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mini portfolio card */}
          <div className="hidden lg:block absolute top-20 right-8 w-80" style={{ animation: 'fade-in 0.6s ease-out 0.3s both' }}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Net Worth</span>
                <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +14.2% CAGR
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-4">{'\u20B9'}2,47,83,500</div>
              <div className="space-y-2">
                {[
                  { label: 'Equity', pct: 35, color: 'bg-[#0F4C75]' },
                  { label: 'Real Estate', pct: 25, color: 'bg-[#3282B8]' },
                  { label: 'Fixed Income', pct: 20, color: 'bg-[#B8860B]' },
                  { label: 'Gold', pct: 10, color: 'bg-amber-400' },
                  { label: 'Others', pct: 10, color: 'bg-gray-300' },
                ].map((a) => (
                  <div key={a.label} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${a.color}`} />
                    <span className="text-xs text-gray-500 flex-1">{a.label}</span>
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${a.color} transition-all duration-1000`} style={{ width: `${a.pct}%` }} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 w-8 text-right">{a.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: Lock, label: 'Bank-grade Encryption' },
              { icon: Shield, label: 'SOC 2 Type II' },
              { icon: Award, label: 'SEBI Registered' },
              { icon: Target, label: 'Multi-factor Auth' },
            ].map((t, i) => {
              const Icon = t.icon
              return (
                <div key={i} className="flex items-center gap-2 text-gray-600">
                  <Icon className="w-4 h-4 text-[#B8860B]" />
                  <span className="text-sm font-medium">{t.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-[#0F4C75] to-[#093049] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="text-sm text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Institutional-Grade Tools</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Everything you need to manage, protect, and grow a distinguished portfolio.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="bg-[#FAFBFC] rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#0F4C75]/20 hover:-translate-y-1 transition-all duration-200 group">
                  <div className="w-11 h-11 rounded-xl bg-[#0F4C75] flex items-center justify-center mb-4 group-hover:bg-[#093049] transition-colors">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-[#FAFBFC] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Simple, Transparent Pricing</h2>
            <p className="text-gray-500">Choose the plan that fits your portfolio.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${plan.popular ? 'bg-[#0F4C75] text-white border-[#0F4C75] shadow-xl scale-105' : 'bg-white border-gray-200'}`}>
                {plan.popular && <div className="text-xs font-semibold text-[#B8860B] uppercase tracking-wider mb-2">Most Popular</div>}
                <h3 className={`text-lg font-bold mb-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  {plan.price !== 'Custom' && <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>{'\u20B9'}</span>}
                  <span className={`text-3xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                      <Check className={`h-4 w-4 flex-shrink-0 ${plan.popular ? 'text-[#B8860B]' : 'text-[#0F4C75]'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.popular ? 'bg-white text-[#0F4C75] hover:bg-gray-100' : 'bg-[#0F4C75]/10 text-[#0F4C75] hover:bg-[#0F4C75]/20'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Trusted by India's HNIs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-[#FAFBFC] rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#B8860B] fill-[#B8860B]" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0F4C75] flex items-center justify-center text-xs font-bold text-white">{t.initials}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0F4C75] to-[#093049]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Elevate Your Wealth?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Join an exclusive community of distinguished investors who trust Velo.</p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-white text-[#0F4C75] px-8 py-3.5 rounded-xl text-base font-bold hover:bg-gray-50 transition-all hover:-translate-y-0.5 shadow-lg">
            Launch Demo
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#093049] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Gem className="w-4 h-4 text-[#B8860B]" />
              <span className="text-white font-bold">Velo</span>
              <span className="text-white/30 text-sm ml-1">Private Wealth Management</span>
            </div>
            <div className="text-xs text-white/30">
              Powered by Velo | drmhope.com | A Bettroi Product | v1.3
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
