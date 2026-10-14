"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { fleetTypesData } from "@/data/data";

export const FLEET_DATA = fleetTypesData;

export default function FleetCard({
  bus,
  id,
  name,
  capacity,
  badge,
  isPopular,
  image,
  description,
  ctaText = "View Details",
  href = "#booking-form",
  amenities,
  showAmenities = false,
  onSelect,
  className = "",
}) {
  const item = {
    id: bus?.id || id || "coach",
    name: bus?.name || name || "Coach Bus",
    capacity: bus?.capacity || capacity || "15–25 Seats",
    badge: bus?.badge || badge || "Charter",
    isPopular: bus?.isPopular ?? isPopular ?? false,
    image: bus?.image || image || "/fleet/mini-coach.jpg",
    description: bus?.description || description || "",
    amenities: bus?.amenities || amenities || [],
    ctaText: bus?.ctaText || ctaText,
    href: bus?.href || (bus?.id ? `/fleets/${bus.id}` : href),
  };

  const handleClick = (e) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(item);
      return;
    }

    if (item.href === "#booking-form") {
      e.preventDefault();

      const formEl = document.getElementById("booking-form");

      if (formEl) {
        const navOffset = 84;

        const targetPos =
          formEl.getBoundingClientRect().top +
          window.scrollY -
          navOffset;

        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: "smooth",
        });

        const firstInput = formEl.querySelector("input");

        if (firstInput) {
          setTimeout(() => firstInput.focus(), 350);
        }
      }
    }
  };

  return (
    <div
      className={`
        group
        relative
        flex
        flex-col
        justify-between
        overflow-hidden
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-5
        shadow-[0_2px_15px_-3px_rgba(18,57,153,0.035)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-brand-blue/30
        hover:shadow-[0_12px_35px_-5px_rgba(18,57,153,0.10)]
        sm:p-6
        ${className}
      `}
    >
      {/* Yellow Top Accent */}

      <div className="absolute left-0 top-0 h-1 w-12 bg-brand-yellow transition-all duration-300 group-hover:w-full" />

      <div>
        {/* Bus Image Container */}

        <div className="mb-5 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl bg-[#eef3ff] p-3 sm:rounded-2xl sm:p-4">
          <Image
            src={item.image}
            alt={`${item.name} - BUS MANTRA`}
            width={1280}
            height={720}
            className="
              h-auto
              w-full
              select-none
              rounded-xl
              object-contain
              transition-transform
              duration-500
              ease-out
              group-hover:scale-[1.03]
            "
          />
        </div>

        {/* Title & Badge Row */}

        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="text-xl font-bold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-brand-blue sm:text-2xl">
            {item.name}
          </h3>

          <span
            className={`
              shrink-0
              select-none
              rounded-md
              border
              px-2.5
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              sm:text-[11px]
              ${
                item.isPopular
                  ? "border-brand-yellow/60 bg-[#fff8db] text-[#8a6500]"
                  : "border-brand-blue/10 bg-[#eef3ff] text-brand-blue"
              }
            `}
          >
            {item.badge}
          </span>
        </div>

        {/* Seat Capacity */}

        <div className="mb-3 select-none text-sm font-semibold text-brand-blue">
          {item.capacity}
        </div>

        {/* Description */}

        <p className="min-h-12 text-xs leading-relaxed text-neutral-500 sm:text-[13px]">
          {item.description}
        </p>
      </div>

      {/* View Details Link */}

      <div className="mt-auto border-t border-neutral-100 pt-5">
        <Link
          href={item.href}
          onClick={handleClick}
          className="
            group/link
            inline-flex
            cursor-pointer
            select-none
            items-center
            gap-2
            text-sm
            font-bold
            text-brand-blue
            transition-colors
            duration-200
            hover:text-brand-orange
          "
        >
          <span>{item.ctaText}</span>

          <ArrowRight
            className="
              h-4
              w-4
              text-brand-orange
              transition-transform
              duration-200
              group-hover/link:translate-x-1
            "
            strokeWidth={2.4}
          />
        </Link>
      </div>
    </div>
  );
}