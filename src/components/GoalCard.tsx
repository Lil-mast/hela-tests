import React, { useState } from 'react';
import { Target, Plus, Edit3, Check, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const GoalCard: React.FC = () => {
  const { goals, addGoal, updateGoal } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
  });

  const primaryGoal = goals[0];

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetAmount > 0) {
      addGoal({
        ...newGoal,
        status: 'in-progress',
      });
      setNewGoal({
        title: '',
        targetAmount: 0,
        currentAmount: 0,
        deadline: '',
      });
      setShowAddForm(false);
    }
  };

  const handleUpdateProgress = (goalId: string, newAmount: number) => {
    updateGoal(goalId, { currentAmount: newAmount });
    setEditingGoalId(null);
  };

  const formatCurrency = (amount: number) => {
    return `Ksh ${amount.toLocaleString()}`;
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-secondary-100 rounded-full flex items-center justify-center">
            <Target className="h-5 w-5 text-secondary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Your Goals</h3>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      {primaryGoal ? (
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{primaryGoal.title}</h4>
              <p className="text-sm text-gray-500">
                Due: {new Date(primaryGoal.deadline).toLocaleDateString()}
              </p>
            </div>
            
            <button
              onClick={() => setEditingGoalId(primaryGoal.id)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Edit3 className="h-3 w-3" />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-secondary-500 to-primary-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage(primaryGoal.currentAmount, primaryGoal.targetAmount)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">
                {Math.round(getProgressPercentage(primaryGoal.currentAmount, primaryGoal.targetAmount))}% complete
              </span>
              <span className="font-medium text-gray-900">
                {formatCurrency(primaryGoal.currentAmount)} / {formatCurrency(primaryGoal.targetAmount)}
              </span>
            </div>
          </div>
          
          {editingGoalId === primaryGoal.id ? (
            <div className="flex items-center gap-2 pt-2">
              <input
                type="number"
                defaultValue={primaryGoal.currentAmount}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Update progress amount"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateProgress(primaryGoal.id, Number((e.target as HTMLInputElement).value));
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                  handleUpdateProgress(primaryGoal.id, Number(input.value));
                }}
                className="p-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => setEditingGoalId(null)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingGoalId(primaryGoal.id)}
              className="w-full bg-secondary-50 text-secondary-700 py-2 px-4 rounded-lg font-medium hover:bg-secondary-100 transition-colors"
            >
              Update Progress
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <Target className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No goals set yet</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            Add your first goal
          </button>
        </div>
      )}
      
      {showAddForm && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <input
            type="text"
            placeholder="Goal title (e.g., Emergency Fund)"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Target amount"
              value={newGoal.targetAmount || ''}
              onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleAddGoal}
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Add Goal
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCard;