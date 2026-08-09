import React from 'react';

export default function AdminCalendar() {
  const weeklyLoad = 4; // Simulated load logic
  const capacityStatus = weeklyLoad <= 2 ? 'FREE' : weeklyLoad <= 5 ? 'SLIGHTLY BUSY' : 'FULLY BOOKED';
  const statusColor = capacityStatus === 'FREE' ? 'text-green-500' : capacityStatus === 'SLIGHTLY BUSY' ? 'text-orange-500' : 'text-red-500';

  const schedule = [
    { date: '2026-08-10', deadline: '2026-08-14', task: 'Brand Pubmat', isToday: false },
    { date: '2026-08-09', deadline: '2026-08-12', task: 'Video Edit V1', isToday: true },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <header className="mb-12 border-b border-zinc-800 pb-4 flex justify-between items-end">
        <h1 className="text-3xl font-bold tracking-tighter uppercase">Master Schedule</h1>
        <div className="text-right">
          <p className="text-xs text-zinc-500 tracking-widest uppercase">Current Capacity</p>
          <p className={`text-xl font-bold tracking-widest ${statusColor}`}>{capacityStatus}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-2">
        {schedule.map((item, idx) => (
          <div key={idx} className={`p-6 border ${item.isToday ? 'border-orange-500 bg-orange-950' : 'border-zinc-800 bg-zinc-900'}`}>
            <div className="flex justify-between items-center">
              <div>
                {item.isToday && <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Current Day</span>}
                <h3 className="text-xl font-bold">{item.task}</h3>
              </div>
              <div className="text-right font-mono text-sm">
                <p className="text-zinc-500">START: <span className="text-zinc-200">{item.date}</span></p>
                <p className="text-zinc-500">DUE: <span className="text-orange-400">{item.deadline}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}