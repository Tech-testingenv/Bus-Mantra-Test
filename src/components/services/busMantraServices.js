"use client";

import { useState, useRef } from "react";
import {
  Briefcase,
  Map,
  Calendar,
  GraduationCap,
  Plane,
  Hotel,
} from "lucide-react";
import { servicesSectionData, servicesData } from "@/data/data";

const ICON_MAP = {
  briefcase: Briefcase,
  map: Map,
  calendar: Calendar,
  "graduation-cap": GraduationCap,
  plane: Plane,
  hotel: Hotel,
};

export default function BusMantraServices({
  sectionData = servicesSectionData,
  services = servicesData,
}) {
  const items = sectionData?.services || sectionData?.useCases || services || [];
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
    <section id="services" className="relative w-full py-12 sm:py-16 lg:py-20 my-4 sm:my-6">
      {/* ========================================================= */}
      {/* SECTION HEADER: Two-column layout on desktop              */}
      {/* Left: Eyebrow + Large Heading | Right: Supporting text     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-end mb-10 sm:mb-14">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <span className="text-[11px] sm:text-xs font-bold tracking-wider text-neutral-400 uppercase mb-2.5 sm:mb-3 select-none">
            {sectionData?.eyebrow || "SERVICES"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-neutral-900 tracking-tight leading-[1.14]">
            {sectionData?.heading || "Travel solutions for every group."}
          </h2>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 flex flex-col justify-end text-left lg:pb-1">
          <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed max-w-lg">
            {sectionData?.description ||
              "From business travel to airport transfers, we make group transportation simple, comfortable and reliable."}
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP & TABLET 3-COLUMN × 2-ROW GRID (>= 640px)         */}
      {/* ========================================================= */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {items.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Briefcase;

          return (
            <div
              key={item.id || item.number}
              className="group bg-white rounded-[20px] border border-neutral-200/80 hover:border-brand-orange/30 p-7 sm:p-8 flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-200"
            >
              <div>
                {/* Number Badge with subtle orange accent dot */}
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#f0f2f5] text-neutral-700 text-xs font-bold tracking-wide select-none">
                    {item.number}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/40 group-hover:bg-brand-orange transition-colors" />
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-2.5 group-hover:text-neutral-950 transition-colors">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-sm text-neutral-500 leading-relaxed font-normal mb-8">
                  {item.description}
                </p>
              </div>

              {/* Bottom Label + Line Icon */}
              <div className="mt-auto pt-4 flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-neutral-600 border-t border-neutral-100/80">
                <IconComponent className="w-4 h-4 text-brand-orange shrink-0 stroke-[1.8]" />
                <span>{item.bottomLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* MOBILE HORIZONTAL SWIPEABLE CAROUSEL (< 640px)            */}
      {/* Shows approximately 1 full card and part of next card     */}
      {/* ========================================================= */}
      <div className="sm:hidden">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => {
            const IconComponent = ICON_MAP[item.icon] || Briefcase;

            return (
              <div
                key={item.id || item.number}
                className="w-[82vw] max-w-85 shrink-0 snap-center bg-white rounded-[20px] border border-neutral-200/80 p-6 sm:p-7 flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
              >
                <div>
                  {/* Number Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#f0f2f5] text-neutral-700 text-xs font-bold tracking-wide select-none">
                      {item.number}
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/60" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-2">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs text-neutral-500 leading-relaxed font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Label + Line Icon */}
                <div className="mt-auto pt-3.5 flex items-center gap-2 text-xs font-medium text-neutral-600 border-t border-neutral-100/80">
                  <IconComponent className="w-3.5 h-3.5 text-brand-orange shrink-0 stroke-[1.8]" />
                  <span>{item.bottomLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle Pagination Indicators (6 dots) */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx ? "w-6 bg-brand-orange" : "w-1.5 bg-neutral-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
