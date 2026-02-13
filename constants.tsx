
import React from 'react';

export const INITIAL_LOGS = [];

export const INITIAL_TRANSACTIONS = [];

export const Icons = {
  Dashboard: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Log: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
  Finance: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  AI: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Add: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>,
  Water: () => <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v2m4 6h.01M12 17h.01M16 17h.01" /></svg>,
  Shrimp: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L10 4M14 2L16 4M7 8C7 8 4 9 4 12C4 15 7 16 7 16M17 8C17 8 20 9 20 12C20 15 17 16 17 16M7 8L12 10L17 8M12 10V22M9 22H15" /></svg>,
  Bread: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 6C7 4.34315 8.34315 3 10 3H14C15.6569 3 17 4.34315 17 6V18C17 19.6569 15.6569 21 14 21H10C8.34315 21 7 19.6569 7 18V6Z" /><path d="M7 8H17" /><path d="M7 12H17" /><path d="M7 16H17" /></svg>,
  Duck: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6,14C6.55,14 7,13.55 7,13C7,12.45 6.55,12 6,12C5.45,12 5,12.45 5,13C5,13.55 5.45,14 6,14M21,10C21,10 20,8 18,8C16,8 15,9.5 15,11C15,12.5 16,14 16,14C16,14 14,14 11,14C8,14 6,16 6,19C6,22 8,22 8,22H18C21,22 21,19 21,17C21,15 21,10 21,10M17,6C17,4.34 15.66,3 14,3C12.34,3 11,4.34 11,6C11,7.66 12.34,9 14,9C15.66,9 17,7.66 17,6Z" />
    </svg>
  ),
};
