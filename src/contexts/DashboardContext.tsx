import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DashboardSettings {
  layout: 'grid' | 'list';
  visibleWidgets: {
    budget: boolean;
    goals: boolean;
    reminders: boolean;
    insights: boolean;
    quickActions: boolean;
    recentActivity: boolean;
  };
}

interface DashboardContextType {
  settings: DashboardSettings;
  updateSettings: (updates: Partial<DashboardSettings>) => void;
  toggleWidget: (widget: keyof DashboardSettings['visibleWidgets']) => void;
}

const defaultSettings: DashboardSettings = {
  layout: 'grid',
  visibleWidgets: {
    budget: true,
    goals: true,
    reminders: true,
    insights: true,
    quickActions: true,
    recentActivity: true,
  },
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<DashboardSettings>(() => {
    const savedSettings = localStorage.getItem('hela_dashboard_settings');
    return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
  });

  const updateSettings = (updates: Partial<DashboardSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    localStorage.setItem('hela_dashboard_settings', JSON.stringify(newSettings));
  };

  const toggleWidget = (widget: keyof DashboardSettings['visibleWidgets']) => {
    const newSettings = {
      ...settings,
      visibleWidgets: {
        ...settings.visibleWidgets,
        [widget]: !settings.visibleWidgets[widget],
      },
    };
    setSettings(newSettings);
    localStorage.setItem('hela_dashboard_settings', JSON.stringify(newSettings));
  };

  const value: DashboardContextType = {
    settings,
    updateSettings,
    toggleWidget,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};