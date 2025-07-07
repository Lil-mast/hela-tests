import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ChevronRight } from 'lucide-react';

const ChatEntry: React.FC = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/chat');
  };

  return (
    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <MessageCircle className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Talk to Hela AI</h3>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="text-sm opacity-90">
          "How can I save Ksh 2,000 this month?"
        </div>
        <div className="text-sm opacity-90">
          "What was my biggest expense last week?"
        </div>
        <div className="text-sm opacity-90">
          "Help me plan for my laptop purchase"
        </div>
      </div>
      
      <button
        onClick={handleStartChat}
        className="group w-full bg-white bg-opacity-20 backdrop-blur-sm text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center gap-2"
      >
        Start Chatting
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default ChatEntry;