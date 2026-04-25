import React from 'react';
import { SummaryCards } from './SummaryCards';
import { DashboardCharts } from './DashboardCharts';
import { RecentTransactions } from './RecentTransactions';
import { Transaction } from '../../types';

interface DashboardProps {
  transactions: Transaction[];
}

export function Dashboard({ transactions }: DashboardProps) {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#fafafa] uppercase tracking-tight">Welcome back, Ayush! 👋</h2>
        <p className="text-[#a1a1aa] mt-1 text-sm font-medium tracking-wide">Here is what's happening with your finances today.</p>
      </div>

      <SummaryCards transactions={transactions} />
      <DashboardCharts transactions={transactions} />
      <RecentTransactions transactions={transactions} />
    </div>
  );
}
