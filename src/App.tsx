/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { ViewType } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { Transactions } from './components/transactions/Transactions';
import { Budgets } from './components/budgets/Budgets';
import { Transaction, Budget } from './types';
import { INITIAL_TRANSACTIONS, INITIAL_BUDGETS } from './constants';

import { Settings } from './components/settings/Settings';
import { Support } from './components/support/Support';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedT = localStorage.getItem('fin_transactions');
    if (savedT) {
      try {
        return JSON.parse(savedT);
      } catch (e) {
        // Fallback to initial
      }
    }
    return INITIAL_TRANSACTIONS;
  });
  
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const savedB = localStorage.getItem('fin_budgets');
    if (savedB) {
      try {
        return JSON.parse(savedB);
      } catch (e) {
        // Fallback to initial
      }
    }
    return INITIAL_BUDGETS;
  });

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('fin_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('fin_budgets', JSON.stringify(budgets));
  }, [budgets]);

  const handleAddTransaction = (newT: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newT,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleUpdateBudget = (updatedBudget: Budget) => {
    setBudgets(prev => prev.map(b => b.id === updatedBudget.id ? updatedBudget : b));
  };

  const handleCreateBudget = (newBudget: Omit<Budget, 'id'>) => {
    const budget: Budget = {
      ...newBudget,
      id: Math.random().toString(36).substr(2, 9),
    };
    setBudgets(prev => [...prev, budget]);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard transactions={transactions} />;
      case 'transactions':
        return <Transactions 
          transactions={transactions} 
          onAddTransaction={handleAddTransaction} 
          onDeleteTransaction={handleDeleteTransaction}
        />;
      case 'budgets':
        return <Budgets 
          budgets={budgets} 
          transactions={transactions} 
          onUpdateBudget={handleUpdateBudget}
          onCreateBudget={handleCreateBudget}
        />;
      case 'settings':
        return <Settings />;
      case 'support':
        return <Support />;
      default:
        return <Dashboard transactions={transactions} />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderView()}
    </Layout>
  );
}
