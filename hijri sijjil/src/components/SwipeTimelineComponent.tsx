import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MoonStar, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { HijriDateInfo } from "../types";

interface SwipeTimelineComponentProps {
  birthDate: string;
  hijriInfo: HijriDateInfo;
  isDark: boolean;
}

export default function SwipeTimelineComponent({ birthDate, hijriInfo, isDark }: SwipeTimelineComponentProps) {
  // 0: Gregorian Solar, 1: Hijri Lunar
  const [activeTab, setActiveTab] = useState<0 | 1>(1);

  // Calculate Lunar Age details
  const birthYear = new Date(birthDate).getFullYear();
  const currentYear = new Date().getFullYear();
  const solarAge = Math.max(0, currentYear - birthYear);
  // Lunar year is 1.0307 times shorter, meaning age increases faster by ~3%
  const lunarAge = Math.floor(solarAge * 1.0307);
  const ageDiff = Math.max(0, lunarAge - solarAge);

  const formatGregorianDate = (dStr: string) => {
    try {
      const d = new Date(dStr);
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dStr;
    }
  };

  return (
    <div className="w-full" id="swipe-timeline-section">
      {/* Tab select slider */}
      <div className="flex justify-center mb-6">
        <div
          className={`relative p-1 rounded-full flex items-center border ${
            isDark ? "bg-stone-900/40 border-stone-850" : "bg-white border-stone-200"
          }`}
        >
          <button
            onClick={() => setActiveTab(0)}
            className={`relative z-10 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 0
                ? "text-white dark:text-ink"
                : isDark
                ? "text-slate-400 hover:text-slate-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
            id="tab-btn-gregorian"
          >
            {activeTab === 0 && (
              <motion.div
                layoutId="active-timeline-tab"
                className="absolute inset-0 bg-emerald-accent dark:bg-warm-white rounded-full -z-10"
              />
            )}
            <Calendar className="w-3.5 h-3.5" /> Solar (Gregorian)
          </button>

          <button
            onClick={() => setActiveTab(1)}
            className={`relative z-10 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 1
                ? "text-white dark:text-ink"
                : isDark
                ? "text-slate-400 hover:text-slate-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
            id="tab-btn-hijri"
          >
            {activeTab === 1 && (
              <motion.div
                layoutId="active-timeline-tab"
                className="absolute inset-0 bg-emerald-accent dark:bg-warm-white rounded-full -z-10"
              />
            )}
            <MoonStar className="w-3.5 h-3.5" /> Lunar (Hijri)
          </button>
        </div>
      </div>

      {/* Swipe Container */}
      <div className="relative overflow-hidden min-h-[190px]">
        <AnimatePresence mode="wait">
          {activeTab === 0 ? (
            <motion.div
              key="gregorian"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`rounded-2xl border p-6 flex flex-col justify-between ${
                isDark
                  ? "bg-stone-900/30 border-stone-850 text-slate-300"
                  : "bg-white border-stone-200 text-stone-700"
              }`}
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-accent dark:text-emerald-glow block mb-1">
                  Solar Milestone epoch
                </span>
                <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                  {formatGregorianDate(birthDate)}
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 mt-2 leading-relaxed">
                  Calculated under standard Solar Gregorian orbit cycles. This coordinates to a Julian Day Number (JDN) of approximately <span className="font-mono font-bold text-emerald-accent dark:text-emerald-glow">{2440000 + (hijriInfo.year * 354) + (hijriInfo.month * 29) + hijriInfo.day}</span>.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-850/10 dark:border-stone-800 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Solar Age</span>
                  <p className="font-serif text-base font-bold text-slate-900 dark:text-slate-100">{solarAge} Years</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Orbit Nature</span>
                  <p className="font-serif text-xs font-bold text-emerald-accent dark:text-emerald-glow">Solar Equinox Axis</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hijri"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`rounded-2xl border p-6 flex flex-col justify-between ${
                isDark
                  ? "bg-stone-900/30 border-stone-850 text-slate-300"
                  : "bg-white border-stone-200 text-stone-700"
              }`}
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-accent dark:text-emerald-glow block mb-1">
                  Lunar celestial epoch
                </span>
                <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                  {hijriInfo.dayOfWeek}, {hijriInfo.day} {hijriInfo.monthNameEn} {hijriInfo.year} AH
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 mt-2 leading-relaxed">
                  Your milestone occurred in the month of <span className="font-bold text-emerald-accent dark:text-emerald-glow">{hijriInfo.monthNameEn}</span> ({hijriInfo.monthNameAr}), under the lunar cycle. Sighting calibrated to an offset of <span className="font-mono text-emerald-accent dark:text-emerald-glow">{hijriInfo.offsetDays > 0 ? "+" : ""}{hijriInfo.offsetDays} days</span>.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-850/10 dark:border-stone-800 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Lunar Age</span>
                  <p className="font-serif text-base font-bold text-emerald-accent dark:text-emerald-glow">
                    {lunarAge} Lunar Years
                  </p>
                  {ageDiff > 0 && (
                    <span className="text-[9px] font-mono text-emerald-500 dark:text-emerald-glow font-semibold block">
                      +{ageDiff} years older in Hijri!
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Islamic Season</span>
                  <p className="font-serif text-xs font-bold text-emerald-accent dark:text-emerald-glow">
                    Rotational Lunar Cycle
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual Swiping Arrows Indicator */}
      <div className="flex items-center justify-center gap-3 mt-4 text-[11px] font-semibold text-slate-400">
        <button
          onClick={() => setActiveTab(0)}
          className={`p-1 rounded-full hover:bg-emerald-500/10 hover:text-emerald-accent dark:hover:text-emerald-glow transition-colors cursor-pointer ${
            activeTab === 0 ? "opacity-30 cursor-not-allowed" : ""
          }`}
          disabled={activeTab === 0}
          id="btn-prev-timeline"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-mono select-none">Swipe or Tap to Compare Chronologies</span>
        <button
          onClick={() => setActiveTab(1)}
          className={`p-1 rounded-full hover:bg-emerald-500/10 hover:text-emerald-accent dark:hover:text-emerald-glow transition-colors cursor-pointer ${
            activeTab === 1 ? "opacity-30 cursor-not-allowed" : ""
          }`}
          disabled={activeTab === 1}
          id="btn-next-timeline"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
