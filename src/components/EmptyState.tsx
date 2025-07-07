import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionButton?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionButton,
  className = ""
}) => {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="h-20 w-20 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">{description}</p>
      {actionButton}
    </div>
  );
};

export default EmptyState;