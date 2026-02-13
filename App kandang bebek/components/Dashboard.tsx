
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { DuckLog, Transaction, EggPrices } from '../types';

interface DashboardProps {
  logs: DuckLog[];
  transactions: Transaction[];
  eggPrices: EggPrices;
}

const Dashboard: React.FC<DashboardProps> = ({ logs, transactions, eggPrices }) => {
  const latestLog = logs[logs.length - 1];
  
  const stats = useMemo(() => {
    const totalRevenue = transactions.filter(t => t.type === 'INCOME').reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, curr) => acc + curr.amount, 0);
    
    const totalEggs = logs.reduce((acc, curr) => acc + (curr.eggLargeCount + curr.eggSmallCount), 0);
    const avgProduction = logs.length > 0 ? (totalEggs / logs.length).toFixed(1) : 0;

    // Estimasi Omzet hari ini
    const estRevenueToday = latestLog ? 
      (latestLog.eggLargeCount * eggPrices.large) + (latestLog.eggSmallCount * eggPrices.small) : 0;

    return {
      totalDucks: latestLog?.duckCount || 0,
      avgProduction,
      balance: totalRevenue - totalExpense,
      estRevenueToday,
      waterBill: transactions.filter(t => t.category === 'WATER').reduce((acc, curr) => acc + curr.amount, 0)
    };
  }, [logs, transactions, latestLog, eggPrices]);

  const chartData = useMemo(() => {
    return logs.slice(-10).map(log => ({
      date: new Date(log.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
      large: log.eggLargeCount,
      small: log.eggSmallCount,
      total: log.eggLargeCount + log.eggSmallCount,
    }));
  }, [logs]);

  const financeData = useMemo(() => {
    const categories = ['EGGS', 'FEED', 'WATER', 'DUCKS', 'OTHER'];
    return categories.map(cat => ({
      name: cat,
      amount: transactions.filter(t => t.category === cat).reduce((acc, curr) => acc + (curr.type === 'INCOME' ? curr.amount : -curr.amount), 0)
    }));
  }, [transactions]);

  return (
    <div className="space-y-6 pb-4">
      {/* Cards Header */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Populasi</p>
          <h3 className="text-2xl font-bold text-slate-800">{stats.totalDucks}</h3>
          <p className="text-xs text-slate-400 mt-1">Ekor Aktif</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Rerata Prod.</p>
          <h3 className="text-2xl font-bold text-slate-800">{stats.avgProduction}</h3>
          <p className="text-xs text-slate-400 mt-1">Butir/Hari</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-yellow-400">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Estimasi Omzet</p>
          <h3 className="text-2xl font-bold text-slate-800">Rp {(stats.estRevenueToday / 1000).toLocaleString()}k</h3>
          <p className="text-xs text-yellow-600 mt-1 font-medium">Hari ini (Patokan)</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Saldo Kas</p>
          <h3 className="text-2xl font-bold text-slate-800">Rp {(stats.balance / 1000).toLocaleString()}k</h3>
          <p className="text-xs text-green-500 mt-1">Total Tunai</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Produksi Telur Berdasarkan Ukuran</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorLarge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSmall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend verticalAlign="top" height={36}/>
              <Area name="Telur Besar" type="monotone" dataKey="large" stroke="#f97316" fillOpacity={1} fill="url(#colorLarge)" strokeWidth={3} />
              <Area name="Telur Kecil" type="monotone" dataKey="small" stroke="#facc15" fillOpacity={1} fill="url(#colorSmall)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Detail Hari Ini</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-[10px] text-orange-600 font-bold uppercase mb-1">Telur Besar (XL)</p>
                <p className="text-2xl font-bold text-orange-700">{latestLog?.eggLargeCount || 0} <span className="text-xs font-normal">Butir</span></p>
                <p className="text-[10px] text-orange-400 mt-1 italic">@ Rp {eggPrices.large.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                <p className="text-[10px] text-yellow-600 font-bold uppercase mb-1">Telur Kecil (S)</p>
                <p className="text-2xl font-bold text-yellow-700">{latestLog?.eggSmallCount || 0} <span className="text-xs font-normal">Butir</span></p>
                <p className="text-[10px] text-yellow-400 mt-1 italic">@ Rp {eggPrices.small.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-slate-800 rounded-2xl text-white">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Potensi Nilai Jual</p>
                <p className="text-xl font-bold">Rp {stats.estRevenueToday.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Total Butir</p>
                <p className="text-xl font-bold">{(latestLog?.eggLargeCount || 0) + (latestLog?.eggSmallCount || 0)}</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl">
              <span className="text-sm text-slate-500 font-medium">Persentase Produksi</span>
              <span className="font-bold text-slate-800">
                {latestLog ? (((latestLog.eggLargeCount + latestLog.eggSmallCount) / latestLog.duckCount) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Finansial per Kategori</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} width={70} />
                <Tooltip />
                <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
                  {financeData.map((entry, index) => (
                    <rect key={index} fill={entry.amount > 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
