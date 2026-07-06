import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, CalendarDays, MoonStar } from "lucide-react";

export default function IdentityRevealLoader({ isDark }: { isDark: boolean }) {
  const [timelineStep, setTimelineStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setTimelineStep(1), 1000);
    const timer2 = setTimeout(() => setTimelineStep(2), 2200);
    const timer3 = setTimeout(() => setTimelineStep(3), 3400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center ${
        isDark ? "bg-stone-950" : "bg-ivory"
      }`}
      id="reveal-identity-loader"
    >
      {/* Background Subtle Ambient Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>

      {/* Subtle background calligraphy stroke fade-in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute select-none pointer-events-none flex items-center justify-center"
      >
        <span className="font-arabic text-[12rem] md:text-[20rem] text-emerald-accent dark:text-emerald-glow font-extrabold leading-none">
          الهوية
        </span>
      </motion.div>

      {/* Floating Animated Calligraphy Stroke */}
      <div className="relative mb-12">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center relative shadow-lg shadow-emerald-500/5"
        >
          <Compass className="w-10 h-10 text-emerald-accent dark:text-emerald-glow animate-pulse" />
          {/* Pulsing Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-60"></div>
        </motion.div>
      </div>

      {/* Interactive Timeline Line Drawing Animation (Gregorian -> Hijri) */}
      <div className="w-full max-w-sm px-6 relative mb-10">
        <div className="h-[2px] w-full bg-slate-800 relative rounded-full overflow-hidden">
          {/* Animated drawing golden line */}
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          ></motion.div>
        </div>

        {/* Timeline Milestones */}
        <div className="grid grid-cols-3 mt-4 text-center text-xs relative">
          {/* Gregorian Milestone */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{
                scale: timelineStep >= 0 ? 1.1 : 0.8,
                opacity: timelineStep >= 0 ? 1 : 0.3,
              }}
              transition={{ duration: 0.5 }}
              className={`p-2 rounded-lg ${timelineStep >= 0 ? "bg-emerald-500/10 text-emerald-accent dark:text-emerald-glow" : "bg-transparent text-slate-500"}`}
            >
              <CalendarDays className="w-4 h-4" />
            </motion.div>
            <span className={`mt-2 font-mono text-[10px] font-bold ${timelineStep >= 0 ? "text-emerald-accent dark:text-emerald-glow" : "text-slate-500"}`}>
              Gregorian
            </span>
          </div>

          {/* Celestial Alignment */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{
                scale: timelineStep >= 1 ? 1.1 : 0.8,
                opacity: timelineStep >= 1 ? 1 : 0.3,
              }}
              transition={{ duration: 0.5 }}
              className={`p-2 rounded-lg ${timelineStep >= 1 ? "bg-emerald-500/10 text-emerald-accent dark:text-emerald-glow" : "bg-transparent text-slate-500"}`}
            >
              <Compass className="w-4 h-4" />
            </motion.div>
            <span className={`mt-2 font-mono text-[10px] font-bold ${timelineStep >= 1 ? "text-emerald-accent dark:text-emerald-glow" : "text-slate-500"}`}>
              Alignment
            </span>
          </div>

          {/* Hijri Milestone */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{
                scale: timelineStep >= 2 ? 1.1 : 0.8,
                opacity: timelineStep >= 2 ? 1 : 0.3,
              }}
              transition={{ duration: 0.5 }}
              className={`p-2 rounded-lg ${timelineStep >= 2 ? "bg-emerald-500/10 text-emerald-accent dark:text-emerald-glow" : "bg-transparent text-slate-500"}`}
            >
              <MoonStar className="w-4 h-4" />
            </motion.div>
            <span className={`mt-2 font-mono text-[10px] font-bold ${timelineStep >= 2 ? "text-emerald-accent dark:text-emerald-glow" : "text-slate-500"}`}>
              Hijri Profile
            </span>
          </div>
        </div>
      </div>

      {/* Descriptive loading message with text fades */}
      <div className="h-16 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {timelineStep === 0 && (
            <motion.p
              key="step0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-serif font-medium tracking-wider text-slate-400"
            >
              Aligning lunar orbit trajectories...
            </motion.p>
          )}
          {timelineStep === 1 && (
            <motion.p
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-serif font-medium tracking-wider text-emerald-accent/90 dark:text-emerald-glow/90"
            >
              Extracting root etymologies from classical lexicons...
            </motion.p>
          )}
          {timelineStep >= 2 && (
            <motion.p
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-serif font-medium tracking-wider text-emerald-accent dark:text-emerald-glow font-bold"
            >
              Your spiritual identity is being revealed...
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
