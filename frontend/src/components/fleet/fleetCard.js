"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

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
  const variants = Array.isArray(bus?.vehicleTypes) ? bus.vehicleTypes : [];
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id || null
  );

  const activeVariant =
    variants.find((v) => v.id === selectedVariantId) || variants[0] || null;

  const item = {
    id: bus?.id || id || "coach",
    slug: bus?.slug || bus?.id || id || "coach",
    name: bus?.name || name || "Coach Bus",
    badge: bus?.badge || badge || (bus?.isPopular ? "MOST POPULAR" : "CHARTER FLEET"),
    capacity: activeVariant?.capacity || bus?.capacity || capacity || "15–25 Seats",
    isPopular: bus?.isPopular ?? isPopular ?? false,
    image: activeVariant?.image || bus?.image || image || "/fleet/12_seater_maharaja_tempo_traveller_1.png",
    description: activeVariant?.description || bus?.description || description || "",
    amenities: activeVariant?.amenities || bus?.amenities || amenities || [],
    ctaText: bus?.ctaText || ctaText,
    href: bus?.href || (bus?.slug ? `/fleets/${bus.slug}` : href),
  };

  const detailUrl = activeVariant
    ? `/fleets/${item.slug}?vehicle=${activeVariant.id}`
    : `/fleets/${item.slug}`;

  const specUrl = activeVariant
    ? `/fleet-specifications/${activeVariant.id}`
    : `/fleet-specifications/${item.slug}`;

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
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_35px_-5px_rgba(244,119,22,0.10)] sm:p-6 ${className}`}
    >
      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-12 bg-primary transition-all duration-300 group-hover:w-full" />

      <div>
        {/* Bus Image Container */}
        <Link
          href={detailUrl}
          onClick={handleClick}
          className="relative mb-4 flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-xl bg-surface-muted p-2 sm:rounded-2xl sm:p-3 cursor-pointer"
        >
          <Image
            src={item.image}
            alt={`${item.name} - BUS MANTRA`}
            width={1280}
            height={720}
            className="
              h-full
              w-auto
              select-none
              rounded-xl
              object-contain
              transition-transform
              duration-500
              ease-out
              group-hover:scale-[1.03]
            "
          />

          <span className="absolute top-2.5 right-2.5 select-none rounded-full border border-primary/20 bg-surface/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur-xs">
            {item.badge}
          </span>
        </Link>

        {/* Title & Capacity Row */}
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold tracking-tight text-text-primary transition-colors duration-300 hover:text-primary sm:text-2xl">
            <Link href={detailUrl} onClick={handleClick}>
              {item.name}
            </Link>
          </h3>
        </div>

        {/* Seat Capacity */}
        <div className="mb-2.5 select-none text-xs font-semibold text-primary">
          Capacity: <span className="text-text-primary font-bold">{item.capacity}</span>
        </div>

        {/* Description */}
        <p className="min-h-11 text-xs leading-relaxed text-text-secondary sm:text-[13px] mb-4">
          {item.description}
        </p>
      </div>

      {/* Action Links Row */}
      <div className="mt-auto border-t border-border pt-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold">
        <Link
          href={detailUrl}
          onClick={handleClick}
          className="group/link inline-flex cursor-pointer items-center gap-1.5 text-primary hover:text-primary-hover transition-colors"
        >
          <span>Book This Fleet</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
            strokeWidth={2.4}
          />
        </Link>

        <Link
          href={specUrl}
          className="inline-flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors text-xs"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Specifications</span>
        </Link>
      </div>
    </div>
  );
}