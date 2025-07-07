import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  ChevronRight, 
  ChevronDown,
  Shield,
  Heart,
  Sparkles,
  TrendingUp,
  Target,
  Bell,
  Zap,
  Users,
  Globe,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';

const LandingPage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showFaqDropdown, setShowFaqDropdown] = useState(false);
  const [typingText, setTypingText] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const fullText = "Stop Struggling with Money. Start Thriving.";

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypingText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const features = [
    {
      icon: TrendingUp,
      title: "Smart Financial Insights",
      description: "AI-powered analysis of your spending patterns and personalized recommendations for better financial health.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description: "Set and track financial goals with intelligent progress monitoring and actionable steps to reach them faster.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Never miss bill payments or savings targets with intelligent notifications tailored to your schedule.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your financial data is protected with enterprise-grade encryption and security protocols.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Wanjiku",
      role: "University Student",
      content: "Hela helped me save Ksh 15,000 in just 3 months! The AI insights showed me exactly where my money was going.",
      avatar: "SW",
      rating: 5
    },
    {
      name: "David Kimani",
      role: "Small Business Owner",
      content: "The goal tracking feature is incredible. I finally bought my delivery motorcycle thanks to Hela's guidance.",
      avatar: "DK",
      rating: 5
    },
    {
      name: "Grace Achieng",
      role: "Working Professional",
      content: "I love how Hela understands the Kenyan context. The investment advice for NSE has been spot-on.",
      avatar: "GA",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "What does Hela do?",
      answer: "Hela is your AI-powered financial assistant that helps you budget, save, track expenses, set goals, and get reminders for bills. Think of it as having a personal financial advisor in your pocket, available 24/7 to help you make better money decisions."
    },
    {
      question: "Is Hela safe?",
      answer: "Absolutely. We use bank-grade encryption to protect your data. Your financial information is stored securely and never shared with third parties. We're built with privacy-first principles and comply with international security standards."
    },
    {
      question: "What makes Hela different from other budgeting apps?",
      answer: "Hela is specifically designed for Kenya and Africa. We understand local financial challenges, support Kenyan Shillings, and provide AI insights relevant to your context. Plus, our AI actually talks to you - it's like having a financial advisor who understands your culture and challenges."
    },
    {
      question: "How does the AI actually help me?",
      answer: "Our AI analyzes your spending patterns, suggests budget improvements, reminds you about bills, and answers your financial questions in real-time. It learns from your habits and provides personalized advice - like suggesting you save Ksh 2,000 more this month or warning you about overspending."
    },
    {
      question: "Is it worth the cost?",
      answer: "Most users save 10x more than they spend on Hela. For example, paying Ksh 100/month often helps users save an extra Ksh 3,000-5,000 monthly through better budgeting and spending awareness. It's an investment that pays for itself."
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar onLogin={handleLogin} />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-yellow-500/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="animate-fade-in">
            <div className="glass-card inline-block px-6 py-3 rounded-full mb-8 animate-glow">
              <span className="text-green-400 font-medium text-sm">
                Hela isn't just another finance app — it's an investment in your financial freedom
              </span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-8 font-display">
              <span className="block animate-slide-up stagger-1">
                {typingText}
              </span>
              <span className="block text-gradient animate-slide-up stagger-2 mt-4">
                Built for Africa.
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6 animate-slide-up stagger-3">
              Designed to reduce daily stress, help you make smarter decisions, and empower long-term success, 
              whether you're a student, a parent, or a business leader.
            </p>
            
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 animate-slide-up stagger-4">
              <strong className="text-green-400">Built in Kenya. Scaling across Africa. Ready for the world.</strong>
            </p>

            <div className="glass-card max-w-2xl mx-auto p-8 mb-12 animate-slide-up stagger-5">
              <p className="text-lg font-medium text-white mb-2">
                Financial clarity is a foundational need, not a luxury.
              </p>
              <p className="text-gray-300">
                Hela provides the tools to make progress accessible to everyone.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 animate-scale-in stagger-5">
              <button
                onClick={handleGetStarted}
                className="group relative btn-primary text-lg px-8 py-4 animate-glow"
              >
                Start Your Financial Freedom
                <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={handleLearnMore}
                className="btn-glass text-lg px-8 py-4"
              >
                Learn More
              </button>
            </div>

            {/* FAQ Dropdown */}
            <div className="relative inline-block animate-fade-in stagger-5">
              <button
                onClick={() => setShowFaqDropdown(!showFaqDropdown)}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-sm font-medium">Frequently Asked Questions</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFaqDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showFaqDropdown && (
                <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-96 max-w-[90vw] glass-card rounded-xl z-50 max-h-96 overflow-y-auto animate-scale-in">
                  <div className="p-6">
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <div key={index} className="glass border border-white/10 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                          >
                            <h3 className="font-medium text-white text-sm">{faq.question}</h3>
                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                              expandedFaq === index ? 'rotate-180' : ''
                            }`} />
                          </button>
                          {expandedFaq === index && (
                            <div className="px-4 pb-3 animate-slide-up">
                              <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Chat Preview */}
          <div className="animate-slide-up mt-20 stagger-5">
            <div className="relative mx-auto max-w-lg">
              <div className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-400 flex items-center gap-2">
                    💬 Hela AI
                    <Sparkles className="h-3 w-3 animate-pulse" />
                  </span>
                </div>
                <div className="text-left space-y-3">
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-gray-300">
                      "I want to save Ksh 10,000 for a laptop"
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 text-white">
                    <p className="text-sm">
                      Perfect! Based on your income, save Ksh 2,500 monthly. Cut dining out by 30% and you'll have your laptop in 4 months. Want me to set up automatic reminders?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 animate-slide-up">
              Why Choose <span className="text-gradient">Hela</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up stagger-1">
              Powerful features designed specifically for the African financial landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl card-hover card-glow animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-yellow-500/5"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 animate-slide-up">
              Trusted by <span className="text-gradient">Thousands</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up stagger-1">
              See how Hela is transforming financial lives across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl card-hover animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="glass-card p-12 rounded-2xl animate-scale-in">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your <span className="text-gradient">Financial Future</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of Kenyans who are already building wealth with Hela's AI-powered insights.
            </p>
            <button
              onClick={handleGetStarted}
              className="btn-primary text-lg px-8 py-4 animate-glow"
            >
              Start Your Journey Today
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-dark-secondary/50 text-white py-12 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">Hela</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Contact
              </button>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span>AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span>Built in Kenya</span>
              </div>
            </div>
            <p className="text-gray-500">© 2025 Hela. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default LandingPage;