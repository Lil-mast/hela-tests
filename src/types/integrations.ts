export interface FinancialService {
  id: string;
  name: string;
  type: 'mobile_money' | 'savings' | 'investment' | 'bank';
  icon: string;
  description: string;
  isConnected: boolean;
  lastSync?: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
}

export interface IntegrationStatus {
  hasAnyConnection: boolean;
  connectedServices: FinancialService[];
  availableServices: FinancialService[];
}

export interface UserFinancialData {
  hasTransactions: boolean;
  hasSavings: boolean;
  hasInvestments: boolean;
  hasBudget: boolean;
  lastSyncDate?: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budgetedAmount: number;
  spentAmount: number;
  type: 'need' | 'want' | 'savings';
  isUserCreated: boolean;
}

export interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'weekly' | 'yearly';
  isUserCreated: boolean;
  source?: string; // e.g., 'mpesa', 'manual'
}