import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Mic, MicOff, X, Minimize2, Maximize2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { openAIService, type ChatMessage } from '../services/openai';

const FloatingAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Hela AI, your personal financial assistant. I can help you with budgeting, saving goals, investment advice for Kenya, and answer any financial questions. What would you like to know?',
    },
  ]);

  const { 
    goals, 
    reminders, 
    budget, 
    addGoal, 
    addReminder,
  } = useData();
  
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

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

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
    // For now, it's just a visual toggle
  };

  const quickPrompts = [
    "How's my budget looking?",
    "Help me save Ksh 10,000",
    "Investment options in Kenya",
    "Set up bill reminders"
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50 flex items-center justify-center"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold">Hela AI</h3>
              <p className="text-xs opacity-90">Powered by OpenAI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full hover:bg-primary-200 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[85%]">
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

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your finances..."
                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-primary-600 hover:text-primary-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={toggleVoiceInput}
                  className={`p-2 rounded-xl transition-colors ${
                    isListening 
                      ? 'bg-error-100 text-error-600 hover:bg-error-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                💡 Ask about budgeting, saving goals, or investment options in Kenya
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingAI;