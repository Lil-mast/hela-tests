import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Palette, Type, Monitor, Sun, Moon, Check, X, RotateCcw } from 'lucide-react';

const ThemeCustomizer: React.FC = () => {
  const { theme, updateTheme, resetTheme, previewTheme, setPreviewTheme } = useTheme();
  const [showPreview, setShowPreview] = useState(false);

  const colorPresets = [
    { name: 'Green', primary: '#059669', accent: '#2563eb' },
    { name: 'Blue', primary: '#2563eb', accent: '#059669' },
    { name: 'Purple', primary: '#7c3aed', accent: '#f59e0b' },
    { name: 'Pink', primary: '#ec4899', accent: '#10b981' },
    { name: 'Orange', primary: '#ea580c', accent: '#3b82f6' },
    { name: 'Teal', primary: '#0d9488', accent: '#8b5cf6' },
  ];

  const fontOptions = [
    'Inter', 'DM Sans', 'Lato', 'Poppins', 'Open Sans', 'Roboto', 
    'Merriweather', 'Nunito', 'Source Sans Pro', 'Montserrat',
    'Playfair Display', 'Raleway', 'Ubuntu', 'Fira Sans', 'Work Sans',
    'Crimson Text', 'Libre Baskerville', 'PT Sans', 'Oswald', 'Quicksand'
  ];

  const handlePreviewChange = (updates: Partial<typeof theme>) => {
    const newPreview = { ...theme, ...updates };
    setPreviewTheme(newPreview);
    setShowPreview(true);
  };

  const handleSaveChanges = () => {
    if (previewTheme) {
      updateTheme(previewTheme);
    }
    setPreviewTheme(null);
    setShowPreview(false);
  };

  const handleCancelChanges = () => {
    setPreviewTheme(null);
    setShowPreview(false);
  };

  const currentTheme = previewTheme || theme;

  return (
    <div className="space-y-8">
      {/* Theme Mode */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Theme Mode
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'light', label: 'Light', icon: Sun },
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'auto', label: 'Auto', icon: Monitor },
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.value}
                onClick={() => handlePreviewChange({ mode: mode.value as any })}
                className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                  currentTheme.mode === mode.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Customization */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Colors
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={currentTheme.primaryColor}
                onChange={(e) => handlePreviewChange({ primaryColor: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={currentTheme.primaryColor}
                onChange={(e) => handlePreviewChange({ primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="#059669"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={currentTheme.accentColor}
                onChange={(e) => handlePreviewChange({ accentColor: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={currentTheme.accentColor}
                onChange={(e) => handlePreviewChange({ accentColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="#2563eb"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color Presets</label>
            <div className="grid grid-cols-3 gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePreviewChange({ 
                    primaryColor: preset.primary, 
                    accentColor: preset.accent 
                  })}
                  className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex gap-1">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: preset.primary }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: preset.accent }}
                    ></div>
                  </div>
                  <span className="text-sm">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Type className="h-5 w-5" />
          Typography
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select
              value={currentTheme.fontFamily}
              onChange={(e) => handlePreviewChange({ fontFamily: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {fontOptions.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' },
              ].map((size) => (
                <button
                  key={size.value}
                  onClick={() => handlePreviewChange({ fontSize: size.value as any })}
                  className={`p-3 rounded-lg border transition-colors ${
                    currentTheme.fontSize === size.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium">{size.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Live Preview</h4>
        <div 
          className="border border-gray-200 rounded-lg p-6 bg-gray-50"
          style={{
            fontFamily: currentTheme.fontFamily,
            fontSize: currentTheme.fontSize === 'small' ? '14px' : currentTheme.fontSize === 'large' ? '18px' : '16px'
          }}
        >
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="h-10 w-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: currentTheme.primaryColor + '20', color: currentTheme.primaryColor }}
              >
                💰
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Sample Dashboard Card</h3>
                <p className="text-sm text-gray-500">This is how your content will look</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Saved:</span>
                <span className="font-semibold" style={{ color: currentTheme.primaryColor }}>
                  Ksh 45,000
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: '60%', 
                    backgroundColor: currentTheme.primaryColor 
                  }}
                ></div>
              </div>
              
              <button
                className="w-full py-2 px-4 rounded-lg font-medium text-white transition-colors"
                style={{ backgroundColor: currentTheme.accentColor }}
              >
                Sample Button
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save/Cancel Actions */}
      {showPreview && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-4">Keep This Look?</h4>
          <div className="flex gap-3">
            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <Check className="h-4 w-4" />
              Yes, Save Changes
            </button>
            <button
              onClick={handleCancelChanges}
              className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              <X className="h-4 w-4" />
              Cancel and Revert
            </button>
          </div>
        </div>
      )}

      {/* Reset to Default */}
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={resetTheme}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Default Theme
        </button>
      </div>
    </div>
  );
};

export default ThemeCustomizer;