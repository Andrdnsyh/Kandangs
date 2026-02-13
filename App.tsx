
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DataEntry from './components/DataEntry';
import Finance from './components/Finance';
import { DuckLog, Transaction, EggPrices } from './types';
import { INITIAL_LOGS, INITIAL_TRANSACTIONS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [logs, setLogs] = useState<DuckLog[]>(() => {
    const saved = localStorage.getItem('duck_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('duck_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [eggPrices, setEggPrices] = useState<EggPrices>(() => {
    const saved = localStorage.getItem('duck_egg_prices');
    return saved ? JSON.parse(saved) : { large: 2000, small: 1500 };
  });

  useEffect(() => {
    localStorage.setItem('duck_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('duck_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('duck_egg_prices', JSON.stringify(eggPrices));
  }, [eggPrices]);

  const addLog = (newLog: Omit<DuckLog, 'id'>) => {
    const logWithId: DuckLog = {
      ...newLog,
      id: Math.random().toString(36).substr(2, 9),
    };
    setLogs([...logs, logWithId]);
  };

  const addTransaction = (newTrans: Omit<Transaction, 'id'>) => {
    const transWithId: Transaction = {
      ...newTrans,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions([...transactions, transWithId]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard logs={logs} transactions={transactions} eggPrices={eggPrices} />;
      case 'logs':
        return <DataEntry logs={logs} addLog={addLog} />;
      case 'finance':
        return (
          <Finance 
            transactions={transactions} 
            addTransaction={addTransaction} 
            eggPrices={eggPrices} 
            setEggPrices={setEggPrices}
          />
        );
      default:
        return <Dashboard logs={logs} transactions={transactions} eggPrices={eggPrices} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {renderContent()}
      </div>
      
      {(logs.length > 0 || transactions.length > 0) && (
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
          <button 
            onClick={() => {
              if(confirm("Apakah Anda yakin ingin menghapus semua data dan mulai dari awal (0)?")) {
                setLogs([]);
                setTransactions([]);
                localStorage.removeItem('duck_logs');
                localStorage.removeItem('duck_transactions');
              }
            }}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest font-bold"
          >
            Hapus Semua Data & Reset Ke 0
          </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
