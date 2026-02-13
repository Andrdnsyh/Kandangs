
export interface DuckLog {
  id: string;
  date: string;
  duckCount: number;
  eggLargeCount: number; // Telur Besar
  eggSmallCount: number; // Telur Kecil
  shrimpHeadAmount: number; // in kg (Kepala Udang)
  duckBreadAmount: number;  // in kg (Roti Bebek)
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: 'EGGS' | 'FEED' | 'WATER' | 'DUCKS' | 'OTHER';
}

export interface EggPrices {
  large: number;
  small: number;
}
