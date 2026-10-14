"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Briefcase,
  Map,
  Calendar,
  GraduationCap,
  Plane,
  Hotel,
  ArrowRight,
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
};

const SERVICE_SLUG_MAP = {
  "Corporate Travel": "corporate-travel",
  "Group Tours": "group-tours",
  Events: "events-weddings",
  "Events & Weddings": "events-weddings",
  "School Trips": "school-trips",
  "Airport Pick Up & Transfer": "airport-transfers",
  "Airport Transfers": "airport-transfers",
  "Hotel Pick Up & Transfer": "hotel-pick-up-transfer",
  "Hotel Transfers": "hotel-pick-up-transfer",
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

  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) {
      return;
    }

    const { scrollLeft, clientWidth } =
      scrollContainerRef.current;

    const cardWidth = clientWidth * 0.82 + 16;

    const slideIndex = Math.round(
      scrollLeft / cardWidth
    );

    setActiveSlide(
      Math.min(
        items.length - 1,
        Math.max(0, slideIndex)
      )
    );
  };

  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) {
      return;
    }

    const cardWidth =
      scrollContainerRef.current.clientWidth * 0.82 +
      16;

    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    setActiveSlide(index);
  };

  return (
    <section
      id="services"
      className="relative my-4 w-full py-12 sm:my-6 sm:py-16 lg:py-20"
    >
      {/* SECTION HEADER */}

      <div className="mb-10 grid grid-cols-1 items-end gap-4 sm:mb-14 sm:gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col items-start text-left lg:col-span-7">
          <span className="mb-2.5 select-none text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue sm:mb-3 sm:text-xs">
            {sectionData?.eyebrow || "SERVICES"}
          </span>

          <h2 className="text-3xl font-extrabold leading-[1.14] tracking-tight text-neutral-900 sm:text-4xl lg:text-[42px]">
            {sectionData?.heading ||
              "Travel solutions for every group."}
          </h2>
        </div>

        <div className="flex flex-col justify-end text-left lg:col-span-5 lg:pb-1">
          <p className="max-w-lg text-sm font-normal leading-relaxed text-neutral-500 sm:text-base">
            {sectionData?.description ||
              "From business travel to airport transfers, we make group transportation simple, comfortable and reliable."}
          </p>
        </div>
      </div>

      {/* DESKTOP AND TABLET SERVICE GRID */}

      <div className="hidden items-stretch gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const IconComponent =
            ICON_MAP[item.icon] || Briefcase;

          const href = getServiceHref(item);

          return (
            <Link
              key={
                item.id ||
                item.slug ||
                item.number ||
                item.title
              }
              href={href}
              className="
                group
                relative
                flex
                flex-col
                justify-between
                overflow-hidden
                rounded-[20px]
                border
                border-neutral-200
                bg-white
                p-7
                shadow-[0_2px_10px_rgba(18,57,153,0.025)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-brand-blue/30
                hover:shadow-[0_12px_32px_rgba(18,57,153,0.09)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-brand-blue
                sm:p-8
              "
            >
              {/* Yellow top accent */}

              <div className="absolute left-0 top-0 h-1 w-12 bg-brand-yellow transition-all duration-300 group-hover:w-full" />

              <div>
                {/* Number and Icon */}

                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex select-none items-center justify-center rounded-md border border-brand-blue/10 bg-[#eef3ff] px-2.5 py-1 text-xs font-bold tracking-wide text-brand-blue">
                    {item.number}
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-blue/10 bg-[#eef3ff] text-brand-blue transition-all duration-300 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white">
                    <IconComponent className="h-5 w-5 stroke-[2]" />
                  </div>
                </div>

                {/* Service Title */}

                <h3 className="mb-2.5 text-xl font-bold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-brand-blue">
                  {item.title}
                </h3>

                {/* Description */}

                <p className="mb-8 text-sm font-normal leading-relaxed text-neutral-500">
                  {item.description}
                </p>
              </div>

              {/* Bottom Action */}

              <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
                <div className="flex items-center gap-2.5 text-xs font-medium text-neutral-600 sm:text-[13px]">
                  <IconComponent className="h-4 w-4 shrink-0 stroke-[1.8] text-brand-blue" />

                  <span className="transition-colors duration-300 group-hover:text-brand-blue">
                    {item.bottomLabel || "Explore Service"}
                  </span>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-brand-blue transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white">
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* MOBILE SERVICE CAROUSEL */}

      <div className="sm:hidden">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {items.map((item) => {
            const IconComponent =
              ICON_MAP[item.icon] || Briefcase;

            const href = getServiceHref(item);

            return (
              <Link
                key={
                  item.id ||
                  item.slug ||
                  item.number ||
                  item.title
                }
                href={href}
                className="
                  group
                  relative
                  flex
                  w-[82vw]
                  max-w-85
                  shrink-0
                  snap-center
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-neutral-200
                  bg-white
                  p-6
                  shadow-[0_2px_10px_rgba(18,57,153,0.025)]
                  transition-all
                  duration-200
                  active:scale-[0.99]
                "
              >
                {/* Yellow top accent */}

                <div className="absolute left-0 top-0 h-1 w-12 bg-brand-yellow" />

                <div>
                  {/* Number and Icon */}

                  <div className="mb-5 flex items-center justify-between">
                    <div className="inline-flex select-none items-center justify-center rounded-md border border-brand-blue/10 bg-[#eef3ff] px-2.5 py-1 text-xs font-bold tracking-wide text-brand-blue">
                      {item.number}
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-blue/10 bg-[#eef3ff] text-brand-blue">
                      <IconComponent className="h-5 w-5 stroke-[2]" />
                    </div>
                  </div>

                  {/* Service Title */}

                  <h3 className="mb-2 text-lg font-bold tracking-tight text-neutral-900">
                    {item.title}
                  </h3>

                  {/* Description */}

                  <p className="mb-6 text-xs font-normal leading-relaxed text-neutral-500">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action */}

                <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
                    <IconComponent className="h-3.5 w-3.5 shrink-0 stroke-[1.8] text-brand-blue" />

                    <span>{item.bottomLabel || "Explore Service"}</span>
                  </div>

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-yellow text-brand-blue transition-all duration-200 group-active:bg-brand-blue group-active:text-white">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Carousel Indicators */}

        <div className="mt-5 flex items-center justify-center gap-1.5">
          {items.map((item, idx) => (
            <button
              key={
                item.id ||
                item.slug ||
                item.number ||
                idx
              }
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