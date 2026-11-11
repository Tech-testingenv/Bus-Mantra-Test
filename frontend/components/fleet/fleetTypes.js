"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FleetCard from "./fleetCard";
import { fleetSectionData, fleetTypesData } from "@/data/data";

export default function FleetTypes({
  sectionData = fleetSectionData,
  fleets = fleetSectionData?.fleets || fleetTypesData,
  className = "",
  id = "fleets",
}) {
  const fleetList = sectionData?.fleets || fleets || [];
  const [databaseFleets, setDatabaseFleets] = useState(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  const displayedFleets = databaseFleets || fleetList;

  useEffect(() => {
    let active = true;
    fetch("/api/fleets")
      .then((response) => {
        if (!response.ok) throw new Error(`Fleet catalog returned ${response.status}.`);
        return response.json();
      })
      .then((rows) => {
        if (active && Array.isArray(rows)) {
          setDatabaseFleets(rows.map((fleet) => ({
            ...fleet,
            href: `/fleets/${fleet.slug}`,
            badge: fleet.isPopular ? "MOST POPULAR" : "CHARTER FLEET",
          })));
        }
      })
      .catch((error) => console.error("Fleet catalog load failed:", error));
    return () => {
      active = false;
    };
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, clientWidth } = scrollContainerRef.current;

    const cardWidth = clientWidth * 0.85 + 16;
    const slideIndex = Math.round(scrollLeft / cardWidth);

    setActiveSlide(
      Math.min(displayedFleets.length - 1, Math.max(0, slideIndex))
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
        className || "my-4 py-12 sm:my-6 sm:py-16 lg:py-20"
      }`}
    >
      {/* SECTION HEADER */}

      <div className="mb-6 w-full sm:mb-8 lg:mb-10">
        <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-8">

          {/* LEFT COLUMN: 70% */}

          <div className="flex w-full min-w-0 flex-col items-start text-left">
            {sectionData?.eyebrow && (
              <div className="mb-3.5 inline-block select-none rounded-full border border-border bg-primary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
                {sectionData.eyebrow}
              </div>
            )}

            <h2 className="text-3xl font-black leading-[1.12] tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              {sectionData?.heading || "Choose your bus."}
            </h2>

            <p className="mt-2 text-base font-normal leading-relaxed text-text-secondary sm:text-lg">
              {sectionData?.description ||
                "Comfortable coaches for every group size."}
            </p>
          </div>

          {/* RIGHT COLUMN: 30% BUTTON */}

          <div className="flex w-full items-center justify-start lg:-translate-y-16 lg:justify-end">

      <Link
        href="/fleet"
        className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#DD650D] px-4 text-sm font-semibold text-white shadow-sm shadow-[#DD650D]/20 transition-all duration-200 hover:bg-[#C75A0B] hover:shadow-md active:scale-[0.98] xl:px-5"
      >
        <span>View All Fleets</span>
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>

        </div>
      </div>

      {/* DESKTOP FLEET CARDS */}

      <div className="hidden items-stretch gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {displayedFleets.map((bus) => (
          <FleetCard key={bus.id} bus={bus} />
        ))}
      </div>

      {/* MOBILE FLEET CAROUSEL */}

      <div className="md:hidden">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 scrollbar-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {displayedFleets.map((bus) => (
            <FleetCard
              key={bus.id}
              bus={bus}
              className="w-[84vw] max-w-85 shrink-0 snap-center"
            />
          ))}
        </div>

        {/* CAROUSEL INDICATORS */}

        <div className="mt-5 flex items-center justify-center gap-1.5">
          {displayedFleets.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                activeSlide === idx
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-neutral-300 hover:bg-primary-hover"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}