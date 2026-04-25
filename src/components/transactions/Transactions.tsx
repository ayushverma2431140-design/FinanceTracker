import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Transaction } from '../../types';
import { format, parseISO } from 'date-fns';
import { ArrowDownRight, ArrowUpRight, Search, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { AddTransactionForm } from './AddTransactionForm';

interface TransactionsProps {
  transactions: Transaction[];
  onAddTransaction: (t: Omit<Transaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
}

export function Transactions({ transactions, onAddTransaction, onDeleteTransaction }: TransactionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const filtered = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' ? true : t.type === filterType;
    return matchesSearch && matchesType;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#fafafa] uppercase tracking-tight">Transactions</h2>
          <p className="text-[#a1a1aa] mt-1 text-sm font-medium tracking-wide">View and manage your financial activity.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 text-black px-4 py-2.5 rounded-xl hover:bg-emerald-400 transition-colors font-bold text-sm uppercase tracking-wide"
        >
          <Plus className="w-5 h-5" />
          Add Transaction
        </button>
      </div>

      <Card className="border-[#27272a] shadow-xl bg-[#18181b]">
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4 border-b border-[#27272a] pb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#09090b] border border-[#27272a] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm text-[#fafafa] shadow-inner"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'income', 'expense'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-bold transition-all ${
                  filterType === type 
                    ? 'bg-[#27272a] text-[#fafafa] shadow-md shadow-black/20' 
                    : 'bg-transparent border border-[#27272a] text-[#a1a1aa] hover:bg-[#27272a] hover:text-[#fafafa]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#27272a]">
            {filtered.length > 0 ? filtered.map((t) => {
              const isIncome = t.type === 'income';
              return (
                <div key={t.id} className="flex px-6 py-4 items-center justify-between hover:bg-[#27272a]/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full border border-[#3f3f46]/50 ${isIncome ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-[#a1a1aa]'}`}>
                      {isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#fafafa]">{t.description}</p>
                      <p className="text-xs text-[#71717a] mt-0.5 tracking-wide">{t.category}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className={`text-sm font-semibold ${isIncome ? 'text-emerald-500' : 'text-[#fafafa]'}`}>
                      {isIncome ? '+' : '-'}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(t.amount))}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-xs text-[#71717a] tracking-wide">{format(parseISO(t.date), 'MMM dd, yyyy')}</p>
                      <button 
                        onClick={() => setDeleteTransactionId(t.id)}
                        className="text-[#71717a] hover:text-rose-500 transition-colors"
                        title="Delete transaction"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="px-6 py-12 text-center text-[#71717a] text-sm">
                No transactions found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Add New Transaction"
      >
        <AddTransactionForm 
          onAdd={(t) => {
            onAddTransaction(t);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!deleteTransactionId}
        onClose={() => setDeleteTransactionId(null)}
        title="Delete Transaction"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-[#fafafa]">Are you sure you want to delete this transaction?</h4>
              <p className="text-sm text-[#a1a1aa] mt-1">This action cannot be undone. The transaction will be permanently removed from your history.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setDeleteTransactionId(null)}
              className="flex-1 px-4 py-3 text-[#fafafa] font-bold uppercase tracking-widest text-xs bg-[#27272a] rounded-xl hover:bg-[#3f3f46] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (deleteTransactionId) {
                  onDeleteTransaction(deleteTransactionId);
                  setDeleteTransactionId(null);
                }
              }}
              className="flex-1 px-4 py-3 text-[#fafafa] font-bold uppercase tracking-widest text-xs bg-rose-600 rounded-xl hover:bg-rose-500 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
