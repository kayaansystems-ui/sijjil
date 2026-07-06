import React from "react";
import { motion } from "motion/react";
import { X, Sparkles, BookOpen, UserCheck, Milestone, Compass } from "lucide-react";

interface FullScreenInsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  isDark: boolean;
  children: React.ReactNode;
}

export default function FullScreenInsightModal({
  isOpen,
  onClose,
  title,
  icon,
  isDark,
  children,
}: FullScreenInsightModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="fullscreen-insight-modal">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#030712]/80 backdrop-blur-lg cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className={`relative w-full max-w-lg rounded-3xl border overflow-hidden shadow-2xl flex flex-col max-h-[85vh] z-10 ${
          isDark
            ? "bg-slate-900/90 border-slate-800 shadow-slate-950/50"
            : "bg-white border-stone-200 shadow-stone-200/50"
        }`}
      >
        {/* Subtle geometric pattern in modal background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="modal-geom" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#modal-geom)" className={isDark ? "text-amber-500" : "text-stone-900"} />
          </svg>
        </div>

        {/* Modal Header */}
        <div className="p-6 border-b border-amber-500/10 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              {icon}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Certified Insight</span>
              <h3 className="font-serif text-lg font-bold text-amber-500">{title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isDark
                ? "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-amber-400"
                : "bg-stone-50 border-stone-200 text-slate-600 hover:text-amber-600"
            }`}
            id="modal-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto relative z-10 space-y-4">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-amber-500/10 flex items-center justify-between relative z-10 bg-amber-500/[0.02]">
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase font-semibold">
            <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} /> Lexical Grounding Verified
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase tracking-wider rounded-xl text-[10px] transition-all cursor-pointer"
            id="modal-footer-close"
          >
            Acknowledge
          </button>
        </div>
      </motion.div>
    </div>
  );
}
