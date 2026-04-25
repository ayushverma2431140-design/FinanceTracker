import React, { useState } from 'react';
import { Transaction, Category } from '../../types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../constants';
import { ChevronDown } from 'lucide-react';

interface AddTransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

export function AddTransactionForm({ onAdd, onCancel }: AddTransactionFormProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;
    
    onAdd({
      type,
      amount: type === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
      category,
      date: new Date(date).toISOString(),
      description
    });
  };

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-[#fafafa]">
      <div className="flex gap-4 p-1 bg-[#09090b] border border-[#27272a] rounded-xl relative shadow-inner">
        <button
          type="button"
          onClick={() => { setType('expense'); setCategory(EXPENSE_CATEGORIES[0] as Category); }}
          className={`flex-1 py-2 text-sm font-bold tracking-wide rounded-lg z-10 transition-colors ${type === 'expense' ? 'text-[#fafafa]' : 'text-[#71717a] hover:text-[#a1a1aa]'}`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => { setType('income'); setCategory(INCOME_CATEGORIES[0] as Category); }}
          className={`flex-1 py-2 text-sm font-bold tracking-wide rounded-lg z-10 transition-colors ${type === 'income' ? 'text-[#fafafa]' : 'text-[#71717a] hover:text-[#a1a1aa]'}`}
        >
          Income
        </button>
        <div 
          className={`absolute inset-y-1 w-[calc(50%-4px)] bg-[#27272a] shadow-md rounded-lg transition-all duration-300 ease-in-out ${type === 'income' ? 'left-[calc(50%+2px)]' : 'left-1'}`} 
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a] font-medium">$</span>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">Description</label>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner"
          placeholder="e.g., Grocery Shopping"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">Category</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full pl-4 pr-10 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner appearance-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#71717a] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner [color-scheme:dark]"
          />
        </div>
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
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </div>
    </form>
  );
}
