
import React, { useState } from 'react';
import { Transaction, EggPrices } from '../types';
import { Icons } from '../constants';

interface FinanceProps {
  transactions: Transaction[];
  addTransaction: (trans: Omit<Transaction, 'id'>) => void;
  eggPrices: EggPrices;
  setEggPrices: (prices: EggPrices) => void;
}

const Finance: React.FC<FinanceProps> = ({ transactions, addTransaction, eggPrices, setEggPrices }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    type: 'INCOME' as 'INCOME' | 'EXPENSE',
    category: 'EGGS' as any
  });

  const [localPrices, setLocalPrices] = useState(eggPrices);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction(formData);
    setFormData({ ...formData, description: '', amount: 0 });
  };

  const handlePriceUpdate = () => {
    setEggPrices(localPrices);
    alert("✅ Patokan harga berhasil disimpan!");
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Egg Price Benchmarks Section - VISIBILITY FIXED */}
      <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-inner">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 leading-none">Patokan Harga Jual</h3>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">Update harga pasar di sini</p>
            </div>
          </div>
          <button 
            onClick={handlePriceUpdate}
            className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-lg active:scale-95"
          >
            Simpan Harga
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Input Telur Besar */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <label className="block text-[11px] font-black text-orange-600 uppercase mb-2 tracking-tight">Harga Telur Besar (XL)</label>
            <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus-within:border-orange-500 transition-colors">
              <span className="text-slate-400 font-bold mr-2 text-lg">Rp</span>
              <input 
                type="number"
                className="w-full text-2xl font-black text-slate-900 bg-transparent focus:outline-none placeholder-slate-300"
                value={localPrices.large || ''}
                onChange={(e) => setLocalPrices({...localPrices, large: parseInt(e.target.value) || 0})}
                placeholder="0"
              />
              <span className="text-xs text-slate-400 font-bold ml-1">/butir</span>
            </div>
          </div>

          {/* Input Telur Kecil */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <label className="block text-[11px] font-black text-yellow-600 uppercase mb-2 tracking-tight">Harga Telur Kecil (S)</label>
            <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus-within:border-yellow-500 transition-colors">
              <span className="text-slate-400 font-bold mr-2 text-lg">Rp</span>
              <input 
                type="number"
                className="w-full text-2xl font-black text-slate-900 bg-transparent focus:outline-none placeholder-slate-300"
                value={localPrices.small || ''}
                onChange={(e) => setLocalPrices({...localPrices, small: parseInt(e.target.value) || 0})}
                placeholder="0"
              />
              <span className="text-xs text-slate-400 font-bold ml-1">/butir</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[11px] text-slate-400 italic text-center bg-slate-50 py-2 rounded-lg border border-dashed border-slate-200">
          *Harga ini otomatis mengupdate "Estimasi Omzet" di Dashboard.
        </p>
      </div>

      {/* Arus Kas Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
          <span className="mr-2">📝</span> Catat Arus Kas
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-600 mb-1.5">Deskripsi Transaksi</label>
            <input 
              type="text" 
              required
              placeholder="Contoh: Jual Telur ke Agen atau Beli Pakan"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-medium focus:bg-white focus:border-slate-800 focus:outline-none transition-all"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-1.5">Total Rupiah (Rp)</label>
            <input 
              type="number" 
              required
              placeholder="0"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-black text-xl focus:bg-white focus:border-slate-800 focus:outline-none transition-all"
              value={formData.amount || ''}
              onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value) || 0})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-1.5">Jenis Aliran</label>
            <select 
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:border-slate-800 focus:outline-none transition-all appearance-none"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as any})}
            >
              <option value="INCOME">Pemasukan (+)</option>
              <option value="EXPENSE">Pengeluaran (-)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-1.5">Kategori</label>
            <select 
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:border-slate-800 focus:outline-none transition-all appearance-none"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as any})}
            >
              <option value="EGGS">Penjualan Telur</option>
              <option value="FEED">Pakan & Nutrisi</option>
              <option value="WATER">Listrik & Air</option>
              <option value="DUCKS">Bibit & Ternak</option>
              <option value="OTHER">Lain-lain</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-1.5">Tanggal</label>
            <input 
              type="date" 
              required
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:border-slate-800 focus:outline-none transition-all"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            className="md:col-span-2 bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center space-x-2 active:scale-[0.98] mt-2"
          >
            <Icons.Add />
            <span className="text-lg">Catat Transaksi</span>
          </button>
        </form>
      </div>

      <div className="bg-white overflow-hidden rounded-2xl shadow-sm border border-slate-100">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Riwayat Transaksi Terakhir</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {transactions.slice().reverse().map((t) => (
            <div key={t.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  t.type === 'INCOME' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {t.type === 'INCOME' ? '↓' : '↑'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{t.description}</h4>
                  <div className="flex space-x-2 text-[10px] text-slate-400 font-medium">
                    <span>{new Date(t.date).toLocaleDateString('id-ID')}</span>
                    <span>•</span>
                    <span className="uppercase tracking-widest">{t.category}</span>
                  </div>
                </div>
              </div>
              <div className={`font-black text-sm ${
                t.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
              }`}>
                {t.type === 'INCOME' ? '+' : '-'} Rp {t.amount.toLocaleString()}
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="p-12 text-center text-slate-400 italic">Belum ada transaksi tercatat.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finance;
