"use client";

import { useState, useRef, useEffect } from "react";
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
  const fallbackItems = sectionData?.destinations || destinations || [];
  const [databaseDestinations, setDatabaseDestinations] = useState(null);
  const items = databaseDestinations || fallbackItems;

  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    let active = true;
    fetch("/api/destinations")
      .then((response) => {
        if (!response.ok) throw new Error(`Destination catalog returned ${response.status}.`);
        return response.json();
      })
      .then((rows) => {
        if (active && Array.isArray(rows)) {
          setDatabaseDestinations(rows.map((destination) => ({
            ...destination,
            id: destination.slug,
            image: destination.gallery?.[0] || "/images/destinations/agra-fort.jpg",
            href: `/destinations/${destination.slug}`,
            ctaText: `Fleet to ${destination.name}`,
          })));
        }
      })
      .catch((error) => console.error("Destination catalog load failed:", error));
    return () => {
      active = false;
    };
  }, []);

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
      {/* SECTION HEADER (70:30) */}

      <div className="mb-8 w-full sm:mb-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-6">

          {/* LEFT COLUMN: 70% */}

          <div className="flex w-full min-w-0 flex-col items-start text-left">

            {/* EYEBROW */}

            <span className="mb-2.5 inline-block select-none rounded-full border border-border bg-primary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white sm:mb-3 sm:text-xs">
              {sectionData?.eyebrow || "DESTINATIONS"}
            </span>

            {/* HEADING */}

            <h2 className="w-full max-w-none text-3xl font-extrabold leading-[1.14] tracking-tight text-text-primary sm:text-4xl lg:text-[42px]">
              {sectionData?.heading || "Where will your group go?"}
            </h2>

            {/* DESCRIPTION */}

            <p className="mt-2 w-full text-sm font-normal leading-relaxed text-text-secondary sm:mt-2.5 sm:text-base">
              {sectionData?.description ||
                "Explore popular destinations for your next group journey."}
            </p>
          </div>

          {/* RIGHT COLUMN: 30% */}

          <div className="flex w-full items-center justify-start lg:translate-y-18 lg:justify-end">
            <Link
              href={sectionData?.headerCta?.href || "#booking-form"}
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#DD650D] px-4 text-sm font-semibold text-white shadow-sm shadow-[#DD650D]/20 transition-all duration-200 hover:bg-[#C75A0B] hover:shadow-md active:scale-[0.98] xl:px-5"
            >
              <span>
                {sectionData?.headerCta?.label ||
                  "View All Destinations"}
              </span>

              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* DESTINATION CARDS */}

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
                border-border
                bg-white
                shadow-xs
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/40
                hover:shadow-md
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-focus-ring
                sm:w-[320px]
                lg:h-full
                lg:w-full
                lg:max-w-none
                lg:shrink
                lg:snap-align-none
              "
            >
              {/* IMAGE */}

              <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-[20px] bg-surface-muted">
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
                  <div className="flex h-full w-full items-center justify-center text-sm text-text-muted">
                    Image unavailable
                  </div>
                )}

                {/* SUBTLE IMAGE OVERLAY */}

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent" />

                {/* ACCENT LINE */}

                <div className="absolute bottom-0 left-0 h-1 w-16 bg-primary transition-all duration-300 group-hover:w-24" />
              </div>

              {/* CARD CONTENT */}

              <div className="flex flex-1 flex-col justify-between bg-white p-5 sm:p-6 lg:p-7">
                <div>

                  {/* ROUTE */}

                  <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                    <Navigation
                      className="h-3.5 w-3.5 shrink-0 text-primary"
                      strokeWidth={2.2}
                    />

                    <span>{dest.route}</span>
                  </div>

                  {/* DESTINATION */}

                  <h3 className="mb-1.5 text-xl font-bold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-primary sm:text-[22px]">
                    {dest.name}
                  </h3>

                  {/* DESCRIPTION */}

                  <p className="text-sm font-normal leading-relaxed text-text-secondary">
                    {dest.description}
                  </p>
                </div>

                {/* CTA */}

                <div>
                  <div className="my-4 border-t border-border" />

                  <div className="flex items-center justify-between gap-3 text-sm font-semibold text-text-primary">
                    <span className="transition-colors duration-200 group-hover:text-primary">
                      {ctaLabel}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRight
                        className="
                          h-4
                          w-4
                          transition-all
                          duration-200
                          group-hover:translate-x-0.5
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

      {/* MOBILE CAROUSEL INDICATORS */}

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
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-neutral-300 hover:bg-primary-hover"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}