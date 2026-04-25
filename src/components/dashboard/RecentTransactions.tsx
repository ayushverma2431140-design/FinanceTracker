import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Transaction } from '../../types';
import { format, parseISO } from 'date-fns';
import { ArrowDownRight, ArrowUpRight, ShoppingBag, Coffee, Home, Car, Zap, HeartPulse, PiggyBank, Film, MoreHorizontal } from 'lucide-react';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  // Sort by date desc and take top 5
  const recent = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Housing': return Home;
      case 'Food': return ShoppingBag;
      case 'Transportation': return Car;
      case 'Utilities': return Zap;
      case 'Healthcare': return HeartPulse;
      case 'Saving & Debt': return PiggyBank;
      case 'Entertainment': return Film;
      default: return Coffee;
    }
  };

  return (
    <Card className="mt-6 border-[#27272a] bg-[#18181b] shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#27272a]">
        <CardTitle className="text-[#fafafa]">Recent Transactions</CardTitle>
        <button className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300">View All</button>
      </CardHeader>
      <CardContent className="p-5">
        <div className="space-y-4 mt-4">
          {recent.map((t) => {
            const isIncome = t.type === 'income';
            const Icon = isIncome ? ArrowUpRight : getCategoryIcon(t.category);
            
            return (
              <div key={t.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#27272a] transition-colors">
                <div className="w-10 h-10 bg-zinc-800 border border-[#3f3f46] rounded-full flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${isIncome ? 'text-emerald-400' : 'text-[#a1a1aa]'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#fafafa] truncate">{t.description}</p>
                  <p className="text-xs text-[#71717a] mt-0.5 tracking-wide">{t.category} • {format(parseISO(t.date), 'MMM dd')}</p>
                </div>
                <div className={`text-sm font-semibold ${isIncome ? 'text-emerald-500' : 'text-[#fafafa]'}`}>
                  {isIncome ? '+' : '-'}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(t.amount))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
