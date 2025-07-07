import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { 
  BookOpen, 
  Video, 
  FileText, 
  ExternalLink, 
  Lock, 
  MessageCircle,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Crown,
  Search,
  Filter,
  Star,
  Bookmark,
  BookmarkCheck,
  Play,
  Clock,
  CheckCircle,
  BarChart3
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'guide';
  category: string;
  url: string;
  duration?: string;
  isPremium: boolean;
  featured?: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isBookmarked?: boolean;
  isCompleted?: boolean;
}

interface CategoryProgress {
  category: string;
  completed: number;
  total: number;
  percentage: number;
}

const LearnPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewedCount, setViewedCount] = useState(2);
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>(['1', '3']);
  const [completedResources, setCompletedResources] = useState<string[]>(['1', '8']);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'budgeting', name: 'Budgeting', icon: DollarSign },
    { id: 'earning', name: 'Earning Online', icon: TrendingUp },
    { id: 'investing', name: 'Investing', icon: Target },
    { id: 'business', name: 'Starting a Business', icon: Users }
  ];

  const allResources: Resource[] = [
    {
      id: '1',
      title: 'How to Budget in Kenya for Beginners',
      description: 'Complete guide to creating your first budget with Kenyan examples and local bank integration.',
      type: 'video',
      category: 'budgeting',
      url: 'https://youtube.com/watch?v=example1',
      duration: '15 min',
      isPremium: false,
      featured: true,
      difficulty: 'beginner',
      isBookmarked: true,
      isCompleted: true
    },
    {
      id: '2',
      title: 'Top 5 Digital Hustles in Kenya 2025',
      description: 'Discover the most profitable online opportunities for Kenyans, from freelancing to e-commerce.',
      type: 'article',
      category: 'earning',
      url: 'https://example.com/digital-hustles',
      isPremium: false,
      featured: true,
      difficulty: 'beginner'
    },
    {
      id: '3',
      title: 'AI & Business Growth for African Entrepreneurs',
      description: 'How African entrepreneurs are leveraging AI tools to scale their businesses faster.',
      type: 'guide',
      category: 'business',
      url: 'https://example.com/ai-business',
      isPremium: true,
      featured: true,
      difficulty: 'advanced',
      isBookmarked: true
    },
    {
      id: '4',
      title: 'Emergency Fund Calculator for Kenya',
      description: 'Calculate how much you need in your emergency fund based on Kenyan living costs.',
      type: 'guide',
      category: 'budgeting',
      url: 'https://example.com/emergency-fund',
      isPremium: false,
      difficulty: 'beginner'
    },
    {
      id: '5',
      title: 'Investing in NSE: Beginner\'s Guide',
      description: 'Step-by-step guide to start investing in the Nairobi Securities Exchange.',
      type: 'video',
      category: 'investing',
      url: 'https://youtube.com/watch?v=example2',
      duration: '25 min',
      isPremium: true,
      difficulty: 'intermediate'
    },
    {
      id: '6',
      title: 'M-Pesa Business: Complete Setup Guide',
      description: 'How to start and grow an M-Pesa business in Kenya with real profit calculations.',
      type: 'article',
      category: 'business',
      url: 'https://example.com/mpesa-business',
      isPremium: true,
      difficulty: 'intermediate'
    },
    {
      id: '7',
      title: 'Side Hustles That Pay in USD',
      description: 'Remote work opportunities that pay in foreign currency for Kenyan professionals.',
      type: 'article',
      category: 'earning',
      url: 'https://example.com/usd-hustles',
      isPremium: true,
      difficulty: 'intermediate'
    },
    {
      id: '8',
      title: 'Retirement Planning in Your 20s',
      description: 'Why starting early matters and how to build wealth for retirement in Kenya.',
      type: 'guide',
      category: 'investing',
      url: 'https://example.com/retirement-20s',
      isPremium: false,
      difficulty: 'beginner',
      isCompleted: true
    }
  ];

  const isPremiumUser = false;
  const freeLimit = 3;

  const canView = (resource: Resource) => {
    if (isPremiumUser) return true;
    if (!resource.isPremium) return true;
    return viewedCount < freeLimit;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'article': return FileText;
      case 'guide': return BookOpen;
      default: return FileText;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success-100 text-success-700';
      case 'intermediate': return 'bg-warning-100 text-warning-700';
      case 'advanced': return 'bg-error-100 text-error-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleResourceClick = (resource: Resource) => {
    if (!canView(resource)) {
      return;
    }
    
    if (resource.isPremium && !isPremiumUser) {
      setViewedCount(prev => prev + 1);
    }
    
    window.open(resource.url, '_blank');
  };

  const toggleBookmark = (resourceId: string) => {
    setBookmarkedResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const markAsCompleted = (resourceId: string) => {
    setCompletedResources(prev => 
      prev.includes(resourceId) 
        ? prev
        : [...prev, resourceId]
    );
  };

  const filteredResources = allResources.filter(resource => {
    if (selectedCategory !== 'all' && resource.category !== selectedCategory) return false;
    if (selectedType !== 'all' && resource.type !== selectedType) return false;
    if (selectedDifficulty !== 'all' && resource.difficulty !== selectedDifficulty) return false;
    if (searchTerm && !resource.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !resource.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const featuredResources = allResources.filter(resource => resource.featured);
  const bookmarkedResourcesList = allResources.filter(resource => bookmarkedResources.includes(resource.id));

  // Calculate category progress
  const categoryProgress: CategoryProgress[] = categories
    .filter(cat => cat.id !== 'all')
    .map(category => {
      const categoryResources = allResources.filter(r => r.category === category.id);
      const completed = categoryResources.filter(r => completedResources.includes(r.id)).length;
      return {
        category: category.name,
        completed,
        total: categoryResources.length,
        percentage: categoryResources.length > 0 ? (completed / categoryResources.length) * 100 : 0
      };
    });

  // AI-powered content suggestions based on user profile
  const getPersonalizedSuggestions = () => {
    const userAge = 25; // Mock user age
    const userGoals = ['laptop', 'emergency fund']; // Mock user goals
    
    if (userAge < 30) {
      return [
        "Start with budgeting basics to build strong financial habits",
        "Learn about emergency funds - your financial safety net",
        "Explore side hustles to increase your income",
        "Understand compound interest and start investing early"
      ];
    } else {
      return [
        "Focus on advanced investment strategies",
        "Learn about retirement planning and pension schemes",
        "Explore business opportunities and entrepreneurship",
        "Understand tax optimization strategies"
      ];
    }
  };

  const aiPrompts = [
    "How do I improve my budget?",
    "What's the best side hustle in Kenya right now?",
    "How much should I save for retirement?",
    "What investment options are available in Kenya?"
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout 
      title="Learn. Grow. Build Wealth."
      subtitle="Curated resources to help you budget better, earn smarter, and invest wisely"
    >
      <div className="space-y-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="video">Videos</option>
                  <option value="article">Articles</option>
                  <option value="guide">Guides</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedType('all');
                    setSelectedDifficulty('all');
                    setSearchTerm('');
                  }}
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Usage Limit for Free Users */}
        {!isPremiumUser && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Crown className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900">Free Plan Limit</h3>
                  <p className="text-sm text-amber-700">
                    You've viewed {viewedCount} of {freeLimit} premium resources this week
                  </p>
                </div>
              </div>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Upgrade Plan
              </button>
            </div>
          </div>
        )}

        {/* Progress Tracker */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">Your Learning Progress</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryProgress.map((progress, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{progress.category}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {progress.completed} of {progress.total} completed ({Math.round(progress.percentage)}%)
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bookmarked Resources */}
        {bookmarkedResourcesList.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Bookmark className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Bookmarked for Later</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedResourcesList.slice(0, 3).map((resource) => {
                const TypeIcon = getTypeIcon(resource.type);
                const canViewResource = canView(resource);
                
                return (
                  <div
                    key={resource.id}
                    className={`border border-gray-200 rounded-lg p-4 transition-all duration-200 ${
                      canViewResource 
                        ? 'hover:shadow-md hover:border-gray-300 cursor-pointer' 
                        : 'opacity-60'
                    }`}
                    onClick={() => canViewResource && handleResourceClick(resource)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-4 w-4 text-primary-600" />
                        {resource.duration && (
                          <span className="text-xs text-gray-500">{resource.duration}</span>
                        )}
                      </div>
                      <BookmarkCheck className="h-4 w-4 text-primary-600" />
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">{resource.title}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(resource.difficulty)}`}>
                        {resource.difficulty}
                      </span>
                      {completedResources.includes(resource.id) && (
                        <CheckCircle className="h-4 w-4 text-success-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Featured This Week */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            🔥 Featured This Week
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              const canViewResource = canView(resource);
              const isBookmarked = bookmarkedResources.includes(resource.id);
              const isCompleted = completedResources.includes(resource.id);
              
              return (
                <div
                  key={resource.id}
                  className={`relative border border-gray-200 rounded-lg p-4 transition-all duration-200 ${
                    canViewResource 
                      ? 'hover:shadow-md hover:border-gray-300 cursor-pointer' 
                      : 'opacity-60'
                  }`}
                >
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    {resource.isPremium && (
                      canViewResource ? (
                        <Crown className="h-4 w-4 text-amber-500" />
                      ) : (
                        <Lock className="h-4 w-4 text-gray-400" />
                      )
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(resource.id);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4 text-primary-600" />
                      ) : (
                        <Bookmark className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <TypeIcon className="h-4 w-4 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {resource.type}
                          </span>
                          {resource.duration && (
                            <span className="text-xs text-gray-400">{resource.duration}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                          {categories.find(c => c.id === resource.category)?.name}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <CheckCircle className="h-4 w-4 text-success-600" />
                        )}
                        {canViewResource ? (
                          resource.type === 'video' ? (
                            <Play className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ExternalLink className="h-4 w-4 text-gray-400" />
                          )
                        ) : (
                          <Lock className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {canViewResource && !isCompleted && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsCompleted(resource.id);
                      }}
                      className="mt-3 w-full bg-success-50 text-success-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-success-100 transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* All Resources */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            All Resources ({filteredResources.length})
          </h2>
          
          <div className="space-y-4">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              const canViewResource = canView(resource);
              const isBookmarked = bookmarkedResources.includes(resource.id);
              const isCompleted = completedResources.includes(resource.id);
              
              return (
                <div
                  key={resource.id}
                  className={`flex items-center gap-4 p-4 border border-gray-200 rounded-lg transition-all duration-200 ${
                    canViewResource 
                      ? 'hover:shadow-md hover:border-gray-300 cursor-pointer' 
                      : 'opacity-60'
                  }`}
                >
                  <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TypeIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                      {resource.isPremium && (
                        canViewResource ? (
                          <Crown className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Lock className="h-4 w-4 text-gray-400" />
                        )
                      )}
                      {isCompleted && (
                        <CheckCircle className="h-4 w-4 text-success-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        {categories.find(c => c.id === resource.category)?.name}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(resource.difficulty)}`}>
                        {resource.difficulty}
                      </span>
                      {resource.duration && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {resource.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(resource.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark for later'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4 text-primary-600" />
                      ) : (
                        <Bookmark className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    
                    {canViewResource ? (
                      resource.type === 'video' ? (
                        <Play className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ExternalLink className="h-5 w-5 text-gray-400" />
                      )
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hela AI Tips */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">🧠 Personalized Tips from Hela AI</h2>
              <p className="text-sm text-gray-600">Based on your profile and learning progress</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {getPersonalizedSuggestions().map((suggestion, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-primary-200">
                <p className="text-sm text-gray-700">💡 {suggestion}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-primary-200 pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Ask Hela AI anything:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => navigate('/chat')}
                  className="text-left p-3 bg-white rounded-lg border border-primary-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
                >
                  <p className="text-sm text-gray-700">"{prompt}"</p>
                </button>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/chat')}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Chat with Hela AI
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade CTA for Free Users */}
        {!isPremiumUser && viewedCount >= freeLimit && (
          <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Want More Learning Resources?</h3>
            <p className="text-gray-300 mb-6">
              Upgrade to Pro for unlimited access to all premium content, AI-curated insights, and personalized learning paths.
            </p>
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Upgrade Your Plan
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LearnPage;