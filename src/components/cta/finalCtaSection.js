"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ctaData } from "@/data/data";

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

  const currentEyebrow =
    eyebrow ?? content?.eyebrow ?? "READY TO TRAVEL TOGETHER?";

  const currentHeading =
    heading ?? content?.heading ?? "Your group. Your bus. Your journey.";

  const currentHeadingLines = headingLines ?? content?.headingLines;

  const currentDescription =
    description ??
    content?.description ??
    "Book an entire bus for your next journey with comfortable coaches, reliable service and a simple booking experience.";

  const currentButton =
    button ??
    content?.button ??
    content?.primaryButton ?? {
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
          formEl.getBoundingClientRect().top +
          window.scrollY -
          navOffset;

        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: "smooth",
        });

        const firstInput = formEl.querySelector("input");

        if (firstInput) {
          setTimeout(() => firstInput.focus(), 350);
        }
      }
    }
  };

  const renderHeading = () => {
    if (
      Array.isArray(currentHeadingLines) &&
      currentHeadingLines.length >= 2
    ) {
      return (
        <>
          <span className="sm:block">{currentHeadingLines[0]} </span>
          <span className="sm:block">{currentHeadingLines[1]}</span>
        </>
      );
    }

    if (
      typeof currentHeading === "string" &&
      currentHeading.includes("Your group. Your bus.")
    ) {
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
    <section
      className={`relative w-full py-8 sm:py-12 lg:py-14 ${className}`}
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card */}
        <div className="relative flex flex-col items-start justify-center overflow-hidden rounded-[28px] border border-[#D8DFEA] bg-[#E9EDF4] px-6 py-12 text-left shadow-[0_12px_35px_rgba(17,35,70,0.06)] sm:rounded-4xl sm:px-12 sm:py-16 md:py-18 lg:rounded-[36px] lg:px-16 lg:py-20">
          {/* Decorative Background */}
          <div
            className="pointer-events-none absolute inset-0 select-none overflow-hidden"
            aria-hidden="true"
          >
            {/* Subtle Blue Glow */}
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#123999]/[0.07] blur-3xl sm:h-105 sm:w-105" />

            {/* Subtle Yellow Glow */}
            <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-[#ffc003]/[0.12] blur-3xl" />

            {/* Concentric Travel Rings */}
            <svg
              className="absolute -right-16 -top-20 h-80 w-80 text-[#123999] opacity-[0.08] sm:h-120 sm:w-120"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="300"
                cy="300"
                r="110"
                stroke="currentColor"
                strokeWidth="1.2"
              />

              <circle
                cx="300"
                cy="300"
                r="190"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              />

              <circle
                cx="300"
                cy="300"
                r="270"
                stroke="currentColor"
                strokeWidth="1.2"
              />

              <circle
                cx="300"
                cy="300"
                r="350"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6 8"
              />
            </svg>

            {/* Travel Route Lines */}
            <svg
              className="absolute -bottom-20 -left-20 h-72 w-72 text-[#ffc003] opacity-[0.24] sm:h-105 sm:w-105"
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

          {/* Eyebrow */}
          {currentEyebrow && (
            <span className="relative z-10 mb-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#123999] sm:mb-4.5 sm:text-xs">
              {currentEyebrow}
            </span>
          )}

          {/* Heading */}
          <h2 className="relative z-10 mb-3.5 max-w-4xl text-3xl font-black leading-[1.14] tracking-tight text-[#111111] sm:mb-4.5 sm:text-4xl sm:leading-[1.12] md:text-[44px] lg:text-[48px]">
            {renderHeading()}
          </h2>

          {/* Description */}
          <p className="relative z-10 mb-7 max-w-xl text-sm font-normal leading-relaxed text-[#626C7B] sm:mb-9 sm:text-base md:text-[17px]">
            {currentDescription}
          </p>

          {/* CTA Button */}
          <div className="relative z-10">
            <Link
              href={currentButton.href || "#booking-form"}
              onClick={handleCtaClick}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ffc003] px-6 py-3 text-sm font-bold text-[#123999] transition-all duration-200 hover:bg-[#e0a900] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc003] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E9EDF4] sm:px-7 sm:py-3.5 sm:text-base"
            >
              <span>{currentButton.label || "Book a Bus"}</span>

              <ArrowRight className="h-4 w-4 stroke-[2.2] text-[#123999] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Bottom Yellow Accent */}
          <div
            className="pointer-events-none absolute bottom-0 left-6 h-1 w-20 rounded-t-full bg-[#ffc003] sm:left-12 lg:left-16"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}