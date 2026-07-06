import { HijriDateInfo } from "../types";

// Islamic months transliterations and Arabic names
export const ISLAMIC_MONTHS = [
  { index: 1, en: "Muharram", ar: "محرم" },
  { index: 2, en: "Safar", ar: "صفر" },
  { index: 3, en: "Rabi' al-Awwal", ar: "ربيع الأول" },
  { index: 4, en: "Rabi' al-Thani", ar: "ربيع الثاني" },
  { index: 5, en: "Jumada al-Awwal", ar: "جمادى الأولى" },
  { index: 6, en: "Jumada al-Thani", ar: "جمادى الآخرة" },
  { index: 7, en: "Rajab", ar: "رجب" },
  { index: 8, en: "Sha'ban", ar: "شعبان" },
  { index: 9, en: "Ramadan", ar: "رمضان" },
  { index: 10, en: "Shawwal", ar: "شوال" },
  { index: 11, en: "Dhu al-Qa'dah", ar: "ذو القعدة" },
  { index: 12, en: "Dhu al-Hijjah", ar: "ذو الحجة" },
];

// Days of the week in English and Arabic
export const DAYS_OF_WEEK = [
  { index: 0, en: "Sunday", ar: "الأحد" },
  { index: 1, en: "Monday", ar: "الإثنين" },
  { index: 2, en: "Tuesday", ar: "الثلاثاء" },
  { index: 3, en: "Wednesday", ar: "الأربعاء" },
  { index: 4, en: "Thursday", ar: "الخميس" },
  { index: 5, en: "Friday", ar: "الجمعة" },
  { index: 6, en: "Saturday", ar: "السبت" },
];

/**
 * Convert Gregorian date to Julian Day Number (JDN)
 */
export function gcalToJD(year: number, month: number, day: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = Math.floor(A / 4);
  const C = 2 - A + B;
  const E = Math.floor(365.25 * (y + 4716));
  const F = Math.floor(30.6001 * (m + 1));
  return C + day + E + F - 1524.5;
}

/**
 * Convert Julian Day to Gregorian date
 */
export function jdToGcal(jd: number): { year: number; month: number; day: number } {
  const z = Math.floor(jd + 0.5);
  const f = (jd + 0.5) - z;
  let A = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    A = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);
  const day = Math.floor(B - D - Math.floor(30.6001 * E) + f);
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;
  return { year, month, day };
}

/**
 * High precision conversion of Julian Day to Hijri (Islamic) date
 * Supports multiple calculation methods by adjusting the epoch/leap-cycle
 */
export function jdToHijri(
  jd: number,
  method: "tabular_civil" | "tabular_astronomical" = "tabular_civil",
  offsetDays: number = 0
): {
  day: number;
  month: number;
  year: number;
  dayOfWeekIndex: number;
} {
  // Epoch JDN for Tabular Civil is 1948439.5 (Friday, 16 July 622 CE)
  // Epoch JDN for Tabular Astronomical is 1948438.5 (Thursday, 15 July 622 CE)
  const epoch = method === "tabular_civil" ? 1948439.5 : 1948438.5;
  
  const julianDay = jd + offsetDays + 0.5;
  const dayOfWeekIndex = Math.floor(julianDay + 1.5) % 7;
  
  const daysSinceEpoch = Math.floor(julianDay - epoch);
  
  // 30-year cycle has 10631 days (30 * 354 + 11 leap days)
  const cycleCount = Math.floor(daysSinceEpoch / 10631);
  let remainingDays = daysSinceEpoch % 10631;
  
  if (remainingDays < 0) {
    remainingDays += 10631;
  }
  
  // Leap years in 30-year cycle: 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29
  const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
  
  let yearInCycle = 0;
  let daysAccumulated = 0;
  
  for (let y = 1; y <= 30; y++) {
    const isLeap = leapYears.includes(y);
    const daysInYear = isLeap ? 355 : 354;
    if (remainingDays < daysAccumulated + daysInYear) {
      yearInCycle = y;
      remainingDays -= daysAccumulated;
      break;
    }
    daysAccumulated += daysInYear;
  }
  
  const hYear = cycleCount * 30 + yearInCycle;
  
  let hMonth = 0;
  let hDay = 0;
  let monthDaysAccumulated = 0;
  
  const isLeapYear = leapYears.includes(yearInCycle);
  
  for (let m = 1; m <= 12; m++) {
    let daysInMonth = (m % 2 === 1) ? 30 : 29;
    if (m === 12 && isLeapYear) {
      daysInMonth = 30;
    }
    
    if (remainingDays < monthDaysAccumulated + daysInMonth) {
      hMonth = m;
      hDay = Math.floor(remainingDays - monthDaysAccumulated) + 1;
      break;
    }
    monthDaysAccumulated += daysInMonth;
  }
  
  return {
    day: hDay,
    month: hMonth,
    year: hYear,
    dayOfWeekIndex
  };
}

/**
 * Calculates completed years (age) between two dates
 */
export function calculateAge(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  currentYear: number,
  currentMonth: number,
  currentDay: number
): number {
  let age = currentYear - birthYear;
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }
  return age;
}

/**
 * Converts a Gregorian date of birth to complete HijriDateInfo
 */
export function convertGregorianToHijri(
  gregorianDateString: string,
  method: "tabular_civil" | "tabular_astronomical" = "tabular_civil",
  offsetDays: number = 0,
  referenceDate: Date = new Date()
): HijriDateInfo {
  const parts = gregorianDateString.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  const birthJD = gcalToJD(year, month, day);
  const converted = jdToHijri(birthJD, method, offsetDays);
  
  const monthInfo = ISLAMIC_MONTHS[converted.month - 1];
  const dayInfo = DAYS_OF_WEEK[converted.dayOfWeekIndex];
  
  const monthNameEn = monthInfo ? monthInfo.en : "Unknown";
  const monthNameAr = monthInfo ? monthInfo.ar : "غير معروف";
  const dayOfWeek = dayInfo ? dayInfo.en : "Unknown";
  const dayOfWeekAr = dayInfo ? dayInfo.ar : "غير معروف";
  
  // Format standard date string
  const hijriDateString = `${converted.day} ${monthNameEn} ${converted.year} AH`;

  // Calculate today's JDN to find current age
  const todayYear = referenceDate.getFullYear();
  const todayMonth = referenceDate.getMonth() + 1;
  const todayDay = referenceDate.getDate();
  
  const currentJD = gcalToJD(todayYear, todayMonth, todayDay);
  const currentHijri = jdToHijri(currentJD, method, offsetDays);

  const ageGregorian = calculateAge(year, month, day, todayYear, todayMonth, todayDay);
  const ageHijri = calculateAge(
    converted.year,
    converted.month,
    converted.day,
    currentHijri.year,
    currentHijri.month,
    currentHijri.day
  );

  const methodNameLabel = method === "tabular_civil" 
    ? "Tabular Islamic Calendar (Civil Epoch - Friday, July 16, 622 CE)"
    : "Tabular Islamic Calendar (Astronomical Epoch - Thursday, July 15, 622 CE)";

  return {
    gregorianDate: gregorianDateString,
    hijriDateString,
    day: converted.day,
    month: converted.month,
    monthNameEn,
    monthNameAr,
    year: converted.year,
    dayOfWeek,
    dayOfWeekAr,
    ageGregorian,
    ageHijri,
    calculationMethod: methodNameLabel,
    offsetDays
  };
}

/**
 * Converts a Hijri (Islamic) date of birth to complete HijriDateInfo by mapping to Gregorian
 */
export function convertHijriToGregorian(
  hYear: number,
  hMonth: number,
  hDay: number,
  method: "tabular_civil" | "tabular_astronomical" = "tabular_civil",
  offsetDays: number = 0,
  referenceDate: Date = new Date()
): HijriDateInfo {
  const epoch = method === "tabular_civil" ? 1948439.5 : 1948438.5;
  const cycleCount = Math.floor((hYear - 1) / 30);
  const yearInCycle = ((hYear - 1) % 30) + 1;
  
  let days = cycleCount * 10631;
  const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
  
  for (let y = 1; y < yearInCycle; y++) {
    days += leapYears.includes(y) ? 355 : 354;
  }
  
  const isLeapYear = leapYears.includes(yearInCycle);
  for (let m = 1; m < hMonth; m++) {
    let daysInMonth = (m % 2 === 1) ? 30 : 29;
    if (m === 12 && isLeapYear) {
      daysInMonth = 30;
    }
    days += daysInMonth;
  }
  
  days += (hDay - 1);
  
  // Calculate Julian Day with offset adjustment removed
  const jd = days + epoch - offsetDays;
  
  // Convert JDN to Gregorian calendar parts
  const gDate = jdToGcal(jd);
  
  // Ensure components are padded for YYYY-MM-DD
  const pad = (n: number) => n.toString().padStart(2, "0");
  const gregorianDateString = `${gDate.year}-${pad(gDate.month)}-${pad(gDate.day)}`;
  
  return convertGregorianToHijri(gregorianDateString, method, offsetDays, referenceDate);
}

