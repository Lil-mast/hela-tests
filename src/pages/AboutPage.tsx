import React, { useState } from 'react';
import { MessageCircle, CheckCircle, Mail, ChevronRight, Users, Target, Shield, Zap, Heart, Building, TrendingUp, BarChart3, DollarSign, Clock, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';

const AboutPage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLogin={handleLogin} />
      
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
            Hela isn't just another finance app — it's an investment in your financial freedom
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageCircle className="h-12 w-12 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              About Hela
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Designed to reduce daily stress, help you make smarter decisions, and empower long-term success, 
            whether you're a student, a parent, or a business leader.
          </p>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <strong>Built in Kenya. Scaling across Africa. Ready for the world.</strong>
          </p>
        </section>

        {/* Mission */}
        <section className="mb-20">
          <div className="bg-primary-50 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Target className="h-8 w-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <blockquote className="text-xl font-medium text-gray-700 italic leading-relaxed">
              "To empower individuals and businesses — in Kenya, Africa, and beyond — to take control 
              of their financial lives through intuitive tools, intelligent guidance, and real-time support."
            </blockquote>
          </div>
        </section>

        {/* Why Hela is an Investment, Not a Burden */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Why Hela is an Investment, Not a Burden</h2>
            </div>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-8">
              <p>
                <strong>Financial clarity is a foundational need, not a luxury.</strong> Every shilling you invest in Hela 
                returns exponentially through better decisions, reduced stress, and achieved goals.
              </p>
              
              <div className="bg-white rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Real Investment Returns:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Time Savings:</strong> 5+ hours monthly on financial planning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Peace of Mind:</strong> 80% reduction in money-related stress</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Better Habits:</strong> Automated good financial behaviors</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Goal Achievement:</strong> 3x more likely to reach targets</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Savings Growth:</strong> Average 40% increase in monthly savings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>24/7 Support:</strong> AI advisor always available</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-100 rounded-lg p-6 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900 mb-2">💰 Real Example:</h4>
                <p className="text-green-800">
                  A student paying Ksh 100/month for Hela Pro typically saves an additional Ksh 3,000–5,000 monthly 
                  through better budgeting awareness, bill reminders (avoiding late fees), and goal-focused spending. 
                  That's a 30-50x return on investment!
                </p>
              </div>
              
              <p>
                Hela doesn't just track your money — it transforms your relationship with money. You stop reacting 
                to financial emergencies and start proactively building the life you want.
              </p>
            </div>
          </div>
        </section>

        {/* How Hela for Business Empowers Growth */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Building className="h-8 w-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">How Hela for Business Empowers Growth</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Business Challenges */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  Financial Issues Businesses Face
                </h3>
                <div className="space-y-3">
                  {[
                    'Inconsistent cash flow tracking',
                    'Poor expense recordkeeping',
                    'Missed bill payments and late fees',
                    'Slow financial insights and reporting',
                    'No budget discipline across teams',
                    'Lack of growth forecasting',
                    'Manual, error-prone processes'
                  ].map((issue, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-800 text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hela Solutions */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  How Hela for Business Solves This
                </h3>
                <div className="space-y-3">
                  {[
                    'Real-time cash flow dashboards',
                    'Automated expense categorization',
                    'Smart bill reminders and alerts',
                    'AI-powered financial insights',
                    'Team budget accountability tools',
                    'Growth analytics and forecasting',
                    'Multi-user collaboration features'
                  ].map((solution, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 text-sm">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                🚀 Hela for Business: Your Most Cost-Effective Team Member
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Cost Savings</h4>
                  <p className="text-sm text-gray-600">80% less than hiring financial staff</p>
                </div>
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Better Insights</h4>
                  <p className="text-sm text-gray-600">Real-time data, not monthly reports</p>
                </div>
                <div className="text-center">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Instant Setup</h4>
                  <p className="text-sm text-gray-600">Start in minutes, not months</p>
                </div>
              </div>
              <p className="text-center text-gray-700">
                Instead of overhead costs, think of Hela for Business as an investment that pays for itself 
                through better cash flow management, reduced late fees, and data-driven growth decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why We Exist
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                We believe the future of finance belongs to the people. You shouldn't need to be a 
                financial expert to build the life you want.
              </p>
              <p>
                Hela exists to give everyone access to the tools, insights, and personalized AI support 
                to succeed financially — no matter where you start.
              </p>
              <p>
                We're not here to replace human judgment, but to enhance it with intelligent technology 
                that understands your unique situation and goals.
              </p>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-20">
          <div className="bg-secondary-50 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="h-8 w-8 text-secondary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <blockquote className="text-xl font-medium text-gray-700 italic leading-relaxed">
              "To become the most trusted AI-powered financial empowerment platform — delivering 
              powerful and easy-to-use tools that scale with you, your goals, and your business."
            </blockquote>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Makes Hela Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "We don't replace people — we equip them",
                description: "Our AI enhances your decision-making rather than making decisions for you"
              },
              {
                icon: Heart,
                title: "We build around people, not into them",
                description: "Our tools adapt to your lifestyle and preferences, not the other way around"
              },
              {
                icon: Target,
                title: "We start small but scale meaningfully",
                description: "Begin with simple goals and grow into comprehensive financial management"
              },
              {
                icon: Shield,
                title: "Security and privacy first",
                description: "Your financial data deserves world-class protection, and that's what we deliver"
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who We Serve */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Who We Serve
          </h2>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
            <p className="text-xl text-gray-700 mb-6 font-medium">
              Students. Freelancers. Parents. Hustlers. CEOs. SMEs. Enterprises.
            </p>
            <p className="text-lg text-gray-600">
              If you want to thrive, we'll build alongside you.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Values We Live By
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Transparency",
                description: "Brutal honesty in every insight",
                color: "primary"
              },
              {
                title: "Empowerment",
                description: "Build tools that give control to the user",
                color: "secondary"
              },
              {
                title: "Inclusion",
                description: "Designed for all classes, not just a few",
                color: "accent"
              },
              {
                title: "Security",
                description: "Financial data deserves world-class protection",
                color: "success"
              },
              {
                title: "Innovation",
                description: "We push boundaries with technology and people",
                color: "primary"
              },
              {
                title: "Authenticity",
                description: "We stay true to our African roots and global vision",
                color: "secondary"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Want to Connect?
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-lg text-gray-700 mb-6">
              Interested in partnering with us or joining the mission?
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-primary-600" />
              <a 
                href="mailto:hello@hela.africa" 
                className="text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                hello@hela.africa
              </a>
            </div>
            <p className="text-gray-600 font-medium mb-8">
              We're building the future — and you're invited.
            </p>
            
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary-700 hover:shadow-xl hover:scale-105"
            >
              Get Started
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </section>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default AboutPage;