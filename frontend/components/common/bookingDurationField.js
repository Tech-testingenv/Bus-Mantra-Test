"use client";

import { Clock, Sparkles } from "lucide-react";
import { calculateTripDuration } from "@/services/dateService";

/**
 * BookingDurationField
 * Read-only field displaying automatically calculated trip duration in days & nights.
 *
 * @param {Object} props
 * @param {string} props.departureValue - Departure date string
 * @param {string} props.returnValue - Return date string
 * @param {string} [props.label="DURATION"] - Field label
 * @param {"default" | "light" | "compact"} [props.variant="default"] - Style variant
 * @param {string} [props.className=""] - Extra classes
 */
export default function BookingDurationField({
  departureValue,
  returnValue,
  label = "DURATION",
  variant = "default",
  className = "",
}) {
  const duration = calculateTripDuration(departureValue, returnValue);

  // Background and border styling matching the host form's styling
  const isLight = variant === "light";
  const isCompact = variant === "compact";

  const containerBg = isLight
    ? "bg-white border-border"
    : isCompact
      ? "bg-surface-secondary border-border"
      : "bg-surface-secondary border-border";

  const textStyle = duration.isInvalid
    ? "text-red-600 font-bold"
    : duration.text
      ? "text-text-primary font-bold"
      : "text-text-muted font-medium";

  return (
    <div
      className={`relative rounded-xl border ${containerBg} px-4 py-3 transition-colors ${className}`}
    >
      <div className="mb-1 flex items-center justify-between gap-1.5">
        <label
          htmlFor="trip-duration-field"
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted select-none"
        >
          <Clock className="h-3.5 w-3.5 text-primary stroke-[2.2]" />
          <span>{label}</span>
        </label>

        <span className="inline-flex items-center gap-1 rounded-md bg-primary-subtle px-1.5 py-0.5 text-[9px] font-semibold text-primary select-none">
          <Sparkles className="h-2.5 w-2.5" />
          Auto
        </span>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="trip-duration-field"
          type="text"
          readOnly
          tabIndex={1}
          aria-readonly="true"
          value={duration.text}
          placeholder={duration.placeholder || "Select travel dates"}
          onKeyDown={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          className={`w-full bg-transparent text-xs font-semibold outline-none select-none cursor-default sm:text-sm placeholder:text-text-muted ${textStyle}`}
        />
      </div>
    </div>
  );
}
