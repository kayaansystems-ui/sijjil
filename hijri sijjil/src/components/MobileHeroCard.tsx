import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, User, Sliders, Info, Zap, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { ISLAMIC_MONTHS } from "../utils/hijri";

interface MobileHeroCardProps {
  fullName: string;
  setFullName: (val: string) => void;
  birthDate: string;
  setBirthDate: (val: string) => void;
  inputCalendarMode: "gregorian" | "hijri";
  setInputCalendarMode: (val: "gregorian" | "hijri") => void;
  hijriDay: number;
  setHijriDay: (val: number) => void;
  hijriMonth: number;
  setHijriMonth: (val: number) => void;
  hijriYear: number;
  setHijriYear: (val: number) => void;
  method: "tabular_civil" | "tabular_astronomical";
  setMethod: (val: "tabular_civil" | "tabular_astronomical") => void;
  offset: number;
  setOffset: (val: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isDark: boolean;
}

export default function MobileHeroCard({
  fullName,
  setFullName,
  birthDate,
  setBirthDate,
  inputCalendarMode,
  setInputCalendarMode,
  hijriDay,
  setHijriDay,
  hijriMonth,
  setHijriMonth,
  hijriYear,
  setHijriYear,
  method,
  setMethod,
  offset,
  setOffset,
  onSubmit,
  isLoading,
  isDark,
}: MobileHeroCardProps) {
  const [showSettings, setShowSettings] = useState(false);

  const popularNames = [
    { name: "Muhammad", ar: "محمد" },
    { name: "Fatima", ar: "فاطمة" },
    { name: "Ahmad", ar: "أحمد" },
    { name: "Aisha", ar: "عائشة" },
    { name: "Ali", ar: "علي" },
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0" id="landing-hero-card">
      <div
        className={`relative overflow-hidden rounded-3xl border p-6 md:p-8 transition-all ${
          isDark
            ? "bg-stone-900/40 border-stone-850 shadow-2xl shadow-stone-950/40"
            : "bg-white/60 backdrop-blur-md border-stone-200/80 shadow-lg shadow-stone-200/20"
        }`}
      >
        {/* Subtle decorative background Islamic pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-geom-hero" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M30 10 L50 30 L30 50 L10 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="30" cy="30" r="3" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-geom-hero)" className={isDark ? "text-emerald-glow" : "text-emerald-accent"} />
          </svg>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-accent dark:text-emerald-glow border border-emerald-500/20">
            <Sparkles className="w-3 h-3" /> SIJILL DIGITAL REGISTRY
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-emerald-accent dark:text-emerald-glow tracking-wider mt-3">
            REVEAL YOUR ESSENCE
          </h2>
          <p className="text-xs opacity-75 mt-1.5 max-w-xs mx-auto leading-relaxed">
            Enter your name and date of birth to build your premium Islamic Identity Card and certified academic insights.
          </p>
        </div>

        {/* Inputs container */}
        <form onSubmit={onSubmit} className="space-y-5 relative z-10">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 block">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-accent/60 dark:text-emerald-glow/60">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                placeholder="e.g., Zainab Al-Fihri"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full pl-11 pr-4 py-3.5 text-sm font-semibold rounded-2xl border outline-none transition-all ${
                  isDark
                    ? "bg-stone-950/80 border-stone-800 text-warm-white focus:border-emerald-glow/50 focus:ring-1 focus:ring-emerald-glow/10"
                    : "bg-white/75 border-stone-200 text-ink focus:border-emerald-accent/50 focus:ring-1 focus:ring-emerald-accent/10"
                }`}
                id="hero-input-fullname"
              />
            </div>

            {/* Discover Names Grid */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-50 flex items-center gap-1 shrink-0">
                <Zap className="w-2.5 h-2.5 text-emerald-accent" /> Examples:
              </span>
              {popularNames.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setFullName(item.name)}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-lg border transition-all cursor-pointer ${
                    isDark
                      ? "bg-stone-950/40 border-stone-850 text-slate-400 hover:text-emerald-glow hover:border-emerald-glow/20"
                      : "bg-white border-stone-200 text-slate-600 hover:text-emerald-accent hover:border-emerald-accent/20"
                  }`}
                  id={`hero-btn-suggest-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Input Mode Switcher */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 block">
              Calendar Entry Mode
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-stone-950/20 dark:bg-stone-950/40 border border-stone-205/50 dark:border-stone-850">
              <button
                type="button"
                onClick={() => setInputCalendarMode("gregorian")}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  inputCalendarMode === "gregorian"
                    ? (isDark ? "bg-stone-800 text-emerald-glow border border-stone-700" : "bg-white text-emerald-accent shadow-sm border border-stone-200")
                    : "text-slate-400 hover:text-emerald-accent"
                }`}
                id="tab-mode-gregorian"
              >
                Gregorian ➔ Hijri
              </button>
              <button
                type="button"
                onClick={() => setInputCalendarMode("hijri")}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  inputCalendarMode === "hijri"
                    ? (isDark ? "bg-stone-800 text-emerald-glow border border-stone-700" : "bg-white text-emerald-accent shadow-sm border border-stone-200")
                    : "text-slate-400 hover:text-emerald-accent"
                }`}
                id="tab-mode-hijri"
              >
                Hijri ➔ Gregorian
              </button>
            </div>
          </div>

          {/* Date Picker (Conditional) */}
          {inputCalendarMode === "gregorian" ? (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 block">
                Gregorian Date of Birth
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-accent/60 dark:text-emerald-glow/60">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className={`w-full pl-11 pr-4 py-3.5 text-sm font-semibold rounded-2xl border outline-none transition-all ${
                    isDark
                      ? "bg-stone-950/80 border-stone-800 text-warm-white focus:border-emerald-glow/50 focus:ring-1 focus:ring-emerald-glow/10"
                      : "bg-white/75 border-stone-200 text-ink focus:border-emerald-accent/50 focus:ring-1 focus:ring-emerald-accent/10"
                  }`}
                  id="hero-input-birthdate"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 block">
                Hijri Date of Birth
              </label>
              <div className="grid grid-cols-12 gap-2">
                {/* Day Select */}
                <div className="col-span-3">
                  <select
                    value={hijriDay}
                    onChange={(e) => setHijriDay(parseInt(e.target.value, 10))}
                    className={`w-full px-3 py-3.5 text-sm font-semibold rounded-2xl border outline-none transition-all cursor-pointer ${
                      isDark
                        ? "bg-stone-950/80 border-stone-800 text-warm-white focus:border-emerald-glow/50 focus:ring-1 focus:ring-emerald-glow/10"
                        : "bg-white/75 border-stone-200 text-ink focus:border-emerald-accent/50 focus:ring-1 focus:ring-emerald-accent/10"
                    }`}
                    id="hero-input-hijri-day"
                  >
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <span className="text-[9px] opacity-50 block mt-1 text-center font-bold">DAY</span>
                </div>

                {/* Month Select */}
                <div className="col-span-5">
                  <select
                    value={hijriMonth}
                    onChange={(e) => setHijriMonth(parseInt(e.target.value, 10))}
                    className={`w-full px-3 py-3.5 text-sm font-semibold rounded-2xl border outline-none transition-all cursor-pointer ${
                      isDark
                        ? "bg-stone-950/80 border-stone-800 text-warm-white focus:border-emerald-glow/50"
                        : "bg-white/75 border-stone-200 text-ink focus:border-emerald-accent/50"
                    }`}
                    id="hero-input-hijri-month"
                  >
                    {ISLAMIC_MONTHS.map((m) => (
                      <option key={m.index} value={m.index}>
                        {m.index}. {m.en} ({m.ar})
                      </option>
                    ))}
                  </select>
                  <span className="text-[9px] opacity-50 block mt-1 text-center font-bold">LUNAR MONTH</span>
                </div>

                {/* Year Input */}
                <div className="col-span-4">
                  <input
                    type="number"
                    min="1"
                    max="1600"
                    value={hijriYear}
                    onChange={(e) => setHijriYear(Math.max(1, parseInt(e.target.value, 10) || 1420))}
                    className={`w-full px-3 py-3.5 text-sm font-semibold rounded-2xl border outline-none text-center transition-all ${
                      isDark
                        ? "bg-stone-950/80 border-stone-800 text-warm-white focus:border-emerald-glow/50"
                        : "bg-white/75 border-stone-200 text-ink focus:border-emerald-accent/50"
                    }`}
                    id="hero-input-hijri-year"
                  />
                  <span className="text-[9px] opacity-50 block mt-1 text-center font-bold">YEAR AH</span>
                </div>
              </div>
            </div>
          )}

          {/* Expandable Precision Drawer */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center justify-between w-full py-2 text-[10px] font-bold uppercase tracking-wider text-emerald-accent dark:text-emerald-glow hover:underline transition-colors cursor-pointer"
              id="hero-btn-toggle-precision"
            >
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Calendar Calibration Controls
              </span>
              {showSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden space-y-4 pt-3"
                >
                  {/* Offset Sighting Adjustment */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold opacity-75">
                      <span className="flex items-center gap-1">
                        Sighting Offset Adjustment
                        <span className="group relative cursor-pointer opacity-50 hover:opacity-100">
                          <Info className="w-3 h-3" />
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-44 p-2 rounded bg-stone-950 text-[9px] leading-normal text-slate-300 border border-stone-800 opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-xl z-50">
                            Traditional Islamic months depend on active regional moon sighting. Calibration aligns with your religious authority.
                          </span>
                        </span>
                      </span>
                      <span className="font-mono text-[10px] text-emerald-accent dark:text-emerald-glow font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {offset >= 0 ? "+" : ""}
                        {offset} Days
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="1"
                      value={offset}
                      onChange={(e) => setOffset(parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-accent dark:accent-emerald-glow h-1 rounded-lg bg-stone-200 dark:bg-stone-800 cursor-pointer"
                      id="hero-input-offset"
                    />
                  </div>

                  {/* Calculation Method */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold opacity-75 block">
                      Islamic Epoch Logic
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setMethod("tabular_civil")}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                          method === "tabular_civil"
                            ? "border-emerald-accent bg-emerald-500/5 text-emerald-accent dark:border-emerald-glow dark:text-emerald-glow"
                            : isDark
                            ? "border-stone-800 bg-stone-950/60 text-slate-400 hover:border-stone-750"
                            : "border-stone-200 bg-stone-50 text-slate-600 hover:border-stone-300"
                        }`}
                        id="hero-btn-method-civil"
                      >
                        <div className="text-[10px] font-bold">Civil (Standard)</div>
                        <p className="text-[9px] leading-tight opacity-75 mt-0.5">Friday, 16 July 622 CE epoch.</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMethod("tabular_astronomical")}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                          method === "tabular_astronomical"
                            ? "border-emerald-accent bg-emerald-500/5 text-emerald-accent dark:border-emerald-glow dark:text-emerald-glow"
                            : isDark
                            ? "border-stone-800 bg-stone-950/60 text-slate-400 hover:border-stone-750"
                            : "border-stone-200 bg-stone-50 text-slate-600 hover:border-stone-300"
                        }`}
                        id="hero-btn-method-astronomy"
                      >
                        <div className="text-[10px] font-bold">Astronomical</div>
                        <p className="text-[9px] leading-tight opacity-75 mt-0.5">Thursday, 15 July 622 CE epoch.</p>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reveal Identity Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full relative mt-2 py-4 px-6 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group ${
              isDark
                ? "bg-warm-white text-ink hover:bg-white/90"
                : "bg-ink text-white hover:bg-black/90 shadow-stone-200/50"
            }`}
            id="hero-btn-submit"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>REVEAL ISLAMIC IDENTITY</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
