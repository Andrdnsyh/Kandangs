
import React, { useState } from 'react';
import { getFarmInsights } from '../services/geminiService';
import { DuckLog, Transaction } from '../types';
import { Icons } from '../constants';

interface AIAssistantProps {
  logs: DuckLog[];
  transactions: Transaction[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ logs, transactions }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getFarmInsights(logs, transactions);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">DuckMaster AI Konsultan</h2>
          <p className="text-yellow-50 mb-6 opacity-90 max-w-md">
            Biarkan kecerdasan buatan menganalisis data peternakan Anda untuk memberikan saran optimasi produksi dan pakan.
          </p>
          <button 
            onClick={fetchInsights}
            disabled={loading}
            className="bg-white text-yellow-600 font-bold px-6 py-3 rounded-xl hover:bg-yellow-50 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            ) : <Icons.AI />}
            <span>{loading ? 'Menganalisis...' : 'Dapatkan Analisis Sekarang'}</span>
          </button>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Icons.AI />
        </div>
      </div>

      {insight && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
              <Icons.AI />
            </div>
            <h3 className="font-bold text-slate-800">Saran Ahli AI Anda</h3>
          </div>
          <div className="prose prose-yellow text-slate-600 whitespace-pre-line leading-relaxed">
            {insight}
          </div>
        </div>
      )}

      {!insight && !loading && (
        <div className="text-center py-12 text-slate-400">
          <p>Klik tombol di atas untuk melihat analisis mendalam tentang performa kandang Anda.</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
