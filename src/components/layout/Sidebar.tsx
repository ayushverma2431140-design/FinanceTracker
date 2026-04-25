import React from 'react';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Wallet,
  Settings,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

import { User } from '../../types';

export type ViewType = 'dashboard' | 'transactions' | 'budgets' | 'settings' | 'support';

interface SidebarProps {
  currentView: ViewType;
  onChangeView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: User;
}

export function Sidebar({ currentView, onChangeView, isOpen, setIsOpen, user }: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions' as const, label: 'Transactions', icon: ArrowRightLeft },
    { id: 'budgets' as const, label: 'Budgets', icon: Wallet },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-gray-900/50 block lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-[#09090b] border-r border-[#27272a] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-[#27272a]">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-[#fafafa] uppercase">
            <div className="bg-emerald-500 text-black p-1.5 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            FinTrack
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-[#a1a1aa] hover:text-[#fafafa]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
          <div className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-4 px-2">
            Overview
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-[#27272a] text-[#fafafa] shadow-md shadow-black/10" 
                    : "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b]"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-emerald-400" : "text-[#a1a1aa]")} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-6 mt-auto border-t border-[#27272a]">
          <div className="space-y-1">
            <button 
              onClick={() => {
                onChangeView('settings');
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                currentView === 'settings'
                  ? "bg-[#27272a] text-[#fafafa] shadow-md shadow-black/10" 
                  : "text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#fafafa]"
              )}
            >
              <Settings className={cn("w-5 h-5", currentView === 'settings' ? "text-emerald-400" : "text-[#a1a1aa]")} />
              Settings
            </button>
            <button 
              onClick={() => {
                onChangeView('support');
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                currentView === 'support'
                  ? "bg-[#27272a] text-[#fafafa] shadow-md shadow-black/10" 
                  : "text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#fafafa]"
              )}
            >
              <HelpCircle className={cn("w-5 h-5", currentView === 'support' ? "text-emerald-400" : "text-[#a1a1aa]")} />
              Support
            </button>
          </div>
          
          <div className="mt-6 flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#18181b] rounded-xl transition-colors">
            <div className="w-9 h-9 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center text-[#fafafa] font-bold text-xs shrink-0">
              {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#fafafa] truncate">{user.name}</p>
              <p className="text-xs text-[#a1a1aa] truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
