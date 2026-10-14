"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, ArrowRight } from "lucide-react";
import {
  destinationsSectionData,
  popularDestinationsData,
} from "@/data/data";

export default function PopularDestinations({
  sectionData = destinationsSectionData,
  destinations = popularDestinationsData,
}) {
  const items = sectionData?.destinations || destinations || [];

  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  /* =========================================================
     MOBILE CAROUSEL
  ========================================================= */

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, clientWidth } = scrollContainerRef.current;

    const cardWidth = clientWidth * 0.82 + 16;
    const slideIndex = Math.round(scrollLeft / cardWidth);

    setActiveSlide(
      Math.min(items.length - 1, Math.max(0, slideIndex))
    );
  };

  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) return;

    const cardWidth =
      scrollContainerRef.current.clientWidth * 0.82 + 16;

    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    setActiveSlide(index);
  };

  return (
    <section
      id="destinations"
      className="relative my-4 w-full py-12 sm:my-6 sm:py-16 lg:py-20"
    >
      {/* =========================================================
          SECTION HEADER
      ========================================================= */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-12 sm:gap-6 md:flex-row md:items-end">
        <div className="flex max-w-2xl flex-col items-start text-left">
          <span className="mb-2.5 select-none text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue sm:mb-3 sm:text-xs">
            {sectionData?.eyebrow || "DESTINATIONS"}
          </span>

          <h2 className="text-3xl font-extrabold leading-[1.14] tracking-tight text-neutral-900 sm:text-4xl lg:text-[42px]">
            {sectionData?.heading || "Where will your group go?"}
          </h2>

          <p className="mt-2 text-sm font-normal leading-relaxed text-neutral-500 sm:mt-2.5 sm:text-base">
            {sectionData?.description ||
              "Explore popular destinations for your next group journey."}
          </p>
        </div>

        {/* View All */}
        <div className="flex shrink-0 items-center md:pb-1">
          <Link
            href={sectionData?.headerCta?.href || "#booking-form"}
            className="group/link inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-brand-blue transition-colors duration-200 hover:text-brand-orange sm:text-base"
          >
            <span>
              {sectionData?.headerCta?.label ||
                "View All Destinations"}
            </span>

            <ArrowRight
              className="h-4 w-4 text-brand-orange transition-transform duration-200 group-hover/link:translate-x-1"
              strokeWidth={2.2}
            />
          </Link>
        </div>
      </div>

      {/* =========================================================
          DESTINATION CARDS

          Desktop:
          3-column grid

          Mobile / Tablet:
          Horizontal carousel
      ========================================================= */}

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="
          flex
          gap-6
          overflow-x-auto
          snap-x
          snap-mandatory
          pb-2
          -mx-4
          px-4
          sm:-mx-6
          sm:px-6
          sm:scroll-pl-6
          scroll-pl-4
          lg:mx-0
          lg:grid
          lg:grid-cols-3
          lg:auto-rows-fr
          lg:overflow-visible
          lg:snap-none
          lg:px-0
          lg:pb-0
          scrollbar-none
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((dest) => {
          const rawCta =
            dest.ctaText ||
            dest.cta ||
            `Fleet to ${dest.name}`;

          const ctaLabel = rawCta.replace(/\s*→$/, "");

          return (
            <Link
              key={dest.id || dest.name}
              href={dest.href || "#booking-form"}
              className="
                group
                flex
                w-[82vw]
                max-w-85
                shrink-0
                snap-start
                flex-col
                justify-between
                overflow-hidden
                rounded-[20px]
                border
                border-neutral-200
                bg-white
                shadow-[0_2px_8px_rgba(18,57,153,0.03)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-brand-blue/30
                hover:shadow-[0_12px_32px_rgba(18,57,153,0.09)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-brand-blue
                sm:w-[320px]
                lg:h-full
                lg:w-full
                lg:max-w-none
                lg:shrink
                lg:snap-align-none
              "
            >
              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[20px] bg-neutral-100">
                {dest?.image ? (
                  <Image
                    src={dest.image}
                    alt={`${dest.name} - ${dest.description}`}
                    fill
                    sizes="
                      (max-width: 640px) 85vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
                    className="
                      select-none
                      object-cover
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:scale-105
                    "
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
                    Image unavailable
                  </div>
                )}

                {/* Subtle image overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                {/* Yellow accent */}
                <div className="absolute bottom-0 left-0 h-1 w-16 bg-brand-yellow transition-all duration-300 group-hover:w-24" />
              </div>

              {/* =================================================
                  CARD CONTENT
              ================================================= */}

              <div className="flex flex-1 flex-col justify-between bg-white p-5 sm:p-6 lg:p-7">
                <div>
                  {/* Route */}
                  <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-brand-blue">
                    <Navigation
                      className="h-3.5 w-3.5 shrink-0 text-brand-orange"
                      strokeWidth={2.2}
                    />

                    <span>{dest.route}</span>
                  </div>

                  {/* Destination */}
                  <h3 className="mb-1.5 text-xl font-bold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-brand-blue sm:text-[22px]">
                    {dest.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-normal leading-relaxed text-neutral-500">
                    {dest.description}
                  </p>
                </div>

                {/* =================================================
                    CTA
                ================================================= */}

                <div>
                  <div className="my-4 border-t border-neutral-100" />

                  <div className="flex items-center justify-between gap-3 text-sm font-semibold text-neutral-900">
                    <span className="transition-colors duration-200 group-hover:text-brand-blue">
                      {ctaLabel}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-yellow transition-all duration-300 group-hover:bg-brand-blue">
                      <ArrowRight
                        className="
                          h-4
                          w-4
                          text-brand-blue
                          transition-all
                          duration-200
                          group-hover:translate-x-0.5
                          group-hover:text-white
                        "
                        strokeWidth={2.2}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* =========================================================
          MOBILE CAROUSEL INDICATORS
      ========================================================= */}

      <div className="mt-5 flex items-center justify-center gap-1.5 lg:hidden">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to destination ${index + 1}`}
            className={`
              h-1.5
              cursor-pointer
              rounded-full
              transition-all
              duration-300
              ${
                activeSlide === index
                  ? "w-6 bg-brand-blue"
                  : "w-1.5 bg-neutral-300 hover:bg-brand-yellow"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}