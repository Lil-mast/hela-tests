import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';

interface NavbarProps {
  onLogin?: () => void;
  showDashboard?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/plans', label: 'Plans' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-2' 
          : 'bg-transparent py-4'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? 'h-12' : 'h-16'
          }`}>
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-xl font-bold text-white hover:text-green-400 transition-colors group"
              >
                <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 group-hover:from-green-400 group-hover:to-green-500 transition-all duration-300">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gradient">Hela</span>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button 
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    isActivePage(item.path)
                      ? 'text-green-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full ${
                    isActivePage(item.path) ? 'w-full' : ''
                  }`}></span>
                </button>
              ))}
              
              {onLogin && (
                <button
                  onClick={onLogin}
                  className="btn-glass text-sm"
                >
                  Login / Register
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-card mx-4 mt-2 rounded-xl animate-slide-up">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left text-sm font-medium transition-colors ${
                    isActivePage(item.path)
                      ? 'text-green-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {onLogin && (
                <button
                  onClick={() => {
                    onLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full btn-glass text-sm"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;