import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, TrendingUp, Target, Bell, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import DashboardLayout from '../components/DashboardLayout';
import { openAIService, type ChatMessage } from '../services/openai';

const ChatPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { budget, goals, reminders } = useData();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Hela AI, your personal financial assistant. I can help you with budgeting, saving goals, investment advice for Kenya, bill reminders, and answer any financial questions. What would you like to know?',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Prepare financial context for AI
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

      // Get AI response
      const response = await openAIService.getChatResponse(
        [...messages, userMessage],
        context
      );

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response,
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment, or feel free to explore the app\'s features directly!',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    { icon: DollarSign, text: "How's my budget looking?", color: "bg-primary-50 text-primary-700 border-primary-200" },
    { icon: Target, text: "Help me set a savings goal", color: "bg-secondary-50 text-secondary-700 border-secondary-200" },
    { icon: TrendingUp, text: "Investment options in Kenya", color: "bg-success-50 text-success-700 border-success-200" },
    { icon: Bell, text: "Set up bill reminders", color: "bg-warning-50 text-warning-700 border-warning-200" },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        {/* Chat Header */}
        <div className="flex items-center gap-4 mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="h-12 w-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Chat with Hela AI</h1>
            <p className="text-gray-600">Powered by OpenAI • Your personal financial assistant</p>
          </div>
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Try asking me about:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(prompt.text)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${prompt.color}`}
                >
                  <prompt.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Chat Messages */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[80%]">
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">Hela is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your finances... (e.g., 'How can I save Ksh 10,000 this month?')"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 bottom-2 p-2 text-primary-600 hover:text-primary-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Ask about budgeting, saving goals, investment options in Kenya, or bill reminders
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;