import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import EmptyState from '../components/EmptyState';
import { useIntegration } from '../contexts/IntegrationContext';
import { BudgetCategory, IncomeSource } from '../types/integrations';
import { 
  Wallet, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  X,
  Check,
  Edit3,
  Trash2,
  Sparkles
} from 'lucide-react';

const BudgetPage: React.FC = () => {
  const { integrationStatus, userFinancialData } = useIntegration();
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingIncome, setEditingIncome] = useState<string | null>(null);

  const [newCategory, setNewCategory] = useState({
    name: '',
    budgetedAmount: 0,
    type: 'need' as 'need' | 'want' | 'savings'
  });

  const [newIncome, setNewIncome] = useState({
    name: '',
    amount: 0,
    frequency: 'monthly' as 'monthly' | 'weekly' | 'yearly'
  });

  const formatCurrency = (amount: number) => {
    return `Ksh ${amount.toLocaleString()}`;
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.budgetedAmount > 0) {
      const category: BudgetCategory = {
        id: Date.now().toString(),
        name: newCategory.name,
        budgetedAmount: newCategory.budgetedAmount,
        spentAmount: 0,
        type: newCategory.type,
        isUserCreated: true
      };
      
      setBudgetCategories(prev => [...prev, category]);
      setNewCategory({ name: '', budgetedAmount: 0, type: 'need' });
      setShowAddCategory(false);
    }
  };

  const handleAddIncome = () => {
    if (newIncome.name && newIncome.amount > 0) {
      const income: IncomeSource = {
        id: Date.now().toString(),
        name: newIncome.name,
        amount: newIncome.amount,
        frequency: newIncome.frequency,
        isUserCreated: true
      };
      
      setIncomeSources(prev => [...prev, income]);
      setNewIncome({ name: '', amount: 0, frequency: 'monthly' });
      setShowAddIncome(false);
    }
  };

  const deleteCategory = (id: string) => {
    setBudgetCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const deleteIncome = (id: string) => {
    setIncomeSources(prev => prev.filter(inc => inc.id !== id));
  };

  const updateCategory = (id: string, updates: Partial<BudgetCategory>) => {
    setBudgetCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
    setEditingCategory(null);
  };

  const updateIncome = (id: string, updates: Partial<IncomeSource>) => {
    setIncomeSources(prev => prev.map(inc => 
      inc.id === id ? { ...inc, ...updates } : inc
    ));
    setEditingIncome(null);
  };

  const totalIncome = incomeSources.reduce((sum, income) => {
    const monthlyAmount = income.frequency === 'yearly' ? income.amount / 12 : 
                         income.frequency === 'weekly' ? income.amount * 4 : 
                         income.amount;
    return sum + monthlyAmount;
  }, 0);

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgetedAmount, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spentAmount, 0);
  const remaining = totalIncome - totalBudgeted;

  const getCategoryTypeColor = (type: string) => {
    switch (type) {
      case 'need': return 'bg-blue-500/20 text-blue-400';
      case 'want': return 'bg-yellow-500/20 text-yellow-400';
      case 'savings': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <DashboardLayout 
      title="Budget Management"
      subtitle="Create and manage your budget categories and income sources"
    >
      <div className="space-y-8">
        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-xl animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white">Total Income</h3>
            </div>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(totalIncome)}</p>
            <p className="text-sm text-gray-400 mt-1">Monthly</p>
          </div>

          <div className="glass-card p-6 rounded-xl animate-slide-up stagger-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Wallet className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Budgeted</h3>
            </div>
            <p className="text-2xl font-bold text-blue-400">{formatCurrency(totalBudgeted)}</p>
            <p className="text-sm text-gray-400 mt-1">Allocated</p>
          </div>

          <div className="glass-card p-6 rounded-xl animate-slide-up stagger-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="font-semibold text-white">Spent</h3>
            </div>
            <p className="text-2xl font-bold text-red-400">{formatCurrency(totalSpent)}</p>
            <p className="text-sm text-gray-400 mt-1">This month</p>
          </div>

          <div className="glass-card p-6 rounded-xl animate-slide-up stagger-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-white">Remaining</h3>
            </div>
            <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(remaining)}
            </p>
            <p className="text-sm text-gray-400 mt-1">Available</p>
          </div>
        </div>

        {!userFinancialData.hasBudget && budgetCategories.length === 0 && incomeSources.length === 0 && (
          <div className="glass-card p-8 rounded-2xl animate-slide-up">
            <EmptyState
              icon={Wallet}
              title="Create Your Budget"
              description="This page helps you set budgets based on your income and spending. Start by adding your income sources and budget categories."
              actionButton={
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowAddIncome(true)}
                    className="btn-primary"
                  >
                    Add Income Source
                  </button>
                  <button
                    onClick={() => setShowAddCategory(true)}
                    className="btn-glass"
                  >
                    Add Budget Category
                  </button>
                </div>
              }
            />
          </div>
        )}

        {/* Income Sources */}
        <div className="glass-card rounded-2xl animate-slide-up">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                Income Sources
                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
              </h2>
              <button
                onClick={() => setShowAddIncome(true)}
                className="flex items-center gap-2 text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Income
              </button>
            </div>
          </div>

          <div className="p-6">
            {incomeSources.length > 0 ? (
              <div className="space-y-4">
                {incomeSources.map((income, index) => (
                  <div key={income.id} className="flex items-center justify-between p-4 glass rounded-xl animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    {editingIncome === income.id ? (
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <input
                          type="text"
                          defaultValue={income.name}
                          className="px-3 py-2 glass rounded-lg border border-white/20 focus:border-green-500 focus:outline-none text-white"
                          onBlur={(e) => updateIncome(income.id, { name: e.target.value })}
                        />
                        <input
                          type="number"
                          defaultValue={income.amount}
                          className="px-3 py-2 glass rounded-lg border border-white/20 focus:border-green-500 focus:outline-none text-white"
                          onBlur={(e) => updateIncome(income.id, { amount: Number(e.target.value) })}
                        />
                        <select
                          defaultValue={income.frequency}
                          className="px-3 py-2 glass rounded-lg border border-white/20 focus:border-green-500 focus:outline-none text-white bg-dark-secondary"
                          onChange={(e) => updateIncome(income.id, { frequency: e.target.value as any })}
                        >
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h3 className="font-medium text-white">{income.name}</h3>
                          <p className="text-sm text-gray-400">
                            {formatCurrency(income.amount)} per {income.frequency.slice(0, -2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingIncome(income.id)}
                            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteIncome(income.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={DollarSign}
                title="No income sources added"
                description="Add your income sources to start building your budget."
                actionButton={
                  <button
                    onClick={() => setShowAddIncome(true)}
                    className="btn-primary"
                  >
                    Add Your First Income Source
                  </button>
                }
              />
            )}
          </div>
        </div>

        {/* Budget Categories */}
        <div className="glass-card rounded-2xl animate-slide-up stagger-1">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Budget Categories</h2>
              <button
                onClick={() => setShowAddCategory(true)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </button>
            </div>
          </div>

          <div className="p-6">
            {budgetCategories.length > 0 ? (
              <div className="space-y-4">
                {budgetCategories.map((category, index) => (
                  <div key={category.id} className="p-4 glass rounded-xl animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    {editingCategory === category.id ? (
                      <div className="grid grid-cols-4 gap-4">
                        <input
                          type="text"
                          defaultValue={category.name}
                          className="px-3 py-2 glass rounded-lg border border-white/20 focus:border-green-500 focus:outline-none text-white"
                          onBlur={(e) => updateCategory(category.id, { name: e.target.value })}
                        />
                        <input
                          type="number"
                          defaultValue={category.budgetedAmount}
                          className="px-3 py-2 glass rounded-lg border border-white/20 focus:border-green-500 focus:outline-none text-white"
                          onBlur={(e) => updateCategory(category.id, { budgetedAmount: Number(e.target.value) })}
                        />
                        <select
                          defaultValue={category.type}
                          className="px-3 py-2 glass rounded-lg border border-white/20 focus:border-green-500 focus:outline-none text-white bg-dark-secondary"
                          onChange={(e) => updateCategory(category.id, { type: e.target.value as any })}
                        >
                          <option value="need">Need</option>
                          <option value="want">Want</option>
                          <option value="savings">Savings</option>
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingCategory(null)}
                            className="p-2 text-green-400 hover:text-green-300 transition-colors"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-white">{category.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryTypeColor(category.type)}`}>
                                {category.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400">
                              {formatCurrency(category.spentAmount)} / {formatCurrency(category.budgetedAmount)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingCategory(category.id)}
                            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Wallet}
                title="No budget categories added"
                description="Add budget categories like Food, Utilities, School Fees, etc. to organize your spending."
                actionButton={
                  <button
                    onClick={() => setShowAddCategory(true)}
                    className="btn-primary"
                  >
                    Add Your First Category
                  </button>
                }
              />
            )}
          </div>
        </div>

        {/* Add Income Modal */}
        {showAddIncome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="glass-card rounded-2xl w-full max-w-md animate-scale-in">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Add Income Source</h3>
                  <button
                    onClick={() => setShowAddIncome(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Income Source Name</label>
                  <input
                    type="text"
                    value={newIncome.name}
                    onChange={(e) => setNewIncome(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white placeholder-gray-400"
                    placeholder="e.g., Salary, Freelance, Business"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Amount (Ksh)</label>
                  <input
                    type="number"
                    value={newIncome.amount || ''}
                    onChange={(e) => setNewIncome(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white placeholder-gray-400"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Frequency</label>
                  <select
                    value={newIncome.frequency}
                    onChange={(e) => setNewIncome(prev => ({ ...prev, frequency: e.target.value as any }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white bg-dark-secondary"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 flex gap-3">
                <button
                  onClick={handleAddIncome}
                  className="flex-1 btn-primary"
                >
                  Add Income Source
                </button>
                <button
                  onClick={() => setShowAddIncome(false)}
                  className="btn-glass"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        {showAddCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="glass-card rounded-2xl w-full max-w-md animate-scale-in">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Add Budget Category</h3>
                  <button
                    onClick={() => setShowAddCategory(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Category Name</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white placeholder-gray-400"
                    placeholder="e.g., Food, Utilities, School Fees"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Monthly Budget (Ksh)</label>
                  <input
                    type="number"
                    value={newCategory.budgetedAmount || ''}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, budgetedAmount: Number(e.target.value) }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white placeholder-gray-400"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Category Type</label>
                  <select
                    value={newCategory.type}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/20 focus:border-green-500 focus:outline-none text-white bg-dark-secondary"
                  >
                    <option value="need">Need (Essential)</option>
                    <option value="want">Want (Lifestyle)</option>
                    <option value="savings">Savings & Investment</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 flex gap-3">
                <button
                  onClick={handleAddCategory}
                  className="flex-1 btn-primary"
                >
                  Add Category
                </button>
                <button
                  onClick={() => setShowAddCategory(false)}
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

export default BudgetPage;