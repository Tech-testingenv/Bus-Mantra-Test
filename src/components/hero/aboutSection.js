"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bus, MapPin, Users } from "lucide-react";
import { aboutData } from "@/data/data";

const ICON_MAP = {
  bus: Bus,
  mapPin: MapPin,
  users: Users,
};

export default function AboutSection({ data = aboutData }) {
  const content = data || aboutData;
  const highlights = content?.highlights || [];

  return (
    <section id="about" className="relative w-full py-12 sm:py-16 lg:py-20 my-4 sm:my-6">
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 lg:gap-12 items-center">
        {/* ========================================================= */}
        {/* LEFT COLUMN (~45% on desktop): Content, Stats & CTA       */}
        {/* Mobile order: 1 to 5 (Eyebrow, Heading, Desc, Stats, CTA) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">


          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-neutral-900 tracking-tight leading-[1.14] mb-4 sm:mb-5">
            <span className="block">{content?.heading?.line1 || "Your Journey."}</span>
            <span className="block text-brand-orange">
              {content?.heading?.line2 || "Our Responsibility."}
            </span>
          </h2>

          {/* Paragraphs */}
          <div className="space-y-3.5 sm:space-y-4 text-sm sm:text-base text-neutral-500 font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl">
            {content?.paragraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Horizontal Stats Row with minimal Lucide icons & thin vertical dividers */}
          <div className="flex items-center gap-3 sm:gap-6 py-4 sm:py-5 border-y border-neutral-200/70 w-full mb-6 sm:mb-8">
            {highlights.map((item, idx) => {
              const IconComponent = ICON_MAP[item.icon] || Bus;
              return (
                <div key={item.label || idx} className="flex items-center flex-1 min-w-0">
                  <div className="flex flex-col items-start min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      <IconComponent className="w-4 h-4 text-brand-orange shrink-0 stroke-[2.2]" />
                      <span className="text-xl sm:text-2xl lg:text-[26px] font-bold text-neutral-900 tracking-tight">
                        {item.value}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-neutral-500 truncate">
                      {item.label}
                    </span>
                  </div>
                  {/* Thin vertical divider between stats (not after last item) */}
                  {idx < highlights.length - 1 && (
                    <div className="h-8 sm:h-9 w-px bg-neutral-200/80 ml-auto shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button: Standard homepage orange button */}
          <Link
            href={content?.cta?.href || "#booking-form"}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            <span>{content?.cta?.label || "Know More About Us"}</span>
            <ArrowRight className="w-4 h-4 text-white stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN (~55% on desktop): Bus Photograph             */}
        {/* Mobile order: 6 (Full-width below content)                */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 w-full mt-8 sm:mt-10 lg:mt-0">
          <div className="relative w-full aspect-4/3 sm:aspect-16/11 lg:aspect-4/3 rounded-[20px] sm:rounded-3xl overflow-hidden border border-neutral-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-neutral-100 group">
            <Image
              src={content?.image?.src || "/about-bus.png"}
              alt={
                content?.image?.alt ||
                "BUS MANTRA luxury coach travelling on a scenic mountain road"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
