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

    const { scrollLeft, clientWidth } =
      scrollContainerRef.current;

    const cardWidth = clientWidth * 0.85 + 16;
    const slideIndex = Math.round(scrollLeft / cardWidth);

    setActiveSlide(
      Math.min(
        fleetList.length - 1,
        Math.max(0, slideIndex)
      )
    );
  };

  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) return;

    const cardWidth =
      scrollContainerRef.current.clientWidth * 0.85 + 16;

    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    setActiveSlide(index);
  };

  return (
    <section
      id={id}
      className={`relative w-full ${
        className ||
        "my-4 py-12 sm:my-6 sm:py-16 lg:py-20"
      }`}
    >
      {/* SECTION HEADER */}

      <div className="mb-6 text-left sm:mb-8 lg:mb-10">
        {sectionData?.eyebrow && (
          <div className="mb-3.5 inline-block select-none rounded-full border border-brand-blue/10 bg-[#eef3ff] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-blue">
            {sectionData.eyebrow}
          </div>
        )}

        <h2 className="text-3xl font-black leading-[1.12] tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
          {sectionData?.heading || "Choose your bus."}
        </h2>

        <p className="mt-2 text-base font-normal leading-relaxed text-neutral-500 sm:text-lg">
          {sectionData?.description ||
            "Comfortable coaches for every group size."}
        </p>

      </div>

      {/* DESKTOP FLEET CARDS */}

      <div className="hidden items-stretch gap-6 md:grid md:grid-cols-3 lg:gap-8">
        {fleetList.map((bus) => (
          <FleetCard key={bus.id} bus={bus} />
        ))}
      </div>

      {/* MOBILE FLEET CAROUSEL */}

      <div className="md:hidden">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="
            -mx-4
            flex
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            px-4
            pb-2
            sm:-mx-6
            sm:px-6
            scrollbar-none
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {fleetList.map((bus) => (
            <FleetCard
              key={bus.id}
              bus={bus}
              className="w-[84vw] max-w-85 shrink-0 snap-center"
            />
          ))}
        </div>

        {/* CAROUSEL INDICATORS */}

        <div className="mt-5 flex items-center justify-center gap-1.5">
          {fleetList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                activeSlide === idx
                  ? "w-6 bg-brand-blue"
                  : "w-1.5 bg-neutral-300 hover:bg-brand-yellow"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}