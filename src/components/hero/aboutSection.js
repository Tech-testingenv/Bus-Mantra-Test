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
    <section
      id="about"
      className="relative my-4 w-full py-12 sm:my-6 sm:py-16 lg:py-20"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-11 lg:gap-12">
        {/* LEFT COLUMN: CONTENT, STATS & CTA */}
        <div className="flex flex-col items-start text-left lg:col-span-5">
          {/* Eyebrow */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/10 bg-[#eef3ff] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-blue">
              {content?.eyebrow || "About Bus Mantra"}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="mb-4 text-3xl font-extrabold leading-[1.14] tracking-tight text-[#111111] sm:mb-5 sm:text-4xl lg:text-[42px]">
            <span className="block">
              {content?.heading?.line1 || "Your Journey."}
            </span>

            <span className="block text-brand-blue">
              {content?.heading?.line2 || "Our Responsibility."}
            </span>
          </h2>


          {/* Paragraphs */}
          <div className="mb-6 max-w-xl space-y-3.5 text-sm font-normal leading-relaxed text-[#626c7b] sm:mb-8 sm:space-y-4 sm:text-base">
            {content?.paragraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Highlights / Stats */}
          {highlights.length > 0 && (
            <div className="mb-6 flex w-full items-center gap-3 border-y border-[#e5e7eb] py-4 sm:mb-8 sm:gap-6 sm:py-5">
              {highlights.map((item, idx) => {
                const IconComponent = ICON_MAP[item.icon] || Bus;

                return (
                  <div
                    key={item.label || idx}
                    className="flex min-w-0 flex-1 items-center"
                  >
                    <div className="flex min-w-0 flex-col items-start">
                      <div className="mb-1 flex items-center gap-1.5 sm:gap-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#fff8db] sm:h-8 sm:w-8">
                          <IconComponent className="h-4 w-4 text-brand-orange sm:h-[18px] sm:w-[18px]" strokeWidth={2.2} />
                        </span>

                        <span className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl lg:text-[26px]">
                          {item.value}
                        </span>
                      </div>

                      <span className="truncate text-xs font-medium text-[#737373] sm:text-sm">
                        {item.label}
                      </span>
                    </div>

                    {/* Divider */}
                    {idx < highlights.length - 1 && (
                      <div className="ml-auto h-8 w-px shrink-0 bg-[#e5e7eb] sm:h-9" />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA Button */}
          <Link
            href={content?.cta?.href || "/about"}
            className="group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-bold text-[#111111] shadow-sm transition-all duration-300 "
          >
            <span>{content?.cta?.label || "Know More About Us"}</span>

            <ArrowRight className="h-4 w-4 text-[#111111] transition-all duration-300 group-hover:translate-x-1 group-hover:text-black" strokeWidth={2.2} />
          </Link>
        </div>

        {/* RIGHT COLUMN: BUS PHOTOGRAPH */}
        <div className="mt-8 w-full lg:col-span-6 lg:mt-0">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-[#e5e7eb] bg-[#eef3ff] shadow-[0_8px_30px_rgba(18,57,153,0.06)] sm:aspect-[16/11] sm:rounded-3xl lg:aspect-[4/3]">
            
            <Image
              src={content?.image?.src || "/about-bus.png"}
              alt={
                content?.image?.alt ||
                "BUS MANTRA luxury coach travelling on a scenic mountain road"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
              className="select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Bottom image overlay label */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/65 via-black/20 to-transparent px-5 pb-5 pt-16 sm:px-7 sm:pb-7">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-[#111111]">
                  <Bus className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>

                <div>
                  <p className="text-sm font-bold text-white">
                    Travel with Confidence
                  </p>
                  <p className="mt-0.5 text-xs text-white/80">
                    Comfort, reliability and care on every journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}