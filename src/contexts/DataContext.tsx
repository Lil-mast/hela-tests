import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Budget {
  income: number;
  expenses: number;
  leftover: number;
}

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

interface Reminder {
  id: string;
  title: string;
  description?: string;
  frequency: 'one-time' | 'weekly' | 'monthly';
  notificationMethod: 'email' | 'sms' | 'both';
  dueDate: string;
  nextDue?: string;
  status: 'active' | 'completed' | 'snoozed';
  createdAt: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: Array<{
    label: string;
    action: string;
    data?: any;
  }>;
}

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  merchant?: string;
}

interface DataContextType {
  budget: Budget;
  goals: Goal[];
  reminders: Reminder[];
  chatHistory: ChatMessage[];
  transactions: Transaction[];
  updateBudget: (budget: Budget) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [budget, setBudget] = useState<Budget>({
    income: 75000,
    expenses: 45000,
    leftover: 30000,
  });

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 150000,
      currentAmount: 45000,
      deadline: '2025-12-31',
      notes: 'Save 6 months of expenses for emergencies',
      priority: 'high',
      status: 'active',
      createdAt: '2025-01-01',
    },
    {
      id: '2',
      name: 'New Laptop',
      targetAmount: 80000,
      currentAmount: 25000,
      deadline: '2025-06-30',
      notes: 'MacBook Pro for work',
      priority: 'medium',
      status: 'active',
      createdAt: '2025-01-05',
    },
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Pay Rent',
      description: 'Monthly rent payment',
      frequency: 'monthly',
      notificationMethod: 'both',
      dueDate: '2025-02-01',
      nextDue: '2025-02-01',
      status: 'active',
      createdAt: '2025-01-01',
    },
    {
      id: '2',
      title: 'Electricity Bill',
      description: 'KPLC monthly bill',
      frequency: 'monthly',
      notificationMethod: 'email',
      dueDate: '2025-01-25',
      nextDue: '2025-01-25',
      status: 'active',
      createdAt: '2025-01-01',
    },
    {
      id: '3',
      title: 'Save for Vacation',
      description: 'Transfer money to vacation savings',
      frequency: 'weekly',
      notificationMethod: 'sms',
      dueDate: '2025-01-20',
      nextDue: '2025-01-20',
      status: 'active',
      createdAt: '2025-01-10',
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      amount: 75000,
      description: 'Salary',
      category: 'Salary',
      date: '2025-01-01',
      merchant: 'Company Ltd',
    },
    {
      id: '2',
      type: 'expense',
      amount: 15000,
      description: 'Rent',
      category: 'Housing',
      date: '2025-01-02',
      merchant: 'Landlord',
    },
    {
      id: '3',
      type: 'expense',
      amount: 3500,
      description: 'Groceries',
      category: 'Food',
      date: '2025-01-15',
      merchant: 'Naivas',
    },
  ]);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Hela, your AI financial assistant. I can help you with budgeting, saving goals, expense tracking, and financial advice. What would you like to know?',
      timestamp: new Date().toISOString(),
    },
  ]);

  const updateBudget = (newBudget: Budget) => {
    setBudget(newBudget);
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const addReminder = (reminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, ...updates } : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatHistory(prev => [...prev, message]);
  };

  const clearChat = () => {
    setChatHistory([{
      role: 'assistant',
      content: 'Hi! I\'m Hela, your AI financial assistant. I can help you with budgeting, saving goals, expense tracking, and financial advice. What would you like to know?',
      timestamp: new Date().toISOString(),
    }]);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const value: DataContextType = {
    budget,
    goals,
    reminders,
    chatHistory,
    transactions,
    updateBudget,
    addGoal,
    updateGoal,
    deleteGoal,
    addReminder,
    updateReminder,
    deleteReminder,
    addChatMessage,
    clearChat,
    addTransaction,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};