
import { GoogleGenAI } from "@google/genai";
import { DuckLog, Transaction } from "../types";

export const getFarmInsights = async (logs: DuckLog[], transactions: Transaction[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const recentLogsStr = JSON.stringify(logs.slice(-7));
  const recentTransStr = JSON.stringify(transactions.slice(-10));
  
  const prompt = `
    Anda adalah ahli peternakan bebek petelur profesional di Indonesia. 
    Peternakan ini menggunakan pakan khusus: **Kepala Udang** (sebagai protein/mineral) dan **Roti Bebek** (sebagai sumber karbohidrat).
    
    Analisis data berikut dan berikan 3 poin ringkas saran/insight dalam Bahasa Indonesia.
    Gunakan gaya bahasa profesional namun mudah dipahami.
    
    Data Log Produksi (7 hari terakhir): ${recentLogsStr}
    Data Transaksi (terakhir): ${recentTransStr}
    
    Berikan analisis tentang:
    1. Efisiensi produksi (telur vs perbandingan Kepala Udang & Roti Bebek).
    2. Keseimbangan pakan (apakah rasio Kepala Udang dan Roti Bebek sudah optimal untuk produksi telur).
    3. Kondisi keuangan dan tindakan prioritas.
    Format respons: Langsung ke poin-poin.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });
    return response.text || "Gagal mendapatkan saran AI saat ini.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Maaf, sistem AI sedang sibuk. Silakan coba lagi nanti.";
  }
};
