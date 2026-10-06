import Image from "next/image";
import Link from "next/link";
import { Users, Check, ArrowRight, MapPin, Compass } from "lucide-react";
import { holidaySectionData, holidayPackagesData } from "@/data/data";

export default function HolidayPackages({
  sectionData = holidaySectionData,
  packages = holidayPackagesData,
}) {
  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-28 my-6 sm:my-10 rounded-3xl lg:rounded-[36px] bg-[#fbf9f6] border border-orange-100/70 overflow-hidden">
      {/* Subtle Decorative Travel Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-30">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Subtle curved travel route lines */}
          <path
            d="M -50 200 C 200 120, 450 320, 700 180 C 950 40, 1150 240, 1250 160"
            stroke="#ec6103"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            opacity="0.35"
          />
          <path
            d="M -30 650 C 250 520, 500 720, 800 600 C 1050 480, 1180 620, 1250 560"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.25"
          />

          {/* Low-contrast decorative location pins & dots */}
          <circle cx="180" cy="140" r="3" fill="#ec6103" opacity="0.4" />
          <circle cx="460" cy="310" r="2.5" fill="#ec6103" opacity="0.4" />
          <circle cx="690" cy="180" r="3.5" fill="#ec6103" opacity="0.5" />
          <circle cx="960" cy="70" r="2.5" fill="#ec6103" opacity="0.4" />
          <circle cx="780" cy="610" r="3" fill="#0c1621" opacity="0.25" />
          <circle cx="320" cy="580" r="2.5" fill="#0c1621" opacity="0.2" />

          {/* Tiny location pin markers */}
          <g transform="translate(686, 160) scale(0.6)" opacity="0.5">
            <path
              d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
              fill="#ec6103"
            />
          </g>
          <g transform="translate(176, 120) scale(0.6)" opacity="0.4">
            <path
              d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
              fill="#ec6103"
            />
          </g>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-3.5 sm:mb-4 select-none">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
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

        {/* 3-Column Responsive Holiday Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative bg-white rounded-3xl sm:rounded-[26px] border border-neutral-200/70 hover:border-brand-orange/40 shadow-[0_10px_30px_rgba(12,22,33,0.04)] hover:shadow-[0_20px_45px_rgba(236,97,3,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-2"
            >
              {/* Card Top: 40-45% Vector Bus & Destination Illustration Area */}
              <div className="relative w-full bg-[#fdfbf9] group-hover:bg-[#fdf6ee] transition-colors duration-300 p-5 sm:p-6 flex items-center justify-center min-h-55 sm:min-h-60 overflow-hidden border-b border-neutral-100">
                {/* Destination Badge Top-Left */}
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-brand-orange/20 text-brand-orange text-xs font-semibold shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange stroke-[2.2]" />
                  <span>{pkg.destinationBadge}</span>
                </div>

                {/* Subtle destination badge top-right: Bus category */}
                <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-dark/5 text-brand-dark text-[11px] font-semibold tracking-wide">
                  <Compass className="w-3 h-3 text-brand-gray stroke-2" />
                  <span>{pkg.busType}</span>
                </div>

                {/* Vector Illustration */}
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src={pkg.image}
                    alt={`${pkg.destination} - Bus Mantra Luxury Holiday Bus`}
                    width={480}
                    height={300}
                    className="w-full h-auto max-h-42.5 sm:max-h-46.25 object-contain transition-transform duration-500 group-hover:scale-[1.04] group-hover:translate-x-1.5 drop-shadow-sm select-none pointer-events-none"
                    priority
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  {/* Capacity & Bus Type Meta */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange px-2.5 py-0.5 rounded-full bg-orange-50 border border-brand-orange/20">
                      <Users className="w-3.5 h-3.5 stroke-[2.2]" />
                      <span>{pkg.capacity}</span>
                    </span>
                    <span className="text-xs font-medium text-brand-gray">
                      {pkg.charterType || "Full Coach Charter"}
                    </span>
                  </div>

                  {/* Destination Tour Heading */}
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-2.5 tracking-tight group-hover:text-brand-orange transition-colors">
                    {pkg.destination}
                  </h3>

                  {/* Package Description */}
                  <p className="text-sm text-brand-gray leading-relaxed mb-5">
                    {pkg.description}
                  </p>

                  {/* Small Feature Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pkg.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-[#f4f6f9] text-brand-dark border border-neutral-200/50"
                      >
                        <Check className="w-3.5 h-3.5 text-brand-orange stroke-[2.5]" />
                        <span>{highlight}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore Package CTA Button */}
                <Link
                  href={pkg.href || "#booking-form"}
                  className="w-full py-3 px-5 rounded-xl text-center text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange bg-[#f1f4f8] text-brand-dark hover:bg-brand-orange hover:text-white group/btn shadow-xs hover:shadow-md"
                >
                  <span className="font-semibold">{pkg.cta}</span>
                  <div className="w-7 h-7 rounded-lg bg-white/70 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 stroke-[2.5] text-brand-dark group-hover/btn:text-white transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom Secondary CTA */}
        {sectionData.secondaryCta && (
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
            <span className="text-sm sm:text-base font-medium text-brand-gray">
              {sectionData.secondaryCta.prompt}
            </span>
            <Link
              href={sectionData.secondaryCta.href || "#booking-form"}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-brand-orange/30 text-brand-orange hover:bg-brand-orange hover:text-white font-semibold text-sm shadow-xs transition-all duration-200 hover:shadow-md group/cta"
            >
              <span>{sectionData.secondaryCta.buttonText}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover/cta:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
