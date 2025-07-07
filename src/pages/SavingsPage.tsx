import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ConnectCard from '../components/ConnectCard';
import EmptyState from '../components/EmptyState';
import { useIntegration } from '../contexts/IntegrationContext';
import { 
  PiggyBank, 
  TrendingUp, 
  Building,
  Target,
  Plus
} from 'lucide-react';

const SavingsPage: React.FC = () => {
  const { integrationStatus, userFinancialData, connectService, isLoading } = useIntegration();

  const savingsServices = integrationStatus.availableServices.filter(
    service => service.type === 'savings' || service.type === 'bank'
  );
  
  const investmentServices = integrationStatus.availableServices.filter(
    service => service.type === 'investment'
  );

  const connectedSavingsServices = integrationStatus.connectedServices.filter(
    service => service.type === 'savings' || service.type === 'bank'
  );
  
  const connectedInvestmentServices = integrationStatus.connectedServices.filter(
    service => service.type === 'investment'
  );

  if (!userFinancialData.hasSavings && !userFinancialData.hasInvestments && !integrationStatus.hasAnyConnection) {
    return (
      <DashboardLayout 
        title="Savings & Investments"
        subtitle="Track your savings accounts and investment portfolio"
      >
        <div className="space-y-8">
          {/* Savings Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="text-center mb-8">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PiggyBank className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Connect Your Savings Accounts</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect to M-Shwari or KCB-M-Pesa to view your savings accounts, track balances, and monitor growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {savingsServices.map((service) => (
                <ConnectCard
                  key={service.id}
                  service={service}
                  onConnect={connectService}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>

          {/* Investments Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="text-center mb-8">
              <div className="h-16 w-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-secondary-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Connect Your Investment Accounts</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect to Ziidi to view your investment portfolio, track performance, and monitor returns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {investmentServices.map((service) => (
                <ConnectCard
                  key={service.id}
                  service={service}
                  onConnect={connectService}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 What You'll See After Connecting</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 opacity-75">
                <div className="flex items-center gap-3 mb-2">
                  <PiggyBank className="h-5 w-5 text-primary-600" />
                  <h4 className="font-medium text-gray-900">Savings Overview</h4>
                </div>
                <p className="text-sm text-gray-600">Real-time balances, interest earned, and savings growth tracking</p>
              </div>
              <div className="bg-white rounded-lg p-4 opacity-75">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-secondary-600" />
                  <h4 className="font-medium text-gray-900">Investment Portfolio</h4>
                </div>
                <p className="text-sm text-gray-600">Portfolio performance, asset allocation, and return analysis</p>
              </div>
              <div className="bg-white rounded-lg p-4 opacity-75">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-5 w-5 text-accent-600" />
                  <h4 className="font-medium text-gray-900">Goal Tracking</h4>
                </div>
                <p className="text-sm text-gray-600">Progress towards savings goals with smart recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Savings & Investments"
      subtitle="Track your savings accounts and investment portfolio"
    >
      <div className="space-y-8">
        {/* Savings Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PiggyBank className="h-6 w-6 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900">Savings Accounts</h2>
              </div>
              {connectedSavingsServices.length === 0 && (
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Connect Account
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {connectedSavingsServices.length > 0 ? (
              <div className="space-y-4">
                {connectedSavingsServices.map((service) => (
                  <div key={service.id} className="p-4 bg-success-50 rounded-lg border border-success-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">Connected and syncing</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">Ksh 0</p>
                        <p className="text-sm text-gray-500">Current balance</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={PiggyBank}
                title="No savings accounts connected"
                description="Connect to M-Shwari or KCB-M-Pesa to view your savings."
                actionButton={
                  <div className="space-y-3">
                    {savingsServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => connectService(service.id)}
                        disabled={isLoading}
                        className="block bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
                      >
                        Connect to {service.name}
                      </button>
                    ))}
                  </div>
                }
              />
            )}
          </div>
        </div>

        {/* Investments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-secondary-600" />
                <h2 className="text-xl font-semibold text-gray-900">Investment Portfolio</h2>
              </div>
              {connectedInvestmentServices.length === 0 && (
                <button className="text-secondary-600 hover:text-secondary-700 text-sm font-medium">
                  Connect Account
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {connectedInvestmentServices.length > 0 ? (
              <div className="space-y-4">
                {connectedInvestmentServices.map((service) => (
                  <div key={service.id} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">Connected and syncing</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">Ksh 0</p>
                        <p className="text-sm text-gray-500">Portfolio value</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={TrendingUp}
                title="No investment accounts connected"
                description="Connect to Ziidi to view your investments."
                actionButton={
                  <div className="space-y-3">
                    {investmentServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => connectService(service.id)}
                        disabled={isLoading}
                        className="block bg-secondary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary-700 disabled:opacity-50 transition-colors"
                      >
                        Connect to {service.name}
                      </button>
                    ))}
                  </div>
                }
              />
            )}
          </div>
        </div>

        {/* Savings Goals Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-accent-600" />
                <h2 className="text-xl font-semibold text-gray-900">Savings Goals</h2>
              </div>
              <button className="flex items-center gap-2 text-accent-600 hover:text-accent-700 text-sm font-medium">
                <Plus className="h-4 w-4" />
                Add Goal
              </button>
            </div>
          </div>

          <div className="p-6">
            <EmptyState
              icon={Target}
              title="No savings goals set"
              description="Create savings goals to track your progress and stay motivated."
              actionButton={
                <button className="bg-accent-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-colors">
                  Create Your First Goal
                </button>
              }
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavingsPage;