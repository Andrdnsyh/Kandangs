
import React from 'react';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
    { id: 'logs', label: 'Catatan', icon: <Icons.Log /> },
    { id: 'finance', label: 'Keuangan', icon: <Icons.Finance /> },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0 md:pl-64">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-200 p-4 z-50">
        <div className="flex items-center space-x-3 mb-8 px-2">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-yellow-200">
            <Icons.Duck />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Kandang Bapak</h1>
        </div>
        <nav className="space-y-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id ? 'bg-yellow-50 text-yellow-600 font-semibold shadow-sm' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        
        {/* Attribution for Desktop */}
        <div className="mt-auto pt-4 border-t border-slate-50 px-4">
          <p className="text-[10px] text-slate-400 font-medium">
            developed by <span className="text-slate-600 font-bold italic">Andi Mahfudz</span>
          </p>
        </div>
      </aside>

      {/* Header for Mobile */}
      <header className="md:hidden sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex justify-between items-center z-40">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-white shadow-sm">
            <Icons.Duck />
          </div>
          <h1 className="text-lg font-bold text-slate-800">Kandang Bapak</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        {children}
        
        {/* Attribution for Mobile */}
        <div className="md:hidden mt-8 mb-4 text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            developed by <span className="text-slate-500 font-black italic">Andi Mahfudz</span>
          </p>
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === tab.id ? 'text-yellow-600' : 'text-slate-400'
            }`}
          >
            {tab.icon}
            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
