import React from 'react';
import { Grid, List, Settings } from 'lucide-react';
import { useDashboard } from '../contexts/DashboardContext';

const DashboardLayoutSelector: React.FC = () => {
  const { settings, updateSettings } = useDashboard();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
        <button
          onClick={() => updateSettings({ layout: 'grid' })}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            settings.layout === 'grid'
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Grid className="h-4 w-4" />
          Grid
        </button>
        <button
          onClick={() => updateSettings({ layout: 'list' })}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            settings.layout === 'list'
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <List className="h-4 w-4" />
          List
        </button>
      </div>
      
      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
        <Settings className="h-4 w-4" />
      </button>
    </div>
  );
};

export default DashboardLayoutSelector;