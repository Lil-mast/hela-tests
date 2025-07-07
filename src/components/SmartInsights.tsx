import React, { useEffect, useState } from 'react';
import { MessageCircle, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Lightbulb, Sparkles, Bot, AlertTriangle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { openAIService } from '../services/openai';

const SmartInsights: React.FC = () => {
  const { budget, goals, reminders, transactions } = useData();
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(true);
  const [aiStatus, setAiStatus] = useState<'active' | 'limited' | 'error'>('active');

  useEffect(() => {
    const generateAIInsight = async () => {
      try {
        setIsLoadingInsight(true);
        setAiStatus('active');
        
        const context = {
          budget,
          goals: goals.filter(g => g.status === 'active').map(g => ({
            name: g.name,
            targetAmount: g.targetAmount,
            currentAmount: g.currentAmount,
            deadline: g.deadline
          })),
          reminders: reminders.map(r => ({
            title: r.title,
            dueDate: r.nextDue || r.dueDate,
            status: r.status
          }))
        };

        const insight = await openAIService.generateFinancialInsight(context);
        setAiInsight(insight);
        
        // Check if the insight indicates quota issues
        if (insight.includes('high demand') || insight.includes('temporarily limited')) {
          setAiStatus('limited');
        }
      } catch (error) {
        console.error('Error generating AI insight:', error);
        setAiStatus('limited');
        
        // Enhanced fallback insight based on actual data
        const savingsRate = (budget.leftover / budget.income) * 100;
        if (savingsRate >= 20) {
          setAiInsight("🎉 Outstanding! You're saving over 20% of your income - that's excellent financial discipline! Consider exploring investment opportunities like NSE stocks or government bonds to grow your surplus even further.");
        } else if (savingsRate >= 10) {
          setAiInsight(`💪 Great progress! You're saving ${Math.round(savingsRate)}% of your income. To reach the ideal 20%, try reducing one small expense category - even Ksh 1,000 less per month makes a difference!`);
        } else if (savingsRate > 0) {
          setAiInsight(`🌱 Every shilling saved is a step forward! You're currently saving ${Math.round(savingsRate)}% of your income. Start small - try saving just Ksh 500 more each month and gradually increase it.`);
        } else {
          setAiInsight("💡 Building wealth starts with saving your first shilling! Look at your expenses and identify one area where you can cut back by just Ksh 1,000 this month. Small steps lead to big changes!");
        }
      } finally {
        setIsLoadingInsight(false);
      }
    };

    generateAIInsight();
  }, [budget, goals, reminders]);

  const generateInsights = () => {
    const insights = [];
    
    // Budget insights
    const savingsRate = (budget.leftover / budget.income) * 100;
    if (savingsRate >= 20) {
      insights.push({
        type: 'positive',
        icon: CheckCircle,
        avatar: '🎉',
        title: 'Hela says: You\'re a savings superstar!',
        description: `Wow! You're saving ${Math.round(savingsRate)}% of your income. That's fantastic! Most financial experts recommend 20%, and you're already there or beyond.`,
        suggestion: 'Consider investing some of your surplus for even better returns!',
        timestamp: '2 minutes ago'
      });
    } else if (savingsRate >= 10) {
      insights.push({
        type: 'neutral',
        icon: TrendingUp,
        avatar: '💪',
        title: 'Hela says: You\'re on the right track!',
        description: `You're saving ${Math.round(savingsRate)}% of your income, which is good progress. Let's work together to get you to that golden 20% mark.`,
        suggestion: 'Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.',
        timestamp: '5 minutes ago'
      });
    } else {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        avatar: '🤔',
        title: 'Hela says: Let\'s boost your savings!',
        description: `You're saving ${Math.round(savingsRate)}% of your income. I believe you can do better! Small changes can make a big difference.`,
        suggestion: 'Start with saving just 1% more each month until you reach 20%.',
        timestamp: '1 minute ago'
      });
    }

    // Goal insights
    const activeGoals = goals.filter(g => g.status === 'active');
    if (activeGoals.length > 0) {
      const totalProgress = activeGoals.reduce((sum, goal) => sum + (goal.currentAmount / goal.targetAmount), 0) / activeGoals.length;
      
      if (totalProgress >= 0.75) {
        insights.push({
          type: 'positive',
          icon: CheckCircle,
          avatar: '🚀',
          title: 'Hela says: Your goals are within reach!',
          description: `Amazing! You're ${Math.round(totalProgress * 100)}% of the way to achieving your goals on average. I can almost see the finish line!`,
          suggestion: 'Maybe it\'s time to dream bigger? Consider adding a stretch goal!',
          timestamp: '10 minutes ago'
        });
      } else if (totalProgress >= 0.5) {
        insights.push({
          type: 'neutral',
          icon: TrendingUp,
          avatar: '⭐',
          title: 'Hela says: Halfway there, keep going!',
          description: `You're ${Math.round(totalProgress * 100)}% of the way to your goals. The hardest part is behind you - momentum is building!`,
          suggestion: 'Consider automating your savings to stay consistent.',
          timestamp: '15 minutes ago'
        });
      } else {
        insights.push({
          type: 'tip',
          icon: Lightbulb,
          avatar: '💡',
          title: 'Hela says: Let\'s accelerate your progress!',
          description: `With your current surplus of Ksh ${budget.leftover.toLocaleString()}, we could supercharge your goal progress. Every extra shilling counts!`,
          suggestion: 'Try allocating 50% of your surplus to your top priority goal.',
          timestamp: '8 minutes ago'
        });
      }
    }

    // Reminder insights
    const overdueReminders = reminders.filter(r => 
      r.status === 'active' && new Date(r.nextDue || r.dueDate) < new Date()
    );
    
    if (overdueReminders.length > 0) {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        avatar: '⚠️',
        title: 'Hela says: Don\'t let bills pile up!',
        description: `I noticed you have ${overdueReminders.length} overdue reminders. Late fees can really hurt your budget - let's tackle these together!`,
        suggestion: 'Set up automatic payments to never miss a due date again.',
        timestamp: 'Just now'
      });
    } else {
      insights.push({
        type: 'positive',
        icon: CheckCircle,
        avatar: '✅',
        title: 'Hela says: You\'re on top of your bills!',
        description: 'Great job staying current with all your reminders! This kind of consistency builds excellent financial habits.',
        suggestion: 'Your good habits are saving you money on late fees!',
        timestamp: '30 minutes ago'
      });
    }

    return insights.slice(0, 3); // Show top 3 insights
  };

  const insights = generateInsights();

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-gradient-to-r from-success-50 to-success-100 border-success-200';
      case 'warning': return 'bg-gradient-to-r from-warning-50 to-warning-100 border-warning-200';
      case 'tip': return 'bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200';
      default: return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-success-800';
      case 'warning': return 'text-warning-800';
      case 'tip': return 'text-primary-800';
      default: return 'text-gray-800';
    }
  };

  const getAIStatusColor = () => {
    switch (aiStatus) {
      case 'active': return 'from-blue-50 to-green-50 border-blue-200';
      case 'limited': return 'from-orange-50 to-yellow-50 border-orange-200';
      case 'error': return 'from-red-50 to-red-100 border-red-200';
      default: return 'from-blue-50 to-green-50 border-blue-200';
    }
  };

  const getAIStatusIcon = () => {
    switch (aiStatus) {
      case 'active': return <MessageCircle className="h-4 w-4 text-white" />;
      case 'limited': return <AlertTriangle className="h-4 w-4 text-white" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-white" />;
      default: return <MessageCircle className="h-4 w-4 text-white" />;
    }
  };

  const getAIStatusText = () => {
    switch (aiStatus) {
      case 'active': return 'Powered by OpenAI • Personalized insights based on your financial activity';
      case 'limited': return 'AI features temporarily limited • Using smart fallback insights';
      case 'error': return 'AI temporarily unavailable • Showing data-driven insights';
      default: return 'Powered by OpenAI • Personalized insights based on your financial activity';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Smart Insights from Hela AI
            <Sparkles className="h-4 w-4 text-primary-600 animate-pulse" />
          </h2>
          <p className="text-sm text-gray-500">{getAIStatusText()}</p>
        </div>
      </div>

      {/* AI-Generated Insight */}
      <div className={`mb-6 p-4 bg-gradient-to-r ${getAIStatusColor()} rounded-xl border`}>
        <div className="flex items-start gap-3">
          <div className={`h-8 w-8 bg-gradient-to-r ${
            aiStatus === 'active' ? 'from-blue-500 to-green-500' :
            aiStatus === 'limited' ? 'from-orange-500 to-yellow-500' :
            'from-red-500 to-red-600'
          } rounded-full flex items-center justify-center`}>
            {getAIStatusIcon()}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              {aiStatus === 'active' ? '🤖 AI Financial Insight' :
               aiStatus === 'limited' ? '🧠 Smart Financial Insight' :
               '📊 Data-Driven Insight'}
            </h3>
            {isLoadingInsight ? (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600">Analyzing your financial data...</span>
              </div>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">{aiInsight}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${getInsightColor(insight.type)} animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm">
                  {insight.avatar}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`font-semibold ${getTextColor(insight.type)}`}>
                    {insight.title}
                  </h3>
                  <span className="text-xs text-gray-500">{insight.timestamp}</span>
                </div>
                
                <p className={`text-sm ${getTextColor(insight.type)} opacity-90 mb-3 leading-relaxed`}>
                  {insight.description}
                </p>
                
                <div className={`bg-white bg-opacity-60 rounded-lg p-3 border-l-4 ${
                  insight.type === 'positive' ? 'border-success-400' :
                  insight.type === 'warning' ? 'border-warning-400' :
                  'border-primary-400'
                }`}>
                  <div className="flex items-start gap-2">
                    <Lightbulb className={`h-4 w-4 mt-0.5 ${
                      insight.type === 'positive' ? 'text-success-600' :
                      insight.type === 'warning' ? 'text-warning-600' :
                      'text-primary-600'
                    }`} />
                    <p className="text-sm font-medium text-gray-700">
                      {insight.suggestion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <MessageCircle className="h-3 w-3" />
          <span>
            {aiStatus === 'active' 
              ? 'Insights powered by OpenAI and update in real-time as you use Hela'
              : 'Smart insights based on your financial data and expert financial principles'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmartInsights;