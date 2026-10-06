"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, ArrowRight } from "lucide-react";
import { destinationsSectionData, popularDestinationsData } from "@/data/data";

export default function PopularDestinations({
  sectionData = destinationsSectionData,
  destinations = popularDestinationsData,
}) {
  const items = sectionData?.destinations || destinations || [];
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const cardWidth = clientWidth * 0.82 + 16;
    const slideIndex = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(items.length - 1, Math.max(0, slideIndex)));
  };

  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.clientWidth * 0.82 + 16;
    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveSlide(index);
  };

  return (
    <section id="destinations" className="relative w-full py-12 sm:py-16 lg:py-20 my-4 sm:my-6">
      {/* ========================================================= */}
      {/* SECTION HEADER: Spacious & clean                          */}
      {/* Top-left: Eyebrow + Main Heading + Supporting Text        */}
      {/* Top-right: View All Destinations with orange arrow        */}
      {/* ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="flex flex-col items-start text-left max-w-2xl">
          <span className="text-[11px] sm:text-xs font-bold tracking-wider text-neutral-400 uppercase mb-2.5 sm:mb-3 select-none">
            {sectionData?.eyebrow || "DESTINATIONS"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-neutral-900 tracking-tight leading-[1.14]">
            {sectionData?.heading || "Where will your group go?"}
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed mt-2 sm:mt-2.5">
            {sectionData?.description ||
              "Explore popular destinations for your next group journey."}
          </p>
        </div>

        <div className="flex items-center md:pb-1 shrink-0">
          <Link
            href={sectionData?.headerCta?.href || "#booking-form"}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-neutral-900 hover:text-brand-orange transition-colors group/link cursor-pointer"
          >
            <span>{sectionData?.headerCta?.label || "View All Destinations"}</span>
            <ArrowRight className="w-4 h-4 text-brand-orange transition-transform duration-200 group-hover/link:translate-x-1 stroke-[2.2]" />
          </Link>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESTINATION CARDS CONTAINER                               */}
      {/* Desktop (lg): 4 equal cards in a single horizontal row     */}
      {/* Mobile/Tablet (< lg): Horizontal swipeable carousel        */}
      {/* ========================================================= */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-4 sm:gap-5 lg:gap-6 pb-2 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scroll-pl-4 sm:scroll-pl-6 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((dest) => {
          // Format CTA label (strip trailing arrow character if provided in text)
          const rawCta = dest.ctaText || dest.cta || `Fleet to ${dest.name}`;
          const ctaLabel = rawCta.replace(/\s*→$/, "");

          return (
            <Link
              key={dest.id || dest.name}
              href={dest.href || "#booking-form"}
              className="group w-[82vw] max-w-85 sm:w-[320px] lg:w-auto shrink-0 lg:shrink snap-start lg:snap-align-none bg-white rounded-[20px] border border-neutral-200/80 hover:border-neutral-300 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              {/* Top: Large destination photography */}
              <div className="relative w-full aspect-16/11 overflow-hidden rounded-t-[20px] bg-neutral-100">
                <Image
                  src={dest.image}
                  alt={`${dest.name} - ${dest.description}`}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 select-none"
                />
              </div>

              {/* Card Body: Route, Destination, Description, Divider, CTA */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  {/* Small orange route information with minimal direction icon */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-orange mb-2">
                    <Navigation className="w-3.5 h-3.5 text-brand-orange stroke-[2.2] shrink-0" />
                    <span>{dest.route}</span>
                  </div>

                  {/* Destination Name */}
                  <h3 className="text-xl sm:text-[22px] font-bold text-neutral-900 tracking-tight mb-1.5">
                    {dest.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-500 font-normal leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div>
                  {/* Subtle horizontal divider */}
                  <div className="my-4.5 border-t border-neutral-100" />

                  {/* Bottom: Fleet to [Destination] + Orange Arrow */}
                  <div className="flex items-center justify-between text-sm font-semibold text-neutral-900">
                    <span>{ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 text-brand-orange transition-transform duration-200 group-hover:translate-x-1.5 stroke-[2.2]" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* MOBILE CAROUSEL INDICATOR DOTS                            */}
      {/* Visible only on mobile/tablet to signal multi-card swipe   */}
      {/* ========================================================= */}
      <div className="flex lg:hidden items-center justify-center gap-1.5 mt-5">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to destination ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === index ? "w-6 bg-brand-orange" : "w-1.5 bg-neutral-300"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
