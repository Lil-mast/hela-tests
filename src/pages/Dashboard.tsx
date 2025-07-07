import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useIntegration } from '../contexts/IntegrationContext';
import CollapsibleSidebar from '../components/CollapsibleSidebar';
import ConnectCard from '../components/ConnectCard';
import EmptyState from '../components/EmptyState';
import { 
  MessageCircle, 
  Sparkles,
  BookOpen,
  ChevronRight,
  Bot,
  Zap,
  TrendingUp,
  Target,
  Bell,
  RefreshCw,
  Star,
  Clock,
  Users
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { integrationStatus, userFinancialData, connectService, syncData, isLoading } = useIntegration();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Mock AI-generated daily content
  const dailyContent = [
    {
      id: '1',
      title: 'Smart Saving: The 52-Week Challenge for Kenyans',
      excerpt: 'Start with Ksh 50 in week 1, increase by Ksh 50 each week. By week 52, you\'ll have saved over Ksh 68,000!',
      category: 'Savings Tips',
      readTime: '3 min read',
      isNew: true
    },
    {
      id: '2',
      title: 'NSE Investment Guide: Top 5 Stocks for Beginners',
      excerpt: 'Discover beginner-friendly stocks on the Nairobi Securities Exchange with strong fundamentals and growth potential.',
      category: 'Investing',
      readTime: '5 min read',
      isNew: true
    },
    {
      id: '3',
      title: 'Mobile Money Mastery: Maximizing M-Pesa for Your Business',
      excerpt: 'Learn advanced M-Pesa features that can streamline your business operations and reduce transaction costs.',
      category: 'Business',
      readTime: '4 min read',
      isNew: false
    }
  ];

  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">
      <CollapsibleSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-500/20 to-yellow-500/20 backdrop-blur-lg border-b border-white/10 p-4 sm:p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="animate-slide-up">
              <div className="glass-card inline-block px-4 py-2 rounded-full text-green-400 text-sm font-medium mb-3">
                Your investment in financial freedom is paying off
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {getGreeting()}, {user?.name?.split(' ')[0] || 'there'}! 👋
              </h1>
              <p className="text-gray-300 text-sm sm:text-base">
                Every day with Hela is a step toward financial clarity and peace of mind.
              </p>
            </div>
            <div className="hidden md:block animate-float">
              <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center animate-glow">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-full">
            <div className="max-w-7xl mx-auto space-y-8">
              
              {!integrationStatus.hasAnyConnection ? (
                /* No Connections - Show Integration Options */
                <div className="space-y-8">
                  <div className="glass-card p-8 rounded-2xl animate-slide-up">
                    <div className="text-center mb-8">
                      <div className="h-20 w-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                        <Zap className="h-10 w-10 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-4">Connect Your Financial Accounts</h2>
                      <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Once you connect to M-Pesa, Ziidi, and other services, this page will display your spending, 
                        income, and saving summaries with helpful AI tips.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {integrationStatus.availableServices.map((service, index) => (
                        <div key={service.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                          <ConnectCard
                            service={service}
                            onConnect={connectService}
                            isLoading={isLoading}
                            className="card-hover card-glow"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preview of what's coming */}
                  <div className="glass-card p-8 rounded-2xl animate-slide-up stagger-1">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      🚀 What You'll See After Connecting
                      <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="glass p-6 rounded-xl card-hover">
                        <div className="flex items-center gap-3 mb-3">
                          <TrendingUp className="h-6 w-6 text-green-400" />
                          <h4 className="font-medium text-white">Smart Insights</h4>
                        </div>
                        <p className="text-gray-300 text-sm">AI-powered analysis of your spending patterns and savings opportunities</p>
                      </div>
                      <div className="glass p-6 rounded-xl card-hover">
                        <div className="flex items-center gap-3 mb-3">
                          <Target className="h-6 w-6 text-blue-400" />
                          <h4 className="font-medium text-white">Goal Tracking</h4>
                        </div>
                        <p className="text-gray-300 text-sm">Visual progress tracking for your savings goals and financial milestones</p>
                      </div>
                      <div className="glass p-6 rounded-xl card-hover">
                        <div className="flex items-center gap-3 mb-3">
                          <Bell className="h-6 w-6 text-yellow-400" />
                          <h4 className="font-medium text-white">Smart Reminders</h4>
                        </div>
                        <p className="text-gray-300 text-sm">Never miss bill payments or savings targets with intelligent notifications</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Connected State - Show Financial Overview */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Connected Services Status */}
                  <div className="glass-card p-6 rounded-2xl animate-slide-up">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white">Connected Services</h3>
                      <button
                        onClick={syncData}
                        disabled={isLoading}
                        className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                      >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Sync
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {integrationStatus.connectedServices.map((service) => (
                        <div key={service.id} className="glass p-4 rounded-xl border border-green-500/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{service.icon}</span>
                              <div>
                                <p className="font-medium text-white">{service.name}</p>
                                <p className="text-xs text-gray-400">
                                  Last sync: {service.lastSync ? new Date(service.lastSync).toLocaleString() : 'Never'}
                                </p>
                              </div>
                            </div>
                            <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="glass-card p-6 rounded-2xl animate-slide-up stagger-1">
                    <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate('/transactions')}
                        className="w-full flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-colors group"
                      >
                        <span className="font-medium text-white">View Transactions</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </button>
                      <button
                        onClick={() => navigate('/budget')}
                        className="w-full flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-colors group"
                      >
                        <span className="font-medium text-white">Manage Budget</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </button>
                      <button
                        onClick={() => navigate('/savings')}
                        className="w-full flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-colors group"
                      >
                        <span className="font-medium text-white">Check Savings</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Daily AI Content */}
              <div className="glass-card p-8 rounded-2xl card-hover cursor-pointer animate-slide-up stagger-2" onClick={() => navigate('/learn')}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        Daily Financial Insights
                        <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                      </h3>
                      <p className="text-sm text-gray-400">Updated daily by AI • Curated for you</p>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {dailyContent.map((content, index) => (
                    <div key={content.id} className="relative glass p-6 rounded-xl card-hover" style={{ animationDelay: `${index * 0.1}s` }}>
                      {content.isNew && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          New
                        </div>
                      )}
                      <div className="mb-4">
                        <span className="text-xs font-medium text-green-400 bg-green-500/20 px-3 py-1 rounded-full">
                          {content.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white mb-3 text-sm leading-tight">
                        {content.title}
                      </h4>
                      <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                        {content.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-400">{content.readTime}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat with Hela Button */}
              <div className="glass-card p-8 rounded-2xl bg-gradient-to-r from-green-500/10 to-yellow-500/10 card-hover cursor-pointer animate-slide-up stagger-3" onClick={() => navigate('/chat')}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center animate-glow">
                      <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">Chat with Hela AI</h3>
                      <p className="text-gray-300">
                        Get instant answers to your financial questions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-green-400" />
                    <ChevronRight className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="mt-6 glass p-4 rounded-xl">
                  <p className="text-sm text-gray-300 italic">
                    "Ask me anything: How can I save more? What's the best investment for beginners? Help me budget better..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;