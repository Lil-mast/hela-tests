import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  Check, 
  Star, 
  ChevronRight,
  Crown,
  Users,
  TrendingUp,
  X,
  ArrowLeft,
  Building,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';

const PlansPage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'basic' | 'pro'>('free');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showPersonalPlansModal, setShowPersonalPlansModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handlePlanSelect = (plan: 'free' | 'basic' | 'pro') => {
    setSelectedPlan(plan);
    setAuthMode('signup');
    setIsAuthModalOpen(true);
    setShowPersonalPlansModal(false);
  };

  const handleGetStartedPersonal = () => {
    setShowPersonalPlansModal(true);
  };

  const personalPlans = [
    {
      id: 'free',
      name: 'Free',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Perfect for getting started with personal finance',
      features: [
        '1 active goal',
        '3 reminders',
        '5 AI chats per month',
        'Basic budget tracking',
        'Mobile app access',
        '3 learning resources per week'
      ],
      limitations: [
        'Limited AI conversations',
        'Basic support only',
        'Limited learning content'
      ],
      popular: false,
      cta: 'Start Free'
    },
    {
      id: 'basic',
      name: 'Basic',
      monthlyPrice: 100,
      yearlyPrice: 1000,
      description: 'Essential tools for better money management',
      features: [
        '5 active goals',
        'Unlimited reminders',
        '50 AI chats per month',
        'Advanced budget tracking',
        'Expense categorization',
        'Goal progress tracking',
        'Email support',
        'Weekly financial reports'
      ],
      limitations: [],
      popular: false,
      cta: 'Start Basic Plan'
    },
    {
      id: 'pro',
      name: 'Pro',
      monthlyPrice: 200,
      yearlyPrice: 2000,
      description: 'Full access to all Hela features',
      features: [
        'Unlimited goals',
        'Unlimited reminders',
        'Unlimited AI chats',
        'Advanced analytics',
        'Smart recommendations',
        'Priority support',
        'Export data',
        'Custom categories',
        'Unlimited learning resources',
        'AI-curated insights',
        'Financial health reports'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Pro Plan'
    }
  ];

  const businessPlans = [
    {
      id: 'small',
      name: 'Small Business',
      monthlyPrice: 1000,
      yearlyPrice: 10000,
      description: 'Perfect for startups and small teams',
      features: [
        'Up to 5 team members',
        'Multi-user dashboards',
        'Team expense tracking',
        'Basic analytics',
        'Bill reminders',
        'Email support',
        'Monthly reports'
      ],
      comingSoon: true
    },
    {
      id: 'growing',
      name: 'Growing Business',
      monthlyPrice: 1500,
      yearlyPrice: 15000,
      description: 'For expanding teams and operations',
      features: [
        'Up to 20 team members',
        'Advanced analytics',
        'Cash flow forecasting',
        'Custom categories',
        'API access',
        'Priority support',
        'Weekly reports'
      ],
      comingSoon: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 2000,
      yearlyPrice: 20000,
      description: 'For large organizations',
      features: [
        'Unlimited team members',
        'Advanced AI insights',
        'Custom integrations',
        'Dedicated support',
        'Real-time analytics',
        'Custom reporting',
        'SLA guarantee'
      ],
      comingSoon: true
    }
  ];

  const getPrice = (plan: any) => {
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return price;
  };

  const getSavings = (plan: any) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return monthlyCost - yearlyCost;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLogin={handleLogin} />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
            Hela isn't just another finance app — it's an investment in your financial freedom
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageCircle className="h-12 w-12 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              Choose Your Plan
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Designed to reduce daily stress, help you make smarter decisions, and empower long-term success, 
            whether you're a student, a parent, or a business leader.
          </p>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <strong>Built in Kenya. Scaling across Africa. Ready for the world.</strong>
          </p>
        </div>
      </section>

      {/* Choose Your Hela Experience Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Choose Your Hela Experience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Personal Use */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border-2 border-primary-200 hover:border-primary-300 transition-all duration-200 hover:shadow-lg">
              <div className="h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal Finance</h3>
              <p className="text-gray-600 mb-6">
                Perfect for individuals, students, and families. Track expenses, set goals, 
                get AI-powered insights, and build better financial habits.
              </p>
              <ul className="text-left space-y-2 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Personal budget tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">AI financial assistant</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Goal tracking & reminders</span>
                </li>
              </ul>
              <button
                onClick={handleGetStartedPersonal}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                View Personal Plans
              </button>
            </div>

            {/* Business Use */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-secondary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Coming Soon
              </div>
              <div className="h-16 w-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hela for Business</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive financial management for SMEs and enterprises. 
                Team collaboration, advanced analytics, and business intelligence.
              </p>
              <ul className="text-left space-y-2 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Multi-user accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Business analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Team collaboration</span>
                </li>
              </ul>
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Plans Preview */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🏢 Hela for Business Plans (Coming Soon)
            </h2>
            <p className="text-lg text-gray-600">
              Powerful financial management tools for teams and organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessPlans.map((plan) => (
              <div
                key={plan.id}
                className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 opacity-75"
              >
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Coming Soon
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      Ksh {billingCycle === 'monthly' ? plan.monthlyPrice.toLocaleString() : (plan.yearlyPrice / 12).toLocaleString()}
                    </span>
                    <span className="text-gray-600 ml-1">/{billingCycle === 'monthly' ? 'month' : 'month (billed yearly)'}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
                >
                  Join Waitlist
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🚀 Why Businesses Choose Hela
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Real-time Insights</h4>
                  <p className="text-sm text-gray-600">Live financial data, not monthly reports</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Team Collaboration</h4>
                  <p className="text-sm text-gray-600">Multi-user dashboards and accountability</p>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">AI-Powered</h4>
                  <p className="text-sm text-gray-600">Smart insights and automated tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <MessageCircle className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">Hela</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <button className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                Contact
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 Hela. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Personal Plans Modal */}
      {showPersonalPlansModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowPersonalPlansModal(false)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium">Back to Plans</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowPersonalPlansModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-4">
                <h2 className="text-3xl font-bold text-gray-900">Personal Plans</h2>
                <p className="text-lg text-gray-600 mt-2">
                  Start free, upgrade when you're ready. All plans include 7-day free trial.
                </p>
              </div>

              {/* Billing Toggle */}
              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      billingCycle === 'monthly'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      billingCycle === 'yearly'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Yearly
                    <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      Save 17%
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content - Pricing Plans */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {personalPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl p-8 border-2 transition-all duration-200 hover:shadow-lg ${
                      plan.popular
                        ? 'border-primary-500 bg-white shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          Most Popular
                        </div>
                      </div>
                    )}
                    
                    {billingCycle === 'yearly' && plan.id !== 'free' && (
                      <div className="absolute -top-4 right-4">
                        <div className="bg-success-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Save Ksh {getSavings(plan)}
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-2">
                        <span className="text-3xl font-bold text-gray-900">
                          Ksh {getPrice(plan).toLocaleString()}
                        </span>
                        <span className="text-gray-600 ml-1">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && plan.id !== 'free' && (
                        <p className="text-sm text-green-600 font-medium">
                          Ksh {(getPrice(plan) / 12).toFixed(0)}/month when billed yearly
                        </p>
                      )}
                      <p className="text-gray-600 mt-2">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-success-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center gap-3 opacity-60">
                          <div className="h-5 w-5 border border-gray-300 rounded flex-shrink-0"></div>
                          <span className="text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handlePlanSelect(plan.id as 'free' | 'basic' | 'pro')}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-gray-500">
                  All paid plans include a 7-day free trial. Cancel anytime during the trial period.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default PlansPage;