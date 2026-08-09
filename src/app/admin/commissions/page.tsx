import React, { useState } from 'react';

export default function AdminCommissions() {
  const [filter, setFilter] = useState('ALL');
  const [sort, setSort] = useState('IN_PROGRESS');

  const commissions = [
    { id: 'C-001', type: 'VIDEO', status: 'IN_PROGRESS', client: 'Acme Corp', review: null },
    { id: 'C-002', type: 'PUBMAT', status: 'DONE', client: 'Studio X', review: 'Exceptional pacing and color grading. 5/5' },
    { id: 'C-003', type: 'VIDEO', status: 'NOT_STARTED', client: 'Creator Y', review: null },
  ];

  const filtered = commissions
    .filter(c => filter === 'ALL' || c.type === filter)
    .filter(c => sort === 'ALL' || c.status === sort);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <header className="mb-12 flex justify-between items-end border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold tracking-tighter uppercase">Curated Commissions</h1>
        
        <div className="flex space-x-4 text-xs font-mono">
          <select className="bg-zinc-900 border border-zinc-700 p-2 text-zinc-300" onChange={(e) => setFilter(e.target.value)}>
            <option value="ALL">ALL TYPES</option>
            <option value="VIDEO">VIDEO EDITING</option>
            <option value="PUBMAT">PUBMAT</option>
          </select>
          <select className="bg-zinc-900 border border-zinc-700 p-2 text-zinc-300" onChange={(e) => setSort(e.target.value)}>
            <option value="ALL">ALL STATUSES</option>
            <option value="NOT_STARTED">NOT STARTED</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
      </header>

      <div className="space-y-4">
        {filtered.map(c => (
          <div key={c.id} className="border border-zinc-800 bg-zinc-900 p-6 flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <span className="text-orange-500 font-mono text-xs mr-4">{c.id}</span>
              <span className="font-bold uppercase tracking-widest">{c.client}</span>
              <span className="ml-4 text-xs bg-zinc-800 px-2 py-1">{c.type}</span>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <span className={`text-xs px-3 py-1 font-bold ${c.status === 'DONE' ? 'bg-green-900 text-green-300' : 'bg-orange-900 text-orange-300'}`}>
                {c.status.replace('_', ' ')}
              </span>
            </div>
            {c.review && (
              <div className="w-full mt-4 p-4 border-l-2 border-orange-500 bg-zinc-950 text-sm italic text-zinc-400">
                "{c.review}" - Client Feedback
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}