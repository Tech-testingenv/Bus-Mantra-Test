import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ctaData } from "@/data/data";

export default function FinalCtaSection({ data = ctaData }) {
  const content = data || ctaData;
  const descriptionLines = content.descriptionLines || [
    "Book your entire bus in just a few simple steps.",
    "Guaranteed equipment, upfront prici ng.",
  ];
  const button = content.button || content.primaryButton || {
    label: "Book a Bus",
    href: "#booking-form",
  };

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="relative max-w-5xl mx-auto">
        {/* Main CTA Container:
            - Dark charcoal background
            - Subtle warm/dark brown tone toward right side
            - Large ~30px rounded corners
            - Wide horizontal layout with generous internal padding
            - Soft shadow below container
        */}
        <div
          className="relative rounded-[28px] sm:rounded-4xl overflow-hidden px-6 py-14 sm:px-12 sm:py-16 md:py-20 lg:px-16 lg:py-22 text-center flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.14)] border border-neutral-800/60"
          style={{
            backgroundColor: "#212326",
            backgroundImage:
              "radial-gradient(ellipse 70% 80% at 88% 25%, rgba(145, 62, 24, 0.22) 0%, rgba(95, 42, 20, 0.10) 45%, transparent 75%)",
          }}
        >
          {/* Eyebrow: Small orange/light-orange uppercase */}
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#ff782d] uppercase select-none mb-3 sm:mb-4">
            {content.eyebrow || "RESERVE IN MINUTES"}
          </span>

          {/* Heading: Large white heading */}
          <h2 className="text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] font-bold text-white tracking-tight leading-[1.14] mb-3.5 sm:mb-4">
            {content.heading || "Ready to travel together?"}
          </h2>

          {/* Description: Muted light-gray supporting text */}
          <div className="text-sm sm:text-base md:text-[17px] text-neutral-400 font-normal leading-relaxed mb-7 sm:mb-9 max-w-xl">
            {descriptionLines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          {/* Centered CTA Button: BUS MANTRA orange with arrow */}
          <Link
            href={button.href || "#booking-form"}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm sm:text-base shadow-md shadow-brand-orange/20 transition-all duration-200 active:scale-[0.98] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
          >
            <span>{button.label || "Book a Bus"}</span>
            <ArrowRight className="w-4 h-4 text-white stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
