"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, ChevronLeft, ChevronRight, MapPin, Quote } from "lucide-react";
import { testimonialsSectionData, testimonialsData } from "@/data/data";

export default function CustomerTestimonials({
  sectionData = testimonialsSectionData,
  testimonials = testimonialsData,
}) {
  // Identify featured testimonial and secondary testimonials
  const featuredTestimonial = testimonials.find((t) => t.featured) || testimonials[0];
  const otherTestimonials = testimonials.filter((t) => t.id !== featuredTestimonial.id);

  // Pagination index for cycling secondary testimonials on desktop/tablet/mobile
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, otherTestimonials.length - 2);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // The 2 cards displayed on the right side
  const visibleCards = otherTestimonials.slice(currentIndex, currentIndex + 2);
  // Fallback if less than 2
  if (visibleCards.length < 2 && otherTestimonials.length >= 2) {
    visibleCards.push(otherTestimonials[0]);
  }

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      {/* Subtle Travel-Themed Decorative Route Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-25">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Subtle curved route lines */}
          <path
            d="M -30 200 C 220 120, 480 300, 720 180 C 960 60, 1140 220, 1240 160"
            stroke="#ec6103"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            opacity="0.35"
          />
          <path
            d="M -20 620 C 240 520, 520 680, 800 560 C 1040 460, 1160 580, 1240 520"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            opacity="0.3"
          />
          <circle cx="210" cy="140" r="3" fill="#ec6103" opacity="0.5" />
          <circle cx="720" cy="180" r="3.5" fill="#ec6103" opacity="0.5" />
          <circle cx="960" cy="80" r="2.5" fill="#ec6103" opacity="0.4" />
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

        {/* Testimonials Layout:
            Left: Large Featured Testimonial Card
            Right: Two Smaller Testimonials Stacked Vertically with Carousel Controls
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT: Large Featured Testimonial Card (7 cols on desktop) */}
          <div className="lg:col-span-7 relative bg-[#fffdfa] rounded-3xl sm:rounded-[28px] border border-orange-200/70 p-7 sm:p-9 lg:p-10 shadow-[0_12px_35px_rgba(236,97,3,0.06)] flex flex-col justify-between overflow-hidden">
            {/* Large Subtle Decorative Quotation Mark in Background */}

            <div className="relative z-10">
              {/* Card Top: 5-Star Rating & Category Badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(featuredTestimonial.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange fill-brand-orange"
                    />
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 border border-brand-orange/20 text-brand-orange text-xs font-semibold">
                  {featuredTestimonial.category}
                </span>
              </div>

              {/* Large Quotation Text */}
              <blockquote className="text-xl sm:text-2xl md:text-[26px] font-medium text-brand-dark leading-snug tracking-tight mb-8">
                &ldquo;{featuredTestimonial.quote}&rdquo;
              </blockquote>
            </div>

            {/* Customer Author Metadata */}
            <div className="relative z-10 pt-6 border-t border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Clean Circular Avatar (Initials or Real Image) */}
                {featuredTestimonial.avatar ? (
                  <Image
                    src={featuredTestimonial.avatar}
                    alt={featuredTestimonial.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-brand-orange/20"
                  />
                ) : (
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center text-lg shadow-sm ring-2 ring-brand-orange/20 select-none">
                    {featuredTestimonial.initials || "RS"}
                  </div>
                )}

                <div>
                  <h4 className="text-base sm:text-lg font-bold text-brand-dark leading-tight">
                    {featuredTestimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-brand-gray">
                    {featuredTestimonial.role}
                  </p>
                </div>
              </div>

              {/* Trip Route Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-brand-dark text-xs font-semibold self-start sm:self-auto">
                <MapPin className="w-3.5 h-3.5 text-brand-orange stroke-[2.2]" />
                <span>{featuredTestimonial.location}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Two Smaller Stacked Cards + Minimal Carousel Controls (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {visibleCards.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group relative bg-white rounded-3xl sm:rounded-3xl border border-neutral-200/70 p-6 sm:p-7 shadow-[0_8px_25px_rgba(12,22,33,0.04)] hover:shadow-[0_15px_30px_rgba(236,97,3,0.08)] hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating & Category Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange fill-brand-orange"
                        />
                      ))}
                    </div>

                    <span className="text-[11px] font-semibold text-brand-orange px-2.5 py-0.5 rounded-full bg-orange-50 border border-brand-orange/20">
                      {testimonial.category}
                    </span>
                  </div>

                  {/* Short Testimonial Quote */}
                  <p className="text-sm sm:text-base text-brand-dark leading-relaxed mb-5">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-3">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover shadow-xs"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-dark text-white font-bold flex items-center justify-center text-xs select-none shadow-xs">
                        {testimonial.initials || "BM"}
                      </div>
                    )}

                    <div>
                      <h5 className="text-sm font-bold text-brand-dark leading-tight">
                        {testimonial.name}
                      </h5>
                      <p className="text-xs text-brand-gray">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Trip Route */}
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-gray">
                    <MapPin className="w-3 h-3 text-brand-orange stroke-2" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Minimal Circular Carousel Controls */}
            {otherTestimonials.length > 2 && (
              <div className="flex items-center justify-between px-2 pt-1">
                <span className="text-xs font-medium text-brand-gray">
                  Showing {currentIndex + 1}–
                  {Math.min(currentIndex + 2, otherTestimonials.length)} of{" "}
                  {otherTestimonials.length} stories
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonials"
                    className="w-9 h-9 rounded-full bg-white border border-neutral-200 text-brand-dark hover:border-brand-orange hover:text-brand-orange flex items-center justify-center transition-colors shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonials"
                    className="w-9 h-9 rounded-full bg-white border border-neutral-200 text-brand-dark hover:border-brand-orange hover:text-brand-orange flex items-center justify-center transition-colors shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Trust Stats Strip */}
        {sectionData.trustStats && (
          <div className="mt-12 sm:mt-16 bg-white border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-100">
              {sectionData.trustStats.map((stat, idx) => (
                <div key={idx} className={idx > 0 ? "pt-4 md:pt-0" : ""}>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">
                    <span className="text-brand-orange">{stat.value.slice(0, -1)}</span>
                    <span>{stat.value.slice(-1)}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-brand-dark mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-brand-gray mt-0.5">
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Bottom Centered CTA */}
        {sectionData.bottomCta && (
          <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
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
