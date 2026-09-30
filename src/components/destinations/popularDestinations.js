import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { destinationsSectionData, popularDestinationsData } from "@/data/data";

export default function PopularDestinations({
  sectionData = destinationsSectionData,
  destinations = popularDestinationsData,
}) {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      {/* Subtle Travel-Themed Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-25">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Subtle curved travel route lines */}
          <path
            d="M -40 180 C 180 80, 420 280, 680 140 C 940 20, 1120 220, 1240 140"
            stroke="#ec6103"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            opacity="0.35"
          />
          <path
            d="M -20 620 C 260 500, 520 690, 820 570 C 1060 460, 1160 590, 1240 530"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            opacity="0.3"
          />

          {/* Low-contrast decorative location pins & dots */}
          <circle cx="160" cy="115" r="3" fill="#ec6103" opacity="0.5" />
          <circle cx="440" cy="270" r="2.5" fill="#ec6103" opacity="0.4" />
          <circle cx="670" cy="140" r="3.5" fill="#ec6103" opacity="0.5" />
          <circle cx="940" cy="50" r="2.5" fill="#ec6103" opacity="0.4" />
          <circle cx="820" cy="580" r="3" fill="#0c1621" opacity="0.25" />
          <circle cx="300" cy="560" r="2.5" fill="#0c1621" opacity="0.2" />

          {/* Tiny location pin markers */}
          <g transform="translate(666, 120) scale(0.6)" opacity="0.5">
            <path
              d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
              fill="#ec6103"
            />
          </g>
          <g transform="translate(156, 95) scale(0.6)" opacity="0.4">
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

        {/* Asymmetric Destination Grid:
            Desktop: 4 columns
            Row 1: Agra (col-span-2), Jaipur (col-span-1), Delhi (col-span-1)
            Row 2: Manali (col-span-1), Goa (col-span-1), Udaipur (col-span-2)
            Tablet: 2 columns
            Mobile: 1 column
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
          {destinations.map((dest) => {
            const isFeatured = dest.featured;

            return (
              <div
                key={dest.id}
                className={`group relative bg-white rounded-3xl sm:rounded-3xl border border-neutral-200/70 hover:border-brand-orange/40 shadow-[0_10px_30px_rgba(12,22,33,0.04)] hover:shadow-[0_20px_40px_rgba(236,97,3,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 ${isFeatured ? "lg:col-span-2" : "lg:col-span-1"
                  }`}
              >
                {/* Upper Portion: Large Destination-Specific Vector Artwork */}
                <div
                  className={`relative w-full overflow-hidden bg-[#fbf9f6] flex items-center justify-center border-b border-neutral-100 ${isFeatured ? "h-56 sm:h-64 lg:h-72" : "h-52 sm:h-60 lg:h-64"
                    }`}
                >
                  {/* Landmark Tag (Floating Over Artwork) */}
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-brand-orange/20 text-brand-orange text-xs font-semibold shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange stroke-[2.2]" />
                    <span>{dest.landmark}</span>
                  </div>

                  {/* Featured Badge for large destination cards */}
                  {isFeatured && (
                    <div className="absolute top-4 right-4 z-10 hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-dark/80 text-white text-[11px] font-semibold tracking-wider uppercase backdrop-blur-xs">
                      <Sparkles className="w-3 h-3 text-brand-orange stroke-[2.5]" />
                      <span>Featured Tour</span>
                    </div>
                  )}

                  {/* Destination Illustration Asset */}
                  <div className="w-full h-full relative">
                    <Image
                      src={dest.image}
                      alt={`${dest.name} - ${dest.landmark} Group Travel Destination`}
                      fill
                      sizes={
                        isFeatured
                          ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                          : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      }
                      className="object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
                      priority={isFeatured}
                    />
                  </div>
                </div>

                {/* Card Lower Body: Destination Info & Interaction */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {/* Destination Name & Subtitle */}
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight group-hover:text-brand-orange transition-colors">
                        {dest.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-brand-gray mb-5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/60" />
                      <span>{dest.subtitle}</span>
                    </p>
                  </div>

                  {/* Explore Destination CTA Button */}
                  <Link
                    href={dest.href || "#booking-form"}
                    className="w-full py-2.5 px-4 rounded-xl text-center text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange bg-[#f1f4f8] text-brand-dark hover:bg-brand-orange hover:text-white group/btn shadow-xs hover:shadow-sm"
                  >
                    <span>{dest.cta}</span>
                    <div className="w-6 h-6 rounded-lg bg-white/70 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] text-brand-dark group-hover/btn:text-white transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Centered Secondary CTA */}
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
