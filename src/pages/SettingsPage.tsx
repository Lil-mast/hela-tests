import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ThemeCustomizer from '../components/ThemeCustomizer';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Database,
  Trash2,
  Mail,
  MessageSquare,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Palette,
  Globe,
  Type,
  Volume2,
  VolumeX
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { goals, reminders, budget, clearChat } = useData();
  const { theme, updateTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [language, setLanguage] = useState('english');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    both: false,
    goalReminders: true,
    billReminders: true,
    budgetAlerts: true,
    weeklyReports: false,
    soundNotifications: true,
    pushNotifications: true,
  });

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+254 700 000 000',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [planSettings, setPlanSettings] = useState({
    currentPlan: user?.plan || 'free',
    autoRenew: true,
    billingEmail: user?.email || '',
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'theme', label: 'Theme & Appearance', icon: Palette },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'plan', label: 'Plan & Billing', icon: CreditCard },
    { id: 'data', label: 'Data Management', icon: Database },
  ];

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (profile.newPassword !== profile.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (profile.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    console.log('Changing password');
    alert('Password changed successfully!');
    setProfile(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE to confirm');
      return;
    }
    
    clearChat();
    logout();
    alert('Account deleted successfully');
  };

  const handleExportData = () => {
    const data = {
      profile: { name: user?.name, email: user?.email },
      budget,
      goals,
      reminders,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hela-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // In a real app, this would trigger a full app language change
    alert(`Language changed to ${newLanguage}. App will reload to apply changes.`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'free': return 'Free Plan';
      case 'monthly': return 'Pro Monthly';
      case 'yearly': return 'Pro Yearly';
      default: return 'Free Plan';
    }
  };

  const getPlanPrice = (plan: string) => {
    switch (plan) {
      case 'free': return 'Ksh 0/month';
      case 'monthly': return 'Ksh 300/month';
      case 'yearly': return 'Ksh 250/month (billed yearly)';
      default: return 'Ksh 0/month';
    }
  };

  return (
    <DashboardLayout 
      title="Settings"
      subtitle="Manage your account preferences and data"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                
                {/* Profile Picture */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-medium text-primary-700">
                      {getInitials(profile.name)}
                    </span>
                  </div>
                  <div>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      Change Photo
                    </button>
                    <p className="text-sm text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={handleSaveProfile}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                
                <div className="space-y-8">
                  {/* Notification Methods */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Notification Methods</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={(e) => handleNotificationChange('email', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">SMS Notifications</p>
                            <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.sms}
                            onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {soundEnabled ? <Volume2 className="h-5 w-5 text-gray-400" /> : <VolumeX className="h-5 w-5 text-gray-400" />}
                          <div>
                            <p className="font-medium text-gray-900">Sound Notifications</p>
                            <p className="text-sm text-gray-500">Play sounds for notifications</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={soundEnabled}
                            onChange={(e) => setSoundEnabled(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Notification Types */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Notification Types</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Goal Reminders</p>
                          <p className="text-sm text-gray-500">Get notified about goal progress and deadlines</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.goalReminders}
                            onChange={(e) => handleNotificationChange('goalReminders', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Bill Reminders</p>
                          <p className="text-sm text-gray-500">Notifications for upcoming bill payments</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.billReminders}
                            onChange={(e) => handleNotificationChange('billReminders', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Budget Alerts</p>
                          <p className="text-sm text-gray-500">Get notified when you exceed budget limits</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.budgetAlerts}
                            onChange={(e) => handleNotificationChange('budgetAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Weekly Reports</p>
                          <p className="text-sm text-gray-500">Weekly summary of your financial activity</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.weeklyReports}
                            onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  {/* Change Password */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Change Password</h4>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={profile.currentPassword}
                            onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter current password"
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

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          value={profile.newPassword}
                          onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={profile.confirmPassword}
                          onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <button 
                        onClick={handleChangePassword}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">SMS Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Theme & Appearance Tab */}
            {activeTab === 'theme' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Theme & Appearance</h3>
                <ThemeCustomizer />
              </div>
            )}

            {/* Language & Region Tab */}
            {activeTab === 'language' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Language & Region</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Language</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            🇬🇧
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">English</p>
                            <p className="text-sm text-gray-500">Default language</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="language"
                          checked={language === 'english'}
                          onChange={() => handleLanguageChange('english')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            🇰🇪
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Kiswahili</p>
                            <p className="text-sm text-gray-500">Lugha ya Kiswahili</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="language"
                          checked={language === 'swahili'}
                          onChange={() => handleLanguageChange('swahili')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Region & Currency</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option value="kenya">Kenya</option>
                          <option value="uganda">Uganda</option>
                          <option value="tanzania">Tanzania</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option value="kes">Kenyan Shilling (KES)</option>
                          <option value="ugx">Ugandan Shilling (UGX)</option>
                          <option value="tzs">Tanzanian Shilling (TZS)</option>
                          <option value="usd">US Dollar (USD)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Date & Time Format</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                          <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                          <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option value="12">12-hour (AM/PM)</option>
                          <option value="24">24-hour</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Plan & Billing Tab */}
            {activeTab === 'plan' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Plan & Billing</h3>
                
                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{getPlanDisplayName(planSettings.currentPlan)}</h4>
                        <p className="text-sm text-gray-600">{getPlanPrice(planSettings.currentPlan)}</p>
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                        Change Plan
                      </button>
                    </div>
                  </div>

                  {/* Auto-Renewal */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Auto-Renewal</p>
                      <p className="text-sm text-gray-500">Automatically renew your subscription</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={planSettings.autoRenew}
                        onChange={(e) => setPlanSettings({ ...planSettings, autoRenew: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  {/* Billing Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Billing Email</label>
                    <input
                      type="email"
                      value={planSettings.billingEmail}
                      onChange={(e) => setPlanSettings({ ...planSettings, billingEmail: e.target.value })}
                      className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {/* Billing History */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Billing History</h4>
                    <div className="text-center py-8 text-gray-500">
                      <p>No billing history available</p>
                      <p className="text-sm">You're currently on the free plan</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Management Tab */}
            {activeTab === 'data' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Management</h3>
                
                <div className="space-y-6">
                  {/* Data Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Your Data Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Goals</p>
                        <p className="font-semibold">{goals.length}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Reminders</p>
                        <p className="font-semibold">{reminders.length}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Budget Entries</p>
                        <p className="font-semibold">1</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Chat Messages</p>
                        <p className="font-semibold">Multiple</p>
                      </div>
                    </div>
                  </div>

                  {/* Export Data */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Export Your Data</h4>
                        <p className="text-sm text-gray-500">Download a copy of all your financial data</p>
                      </div>
                      <button 
                        onClick={handleExportData}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                      >
                        Export Data
                      </button>
                    </div>
                  </div>

                  {/* Clear Chat History */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Clear Chat History</h4>
                        <p className="text-sm text-gray-500">Remove all chat messages with Hela AI</p>
                      </div>
                      <button 
                        onClick={clearChat}
                        className="bg-warning-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-warning-700 transition-colors"
                      >
                        Clear Chat
                      </button>
                    </div>
                  </div>

                  {/* Delete Account */}
                  <div className="border border-error-200 rounded-lg p-4 bg-error-50">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-error-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-error-900">Delete Account</h4>
                        <p className="text-sm text-error-700 mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button 
                          onClick={() => setShowDeleteConfirm(true)}
                          className="bg-error-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-error-700 transition-colors"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-error-600" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                This will permanently delete your account and all associated data including:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• All financial goals and progress</li>
                <li>• All reminders and notifications</li>
                <li>• Budget and transaction data</li>
                <li>• Chat history with Hela AI</li>
                <li>• Account settings and preferences</li>
              </ul>
              <p className="text-error-600 font-medium">
                This action cannot be undone.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type "DELETE" to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-error-500 focus:border-transparent"
                placeholder="DELETE"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
                className="flex-1 bg-error-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-error-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Delete Account
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SettingsPage;