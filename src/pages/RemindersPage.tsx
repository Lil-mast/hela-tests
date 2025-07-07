import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useData } from '../contexts/DataContext';
import { Plus, Bell, Calendar, Mail, MessageSquare, Edit3, Trash2, Check, X, Clock, AlertCircle, SunSnow as Snooze, RotateCcw, Bot, Search, Filter } from 'lucide-react';

const RemindersPage: React.FC = () => {
  const { reminders, addReminder, updateReminder, deleteReminder } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'overdue'>('all');

  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    frequency: 'one-time' as 'one-time' | 'weekly' | 'monthly',
    notificationMethod: 'email' as 'email' | 'sms' | 'both',
    dueDate: '',
  });

  const [editReminder, setEditReminder] = useState({
    title: '',
    description: '',
    frequency: 'one-time' as 'one-time' | 'weekly' | 'monthly',
    notificationMethod: 'email' as 'email' | 'sms' | 'both',
    dueDate: '',
  });

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.dueDate) {
      addReminder({
        ...newReminder,
        nextDue: newReminder.dueDate,
        status: 'active',
      });
      setNewReminder({
        title: '',
        description: '',
        frequency: 'one-time',
        notificationMethod: 'email',
        dueDate: '',
      });
      setShowAddForm(false);
    }
  };

  const handleEditReminder = (reminderId: string) => {
    const reminder = reminders.find(r => r.id === reminderId);
    if (reminder) {
      setEditReminder({
        title: reminder.title,
        description: reminder.description || '',
        frequency: reminder.frequency,
        notificationMethod: reminder.notificationMethod,
        dueDate: reminder.dueDate,
      });
      setEditingReminderId(reminderId);
    }
  };

  const handleUpdateReminder = () => {
    if (editingReminderId && editReminder.title && editReminder.dueDate) {
      updateReminder(editingReminderId, {
        ...editReminder,
        nextDue: editReminder.dueDate,
      });
      setEditingReminderId(null);
    }
  };

  const handleDeleteReminder = (reminderId: string) => {
    deleteReminder(reminderId);
    setShowDeleteConfirm(null);
  };

  const handleCompleteReminder = (reminderId: string) => {
    const reminder = reminders.find(r => r.id === reminderId);
    if (reminder) {
      if (reminder.frequency === 'one-time') {
        updateReminder(reminderId, { status: 'completed' });
      } else {
        // Calculate next due date for recurring reminders
        const currentDue = new Date(reminder.nextDue || reminder.dueDate);
        let nextDue = new Date(currentDue);
        
        if (reminder.frequency === 'weekly') {
          nextDue.setDate(nextDue.getDate() + 7);
        } else if (reminder.frequency === 'monthly') {
          nextDue.setMonth(nextDue.getMonth() + 1);
        }
        
        updateReminder(reminderId, { 
          nextDue: nextDue.toISOString().split('T')[0],
          status: 'active'
        });
      }
    }
  };

  const handleSnoozeReminder = (reminderId: string, days: number) => {
    const reminder = reminders.find(r => r.id === reminderId);
    if (reminder) {
      const currentDue = new Date(reminder.nextDue || reminder.dueDate);
      const newDue = new Date(currentDue);
      newDue.setDate(newDue.getDate() + days);
      
      updateReminder(reminderId, {
        nextDue: newDue.toISOString().split('T')[0],
        status: 'snoozed'
      });
    }
  };

  const handleRescheduleReminder = (reminderId: string, newDate: string) => {
    updateReminder(reminderId, {
      nextDue: newDate,
      dueDate: newDate,
      status: 'active'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getNotificationIcon = (method: string) => {
    switch (method) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'both': return Bell;
      default: return Bell;
    }
  };

  const getStatusColor = (reminder: any) => {
    const daysUntil = getDaysUntilDue(reminder.nextDue || reminder.dueDate);
    
    if (reminder.status === 'completed') return 'bg-success-100 border-success-200 text-success-800';
    if (isOverdue(reminder.nextDue || reminder.dueDate)) return 'bg-error-100 border-error-200 text-error-800';
    if (daysUntil <= 3) return 'bg-warning-100 border-warning-200 text-warning-800';
    return 'bg-gray-100 border-gray-200 text-gray-800';
  };

  const getStatusTag = (reminder: any) => {
    const daysUntil = getDaysUntilDue(reminder.nextDue || reminder.dueDate);
    
    if (reminder.status === 'completed') return { text: 'Completed', color: 'bg-success-100 text-success-700' };
    if (isOverdue(reminder.nextDue || reminder.dueDate)) return { text: 'Overdue', color: 'bg-error-100 text-error-700' };
    if (daysUntil === 0) return { text: 'Due Today', color: 'bg-warning-100 text-warning-700' };
    if (daysUntil <= 3) return { text: 'Due Soon', color: 'bg-warning-100 text-warning-700' };
    return { text: 'Upcoming', color: 'bg-primary-100 text-primary-700' };
  };

  const getAISuggestion = (reminder: any) => {
    const isRecurring = reminder.frequency !== 'one-time';
    const daysUntil = getDaysUntilDue(reminder.nextDue || reminder.dueDate);
    
    if (reminder.status === 'completed') {
      return {
        message: '✅ Great job completing this reminder!',
        suggestion: isRecurring ? 'This will automatically reschedule for next time.' : 'Consider setting up a recurring reminder if this is a regular task.'
      };
    } else if (isOverdue(reminder.nextDue || reminder.dueDate)) {
      return {
        message: '⚠️ This reminder is overdue.',
        suggestion: 'Complete it now to avoid late fees, or reschedule if needed.'
      };
    } else if (daysUntil <= 1) {
      return {
        message: '🔔 This is due very soon!',
        suggestion: 'Set up automatic payments to never miss this again.'
      };
    } else if (!isRecurring && reminder.title.toLowerCase().includes('bill')) {
      return {
        message: '💡 This looks like a recurring bill.',
        suggestion: 'Would you like to make this a monthly reminder?'
      };
    } else {
      return {
        message: '📅 Reminder is on track.',
        suggestion: 'You can snooze or reschedule if plans change.'
      };
    }
  };

  const filteredReminders = reminders.filter(reminder => {
    if (searchTerm && !reminder.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    switch (filterStatus) {
      case 'active':
        return reminder.status === 'active' && !isOverdue(reminder.nextDue || reminder.dueDate);
      case 'completed':
        return reminder.status === 'completed';
      case 'overdue':
        return reminder.status === 'active' && isOverdue(reminder.nextDue || reminder.dueDate);
      default:
        return true;
    }
  });

  const activeReminders = reminders.filter(r => r.status === 'active');
  const completedReminders = reminders.filter(r => r.status === 'completed');
  const overdueReminders = activeReminders.filter(r => isOverdue(r.nextDue || r.dueDate));
  const upcomingReminders = activeReminders.filter(r => !isOverdue(r.nextDue || r.dueDate));

  return (
    <DashboardLayout 
      title="Reminders"
      subtitle="Never miss important financial tasks and deadlines"
    >
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Total Reminders</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{reminders.length}</p>
            <p className="text-sm text-gray-500 mt-1">{activeReminders.length} active</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-error-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-error-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Overdue</h3>
            </div>
            <p className="text-2xl font-bold text-error-600">{overdueReminders.length}</p>
            <p className="text-sm text-gray-500 mt-1">Need attention</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-warning-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Upcoming</h3>
            </div>
            <p className="text-2xl font-bold text-warning-600">{upcomingReminders.length}</p>
            <p className="text-sm text-gray-500 mt-1">On schedule</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-success-100 rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-success-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Completed</h3>
            </div>
            <p className="text-2xl font-bold text-success-600">{completedReminders.length}</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reminders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Reminders</option>
              <option value="active">Active</option>
              <option value="overdue">Overdue</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Reminder
          </button>
        </div>

        {/* Add Reminder Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-slide-up">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Reminder</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="e.g., Pay electricity bill"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={newReminder.dueDate}
                  onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={newReminder.frequency}
                  onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value as 'one-time' | 'weekly' | 'monthly' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="one-time">One-time</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Method</label>
                <select
                  value={newReminder.notificationMethod}
                  onChange={(e) => setNewReminder({ ...newReminder, notificationMethod: e.target.value as 'email' | 'sms' | 'both' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <textarea
                placeholder="Add any additional details..."
                value={newReminder.description}
                onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleAddReminder}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Create Reminder
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

        {/* Reminders List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {filterStatus === 'all' ? 'All Reminders' : 
               filterStatus === 'active' ? 'Active Reminders' :
               filterStatus === 'overdue' ? 'Overdue Reminders' :
               'Completed Reminders'} ({filteredReminders.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredReminders.length > 0 ? (
              filteredReminders.map((reminder) => {
                const NotificationIcon = getNotificationIcon(reminder.notificationMethod);
                const daysUntilDue = getDaysUntilDue(reminder.nextDue || reminder.dueDate);
                const statusTag = getStatusTag(reminder);
                const aiSuggestion = getAISuggestion(reminder);
                
                return (
                  <div key={reminder.id} className={`p-6 border-l-4 ${getStatusColor(reminder)}`}>
                    {editingReminderId === reminder.id ? (
                      // Edit Form
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                              type="text"
                              value={editReminder.title}
                              onChange={(e) => setEditReminder({ ...editReminder, title: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                            <input
                              type="date"
                              value={editReminder.dueDate}
                              onChange={(e) => setEditReminder({ ...editReminder, dueDate: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                            <select
                              value={editReminder.frequency}
                              onChange={(e) => setEditReminder({ ...editReminder, frequency: e.target.value as 'one-time' | 'weekly' | 'monthly' })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="one-time">One-time</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Notification Method</label>
                            <select
                              value={editReminder.notificationMethod}
                              onChange={(e) => setEditReminder({ ...editReminder, notificationMethod: e.target.value as 'email' | 'sms' | 'both' })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="email">Email</option>
                              <option value="sms">SMS</option>
                              <option value="both">Both</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={editReminder.description}
                            onChange={(e) => setEditReminder({ ...editReminder, description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div className="flex gap-3">
                          <button
                            onClick={handleUpdateReminder}
                            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                          >
                            <Check className="h-4 w-4" />
                            Save Changes
                          </button>
                          <button
                            onClick={() => setEditingReminderId(null)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <X className="h-4 w-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Display Mode
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900 text-lg">{reminder.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusTag.color}`}>
                                {statusTag.text}
                              </span>
                              {reminder.frequency !== 'one-time' && (
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                                  {reminder.frequency}
                                </span>
                              )}
                            </div>
                            {reminder.description && (
                              <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Due: {formatDate(reminder.nextDue || reminder.dueDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <NotificationIcon className="h-4 w-4" />
                                {reminder.notificationMethod}
                              </div>
                              {daysUntilDue !== 0 && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {daysUntilDue > 0 ? `${daysUntilDue} days left` : `${Math.abs(daysUntilDue)} days overdue`}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {reminder.status === 'active' && (
                              <>
                                <button
                                  onClick={() => handleCompleteReminder(reminder.id)}
                                  className="flex items-center gap-1 bg-success-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-success-700 transition-colors"
                                  title="Mark as complete"
                                >
                                  <Check className="h-4 w-4" />
                                  Complete
                                </button>
                                
                                <div className="relative group">
                                  <button className="flex items-center gap-1 bg-warning-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-warning-700 transition-colors">
                                    <Snooze className="h-4 w-4" />
                                    Snooze
                                  </button>
                                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                    <div className="p-2 space-y-1">
                                      <button
                                        onClick={() => handleSnoozeReminder(reminder.id, 1)}
                                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                                      >
                                        1 day
                                      </button>
                                      <button
                                        onClick={() => handleSnoozeReminder(reminder.id, 3)}
                                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                                      >
                                        3 days
                                      </button>
                                      <button
                                        onClick={() => handleSnoozeReminder(reminder.id, 7)}
                                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                                      >
                                        1 week
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            
                            <button
                              onClick={() => handleEditReminder(reminder.id)}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Edit reminder"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(reminder.id)}
                              className="p-2 text-gray-400 hover:text-error-600 transition-colors"
                              title="Delete reminder"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* AI Suggestion */}
                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary-400">
                          <div className="flex items-start gap-3">
                            <Bot className="h-5 w-5 text-primary-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-primary-800">
                                {aiSuggestion.message}
                              </p>
                              <p className="text-sm text-primary-700 mt-1">
                                💡 {aiSuggestion.suggestion}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center">
                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || filterStatus !== 'all' ? 'No reminders found' : 'No reminders set'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first reminder to stay on top of your financial tasks'
                  }
                </p>
                {!searchTerm && filterStatus === 'all' && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Create Your First Reminder
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Reminder</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this reminder? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDeleteReminder(showDeleteConfirm)}
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
      </div>
    </DashboardLayout>
  );
};

export default RemindersPage;