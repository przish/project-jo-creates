import React from 'react';

export default function AdminDashboardPage() {
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
            aria-current="page"
            className="flex items-center px-md py-sm rounded-xl transition-all group bg-primary-container text-on-primary-container font-bold"
            data-path="dashboard"
            href="#"
          >
            <span className="material-symbols-outlined mr-md text-on-surface-variant group-hover:text-primary">
              dashboard
            </span>
            <span className="font-body-md">Dashboard</span>
          </a>
          <a
            className="flex items-center px-md py-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group"
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
        <main className="relative pt-20 min-h-screen p-margin-desktop">
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-12 gap-xl">
              
              {/* Left Column Overview & Projects */}
              <div className="col-span-12 lg:col-span-8 flex flex-col gap-md">
                <div className="flex items-end justify-between mb-sm">
                  <div>
                    <h1 className="font-display-lg text-display-lg text-on-background mb-xs">
                      Overview
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">
                      Here's your commission summary for this month.
                    </p>
                  </div>
                  <div className="flex gap-sm">
                    <button className="bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors px-md py-sm rounded-xl font-headline-md text-body-md flex items-center gap-xs">
                      <span className="material-symbols-outlined">download</span>
                      Export Report
                    </button>
                    <button className="bg-primary text-on-primary hover:opacity-90 transition-opacity px-md py-sm rounded-xl font-headline-md text-body-md shadow-md flex items-center gap-xs">
                      <span className="material-symbols-outlined">add</span>
                      Add New Project
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-md">
                  {/* Total Clients Card */}
                  <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-secondary-fixed/50 rounded-full blur-2xl group-hover:bg-secondary-fixed transition-all duration-500"></div>
                    <div className="flex justify-between items-start mb-lg relative z-10">
                      <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-secondary-container">
                          groups
                        </span>
                      </div>
                      <span className="bg-surface-container px-sm py-xs rounded-full font-label-caps text-label-caps text-on-surface-variant flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[12px] text-primary">
                          trending_up
                        </span>{' '}
                        +12%
                      </span>
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-body-lg text-body-lg text-on-surface-variant mb-xs">
                        Total Clients
                      </h3>
                      <div className="font-display-lg text-display-lg text-on-background">
                        158
                      </div>
                    </div>
                  </div>

                  {/* Earnings Summation Card */}
                  <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary-fixed/50 rounded-full blur-2xl group-hover:bg-primary-fixed transition-all duration-500"></div>
                    <div className="flex justify-between items-start mb-lg relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary-container">
                          payments
                        </span>
                      </div>
                      <span className="bg-surface-container px-sm py-xs rounded-full font-label-caps text-label-caps text-on-surface-variant flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[12px] text-primary">
                          trending_up
                        </span>{' '}
                        +8%
                      </span>
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-body-lg text-body-lg text-on-surface-variant mb-xs">
                        Earnings Summation
                      </h3>
                      <div className="font-display-lg text-display-lg text-on-background">
                        $12,450
                      </div>
                      <div className="flex gap-md mt-sm pt-sm border-t border-outline-variant/30">
                        <div>
                          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                            Fully Paid
                          </span>
                          <div className="font-headline-md text-body-lg text-primary">
                            $8,200
                          </div>
                        </div>
                        <div>
                          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                            Half-Paid
                          </span>
                          <div className="font-headline-md text-body-lg text-secondary">
                            $4,250
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Projects List */}
                <div className="bg-surface-container-lowest rounded-xl shadow-sm p-md mt-md">
                  <div className="flex items-center justify-between mb-md">
                    <h2 className="font-headline-md text-headline-md text-on-background">
                      Recent Projects
                    </h2>
                    <button className="text-primary hover:text-surface-tint font-body-md transition-colors">
                      View All
                    </button>
                  </div>
                  <div className="flex flex-col gap-sm">
                    <div className="flex items-center justify-between p-sm hover:bg-surface-container transition-colors rounded-lg cursor-pointer">
                      <div className="flex items-center gap-md">
                        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center font-headline-md text-on-surface-variant">
                          SC
                        </div>
                        <div>
                          <div className="font-body-md font-bold text-on-background">
                            Sci-Fi Character Concept
                          </div>
                          <div className="font-body-md text-on-surface-variant text-sm">
                            Client: Alex T.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-md">
                        <span className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-caps text-label-caps">
                          Half-Paid
                        </span>
                        <div className="font-headline-md text-body-md text-on-background">
                          $450
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-sm hover:bg-surface-container transition-colors rounded-lg cursor-pointer">
                      <div className="flex items-center gap-md">
                        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center font-headline-md text-on-surface-variant">
                          EL
                        </div>
                        <div>
                          <div className="font-body-md font-bold text-on-background">
                            Environmental Landscape
                          </div>
                          <div className="font-body-md text-on-surface-variant text-sm">
                            Client: Sarah M.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-md">
                        <span className="bg-primary-container text-on-primary-container px-sm py-xs rounded-full font-label-caps text-label-caps">
                          Fully Paid
                        </span>
                        <div className="font-headline-md text-body-md text-on-background">
                          $800
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-sm hover:bg-surface-container transition-colors rounded-lg cursor-pointer">
                      <div className="flex items-center gap-md">
                        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center font-headline-md text-on-surface-variant">
                          PA
                        </div>
                        <div>
                          <div className="font-body-md font-bold text-on-background">
                            Podcast Album Art
                          </div>
                          <div className="font-body-md text-on-surface-variant text-sm">
                            Client: Studio 9
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-md">
                        <span className="bg-tertiary text-on-tertiary px-sm py-xs rounded-full font-label-caps text-label-caps">
                          Pending
                        </span>
                        <div className="font-headline-md text-body-md text-on-background">
                          $300
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Earnings Jar */}
              <div className="col-span-12 lg:col-span-4">
                <div className="bg-surface-container-lowest p-xl rounded-xl shadow-md h-full flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-md">
                    <span className="bg-surface-container-high px-sm py-xs rounded-full font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                      Monthly Goal
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-background mb-lg self-start">
                    The Earnings Jar
                  </h2>
                  <div className="relative w-48 h-64 mb-md">
                    <svg
                      className="w-full h-full drop-shadow-xl"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 120"
                    >
                      <path
                        className="text-outline-variant/50"
                        d="M 20 10 Q 50 -5 80 10 L 85 110 Q 50 125 15 110 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      ></path>
                      <g clipPath="url(#jar-clip)">
                        <rect
                          className="text-primary opacity-20"
                          fill="currentColor"
                          height="80"
                          width="100"
                          x="0"
                          y="45"
                        ></rect>
                        <path
                          className="text-primary opacity-60"
                          d="M 0 45 Q 25 35 50 45 T 100 45 L 100 120 L 0 120 Z"
                          fill="currentColor"
                        >
                          <animate
                            attributeName="d"
                            dur="3s"
                            repeatCount="indefinite"
                            values="M 0 45 Q 25 35 50 45 T 100 45 L 100 120 L 0 120 Z; M 0 45 Q 25 55 50 45 T 100 45 L 100 120 L 0 120 Z; M 0 45 Q 25 35 50 45 T 100 45 L 100 120 L 0 120 Z"
                          ></animate>
                        </path>
                        <circle cx="30" cy="80" fill="#ffffff" opacity="0.8" r="4">
                          <animate
                            attributeName="cy"
                            dur="2s"
                            from="120"
                            repeatCount="indefinite"
                            to="45"
                          ></animate>
                          <animate
                            attributeName="opacity"
                            dur="2s"
                            from="0.8"
                            repeatCount="indefinite"
                            to="0"
                          ></animate>
                        </circle>
                        <circle cx="70" cy="90" fill="#ffffff" opacity="0.6" r="3">
                          <animate
                            attributeName="cy"
                            begin="0.5s"
                            dur="2.5s"
                            from="120"
                            repeatCount="indefinite"
                            to="45"
                          ></animate>
                          <animate
                            attributeName="opacity"
                            begin="0.5s"
                            dur="2.5s"
                            from="0.6"
                            repeatCount="indefinite"
                            to="0"
                          ></animate>
                        </circle>
                        <circle cx="50" cy="70" fill="#ffffff" opacity="0.5" r="5">
                          <animate
                            attributeName="cy"
                            begin="1s"
                            dur="1.8s"
                            from="120"
                            repeatCount="indefinite"
                            to="45"
                          ></animate>
                          <animate
                            attributeName="opacity"
                            begin="1s"
                            dur="1.8s"
                            from="0.5"
                            repeatCount="indefinite"
                            to="0"
                          ></animate>
                        </circle>
                      </g>
                      <path
                        className="opacity-50"
                        d="M 20 10 Q 50 -5 80 10"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                      ></path>
                      <path
                        className="opacity-30"
                        d="M 17 25 Q 50 15 83 25"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1"
                      ></path>
                      <path
                        className="text-outline-variant/50"
                        d="M 20 10 L 17 25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      ></path>
                      <path
                        className="text-outline-variant/50"
                        d="M 80 10 L 83 25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      ></path>
                      <defs>
                        <clipPath id="jar-clip">
                          <path d="M 17 25 L 85 110 Q 50 125 15 110 Z"></path>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pt-8">
                      <div className="font-display-lg text-display-lg text-on-primary-fixed drop-shadow-md">
                        65%
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-body-md text-on-surface-variant mb-xs">
                      Goal: $20,000
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mt-sm">
                      <div className="h-full bg-primary rounded-full w-[65%]"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}