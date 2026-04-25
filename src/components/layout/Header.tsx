import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Menu, X, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Budget Alert', message: 'You have used 80% of your Food budget.', time: '2 hours ago', unread: true },
    { id: 2, title: 'New Feature', message: 'Rollover budgeting is now available.', time: '1 day ago', unread: true },
    { id: 3, title: 'Weekly Summary', message: 'Your weekly financial summary is ready.', time: '3 days ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 w-full bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-[#a1a1aa] hover:bg-[#27272a] lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-[#fafafa] hidden sm:block uppercase tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-64 text-[#a1a1aa] focus-within:text-[#fafafa]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-[#18181b] border border-[#27272a] rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-1 focus:ring-emerald-500 focus:bg-[#18181b] transition-all outline-none text-[#fafafa] shadow-inner"
          />
        </div>
        
        <div ref={notifRef} className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a] transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#18181b]"></span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-[#18181b] border border-[#27272a] rounded-2xl shadow-xl overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272a] bg-[#09090b]">
                  <h3 className="font-bold text-[#fafafa] text-sm uppercase tracking-wide">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{unreadCount} New</span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-4 border-b border-[#27272a] last:border-b-0 hover:bg-[#27272a]/50 transition-colors cursor-pointer ${notif.unread ? 'bg-[#27272a]/30' : ''}`}>
                      <div className="flex gap-3">
                        <div className="mt-0.5">
                          <div className={`p-1.5 rounded-full ${notif.unread ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#27272a] text-[#a1a1aa]'}`}>
                            <Info className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#fafafa]">{notif.title}</p>
                          <p className="text-xs text-[#a1a1aa] mt-1 pr-4">{notif.message}</p>
                          <p className="text-[10px] text-[#71717a] mt-2 font-bold uppercase tracking-wider">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
