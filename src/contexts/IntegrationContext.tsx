import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FinancialService, IntegrationStatus, UserFinancialData } from '../types/integrations';

interface IntegrationContextType {
  integrationStatus: IntegrationStatus;
  userFinancialData: UserFinancialData;
  connectService: (serviceId: string) => Promise<void>;
  disconnectService: (serviceId: string) => Promise<void>;
  syncData: () => Promise<void>;
  isLoading: boolean;
}

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

export const useIntegration = () => {
  const context = useContext(IntegrationContext);
  if (context === undefined) {
    throw new Error('useIntegration must be used within an IntegrationProvider');
  }
  return context;
};

interface IntegrationProviderProps {
  children: ReactNode;
}

export const IntegrationProvider: React.FC<IntegrationProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Available financial services in Kenya
  const [availableServices] = useState<FinancialService[]>([
    {
      id: 'mpesa',
      name: 'M-Pesa',
      type: 'mobile_money',
      icon: '📱',
      description: 'Connect your M-Pesa account to track transactions and spending',
      isConnected: false,
      status: 'disconnected'
    },
    {
      id: 'ziidi',
      name: 'Ziidi',
      type: 'investment',
      icon: '📈',
      description: 'View your investment portfolio and track performance',
      isConnected: false,
      status: 'disconnected'
    },
    {
      id: 'mshwari',
      name: 'M-Shwari',
      type: 'savings',
      icon: '🏦',
      description: 'Monitor your M-Shwari savings and loan status',
      isConnected: false,
      status: 'disconnected'
    },
    {
      id: 'kcb_mpesa',
      name: 'KCB M-Pesa',
      type: 'bank',
      icon: '🏛️',
      description: 'Connect your KCB M-Pesa account for comprehensive banking data',
      isConnected: false,
      status: 'disconnected'
    }
  ]);

  const [connectedServices, setConnectedServices] = useState<FinancialService[]>([]);

  const integrationStatus: IntegrationStatus = {
    hasAnyConnection: connectedServices.length > 0,
    connectedServices,
    availableServices
  };

  const userFinancialData: UserFinancialData = {
    hasTransactions: connectedServices.some(s => s.type === 'mobile_money' || s.type === 'bank'),
    hasSavings: connectedServices.some(s => s.type === 'savings' || s.type === 'bank'),
    hasInvestments: connectedServices.some(s => s.type === 'investment'),
    hasBudget: connectedServices.length > 0,
    lastSyncDate: connectedServices.length > 0 ? new Date().toISOString() : undefined
  };

  const connectService = async (serviceId: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const service = availableServices.find(s => s.id === serviceId);
      if (service) {
        const connectedService: FinancialService = {
          ...service,
          isConnected: true,
          status: 'connected',
          lastSync: new Date().toISOString()
        };
        setConnectedServices(prev => [...prev, connectedService]);
      }
    } catch (error) {
      console.error('Failed to connect service:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectService = async (serviceId: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConnectedServices(prev => prev.filter(s => s.id !== serviceId));
    } catch (error) {
      console.error('Failed to disconnect service:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const syncData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate data sync
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update last sync time for all connected services
      setConnectedServices(prev => prev.map(service => ({
        ...service,
        lastSync: new Date().toISOString()
      })));
    } catch (error) {
      console.error('Failed to sync data:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: IntegrationContextType = {
    integrationStatus,
    userFinancialData,
    connectService,
    disconnectService,
    syncData,
    isLoading
  };

  return (
    <IntegrationContext.Provider value={value}>
      {children}
    </IntegrationContext.Provider>
  );
};