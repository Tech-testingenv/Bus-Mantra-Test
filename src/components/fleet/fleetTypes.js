import Image from "next/image";
import Link from "next/link";
import { Users, Check, ArrowRight, Sparkles } from "lucide-react";
import { fleetSectionData, fleetTypesData } from "@/data/data";

export default function FleetTypes({
  sectionData = fleetSectionData,
  fleets = fleetTypesData,
}) {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-3.5 sm:mb-4 select-none">
          <span className="w-2 h-2 rounded-full bg-brand-orange" />
          <span>{sectionData.eyebrow}</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark leading-[1.16] tracking-tight mb-3.5 sm:mb-4">
          {sectionData.heading}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
          {sectionData.description}
        </p>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {fleets.map((fleet) => {
          const isFeatured = fleet.isPremium;

          return (
            <div
              key={fleet.id}
              className={`relative bg-brand-surface rounded-3xl sm:rounded-[26px] border flex flex-col justify-between overflow-hidden transition-all duration-300 group hover:-translate-y-1.5 ${isFeatured
                  ? "border-brand-orange/60 shadow-[0_15px_35px_rgba(236,97,3,0.12)] ring-1 ring-brand-orange/30"
                  : "border-brand-border/70 hover:border-brand-orange/50 shadow-[0_10px_30px_rgba(12,22,33,0.04)] hover:shadow-[0_20px_40px_rgba(12,22,33,0.08)]"
                }`}
            >
              {/* Premium Badge */}
              {fleet.badge && (
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-orange text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-sm">
                  <Sparkles className="w-3 h-3 stroke-[2.5]" />
                  <span>{fleet.badge}</span>
                </div>
              )}

              {/* Card Top: Vector Bus Illustration Display */}
              <div className="relative bg-[#f8f9fa] group-hover:bg-[#fef8f4] transition-colors duration-300 p-4 sm:p-5 flex items-center justify-center min-h-43.75 sm:min-h-46.25 overflow-hidden border-b border-brand-border/40">
                <Image
                  src={fleet.image}
                  alt={`${fleet.name} - Bus Mantra Charter Fleet`}
                  width={360}
                  height={220}
                  priority
                  className="w-full h-auto max-h-36.25 object-contain transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none drop-shadow-sm"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Capacity Pill */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange mb-2 px-2.5 py-0.5 rounded-full bg-orange-50 border border-brand-orange/20">
                    <Users className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>{fleet.capacity}</span>
                  </div>

                  {/* Fleet Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-2 tracking-tight group-hover:text-brand-orange transition-colors">
                    {fleet.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed mb-4">
                    {fleet.description}
                  </p>

                  {/* Feature Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {fleet.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#f1f4f8] text-brand-dark"
                      >
                        <Check className="w-3 h-3 text-brand-orange stroke-[2.5]" />
                        <span>{feature}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <Link
                  href={fleet.href || "#booking-form"}
                  className={`w-full py-2.5 px-4 rounded-xl text-center text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${isFeatured
                      ? "bg-brand-orange text-white hover:bg-brand-orange-hover shadow-sm"
                      : "bg-[#f1f4f8] text-brand-dark group-hover:bg-brand-orange group-hover:text-white"
                    }`}
                >
                  <span>{fleet.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
