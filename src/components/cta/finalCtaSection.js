import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { ctaData } from "@/data/data";

export default function FinalCtaSection({ data = ctaData }) {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="relative max-w-360 mx-auto">
        {/* Main CTA Container: Deep Dark Navy with Subtle Orange Glow */}
        <div className="group relative rounded-3xl sm:rounded-4xl lg:rounded-[36px] bg-linear-to-br from-[#0c1621] via-[#111e2e] to-[#070d14] border border-white/10 shadow-2xl shadow-black/30 overflow-hidden p-8 sm:p-12 lg:p-16">
          {/* Subtle Ambient Decorative Glowing Rings & Background Path */}
          <div className="absolute top-0 right-0 w-96 sm:w-130 h-96 sm:h-130 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />

          {/* Low-Contrast Decorative Route Arcs */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M -50 300 C 250 150, 500 450, 850 250 C 1050 150, 1150 280, 1250 220"
              stroke="#ec6103"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            <circle cx="280" cy="210" r="3" fill="#ec6103" />
            <circle cx="850" cy="250" r="4" fill="#ec6103" />
          </svg>

          {/* Grid Layout: Left Content, Right Coach Illustration */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* LEFT COLUMN: Headings, Value Proposition, Buttons, Reassurance */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-5 self-start select-none">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <span>{data.eyebrow}</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.12] tracking-tight mb-5">
                Your Group.
                <br />
                One Bus.
                <br />
                <span className="text-brand-orange">One Journey.</span>
              </h2>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mb-8">
                {data.description}
              </p>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8">
                {/* Primary CTA */}
                <Link
                  href={data.primaryButton?.href || "#booking-form"}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm sm:text-base shadow-lg shadow-brand-orange/30 transition-all duration-200 hover:-translate-y-0.5 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <span>{data.primaryButton?.label || "Book Your Bus"}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>

                {/* Secondary CTA */}
                <Link
                  href={data.secondaryButton?.href || "#booking-form"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 font-semibold text-sm sm:text-base backdrop-blur-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <span>{data.secondaryButton?.label || "Request a Quote"}</span>
                </Link>
              </div>

              {/* Reassurance Line */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-white/70">
                {data.reassuranceItems?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange stroke-[2.2] shrink-0" />
                    <span>{item}</span>
                  </div>
                )) || (
                    <p className="text-xs sm:text-sm text-white/70">
                      {data.reassurance}
                    </p>
                  )}
              </div>
            </div>

            {/* RIGHT COLUMN: Dedicated Vector Luxury Coach Visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
              {/* Subtle Ambient Halo */}
              <div className="absolute inset-0 bg-brand-orange/15 rounded-full blur-2xl transform scale-90 pointer-events-none" />

              {/* Vector Bus Illustration */}
              <div className="relative w-full max-w-lg lg:max-w-none flex items-center justify-center">
                <Image
                  src={data.image}
                  alt="BUS MANTRA Complete Coach Ready For Group Journey"
                  width={640}
                  height={400}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] group-hover:translate-x-1.5 drop-shadow-2xl select-none pointer-events-none"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
