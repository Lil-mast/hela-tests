import React, { useState } from 'react';
import { X, Eye, EyeOff, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
}

interface OnboardingData {
  firstName: string;
  lastName: string;
  preferredName: string;
  selectedGoals: string[];
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    firstName: '',
    lastName: '',
    preferredName: '',
    selectedGoals: []
  });
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const financialGoals = [
    "Build an emergency fund",
    "Save for a major purchase (car, laptop, etc.)",
    "Pay off debt faster",
    "Create a monthly budget that works",
    "Track my spending better",
    "Start investing for the future",
    "Save for education or courses",
    "Plan for retirement"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        // For signup, show onboarding first
        setShowOnboarding(true);
        setIsLoading(false);
        return;
      } else {
        await login(formData.email, formData.password);
        onClose();
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleOnboardingNext = () => {
    if (onboardingStep === 1) {
      if (onboardingData.firstName && onboardingData.lastName && onboardingData.preferredName) {
        setOnboardingStep(2);
      }
    } else if (onboardingStep === 2) {
      if (onboardingData.selectedGoals.length > 0) {
        setOnboardingStep(3);
      }
    }
  };

  const handleFinishOnboarding = async () => {
    setIsLoading(true);
    try {
      // Complete the signup with the collected data
      const fullName = `${onboardingData.firstName} ${onboardingData.lastName}`;
      await signup(fullName, formData.email, formData.password, 'free');
      
      // Store onboarding preferences (in a real app, this would go to your backend)
      localStorage.setItem('hela_onboarding_data', JSON.stringify(onboardingData));
      
      onClose();
      navigate('/dashboard');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleGoal = (goal: string) => {
    setOnboardingData(prev => ({
      ...prev,
      selectedGoals: prev.selectedGoals.includes(goal)
        ? prev.selectedGoals.filter(g => g !== goal)
        : [...prev.selectedGoals, goal]
    }));
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      // Simulate Google auth
      await login('demo@example.com', 'password');
      onClose();
      navigate('/dashboard');
    } catch (err) {
      setError('Google authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-scale-in">
        {!showOnboarding ? (
          // Regular Auth Form
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === 'signup' ? 'Welcome to Hela' : 'Welcome back'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-error-600 text-sm bg-error-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Please wait...' : mode === 'signup' ? 'Continue' : 'Log In'}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <button
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full mt-4 flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => onModeChange(mode === 'signup' ? 'login' : 'signup')}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {mode === 'signup' ? 'Log in' : 'Sign up'}
                </button>
              </p>
            </div>

            {mode === 'signup' && (
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By signing up, you'll be registered under the Free plan. You can upgrade anytime.
                </p>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms & Conditions
              </p>
            </div>
          </>
        ) : (
          // Onboarding Flow
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Let's get to know you!</h2>
                <p className="text-sm text-gray-500">Step {onboardingStep} of 3</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(onboardingStep / 3) * 100}%` }}
              ></div>
            </div>

            {onboardingStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tell us about yourself</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={onboardingData.firstName}
                    onChange={(e) => setOnboardingData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={onboardingData.lastName}
                    onChange={(e) => setOnboardingData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Name
                    <span className="text-gray-500 text-xs ml-1">(How should we address you?)</span>
                  </label>
                  <input
                    type="text"
                    value={onboardingData.preferredName}
                    onChange={(e) => setOnboardingData(prev => ({ ...prev, preferredName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., John, Johnny, JJ"
                  />
                </div>

                <button
                  onClick={handleOnboardingNext}
                  disabled={!onboardingData.firstName || !onboardingData.lastName || !onboardingData.preferredName}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's your aim with Hela?</h3>
                <p className="text-sm text-gray-600 mb-4">Select all that apply to help us personalize your experience:</p>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {financialGoals.map((goal, index) => (
                    <button
                      key={index}
                      onClick={() => toggleGoal(goal)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                        onboardingData.selectedGoals.includes(goal)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{goal}</span>
                        {onboardingData.selectedGoals.includes(goal) && (
                          <Check className="h-4 w-4 text-primary-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleOnboardingNext}
                  disabled={onboardingData.selectedGoals.length === 0}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-6 text-center">
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Hela got you!</h3>
                  <p className="text-gray-600 mb-4">We will help you get there.</p>
                  
                  <div className="text-left bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Your selected goals:</h4>
                    <ul className="space-y-1">
                      {onboardingData.selectedGoals.map((goal, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-3 w-3 text-primary-600" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Welcome to your financial journey, {onboardingData.preferredName}! 
                    Let's start building your financial freedom together.
                  </p>
                </div>

                <button
                  onClick={handleFinishOnboarding}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Setting up your account...' : 'Go to Dashboard'}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;