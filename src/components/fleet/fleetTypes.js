"use client";

import { useState, useRef } from "react";
import FleetCard from "./fleetCard";
import { fleetSectionData, fleetTypesData } from "@/data/data";

export default function FleetTypes({
  sectionData = fleetSectionData,
  fleets = fleetSectionData?.fleets || fleetTypesData,
  className = "",
  id = "fleets",
}) {
  const fleetList = sectionData?.fleets || fleets || [];
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const cardWidth = clientWidth * 0.85 + 16;
    const slideIndex = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(fleetList.length - 1, Math.max(0, slideIndex)));
  };

  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.clientWidth * 0.85 + 16;
    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveSlide(index);
  };

  return (
    <section id={id} className={`relative w-full ${className || "py-12 sm:py-16 lg:py-20 my-4 sm:my-6"}`}>
      {/* ========================================================= */}
      {/* SECTION HEADER: Left-aligned clean typography             */}
      {/* ========================================================= */}
      <div className="text-left mb-6 sm:mb-8 lg:mb-10">
        {sectionData?.eyebrow && (
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-neutral-100 text-[11px] font-bold tracking-wider text-neutral-600 uppercase mb-3.5 select-none">
            {sectionData.eyebrow}
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-[1.12]">
          {sectionData?.heading || "Choose your bus."}
        </h2>
        <p className="text-base sm:text-lg text-neutral-500 font-normal mt-2 leading-relaxed">
          {sectionData?.description || "Comfortable coaches for every group size."}
        </p>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP Fleet CARDS (Horizontal row of 3) (>= 768px)       */}
      {/* ========================================================= */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {fleetList.map((bus) => (
          <FleetCard key={bus.id} bus={bus} />
        ))}
      </div>

      {/* ========================================================= */}
      {/* MOBILE Fleet CAROUSEL (< 768px)                           */}
      {/* Horizontal swipeable showing 1 full card + peek of next   */}
      {/* ========================================================= */}
      <div className="md:hidden">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {fleetList.map((bus) => (
            <FleetCard
              key={bus.id}
              bus={bus}
              className="w-[84vw] max-w-85 shrink-0 snap-center"
            />
          ))}
        </div>

        {/* Subtle Pagination Indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {fleetList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === idx
                  ? "w-6 bg-brand-orange"
                  : "w-1.5 bg-neutral-300"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
