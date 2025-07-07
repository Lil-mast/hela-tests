import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { IntegrationProvider } from './contexts/IntegrationContext';
import FloatingAI from './components/FloatingAI';
import AccessibilityControls from './components/AccessibilityControls';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import ExplorePage from './pages/ExplorePage';
import TransactionsPage from './pages/TransactionsPage';
import BudgetPage from './pages/BudgetPage';
import GoalsPage from './pages/GoalsPage';
import RemindersPage from './pages/RemindersPage';
import SavingsPage from './pages/SavingsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import LearnPage from './pages/LearnPage';
import PlansPage from './pages/PlansPage';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
      
      {/* Show floating AI only when authenticated and not on landing/auth pages */}
      {isAuthenticated && <FloatingAI />}
      
      {/* Accessibility controls available on all pages */}
      <AccessibilityControls />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <IntegrationProvider>
          <DataProvider>
            <DashboardProvider>
              <Router>
                <AppContent />
              </Router>
            </DashboardProvider>
          </DataProvider>
        </IntegrationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;