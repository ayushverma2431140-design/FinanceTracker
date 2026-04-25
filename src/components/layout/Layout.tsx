import React, { useState } from 'react';
import { Sidebar, ViewType } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  onChangeView: (view: ViewType) => void;
}

export function Layout({ children, currentView, onChangeView }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard Overview';
      case 'transactions': return 'All Transactions';
      case 'budgets': return 'Budget Management';
      default: return 'FinanceTracker';
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans">
      <Sidebar 
        currentView={currentView} 
        onChangeView={onChangeView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <Header 
          title={getTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
