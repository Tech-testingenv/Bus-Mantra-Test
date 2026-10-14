"use client";

import Image from "next/image";
import Link from "next/link";
import BookingForm from "./bookingForm";
import { heroData } from "@/data/data";

export default function HeroSection({ data = heroData }) {
  const scrollToBooking = (e) => {
    e.preventDefault();
    const el = document.getElementById("booking-form");

    if (el) {
      const navOffset = 84;
      const targetPos =
        el.getBoundingClientRect().top + window.scrollY - navOffset;

      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: "smooth",
      });

      const firstInput = el.querySelector("input");

      if (firstInput) {
        setTimeout(() => firstInput.focus(), 350);
      }
    }
  };

  const scrollToFleet = (e) => {
    const href = data.secondaryButton?.href || "#fleets";

    if (href.startsWith("/")) {
      return;
    }

    e.preventDefault();

    const headings = Array.from(document.querySelectorAll("h2, h3"));

    const match = headings.find((h) =>
      h.textContent.toLowerCase().includes("fleet")
    );

    const targetEl = match?.closest("section") || match;

    if (targetEl) {
      const navOffset = 76;
      const targetPos =
        targetEl.getBoundingClientRect().top + window.scrollY - navOffset;

      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: "smooth",
      });
    }
  };

  const line1 = data.titleLines?.[0] || "Luxury Coach at ₹1/KM.";
  const line2 = data.titleLines?.[1] || "Yes, You Read That Right!";

  const renderLine1 = (text) => {
    if (typeof text === "string" && text.includes("₹1/KM.")) {
      const parts = text.split("₹1/KM.");

      return (
        <>
          {parts[0]}
          <span className="text-black font-black">₹1/KM.</span>
          {parts[1]}
        </>
      );
    }

    return text;
  };

  const stats = data.stats || [];

  return (
    <section className="relative w-full pt-1 sm:pt-3">
      {/* DESKTOP TWO-COLUMN COMPOSITION */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-10 xl:gap-14 items-center">
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Eyebrow */}
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-neutral-100 text-[11px] font-bold tracking-wider text-neutral-600 uppercase mb-5 select-none">
            {data.eyebrow}
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[34px] xl:text-[40px] 2xl:text-[44px] font-black leading-[1.12] tracking-tight mb-5">
            <span className="block text-neutral-900 font-extrabold">
              {renderLine1(line1)}
            </span>

            {/* Orange text changed to royal blue */}
            <span className="block text-[#123999] font-black">
              {line2}
            </span>
          </h1>

          {/* Description */}
          <p className="text-base xl:text-lg text-neutral-600 leading-relaxed mb-7 max-w-lg">
            {data.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-6 mb-11">
            <Link
              href={data.primaryButton?.href || "#booking-form"}
              onClick={scrollToBooking}
              className="px-6 py-3.5 rounded-xl bg-[#123999] hover:bg-[#0d2b73] text-white font-semibold text-sm xl:text-base inline-flex items-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-[0.98] group"
            >
              <span>
                {data.primaryButton?.label || "Book a Bus"}
              </span>
            </Link>

            {/* Orange text and border changed to royal blue */}
            <Link
              href={data.secondaryButton?.href || "#fleets"}
              onClick={scrollToFleet}
              className="text-[#123999] border border-[#123999]/50 hover:border-[#0d2b73] hover:text-[#0d2b73] px-6 py-3.5 rounded-xl font-semibold text-sm xl:text-base inline-flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {data.secondaryButton?.label || "Explore Fleet"}
              </span>
            </Link>
          </div>

          {/* Trust Statistics */}
          <div className="flex items-center gap-10 xl:gap-14">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-2xl xl:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  {stat.value}
                </div>

                <div className="text-xs xl:text-sm font-medium text-neutral-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Bus Image */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="w-full rounded-3xl xl:rounded-[36px] bg-[#f0f2f5] p-6 sm:p-8 xl:p-10 flex items-center justify-center border border-neutral-100 shadow-xs">
            <Image
              src={data.image?.src || "/fleet/fleet.png"}
              alt={data.image?.alt || "BUS MANTRA Modern Luxury Coach Bus"}
              width={data.image?.width || 1920}
              height={data.image?.height || 1080}
              priority
              className="w-full h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.02] rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* MOBILE COMPOSITION */}
      <div className="flex flex-col lg:hidden items-start text-left space-y-4 sm:space-y-5">
        {/* Eyebrow */}
        <div className="inline-block px-3.5 py-1.5 rounded-full bg-neutral-100 text-[11px] font-bold tracking-wider text-neutral-600 uppercase select-none">
          {data.eyebrow}
        </div>

        {/* Headline */}
        <h1 className="text-[26px] sm:text-3xl md:text-4xl font-black leading-[1.14] tracking-tight">
          <span className="block text-neutral-900 font-extrabold">
            {renderLine1(line1)}
          </span>

          {/* Orange text changed to royal blue */}
          <span className="block text-[#123999] font-black">
            {line2}
          </span>
        </h1>

        {/* Description */}
        <p className="text-base text-neutral-600 leading-relaxed max-w-lg">
          {data.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 w-full pt-1 pb-1">
          <Link
            href={data.primaryButton?.href || "#booking-form"}
            onClick={scrollToBooking}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#123999] hover:bg-[#0d2b73] text-white font-semibold text-base inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
          >
            <span>
              {data.primaryButton?.label || "Book a Bus"}
            </span>
          </Link>

          {/* Orange text and border changed to royal blue */}
          <Link
            href={data.secondaryButton?.href || "#fleets"}
            onClick={scrollToFleet}
            className="text-[#123999] border border-[#123999]/50 hover:border-[#0d2b73] hover:text-[#0d2b73] w-full py-3.5 rounded-xl font-semibold text-sm xl:text-base inline-flex items-center gap-1.5 transition-colors group"
          >
            <span className="w-full text-center">
              {data.secondaryButton?.label || "Explore Fleet"}
            </span>
          </Link>
        </div>

        {/* Bus Image */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-[#f0f2f5] p-5 sm:p-6 my-2 flex items-center justify-center border border-neutral-100 shadow-xs">
          <Image
            src={data.image?.src || "/fleet/fleet.png"}
            alt={data.image?.alt || "BUS MANTRA Modern Luxury Coach Bus"}
            width={data.image?.width || 1920}
            height={data.image?.height || 1080}
            priority
            className="w-full h-auto object-contain select-none"
          />
        </div>

        {/* Trust Statistics */}
        <div className="grid grid-cols-3 gap-3 w-full pt-3 pb-2 border-t border-neutral-100/70 sm:border-0">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                {stat.value}
              </div>

              <div className="text-[11px] sm:text-xs font-medium text-neutral-500 mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING FORM */}
      <div className="mt-8 sm:mt-10 lg:mt-12 w-full">
        <BookingForm data={data.form} />
      </div>
    </section>
  );
}