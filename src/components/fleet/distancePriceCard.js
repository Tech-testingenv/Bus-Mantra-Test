"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Sparkles, PhoneCall } from "lucide-react";

/**
 * DistancePriceCard
 * Result panel displaying the calculated route distance, price estimation,
 * transparent inclusions, and prominent booking confirmation CTA.
 */
export default function DistancePriceCard({
  distanceData,
  pricingData,
  bus,
  bookingDetails,
  onConfirmBooking,
  className = "",
}) {
  const [isBooked, setIsBooked] = useState(false);

  const handleBookNow = (e) => {
    e.preventDefault();
    setIsBooked(true);
    onConfirmBooking?.();
  };

  return (
    <div
      className={`relative bg-surface rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Top Tag & Title */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5 pb-3.5 border-b border-border">
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-wider block mb-0.5">
            CALCULATED DISTANCE & PRICE
          </span>
          <h3 className="text-lg sm:text-xl font-black text-text-primary tracking-tight">
            Estimated Route Fare
          </h3>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary text-xs font-semibold shrink-0">
          {bus?.name || "Luxury Coach"}
        </span>
      </div>

      {/* Main Figures Grid: Distance + Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {/* Round Trip Distance */}
        <div className="bg-surface-secondary rounded-2xl p-4 border border-border flex flex-col justify-center">
          <span className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
            ROUND TRIP DISTANCE
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
              ≈ {distanceData?.totalKm || 0}
            </span>
            <span className="text-xs sm:text-sm font-bold text-text-muted uppercase">
              KM
            </span>
          </div>
          <span className="text-[11px] text-text-muted mt-1">
            Includes round-trip base journey
          </span>
        </div>

        {/* Estimated Total Price */}
        <div className="bg-primary-subtle rounded-2xl p-4 border border-primary/20 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">
              TOTAL ESTIMATED PRICE
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface text-text-secondary border border-border">
              {pricingData?.formattedRatePerKm || "₹35/KM"}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
            {pricingData?.formattedTotalPrice || "₹0"}
          </div>
          <span className="text-[11px] text-text-muted mt-1">
            Fuel, chauffeur &amp; standard GST included
          </span>
        </div>
      </div>

      {/* Route Summary Path */}
      <div className="bg-surface-secondary rounded-xl p-3 sm:p-3.5 mb-5 flex items-start gap-2.5 border border-border">
        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div className="text-xs text-text-secondary leading-relaxed font-medium">
          <span className="font-bold text-text-primary mr-1">Route Path:</span>
          <span>{distanceData?.routeSummaryText || "Delhi NCR → Jaipur → Delhi NCR (Return)"}</span>
        </div>
      </div>

      {/* Included Highlights */}
      <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-text-secondary">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-success shrink-0" />
          <span>Full Bus Charter</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
          <span>Verified Chauffeur</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
          <span>Zero Hidden Surcharges</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <span>24/7 Dispatch Control</span>
        </div>
      </div>

      {/* Primary Booking CTA */}
      <button
        type="button"
        onClick={handleBookNow}
        className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-primary/20 active:scale-[0.98] transition-all cursor-pointer group"
      >
        <span>Confirm Booking Request</span>
        <ArrowRight className="w-4 h-4 text-primary-foreground stroke-[2.4] transition-transform duration-200 group-hover:translate-x-1" />
      </button>

      {/* Booking Confirmation Modal */}
      {isBooked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-border text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-success flex items-center justify-center mx-auto mb-4 border border-success/30">
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </div>

            <span className="text-[11px] font-bold tracking-wider text-primary uppercase block mb-1">
              RESERVATION REQUEST RECEIVED
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-text-primary mb-2">
              Your Bus Is Reserved!
            </h4>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-5">
              Thank you! Our fleet operations team is preparing your itinerary for{" "}
              <strong className="text-text-primary">{bus?.name}</strong>. A dedicated trip coordinator will call you to confirm your schedule.
            </p>

            <div className="bg-surface-secondary rounded-xl p-3 text-xs text-text-secondary text-left mb-6 space-y-1.5 border border-border">
              <div className="flex justify-between">
                <span className="text-text-muted">Pickup:</span>
                <span className="font-semibold">{bookingDetails?.pickupPoint || "Delhi NCR"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Destination:</span>
                <span className="font-semibold">
                  {Array.isArray(bookingDetails?.destination)
                    ? bookingDetails.destination.join(", ")
                    : bookingDetails?.destination || "Jaipur"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Estimated Total:</span>
                <span className="font-bold text-primary">
                  {pricingData?.formattedTotalPrice}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="flex-1 py-3 rounded-xl bg-surface-muted hover:bg-surface-secondary text-text-primary text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                Close
              </button>
              <a
                href="tel:+919876543210"
                className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Support</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
