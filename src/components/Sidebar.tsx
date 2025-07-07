import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageCircle, 
  LayoutDashboard, 
  CreditCard, 
  Wallet, 
  Target, 
  Bell,
  PiggyBank, 
  Settings,
  User,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: CreditCard, label: 'Transactions', path: '/transactions' },
    { icon: Wallet, label: 'Budget', path: '/budget' },
    { icon: Target, label: 'Goals', path: '/goals' },
    { icon: Bell, label: 'Reminders', path: '/reminders' },
    { icon: PiggyBank, label: 'Savings', path: '/savings' },
    { icon: BookOpen, label: 'Learn', path: '/learn' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-3 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
        >
          <MessageCircle className="h-8 w-8" />
          Hela
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePage(item.path);
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => navigate('/settings')}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
            {user?.name ? (
              <span className="text-sm font-medium text-primary-700">
                {getInitials(user.name)}
              </span>
            ) : (
              <User className="h-5 w-5 text-primary-600" />
            )}
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;