import React, { useState } from "react";
import { BookOpen, Star, Award, ShieldCheck, Compass, Sparkles } from "lucide-react";
import { NameInsight } from "../types";
import FullScreenInsightModal from "./FullScreenInsightModal";

interface InsightCardStackProps {
  insight: NameInsight | null;
  isDark: boolean;
  isLoading: boolean;
}

export default function InsightCardStack({ insight, isDark, isLoading }: InsightCardStackProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center" id="insight-stack-loading">
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border border-emerald-accent border-t-transparent animate-spin"></div>
        </div>
        <p className="text-xs font-semibold text-slate-400 font-mono animate-pulse">
          Translating ancient scrolls and lexicons...
        </p>
      </div>
    );
  }

  if (!insight) return null;

  const cards = [
    {
      id: "linguistics",
      title: "Linguistics & Semitic Root",
      description: insight.meaning,
      origin: insight.origin,
      root: insight.rootLetters,
      badge: "Etymology",
      icon: <BookOpen className="w-5 h-5 text-emerald-accent dark:text-emerald-glow" />,
      content: (
        <div className="space-y-4 text-sm leading-relaxed">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Core Meaning</span>
            <p className="text-stone-850 dark:text-stone-100 font-serif text-base mt-1">{insight.meaning}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-emerald-500/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Linguistic Origin</span>
              <span className="font-semibold text-emerald-accent dark:text-emerald-glow">{insight.origin}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Root Letters</span>
              <span className="font-serif font-bold text-emerald-accent dark:text-emerald-glow tracking-wider">{insight.rootLetters || "Non-Arabic Root"}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Etymological History</span>
            <p className="text-slate-400 mt-1">{insight.etymology}</p>
          </div>
        </div>
      ),
    },
    {
      id: "quran",
      title: "Qur'an & Hadith Mentions",
      description: insight.quranticMentions && insight.quranticMentions.length > 0 
        ? `Found in Surah ${insight.quranticMentions[0].surah}.`
        : "Linguistically verified Islamic historical profile.",
      badge: "Sacred Texts",
      icon: <Star className="w-5 h-5 text-emerald-accent dark:text-emerald-glow" />,
      content: (
        <div className="space-y-5 text-sm">
          {insight.quranticMentions && insight.quranticMentions.length > 0 ? (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Qur'anic Grounding</span>
              <div className="space-y-4">
                {insight.quranticMentions.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-900/30 border border-stone-800">
                    <div className="text-xs font-semibold text-emerald-accent dark:text-emerald-glow mb-2">
                      {q.surah} ({q.surahNumber}:{q.ayahNumber})
                    </div>
                    <div className="text-right text-xl font-bold font-arabic text-emerald-accent dark:text-emerald-glow mb-2 leading-relaxed" dir="rtl">
                      {q.arabicText}
                    </div>
                    <p className="italic text-slate-300">"{q.translation}"</p>
                    <p className="text-[11px] text-slate-500 mt-2">
                      <strong className="text-slate-400">Context:</strong> {q.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center">
              <p className="text-xs text-slate-400">
                No direct mentions in the Holy Qur'an. This is common for many elegant historical Muslim names that were adopted culturally.
              </p>
            </div>
          )}

          {insight.hadithReferences && insight.hadithReferences.length > 0 && (
            <div className="pt-4 border-t border-emerald-500/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Hadith References</span>
              <div className="space-y-3">
                {insight.hadithReferences.map((h, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-900/30 border border-stone-800 text-xs">
                    <span className="font-bold text-emerald-accent dark:text-emerald-glow block mb-1">{h.collection} • No. {h.hadithNumber}</span>
                    <p className="text-slate-300 italic mb-2">"{h.englishText}"</p>
                    <p className="text-slate-500"><strong className="text-slate-400">Relevance:</strong> {h.relevance}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "figures",
      title: "Honored Historical Models",
      description: insight.notableFigures && insight.notableFigures.length > 0
        ? `Inspired by heroes like ${insight.notableFigures[0].name}.`
        : "Traditional Islamic heritage registry.",
      badge: "Historical Bearers",
      icon: <Award className="w-5 h-5 text-emerald-accent dark:text-emerald-glow" />,
      content: (
        <div className="space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Sahaba, Theologians & Leaders</span>
          {insight.notableFigures && insight.notableFigures.length > 0 ? (
            <div className="space-y-3">
              {insight.notableFigures.map((fig, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-900/30 border border-stone-800">
                  <h5 className="font-serif font-bold text-emerald-accent dark:text-emerald-glow">{fig.name}</h5>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block mt-0.5">{fig.role}</span>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{fig.contribution}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center">
              <p className="text-xs text-slate-400">
                No major companions found with this exact phonetic match in central early records.
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "virtues",
      title: "Spiritual Virtues & Resonance",
      description: insight.virtues || "Moral attributes aligned with classic values.",
      badge: "Character Check",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-accent dark:text-emerald-glow" />,
      content: (
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Moral Attributes</span>
            <p className="text-sm text-slate-300 leading-relaxed mt-1">{insight.virtues}</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-accent dark:text-emerald-glow block mb-1">Academic Authentication</span>
            <p className="text-xs text-slate-400 leading-relaxed">{insight.authenticityNotes}</p>
          </div>
        </div>
      ),
    },
  ];

  const activeCard = cards.find((c) => c.id === selectedSection);

  return (
    <div className="w-full" id="insight-cards-stack-section">
      <div className="text-center md:text-left mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-accent dark:text-emerald-glow border border-emerald-500/20">
          <Sparkles className="w-3 h-3" /> SACRED LEXICAL DECREE
        </span>
        <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mt-3">
          Spiritual Lexicon Research
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Explore canonical meanings, historical bearers, and divine virtues. Tap any card to open in fullscreen focus mode.
        </p>
      </div>

      {/* Grid on Desktop, stacked column on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedSection(card.id)}
            className={`group relative overflow-hidden rounded-2xl border p-5 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.01] ${
              isDark
                ? "bg-stone-900/40 border-stone-850/80 hover:border-emerald-500/30 shadow-lg shadow-slate-950/20"
                : "bg-white border-stone-200/80 hover:border-emerald-500/30 shadow-md shadow-stone-200/20"
            }`}
            id={`insight-card-${card.id}`}
          >
            {/* Ambient gold glow on hover */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>

            <div className="flex items-start justify-between gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-accent dark:text-emerald-glow">
                {card.icon}
              </div>
              <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-accent dark:text-emerald-glow border border-emerald-500/15">
                {card.badge}
              </span>
            </div>

            <div className="mt-4">
              <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-accent dark:group-hover:text-emerald-glow transition-colors">
                {card.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {card.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-500/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-accent dark:group-hover:text-emerald-glow transition-colors">
              <span>View Full Insight</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Render the full-screen modal */}
      {activeCard && (
        <FullScreenInsightModal
          isOpen={!!selectedSection}
          onClose={() => setSelectedSection(null)}
          title={activeCard.title}
          icon={activeCard.icon}
          isDark={isDark}
        >
          {activeCard.content}
        </FullScreenInsightModal>
      )}
    </div>
  );
}
