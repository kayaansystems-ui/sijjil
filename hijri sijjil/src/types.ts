/**
 * Types and interfaces for the Hijri Identity application.
 */

export interface HijriDateInfo {
  gregorianDate: string; // ISO format (YYYY-MM-DD)
  hijriDateString: string; // e.g. "15 Ramadan 1415 AH"
  day: number;
  month: number;
  monthNameEn: string;
  monthNameAr: string;
  year: number;
  dayOfWeek: string;
  dayOfWeekAr: string;
  ageGregorian: number;
  ageHijri: number;
  calculationMethod: string;
  offsetDays: number;
}

export interface QuranticMention {
  surah: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  translation: string;
  context: string;
}

export interface HadithReference {
  collection: string; // e.g. "Sahih al-Bukhari"
  hadithNumber: string;
  arabicText?: string;
  englishText: string;
  relevance: string;
}

export interface NameInsight {
  name: string;
  arabicCalligraphy: string; // Beautiful Arabic script
  meaning: string;
  origin: string; // Linguistic origin (e.g., Arabic, Persian, etc.)
  rootLetters?: string; // e.g., "H-M-D"
  pronunciation: string;
  etymology: string;
  quranticMentions: QuranticMention[];
  hadithReferences: HadithReference[];
  notableFigures: {
    name: string;
    role: string; // e.g., "Companion of the Prophet", "Islamic Scholar"
    contribution: string;
  }[];
  virtues: string;
  isAuthentic: boolean;
  authenticityNotes?: string;
}
