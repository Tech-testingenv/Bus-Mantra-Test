"use client";

import { Info } from "lucide-react";
import { formatCurrency } from "@/services/pricingService";

/**
 * FareSummary Component
 * Displays a transparent two-tier fare breakdown:
 * 1. Fare Excluding GST
 * 2. GST (5% standard transport GST)
 * 3. Total Fare Including GST (prominently highlighted)
 * 4. Parking Notice: "Airport & Railway Station Parking Charges Apply As Per Actuals"
 *
 * @param {Object} props
 * @param {number|string} props.basePrice - Pre-GST base fare amount or formatted string
 * @param {number|string} props.gstAmount - GST tax amount or formatted string
 * @param {number|string} props.totalFare - Total fare amount or formatted string
 * @param {string} [props.gstRatePercent="5%"] - GST percentage label
 * @param {string} [props.title="FARE SUMMARY"] - Header label
 * @param {boolean} [props.showParkingNotice=true] - Display informational parking notice
 * @param {"default" | "light" | "compact"} [props.variant="default"]
 * @param {string} [props.className=""]
 */
export default function FareSummary({
  basePrice = 0,
  gstAmount = 0,
  totalFare = 0,
  gstRatePercent = "5%",
  title = "FARE SUMMARY",
  showParkingNotice = true,
  variant = "default",
  className = "",
}) {
  const formattedBase =
    typeof basePrice === "string" ? basePrice : formatCurrency(basePrice);
  const formattedGst =
    typeof gstAmount === "string" ? gstAmount : formatCurrency(gstAmount);
  const formattedTotal =
    typeof totalFare === "string" ? totalFare : formatCurrency(totalFare);

  const isLight = variant === "light";

  const cardBorderBg = isLight
    ? "border-primary/25 bg-primary-subtle/50"
    : "border-primary/20 bg-primary-subtle";

  return (
    <div
      className={`rounded-xl border ${cardBorderBg} p-3.5 sm:p-4 transition-all ${className}`}
      aria-label="Fare summary breakdown"
    >
      {/* Title */}
      <span className="block text-[10px] font-bold uppercase tracking-wider text-primary mb-2.5">
        {title}
      </span>

      {/* Row 1: Fare Excluding GST */}
      <div className="flex items-center justify-between py-1 text-xs sm:text-[13px] border-b border-primary/10">
        <span className="text-text-secondary font-medium">
          Fare Excluding GST
        </span>
        <span className="font-bold text-text-primary">
          {formattedBase}
        </span>
      </div>

      {/* Row 2: GST */}
      <div className="flex items-center justify-between py-1 text-xs sm:text-[13px]">
        <span className="text-text-secondary font-medium">
          GST
        </span>
        <span className="font-bold text-text-primary">
          {formattedGst}
        </span>
      </div>

      {/* Row 3: Total Fare Highlighted */}
      <div className="mt-2.5 pt-2.5 border-t border-primary/20 flex flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-primary">
            TOTAL FARE
          </span>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-text-primary">
            {formattedTotal}
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-normal italic text-text-muted">
          Including all applicable taxes.
        </span>
      </div>

      {/* Informational Notice: Airport & Station Parking Charges */}
      {showParkingNotice && (
        <div className="mt-2.5 pt-2 border-t border-primary/15 flex items-start gap-1.5 text-[11px] font-semibold text-primary/95 sm:text-xs">
          <Info className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
          <span>Airport &amp; Station Parking Charges Apply As Per Actuals</span>
        </div>
      )}
    </div>
  );
}
