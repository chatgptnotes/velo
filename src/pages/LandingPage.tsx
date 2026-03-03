import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  Shield, 
  Calculator, 
  FileText, 
  Star,
  Lock,
  Award
} from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Portfolio Intelligence',
      description: 'Advanced analytics and insights to optimize your investment portfolio with real-time market data.'
    },
    {
      icon: Calculator,
      title: 'Tax Optimization',
      description: 'Sophisticated tax planning strategies to minimize your liability and maximize after-tax returns.'
    },
    {
      icon: FileText,
      title: 'Estate Planning',
      description: 'Comprehensive estate planning tools to secure your legacy and protect your wealth for generations.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Institutional-grade risk assessment and hedging strategies tailored for high-net-worth portfolios.'
    }
  ]

  const testimonials = [
    {
      name: 'Rajesh Agarwal',
      role: 'Technology Entrepreneur',
      content: 'Velo has transformed how I manage my portfolio. The tax optimization alone saved me ₹15 lakhs last year.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Investment Banking MD',
      content: 'Finally, a wealth management platform that understands the complexity of high-net-worth portfolios in India.',
      rating: 5
    },
    {
      name: 'Vikram Malhotra',
      role: 'Real Estate Investor',
      content: 'The risk analysis and estate planning features are unmatched. Essential for serious wealth management.',
      rating: 5
    }
  ]

  const trustIndicators = [
    { icon: Lock, text: 'Bank-grade encryption' },
    { icon: Shield, text: 'SOC 2 compliant' },
    { icon: Award, text: 'Multi-factor authentication' }
  ]

  return (
    <div className="min-h-screen bg-primary-bg text-primary-text">
      {/* Header */}
      <header className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-primary-gold">Velo</h1>
            </div>
            <Link
              to="/login"
              className="bg-primary-gold text-primary-bg px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Client Access
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-primary-gold">Velo</span>
            <br />
            <span className="text-primary-text">Private Wealth Management</span>
          </h1>
          <p className="text-xl lg:text-2xl text-primary-text-secondary mb-12 max-w-3xl mx-auto">
            Intelligent wealth preservation for distinguished portfolios
          </p>
          <Link
            to="/login"
            className="inline-block bg-primary-gold text-primary-bg px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Request Access
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-text mb-4">
              Institutional-Grade Wealth Management
            </h2>
            <p className="text-lg text-primary-text-secondary max-w-2xl mx-auto">
              Sophisticated tools and strategies designed for high-net-worth individuals who demand excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary-bg" />
                </div>
                <h3 className="text-xl font-semibold text-primary-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-primary-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 border-y border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center justify-center space-x-3">
                <indicator.icon className="w-6 h-6 text-primary-gold" />
                <span className="text-primary-text font-medium">{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-text mb-4">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-primary-card p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary-gold fill-current" />
                  ))}
                </div>
                <p className="text-primary-text mb-6">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-primary-text">{testimonial.name}</div>
                  <div className="text-primary-text-secondary text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-card">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-text mb-6">
            Ready to Elevate Your Wealth Management?
          </h2>
          <p className="text-lg text-primary-text-secondary mb-8">
            Join an exclusive community of discerning investors who trust Velo with their most important financial decisions.
          </p>
          <Link
            to="/login"
            className="inline-block bg-primary-gold text-primary-bg px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Request Access
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-primary-text-secondary text-sm">
              drmhope.com | A Bettroi Product | v1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage