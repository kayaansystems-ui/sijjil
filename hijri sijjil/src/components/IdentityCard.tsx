import React from "react";
import { motion } from "motion/react";
import { Award, Sparkles } from "lucide-react";
import { HijriDateInfo, NameInsight } from "../types";
import SwipeTimelineComponent from "./SwipeTimelineComponent";
import InsightCardStack from "./InsightCardStack";
import IdentityCertificateView from "./IdentityCertificateView";

interface IdentityCardProps {
  fullName: string;
  hijriInfo: HijriDateInfo;
  insight: NameInsight | null;
  isDark: boolean;
}

export default function IdentityCard({
  fullName,
  hijriInfo,
  insight,
  isDark,
}: IdentityCardProps) {
  if (!insight) return null;

  return (
    <div className="w-full space-y-10" id="identity-card-narrative-stack">
      {/* SECTION 1: IDENTITY HEADER CARD (Top Hero) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-3xl border-2 p-6 md:p-8 text-center transition-all ${
          isDark
            ? "bg-stone-900/40 border-emerald-500/20 shadow-xl shadow-emerald-500/[0.02]"
            : "bg-white border-emerald-600/15 shadow-lg shadow-stone-200/40"
        } group`}
        id="section-1-identity-header"
      >
        {/* Subtle slow glowing pulse border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-emerald-500/10 animate-pulse pointer-events-none"></div>

        {/* Floating background calligraphic glyph */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] text-emerald-accent font-arabic text-8xl md:text-9xl">
          سجل
        </div>

        {/* Small header banner */}
        <div className="flex items-center justify-center gap-1.5 mb-4 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-accent dark:text-emerald-glow" /> CELESTIAL IDENTITY REVEALED
          </span>
        </div>

        {/* Large Typography English Full Name */}
        <h2 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-2 relative z-10">
          {fullName}
        </h2>

        {/* Pronunciation block */}
        <p className="text-xs text-emerald-accent dark:text-emerald-glow font-mono italic mt-1.5 font-medium relative z-10">
          "{insight.pronunciation}"
        </p>

        {/* Arabic calligraphy centered beneath */}
        <div className="mt-6 relative z-10">
          <span
            className="font-arabic text-5xl md:text-6xl text-emerald-accent dark:text-emerald-glow font-bold leading-normal select-none tracking-wide block"
            dir="rtl"
          >
            {insight.arabicCalligraphy}
          </span>
        </div>

        {/* Elegant fine-line divider */}
        <div className="w-20 h-[1px] bg-emerald-500/20 mx-auto mt-6"></div>
      </motion.div>

      {/* SECTION 2: CONVERSION TIMELINE (Swipeable) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className={`rounded-3xl p-5 md:p-6 border transition-all ${
          isDark ? "bg-stone-900/40 border-stone-850" : "bg-white border-stone-200 shadow-sm"
        }`}
        id="section-2-conversion-timeline"
      >
        <SwipeTimelineComponent
          birthDate={hijriInfo.gregorianDate}
          hijriInfo={hijriInfo}
          isDark={isDark}
        />
      </motion.div>

      {/* SECTION 3: INSIGHT CARDS (Stacked Feed) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        id="section-3-insight-cards"
      >
        <InsightCardStack insight={insight} isDark={isDark} isLoading={false} />
      </motion.div>

      {/* SECTION 4: IDENTITY CERTIFICATE (Final Screen) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        id="section-4-identity-certificate"
      >
        <IdentityCertificateView
          fullName={fullName}
          hijriInfo={hijriInfo}
          insight={insight}
          isDark={isDark}
        />
      </motion.div>
    </div>
  );
}
