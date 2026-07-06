import React, { useRef } from "react";
import { motion } from "motion/react";
import { Download, Printer, Compass, Award, ShieldAlert, BadgeCheck } from "lucide-react";
import { HijriDateInfo, NameInsight } from "../types";

interface IdentityCertificateViewProps {
  fullName: string;
  hijriInfo: HijriDateInfo;
  insight: NameInsight | null;
  isDark: boolean;
}

export default function IdentityCertificateView({
  fullName,
  hijriInfo,
  insight,
  isDark,
}: IdentityCertificateViewProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSVG = () => {
    if (!insight) return;

    const arabicCalligraphy = insight.arabicCalligraphy || "بِسْمِ اللَّهِ";
    const meaning = insight.meaning || "Noble and blessed";
    const root = insight.rootLetters || "N/A";
    const origin = insight.origin || "Arabic";

    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="800" height="1200">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&amp;family=Inter:wght@400;600;700&amp;family=Amiri:wght@700&amp;display=swap');
      .title { font-family: 'Cinzel', serif; font-weight: 800; fill: #059669; }
      .subtitle { font-family: 'Inter', sans-serif; font-size: 14px; letter-spacing: 4px; fill: #94a3b8; text-transform: uppercase; }
      .arabic { font-family: 'Amiri', serif; font-size: 54px; fill: #10b981; text-anchor: middle; }
      .name-en { font-family: 'Cinzel', serif; font-size: 28px; fill: #f8fafc; font-weight: 600; text-anchor: middle; }
      .label { font-family: 'Inter', sans-serif; font-size: 11px; fill: #64748b; letter-spacing: 1.5px; text-transform: uppercase; }
      .value { font-family: 'Inter', sans-serif; font-size: 15px; fill: #f1f5f9; font-weight: 600; }
      .value-gold { font-family: 'Inter', sans-serif; font-size: 16px; fill: #10b981; font-weight: 700; }
      .value-serif { font-family: 'Cinzel', serif; font-size: 18px; fill: #10b981; font-weight: 600; }
      .border-line { stroke: #059669; stroke-width: 1.5; opacity: 0.4; }
      .border-outer { stroke: #059669; stroke-width: 4; fill: none; }
      .accent-star { fill: #059669; opacity: 0.6; }
    </style>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1917" />
      <stop offset="50%" stop-color="#0c0a09" />
      <stop offset="100%" stop-color="#1c1917" />
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="1200" fill="url(#cardGrad)" rx="24" />

  <!-- Geometric Outer Border -->
  <rect x="25" y="25" width="750" height="1150" rx="16" class="border-outer" />
  <rect x="35" y="35" width="730" height="1130" rx="12" stroke="#059669" stroke-width="1" fill="none" opacity="0.2" />

  <!-- Corner Geometric Motifs (Rub el Hizb stars) -->
  <g transform="translate(60, 60)">
    <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#059669" stroke-width="2" transform="rotate(0)" />
    <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#059669" stroke-width="2" transform="rotate(45)" />
    <circle r="4" fill="#10b981" />
  </g>
  <g transform="translate(740, 60)">
    <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#059669" stroke-width="2" transform="rotate(0)" />
    <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#059669" stroke-width="2" transform="rotate(45)" />
    <circle r="4" fill="#10b981" />
  </g>
  <g transform="translate(60, 1140)">
    <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#059669" stroke-width="2" transform="rotate(0)" />
    <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#059669" stroke-width="2" transform="rotate(45)" />
    <circle r="4" fill="#10b981" />
  </g>
  <g transform="translate(740, 1140)">
    <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#059669" stroke-width="2" transform="rotate(0)" />
    <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#059669" stroke-width="2" transform="rotate(45)" />
    <circle r="4" fill="#10b981" />
  </g>

  <!-- Header -->
  <text x="400" y="105" text-anchor="middle" class="title" font-size="22" letter-spacing="6">HIJRI IDENTITY CARD</text>
  <text x="400" y="130" text-anchor="middle" class="subtitle">سجل الهوية الإسلامية</text>

  <!-- Decorative Islamic Arched Gate -->
  <path d="M 120 400 L 120 300 C 120 180, 200 150, 400 150 C 600 150, 680 180, 680 300 L 680 400" fill="none" stroke="#059669" stroke-width="1.5" opacity="0.3" />

  <!-- Arabic Calligraphy Name Rendering -->
  <text x="400" y="270" class="arabic">${arabicCalligraphy}</text>

  <!-- English Name -->
  <text x="400" y="340" class="name-en">${fullName}</text>
  <text x="400" y="370" text-anchor="middle" fill="#a1a1aa" font-family="'Inter', sans-serif" font-size="14" font-style="italic">"${insight.pronunciation}"</text>

  <!-- Divider -->
  <g transform="translate(400, 410)">
    <line x1="-200" y1="0" x2="200" y2="0" class="border-line" />
    <rect x="-10" y="-10" width="20" height="20" fill="#0c0a09" stroke="#059669" stroke-width="1.5" transform="rotate(45)" />
    <circle r="3" fill="#10b981" />
  </g>

  <!-- Row 1: Meaning & Origin -->
  <g transform="translate(100, 460)">
    <text x="0" y="0" class="label">Primary Meaning</text>
    <text x="0" y="25" class="value" font-size="16">${meaning.length > 55 ? meaning.substring(0, 52) + "..." : meaning}</text>
  </g>
  <g transform="translate(480, 460)">
    <text x="0" y="0" class="label">Linguistic Origin</text>
    <text x="0" y="25" class="value-gold">${origin}</text>
  </g>

  <!-- Divider -->
  <line x1="100" y1="520" x2="700" y2="520" class="border-line" />

  <!-- Row 2 -->
  <g transform="translate(100, 550)">
    <text x="0" y="0" class="label">Arabic Root Letters</text>
    <text x="0" y="25" class="value-serif" font-size="22">${root}</text>
  </g>
  <g transform="translate(480, 550)">
    <text x="0" y="0" class="label">Linguistic Status</text>
    <text x="0" y="25" class="value">✓ Verified Authentic</text>
  </g>

  <!-- Divider -->
  <line x1="100" y1="610" x2="700" y2="610" class="border-line" />

  <!-- Row 3 -->
  <g transform="translate(100, 640)">
    <text x="0" y="0" class="label">Islamic Date of Birth (Hijri)</text>
    <text x="0" y="28" class="value-gold" font-size="20">${hijriInfo.hijriDateString}</text>
    <text x="0" y="50" fill="#a1a1aa" font-family="'Inter', sans-serif" font-size="13">${hijriInfo.dayOfWeek} (يوم ${hijriInfo.dayOfWeekAr})</text>
  </g>
  <g transform="translate(480, 640)">
    <text x="0" y="0" class="label">Islamic Month</text>
    <text x="0" y="28" class="value-serif" font-size="20">${hijriInfo.monthNameEn} (${hijriInfo.monthNameAr})</text>
  </g>

  <!-- Divider -->
  <line x1="100" y1="720" x2="700" y2="720" class="border-line" />

  <!-- Row 4 -->
  <g transform="translate(100, 750)">
    <text x="0" y="0" class="label">Gregorian Date of Birth</text>
    <text x="0" y="25" class="value">${hijriInfo.gregorianDate}</text>
  </g>
  <g transform="translate(480, 750)">
    <text x="0" y="0" class="label">Calculated Lunar Age</text>
    <text x="0" y="25" class="value-gold" font-size="18">${hijriInfo.ageHijri} Lunar Years</text>
  </g>

  <!-- Seal -->
  <g transform="translate(400, 990)">
    <path d="M 0,-40 L 11,-11 L 40,0 L 11,11 L 0,40 L -11,11 L -40,0 L -11,-11 Z" fill="none" stroke="#059669" stroke-width="1.5" />
    <circle r="4" fill="#10b981" />
  </g>

  <text x="400" y="1080" text-anchor="middle" font-family="'Cinzel', serif" font-size="12" fill="#059669" letter-spacing="4">HIJRI IDENTITY APPLET</text>
</svg>
`;

    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SijillCertificate-${fullName.replace(/\s+/g, "-")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!insight) return null;

  return (
    <div className="w-full relative mt-8 no-print" id="identity-certificate-section">
      {/* Decorative Border Wrapper */}
      <div
        ref={certificateRef}
        className={`relative overflow-hidden rounded-3xl border-4 p-8 md:p-12 text-center transition-all ${
          isDark
            ? "bg-stone-900 border-emerald-500/20 shadow-2xl shadow-stone-950"
            : "bg-white border-emerald-600/20 shadow-xl shadow-stone-200"
        }`}
      >
        {/* Fine emerald internal border */}
        <div className="absolute inset-2 border border-emerald-500/10 pointer-events-none rounded-2xl"></div>

        {/* Traditional Islamic arch overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
            <path
              d="M 50,600 L 50,200 C 50,100, 100,70, 200,70 C 300,70, 350,100, 350,200 L 350,600"
              fill="none"
              stroke="#059669"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Certificate Header */}
        <div className="space-y-2 mb-8 relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 block">
            Official Birth Scroll
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-emerald-accent dark:text-emerald-glow tracking-widest">
            SIJILL REGISTRATION CERTIFICATE
          </h2>
          <span className="text-[9px] font-mono text-slate-400 block">
            سند تسجيل الولادة • REGISTRY NO. {1400000 + (hijriInfo.year * 12) + hijriInfo.day}
          </span>
          <div className="w-16 h-[1px] bg-emerald-500/30 mx-auto mt-4"></div>
        </div>

        {/* Dynamic Text Statement */}
        <div className="max-w-xl mx-auto space-y-6 relative z-10 text-slate-700 dark:text-slate-300 leading-relaxed font-serif text-sm">
          <p>
            This document certifies that the individual bearing the honored name of{" "}
            <span className="font-sans font-extrabold text-emerald-accent dark:text-emerald-glow text-lg block my-1">
              {fullName}
            </span>
            pronounced as <span className="italic font-medium text-emerald-accent dark:text-emerald-glow">"{insight.pronunciation}"</span>, of{" "}
            <span className="font-bold text-emerald-accent dark:text-emerald-glow">{insight.origin}</span> origin, meaning{" "}
            <span className="italic font-sans text-slate-500 dark:text-slate-400 font-medium block my-2 p-2 rounded bg-emerald-500/5 border border-emerald-500/10">
              "{insight.meaning}"
            </span>
          </p>

          <p>
            Was ushered into this earthly domain on the solar Gregorian date of{" "}
            <span className="font-mono font-bold text-emerald-accent dark:text-emerald-glow">{hijriInfo.gregorianDate}</span>, coordinating
            astronomically to the holy lunar milestone of:
          </p>

          {/* Huge Date Core */}
          <div className="py-6 border-y border-emerald-500/15 max-w-sm mx-auto space-y-2">
            <span className="font-arabic text-4xl text-emerald-accent dark:text-emerald-glow font-extrabold block" dir="rtl">
              {insight.arabicCalligraphy}
            </span>
            <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-emerald-accent dark:text-emerald-glow block">
              {hijriInfo.hijriDateString}
            </span>
            <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider block">
              {hijriInfo.dayOfWeek} (يوم {hijriInfo.dayOfWeekAr})
            </span>
          </div>

          <p className="text-xs font-sans text-slate-400 dark:text-slate-400 leading-relaxed pt-2">
            This entry maps directly to the historical epoch using the{" "}
            <span className="font-mono text-emerald-accent dark:text-emerald-glow font-bold">{hijriInfo.calculationMethod}</span> framework. Sighting verified with an adjustment offset of {hijriInfo.offsetDays} days.
          </p>
        </div>

        {/* Seals and signatures */}
        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto mt-10 pt-6 border-t border-emerald-500/10 relative z-10">
          <div className="text-left space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">Verification Authority</span>
            <div className="flex items-center gap-1 text-xs text-emerald-500 font-bold">
              <BadgeCheck className="w-4 h-4 shrink-0" />
              <span>Sijill Academic Core</span>
            </div>
          </div>
          <div className="text-right space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">Status</span>
            <span className="text-xs text-emerald-accent dark:text-emerald-glow font-bold uppercase font-mono tracking-widest">
              ✓ SECURE REGISTERED
            </span>
          </div>
        </div>

        {/* Floating actions strictly anchored bottom */}
        <div className="mt-10 flex items-center justify-center gap-4 border-t border-slate-800/10 dark:border-slate-800/40 pt-6 relative z-10">
          <button
            onClick={handlePrint}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
              isDark
                ? "bg-stone-900 border-stone-800 text-slate-350 hover:bg-stone-800"
                : "bg-white border-stone-200 text-slate-700 hover:bg-stone-50"
            }`}
            id="cert-btn-print"
          >
            <Printer className="w-4 h-4 text-emerald-accent dark:text-emerald-glow" />
            <span>Print Scroll</span>
          </button>

          <button
            onClick={handleDownloadSVG}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md ${
              isDark
                ? "bg-warm-white text-ink hover:bg-white/95"
                : "bg-ink text-white hover:bg-black/95"
            }`}
            id="cert-btn-svg"
          >
            <Download className="w-4 h-4" />
            <span>Export Certificate SVG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
