"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ctaData } from "@/data/data";

/**
 * Reusable FinalCtaSection component for closing sections across Home, Fleet, Services, Destinations, etc.
 * Features:
 * - Centered premium dark charcoal card with subtle warm glow & faint travel geometry
 * - Single prominent "Book a Bus →" CTA button
 * - Fully configurable via props or defaults to ctaData
 */
export default function FinalCtaSection({
  data = ctaData,
  eyebrow,
  heading,
  headingLines,
  description,
  button,
  className = "",
}) {
  const content = data || ctaData;

  const currentEyebrow = eyebrow ?? content?.eyebrow ?? "READY TO TRAVEL TOGETHER?";
  const currentHeading = heading ?? content?.heading ?? "Your group. Your bus. Your journey.";
  const currentHeadingLines = headingLines ?? content?.headingLines;
  const currentDescription =
    description ??
    content?.description ??
    "Book an entire bus for your next journey with comfortable coaches, reliable service and a simple booking experience.";
  const currentButton = button ?? content?.button ?? content?.primaryButton ?? {
    label: "Book a Bus",
    href: "#booking-form",
  };

  const handleCtaClick = (e) => {
    const targetHref = currentButton.href || "#booking-form";
    if (targetHref === "#booking-form") {
      const formEl = document.getElementById("booking-form");
      if (formEl) {
        e.preventDefault();
        const navOffset = 84;
        const targetPos =
          formEl.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: Math.max(0, targetPos), behavior: "smooth" });
        const firstInput = formEl.querySelector("input");
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 350);
        }
      }
    }
  };

  const renderHeading = () => {
    if (Array.isArray(currentHeadingLines) && currentHeadingLines.length >= 2) {
      return (
        <>
          <span className="sm:block">{currentHeadingLines[0]} </span>
          <span className="sm:block">{currentHeadingLines[1]}</span>
        </>
      );
    }
    if (typeof currentHeading === "string" && currentHeading.includes("Your group. Your bus.")) {
      const parts = currentHeading.split("Your group. Your bus.");
      const rest = parts[1]?.trim() || "Your journey.";
      return (
        <>
          <span className="sm:block">Your group. Your bus. </span>
          <span className="sm:block">{rest}</span>
        </>
      );
    }
    return currentHeading;
  };

  return (
    <section className={`relative w-full py-8 sm:py-12 lg:py-14 ${className}`}>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-[28px] sm:rounded-4xl lg:rounded-[36px] overflow-hidden px-6 py-12 sm:px-12 sm:py-16 md:py-18 lg:px-16 lg:py-20 text-left flex flex-col items-start justify-center shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-neutral-800/80"
          style={{
            backgroundColor: "#1c1e22",
            backgroundImage:
              "radial-gradient(ellipse 70% 75% at 88% 20%, rgba(255, 120, 45, 0.18) 0%, rgba(180, 70, 20, 0.07) 45%, transparent 75%), radial-gradient(ellipse 50% 55% at 12% 82%, rgba(255, 120, 45, 0.05) 0%, transparent 65%)",
          }}
        >
          {/* Subtle Abstract Visual Treatment: Soft concentric curves & faint route lines */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden select-none"
            aria-hidden="true"
          >
            {/* Soft concentric distance rings in top-right glow */}
            <svg
              className="absolute -right-16 -top-20 w-105 h-105 sm:w-145 sm:h-145 opacity-[0.06] text-white"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="300" cy="300" r="110" stroke="currentColor" strokeWidth="1.2" />
              <circle
                cx="300"
                cy="300"
                r="190"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              />
              <circle cx="300" cy="300" r="270" stroke="currentColor" strokeWidth="1.2" />
              <circle
                cx="300"
                cy="300"
                r="350"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6 8"
              />
            </svg>

            {/* Faint travel route lines in bottom-left */}
            <svg
              className="absolute -left-20 -bottom-20 w-95 h-95 sm:w-130 sm:h-130 opacity-[0.05] text-[#ff782d]"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 560 C 140 420, 290 360, 540 210"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
              <path
                d="M10 500 C 170 390, 340 310, 580 130"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M-20 440 C 190 340, 370 240, 600 50"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            </svg>
          </div>

          {/* Eyebrow: Small orange uppercase */}
          {currentEyebrow && (
            <span className="relative z-10 text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#ff782d] uppercase select-none mb-3.5 sm:mb-4.5">
              {currentEyebrow}
            </span>
          )}

          {/* Heading: Large white typography breaking into 2 lines on desktop */}
          <h2 className="relative z-10 text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-black text-white tracking-tight leading-[1.14] sm:leading-[1.12] mb-3.5 sm:mb-4.5">
            {renderHeading()}
          </h2>

          {/* Description: Readable muted paragraph */}
          <p className="relative z-10 text-sm sm:text-base md:text-[17px] text-neutral-300/90 font-normal leading-relaxed max-w-xl mb-7 sm:mb-9">
            {currentDescription}
          </p>

          {/* Single CTA Button: Bus Mantra orange with arrow */}
          <div className="relative z-10">
            <Link
              href={currentButton.href || "#booking-form"}
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm sm:text-base shadow-md shadow-brand-orange/20 transition-all duration-200 active:scale-[0.98] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
            >
              <span>{currentButton.label || "Book a Bus"}</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
