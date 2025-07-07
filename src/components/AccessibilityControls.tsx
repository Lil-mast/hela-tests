import React, { useState } from 'react';
import { Type, Palette, Settings, Sun, Moon, Monitor, Plus, Minus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, updateTheme } = useTheme();

  const increaseFontSize = () => {
    const currentSize = theme.fontSize;
    if (currentSize === 'small') updateTheme({ fontSize: 'medium' });
    else if (currentSize === 'medium') updateTheme({ fontSize: 'large' });
  };

  const decreaseFontSize = () => {
    const currentSize = theme.fontSize;
    if (currentSize === 'large') updateTheme({ fontSize: 'medium' });
    else if (currentSize === 'medium') updateTheme({ fontSize: 'small' });
  };

  const toggleTheme = () => {
    const modes = ['light', 'dark', 'auto'] as const;
    const currentIndex = modes.indexOf(theme.mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    updateTheme({ mode: modes[nextIndex] });
  };

  const getThemeIcon = () => {
    switch (theme.mode) {
      case 'light': return Sun;
      case 'dark': return Moon;
      case 'auto': return Monitor;
      default: return Sun;
    }
  };

  const ThemeIcon = getThemeIcon();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 h-10 w-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200 hover:shadow-xl transition-all duration-200"
        title="Accessibility Controls"
      >
        <Settings className="h-5 w-5 text-gray-600" />
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 min-w-[200px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-sm">Accessibility</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        {/* Font Size Controls */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Font Size</label>
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseFontSize}
              disabled={theme.fontSize === 'small'}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Decrease font size"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="flex-1 text-center text-sm capitalize">{theme.fontSize}</span>
            <button
              onClick={increaseFontSize}
              disabled={theme.fontSize === 'large'}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Increase font size"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Theme Toggle */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Theme</label>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            title={`Current: ${theme.mode} mode`}
          >
            <ThemeIcon className="h-4 w-4" />
            <span className="text-sm capitalize">{theme.mode}</span>
          </button>
        </div>

        {/* High Contrast Toggle */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Contrast</label>
          <button
            onClick={() => {
              // Toggle high contrast colors
              const isHighContrast = theme.primaryColor === '#000000';
              updateTheme({
                primaryColor: isHighContrast ? '#059669' : '#000000',
                accentColor: isHighContrast ? '#2563eb' : '#ffffff'
              });
            }}
            className="w-full flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Palette className="h-4 w-4" />
            <span className="text-sm">
              {theme.primaryColor === '#000000' ? 'High Contrast' : 'Normal'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityControls;