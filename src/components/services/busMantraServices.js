import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Compass } from "lucide-react";
import { servicesSectionData, servicesData } from "@/data/data";

export default function BusMantraServices({
  sectionData = servicesSectionData,
  services = servicesData,
}) {
  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-28 my-6 sm:my-10 rounded-3xl lg:rounded-[36px] bg-[#fbf9f6] border border-orange-100/70 overflow-hidden">
      {/* Subtle Travel-Themed Background Route Decoration */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-25">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Subtle curved route lines connecting services */}
          <path
            d="M -30 240 C 220 150, 480 340, 720 200 C 960 60, 1140 240, 1240 180"
            stroke="#ec6103"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            opacity="0.35"
          />
          <path
            d="M -20 640 C 240 540, 520 700, 800 580 C 1040 480, 1160 600, 1240 540"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            opacity="0.3"
          />

          {/* Low-contrast decorative route dots & pin markers */}
          <circle cx="190" cy="180" r="3" fill="#ec6103" opacity="0.5" />
          <circle cx="480" cy="310" r="2.5" fill="#ec6103" opacity="0.4" />
          <circle cx="720" cy="200" r="3.5" fill="#ec6103" opacity="0.5" />
          <circle cx="980" cy="100" r="2.5" fill="#ec6103" opacity="0.4" />
          <circle cx="810" cy="580" r="3" fill="#0c1621" opacity="0.25" />

          <g transform="translate(716, 180) scale(0.6)" opacity="0.5">
            <path
              d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
              fill="#ec6103"
            />
          </g>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
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

        {/* 3-Column Asymmetric Service Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.map((service) => {
            const isFeatured = service.featured;

            return (
              <div
                key={service.id}
                className={`group relative bg-white rounded-3xl sm:rounded-[26px] border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-2 ${isFeatured
                    ? "border-brand-orange/50 shadow-[0_15px_35px_rgba(236,97,3,0.1)] ring-1 ring-brand-orange/25"
                    : "border-neutral-200/70 hover:border-brand-orange/40 shadow-[0_10px_30px_rgba(12,22,33,0.04)] hover:shadow-[0_20px_40px_rgba(236,97,3,0.12)]"
                  }`}
              >
                {/* Upper Area: Dedicated Vector Illustration */}
                <div
                  className={`relative w-full overflow-hidden flex items-center justify-center border-b border-neutral-100 transition-colors duration-300 p-5 sm:p-6 ${isFeatured
                      ? "bg-[#fff9f5] group-hover:bg-[#fff4ed] min-h-60 sm:min-h-65 lg:min-h-70"
                      : "bg-[#fbf9f6] group-hover:bg-[#fdf6ee] min-h-52.5 sm:min-h-57.5 lg:min-h-60"
                    }`}
                >
                  {/* Category Pill Tag (Top-Left) */}
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-brand-orange/20 text-brand-orange text-xs font-semibold shadow-xs">
                    <Compass className="w-3.5 h-3.5 text-brand-orange stroke-[2.2]" />
                    <span>{service.category}</span>
                  </div>

                  {/* Featured Badge (Top-Right) */}
                  {service.badge && (
                    <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-orange text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                      <Sparkles className="w-3 h-3 stroke-[2.5]" />
                      <span>{service.badge}</span>
                    </div>
                  )}

                  {/* Vector Illustration */}
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src={service.image}
                      alt={`${service.title} - Bus Mantra Transportation Services`}
                      width={520}
                      height={330}
                      className={`w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.04] group-hover:translate-x-1.5 select-none pointer-events-none drop-shadow-sm ${isFeatured
                          ? "max-h-47.5 sm:max-h-52.5 lg:max-h-56.25"
                          : "max-h-41.25 sm:max-h-45 lg:max-h-47.5"
                        }`}
                      priority={isFeatured}
                    />
                  </div>
                </div>

                {/* Card Lower Body: Service Information & CTA */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {/* Service Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-2.5 tracking-tight group-hover:text-brand-orange transition-colors">
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className="text-sm text-brand-gray leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Explore Service CTA Button */}
                  <Link
                    href={service.href || "#booking-form"}
                    className={`w-full py-3 px-5 rounded-xl text-center text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange shadow-xs group/btn ${isFeatured
                        ? "bg-brand-orange text-white hover:bg-brand-orange-hover hover:shadow-md"
                        : "bg-[#f1f4f8] text-brand-dark hover:bg-brand-orange hover:text-white hover:shadow-md"
                      }`}
                  >
                    <span>{service.cta}</span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isFeatured
                          ? "bg-white/20 group-hover/btn:bg-white/30"
                          : "bg-white/70 group-hover/btn:bg-white/20"
                        }`}
                    >
                      <ArrowRight
                        className={`w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-1 ${isFeatured
                            ? "text-white"
                            : "text-brand-dark group-hover/btn:text-white"
                          }`}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Centered CTA */}
        {sectionData.bottomCta && (
          <div className="mt-14 sm:mt-18 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
            <span className="text-sm sm:text-base font-medium text-brand-gray">
              {sectionData.bottomCta.prompt}
            </span>
            <Link
              href={sectionData.bottomCta.href || "#booking-form"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group/cta"
            >
              <span>{sectionData.bottomCta.buttonText}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover/cta:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
