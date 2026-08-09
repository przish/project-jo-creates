import React from 'react';

export default function AdminDashboard() {
  const stats = { active: 12, delivered: 84, unpaid: 1450.00, streak: 14, reputation: 'ELITE' };
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
      <header className="mb-12 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold tracking-tighter uppercase">Commissioner Overview</h1>
        <p className="text-zinc-500 text-sm tracking-widest mt-1">STATUS: {stats.reputation} STANDING</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        <div className="bg-zinc-900 p-8 border border-zinc-800">
          <p className="text-xs text-zinc-500 tracking-widest uppercase mb-4">Active Commissions</p>
          <p className="text-7xl font-bold">{stats.active}</p>
        </div>
        <div className="bg-zinc-900 p-8 border border-zinc-800">
          <p className="text-xs text-zinc-500 tracking-widest uppercase mb-4">Delivered</p>
          <p className="text-7xl font-bold">{stats.delivered}</p>
        </div>
        <div className="bg-orange-600 text-black p-8 border border-orange-500">
          <p className="text-xs font-bold tracking-widest uppercase mb-4">Pending Collection</p>
          <p className="text-5xl font-bold mt-4">${stats.unpaid.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-1">
        <div className="bg-zinc-900 p-8 border border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 tracking-widest uppercase mb-2">Current Streak</p>
            <p className="text-4xl font-bold">{stats.streak} DAYS</p>
          </div>
          <div className="text-6xl">🔥</div>
        </div>
        
        <div className="bg-zinc-900 p-8 border border-zinc-800">
          <p className="text-xs text-zinc-500 tracking-widest uppercase mb-4">Accumulated via Banks</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <span className="font-bold tracking-wider">🏦 PAYPAL</span>
              <span className="text-orange-500 font-mono">$4,200</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <span className="font-bold tracking-wider">🏦 BANK TRANSFER</span>
              <span className="text-orange-500 font-mono">$1,850</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}