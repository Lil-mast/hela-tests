import React from 'react';
import { Loader2, ExternalLink } from 'lucide-react';
import { FinancialService } from '../types/integrations';

interface ConnectCardProps {
  service: FinancialService;
  onConnect: (serviceId: string) => void;
  isLoading?: boolean;
  className?: string;
}

const ConnectCard: React.FC<ConnectCardProps> = ({ 
  service, 
  onConnect, 
  isLoading = false,
  className = ""
}) => {
  return (
    <div className={`glass-card p-6 rounded-xl border border-white/10 hover:border-green-500/30 transition-all duration-300 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="text-4xl animate-float">{service.icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-3 text-lg">{service.name}</h3>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            {service.description}
          </p>
          <button
            onClick={() => onConnect(service.id)}
            disabled={isLoading}
            className="flex items-center gap-2 btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4" />
                Connect to {service.name}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectCard;