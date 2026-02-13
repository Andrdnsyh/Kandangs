
import React, { useState } from 'react';
import { DuckLog } from '../types';
import { Icons } from '../constants';

interface DataEntryProps {
  logs: DuckLog[];
  addLog: (log: Omit<DuckLog, 'id'>) => void;
}

const DataEntry: React.FC<DataEntryProps> = ({ logs, addLog }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    duckCount: logs[logs.length-1]?.duckCount || 0,
    eggLargeCount: 0,
    eggSmallCount: 0,
    shrimpHeadAmount: 0,
    duckBreadAmount: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLog(formData);
    setFormData({ 
      ...formData, 
      eggLargeCount: 0, 
      eggSmallCount: 0, 
      shrimpHeadAmount: 0, 
      duckBreadAmount: 0 
    });
  };

  const handleNumberChange = (field: string, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="space-y-8 pb-4">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-white shadow-md">
            <Icons.Log />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Input Produksi Harian</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Tanggal</label>
              <input 
                type="date" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-slate-800"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Populasi Bebek (Ekor)</label>
              <input 
                type="number" 
                required
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-slate-800"
                value={formData.duckCount || ''}
                onChange={(e) => handleNumberChange('duckCount', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
              <label className="flex items-center space-x-2 text-xs font-bold text-orange-600 mb-2 uppercase tracking-wider">
                <span className="text-lg">🥚</span>
                <span>Telur Besar (Butir)</span>
              </label>
              <input 
                type="number" 
                required
                min="0"
                placeholder="Jumlah XL..."
                className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-white focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all text-slate-800 font-bold text-xl"
                value={formData.eggLargeCount || ''}
                onChange={(e) => handleNumberChange('eggLargeCount', e.target.value)}
              />
            </div>
            <div className="bg-yellow-50/50 p-4 rounded-2xl border border-yellow-100">
              <label className="flex items-center space-x-2 text-xs font-bold text-yellow-600 mb-2 uppercase tracking-wider">
                <span className="text-sm">🥚</span>
                <span>Telur Kecil (Butir)</span>
              </label>
              <input 
                type="number" 
                required
                min="0"
                placeholder="Jumlah S..."
                className="w-full px-4 py-3 rounded-xl border border-yellow-200 bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-slate-800 font-bold text-xl"
                value={formData.eggSmallCount || ''}
                onChange={(e) => handleNumberChange('eggSmallCount', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-red-100 bg-red-50/20">
              <label className="flex items-center space-x-2 text-xs font-bold text-red-600 mb-2 uppercase tracking-wider">
                <Icons.Shrimp />
                <span>Kepala Udang (Kg)</span>
              </label>
              <input 
                type="number" 
                step="0.1"
                required
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all text-slate-800"
                value={formData.shrimpHeadAmount || ''}
                onChange={(e) => handleNumberChange('shrimpHeadAmount', e.target.value)}
                placeholder="0.0"
              />
            </div>
            <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/20">
              <label className="flex items-center space-x-2 text-xs font-bold text-blue-600 mb-2 uppercase tracking-wider">
                <Icons.Bread />
                <span>Roti Bebek (Kg)</span>
              </label>
              <input 
                type="number" 
                step="0.1"
                required
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-slate-800"
                value={formData.duckBreadAmount || ''}
                onChange={(e) => handleNumberChange('duckBreadAmount', e.target.value)}
                placeholder="0.0"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-yellow-400/30 flex items-center justify-center space-x-2 active:scale-[0.98]"
          >
            <Icons.Add />
            <span className="text-lg">Simpan Data Hari Ini</span>
          </button>
        </form>
      </div>

      <div className="bg-white overflow-hidden rounded-2xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg">Riwayat Produksi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Besar</th>
                <th className="px-6 py-4">Kecil</th>
                <th className="px-6 py-4">Pakan</th>
                <th className="px-6 py-4 text-right">Efisiensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.slice().reverse().map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {new Date(log.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                  </td>
                  <td className="px-6 py-4 text-sm text-orange-600 font-black">{log.eggLargeCount}</td>
                  <td className="px-6 py-4 text-sm text-yellow-600 font-black">{log.eggSmallCount}</td>
                  <td className="px-6 py-4 text-[13px]">
                    <span className="text-red-500">{log.shrimpHeadAmount}</span>
                    <span className="mx-1">/</span>
                    <span className="text-blue-500">{log.duckBreadAmount}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-slate-800">
                    {(((log.eggLargeCount + log.eggSmallCount) / log.duckCount) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">Belum ada data tercatat</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;
