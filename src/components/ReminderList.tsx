import React, { useState } from 'react';
import { Bell, Plus, Check, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const ReminderList: React.FC = () => {
  const { reminders, addReminder, updateReminder } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    text: '',
    dueDate: '',
  });

  const pendingReminders = reminders.filter(r => r.status === 'pending').slice(0, 3);

  const handleAddReminder = () => {
    if (newReminder.text && newReminder.dueDate) {
      addReminder({
        ...newReminder,
        status: 'pending',
      });
      setNewReminder({ text: '', dueDate: '' });
      setShowAddForm(false);
    }
  };

  const handleToggleReminder = (id: string, currentStatus: string) => {
    updateReminder(id, {
      status: currentStatus === 'pending' ? 'completed' : 'pending'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-accent-100 rounded-full flex items-center justify-center">
            <Bell className="h-5 w-5 text-accent-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Reminders</h3>
            <p className="text-sm text-gray-500">
              {pendingReminders.length} upcoming
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {pendingReminders.length > 0 ? (
          pendingReminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                isOverdue(reminder.dueDate)
                  ? 'bg-error-50 border-error-200'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <button
                onClick={() => handleToggleReminder(reminder.id, reminder.status)}
                className={`flex-shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                  reminder.status === 'completed'
                    ? 'bg-success-500 border-success-500 text-white'
                    : 'border-gray-300 hover:border-primary-500'
                }`}
              >
                {reminder.status === 'completed' && <Check className="h-3 w-3" />}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  reminder.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                }`}>
                  {reminder.text}
                </p>
                <p className={`text-xs ${
                  isOverdue(reminder.dueDate) 
                    ? 'text-error-600 font-medium' 
                    : 'text-gray-500'
                }`}>
                  {isOverdue(reminder.dueDate) ? 'Overdue • ' : ''}{formatDate(reminder.dueDate)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">No reminders set</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              Add your first reminder
            </button>
          </div>
        )}
      </div>
      
      {showAddForm && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <input
            type="text"
            placeholder="Reminder text (e.g., Pay rent)"
            value={newReminder.text}
            onChange={(e) => setNewReminder({ ...newReminder, text: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          
          <input
            type="date"
            value={newReminder.dueDate}
            onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          
          <div className="flex gap-2">
            <button
              onClick={handleAddReminder}
              className="flex-1 bg-accent-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-accent-700 transition-colors"
            >
              Add Reminder
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
      
      {!showAddForm && pendingReminders.length > 0 && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full mt-4 bg-accent-50 text-accent-700 py-2 px-4 rounded-lg font-medium hover:bg-accent-100 transition-colors"
        >
          Add Reminder
        </button>
      )}
    </div>
  );
};

export default ReminderList;