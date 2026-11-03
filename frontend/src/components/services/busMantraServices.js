"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Map,
  Calendar,
  GraduationCap,
  Plane,
  Hotel,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  Users,
  Heart,
  Palmtree,
  Flower2,
  Bike,
} from "lucide-react";
import {
  servicesSectionData,
  servicesData,
} from "@/data/data";

const ICON_MAP = {
  briefcase: Briefcase,
  map: Map,
  calendar: Calendar,
  "graduation-cap": GraduationCap,
  plane: Plane,
  hotel: Hotel,
  globe: Globe,
  users: Users,
  heart: Heart,
  palmtree: Palmtree,
  flower: Flower2,
  bike: Bike,
};

const SERVICE_SLUG_MAP = {
  "Inbound Trips": "group-tours",
  "Corporate Trips": "corporate-travel",
  "MICE / Conference Trips": "corporate-travel",
  "School / College Trips": "school-trips",
  "Destination Wedding": "events-weddings",
  "Airport / Railway Station Pick-Up & Drop-Off": "airport-transfers",
  "Leisure Trips": "group-tours",
  "Meditation Trips": "group-tours",
  "Cycling Trips": "group-tours",
  // Legacy names for backward compatibility
  Corporate: "corporate-travel",
  "Corporate Travel": "corporate-travel",
  "Group Tours": "group-tours",
  Events: "events-weddings",
  "Events & Weddings": "events-weddings",
  "School Trips": "school-trips",
  "Airport Pick Up & Transfer": "airport-transfers",
  "Airport Transfers": "airport-transfers",
  "Hotel Pick Up & Transfer": "hotel-transfers",
  "Hotel Transfers": "hotel-transfers",
};

function getServiceHref(item) {
  if (item.href) {
    return item.href;
  }

  if (item.slug) {
    return `/services/${item.slug}`;
  }

  if (SERVICE_SLUG_MAP[item.title]) {
    return `/services/${SERVICE_SLUG_MAP[item.title]}`;
  }

  if (item.id && SERVICE_SLUG_MAP[item.id]) {
    return `/services/${SERVICE_SLUG_MAP[item.id]}`;
  }

  return "/services";
}

export default function BusMantraServices({
  sectionData = servicesSectionData,
  services = servicesData,
}) {
  const items =
    sectionData?.services ||
    sectionData?.useCases ||
    services ||
    [];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);
  const totalSlides = items.length;

  const handleNext = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleSelectSlide = useCallback((index) => {
    setActiveSlide(index);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX > 45) {
      handlePrev();
    } else if (deltaX < -45) {
      handleNext();
    }
    touchStartXRef.current = null;
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      id="services"
      className="relative my-4 w-full py-12 sm:my-6 sm:py-16 lg:py-20"
    >
      {/* SECTION HEADER */}
      <div className="mb-8 max-w-3xl sm:mb-12">
        <span className="mb-2.5 inline-block select-none rounded-full border border-border bg-primary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white sm:mb-3 sm:text-xs">
          {sectionData?.eyebrow || "SERVICES"}
        </span>

        <h2 className="text-3xl font-extrabold leading-[1.14] tracking-tight text-text-primary sm:text-4xl lg:text-[42px]">
          {sectionData?.heading || "Travel solutions for every group."}
        </h2>

        {sectionData?.description && (
          <p className="mt-3 text-sm font-normal leading-relaxed text-text-secondary sm:text-base">
            {sectionData.description}
          </p>
        )}
      </div>

      {/* 50-50 TWO COLUMN CAROUSEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
        {/* Left Column (50%): Service Pills, Small Write-up, Details Button */}
        <div className="flex flex-col items-start justify-center text-left order-2 lg:order-1">
          {/* Service Pills Navigation */}
          <div className="w-full mb-6 sm:mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {items.map((item, idx) => {
                const IconComponent = ICON_MAP[item.icon] || Briefcase;
                const isActive = idx === activeSlide;

                return (
                  <button
                    key={item.id || item.slug || idx}
                    type="button"
                    onClick={() => handleSelectSlide(idx)}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-300 cursor-pointer select-none text-left ${isActive
                      ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                      : "bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-surface-muted border border-border"
                      }`}
                  >
                    <IconComponent
                      className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-primary-foreground" : "text-primary"
                        }`}
                    />
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Service Content Carousel */}
          <div className="grid grid-cols-1 w-full min-h-43.75 sm:min-h-40">
            {items.map((item, idx) => {
              const isActive = idx === activeSlide;
              const href = getServiceHref(item);

              return (
                <div
                  key={item.id || item.slug || idx}
                  className={`col-start-1 row-start-1 flex flex-col items-start transition-all duration-700 ease-in-out ${isActive
                    ? "opacity-100 translate-y-0 pointer-events-auto z-1"
                    : "opacity-0 translate-y-3 pointer-events-none z-0"
                    }`}
                  aria-hidden={!isActive}
                >
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-text-primary tracking-tight mb-3">
                    {item.title}
                  </h3>

                  {/* Small Write-Up / Description */}
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl mb-6">
                    {item.description}
                  </p>

                  {/* Button for Details */}
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
                  >
                    <span>{item.ctaLabel || "View Service Details"}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Carousel Navigation Bar (Prev / Next Arrows + Indicators) */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border w-full">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous service"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-secondary hover:bg-surface-muted text-text-primary hover:border-primary/40 transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next service"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-secondary hover:bg-surface-muted text-text-primary hover:border-primary/40 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Slide Dots */}
            <div className="flex items-center gap-1.5">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === idx
                    ? "w-7 bg-primary"
                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="ml-auto text-xs font-bold text-text-muted tracking-wider select-none">
              <span className="text-primary font-black">
                {String(activeSlide + 1).padStart(2, "0")}
              </span>
              {" / "}
              <span>{String(items.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        {/* Right Column (50%): Service Image Display */}
        <div className="w-full order-1 lg:order-2">
          <div
            className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-3xl overflow-hidden border border-border shadow-md bg-surface-muted group select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {items.map((item, idx) => {
              const isActive = idx === activeSlide;

              return (
                <div
                  key={item.id || item.slug || idx}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${isActive
                    ? "opacity-100 scale-100 z-1 pointer-events-auto"
                    : "opacity-0 scale-[1.03] z-0 pointer-events-none"
                    }`}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={item.image || "/images/services/corporate-india.jpg"}
                    alt={item.title || "Bus Mantra Group Service"}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Gradient Shadow at Bottom */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Slide Counter on Image Bottom */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 pointer-events-none">
                    <span className="text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                      {String(idx + 1).padStart(2, "0")} /{" "}
                      {String(items.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Overlay Navigation Arrows on Image */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-opacity duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer shadow-md"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.3]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-opacity duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer shadow-md"
            >
              <ChevronRight className="h-5 w-5 stroke-[2.3]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}