"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Play,
  FileText,
  Building2,
  Tv,
  Newspaper,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Clock,
  X,
  Printer,
  Quote,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Bus,
} from "lucide-react";

import PageHero from "@/components/common/pageHero";
import FAQSection from "@/components/common/faq";
import {
  testimonialsHeroData,
  trustMetrics,
  mixedTestimonials,
  testimonialFaqs,
} from "@/data/testimonialsData";

// Icons for media and brand organizations
const ORG_ICONS = {
  "Nestlé India": Building2,
  "Paytm (One97 Communications)": ShieldCheck,
  "TV9 Bharatvarsh": Tv,
  "Republic Bharat": Newspaper,
  "CMBC Business": Sparkles,
};

export default function TestimonialsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeLetter, setActiveLetter] = useState(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
        setActiveLetter(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeVideo || activeLetter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo, activeLetter]);

  // Counts for filter tabs
  const counts = useMemo(() => {
    return {
      all: mixedTestimonials.length,
      review: mixedTestimonials.filter((i) => i.cardType === "review").length,
      video: mixedTestimonials.filter((i) => i.cardType === "video").length,
      media: mixedTestimonials.filter((i) => i.cardType === "media").length,
      letter: mixedTestimonials.filter((i) => i.cardType === "letter").length,
    };
  }, []);

  // Filtered testimonials
  const filteredList = useMemo(() => {
    if (selectedFilter === "all") return mixedTestimonials;
    return mixedTestimonials.filter((item) => item.cardType === selectedFilter);
  }, [selectedFilter]);

  const faqData = {
    eyebrow: "TRUST FAQ",
    heading: "Frequently Asked Questions About Trust & Verification",
    description:
      "Understand how Bus Mantra ensures passenger safety, genuine review verification, and fleet standards.",
    faqs: testimonialFaqs,
  };

  const handlePrintLetter = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
      {/* 1. Page Hero */}
      <PageHero data={testimonialsHeroData} />

      {/* 2. Key Trust Metrics Ribbon */}
      <div className="mt-4 sm:mt-6 mb-8 sm:mb-10">
        <div className="rounded-2xl sm:rounded-3xl border border-border bg-surface-secondary/70 p-4 sm:p-6 backdrop-blur-xs shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {trustMetrics.map((item, idx) => (
              <div
                key={item.id}
                className={`flex flex-col items-center text-center px-2 sm:px-4 ${
                  idx > 0 ? "pt-3 sm:pt-0" : ""
                }`}
              >
                <div className="flex items-center gap-1.5 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-text-primary">
                  {item.id === "rating" && (
                    <Star className="h-6 w-6 sm:h-7 sm:w-7 fill-amber-400 text-amber-400 inline shrink-0" />
                  )}
                  <span>{item.value}</span>
                </div>
                <span className="mt-1 text-xs sm:text-sm font-bold text-text-primary">
                  {item.label}
                </span>
                <span className="mt-0.5 text-[11px] sm:text-xs text-text-muted">
                  {item.subtext}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Filter Bar & Trust Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
            Customer Stories, Media Mentions &amp; Letters
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-text-muted">
            Browsing all customer feedback, video testimonials, media coverage, and official commendations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedFilter("all")}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              selectedFilter === "all"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface border border-border text-text-secondary hover:border-primary/40 hover:text-primary"
            }`}
          >
            All Stories ({counts.all})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter("review")}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              selectedFilter === "review"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface border border-border text-text-secondary hover:border-primary/40 hover:text-primary"
            }`}
          >
            Reviews ({counts.review})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter("video")}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              selectedFilter === "video"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface border border-border text-text-secondary hover:border-primary/40 hover:text-primary"
            }`}
          >
            Videos ({counts.video})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter("media")}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              selectedFilter === "media"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface border border-border text-text-secondary hover:border-primary/40 hover:text-primary"
            }`}
          >
            Media &amp; Brands ({counts.media})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter("letter")}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              selectedFilter === "letter"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface border border-border text-text-secondary hover:border-primary/40 hover:text-primary"
            }`}
          >
            Letters ({counts.letter})
          </button>
        </div>
      </div>

      {/* 4. The Mixed Testimonials Feed / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {filteredList.map((item, index) => {
          // =========================================================================
          // CARD TYPE: MEDIA & ORGANIZATION REMARKS (CMBC, TV9, Nestlé, Paytm, Republic Bharat)
          // =========================================================================
          if (item.cardType === "media") {
            const OrgIcon = ORG_ICONS[item.organization] || Building2;

            return (
              <div
                key={`media-${item.id}-${index}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-primary/25 bg-surface p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Ambient Corner Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all duration-300 group-hover:bg-primary/20" />

                <div>
                  {/* Category Pill & Official Badge */}
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-subtle px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary border border-primary/20">
                      <OrgIcon className="h-3 w-3" />
                      <span>MEDIA &amp; BRAND</span>
                    </span>

                    <span className="rounded-full bg-surface-secondary px-2.5 py-0.5 text-[10px] font-semibold text-text-muted border border-border">
                      {item.badge}
                    </span>
                  </div>

                  {/* Organization Logo & Title */}
                  <div className="mb-3.5 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 text-white font-black text-xs shadow-xs tracking-wider">
                      {item.logoText}
                    </div>

                    <div>
                      <h3 className="text-base font-black text-text-primary leading-tight">
                        {item.organization}
                      </h3>
                      <span className="text-[11px] font-semibold text-text-muted">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h4 className="mb-2.5 text-sm sm:text-base font-bold text-text-primary leading-snug">
                    &ldquo;{item.headline}&rdquo;
                  </h4>

                  {/* Quote */}
                  <div className="relative mb-4">
                    <Quote className="absolute -left-1 -top-2 h-6 w-6 text-primary/15 z-0" />
                    <p className="relative z-10 text-xs sm:text-sm leading-relaxed text-text-secondary">
                      {item.quote}
                    </p>
                  </div>
                </div>

                {/* Footer Spokesperson & Verification */}
                <div className="border-t border-border pt-3.5 mt-2">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <p className="text-xs font-bold text-text-primary">
                        {item.spokesperson}
                      </p>
                      <p className="text-[11px] text-text-muted">
                        {item.designation} • {item.location}
                      </p>
                    </div>

                    <span className="text-[10px] font-semibold text-text-muted shrink-0">
                      {item.date}
                    </span>
                  </div>

                  {item.impactMetric && (
                    <div className="flex items-center gap-1.5 rounded-xl bg-primary-subtle/50 px-2.5 py-1 text-[11px] font-bold text-primary border border-primary/15">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{item.impactMetric}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          // =========================================================================
          // CARD TYPE: VIDEO TESTIMONIAL
          // =========================================================================
          if (item.cardType === "video") {
            return (
              <div
                key={`video-${item.id}-${index}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  {/* Category Pill */}
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-subtle px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary border border-primary/20">
                      <Play className="h-3 w-3 fill-primary" />
                      <span>VIDEO TESTIMONIAL</span>
                    </span>

                    <span className="rounded-full bg-surface-secondary px-2.5 py-0.5 text-[10px] font-semibold text-text-muted border border-border">
                      {item.category}
                    </span>
                  </div>

                  {/* Video Thumbnail with Play Button */}
                  <div
                    onClick={() => setActiveVideo(item)}
                    className="relative mb-3.5 aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 group-hover:opacity-95"
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />

                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-5 w-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
                      <Clock className="h-3 w-3" />
                      <span>{item.duration}</span>
                    </div>

                    {/* Rating on Thumbnail */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-0.5 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-amber-300 backdrop-blur-xs">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span>5.0</span>
                    </div>
                  </div>

                  {/* Title & Quote */}
                  <h3 className="mb-2 text-sm sm:text-base font-bold text-text-primary leading-snug">
                    {item.title}
                  </h3>

                  <p className="mb-3 text-xs leading-relaxed text-text-secondary line-clamp-3">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Footer: Client Info & Route */}
                <div className="border-t border-border pt-3 mt-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <p className="text-xs font-bold text-text-primary">
                        {item.clientName}
                      </p>
                      <p className="text-[11px] text-text-muted truncate max-w-44">
                        {item.clientRole}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveVideo(item)}
                      className="cursor-pointer inline-flex items-center gap-1 rounded-lg bg-primary-subtle px-2.5 py-1 text-[11px] font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Watch</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-text-muted">
                    <MapPin className="h-3 w-3 text-primary shrink-0" />
                    <span className="truncate">{item.route}</span>
                  </div>
                </div>
              </div>
            );
          }

          // =========================================================================
          // CARD TYPE: CUSTOMER REVIEW
          // =========================================================================
          if (item.cardType === "review") {
            return (
              <div
                key={`review-${item.id}-${index}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  {/* Category Pill & Rating */}
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-subtle px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary border border-primary/20">
                      <Star className="h-3 w-3 fill-primary" />
                      <span>CUSTOMER REVIEW</span>
                    </span>

                    {/* 5 Stars */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Route & Coach Pill */}
                  <div className="mb-3 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="inline-flex items-center gap-1 rounded-md bg-surface-secondary px-2 py-0.5 font-semibold text-text-secondary border border-border">
                      <MapPin className="h-3 w-3 text-primary shrink-0" />
                      <span className="truncate max-w-44">{item.route}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-md bg-primary-subtle/50 px-2 py-0.5 font-semibold text-primary border border-primary/15">
                      <Bus className="h-3 w-3 shrink-0" />
                      <span className="truncate max-w-40">{item.busType}</span>
                    </span>
                  </div>

                  {/* Review Quote */}
                  <p className="mb-4 text-xs sm:text-sm leading-relaxed text-text-secondary">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Footer: Reviewer Info */}
                <div className="border-t border-border pt-3.5 mt-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-xs">
                        {item.initials}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-text-primary leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-text-muted">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Verified</span>
                        </span>
                      )}
                      <p className="text-[10px] text-text-muted">{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // =========================================================================
          // CARD TYPE: LETTERS OF APPRECIATION
          // =========================================================================
          if (item.cardType === "letter") {
            return (
              <div
                key={`letter-${item.id}-${index}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-500/25 bg-surface p-6 shadow-xs transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Subtle Amber Glow */}
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-amber-500/5 blur-2xl group-hover:bg-amber-500/15" />

                <div>
                  {/* Category Pill & Stamp */}
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-700 border border-amber-300/40">
                      <FileText className="h-3 w-3" />
                      <span>APPRECIATION LETTER</span>
                    </span>

                    <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-[10px] font-bold text-text-muted border border-border">
                      {item.refNo}
                    </span>
                  </div>

                  {/* Organization Title */}
                  <div className="mb-3">
                    <h3 className="text-base font-black text-text-primary leading-tight">
                      {item.organization}
                    </h3>
                    <p className="text-[11px] font-semibold text-text-muted">
                      {item.unit}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="mb-4 text-xs sm:text-sm leading-relaxed text-text-secondary">
                    {item.summary}
                  </p>

                  {/* Key Highlights */}
                  {item.highlights && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {item.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-500/20"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Signatory & Read Letter Action */}
                <div className="border-t border-border pt-3.5 mt-2">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-text-primary">
                        {item.signatoryName}
                      </p>
                      <p className="text-[11px] text-text-muted">
                        {item.signatoryRole}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveLetter(item)}
                      className="cursor-pointer inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-primary-hover active:scale-95"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Read Letter</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* 5. Conversion Trust Banner */}
      <section className="my-14 overflow-hidden rounded-3xl bg-neutral-900 p-8 sm:p-12 text-white relative shadow-xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row text-center lg:text-left">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck className="h-4 w-4" />
              <span>YOUR JOURNEY IS PROTECTED</span>
            </div>

            <h2 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              Ready to Experience India&apos;s Highest Rated Group Travel?
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-neutral-300 sm:text-base">
              Join thousands of satisfied corporate leaders, wedding organizers, and families. Book an entire coach with verified chauffeurs, transparent per-km billing, and 24/7 journey support.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-neutral-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Zero Hidden Charges
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                GPS Live Monitored
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                5-Star Verified Drivers
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/offer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-hover active:scale-[0.98]"
            >
              <span>Book a Bus</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/20 active:scale-[0.98]"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Request a Quote</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FAQs Section */}
      <FAQSection data={faqData} />

      {/* =========================================================================
          INTERACTIVE MODAL 1: VIDEO TESTIMONIAL PLAYER
      ========================================================================= */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  {activeVideo.category} • {activeVideo.duration}
                </span>
                <h3 className="text-base sm:text-lg font-black leading-snug">
                  {activeVideo.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Close modal"
                className="cursor-pointer rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`${activeVideo.videoEmbedUrl}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm sm:text-base font-bold">
                    {activeVideo.clientName}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {activeVideo.clientRole}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    &ldquo;{activeVideo.quote}&rdquo;
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-neutral-200">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{activeVideo.route}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE MODAL 2: LETTER OF APPRECIATION READER
      ========================================================================= */}
      {activeLetter && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveLetter(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white text-neutral-900 shadow-2xl border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Document Header Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Official Letter of Commendation
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintLetter}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveLetter(null)}
                  aria-label="Close modal"
                  className="cursor-pointer rounded-full p-1.5 text-neutral-500 hover:bg-neutral-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Letter Content Area Formatted as Official Letterhead */}
            <div className="p-8 sm:p-10 font-serif leading-relaxed text-neutral-800">
              {/* Organization Header */}
              <div className="border-b-2 border-neutral-800 pb-5 mb-6 text-center">
                <h2 className="text-2xl font-black font-sans uppercase tracking-wide text-neutral-900">
                  {activeLetter.organization}
                </h2>
                <p className="text-xs font-sans text-neutral-600 mt-1">
                  {activeLetter.unit}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-sans text-neutral-500">
                  <span>Ref: {activeLetter.refNo}</span>
                  <span>Date: {activeLetter.date}</span>
                </div>
              </div>

              {/* Full Letter Transcript */}
              <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-neutral-800">
                {activeLetter.fullLetter}
              </div>

              {/* Verification Seal */}
              <div className="mt-8 border-t border-neutral-200 pt-6 flex items-center justify-between font-sans">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Bus Mantra Verified Archival Document</span>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-900">
                    {activeLetter.signatoryName}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    {activeLetter.signatoryRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
