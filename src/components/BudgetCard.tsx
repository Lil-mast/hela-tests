import React, { useState } from 'react';
import { Wallet, Edit3, Check, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const BudgetCard: React.FC = () => {
  const { budget, updateBudget } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    income: budget.income,
    expenses: budget.expenses,
  });

  const handleSave = () => {
    const leftover = editData.income - editData.expenses;
    updateBudget({
      income: editData.income,
      expenses: editData.expenses,
      leftover: leftover,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      income: budget.income,
      expenses: budget.expenses,
    });
    setIsEditing(false);
  };

  const formatCurrency = (amount: number) => {
    return `Ksh ${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Wallet className="h-5 w-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Your Budget Summary</h3>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit3 className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="p-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Income:</span>
          {isEditing ? (
            <input
              type="number"
              value={editData.income}
              onChange={(e) => setEditData({ ...editData, income: Number(e.target.value) })}
              className="w-32 px-2 py-1 text-right border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          ) : (
            <span className="font-semibold text-gray-900">{formatCurrency(budget.income)}</span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Expenses:</span>
          {isEditing ? (
            <input
              type="number"
              value={editData.expenses}
              onChange={(e) => setEditData({ ...editData, expenses: Number(e.target.value) })}
              className="w-32 px-2 py-1 text-right border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          ) : (
            <span className="font-semibold text-error-600">{formatCurrency(budget.expenses)}</span>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Leftover:</span>
            <span className={`font-bold text-lg ${
              (isEditing ? editData.income - editData.expenses : budget.leftover) >= 0 
                ? 'text-success-600' 
                : 'text-error-600'
            }`}>
              {formatCurrency(isEditing ? editData.income - editData.expenses : budget.leftover)}
            </span>
          </div>
        </div>
      </div>
      
      {!isEditing && (
        <div className="mt-6">
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-primary-50 text-primary-700 py-2 px-4 rounded-lg font-medium hover:bg-primary-100 transition-colors"
          >
            Update Budget
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;