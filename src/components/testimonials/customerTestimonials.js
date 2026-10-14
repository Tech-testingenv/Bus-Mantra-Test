"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import {
  testimonialsSectionData,
  testimonialsData,
} from "@/data/data";

export default function CustomerTestimonials({
  sectionData = testimonialsSectionData,
  testimonials = testimonialsData,
}) {
  // Identify featured testimonial and secondary testimonials
  const featuredTestimonial =
    testimonials.find((t) => t.featured) || testimonials[0];

  const otherTestimonials = testimonials.filter(
    (t) => t.id !== featuredTestimonial.id
  );

  // Carousel pagination
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, otherTestimonials.length - 2);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Two secondary testimonials displayed at a time
  const visibleCards = otherTestimonials.slice(
    currentIndex,
    currentIndex + 2
  );

  if (visibleCards.length < 2 && otherTestimonials.length >= 2) {
    visibleCards.push(otherTestimonials[0]);
  }

  return (
    <section className="relative w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center sm:mb-16">
          {/* Yellow Accent */}
          <div className="mb-5 h-1 w-12 rounded-full bg-[#FFC003]" />

          <h2 className="mb-3.5 text-3xl font-bold leading-[1.16] tracking-tight text-[#111111] sm:mb-4 sm:text-4xl md:text-5xl">
            {sectionData.heading}
          </h2>

          <p className="text-base leading-relaxed text-[#737373] sm:text-lg">
            {sectionData.description}
          </p>
        </div>

        {/* Testimonials Layout */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Featured Testimonial */}
          {featuredTestimonial && (
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#DCE4F2] bg-[#F0F3F9] p-7 shadow-[0_12px_35px_rgba(18,57,153,0.05)] sm:rounded-[28px] sm:p-9 lg:col-span-7 lg:p-10">
              {/* Decorative Background */}
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#123999]/[0.04] blur-2xl"
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Rating and Category */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${featuredTestimonial.rating || 5} out of 5 stars`}
                  >
                    {[...Array(featuredTestimonial.rating || 5)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-[#FFC003] text-[#FFC003] sm:h-5 sm:w-5"
                        />
                      )
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full border border-[#123999]/10 bg-white px-3 py-1 text-xs font-semibold text-[#123999]">
                    {featuredTestimonial.category}
                  </span>
                </div>

                {/* Featured Quote */}
                <blockquote className="mb-8 text-xl font-medium leading-snug tracking-tight text-[#111111] sm:text-2xl md:text-[26px]">
                  &ldquo;{featuredTestimonial.quote}&rdquo;
                </blockquote>
              </div>

              {/* Featured Customer Details */}
              <div className="relative z-10 flex flex-col justify-between gap-4 border-t border-[#DCE4F2] pt-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  {featuredTestimonial.avatar ? (
                    <Image
                      src={featuredTestimonial.avatar}
                      alt={featuredTestimonial.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full object-cover shadow-sm ring-2 ring-[#FFC003]/60"
                    />
                  ) : (
                    <div className="flex h-14 w-14 select-none items-center justify-center rounded-full bg-[#123999] text-lg font-bold text-white shadow-sm ring-2 ring-[#FFC003]/60">
                      {featuredTestimonial.initials || "RS"}
                    </div>
                  )}

                  <div>
                    <h4 className="text-base font-bold leading-tight text-[#111111] sm:text-lg">
                      {featuredTestimonial.name}
                    </h4>

                    <p className="mt-1 text-xs font-medium text-[#737373] sm:text-sm">
                      {featuredTestimonial.role}
                    </p>
                  </div>
                </div>

                {/* Trip Location */}
                <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#626C7B] sm:self-auto">
                  <MapPin className="h-3.5 w-3.5 stroke-[2.2] text-[#123999]" />
                  <span>{featuredTestimonial.location}</span>
                </div>
              </div>

              {/* Bottom Yellow Accent */}
              <div
                className="absolute bottom-0 left-0 h-1 w-24 rounded-tr-full bg-[#FFC003]"
                aria-hidden="true"
              />
            </div>
          )}

          {/* Secondary Testimonials */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            {visibleCards.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group flex flex-col justify-between rounded-3xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:border-[#123999]/25 hover:shadow-[0_12px_30px_rgba(18,57,153,0.06)] sm:p-7"
              >
                <div>
                  {/* Rating and Category */}
                  <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
                    <div
                      className="flex items-center gap-0.5"
                      aria-label={`${testimonial.rating || 5} out of 5 stars`}
                    >
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-[#FFC003] text-[#FFC003] sm:h-4 sm:w-4"
                        />
                      ))}
                    </div>

                    <span className="rounded-full border border-[#E5E7EB] bg-[#F5F6F8] px-2.5 py-0.5 text-[11px] font-semibold text-[#123999]">
                      {testimonial.category}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="mb-5 text-sm leading-relaxed text-[#343A40] sm:text-base">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                {/* Customer Details */}
                <div className="flex flex-col justify-between gap-3 border-t border-[#E5E7EB] pt-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-10 w-10 select-none items-center justify-center rounded-full bg-[#123999] text-xs font-bold text-white shadow-sm">
                        {testimonial.initials || "BM"}
                      </div>
                    )}

                    <div>
                      <h5 className="text-sm font-bold leading-tight text-[#111111]">
                        {testimonial.name}
                      </h5>

                      <p className="mt-1 text-xs text-[#737373]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Trip Location */}
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#737373]">
                    <MapPin className="h-3 w-3 stroke-2 text-[#123999]" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>

                {/* Small Yellow Accent */}
                <div className="mt-4 h-0.5 w-8 rounded-full bg-[#FFC003] transition-all duration-300 group-hover:w-14" />
              </div>
            ))}

            {/* Carousel Controls */}
            {otherTestimonials.length > 2 && (
              <div className="flex items-center justify-between px-2 pt-1">
                <span className="text-xs font-medium text-[#737373]">
                  Showing {currentIndex + 1}–
                  {Math.min(currentIndex + 2, otherTestimonials.length)} of{" "}
                  {otherTestimonials.length} stories
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonials"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#123999] shadow-sm transition-colors hover:border-[#FFC003] hover:bg-[#FFF8DB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#123999]"
                  >
                    <ChevronLeft className="h-4 w-4 stroke-[2.2]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonials"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#123999] shadow-sm transition-colors hover:border-[#FFC003] hover:bg-[#FFF8DB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#123999]"
                  >
                    <ChevronRight className="h-4 w-4 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust Statistics */}
        {sectionData.trustStats && (
          <div className="mt-12 rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-6 sm:mt-16 sm:rounded-3xl sm:p-8">
            <div className="grid grid-cols-2 gap-6 divide-y divide-[#E5E7EB] text-center md:grid-cols-4 md:divide-x md:divide-y-0">
              {sectionData.trustStats.map((stat, idx) => (
                <div
                  key={idx}
                  className={idx > 0 ? "pt-4 md:pt-0" : ""}
                >
                  <div className="text-2xl font-extrabold tracking-tight text-[#111111] sm:text-3xl md:text-4xl">
                    <span className="text-[#123999]">
                      {stat.value.slice(0, -1)}
                    </span>
                    <span>{stat.value.slice(-1)}</span>
                  </div>

                  <div className="mt-1 text-xs font-bold text-[#111111] sm:text-sm">
                    {stat.label}
                  </div>

                  <div className="mt-0.5 text-[11px] text-[#737373] sm:text-xs">
                    {stat.subtext}
                  </div>

                  <div className="mx-auto mt-3 h-1 w-8 rounded-full bg-[#FFC003]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        {sectionData.bottomCta && (
          <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:mt-14 sm:flex-row sm:gap-4">
            <span className="text-sm font-medium text-[#626C7B] sm:text-base">
              {sectionData.bottomCta.prompt}
            </span>

            <Link
              href={sectionData.bottomCta.href || "#booking-form"}
              className="group inline-flex items-center gap-2 rounded-full bg-[#FFC003] px-6 py-3 text-sm font-bold text-[#123999] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E0A900] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#123999] focus-visible:ring-offset-2"
            >
              <span>{sectionData.bottomCta.buttonText}</span>

              <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}