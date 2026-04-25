import React, { useState, useEffect } from 'react';
import { Budget, Category } from '../../types';
import { EXPENSE_CATEGORIES } from '../../constants';
import { ChevronDown } from 'lucide-react';

interface BudgetFormProps {
  initialData?: Budget | null;
  onSubmit: (budget: Omit<Budget, 'id'> | Budget) => void;
  onCancel: () => void;
}

export function BudgetForm({ initialData, onSubmit, onCancel }: BudgetFormProps) {
  const [category, setCategory] = useState<Category>(EXPENSE_CATEGORIES[0] as Category);
  const [amount, setAmount] = useState('');
  const [rollover, setRollover] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category);
      setAmount(initialData.amount.toString());
      setRollover(initialData.rollover || false);
    } else {
      setCategory(EXPENSE_CATEGORIES[0] as Category);
      setAmount('');
      setRollover(false);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount))) return;
    
    const budgetData = {
      category,
      amount: parseFloat(amount),
      period: 'monthly' as const,
      rollover: rollover
    };

    if (initialData) {
      onSubmit({ ...budgetData, id: initialData.id });
    } else {
      onSubmit(budgetData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-[#fafafa]">
      <div>
        <label className="block text-xs font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">Category</label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full pl-4 pr-10 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner appearance-none"
          >
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#71717a] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a] font-medium">$</span>
          <input
            type="number"
            step="0.01"
            min="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4 p-4 rounded-xl border border-[#27272a] bg-[#18181b]">
        <input
          type="checkbox"
          id="rollover"
          checked={rollover}
          onChange={(e) => setRollover(e.target.checked)}
          className="w-4 h-4 rounded border-[#3f3f46] text-emerald-500 focus:ring-emerald-500 bg-[#09090b]"
        />
        <label htmlFor="rollover" className="text-sm font-medium text-[#fafafa]">
          Rollover remaining amount to next month
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 text-[#fafafa] font-bold uppercase tracking-widest text-xs bg-[#27272a] rounded-xl hover:bg-[#3f3f46] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 text-black font-bold uppercase tracking-widest text-xs bg-emerald-500 rounded-xl hover:bg-emerald-400 transition-colors"
        >
          {initialData ? 'Save Changes' : 'Create Budget'}
        </button>
      </div>
    </form>
  );
}
