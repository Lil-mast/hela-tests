import React, { useState } from 'react';
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
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CollapsibleSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: MessageCircle, label: 'Chat with Hela', path: '/chat' },
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col h-screen glass-card border-r border-white/10 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Logo and Toggle */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {!isCollapsed && (
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-lg font-bold text-white hover:text-green-400 transition-colors group"
            >
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 group-hover:from-green-400 group-hover:to-green-500 transition-all duration-300">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-gradient">Hela</span>
            </button>
          )}
          
          {isCollapsed && (
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center w-full group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 group-hover:from-green-400 group-hover:to-green-500 transition-all duration-300">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
            </button>
          )}
          
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              title="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Collapsed state toggle */}
        {isCollapsed && (
          <div className="p-2 border-b border-white/10">
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-full p-2 text-gray-400 hover:text-white transition-colors flex items-center justify-center rounded-lg hover:bg-white/5"
              title="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePage(item.path);
              
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-green-500/20 text-green-400 shadow-glow'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-green-400' : ''}`} />
                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile and Logout */}
        <div className="p-3 border-t border-white/10 space-y-2">
          {!isCollapsed ? (
            <>
              <button
                onClick={() => navigate('/settings')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  {user?.name ? (
                    <span className="text-xs font-medium text-white">
                      {getInitials(user.name)}
                    </span>
                  ) : (
                    <MessageCircle className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Log Out</span>
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-2 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center group"
                title="Profile Settings"
              >
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  {user?.name ? (
                    <span className="text-xs font-medium text-white">
                      {getInitials(user.name)}
                    </span>
                  ) : (
                    <MessageCircle className="h-3 w-3 text-white" />
                  )}
                </div>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full p-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors flex items-center justify-center"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden glass-nav border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-lg font-bold text-white"
        >
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <span className="text-gradient">Hela</span>
        </button>
        
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-300 hover:text-white transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="relative glass-card w-72 max-w-[85vw] h-full shadow-xl flex flex-col animate-slide-in-left">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gradient">Hela</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 overflow-y-auto">
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePage(item.path);
                  
                  return (
                    <li key={item.path}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-green-500/20 text-green-400 shadow-glow'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Profile and Logout */}
            <div className="p-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  navigate('/settings');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  {user?.name ? (
                    <span className="text-sm font-medium text-white">
                      {getInitials(user.name)}
                    </span>
                  ) : (
                    <MessageCircle className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollapsibleSidebar;