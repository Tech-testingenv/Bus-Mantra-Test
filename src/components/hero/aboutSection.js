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
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-12 lg:gap-y-6 items-center">
        {/* Block 1: Eyebrow, Heading & Supporting Content */}
        {/* Mobile order: 1 | Desktop: Right column (top) */}
        <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col items-start text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-3.5 sm:mb-4 select-none">
            <span className="w-2 h-2 rounded-full bg-brand-orange" />
            <span>{data.eyebrow}</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark leading-[1.16] tracking-tight mb-4 sm:mb-6">
            <span className="block">{data.heading.line1}</span>
            <span className="block text-brand-orange">{data.heading.line2}</span>
          </h2>

          {/* Supporting Content Paragraphs */}
          <div className="space-y-3.5 sm:space-y-4 text-base sm:text-lg text-brand-gray leading-relaxed">
            {data.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Block 2: Vector Illustration (Left column on desktop, Middle on mobile) */}
        {/* Mobile order: 2 (Illustration after description) | Desktop: Left column (spans full height) */}
        <div className="order-2 lg:order-1 lg:col-span-5 lg:row-span-2 w-full flex items-center justify-center">
          <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-border/60 bg-white shadow-[0_15px_35px_rgba(12,22,33,0.06)] group">
            {/* Subtle brand orange ambient glow accent */}
            <div
              className="absolute -top-12 -left-12 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-12 -right-12 w-32 h-32 bg-brand-dark/5 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              priority
              className="w-full h-auto object-cover select-none transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* Block 3: Trust Highlights & CTA */}
        {/* Mobile order: 3 | Desktop: Right column (bottom) */}
        <div className="order-3 lg:order-3 lg:col-span-7 flex flex-col items-start w-full pt-2 lg:pt-0">
          {/* Trust Highlights Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 py-6 border-y border-brand-border/60 w-full mb-6 sm:mb-8">
            {data.highlights.map((item) => {
              const IconComponent = ICON_MAP[item.icon] || Bus;
              return (
                <div key={item.label} className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                    </span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-dark tracking-tight">
                      {item.value}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-brand-gray leading-snug">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Link */}
          <Link
            href={data.cta.href}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            <span>{data.cta.label}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
