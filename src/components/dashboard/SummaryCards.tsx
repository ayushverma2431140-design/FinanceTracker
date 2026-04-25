import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { ArrowDownRight, ArrowUpRight, DollarSign, Target } from 'lucide-react';
import { Transaction } from '../../types';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  // Simple calculations for prototype
  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expenses = Math.abs(transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0));
  const balance = income - expenses;
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const items = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: DollarSign,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/20 shadow-[0_0_20px_-10px_rgba(79,70,229,0.5)]',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Total Income',
      amount: income,
      icon: ArrowUpRight,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20 shadow-[0_0_20px_-10px_rgba(16,185,129,0.5)]',
      trend: '+4.2%',
      trendUp: true,
    },
    {
      title: 'Total Expenses',
      amount: expenses,
      icon: ArrowDownRight,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/20 shadow-[0_0_20px_-10px_rgba(244,63,94,0.5)]',
      trend: '+2.1%',
      trendUp: false, // For expenses relative increase is technically 'bad' visually but we keep UI consistent
    },
    {
      title: 'Savings Rate',
      amount: savingsRate,
      isPercentage: true,
      icon: Target,
      color: 'text-[#fafafa]',
      bgColor: 'bg-[#27272a] shadow-inner',
      trend: '+5.4%',
      trendUp: true,
    }
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="border-[#27272a] shadow-xl hover:border-indigo-500/30 transition-all rounded-2xl bg-[#18181b]">
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-[#a1a1aa] mb-1">{item.title}</p>
                  <p className="text-2xl font-bold text-[#fafafa] tracking-tight">
                    {item.isPercentage ? `${item.amount.toFixed(1)}%` : formatCurrency(item.amount)}
                  </p>
                </div>
                <div className={`p-3 rounded-xl border border-[#3f3f46]/50 ${item.bgColor} ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={`text-sm font-medium ${item.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {item.trendUp ? '↑' : '↓'} {item.trend}
                </span>
                <span className="text-xs text-[#a1a1aa] font-medium tracking-wide">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
