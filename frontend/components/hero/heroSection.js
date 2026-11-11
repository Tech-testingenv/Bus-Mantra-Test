"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import BookingForm from "./bookingForm";
import HeroImageSlider from "./heroImageSlider";
import { heroData } from "@/data/data";

export default function HeroSection({ data = heroData }) {
  const scrollToBooking = (e) => {
    const href = data.primaryButton?.href || "/offer";

    if (href.startsWith("/")) return;

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

    if (href.startsWith("/")) return;

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
  const line3 = data.titleLines?.[2];

  const tcLogo =
    data.tcLogo ||
    (typeof line3 === "string" &&
      (line3.includes(".png") || line3.includes("/"))
      ? line3
      : "/bus_mantra_t&c_logo.png");

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const heroSlides = useMemo(() => {
    return Array.isArray(data.heroSliderImages) &&
      data.heroSliderImages.length > 0
      ? data.heroSliderImages
      : [];
  }, [data.heroSliderImages]);

  const activeSlideIdx =
    heroSlides.length > 0 ? currentSlideIndex % heroSlides.length : 0;

  const sliderTexts = useMemo(() => {
    if (Array.isArray(data.sliderTexts) && data.sliderTexts.length > 0) {
      return data.sliderTexts;
    }

    if (
      Array.isArray(data.heroSliderImages) &&
      data.heroSliderImages.length > 0
    ) {
      return data.heroSliderImages.map((s) => ({
        titleLine2: s.titleLine2 || line2,
        description: s.description || "",
      }));
    }

    return [
      {
        titleLine2: line2,
        description: "",
      },
    ];
  }, [data.sliderTexts, data.heroSliderImages, line2]);

  const activeTextIdx =
    sliderTexts.length > 0 ? currentSlideIndex % sliderTexts.length : 0;

  const activeSliderText = sliderTexts[activeTextIdx] || {};

  const renderLine1 = (text) => {
    if (typeof text === "string" && text.includes("₹1/KM.")) {
      const parts = text.split("₹1/KM.");

      return (
        <>
          {parts[0]}
          <span className="text-text-primary font-black">₹1/KM.</span>
          {parts[1]}
        </>
      );
    }

    return text;
  };

  const stats = data.stats || [];

  return (
    <section className="relative w-full pt-10">
      {/* DESKTOP TWO-COLUMN COMPOSITION (30% Left / 70% Right) */}
      <div className="hidden lg:grid lg:grid-cols-10 gap-8 xl:gap-12 items-center">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 flex flex-col items-start text-left">

          {/* EYEBROW */}
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-surface-secondary text-[11px] font-bold tracking-wider text-text-secondary uppercase mb-4 select-none">
            {data.eyebrow}
          </div>

          {/* MAIN HEADING */}
          <h1 className="leading-[1.14] tracking-tight mb-4">
            <span className="text-5xl block text-text-primary font-extrabold">
              {renderLine1(line1)}{" "}
              {tcLogo ? (
                <span
                  className="inline-flex items-center -ml-3 -mt-5 align-middle -translate-y-0.5 select-none"
                  title="Terms & Conditions Applied"
                >
                  <Image
                    src={tcLogo}
                    alt="Terms & Conditions Applied"
                    width={25}
                    height={25}
                    className="h-5 w-5 object-contain inline-block"
                  />
                </span>
              ) : line3 ? (
                <span className="text-xs font-medium text-text-secondary tracking-normal align-middle">
                  {line3}
                </span>
              ) : null}
            </span>
          </h1>

          {/* MAIN DESCRIPTION */}
          {/* {data.description && (
            <div className="w-full mb-6">
              <p className="w-full text-sm xl:text-base text-text-secondary leading-relaxed max-w-lg">
                {data.description}
              </p>
            </div>
          )} */}

          {/* STAFF EXPERIENCE */}
          {/* {data.staffExperienceTitle && (
            <div className="mb-6 max-w-lg rounded-2xl bg-surface-secondary/80 border border-border/60 p-4">
              <h3 className="text-sm xl:text-base font-bold text-text-primary mb-1.5">
                {data.staffExperienceTitle}
              </h3>

              {data.staffExperienceDescription && (
                <p className="text-xs xl:text-sm text-text-secondary leading-relaxed">
                  {data.staffExperienceDescription}
                </p>
              )}
            </div>
          )} */}

          {/* SLIDER TEXT DETAILS */}
          <div className="w-full mb-6">
            <h2
              key={`desktop-title-${activeTextIdx}`}
              className="text-3xl text-primary font-black transition-all duration-500"
            >
              {activeSliderText.titleLine2 || line2}
            </h2>

            {activeSliderText.description && (
              <p
                key={`desktop-description-${activeTextIdx}`}
                className="w-full mt-2 text-sm xl:text-base text-text-secondary leading-relaxed max-w-lg"
              >
                {activeSliderText.description}
              </p>
            )}
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 xl:gap-4 mb-8">
            <Link
              href={data.primaryButton?.href || "/offer"}
              onClick={scrollToBooking}
              className="px-5 py-3 xl:px-6 xl:py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-xs xl:text-sm inline-flex items-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-[0.98] group"
            >
              <span>
                {data.primaryButton?.label || "Book a Bus"}
              </span>
            </Link>

            <Link
              href={data.secondaryButton?.href || "#fleets"}
              onClick={scrollToFleet}
              className="text-primary border border-primary/50 hover:border-primary-hover hover:text-primary-hover px-5 py-3 xl:px-6 xl:py-3.5 rounded-xl font-semibold text-xs xl:text-sm inline-flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {data.secondaryButton?.label || "Explore Fleet"}
              </span>
            </Link>
          </div>

          {/* TRUST STATISTICS */}
          <div className="flex flex-wrap items-center gap-6 xl:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-xl xl:text-2xl font-extrabold text-text-primary tracking-tight">
                  {stat.value}
                </div>

                <div className="text-[11px] xl:text-xs font-medium text-text-muted mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: BUS IMAGE (70%) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">

          {/* IMAGE CONTAINER */}
          <div className="w-full rounded-3xl xl:rounded-[36px] bg-surface-muted p-4 sm:p-6 xl:p-8 border border-border shadow-xs group">
            <div className="relative w-full">
              <HeroImageSlider
                slides={heroSlides}
                currentIndex={currentSlideIndex}
                onIndexChange={setCurrentSlideIndex}
              />
            </div>
            {/* VEHICLE TITLE BELOW IMAGE CONTAINER */}
            <div className="w-full mt-3 pointer-events-none">
              <div className="grid grid-cols-1">
                {heroSlides.map((item, idx) => {
                  if (!item.titleLine1 || !item.titleLine1.trim()) {
                    return null;
                  }

                  return (
                    <div
                      key={idx}
                      className={`col-start-1 row-start-1 inline-flex items-center gap-2 sm:gap-2.5 transition-all duration-700 ease-in-out ${idx === activeSlideIdx
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                        }`}
                      aria-hidden={idx !== activeSlideIdx}
                    >
                      <span className="text-xl text-primary font-extrabold tracking-tight text-center truncate">
                        {item.titleLine1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE COMPOSITION */}
      <div className="flex flex-col lg:hidden items-start text-left space-y-4 sm:space-y-5">

        {/* EYEBROW */}
        <div className="inline-block px-3.5 py-1.5 rounded-full bg-surface-secondary text-[11px] font-bold tracking-wider text-text-secondary uppercase select-none">
          {data.eyebrow}
        </div>

        {/* MAIN HEADING */}
        <h1 className="text-4xl font-black leading-[1.14] tracking-tight">
          <span className="block text-text-primary font-extrabold">
            {renderLine1(line1)}{" "}
            {tcLogo ? (
              <span
                className="inline-flex items-center -ml-2 -mt-2 align-middle -translate-y-0.5 select-none"
                title="Terms & Conditions Applied"
              >
                <Image
                  src={tcLogo}
                  alt="Terms & Conditions Applied"
                  width={24}
                  height={24}
                  className="h-4 w-4 object-contain inline-block"
                />
              </span>
            ) : line3 ? (
              <span className="text-xs sm:text-sm font-medium text-text-secondary tracking-normal align-middle ml-1.5">
                {line3}
              </span>
            ) : null}
          </span>
        </h1>

        {/* MAIN DESCRIPTION */}
        {/* {data.description && (
          <div className="w-full mt-0">
            <p className="w-full text-base text-text-secondary leading-relaxed max-w-lg">
              {data.description}
            </p>
          </div>
        )} */}

        {/* STAFF EXPERIENCE */}
        {/* {data.staffExperienceTitle && (
          <div className="w-full rounded-2xl bg-surface-secondary/80 border border-border/60 p-4">
            <h3 className="text-sm font-bold text-text-primary mb-1.5">
              {data.staffExperienceTitle}
            </h3>

            {data.staffExperienceDescription && (
              <p className="text-xs text-text-secondary leading-relaxed">
                {data.staffExperienceDescription}
              </p>
            )}
          </div>
        )} */}

        {/* SLIDER TEXT DETAILS */}
        <div className="w-full mt-0">
          <h2
            key={`mobile-title-${activeTextIdx}`}
            className="text-2xl text-primary font-black transition-all duration-500"
          >
            {activeSliderText.titleLine2 || line2}
          </h2>

          {activeSliderText.description && (
            <p
              key={`mobile-description-${activeTextIdx}`}
              className="w-full mt-2 text-base text-text-secondary leading-relaxed max-w-lg"
            >
              {activeSliderText.description}
            </p>
          )}
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-wrap items-center gap-4 w-full pt-1 pb-1">
          <Link
            href={data.primaryButton?.href || "/offer"}
            onClick={scrollToBooking}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-base inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
          >
            <span>
              {data.primaryButton?.label || "Book a Bus"}
            </span>
          </Link>

          <Link
            href={data.secondaryButton?.href || "#fleets"}
            onClick={scrollToFleet}
            className="text-primary border border-primary/50 hover:border-primary-hover hover:text-primary-hover w-full py-3.5 rounded-xl font-semibold text-sm xl:text-base inline-flex items-center gap-1.5 transition-colors group"
          >
            <span className="w-full text-center">
              {data.secondaryButton?.label || "Explore Fleet"}
            </span>
          </Link>
        </div>

        {/* BUS IMAGE */}
        <div className="w-full items-start">

          {/* IMAGE CONTAINER */}
          <div className="w-full rounded-2xl sm:rounded-3xl bg-surface-muted p-4 sm:p-5 my-2 border border-border shadow-xs group">
            <div className="relative w-full">
              <HeroImageSlider
                slides={heroSlides}
                currentIndex={currentSlideIndex}
                onIndexChange={setCurrentSlideIndex}
              />
            </div>
            {/* VEHICLE TITLE BELOW IMAGE CONTAINER */}
            <div className="w-full mt-4 pointer-events-none">
              <div className="grid grid-cols-1">
                {heroSlides.map((item, idx) => {
                  if (!item.titleLine1 || !item.titleLine1.trim()) {
                    return null;
                  }

                  return (
                    <div
                      key={idx}
                      className={`col-start-1 row-start-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md border border-white/70 dark:border-white/20 shadow-sm transition-all duration-700 ease-in-out ${idx === activeSlideIdx
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                        }`}
                      aria-hidden={idx !== activeSlideIdx}
                    >
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
                      <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight text-center truncate">
                        {item.titleLine1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* TRUST STATISTICS */}
        <div className="grid grid-cols-3 gap-3 w-full pt-3 pb-2 border-t border-border sm:border-0">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
                {stat.value}
              </div>

              <div className="text-[11px] sm:text-xs font-medium text-text-muted mt-0.5">
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