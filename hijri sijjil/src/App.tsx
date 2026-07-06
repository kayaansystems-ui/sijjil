import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, ShieldAlert, Sparkles, HelpCircle, Compass, RotateCcw } from "lucide-react";
import MobileHeroCard from "./components/MobileHeroCard";
import IdentityRevealLoader from "./components/IdentityRevealLoader";
import IdentityCard from "./components/IdentityCard";
import { HijriDateInfo, NameInsight } from "./types";

export default function App() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [inputCalendarMode, setInputCalendarMode] = useState<"gregorian" | "hijri">("gregorian");
  const [hijriDay, setHijriDay] = useState(1);
  const [hijriMonth, setHijriMonth] = useState(1);
  const [hijriYear, setHijriYear] = useState(1420);
  const [method, setMethod] = useState<"tabular_civil" | "tabular_astronomical">("tabular_civil");
  const [offset, setOffset] = useState(0);

  const [hijriInfo, setHijriInfo] = useState<HijriDateInfo | null>(null);
  const [nameInsight, setNameInsight] = useState<NameInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // High-End Slate Dark Theme as Default
  const [isDark, setIsDark] = useState(true);

  // Sync theme selection to HTML class
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isDark]);

  // Handle the calculation with an intentional transition state
  const handleCalculateIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    if (inputCalendarMode === "gregorian" && !birthDate) return;

    setIsLoading(true);
    setError(null);

    // Let the loading screen render first for a high-end transition feel
    try {
      const convertBody: any = { method, offset };
      if (inputCalendarMode === "hijri") {
        convertBody.hijriDate = { year: hijriYear, month: hijriMonth, day: hijriDay };
      } else {
        convertBody.birthDate = birthDate;
      }

      const [dateRes, researchRes] = await Promise.all([
        fetch("/api/convert-date", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(convertBody),
        }),
        fetch("/api/research-name", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: fullName }),
        }),
        // Add a slight minimum transition delay so the loader animations feel organic
        new Promise((resolve) => setTimeout(resolve, 3800)),
      ]);

      if (!dateRes.ok || !researchRes.ok) {
        throw new Error("Unable to complete research. Please verify your inputs and try again.");
      }

      const dateData = (await dateRes.json()) as HijriDateInfo;
      const researchData = (await researchRes.json()) as NameInsight;

      setHijriInfo(dateData);
      setNameInsight(researchData);

      // Smooth scroll directly to the resulting identity card deck
      setTimeout(() => {
        document.getElementById("results-deck-anchor")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected network or calculation error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setHijriInfo(null);
    setNameInsight(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 pb-24 relative overflow-x-hidden ${
        isDark ? "bg-obsidian text-warm-white" : "bg-ivory text-ink"
      }`}
    >
      {/* 5% Opacity Traditional Islamic Geometry Pattern Overlay for Visual Luxury */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="islamic-geometry-bg" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60 0 L120 60 L60 120 L0 60 Z M60 20 L100 60 L60 100 L20 60 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="60" cy="60" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0 0 L120 120 M120 0 L0 120" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#islamic-geometry-bg)" className={isDark ? "text-emerald-glow" : "text-emerald-accent"} />
        </svg>
      </div>

      {/* Upper Subtle Ambient Orbs */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-emerald-500/[0.04] via-transparent to-transparent pointer-events-none select-none"></div>

      {/* Primary Luxury Navigation Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors no-print ${
          isDark ? "bg-obsidian/80 border-stone-900" : "bg-ivory/80 border-stone-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-serif font-extrabold text-xl tracking-[0.15em] text-ink dark:text-warm-white">
              SIJILL
            </div>
            <div className="text-[9px] font-mono tracking-widest text-emerald-accent dark:text-emerald-glow font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              [01] CELESTIAL
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hijriInfo && (
              <button
                onClick={handleReset}
                className={`p-2 rounded-xl border transition-all cursor-pointer text-slate-400 hover:text-emerald-accent ${
                  isDark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200"
                }`}
                title="Reset registry inputs"
                id="header-reset-btn"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? "bg-stone-900 border-stone-800 text-emerald-glow hover:text-emerald-400"
                  : "bg-white border-stone-200 text-emerald-accent hover:text-emerald-700"
              }`}
              title={isDark ? "Lunar Light Mode" : "Astral Dark Mode"}
              id="theme-toggler"
            >
              {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative">
        {/* Loading Overlay State */}
        <AnimatePresence>
          {isLoading && <IdentityRevealLoader isDark={isDark} />}
        </AnimatePresence>

        {/* Brand Slogan */}
        <div className="text-center max-w-xl mx-auto mb-10 no-print">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-accent dark:text-emerald-glow border border-emerald-500/15">
              <Sparkles className="w-2.5 h-2.5" /> Islamic Celestial Heritage
            </span>
          </motion.div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
            Your Islamic Identity, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 dark:from-emerald-400 dark:via-emerald-500 dark:to-emerald-300">
              Revealed Natively
            </span>
          </h1>
          <p className="text-xs md:text-sm opacity-80 mt-2 leading-relaxed max-w-md mx-auto">
            Discover the exact Hijri lunar epoch of your birth, paired with primary-source research of your name. Built for mobile-first thumb interaction.
          </p>
        </div>

        {/* Error Handling Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-lg mx-auto mb-6 no-print"
            >
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Process Interrupted</p>
                  <p className="opacity-90 mt-0.5 text-[11px]">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Grid Container */}
        <div className="space-y-12">
          {/* Landing Input Form Area */}
          <div className="no-print">
            <MobileHeroCard
              fullName={fullName}
              setFullName={setFullName}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
              inputCalendarMode={inputCalendarMode}
              setInputCalendarMode={setInputCalendarMode}
              hijriDay={hijriDay}
              setHijriDay={setHijriDay}
              hijriMonth={hijriMonth}
              setHijriMonth={setHijriMonth}
              hijriYear={hijriYear}
              setHijriYear={setHijriYear}
              method={method}
              setMethod={setMethod}
              offset={offset}
              setOffset={setOffset}
              onSubmit={handleCalculateIdentity}
              isLoading={isLoading}
              isDark={isDark}
            />
          </div>

          {/* Results Narrative Deck Anchor */}
          <div id="results-deck-anchor" className="scroll-mt-24">
            <AnimatePresence mode="wait">
              {hijriInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-10"
                >
                  <IdentityCard
                    fullName={fullName}
                    hijriInfo={hijriInfo}
                    insight={nameInsight}
                    isDark={isDark}
                  />

                  {/* Reset/Recalculate Quick Action Button */}
                  <div className="flex justify-center pt-4 no-print">
                    <button
                      onClick={handleReset}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                        isDark
                          ? "bg-stone-900 border border-stone-800 text-slate-400 hover:text-emerald-glow hover:border-emerald-500/30"
                          : "bg-white border border-stone-200 text-stone-600 hover:text-emerald-accent hover:border-emerald-500/30"
                      }`}
                      id="bottom-reset-action"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Recalculate New Identity</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sighting & Calibration Explainer */}
          {!hijriInfo && (
            <div
              className={`max-w-lg mx-auto rounded-3xl p-5 border text-xs leading-relaxed transition-all no-print ${
                isDark ? "bg-stone-900/40 border-stone-850 text-slate-400" : "bg-white border-stone-200 text-slate-600 shadow-sm"
              }`}
            >
              <h5 className="font-serif font-bold text-emerald-accent dark:text-emerald-glow mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" /> Calibration Science
              </h5>
              <p>
                The Islamic calendar is strictly lunar. Traditional regional months require active moon sighting confirmation which can cause the lunar day to drift slightly. Use our built-in "Calendar Calibration Controls" slider above to align your birth registry perfectly with your regional sighting authorities.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Primary Scholarly Academic References Footer */}
      <footer
        className={`mt-24 border-t py-12 transition-colors no-print ${
          isDark ? "bg-stone-900/45 border-stone-900 text-slate-500" : "bg-stone-100 border-stone-200 text-slate-500"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="font-serif text-xs font-semibold text-emerald-accent dark:text-emerald-glow tracking-widest uppercase">
            Sijill Academic Registers • Scientific References
          </p>
          <p className="text-[10px] leading-relaxed max-w-2xl mx-auto opacity-75">
            Date conversion maps Julian Day Numbers (JDN) to astronomical lunar visibility cycles. Scholarly lexicology is grounded via Gemini 3.5-flash constraints, referencing classical dictionaries (e.g., Lisan al-Arab, Taj al-Arus) and authentic companion records (Al-Isabah).
          </p>
          <div className="flex justify-center items-center gap-4 text-[8px] font-mono font-bold pt-2">
            <span className="flex items-center gap-1 text-emerald-accent dark:text-emerald-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent dark:bg-emerald-glow"></span>
              SECURE FULL-STACK API
            </span>
            <span className="text-slate-500 dark:text-slate-700">|</span>
            <span className="text-emerald-accent dark:text-emerald-glow">GEMINI CLOUD VERIFIED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
