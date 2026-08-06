"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Import your Supabase client

// --- Types ---
type TooltipData = {
  visible: boolean;
  text: string;
  x: number;
  y: number;
};

type HeatmapCell = {
  levelClass: string;
  dateStr: string;
  numCommissions: number;
};

export default function Page() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  // 1. Initial State: An empty 52x7 grid to prevent Next.js hydration mismatch
  const [heatmapData, setHeatmapData] = useState<HeatmapCell[]>(() =>
    Array.from({ length: 52 * 7 }).map(() => ({
      levelClass: "bg-surface",
      dateStr: "",
      numCommissions: 0,
    })),
  );

  // 2. Fetch live data from Supabase after the component mounts
  useEffect(() => {
    async function loadCommissionData() {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 52 * 7);

      // Fetch commissions from the database
      const { data: dbCommissions, error } = await supabase
        .from("commissions")
        .select("completed_at")
        .gte("completed_at", startDate.toISOString().split("T")[0]);

      if (error) {
        // Force the browser to print the exact text of the error
        console.error("Error Message:", error.message);
        console.error("Error Details:", error.details);
        console.error("Error Hint:", error.hint);
        console.error("Full Error:", JSON.stringify(error, null, 2));
        return;
      }

      // Tally the commissions by date
      const countsByDate: Record<string, number> = {};
      dbCommissions?.forEach((item) => {
        countsByDate[item.completed_at] =
          (countsByDate[item.completed_at] || 0) + 1;
      });

      const levels = [
        "bg-surface",
        "bg-secondary-fixed-dim/30",
        "bg-secondary-fixed-dim/60",
        "bg-primary-fixed",
        "bg-primary",
      ];

      const gridData: HeatmapCell[] = [];
      let currentDate = new Date(startDate);

      // Build the grid data array
      for (let i = 0; i < 52 * 7; i++) {
        const dateISO = currentDate.toISOString().split("T")[0];
        const numCommissions = countsByDate[dateISO] || 0;
        const levelIndex = Math.min(numCommissions, 4);

        gridData.push({
          levelClass: levels[levelIndex],
          dateStr: currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          numCommissions,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      setHeatmapData(gridData);
    }

    loadCommissionData();
  }, []);

  const handleCellMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    cellData: { numCommissions: number; dateStr: string },
  ) => {
    if (!cellData.dateStr) return; // Prevent tooltip on initial empty render

    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipText = `${
      cellData.numCommissions === 0 ? "No" : cellData.numCommissions
    } commission${
      cellData.numCommissions === 1 ? "" : "s"
    } delivered on ${cellData.dateStr}`;

    setTooltip({
      visible: true,
      text: tooltipText,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleCellMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const scrollToForm = () => {
    document.getElementById("commission-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-surface-container-lowest font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <main className="w-full flex flex-col">
        <div className="flex flex-col w-full relative overflow-hidden bg-surface-container-lowest text-on-surface pb-xl">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg
              className="w-full h-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1440 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="text-primary-container opacity-10"
                d="M0 160L48 144C96 128 192 96 288 106.7C384 117 480 171 576 186.7C672 203 768 181 864 149.3C960 117 1056 75 1152 74.7C1248 75 1344 117 1392 138.7L1440 160V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V160Z"
                fill="currentColor"
              ></path>
              <path
                className="text-secondary-container opacity-5"
                d="M0 320L48 298.7C96 277 192 235 288 224C384 213 480 235 576 218.7C672 203 768 149 864 128C960 107 1056 117 1152 144C1248 171 1344 213 1392 234.7L1440 256V320H1392C1344 320 1248 320 1152 320C1056 320 960 320 864 320C768 320 672 320 576 320C480 320 384 320 288 320C192 320 96 320 48 320H0V320Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          {/* 1. Hero Section */}
          <section className="relative w-full max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop pt-xl pb-lg flex flex-col items-center justify-center min-h-[80vh] text-center z-10">
            <img
              alt="Jo Creates Logo"
              className="w-48 h-48 object-contain mb-md rounded-full shadow-lg bg-surface"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvY7yuEZQDTRU_DYEVwAjG0OHPp1Edbh7JVtkqWUL-AVuFbLReMfAMvj7hJXF0XG5tWKHGq5UUe5ogfAQaI1xyI_liYqGkoHTtLadsKh70TSi6dSX_309pDUBGJ3vBlSOF46oOYW9k4dEhb-CsjzsyIc8FuU3t3abBUaYh4618Yp6orIUTa8b-Nbo-OvgTsIEMbNTNvV2YK1pyo4r2obSLWdioeh6hrVVbkzJr7F1VaJcyC8XrSx0znxMQ"
            />
            <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary tracking-tight mb-md max-w-4xl leading-tight">
              Where System <span className="text-tertiary">Meets Soul.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-xl">
              Jo Creates is a multi-disciplinary design studio specializing in
              brand identity, publication materials, and dynamic visual
              storytelling. We balance meticulous structural design with fluid,
              organic creativity to deliver commissions that resonate.
            </p>
            <button
              onClick={scrollToForm}
              className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-caps text-label-caps py-4 px-8 rounded-full shadow-md hover:shadow-xl transition-all duration-500 flex items-center gap-2 group"
            >
              COMMISSION ME
              <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">
                arrow_downward
              </span>
            </button>
          </section>

          {/* 2. Commissioned Projects Commits */}
          <section className="w-full max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-xl z-10 relative">
            <div className="flex flex-col md:flex-row justify-between items-end mb-md gap-sm">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary mb-xs">
                  Commission Commits
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Consistent delivery of high-quality creative work.
                </p>
              </div>
              <div className="bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-label-caps px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">
                  verified
                </span>
                150+ Commissions Delivered
              </div>
            </div>

            <div className="bg-surface-container rounded-xl p-md shadow-sm overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-flow-col grid-rows-[repeat(7,minmax(0,1fr))] auto-cols-fr gap-1 mb-xs">
                  {heatmapData.map((cell, index) => (
                    <div
                      key={index}
                      onMouseEnter={(e) => handleCellMouseEnter(e, cell)}
                      onMouseLeave={handleCellMouseLeave}
                      className={`w-full aspect-square rounded-[2px] ${cell.levelClass} hover:ring-2 hover:ring-outline transition-all cursor-crosshair`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-end items-center gap-2 font-label-caps text-label-caps text-on-surface-variant mt-sm">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-[2px] bg-surface"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-secondary-fixed-dim/30"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-secondary-fixed-dim/60"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-primary-fixed"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-primary"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Heatmap Tooltip Portal Overlay */}
            {tooltip.visible && (
              <div
                className="fixed pointer-events-none z-50 transition-opacity duration-200 bg-inverse-surface text-inverse-on-surface text-[12px] py-2 px-3 rounded-md shadow-xl whitespace-nowrap transform -translate-x-1/2 -translate-y-full font-body-md"
                style={{
                  left: `${tooltip.x}px`,
                  top: `${tooltip.y}px`,
                  opacity: tooltip.visible ? 1 : 0,
                }}
              >
                <span>{tooltip.text}</span>
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-inverse-surface"></div>
              </div>
            )}
          </section>

          {/* 3. Featured Projects Showcase */}
          <section className="w-full bg-surface-container-low py-xl relative overflow-hidden z-10">
            <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop">
              <h2 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface mb-xl text-center">
                Featured Work
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    title="A sleek, high-end editorial spread mockup for an art magazine. Clean typography, generous whitespace, large evocative photography. Soft natural lighting. Corporate yet artistic aesthetic. Primary color #4684C2 accents."
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBohkmxrOh8xfGgAJsbxJnS4B5h9_WMvbIWDh7Jhzs01zLHSUTDJhHiyiDj7P1l6ufHlih82iZJif12sDuaRvhTLlQ45h5Xa-Xkt3NSmm-MQYV9bNaixLfgarEyqytOGinGSQDFoIEQ2HSb8gxo8Om-VugXSfhBAf-3IVX-gXT0Jp-f3-1DlB_nhSUDJFACb3kGbRweQIDwgLNXn76GxwbncTtaTyQ_f1y06Km26qQC9RgPRYjiYPgb')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-lg">
                    <span className="font-label-caps text-label-caps text-primary-fixed mb-xs tracking-widest uppercase">
                      Publication
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-primary">
                      Aura Art Journal
                    </h3>
                  </div>
                </div>
                <div className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer md:translate-y-8">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    title="A minimalist brand identity mockup on premium textured paper. Business cards and letterhead featuring organic wave motifs. Crisp lighting, subtle drop shadows, #4684C2 and deep navy blue tones."
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKCNw3_eE5S5Mou1U8g9YRGUcUlJVODl2w61cAIm0j0Efcnexaougmkj99zNY5lQS35Pb614hZYZoJg0tvSuM75ShBD3PgLj7h2Kk0l3JBv3Gi5cM9968RZGtHZVr0ir8s_NNnwcWRENSxFrUh-UDDPYdlQnf_rM749kYyWei8izlEux_GVtmRQoPf5iyU90BMy5Lk8kiANlVk94EHWcsaSf1w4yjpWOXMzo5XW_DU7-DBVNS6kv-t')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-lg">
                    <span className="font-label-caps text-label-caps text-primary-fixed mb-xs tracking-widest uppercase">
                      Brand Identity
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-primary">
                      Lumina Studio Rebrand
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Comprehensive Portfolio Grid */}
          <section className="w-full max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-xl z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-lg gap-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Archive
              </h2>
              <div className="flex flex-wrap justify-center gap-2 bg-surface-container-low p-1 rounded-full shadow-sm">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-4 py-2 rounded-full font-label-caps text-label-caps transition-colors ${
                    activeFilter === "all"
                      ? "bg-primary text-on-primary"
                      : "hover:bg-surface-variant text-on-surface-variant"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter("graphic-design")}
                  className={`px-4 py-2 rounded-full font-label-caps text-label-caps transition-colors ${
                    activeFilter === "graphic-design"
                      ? "bg-primary text-on-primary"
                      : "hover:bg-surface-variant text-on-surface-variant"
                  }`}
                >
                  Graphic Design
                </button>
                <button
                  onClick={() => setActiveFilter("video-editing")}
                  className={`px-4 py-2 rounded-full font-label-caps text-label-caps transition-colors ${
                    activeFilter === "video-editing"
                      ? "bg-primary text-on-primary"
                      : "hover:bg-surface-variant text-on-surface-variant"
                  }`}
                >
                  Video Editing
                </button>
                <button
                  onClick={() => setActiveFilter("brand-identity")}
                  className={`px-4 py-2 rounded-full font-label-caps text-label-caps transition-colors ${
                    activeFilter === "brand-identity"
                      ? "bg-primary text-on-primary"
                      : "hover:bg-surface-variant text-on-surface-variant"
                  }`}
                >
                  Brand Identity
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {/* Card 1 */}
              {(activeFilter === "all" ||
                activeFilter === "graphic-design") && (
                <div className="group bg-surface-container rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="w-full aspect-[4/3] bg-cover bg-center"
                    title="A striking poster design blending Swiss graphic design principles with fluid, liquid-like blue (#4684C2) abstract shapes. Bold typography, high contrast."
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgUy6xobyGN0_Vc4WmOIuqtiJ24m4BZXtGVUISEbyeGPkHty77FiHJP0nYbZ9afTcC1mfQ1KZWNMWKPbMqzJQokiVg94vXWH5av2AUJdfIHQmezflfEybHKMT67kELmgbhr7G4SLR-bwyCE4aZ_SV2WcGC3cQd3_3Xo-z2610Gyf8vPwKI08A5m3Vfpsm0n4QFVWMTfd1yYniahX9WRrAGZtgBaEWUehs7zhURG_E1RfFHnpdxGCI3')",
                    }}
                  ></div>
                  <div className="p-md">
                    <h4 className="font-headline-md text-body-lg font-semibold text-on-surface mb-xs">
                      Echo Festival
                    </h4>
                    <p className="font-body-md text-sm text-on-surface-variant mb-sm line-clamp-2">
                      Poster series exploring sound visualization through liquid
                      dynamics.
                    </p>
                    <div className="flex gap-2">
                      <span className="bg-surface text-tertiary-container px-2 py-1 rounded font-label-caps text-[10px]">
                        Graphic Design
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 2 */}
              {(activeFilter === "all" || activeFilter === "video-editing") && (
                <div className="group bg-surface-container rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="w-full aspect-[4/3] bg-cover bg-center"
                    title="A sleek video editing timeline interface mockup displayed on a modern monitor, showing a cinematic color grading workflow. Moody lighting, professional studio environment."
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAp1um0Gc5F0epIfZqvg5T-M9l9cIyGtqEcHbfFHi47AJdmhJxo2yZUK4tmUAfVt8ej55DkIEx2nslIE02dII8yTlD7vEpC0YVYnI--YKJR_TAs8gjm-9nA__rf9eEHwp_5ZJ08b9zlUmHRIgvUUw5ZrPK74YRG4NQOO8uvyGhoayC1WjpGUoejE8BMdMF3HSVJOlE3JuLM0nv8NCUNhiTSkcvBNQ6E3C0M_TpZYjPXkYky9LQ5Vjo7')",
                    }}
                  ></div>
                  <div className="p-md">
                    <h4 className="font-headline-md text-body-lg font-semibold text-on-surface mb-xs">
                      Motion Reel '23
                    </h4>
                    <p className="font-body-md text-sm text-on-surface-variant mb-sm line-clamp-2">
                      Cinematic cut showcasing narrative pacing and color
                      grading expertise.
                    </p>
                    <div className="flex gap-2">
                      <span className="bg-surface text-tertiary-container px-2 py-1 rounded font-label-caps text-[10px]">
                        Video Editing
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 3 */}
              {(activeFilter === "all" ||
                activeFilter === "brand-identity") && (
                <div className="group bg-surface-container rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="w-full aspect-[4/3] bg-cover bg-center"
                    title="A luxury packaging mockup for a skincare brand. Clean white boxes with subtle debossed silver logos and a signature blue (#4684C2) ribbon. Studio lighting."
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDROdyfDE8O5zjAa7mryczQj9FfQqWswir2j59FEp8Zwj4q-EpgDeVLaUm9Xze3zQy-9PJCyq3VymglzTAOGjY2egWZ06QYRF0hdUWtbSjIWRZZQjWcMf5-kkX63KygUcjcpjbUNI1ca6tgCoOnQDsVCZ6ZS1VcZFmOvmsULMmWhi5TeFZZ7e0PQLvyiZKEjKOqQDxYZQ5VUErYSXTxGZu8kBVN7SU2qoU98YlwPPOex3X9I-rI22On')",
                    }}
                  ></div>
                  <div className="p-md">
                    <h4 className="font-headline-md text-body-lg font-semibold text-on-surface mb-xs">
                      Vela Skincare
                    </h4>
                    <p className="font-body-md text-sm text-on-surface-variant mb-sm line-clamp-2">
                      Complete packaging and identity design for a premium
                      organic skincare line.
                    </p>
                    <div className="flex gap-2">
                      <span className="bg-surface text-tertiary-container px-2 py-1 rounded font-label-caps text-[10px]">
                        Brand Identity
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 5. Commission Inquiry Form */}
          <section
            className="w-full bg-primary py-xl relative overflow-hidden z-10"
            id="commission-form"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
              <svg
                className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] animate-[spin_60s_linear_infinite]"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  className="text-on-primary"
                  d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                ></path>
                <path
                  className="text-on-primary"
                  d="M50,10 C27.9,10 10,27.9 10,50 C10,72.1 27.9,90 50,90 C72.1,90 90,72.1 90,50 C90,27.9 72.1,10 50,10 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                ></path>
              </svg>
            </div>
            <div className="max-w-[800px] mx-auto px-margin-mobile lg:px-margin-desktop relative z-10 bg-surface rounded-2xl shadow-xl p-lg md:p-xl">
              <h2 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary mb-md text-center">
                Start a Commission
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant text-center mb-lg">
                Ready to bring your vision to life? Fill out the details below
                to initiate the process.
              </p>
              <form className="flex flex-col gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Service Type
                  </label>
                  <select className="w-full p-3 bg-surface border border-outline-variant rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
                    <option>Cover Page</option>
                    <option>Profile Page Template</option>
                    <option>Background Template</option>
                    <option>Resume</option>
                    <option>Advertisement Poster</option>
                    <option>Digital Collage Design</option>
                    <option>Graphic Design</option>
                    <option>Multiple-Page Design with Cover Page</option>
                    <option>Simple-page Design</option>
                    <option>Commission Sheet</option>
                    <option>Editorial Page Design</option>
                    <option>Class Schedule Wallpaper</option>
                    <option>Restaurant Menu Design</option>
                    <option>Infographics</option>
                    <option>Flyer</option>
                    <option>Brochures</option>
                    <option>Magazine</option>
                    <option>Business / Calling Card</option>
                    <option>
                      Product Packaging Template with Label Stickers
                    </option>
                    <option>Business Logo</option>
                    <option>Business Profile Picture</option>
                    <option>Campus Publication Material</option>
                    <option>K-POP Visual Banners</option>
                    <option>X / Twitter Header</option>
                    <option>Laptop Wallpaper Design</option>
                    <option>Video Edits</option>
                    <option>Other / Consultation</option>
                  </select>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Project Deadline
                  </label>
                  <input
                    className="w-full p-3 bg-surface border border-outline-variant rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    type="date"
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Task Description
                  </label>
                  <textarea
                    className="w-full p-3 bg-surface border border-outline-variant rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Describe your project goals, scope, and specific requirements..."
                    rows={4}
                  ></textarea>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Output Preferences
                  </label>
                  <textarea
                    className="w-full p-3 bg-surface border border-outline-variant rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Formats needed (e.g., .AI, .MP4, print-ready PDF)..."
                    rows={2}
                  ></textarea>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Inspiration Links
                  </label>
                  <input
                    className="w-full p-3 bg-surface border border-outline-variant rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="https://..."
                    type="url"
                  />
                </div>
                <button
                  className="mt-sm w-full bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-headline-md text-body-lg py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  type="button"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low py-xl px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex flex-col items-center md:items-start gap-xs">
            <img
              alt="Jo Creates Logo"
              className="h-8 w-auto object-contain opacity-80 grayscale hover:grayscale-0 transition-all"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvY7yuEZQDTRU_DYEVwAjG0OHPp1Edbh7JVtkqWUL-AVuFbLReMfAMvj7hJXF0XG5tWKHGq5UUe5ogfAQaI1xyI_liYqGkoHTtLadsKh70TSi6dSX_309pDUBGJ3vBlSOF46oOYW9k4dEhb-CsjzsyIc8FuU3t3abBUaYh4618Yp6orIUTa8b-Nbo-OvgTsIEMbNTNvV2YK1pyo4r2obSLWdioeh6hrVVbkzJr7F1VaJcyC8XrSx0znxMQ"
            />
          </div>
          <div className="text-label-caps text-on-surface-variant">
            © 2024 JO CREATES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
              brush
            </span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
              palette
            </span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
              ink_pen
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
