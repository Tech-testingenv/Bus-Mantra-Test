"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  User,
  Phone,
  Mail,
  Users,
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Search,
  X,
} from "lucide-react";
import { heroData } from "@/data/data";

const FALLBACK_DESTINATION_OPTIONS = [
  "Jaipur",
  "Agra",
  "Delhi NCR",
  "Udaipur",
  "Manali",
  "Shimla",
  "Rishikesh",
  "Haridwar",
  "Goa",
  "Amritsar",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const HOUR_OPTIONS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const pad = (n) => String(n).padStart(2, "0");

// Helper to parse "DD-MM-YYYY | HH:MM AM/PM"
function parseDateTimeString(
  str,
  fallbackYear,
  fallbackMonth,
  fallbackDay,
  fallbackTime
) {
  if (!str) {
    return {
      day: fallbackDay,
      month: fallbackMonth,
      year: fallbackYear,
      time: fallbackTime,
    };
  }
  const parts = str.split("|").map((s) => s.trim());
  let day = fallbackDay;
  let month = fallbackMonth;
  let year = fallbackYear;
  let time = fallbackTime;

  if (parts[0]) {
    const dParts = parts[0].split("-");
    if (dParts.length === 3) {
      day = parseInt(dParts[0], 10) || fallbackDay;
      month = parseInt(dParts[1], 10) - 1;
      year = parseInt(dParts[2], 10) || fallbackYear;
    }
  }
  if (parts[1]) {
    time = parts[1];
  }
  return { day, month, year, time };
}

export default function BookingForm({ data = heroData?.form }) {
  const defaultValues = data?.defaultValues || {
    fullName: "",
    mobile: "",
    email: "",
    passengers: "",
    pickupPoint: "Delhi NCR",
    destination: "Jaipur",
    departureDateTime: "30-09-2026 | 07:00 AM",
    returnDateTime: "02-10-2026 | 09:00 PM",
  };

  const labels = data?.labels || {
    fullName: "FULL NAME",
    mobile: "MOBILE NUMBER",
    email: "EMAIL ADDRESS",
    passengers: "NO. OF PASSENGERS",
    pickupPoint: "PICK-UP POINT",
    destination: "DESTINATION",
    departureDateTime: "DEPARTURE DATE & TIME",
    returnDateTime: "RETURN DATE & TIME",
  };

  const placeholders = data?.placeholders || {
    fullName: "e.g. Rahul Sharma",
    mobile: "+91 XXXXX XXXXX",
    email: "eg@example.com",
    passengers: "20",
    pickupPoint: "e.g. Delhi NCR",
    destination: "e.g. Jaipur",
    departureDateTime: "30-09-2026 | 07:00 AM",
    returnDateTime: "02-10-2026 | 09:00 PM",
  };

  const submitButton = data?.submitButton || {
    idleLabel: "Find Buses",
    successLabel: "Buses Found!",
  };

  const routeSummary = data?.routeSummary || {
    badge: "FULL COACH",
    label: "Selected Itinerary:",
    subtext: "Full Luxury Coach · Entire Bus Reserved",
  };

  const destinationOptions = data?.destinationOptions || FALLBACK_DESTINATION_OPTIONS;

  const [formValues, setFormValues] = useState(defaultValues);

  const [isDestOpen, setIsDestOpen] = useState(false);
  const [destSearch, setDestSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const destRef = useRef(null);

  // Active Picker State: 'departure' | 'return' | null
  const [activePicker, setActivePicker] = useState(null);
  // Picker Step: 'date' | 'time'
  const [pickerStep, setPickerStep] = useState("date");

  // Calendar State
  const [calMonth, setCalMonth] = useState(8); // September (0-indexed)
  const [calYear, setCalYear] = useState(2026);
  const [draftDate, setDraftDate] = useState("30-09-2026");

  // Custom Time Selection State (Hour, Minute, Period)
  const [customHour, setCustomHour] = useState("07");
  const [customMinute, setCustomMinute] = useState("00");
  const [customPeriod, setCustomPeriod] = useState("AM");

  const pickerRef = useRef(null);

  const handleChange = useCallback((field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Validation: Check if minute value is valid (00 to 59 or empty which defaults to 00)
  const isMinuteValid = (() => {
    if (customMinute === "") return true;
    if (!/^\d+$/.test(customMinute)) return false;
    const num = parseInt(customMinute, 10);
    return num >= 0 && num <= 59;
  })();

  // Helper to format minute with leading zero and fallback to "00"
  const getNormalizedMinute = useCallback(() => {
    if (customMinute === "") return "00";
    const num = parseInt(customMinute, 10);
    if (isNaN(num) || num < 0 || num > 59) return "00";
    return pad(num);
  }, [customMinute]);

  // Handle minute typing with strict numeric filtering
  const handleMinuteChange = (e) => {
    // Only accept digits, up to 2 characters
    const cleanDigits = e.target.value.replace(/\D/g, "").slice(0, 2);
    setCustomMinute(cleanDigits);
  };

  // Auto-format on blur (e.g. "1" -> "01", "9" -> "09", "0" -> "00")
  const handleMinuteBlur = () => {
    if (customMinute === "") return;
    const num = parseInt(customMinute, 10);
    if (!isNaN(num) && num >= 0 && num <= 59) {
      setCustomMinute(pad(num));
    }
  };

  // Minute Stepper controls
  const handleIncrementMinute = () => {
    const current = customMinute === "" ? 0 : parseInt(customMinute, 10);
    const next = isNaN(current) ? 1 : Math.min(59, current + 1);
    setCustomMinute(pad(next));
  };

  const handleDecrementMinute = () => {
    const current = customMinute === "" ? 0 : parseInt(customMinute, 10);
    const prev = isNaN(current) ? 0 : Math.max(0, current - 1);
    setCustomMinute(pad(prev));
  };

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setActivePicker(null);
      }
      if (destRef.current && !destRef.current.contains(e.target)) {
        setIsDestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActivePicker(null);
        setIsDestOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Open Picker for specific field ('departure' | 'return') and initial step ('date' | 'time')
  const openPicker = (field, initialStep = "date") => {
    const currentVal =
      field === "departure"
        ? formValues.departureDateTime
        : formValues.returnDateTime;

    const fallbackMonth = field === "departure" ? 8 : 9; // Sept vs Oct
    const fallbackDay = field === "departure" ? 30 : 2;
    const fallbackTime = field === "departure" ? "07:00 AM" : "09:00 PM";

    const parsed = parseDateTimeString(
      currentVal,
      2026,
      fallbackMonth,
      fallbackDay,
      fallbackTime
    );

    setCalMonth(parsed.month);
    setCalYear(parsed.year);
    const dateFormatted = `${pad(parsed.day)}-${pad(parsed.month + 1)}-${parsed.year}`;
    setDraftDate(dateFormatted);

    // Extract hours, minutes, period for custom picker
    const timeParts = parsed.time.split(" ");
    if (timeParts[0]) {
      const [h, m] = timeParts[0].split(":");
      setCustomHour(pad(parseInt(h, 10) || 7));
      setCustomMinute(pad(parseInt(m, 10) || 0));
    }
    setCustomPeriod(timeParts[1] || (field === "departure" ? "AM" : "PM"));

    setPickerStep(initialStep);
    setActivePicker(field);
  };

  // Select Date handler -> advances automatically to Time picker step
  const handleSelectDay = (day) => {
    const dateFormatted = `${pad(day)}-${pad(calMonth + 1)}-${calYear}`;
    setDraftDate(dateFormatted);
    setPickerStep("time");
  };

  // Save selection and close
  const handleSaveSelection = () => {
    if (!isMinuteValid) return;
    const finalMinute = getNormalizedMinute();
    const finalValue = `${draftDate} | ${customHour}:${finalMinute} ${customPeriod}`;
    const fieldKey =
      activePicker === "departure" ? "departureDateTime" : "returnDateTime";

    handleChange(fieldKey, finalValue);
    setActivePicker(null);
  };

  // Month navigation in calendar
  const prevMonth = (e) => {
    e.stopPropagation();
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);

    const fleetHeading = Array.from(document.querySelectorAll("h2, h3")).find(
      (h) => h.textContent.toLowerCase().includes("fleet")
    );
    if (fleetHeading) {
      const section = fleetHeading.closest("section") || fleetHeading;
      const targetPos =
        section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: targetPos, behavior: "smooth" });
    }
  };

  const filteredDestinations = destinationOptions.filter((opt) =>
    opt.toLowerCase().includes(destSearch.toLowerCase().trim())
  );

  // Calendar calculations
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayIndex = new Date(calYear, calMonth, 1).getDay();

  // Parse draft date to highlight currently chosen day
  const parsedDraft = draftDate.split("-");
  const draftDayNum = parseInt(parsedDraft[0], 10);
  const draftMonthNum = parseInt(parsedDraft[1], 10) - 1;
  const draftYearNum = parseInt(parsedDraft[2], 10);

  // Render Date & Time Picker Popover Component
  const renderPickerPopover = (fieldKey) => {
    const isReturn = fieldKey === "return";
    const fieldLabel = isReturn ? "Return" : "Departure";

    return (
      <div
        ref={pickerRef}
        className={`absolute top-[calc(100%+8px)] ${isReturn ? "right-0" : "left-0 sm:left-auto sm:right-0 lg:left-0"
          } z-50 bg-white rounded-2xl border border-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.14)] p-4 w-77.5 sm:w-83.75 animate-in fade-in zoom-in-95 duration-150 select-none`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Select ${fieldLabel} Date and Time`}
      >
        {/* ========================================================= */}
        {/* STEP 1: DATE PICKER / CALENDAR                            */}
        {/* ========================================================= */}
        {pickerStep === "date" ? (
          <div>
            {/* Calendar Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="w-7 h-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm text-neutral-900 px-1">
                  {MONTH_NAMES[calMonth]} {calYear}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="w-7 h-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setActivePicker(null)}
                className="w-7 h-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction Banner */}
            <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Step 1: Select {fieldLabel} Date
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
              {DAYS_OF_WEEK.map((d) => (
                <span
                  key={d}
                  className="text-[11px] font-bold text-neutral-400 py-0.5"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="w-8 h-8" />
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const isSelected =
                  draftDayNum === day &&
                  draftMonthNum === calMonth &&
                  draftYearNum === calYear;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-150 mx-auto cursor-pointer ${isSelected
                      ? "bg-brand-orange text-white shadow-xs font-bold scale-105"
                      : "text-neutral-700 hover:bg-orange-50 hover:text-brand-orange"
                      }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Shortcut to Skip Directly to Time */}
            <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium truncate">
                Selected: <strong className="text-neutral-800">{draftDate}</strong>
              </span>
              <button
                type="button"
                onClick={() => setPickerStep("time")}
                className="text-brand-orange hover:text-brand-orange-hover font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Pick Time</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* STEP 2: DEDICATED CUSTOM TIME SELECTOR                    */
          /* ========================================================= */
          <div>
            {/* Time Picker Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 mb-2.5">
              <button
                type="button"
                onClick={() => setPickerStep("date")}
                className="inline-flex items-center gap-1 text-xs font-bold text-neutral-600 hover:text-brand-orange transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Change Date</span>
              </button>

              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                {draftDate}
              </span>

              <button
                type="button"
                onClick={() => setActivePicker(null)}
                className="w-6 h-6 rounded hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Large Live Digital Time Preview */}
            <div className="bg-[#f4f5f7] rounded-xl p-2.5 mb-3 flex items-center justify-between border border-neutral-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-orange shrink-0 stroke-[2.2]" />
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                  Time:
                </span>
                <span className="text-lg font-black text-neutral-900 tracking-wider">
                  {customHour}:{isMinuteValid ? getNormalizedMinute() : customMinute || "00"}
                </span>
              </div>

              {/* AM / PM Pill Toggle */}
              <div className="flex items-center p-0.5 rounded-lg bg-neutral-200/70">
                <button
                  type="button"
                  onClick={() => setCustomPeriod("AM")}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${customPeriod === "AM"
                    ? "bg-brand-orange text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                    }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setCustomPeriod("PM")}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${customPeriod === "PM"
                    ? "bg-brand-orange text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                    }`}
                >
                  PM
                </button>
              </div>
            </div>

            {/* 1. Hour Selection (1–12) */}
            <div className="mb-3">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                HOUR
              </div>
              <div className="grid grid-cols-6 gap-1">
                {HOUR_OPTIONS.map((h) => {
                  const isSelected = customHour === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setCustomHour(h)}
                      className={`h-7.5 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${isSelected
                        ? "bg-brand-orange text-white shadow-xs scale-105"
                        : "bg-neutral-100 text-neutral-700 hover:bg-orange-50 hover:text-brand-orange"
                        }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Minute Selection (Input Field 00–59) */}
            <div className="mb-3.5">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="customMinuteInput"
                  className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider cursor-pointer"
                >
                  MINUTE
                </label>
                <span className="text-[10px] font-medium text-neutral-400">
                  00–59
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`relative flex-1 bg-neutral-100 hover:bg-neutral-200/60 focus-within:bg-white focus-within:ring-2 ${!isMinuteValid
                    ? "border border-red-500 focus-within:ring-red-200"
                    : "border border-transparent focus-within:border-brand-orange focus-within:ring-brand-orange/30"
                    } rounded-xl px-3 py-2 transition-all`}
                >
                  <input
                    id="customMinuteInput"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={customMinute}
                    onChange={handleMinuteChange}
                    onBlur={handleMinuteBlur}
                    placeholder="00"
                    maxLength={2}
                    className="w-full text-center text-base font-bold text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                  />
                </div>

                {/* Quick Step +/- buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleDecrementMinute}
                    className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer select-none active:scale-95"
                    title="Decrease 1 minute"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={handleIncrementMinute}
                    className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer select-none active:scale-95"
                    title="Increase 1 minute"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Inline Validation Error Message */}
              {!isMinuteValid && (
                <p className="text-[11px] text-red-500 font-medium mt-1.5 flex items-center gap-1">
                  <span>Minutes must be between 00 and 59.</span>
                </p>
              )}
            </div>

            {/* Save & Confirm Button */}
            <button
              type="button"
              disabled={!isMinuteValid}
              onClick={handleSaveSelection}
              className={`w-full py-2.5 px-4 rounded-xl text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs ${!isMinuteValid
                ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                : "bg-brand-orange hover:bg-brand-orange-hover cursor-pointer active:scale-[0.98]"
                }`}
            >
              <span>
                Confirm Time ({customHour}:{isMinuteValid ? getNormalizedMinute() : customMinute || "00"} {customPeriod})
              </span>
              <span className="font-bold">→</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      id="booking-form"
      className="w-full bg-white rounded-2xl sm:rounded-3xl border border-neutral-100 shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-5 sm:p-7 lg:p-8 transition-all duration-300 relative z-20"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
        {/* ========================================================= */}
        {/* FIRST ROW: 4 FIELDS (Full Name, Mobile, Email, Passengers) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Full Name */}
          <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl px-4 py-3 transition-all duration-150 flex flex-col justify-center">
            <label
              htmlFor="fullName"
              className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none mb-1 cursor-pointer"
            >
              {labels.fullName || "FULL NAME"}
            </label>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.2]" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formValues.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder={placeholders.fullName || "e.g. Rahul Sharma"}
                className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl px-4 py-3 transition-all duration-150 flex flex-col justify-center">
            <label
              htmlFor="mobile"
              className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none mb-1 cursor-pointer"
            >
              {labels.mobile || "MOBILE NUMBER"}
            </label>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.2]" />
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={formValues.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                placeholder={placeholders.mobile || "+91 XXXXX XXXXX"}
                className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl px-4 py-3 transition-all duration-150 flex flex-col justify-center">
            <label
              htmlFor="email"
              className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none mb-1 cursor-pointer"
            >
              {labels.email || "EMAIL ADDRESS"}
            </label>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.2]" />
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={placeholders.email || "eg@example.com"}
                className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* No. of Passengers */}
          <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl px-4 py-3 transition-all duration-150 flex flex-col justify-center">
            <label
              htmlFor="passengers"
              className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none mb-1 cursor-pointer"
            >
              {labels.passengers || "NO. OF PASSENGERS"}
            </label>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-orange shrink-0 stroke-[2.2]" />
              <input
                id="passengers"
                name="passengers"
                type="number"
                min="1"
                max="60"
                value={formValues.passengers}
                onChange={(e) => handleChange("passengers", e.target.value)}
                placeholder={placeholders.passengers || "20"}
                className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ========================================================= */}
        {/* SECOND ROW: 5 ITEMS (Pick-up, Destination, 2 Dates, CTA)  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-stretch">
          {/* Pick-Up Point */}
          <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl px-4 py-3 transition-all duration-150 flex flex-col justify-center">
            <label
              htmlFor="pickupPoint"
              className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none mb-1 cursor-pointer"
            >
              {labels.pickupPoint || "PICK-UP POINT"}
            </label>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-neutral-700 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              </div>
              <input
                id="pickupPoint"
                name="pickupPoint"
                type="text"
                value={formValues.pickupPoint}
                onChange={(e) => handleChange("pickupPoint", e.target.value)}
                placeholder={placeholders.pickupPoint || "e.g. Delhi NCR"}
                className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Destination (With Searchable Quick Select) */}
          <div
            ref={destRef}
            className="relative bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white border border-transparent focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/30 rounded-xl px-4 py-3 transition-all duration-150 flex flex-col justify-center cursor-pointer"
            onClick={() => setIsDestOpen((prev) => !prev)}
          >
            <div className="flex items-center justify-between">
              <label className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none mb-1 cursor-pointer">
                {labels.destination || "DESTINATION"}
              </label>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                  isDestOpen ? "rotate-180 text-brand-orange" : ""
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0 stroke-[2.2]" />
              <input
                type="text"
                value={formValues.destination}
                onChange={(e) => {
                  handleChange("destination", e.target.value);
                  setDestSearch(e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                onFocus={() => setIsDestOpen(true)}
                placeholder={placeholders.destination || "e.g. Jaipur"}
                className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />
            </div>

            {/* Dropdown Menu */}
            {isDestOpen && (
              <div
                className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white rounded-xl border border-neutral-200 shadow-xl p-2 space-y-1"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 mb-1">
                  <Search className="w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="text"
                    value={destSearch}
                    onChange={(e) => setDestSearch(e.target.value)}
                    placeholder="Search city..."
                    className="w-full text-xs font-semibold text-neutral-800 bg-transparent focus:outline-none"
                    autoFocus
                  />
                  {destSearch && (
                    <button
                      type="button"
                      onClick={() => setDestSearch("")}
                      className="text-neutral-400 hover:text-neutral-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="max-h-44 overflow-y-auto space-y-0.5">
                  {filteredDestinations.map((city) => {
                    const isSelected = formValues.destination === city;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          handleChange("destination", city);
                          setIsDestOpen(false);
                          setDestSearch("");
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-orange-50 text-brand-orange"
                            : "hover:bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        <span>{city}</span>
                        {isSelected && (
                          <Check className="w-3 h-3 text-brand-orange stroke-[2.5]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* DEPARTURE DATE & TIME (Selection-Only Control)            */}
          {/* ========================================================= */}
          <div
            onClick={() => openPicker("departure", "date")}
            className={`relative bg-[#f4f5f7] hover:bg-[#eef0f3] ${
              activePicker === "departure"
                ? "bg-white border-brand-orange ring-2 ring-brand-orange/30"
                : "border-transparent"
            } border rounded-xl px-4 py-3 transition-all duration-150 flex flex-col justify-center cursor-pointer select-none`}
            role="button"
            tabIndex={0}
            aria-label="Select Departure Date and Time"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPicker("departure", "date");
              }
            }}
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor="departureDateTime"
                className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none mb-1 cursor-pointer"
              >
                {labels.departureDateTime || "DEPARTURE DATE & TIME"}
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPicker("departure", "date");
                  }}
                  title="Select Date"
                  className="text-neutral-400 hover:text-brand-orange transition-colors cursor-pointer p-0.5"
                >
                  <Calendar className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPicker("departure", "time");
                  }}
                  title="Select Time"
                  className="text-neutral-400 hover:text-brand-orange transition-colors cursor-pointer p-0.5"
                >
                  <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.2]" />
              <input
                id="departureDateTime"
                name="departureDateTime"
                type="text"
                readOnly
                tabIndex={-1}
                value={formValues.departureDateTime}
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                placeholder={placeholders.departureDateTime || "30-09-2026 | 07:00 AM"}
                className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent cursor-pointer select-none"
              />
            </div>

            {/* Departure Popover */}
            {activePicker === "departure" && renderPickerPopover("departure")}
          </div>

          {/* ========================================================= */}
          {/* RETURN DATE & TIME (Selection-Only Control)               */}
          {/* ========================================================= */}
          <div
            onClick={() => openPicker("return", "date")}
            className={`relative bg-[#f4f5f7] hover:bg-[#eef0f3] ${
              activePicker === "return"
                ? "bg-white border-brand-orange ring-2 ring-brand-orange/30"
                : "border-transparent"
            } border rounded-xl px-4 py-3 transition-all duration-150 flex flex-col justify-center cursor-pointer select-none`}
            role="button"
            tabIndex={0}
            aria-label="Select Return Date and Time"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPicker("return", "date");
              }
            }}
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor="returnDateTime"
                className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none mb-1 cursor-pointer"
              >
                {labels.returnDateTime || "RETURN DATE & TIME"}
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPicker("return", "date");
                  }}
                  title="Select Date"
                  className="text-neutral-400 hover:text-brand-orange transition-colors cursor-pointer p-0.5"
                >
                  <Calendar className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPicker("return", "time");
                  }}
                  title="Select Time"
                  className="text-neutral-400 hover:text-brand-orange transition-colors cursor-pointer p-0.5"
                >
                  <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.2]" />
              <input
                id="returnDateTime"
                name="returnDateTime"
                type="text"
                readOnly
                tabIndex={-1}
                value={formValues.returnDateTime}
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                placeholder={placeholders.returnDateTime || "02-10-2026 | 09:00 PM"}
                className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent cursor-pointer select-none"
              />
            </div>

            {/* Return Popover */}
            {activePicker === "return" && renderPickerPopover("return")}
          </div>

          {/* Primary CTA: Find Buses → */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-stretch">
            <button
              type="submit"
              className="w-full h-full min-h-14 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm lg:text-[15px] flex items-center justify-center gap-2 shadow-xs hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 select-none group"
            >
              <span>{submitted ? (submitButton.successLabel || "Buses Found!") : (submitButton.idleLabel || "Find Buses")}</span>
              <span className="text-base font-bold transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOOKING SUMMARY: Compact & Clean Bottom Bar               */}
        {/* ========================================================= */}
        <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Left Summary */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider select-none">
              {routeSummary.badge || "FULL COACH"}
            </span>
            <span className="text-neutral-500 font-normal">
              {routeSummary.label || "Selected Itinerary:"}
            </span>
            <span className="font-semibold text-neutral-800">
              {formValues.pickupPoint || "Delhi NCR"} →{" "}
              {formValues.destination || "Jaipur"} →{" "}
              {formValues.pickupPoint || "Delhi NCR"} (Return)
            </span>
          </div>

          {/* Right Summary */}
          <div className="flex items-center gap-2 text-neutral-600 text-xs sm:text-[13px] font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0 inline-block" />
            <span>{routeSummary.subtext || "Full Luxury Coach · Entire Bus Reserved"}</span>
          </div>
        </div>
      </form>
    </div>
  );
}
