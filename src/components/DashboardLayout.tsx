import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CollapsibleSidebar from './CollapsibleSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, subtitle }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">
      <CollapsibleSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        {title && (
          <header className="hidden lg:block glass-nav border-b border-white/10 px-6 py-4 flex-shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              {subtitle && (
                <p className="text-gray-400 mt-1 text-sm">{subtitle}</p>
              )}
            </div>
          </header>
        )}

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-full">
            {/* Mobile title */}
            {title && (
              <div className="lg:hidden mb-6">
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                {subtitle && (
                  <p className="text-gray-400 mt-1 text-sm">{subtitle}</p>
                )}
              </div>
            )}
            
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;