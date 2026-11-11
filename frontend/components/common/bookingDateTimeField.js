"use client";

import { Calendar, Clock } from "lucide-react";
import {
  toISODateString,
  toInputTime,
  combineDateTime,
  getTodayISODate,
} from "@/services/dateService";

/**
 * BookingDateTimeField
 * Proper HTML5 Date and Time selection control with validation,
 * min-date protection, and clean Bus Mantra design.
 *
 * @param {Object} props
 * @param {string} props.id - HTML element id
 * @param {string} props.label - Field label e.g. "DEPARTURE" or "RETURN"
 * @param {string} [props.value] - Combined datetime string (e.g. "30-09-2026 | 07:00 AM")
 * @param {string} [props.date] - Optional separate ISO date "YYYY-MM-DD"
 * @param {string} [props.time] - Optional separate time "HH:MM"
 * @param {string} [props.minDate] - Earliest selectable ISO date string
 * @param {Function} [props.onChange] - Callback receiving combined formatted string
 * @param {Function} [props.onDateChange] - Callback receiving ISO date string
 * @param {Function} [props.onTimeChange] - Callback receiving time string
 * @param {"default" | "light"} [props.variant="default"]
 * @param {string} [props.className=""]
 * @param {boolean} [props.required=false]
 */
export default function BookingDateTimeField({
  id,
  label,
  value,
  date,
  time,
  minDate,
  onChange,
  onDateChange,
  onTimeChange,
  variant = "default",
  className = "",
  required = false,
}) {
  // Resolve current date and time
  const resolvedDate = date !== undefined ? date : toISODateString(value || "");
  const resolvedTime = time !== undefined ? time : toInputTime(value || "", label === "RETURN" ? "21:00" : "07:00");

  const effectiveMinDate = minDate !== undefined ? minDate : (label === "DEPARTURE" ? getTodayISODate() : undefined);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    if (onDateChange) {
      onDateChange(newDate);
    }
    if (onChange) {
      const combined = combineDateTime(newDate, resolvedTime);
      onChange(combined);
    }
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    if (onTimeChange) {
      onTimeChange(newTime);
    }
    if (onChange) {
      const combined = combineDateTime(resolvedDate, newTime);
      onChange(combined);
    }
  };

  const isLight = variant === "light";
  const containerClasses = isLight
    ? "rounded-xl border border-black/10 bg-white px-3.5 py-3 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-focus-ring/30"
    : "rounded-xl border border-border bg-surface-secondary px-4 py-3 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-focus-ring/30";

  return (
    <div className={`${containerClasses} ${className}`}>
      <label
        htmlFor={`${id}-date`}
        className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-text-muted select-none"
      >
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          {label}
        </span>
        <span className="text-[9px] font-semibold text-text-muted lowercase tracking-normal">
          date &amp; time
        </span>
      </label>

      <div className="mt-1 flex items-center gap-2">
        {/* Native Date Picker */}
        <input
          id={`${id}-date`}
          type="date"
          value={resolvedDate}
          min={effectiveMinDate}
          onChange={handleDateChange}
          required={required}
          className="min-w-0 flex-1 cursor-pointer bg-transparent text-xs font-semibold text-text-primary outline-none sm:text-sm"
          aria-label={`${label} Date`}
        />

        <span className="text-text-muted/60 select-none text-xs">|</span>

        {/* Native Time Picker */}
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-text-muted/70 shrink-0" />
          <input
            id={`${id}-time`}
            type="time"
            value={resolvedTime}
            onChange={handleTimeChange}
            className="w-18 cursor-pointer bg-transparent text-xs font-semibold text-text-primary outline-none sm:text-sm"
            aria-label={`${label} Time`}
          />
        </div>
      </div>
    </div>
  );
}
