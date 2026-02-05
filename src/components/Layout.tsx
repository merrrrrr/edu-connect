import React, { useState } from 'react';
import { LogOut, Bell, Search, Menu, ChevronLeft } from 'lucide-react';
import { Role, ViewState } from '../types';
import { NAV_ITEMS, MOCK_NOTIFICATIONS } from '../constants';

interface LayoutProps {
  role: Role;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ role, currentView, setView, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = NAV_ITEMS[role as keyof typeof NAV_ITEMS] || [];

  return (
    <div className="min-h-screen flex bg-[#F5F5F7]">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-[#E5E5EA] transition-all duration-300 ease-in-out flex flex-col fixed h-full z-20 hidden md:flex`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#E5E5EA]">
          {sidebarOpen ? (
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0071E3] to-[#5E5CE6]">
              EduConnect
            </span>
          ) : (
            <span className="text-xl font-bold text-[#0071E3]">E</span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
            <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewState)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#0071E3] text-white shadow-md' 
                    : 'text-[#86868B] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E5E5EA]">
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors"
           >
             <LogOut size={20} />
             <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
               Log Out
             </span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#E5E5EA] sticky top-0 z-10 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
             {/* Mobile Menu Toggle - visible only on small screens */}
             <button className="md:hidden p-2 text-gray-500">
               <Menu size={24} />
             </button>
             <div className="hidden sm:flex items-center text-sm text-[#86868B] gap-2">
               <span className="font-medium text-[#1D1D1F] capitalize">{role}</span>
               <span className="text-[#E5E5EA]">/</span>
               <span className="capitalize">{currentView.replace('_', ' ')}</span>
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-[#F5F5F7] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 w-64 transition-all"
              />
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF3B30] rounded-full border border-white"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E5E5EA] overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-[#E5E5EA]">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map(n => (
                      <div key={n.id} className={`p-4 border-b border-[#E5E5EA] last:border-0 hover:bg-gray-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                        <p className="text-sm text-[#1D1D1F] mb-1">{n.text}</p>
                        <p className="text-xs text-[#86868B]">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0071E3] to-[#5E5CE6] flex items-center justify-center text-white text-sm font-bold shadow-md cursor-pointer">
              {role ? role[0].toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};