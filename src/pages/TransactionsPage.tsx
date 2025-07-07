import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ConnectCard from '../components/ConnectCard';
import EmptyState from '../components/EmptyState';
import { useIntegration } from '../contexts/IntegrationContext';
import { 
  Plus, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Search,
  Download,
  X,
  Sparkles
} from 'lucide-react';

interface ManualTransaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  notes?: string;
}

const TransactionsPage: React.FC = () => {
  const { integrationStatus, userFinancialData, connectService, isLoading } = useIntegration();
  const [manualTransactions, setManualTransactions] = useState<ManualTransaction[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: 0,
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const categories = {
    expense: ['Food', 'Rent', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Education', 'Other'],
    income: ['Salary', 'Business', 'Freelance', 'Investment', 'Gift', 'Other']
  };

  const formatCurrency = (amount: number) => {
    return `Ksh ${amount.toLocaleString()}`;
  };

  const handleAddTransaction = () => {
    if (newTransaction.amount > 0 && newTransaction.description && newTransaction.category) {
      const transaction: ManualTransaction = {
        id: Date.now().toString(),
        type: newTransaction.type,
        amount: newTransaction.amount,
        description: newTransaction.description,
        category: newTransaction.category,
        date: newTransaction.date,
        notes: newTransaction.notes
      };
      
      setManualTransactions(prev => [transaction, ...prev]);
      setNewTransaction({
        type: 'expense',
        amount: 0,
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
      setShowAddModal(false);
    }
  };

  const deleteTransaction = (id: string) => {
    setManualTransactions(prev => prev.filter(t => t.id !== id));
  };

  if (!userFinancialData.hasTransactions && !integrationStatus.hasAnyConnection) {
    return (
      <DashboardLayout 
        title="Transactions"
        subtitle="Track and analyze your financial activity"
      >
        <div className="space-y-8">
          {/* Connection Required State */}
          <div className="glass-card p-8 rounded-2xl animate-slide-up">
            <EmptyState
              icon={CreditCard}
              title="Connect M-Pesa to View Transactions"
              description="Once you sync with M-Pesa, your transactions will appear here automatically. You can also add transactions manually."
            />
            
            <div className="mt-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-6 text-center flex items-center justify-center gap-2">
                Connect Your Account
                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrationStatus.availableServices
                  .filter(service => service.type === 'mobile_money' || service.type === 'bank')
                  .map((service, index) => (
                    <div key={service.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <ConnectCard
                        service={service}
                        onConnect={connectService}
                        isLoading={isLoading}
                        className="card-hover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Manual Transaction Option */}
          <div className="glass-card p-8 rounded-2xl bg-gradient-to-r from-green-500/10 to-yellow-500/10 animate-slide-up stagger-1">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-3">Add Transactions Manually</h3>
              <p className="text-gray-300 mb-6">
                Start tracking your finances by adding transactions manually while you set up your connections.
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Transactions"
      subtitle="Track and analyze your financial activity"
    >
      <div className="space-y-8">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-400">
              Total Transactions: <span className="text-white font-medium">{manualTransactions.length}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="btn-glass flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </button>
            
            <button className="btn-glass flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="glass-card rounded-2xl overflow-hidden animate-slide-up">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
          </div>

          <div className="divide-y divide-white/10">
            {manualTransactions.length > 0 ? (
              manualTransactions.map((transaction, index) => (
                <div key={transaction.id} className="p-6 hover:bg-white/5 transition-colors animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className="h-6 w-6 text-green-400" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-red-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{transaction.description}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs rounded-full">
                            {transaction.category}
                          </span>
                          <span className="text-sm text-gray-400">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                          {transaction.notes && (
                            <span className="text-sm text-gray-400">• {transaction.notes}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className={`font-semibold text-lg ${
                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8">
                <EmptyState
                  icon={CreditCard}
                  title="No transactions yet"
                  description="Add your first transaction to start tracking your financial activity."
                  actionButton={
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="btn-primary"
                    >
                      Add Your First Transaction
                    </button>
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* Add Transaction Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="glass-card rounded-2xl w-full max-w-md animate-scale-in">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Add Transaction</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Transaction Type */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setNewTransaction(prev => ({ ...prev, type: 'income' }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        newTransaction.type === 'income'
                          ? 'border-green-500 bg-green-500/20'
                          : 'border-white/20 hover:border-white/30'
                      }`}
                    >
                      <TrendingUp className={`h-6 w-6 mx-auto mb-2 ${
                        newTransaction.type === 'income' ? 'text-green-400' : 'text-gray-400'
                      }`} />
                      <span className="text-sm font-medium text-white">Income</span>
                    </button>
                    
                    <button
                      onClick={() => setNewTransaction(prev => ({ ...prev, type: 'expense' }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        newTransaction.type === 'expense'
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-white/20 hover:border-white/30'
                      }`}
                    >
                      <TrendingDown className={`h-6 w-6 mx-auto mb-2 ${
                        newTransaction.type === 'expense' ? 'text-red-400' : 'text-gray-400'
                      }`} />
                      <span className="text-sm font-medium text-white">Expense</span>
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Amount (Ksh)</label>
                  <input
                    type="number"
                    value={newTransaction.amount || ''}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white placeholder-gray-400"
                    placeholder="0"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Description</label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white placeholder-gray-400"
                    placeholder="e.g., Grocery shopping"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Category</label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white bg-dark-secondary"
                  >
                    <option value="">Select category</option>
                    {categories[newTransaction.type].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Date</label>
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Notes (Optional)</label>
                  <textarea
                    value={newTransaction.notes}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white placeholder-gray-400"
                    rows={3}
                    placeholder="Additional details..."
                  />
                </div>
              </div>

              <div className="p-6 border-t border-white/10 flex gap-3">
                <button
                  onClick={handleAddTransaction}
                  className="flex-1 btn-primary"
                >
                  Add Transaction
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="btn-glass"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage;