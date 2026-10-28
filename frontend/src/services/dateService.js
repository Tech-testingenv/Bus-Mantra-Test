const pad = (n) => String(n).padStart(2, "0");

export function getTodayISODate() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/**
 * Safely parse date components from various supported formats:
 * - "YYYY-MM-DD"
 * - "DD-MM-YYYY"
 * - "DD-MM-YYYY | HH:MM AM/PM"
 * - "YYYY-MM-DD | HH:MM"
 *
 * @param {string} input - Date string
 * @returns {{ year: number, month: number, day: number } | null}
 */
export function parseDateComponents(input) {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Strip time segment if present after pipe or space
  const dateSegment = trimmed.split("|")[0].trim();

  // Pattern: YYYY-MM-DD
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateSegment)) {
    const [y, m, d] = dateSegment.split("-").map((n) => parseInt(n, 10));
    if (y && m && d) return { year: y, month: m, day: d };
  }

  // Pattern: DD-MM-YYYY
  if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(dateSegment)) {
    const [d, m, y] = dateSegment.split("-").map((n) => parseInt(n, 10));
    if (y && m && d) return { year: y, month: m, day: d };
  }

  // Pattern: DD/MM/YYYY
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateSegment)) {
    const [d, m, y] = dateSegment.split("/").map((n) => parseInt(n, 10));
    if (y && m && d) return { year: y, month: m, day: d };
  }

  return null;
}

/**
 * Convert any supported date string into ISO "YYYY-MM-DD" (for <input type="date">)
 *
 * @param {string} input
 * @returns {string} "YYYY-MM-DD" or empty string
 */
export function toISODateString(input) {
  const parsed = parseDateComponents(input);
  if (!parsed) return "";
  return `${parsed.year}-${pad(parsed.month)}-${pad(parsed.day)}`;
}

/**
 * Convert any supported date string into Indian display format "DD-MM-YYYY"
 *
 * @param {string} input
 * @returns {string} "DD-MM-YYYY" or empty string
 */
export function toDisplayDateString(input) {
  const parsed = parseDateComponents(input);
  if (!parsed) return "";
  return `${pad(parsed.day)}-${pad(parsed.month)}-${parsed.year}`;
}

/**
 * Extract time from a combined string (e.g. "30-09-2026 | 07:00 AM" or "14:30")
 * returns 24-hour "HH:MM" for HTML5 <input type="time">
 *
 * @param {string} input
 * @param {string} fallbackTime - default "07:00"
 * @returns {string} "HH:MM"
 */
export function toInputTime(input, fallbackTime = "07:00") {
  if (!input || typeof input !== "string") return fallbackTime;

  // Look for segment after pipe first
  const segments = input.split("|");
  const candidate = (segments[1] || segments[0]).trim();

  // Pattern: "07:00 AM" or "09:30 PM"
  const match12 = candidate.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (match12) {
    let hour = parseInt(match12[1], 10);
    const minute = match12[2];
    const period = match12[3].toUpperCase();

    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return `${pad(hour)}:${minute}`;
  }

  // Pattern: "14:30" (24h)
  const match24 = candidate.match(/(\d{1,2}):(\d{2})/);
  if (match24) {
    const hour = parseInt(match24[1], 10);
    const minute = match24[2];
    if (hour >= 0 && hour <= 23) {
      return `${pad(hour)}:${minute}`;
    }
  }

  return fallbackTime;
}

/**
 * Format a 24-hour "HH:MM" into readable 12-hour "hh:mm AM/PM"
 *
 * @param {string} time24 - e.g. "14:30" or "07:00"
 * @returns {string} e.g. "02:30 PM" or "07:00 AM"
 */
export function format12HourTime(time24) {
  if (!time24 || typeof time24 !== "string") return "07:00 AM";

  const parts = time24.trim().split(":");
  let hour = parseInt(parts[0], 10);
  const minute = parts[1] ? parts[1].slice(0, 2) : "00";

  if (isNaN(hour)) return "07:00 AM";

  const period = hour >= 12 ? "PM" : "AM";
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;

  return `${pad(hour)}:${pad(minute)} ${period}`;
}

/**
 * Combines date and time into the project's standard datetime string:
 * "DD-MM-YYYY | HH:MM AM/PM"
 *
 * @param {string} dateInput - YYYY-MM-DD or DD-MM-YYYY
 * @param {string} timeInput - 24h "HH:MM" or "07:00 AM"
 * @returns {string}
 */
export function combineDateTime(dateInput, timeInput) {
  const dateFormatted = toDisplayDateString(dateInput);
  if (!dateFormatted) return "";

  const timeFormatted = timeInput && timeInput.includes("M")
    ? timeInput.trim()
    : format12HourTime(timeInput || "07:00");

  return `${dateFormatted} | ${timeFormatted}`;
}

/**
 * Calculate calendar-day trip duration between departure and return dates.
 * Uses Date.UTC to guarantee no timezone or daylight saving errors.
 *
 * Rules:
 * - diff === 0 -> "Same Day Trip"
 * - diff === 1 -> "1 Day / 1 Night"
 * - diff > 1   -> `${diff} Days / ${diff} Nights`
 * - diff < 0   -> "Invalid date range"
 * - missing    -> "" (placeholder: "Select travel dates")
 *
 * @param {string} departureInput
 * @param {string} returnInput
 * @returns {{ text: string, diffDays: number | null, isSameDay: boolean, isInvalid: boolean, isMissing: boolean }}
 */
export function calculateTripDuration(departureInput, returnInput) {
  const dep = parseDateComponents(departureInput);
  const ret = parseDateComponents(returnInput);

  if (!dep || !ret) {
    return {
      text: "",
      diffDays: null,
      isSameDay: false,
      isInvalid: false,
      isMissing: true,
      placeholder: "Select travel dates",
    };
  }

  // Use Date.UTC to ensure exact calendar day calculation
  const depUtc = Date.UTC(dep.year, dep.month - 1, dep.day);
  const retUtc = Date.UTC(ret.year, ret.month - 1, ret.day);

  const diffMs = retUtc - depUtc;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      text: "Invalid date range",
      diffDays,
      isSameDay: false,
      isInvalid: true,
      isMissing: false,
      placeholder: "Select travel dates",
    };
  }

  if (diffDays === 0) {
    return {
      text: "Same Day Trip",
      diffDays: 0,
      isSameDay: true,
      isInvalid: false,
      isMissing: false,
      placeholder: "Select travel dates",
    };
  }

  if (diffDays === 1) {
    return {
      text: "1 Day / 1 Night",
      diffDays: 1,
      isSameDay: false,
      isInvalid: false,
      isMissing: false,
      placeholder: "Select travel dates",
    };
  }

  return {
    text: `${diffDays} Days / ${diffDays} Nights`,
    diffDays,
    isSameDay: false,
    isInvalid: false,
    isMissing: false,
    placeholder: "Select travel dates",
  };
}

/**
 * Returns true if return date is earlier than departure date
 *
 * @param {string} departureInput
 * @param {string} returnInput
 * @returns {boolean}
 */
export function isReturnBeforeDeparture(departureInput, returnInput) {
  const dep = parseDateComponents(departureInput);
  const ret = parseDateComponents(returnInput);
  if (!dep || !ret) return false;

  const depUtc = Date.UTC(dep.year, dep.month - 1, dep.day);
  const retUtc = Date.UTC(ret.year, ret.month - 1, ret.day);

  return retUtc < depUtc;
}
