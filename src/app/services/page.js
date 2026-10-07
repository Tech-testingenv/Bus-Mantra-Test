import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Route,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import PageHero from "@/components/common/pageHero";
import ServiceCard from "@/components/services/serviceCard";
import {
  servicesPageHeroData,
  servicesPageSectionData,
  featuredServiceData,
} from "@/data/data";

export const metadata = {
  title: "Group Travel Services - Bus Mantra",
  description:
    "Comprehensive group transportation services: corporate travel, group tours, weddings & events, school trips, and airport/hotel transfers.",
};

const FEATURED_POINT_ICONS = [
  ShieldCheck,
  Sparkles,
  Route,
];

export default function ServicesPage() {
  return (
    <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 space-y-16 sm:space-y-20 lg:space-y-28">
      {/* ========================================================= */}
      {/* 1. REUSABLE PAGE HERO COMPONENT                           */}
      {/* Configured strictly as a clean page introduction          */}
      {/* ========================================================= */}
      <PageHero data={servicesPageHeroData} />

      {/* ========================================================= */}
      {/* 2. MAIN SERVICES SECTION: 3-COLUMN EDITORIAL GRID         */}
      {/* ========================================================= */}
      <section className="relative w-full">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-end mb-10 sm:mb-14">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-brand-orange uppercase mb-2.5 sm:mb-3 select-none">
              {servicesPageSectionData.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-neutral-900 tracking-tight leading-[1.14]">
              {servicesPageSectionData.heading}
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end text-left lg:pb-1">
            <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed max-w-lg">
              {servicesPageSectionData.description}
            </p>
          </div>
        </div>

        {/* 6 Services Grid: 3 cols on desktop, 2 cols on tablet, 1 col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {servicesPageSectionData.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FEATURED SERVICE AREA: TWO-COLUMN FOCUSED PRESENTATION */}
      {/* Left: Headline, narrative, 3 supporting points & CTA link */}
      {/* Right: Large authentic travel coach image                 */}
      {/* ========================================================= */}
      <section className="relative w-full rounded-3xl sm:rounded-4xl bg-[#f8f9fa] border border-neutral-200/80 p-6 sm:p-10 lg:p-14 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative & Key Value Points (~55% on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[11px] font-bold tracking-wider text-brand-orange uppercase mb-3.5 select-none">
              {featuredServiceData.eyebrow}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black text-neutral-900 tracking-tight leading-[1.15] mb-4">
              {featuredServiceData.heading}
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl mb-8">
              {featuredServiceData.description}
            </p>

            {/* 3 Supporting Points */}
            <div className="space-y-4 w-full mb-8">
              {featuredServiceData.points.map((pt, idx) => {
                const IconComponent = FEATURED_POINT_ICONS[idx] || CheckCircle2;

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-neutral-200/60 shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-neutral-900 mb-0.5">
                        {pt.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
                        {pt.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Charter Action Link */}
            <Link
              href="/fleets"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-[0.98] group cursor-pointer"
            >
              <span>Explore Fleet for Your Group</span>
              <ArrowRight className="w-4 h-4 text-brand-orange stroke-[2.4] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column: Large Premium Travel Coach Image (~45% on desktop) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-neutral-200/80 shadow-md group aspect-4/3 sm:aspect-16/11 lg:aspect-4/3">
              <Image
                src={featuredServiceData.image}
                alt={featuredServiceData.imageAlt}
                width={1200}
                height={900}
                className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-103"
              />

              {/* Floating Quality Assurance Pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto px-4 py-2.5 rounded-xl bg-black/75 backdrop-blur-md text-white border border-white/10 shadow-lg flex items-center gap-2.5 text-xs font-semibold select-none">
                <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <span>Dedicated Full-Bus Charters · Pan-India</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
