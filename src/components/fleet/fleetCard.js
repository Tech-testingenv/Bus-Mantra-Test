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
    ctaText: bus?.ctaText || ctaText,
    href: bus?.href || href,
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
          formEl.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: Math.max(0, targetPos), behavior: "smooth" });
        const firstInput = formEl.querySelector("input");
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 350);
        }
      }
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-neutral-200/70 hover:border-neutral-300 p-5 sm:p-6 flex flex-col justify-between shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.07)] transition-all duration-300 ${className}`}
    >
      <div>
        {/* Bus Image Container: Minimal soft studio background */}
        <div className="w-full rounded-xl sm:rounded-2xl bg-[#f0f2f5] p-3 sm:p-4 mb-5 flex items-center justify-center overflow-hidden aspect-16/10">
          <Image
            src={item.image}
            alt={`${item.name} - BUS MANTRA`}
            width={1280}
            height={720}
            className="w-full h-auto object-contain select-none transition-transform duration-300 ease-out group-hover:scale-103 rounded-2xl"
          />
        </div>

        {/* Title & Badge Row */}
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight group-hover:text-neutral-950 transition-colors">
            {item.name}
          </h3>
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md uppercase tracking-wider select-none shrink-0 ${item.isPopular
              ? "bg-orange-50 text-brand-orange border border-brand-orange/20"
              : "bg-neutral-100 text-neutral-600"
              }`}
          >
            {item.badge}
          </span>
        </div>

        {/* Seat Capacity */}
        <div className="text-sm font-medium text-neutral-500 mb-3 select-none">
          {item.capacity}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed min-h-12">
          {item.description}
        </p>
      </div>

      {/* View Details Link */}
      <div className="pt-5 mt-auto">
        <Link
          href={item.href}
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 group-hover:text-brand-orange transition-colors duration-200 select-none cursor-pointer"
        >
          <span>{item.ctaText}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.4] transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
