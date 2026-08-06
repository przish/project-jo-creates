'use client';

import React, { useState } from 'react';

// --- Types & Dummy Data ---
type Commission = {
  id: string;
  clientName: string;
  projectName: string;
  avatarText?: string;
  avatarImg?: string;
  avatarColorClass?: string;
  initialProgress: 'not_started' | 'in_progress' | 'revisions' | 'completed';
  initialPayment: 'unpaid' | 'half_paid' | 'fully_paid';
  channel: string;
  deadline: string;
  deadlineSub: string;
  isDelivered?: boolean;
};

const commissionsData: Commission[] = [
  {
    id: '1',
    clientName: 'Alex Mercer',
    projectName: 'Full Body Character Art',
    avatarText: 'A',
    avatarColorClass: 'bg-primary-container text-on-primary-container',
    initialProgress: 'in_progress',
    initialPayment: 'half_paid',
    channel: 'GCash',
    deadline: 'Oct 25, 2023',
    deadlineSub: 'in 2 days',
  },
  {
    id: '2',
    clientName: 'Sarah Jenkins',
    projectName: 'Twitch Emote Pack',
    avatarImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnbQks6AXSgBZJewowVNvypt3M9EaPI3wa23zZf4ArlGtWCgkuS4ZeBtKSDueawu4Ntnj0XWeIKjIHSEm2Ff7fNXcLc3BwlMbqRQRWhenwZl8bw7MSw25C5jUfROdeJu7agYkB7SmALG9V-joj3TUthq6qaw_caH4-F0aEpkKUhbzT4JFCnWZCTQ2bBz77vfOR9hWpkdfBtKp0rrZgQE0ypGp3XwjwX2PRZhHUTZimYi6YA-hnlyHl',
    initialProgress: 'not_started',
    initialPayment: 'unpaid',
    channel: 'Maya',
    deadline: 'Nov 02, 2023',
    deadlineSub: 'in 10 days',
  },
  {
    id: '3',
    clientName: 'Marcus Cole',
    projectName: 'D&D Party Illustration',
    avatarText: 'M',
    avatarColorClass: 'bg-secondary-container text-on-secondary-container',
    initialProgress: 'completed',
    initialPayment: 'fully_paid',
    channel: 'BPI',
    deadline: 'Oct 15, 2023',
    deadlineSub: 'Delivered',
    isDelivered: true,
  },
];

// --- Sub-Component: Commission Row ---
const CommissionRow = ({ data }: { data: Commission }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [progress, setProgress] = useState(data.initialProgress);
  const [payment, setPayment] = useState(data.initialPayment);
  
  const [tempProgress, setTempProgress] = useState(data.initialProgress);
  const [tempPayment, setTempPayment] = useState(data.initialPayment);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate network delay
    setTimeout(() => {
      setProgress(tempProgress);
      setPayment(tempPayment);
      setIsSaving(false);
      setIsEditing(false);
    }, 600);
  };

  const handleCancel = () => {
    setTempProgress(progress);
    setTempPayment(payment);
    setIsEditing(false);
  };

  // Helper to render view-mode Progress Badge
  const renderProgressBadge = () => {
    switch (progress) {
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-xs px-sm py-[2px] rounded-full bg-secondary-container/30 text-on-secondary-container font-label-caps text-[11px] border border-secondary-container">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> In Progress
          </span>
        );
      case 'not_started':
        return (
          <span className="inline-flex items-center gap-xs px-sm py-[2px] rounded-full bg-surface-container-highest text-on-surface-variant font-label-caps text-[11px] border border-outline-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Not Started
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-xs px-sm py-[2px] rounded-full bg-primary/10 text-primary font-label-caps text-[11px] border border-primary/20">
            <span className="material-symbols-outlined text-[12px]">done_all</span> Completed
          </span>
        );
      case 'revisions':
        return (
          <span className="inline-flex items-center gap-xs px-sm py-[2px] rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-[11px] border border-secondary-container/50">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Revisions
          </span>
        );
    }
  };

  // Helper to render view-mode Payment Badge
  const renderPaymentBadge = () => {
    switch (payment) {
      case 'half_paid':
        return (
          <span className="inline-flex items-center gap-xs px-sm py-[2px] rounded-full bg-tertiary-container/20 text-on-tertiary-container font-label-caps text-[11px] border border-tertiary-container/30">
            <span className="material-symbols-outlined text-[12px]">timelapse</span> Half Paid
          </span>
        );
      case 'unpaid':
        return (
          <span className="inline-flex items-center gap-xs px-sm py-[2px] rounded-full bg-error-container text-on-error-container font-label-caps text-[11px] border border-error-container">
            <span className="material-symbols-outlined text-[12px]">warning</span> Unpaid
          </span>
        );
      case 'fully_paid':
        return (
          <span className="inline-flex items-center gap-xs px-sm py-[2px] rounded-full bg-primary/10 text-primary font-label-caps text-[11px] border border-primary/20">
            <span className="material-symbols-outlined text-[12px]">check_circle</span> Fully Paid
          </span>
        );
    }
  };

  return (
    <div
      className={`group px-lg py-md transition-colors border-b border-surface-variant/50 last:border-b-0 ${
        isEditing ? 'bg-surface-container shadow-md relative z-20' : 'hover:bg-surface-container-low'
      }`}
    >
      <div className="grid grid-cols-12 gap-sm items-center">
        {/* Client info */}
        <div className="col-span-3 flex flex-row items-center gap-sm">
          {data.avatarImg ? (
            <img
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover shrink-0"
              src={data.avatarImg}
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-headline-md shrink-0 ${data.avatarColorClass}`}
            >
              {data.avatarText}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="font-body-md text-on-surface font-semibold truncate">
              {data.clientName}
            </span>
            <span className="font-body-md text-on-surface-variant text-[14px] truncate">
              {data.projectName}
            </span>
          </div>
        </div>

        {/* Progress Column */}
        <div className="col-span-2">
          {!isEditing ? (
            <div>{renderProgressBadge()}</div>
          ) : (
            <div>
              <select
                className="w-full bg-surface-container p-xs rounded-md font-body-md text-on-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[14px]"
                value={tempProgress}
                onChange={(e) => setTempProgress(e.target.value as any)}
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="revisions">Revisions</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
        </div>

        {/* Payment Column */}
        <div className="col-span-2">
          {!isEditing ? (
            <div>{renderPaymentBadge()}</div>
          ) : (
            <div>
              <select
                className="w-full bg-surface-container p-xs rounded-md font-body-md text-on-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[14px]"
                value={tempPayment}
                onChange={(e) => setTempPayment(e.target.value as any)}
              >
                <option value="unpaid">Unpaid</option>
                <option value="half_paid">Half Paid</option>
                <option value="fully_paid">Fully Paid</option>
              </select>
            </div>
          )}
        </div>

        {/* Channel Column */}
        <div className="col-span-2">
          <span className="inline-flex items-center px-sm py-xs rounded bg-surface-container-high text-on-surface font-body-md text-[13px]">
            {data.channel}
          </span>
        </div>

        {/* Deadline Column */}
        <div className="col-span-2 flex flex-col">
          <span
            className={`font-body-md font-medium text-[14px] ${
              data.isDelivered ? 'text-on-surface-variant line-through' : data.id === '1' ? 'text-error' : 'text-on-surface'
            }`}
          >
            {data.deadline}
          </span>
          <span className="font-body-md text-on-surface-variant text-[12px]">
            {data.deadlineSub}
          </span>
        </div>

        {/* Actions Column */}
        <div className="col-span-1 flex justify-end">
          {!isEditing ? (
            <button
              className="p-xs text-on-surface-variant hover:text-primary hover:bg-primary-container/20 rounded-full transition-colors"
              onClick={() => setIsEditing(true)}
            >
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
          ) : (
            <div className="flex flex-row gap-xs">
              <button
                className="p-xs text-primary bg-primary-container/20 hover:bg-primary-container/40 rounded-full transition-colors flex items-center justify-center"
                onClick={handleSave}
                disabled={isSaving}
              >
                <span className={`material-symbols-outlined text-[20px] ${isSaving ? 'animate-spin' : ''}`}>
                  {isSaving ? 'sync' : 'check'}
                </span>
              </button>
              <button
                className="p-xs text-error hover:bg-error-container rounded-full transition-colors"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---
export default function AdminCommissionsPage() {
  return (
    <div className="bg-background font-body-md text-on-background min-h-screen">
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col shadow-[0_1px_8px_rgba(148,188,217,0.15)]">
        <div className="p-md mb-md flex items-center gap-xs">
          <img
            alt="Jo Creates Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AP1WRLvY7yuEZQDTRU_DYEVwAjG0OHPp1Edbh7JVtkqWUL-AVuFbLReMfAMvj7hJXF0XG5tWKHGq5UUe5ogfAQaI1xyI_liYqGkoHTtLadsKh70TSi6dSX_309pDUBGJ3vBlSOF46oOYW9k4dEhb-CsjzsyIc8FuU3t3abBUaYh4618Yp6orIUTa8b-Nbo-OvgTsIEMbNTNvV2YK1pyo4r2obSLWdioeh6hrVVbkzJr7F1VaJcyC8XrSx0znxMQ"
          />
          <span className="font-headline-md text-headline-md text-primary leading-tight">
            Admin
          </span>
        </div>
        <nav className="flex-1 px-sm flex flex-col gap-xs">
          <a
            className="flex items-center px-md py-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined mr-md text-on-surface-variant group-hover:text-primary">
              dashboard
            </span>
            <span className="font-body-md">Dashboard</span>
          </a>
          <a
            className="flex items-center px-md py-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined mr-md text-on-surface-variant group-hover:text-primary">
              calendar_today
            </span>
            <span className="font-body-md">Calendar</span>
          </a>
          <a
            aria-current="page"
            className="flex items-center px-md py-sm rounded-xl transition-all group bg-primary-container text-on-primary-container font-bold"
            href="#"
          >
            <span className="material-symbols-outlined mr-md text-on-surface-variant group-hover:text-primary">
              draw
            </span>
            <span className="font-body-md">Commissions</span>
          </a>
        </nav>
        <div className="mt-auto p-md">
          <div className="bg-secondary-container p-sm rounded-xl flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary">person</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-secondary-container">
                Administrator
              </span>
              <span className="font-body-md font-bold text-on-secondary-container leading-none">
                Jo Creates
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="pl-72">
        {/* Header */}
        <header className="fixed top-0 left-72 right-0 h-20 bg-surface/70 backdrop-blur-xl shadow-[0_1px_8px_rgba(148,188,217,0.1)] z-40 flex items-center justify-end px-margin-desktop gap-md">
          <div className="relative group cursor-pointer p-xs">
            <span className="material-symbols-outlined text-on-surface-variant text-[24px] hover:text-primary transition-colors">
              notifications
            </span>
            <div className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-surface"></div>
            <div className="absolute right-0 top-full mt-xs w-64 bg-surface-container-lowest shadow-lg rounded-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all p-sm border border-outline-variant">
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-error text-[18px]">error</span>
                <span className="font-body-md font-bold text-on-surface">
                  Deadline Approaching!
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Character design commission for Alex due in 2 hours.
              </p>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-outline-variant"></div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary-fixed transition-all">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative pt-20 bg-background min-h-screen p-margin-desktop">
          <div className="flex flex-col w-full relative">
            
            {/* Title & Actions */}
            <div className="mb-xl flex flex-row items-end justify-between relative z-10">
              <div className="flex flex-col gap-sm">
                <span className="font-label-caps text-label-caps text-secondary tracking-widest uppercase">
                  Admin Dashboard
                </span>
                <h1 className="font-display-lg text-display-lg text-on-background m-0 p-0 leading-none">
                  Commissions & Payments
                </h1>
              </div>
              <div className="flex flex-row items-center gap-md">
                <button className="bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors px-md py-sm rounded-full flex flex-row items-center gap-xs font-body-md shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Filter
                </button>
                <button className="bg-primary text-on-primary hover:bg-surface-tint transition-colors px-md py-sm rounded-full flex flex-row items-center gap-xs font-body-md shadow-md shadow-primary/20">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  New Commission
                </button>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-4 gap-md mb-xl relative z-10">
              <div className="bg-surface-container-low p-md rounded-xl shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors"></div>
                <div className="flex flex-row items-center justify-between z-10">
                  <span className="font-body-md text-on-surface-variant">Active Projects</span>
                  <span className="material-symbols-outlined text-primary bg-primary-container/20 p-xs rounded-full">draw</span>
                </div>
                <div className="z-10">
                  <span className="font-headline-md text-headline-md text-on-background">12</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-md rounded-xl shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary/5 rounded-full blur-xl group-hover:bg-secondary/10 transition-colors"></div>
                <div className="flex flex-row items-center justify-between z-10">
                  <span className="font-body-md text-on-surface-variant">In Revision</span>
                  <span className="material-symbols-outlined text-secondary bg-secondary-container/20 p-xs rounded-full">edit</span>
                </div>
                <div className="z-10">
                  <span className="font-headline-md text-headline-md text-on-background">3</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-md rounded-xl shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-error/5 rounded-full blur-xl group-hover:bg-error/10 transition-colors"></div>
                <div className="flex flex-row items-center justify-between z-10">
                  <span className="font-body-md text-on-surface-variant">Unpaid / Pending</span>
                  <span className="material-symbols-outlined text-error bg-error-container/50 p-xs rounded-full">payments</span>
                </div>
                <div className="z-10">
                  <span className="font-headline-md text-headline-md text-on-background">5</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-md rounded-xl shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-tertiary/5 rounded-full blur-xl group-hover:bg-tertiary/10 transition-colors"></div>
                <div className="flex flex-row items-center justify-between z-10">
                  <span className="font-body-md text-on-surface-variant">Due This Week</span>
                  <span className="material-symbols-outlined text-tertiary bg-tertiary-container/20 p-xs rounded-full">event</span>
                </div>
                <div className="z-10">
                  <span className="font-headline-md text-headline-md text-on-background">2</span>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-lg shadow-secondary-fixed-dim/10 overflow-hidden z-10">
              <div className="px-lg py-md bg-surface-container/50 border-b border-surface-variant">
                <div className="grid grid-cols-12 gap-sm items-center">
                  <div className="col-span-3">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Client & Commission</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Task Progress</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Payment Status</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Channel</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Deadline</span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Actions</span>
                  </div>
                </div>
              </div>
              
              {/* Table Rows (Mapped from Data) */}
              <div className="flex flex-col">
                {commissionsData.map((commission) => (
                  <CommissionRow key={commission.id} data={commission} />
                ))}
              </div>
            </div>
            
            {/* Background SVG Detail */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <svg className="absolute top-20 right-20 w-96 h-96 text-surface-container-high opacity-40 mix-blend-multiply" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.3C90.4,-33.5,96.1,-18.1,95.5,-2.9C94.9,12.3,88,27.3,77.7,39.3C67.4,51.3,53.8,60.3,40,68.2C26.2,76.1,13.1,82.9,-1.2,84.9C-15.5,86.9,-31,84.1,-43.8,76.1C-56.6,68.1,-66.7,54.9,-75.4,41.1C-84.1,27.3,-91.4,12.9,-91.9,-1.8C-92.4,-16.5,-86.1,-31.5,-76.5,-43.7C-66.9,-55.9,-54.1,-65.4,-40.4,-72.3C-26.7,-79.2,-13.4,-83.5,0.7,-84.8C14.8,-86.1,29.6,-84.3,44.7,-76.4Z" fill="currentColor" transform="translate(100 100)"></path>
              </svg>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}