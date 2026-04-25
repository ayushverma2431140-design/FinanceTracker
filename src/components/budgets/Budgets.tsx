import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Budget, Transaction } from '../../types';
import { Plus, RefreshCw, Edit2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { BudgetForm } from './BudgetForm';

interface BudgetsProps {
  budgets: Budget[];
  transactions: Transaction[];
  onUpdateBudget?: (budget: Budget) => void;
  onCreateBudget?: (budget: Omit<Budget, 'id'>) => void;
}

export function Budgets({ budgets, transactions, onUpdateBudget, onCreateBudget }: BudgetsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  // Calculate spent amounts for the current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Find earliest transaction to calculate cumulative past months
  const earliestDate = transactions.reduce((earliest, t) => {
    const d = new Date(t.date);
    return d < earliest ? d : earliest;
  }, now);

  const monthsDiff = (currentYear - earliestDate.getFullYear()) * 12 + (currentMonth - earliestDate.getMonth());
  const pastMonthsCount = Math.max(0, monthsDiff);

  const spentCurrentMonth = transactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const pastSpentByCategory = transactions
    .filter(t => {
      if (t.type !== 'expense') return false;
      const d = new Date(t.date);
      return d.getFullYear() < currentYear || (d.getFullYear() === currentYear && d.getMonth() < currentMonth);
    })
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const toggleRollover = (budget: Budget) => {
    if (onUpdateBudget) {
      onUpdateBudget({ ...budget, rollover: !budget.rollover });
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#fafafa] uppercase tracking-tight">Budgets</h2>
          <p className="text-[#a1a1aa] mt-1 text-sm font-medium tracking-wide">Track your spending limits for this month.</p>
        </div>
        <button
          onClick={() => {
            setEditingBudget(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-emerald-500 text-black px-4 py-2.5 rounded-xl hover:bg-emerald-400 transition-colors font-bold text-sm uppercase tracking-wide"
        >
          <Plus className="w-5 h-5" />
          Create Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map(budget => {
          const spent = spentCurrentMonth[budget.category] || 0;
          
          let limit = budget.amount;
          let rolloverAmount = 0;
          if (budget.rollover) {
            const totalPastBudget = pastMonthsCount * budget.amount;
            const pastSpent = pastSpentByCategory[budget.category] || 0;
            rolloverAmount = totalPastBudget - pastSpent;
            limit += rolloverAmount;
          }

          const percentage = Math.min((spent / Math.max(limit, 0.01)) * 100, 100);
          const isWarning = percentage >= 80;
          const isDanger = percentage >= 100;
          
          let barColor = 'bg-emerald-500 shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]';
          if (isDanger) barColor = 'bg-rose-500 shadow-[0_0_15px_-3px_rgba(244,63,94,0.5)]';
          else if (isWarning) barColor = 'bg-amber-500 shadow-[0_0_15px_-3px_rgba(245,158,11,0.5)]';

          const badgeClasses = isDanger ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : isWarning ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';

          return (
            <Card key={budget.id} className="border-[#27272a] shadow-xl hover:border-indigo-500/30 transition-all rounded-2xl bg-[#18181b] flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-bold text-[#fafafa] text-lg tracking-tight uppercase">{budget.category}</div>
                    {budget.rollover && rolloverAmount !== 0 && (
                      <div className={`text-xs mt-1 font-medium ${rolloverAmount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {rolloverAmount > 0 ? '+' : ''}{rolloverAmount > 0 ? '$' : '-$'}{Math.abs(rolloverAmount).toFixed(2)} from past months
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${badgeClasses}`}>
                      {percentage.toFixed(0)}% Used
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingBudget(budget);
                        setIsModalOpen(true);
                      }}
                      className="text-[#71717a] hover:text-[#fafafa] transition-colors p-1"
                      title="Edit Budget"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-3 flex justify-between text-sm mt-auto pt-4">
                  <span className="text-[#a1a1aa] font-medium tracking-wide">Spent: <span className="text-[#fafafa]">${spent.toFixed(2)}</span></span>
                  <span className="text-[#a1a1aa] font-medium tracking-wide">Limit: <span className="text-[#fafafa]">${limit.toFixed(2)}</span></span>
                </div>

                <div className="h-2 w-full bg-[#09090b] border border-[#27272a] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${barColor} transition-all duration-500 relative`}
                    style={{ width: `${percentage}%` }}
                  >
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-[#27272a] flex justify-between items-center">
                  <div className="text-[10px] text-[#71717a] uppercase tracking-widest font-bold">
                    {budget.period} reset
                  </div>
                  <button
                    onClick={() => toggleRollover(budget)}
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded transition-colors ${
                      budget.rollover 
                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
                        : 'bg-[#27272a] text-[#71717a] hover:text-[#fafafa]'
                    }`}
                  >
                    <RefreshCw className="w-3 h-3" />
                    Rollover {budget.rollover ? 'ON' : 'OFF'}
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBudget(null);
        }}
        title={editingBudget ? "Edit Budget" : "Create Budget"}
      >
        <BudgetForm
          initialData={editingBudget}
          onSubmit={(budgetData) => {
            if (editingBudget && onUpdateBudget) {
              onUpdateBudget(budgetData as Budget);
            } else if (!editingBudget && onCreateBudget) {
              onCreateBudget(budgetData as Omit<Budget, 'id'>);
            }
            setIsModalOpen(false);
            setEditingBudget(null);
          }}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingBudget(null);
          }}
        />
      </Modal>
    </div>
  );
}
