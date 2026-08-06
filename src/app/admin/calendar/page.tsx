import React from 'react';

// Define the events data outside the component (or fetch it from an API)
const calendarEvents: Record<number, { title: string; type: string; color: string; span?: number }[]> = {
  5: [{ title: 'Vela Skincare Revisions', type: 'revision', color: 'bg-secondary text-on-secondary' }],
  12: [{ title: 'Echo Festival Poster Deadline', type: 'deadline', color: 'bg-error text-on-error' }],
  14: [{ title: 'Client Call: Nexus', type: 'meeting', color: 'bg-tertiary text-on-tertiary' }],
  18: [{ title: 'Sketch Phase: Solstice', type: 'milestone', color: 'bg-primary-container text-on-primary-container' }],
  22: [{ title: 'Final Delivery: Atlas Brand', type: 'deadline', color: 'bg-error text-on-error' }],
  25: [{ title: 'Vacation Starts', type: 'personal', color: 'bg-surface-variant text-on-surface-variant', span: 3 }],
  28: [{ title: 'Team Sync', type: 'meeting', color: 'bg-tertiary text-on-tertiary' }]
};

export default function AdminCalendarPage() {
  const daysInMonth = 31;
  const startDay = 3; // Wednesday starts on 1st

  // Generate the calendar grid array
  const renderCalendarDays = () => {
    const cells = [];
    let dayCounter = 1;

    for (let i = 0; i < 35; i++) {
      if (i >= startDay && dayCounter <= daysInMonth) {
        const currentDay = dayCounter;
        const isToday = currentDay === 12;
        const dayEvents = calendarEvents[currentDay] || [];

        cells.push(
          <div
            key={`day-${i}`}
            className="bg-surface rounded-2xl min-h-[140px] p-sm flex flex-col gap-xs relative group transition-all hover:bg-surface-bright hover:shadow-md hover:scale-[1.02] hover:z-10 cursor-pointer overflow-hidden"
          >
            <div className="flex items-center justify-between w-full mb-xs">
              {isToday && (
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              )}
              <span
                className={`font-headline-md text-headline-md ${
                  isToday ? 'text-primary' : 'text-on-surface'
                } transition-colors group-hover:text-primary ml-auto`}
              >
                {currentDay}
              </span>
            </div>

            {/* Render Events for the specific day */}
            {dayEvents.map((ev, idx) => (
              <div
                key={`event-${currentDay}-${idx}`}
                className={`${ev.color} rounded-lg p-xs text-xs font-body-md truncate font-medium shadow-sm transition-transform hover:-translate-y-1 relative z-10`}
              >
                {ev.title}
              </div>
            ))}

            {/* Subtle hover add icon */}
            <span className="material-symbols-outlined absolute top-sm right-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity text-[18px]">
              add_circle
            </span>
          </div>
        );
        dayCounter++;
      } else {
        // Empty cells for alignment
        cells.push(
          <div
            key={`empty-${i}`}
            className="bg-surface/40 rounded-2xl min-h-[140px] p-sm border border-outline-variant/20 opacity-50"
          ></div>
        );
      }
    }
    return cells;
  };

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

        <nav
          className="flex-1 px-sm flex flex-col gap-xs"
          data-active-classes="bg-primary-container text-on-primary-container font-bold"
        >
          <a
            className="flex items-center px-md py-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group"
            data-path="dashboard"
            href="#"
          >
            <span className="material-symbols-outlined mr-md text-on-surface-variant group-hover:text-primary">
              dashboard
            </span>
            <span className="font-body-md">Dashboard</span>
          </a>
          <a
            aria-current="page"
            className="flex items-center px-md py-sm rounded-xl transition-all group bg-primary-container text-on-primary-container font-bold"
            data-path="calendar"
            href="#"
          >
            <span className="material-symbols-outlined mr-md text-on-surface-variant group-hover:text-primary">
              calendar_today
            </span>
            <span className="font-body-md">Calendar</span>
          </a>
          <a
            className="flex items-center px-md py-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group"
            data-path="commissions"
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
              <span className="material-symbols-outlined text-on-primary">
                person
              </span>
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

      {/* Main Layout Area */}
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
                <span className="material-symbols-outlined text-error text-[18px]">
                  error
                </span>
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
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative pt-20 bg-background min-h-screen p-margin-desktop">
          <div className="flex flex-col w-full h-full relative">
            <div className="flex items-center justify-between mb-xl">
              <div className="flex flex-col gap-xs">
                <h1 className="font-display-lg text-display-lg text-on-background">
                  October 2024
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  Manage your commissions, deadlines, and personal milestones.
                </p>
              </div>
              <div className="flex items-center gap-md">
                <div className="bg-surface-container-high rounded-full p-xs flex items-center shadow-sm">
                  <button className="px-md py-sm rounded-full bg-primary text-on-primary font-body-md font-bold transition-all shadow-md">
                    Monthly
                  </button>
                  <button className="px-md py-sm rounded-full text-on-surface-variant font-body-md hover:text-on-surface transition-all">
                    Weekly
                  </button>
                </div>
                <button className="bg-primary text-on-primary hover:bg-surface-tint px-lg py-sm rounded-xl font-headline-md text-headline-md flex items-center gap-sm transition-all shadow-md hover:shadow-lg group">
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">
                    add
                  </span>
                  Add Event
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-sm mb-sm px-sm">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="font-label-caps text-label-caps text-on-surface-variant text-center tracking-widest uppercase"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid Container */}
            <div className="grid grid-cols-7 gap-xs flex-1 bg-surface-container-low rounded-3xl p-xs shadow-xl relative overflow-hidden">
              {/* Background organic shapes */}
              <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none mix-blend-multiply opacity-50"></div>
              <div className="absolute -bottom-48 -right-48 w-[800px] h-[800px] bg-primary-fixed-dim/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply opacity-50"></div>

              {/* Render dynamic generated cells */}
              {renderCalendarDays()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}