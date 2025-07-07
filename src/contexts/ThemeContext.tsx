import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeSettings {
  mode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
}

interface ThemeContextType {
  theme: ThemeSettings;
  updateTheme: (updates: Partial<ThemeSettings>) => void;
  resetTheme: () => void;
  previewTheme: ThemeSettings | null;
  setPreviewTheme: (theme: ThemeSettings | null) => void;
}

const defaultTheme: ThemeSettings = {
  mode: 'light',
  primaryColor: '#059669', // primary-600
  accentColor: '#2563eb', // secondary-600
  fontFamily: 'Inter',
  fontSize: 'medium',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const savedTheme = localStorage.getItem('hela_theme');
    return savedTheme ? { ...defaultTheme, ...JSON.parse(savedTheme) } : defaultTheme;
  });
  
  const [previewTheme, setPreviewTheme] = useState<ThemeSettings | null>(null);

  const updateTheme = (updates: Partial<ThemeSettings>) => {
    const newTheme = { ...theme, ...updates };
    setTheme(newTheme);
    localStorage.setItem('hela_theme', JSON.stringify(newTheme));
    applyTheme(newTheme);
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    localStorage.setItem('hela_theme', JSON.stringify(defaultTheme));
    applyTheme(defaultTheme);
  };

  const applyTheme = (themeToApply: ThemeSettings) => {
    const root = document.documentElement;
    
    // Apply colors
    root.style.setProperty('--primary-color', themeToApply.primaryColor);
    root.style.setProperty('--accent-color', themeToApply.accentColor);
    
    // Apply font family
    root.style.setProperty('--font-family', themeToApply.fontFamily);
    
    // Apply font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    root.style.setProperty('--base-font-size', fontSizeMap[themeToApply.fontSize]);
    
    // Apply dark/light mode
    if (themeToApply.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (themeToApply.mode === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Auto mode - check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    applyTheme(previewTheme || theme);
  }, [theme, previewTheme]);

  useEffect(() => {
    // Listen for system theme changes when in auto mode
    if (theme.mode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme(theme);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    updateTheme,
    resetTheme,
    previewTheme,
    setPreviewTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};