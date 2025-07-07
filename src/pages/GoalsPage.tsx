import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useData } from '../contexts/DataContext';
import { 
  Plus, 
  Target, 
  Calendar, 
  TrendingUp, 
  Edit3, 
  Trash2, 
  Check, 
  X,
  AlertCircle,
  Filter,
  Search,
  Bot,
  Trophy,
  Zap,
  Heart,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';

interface FilterState {
  priority: 'all' | 'low' | 'medium' | 'high';
  status: 'all' | 'active' | 'completed' | 'paused';
  sortBy: 'deadline' | 'priority' | 'progress' | 'amount';
}

const GoalsPage: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    priority: 'all',
    status: 'all',
    sortBy: 'deadline'
  });

  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    notes: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const [editGoal, setEditGoal] = useState({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    notes: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.targetAmount > 0 && newGoal.deadline) {
      addGoal({
        ...newGoal,
        status: 'active',
      });
      setNewGoal({
        name: '',
        targetAmount: 0,
        currentAmount: 0,
        deadline: '',
        notes: '',
        priority: 'medium',
      });
      setShowAddForm(false);
    }
  };

  const handleEditGoal = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setEditGoal({
        name: goal.name,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        deadline: goal.deadline,
        notes: goal.notes || '',
        priority: goal.priority,
      });
      setEditingGoalId(goalId);
    }
  };

  const handleUpdateGoal = () => {
    if (editingGoalId && editGoal.name && editGoal.targetAmount > 0) {
      const progressPercentage = (editGoal.currentAmount / editGoal.targetAmount) * 100;
      updateGoal(editingGoalId, {
        ...editGoal,
        status: progressPercentage >= 100 ? 'completed' : 'active',
      });
      setEditingGoalId(null);
    }
  };

  const handleDeleteGoal = (goalId: string) => {
    deleteGoal(goalId);
    setShowDeleteConfirm(null);
  };

  const formatCurrency = (amount: number) => {
    return `Ksh ${amount.toLocaleString()}`;
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 25) return 'bg-error-500';
    if (percentage < 70) return 'bg-warning-500';
    return 'bg-success-500';
  };

  const getProgressTextColor = (percentage: number) => {
    if (percentage < 25) return 'text-error-600';
    if (percentage < 70) return 'text-warning-600';
    return 'text-success-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-error-600 bg-error-50 border-error-200';
      case 'medium': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'low': return 'text-success-600 bg-success-50 border-success-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAISuggestion = (goal: any) => {
    const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
    const daysRemaining = getDaysRemaining(goal.deadline);
    const monthlyNeeded = daysRemaining > 0 ? Math.ceil((goal.targetAmount - goal.currentAmount) / (daysRemaining / 30)) : 0;
    
    if (progress >= 100) {
      return {
        type: 'success',
        message: '🎉 Congratulations! You\'ve achieved this goal!',
        suggestion: 'Consider setting a new, more ambitious goal to keep building wealth.'
      };
    } else if (daysRemaining <= 0) {
      return {
        type: 'warning',
        message: '⚠️ This goal is overdue.',
        suggestion: `Consider extending the deadline or adjusting the target to Ksh ${goal.currentAmount.toLocaleString()}.`
      };
    } else if (progress < 25 && daysRemaining < 90) {
      return {
        type: 'urgent',
        message: '🚨 You need to accelerate your savings!',
        suggestion: `Contribute Ksh ${monthlyNeeded.toLocaleString()} monthly to reach your goal by the deadline.`
      };
    } else if (progress >= 75) {
      return {
        type: 'positive',
        message: '🌟 You\'re almost there! Great progress!',
        suggestion: `Just Ksh ${(goal.targetAmount - goal.currentAmount).toLocaleString()} more to go. You can do this!`
      };
    } else {
      return {
        type: 'neutral',
        message: '💪 Keep up the steady progress!',
        suggestion: `Contribute Ksh ${monthlyNeeded.toLocaleString()} monthly to reach your goal by ${new Date(goal.deadline).toLocaleDateString()}.`
      };
    }
  };

  const getMotivationalIcon = (progress: number) => {
    if (progress >= 90) return Trophy;
    if (progress >= 75) return Zap;
    if (progress >= 50) return TrendingUp;
    if (progress >= 25) return Star;
    return Heart;
  };

  const filteredAndSortedGoals = goals
    .filter(goal => {
      if (filters.priority !== 'all' && goal.priority !== filters.priority) return false;
      if (filters.status !== 'all' && goal.status !== filters.status) return false;
      if (searchTerm && !goal.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'progress':
          const progressA = (a.currentAmount / a.targetAmount) * 100;
          const progressB = (b.currentAmount / b.targetAmount) * 100;
          return progressB - progressA;
        case 'amount':
          return b.targetAmount - a.targetAmount;
        default:
          return 0;
      }
    });

  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const activeGoals = goals.filter(goal => goal.status === 'active').length;
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;

  return (
    <DashboardLayout 
      title="Financial Goals"
      subtitle="Track your savings goals and achieve your financial dreams"
    >
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Total Goals</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
            <p className="text-sm text-gray-500 mt-1">{activeGoals} active, {completedGoals} completed</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-success-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Total Saved</h3>
            </div>
            <p className="text-2xl font-bold text-success-600">{formatCurrency(totalSaved)}</p>
            <p className="text-sm text-gray-500 mt-1">
              {totalGoalAmount > 0 ? Math.round((totalSaved / totalGoalAmount) * 100) : 0}% of target
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-secondary-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Target Amount</h3>
            </div>
            <p className="text-2xl font-bold text-secondary-600">{formatCurrency(totalGoalAmount)}</p>
            <p className="text-sm text-gray-500 mt-1">Across all goals</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-accent-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-accent-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Remaining</h3>
            </div>
            <p className="text-2xl font-bold text-accent-600">{formatCurrency(totalGoalAmount - totalSaved)}</p>
            <p className="text-sm text-gray-500 mt-1">To reach all goals</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search goals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Goal
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="deadline">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="progress">Progress %</option>
                  <option value="amount">Target Amount</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilters({ priority: 'all', status: 'all', sortBy: 'deadline' });
                    setSearchTerm('');
                  }}
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Goal Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-slide-up">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Goal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
                <input
                  type="text"
                  placeholder="e.g., Emergency Fund, New Car"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount (Ksh)</label>
                <input
                  type="number"
                  placeholder="50000"
                  value={newGoal.targetAmount || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Amount (Ksh)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={newGoal.currentAmount || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, currentAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as 'low' | 'medium' | 'high' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                placeholder="Add any notes about this goal..."
                value={newGoal.notes}
                onChange={(e) => setNewGoal({ ...newGoal, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleAddGoal}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Create Goal
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Goals List */}
        <div className="space-y-6">
          {filteredAndSortedGoals.map((goal) => {
            const progressPercentage = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const daysRemaining = getDaysRemaining(goal.deadline);
            const isCompleted = goal.status === 'completed' || progressPercentage >= 100;
            const isOverdue = daysRemaining < 0 && !isCompleted;
            const aiSuggestion = getAISuggestion(goal);
            const MotivationalIcon = getMotivationalIcon(progressPercentage);
            const isSelected = selectedGoalId === goal.id;
            
            return (
              <div key={goal.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                {editingGoalId === goal.id ? (
                  // Edit Form
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
                        <input
                          type="text"
                          value={editGoal.name}
                          onChange={(e) => setEditGoal({ ...editGoal, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount</label>
                        <input
                          type="number"
                          value={editGoal.targetAmount}
                          onChange={(e) => setEditGoal({ ...editGoal, targetAmount: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Amount</label>
                        <input
                          type="number"
                          value={editGoal.currentAmount}
                          onChange={(e) => setEditGoal({ ...editGoal, currentAmount: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                        <input
                          type="date"
                          value={editGoal.deadline}
                          onChange={(e) => setEditGoal({ ...editGoal, deadline: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                        <select
                          value={editGoal.priority}
                          onChange={(e) => setEditGoal({ ...editGoal, priority: e.target.value as 'low' | 'medium' | 'high' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <textarea
                        value={editGoal.notes}
                        onChange={(e) => setEditGoal({ ...editGoal, notes: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={handleUpdateGoal}
                        className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingGoalId(null)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display Mode
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <MotivationalIcon className={`h-5 w-5 ${getProgressTextColor(progressPercentage)}`} />
                            <h3 className="text-xl font-semibold text-gray-900">{goal.name}</h3>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(goal.priority)}`}>
                            {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                          </span>
                          {isCompleted && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700 border border-success-200">
                              ✅ Completed
                            </span>
                          )}
                          {isOverdue && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-error-100 text-error-700 border border-error-200">
                              ⚠️ Overdue
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>Target: {formatCurrency(goal.targetAmount)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {daysRemaining >= 0 ? `${daysRemaining} days remaining` : `${Math.abs(daysRemaining)} days overdue`}
                            </span>
                          </div>
                        </div>
                        {goal.notes && (
                          <p className="text-sm text-gray-600 mb-4">{goal.notes}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedGoalId(isSelected ? null : goal.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="View details"
                        >
                          {isSelected ? <X className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleEditGoal(goal.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Edit goal"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(goal.id)}
                          className="p-2 text-gray-400 hover:text-error-600 transition-colors"
                          title="Delete goal"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                        <div
                          className={`h-4 rounded-full transition-all duration-500 ${getProgressColor(progressPercentage)} relative`}
                          style={{ width: `${progressPercentage}%` }}
                        >
                          <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Progress</p>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Completion</p>
                          <p className={`font-semibold text-2xl ${getProgressTextColor(progressPercentage)}`}>
                            {Math.round(progressPercentage)}%
                          </p>
                        </div>
                      </div>

                      {/* AI Suggestion */}
                      <div className={`p-4 rounded-lg border-l-4 ${
                        aiSuggestion.type === 'success' ? 'bg-success-50 border-success-400' :
                        aiSuggestion.type === 'warning' ? 'bg-warning-50 border-warning-400' :
                        aiSuggestion.type === 'urgent' ? 'bg-error-50 border-error-400' :
                        aiSuggestion.type === 'positive' ? 'bg-primary-50 border-primary-400' :
                        'bg-gray-50 border-gray-400'
                      }`}>
                        <div className="flex items-start gap-3">
                          <Bot className={`h-5 w-5 mt-0.5 ${
                            aiSuggestion.type === 'success' ? 'text-success-600' :
                            aiSuggestion.type === 'warning' ? 'text-warning-600' :
                            aiSuggestion.type === 'urgent' ? 'text-error-600' :
                            aiSuggestion.type === 'positive' ? 'text-primary-600' :
                            'text-gray-600'
                          }`} />
                          <div>
                            <p className={`text-sm font-medium ${
                              aiSuggestion.type === 'success' ? 'text-success-800' :
                              aiSuggestion.type === 'warning' ? 'text-warning-800' :
                              aiSuggestion.type === 'urgent' ? 'text-error-800' :
                              aiSuggestion.type === 'positive' ? 'text-primary-800' :
                              'text-gray-800'
                            }`}>
                              {aiSuggestion.message}
                            </p>
                            <p className={`text-sm mt-1 ${
                              aiSuggestion.type === 'success' ? 'text-success-700' :
                              aiSuggestion.type === 'warning' ? 'text-warning-700' :
                              aiSuggestion.type === 'urgent' ? 'text-error-700' :
                              aiSuggestion.type === 'positive' ? 'text-primary-700' :
                              'text-gray-700'
                            }`}>
                              💡 {aiSuggestion.suggestion}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    {isSelected && (
                      <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-up">
                        <h4 className="font-medium text-gray-900 mb-4">Goal Breakdown & Analytics</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 mb-2">Monthly Target</h5>
                            <p className="text-2xl font-bold text-primary-600">
                              {formatCurrency(Math.ceil((goal.targetAmount - goal.currentAmount) / Math.max(1, Math.ceil(daysRemaining / 30))))}
                            </p>
                            <p className="text-sm text-gray-500">To reach goal on time</p>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 mb-2">Days Remaining</h5>
                            <p className={`text-2xl font-bold ${daysRemaining > 0 ? 'text-success-600' : 'text-error-600'}`}>
                              {Math.abs(daysRemaining)}
                            </p>
                            <p className="text-sm text-gray-500">{daysRemaining > 0 ? 'Days left' : 'Days overdue'}</p>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 mb-2">Remaining Amount</h5>
                            <p className="text-2xl font-bold text-secondary-600">
                              {formatCurrency(Math.max(0, goal.targetAmount - goal.currentAmount))}
                            </p>
                            <p className="text-sm text-gray-500">Still needed</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Goal</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this goal? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDeleteGoal(showDeleteConfirm)}
                  className="flex-1 bg-error-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-error-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredAndSortedGoals.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm || filters.priority !== 'all' || filters.status !== 'all' 
                ? 'No goals match your filters' 
                : 'No goals yet'
              }
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filters.priority !== 'all' || filters.status !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start by creating your first savings goal'
              }
            </p>
            {!searchTerm && filters.priority === 'all' && filters.status === 'all' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Create Your First Goal
              </button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GoalsPage;