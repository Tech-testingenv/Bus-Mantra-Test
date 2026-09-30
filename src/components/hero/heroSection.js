import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { heroData } from "@/data/data";
import BookingForm from "./bookingForm";

export default function HeroSection({ data = heroData }) {
  return (
    <>
      {/* Top Hero: Two-column layout (Copy on Left, Bus on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        {/* Left Column: Heading, Value Proposition & Actions */}
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-4 sm:mb-5 select-none">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span>{data.eyebrow}</span>
          </div>

          {/* Main Heading with Orange Highlights */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-bold text-brand-dark leading-[1.16] tracking-tight mb-4 sm:mb-5">
            {data.titlePrefix}<br />
            <span className="text-brand-orange">{data.highlightedTitle} </span>
            <span className="">{data.priceText}</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed mb-6 sm:mb-8 max-w-xl">
            {data.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href={data.primaryButton.href}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              <span>{data.primaryButton.label}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              href={data.secondaryButton.href}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-brand-orange/5 border border-brand-border hover:border-brand-orange text-brand-dark hover:text-brand-orange font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              <span>{data.secondaryButton.label}</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Bus Illustration */}
        <div className="lg:col-span-6 relative w-full flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-lg lg:max-w-none flex items-center justify-center">
            {/* Soft Ambient Glow under Bus */}
            <div
              className="absolute -bottom-4 w-4/5 h-16 bg-brand-dark/10 rounded-full blur-2xl -z-10"
              aria-hidden="true"
            />
            {/* Provided BUS MANTRA Bus Asset */}
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              priority
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_15px_30px_rgba(12,22,33,0.12)] transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Booking Form Component (Separately encapsulated & visually overlapping) */}
      <div className="mt-8 sm:mt-12 lg:mt-12 max-w-6xl mx-auto">
        <BookingForm formData={data.form} />
      </div>
    </>
  );
}
