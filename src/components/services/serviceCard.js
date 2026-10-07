import Link from "next/link";
import {
  Briefcase,
  Map,
  Calendar,
  GraduationCap,
  Plane,
  Hotel,
  ArrowRight,
} from "lucide-react";

const ICON_MAP = {
  briefcase: Briefcase,
  map: Map,
  calendar: Calendar,
  "graduation-cap": GraduationCap,
  plane: Plane,
  hotel: Hotel,
};

/**
 * ServiceCard
 * Clean editorial service card representing what Bus Mantra does.
 * Features:
 * - Numbered indicator (01, 02...)
 * - Relevant Lucide iconography
 * - Editorial typography with service title & description
 * - "Explore Service →" micro-interaction on hover
 * - Subtle elevation, border accent, and arrow slide
 * - Zero vehicle photos to clearly differentiate from Fleet Cards
 */
export default function ServiceCard({
  service,
  className = "",
}) {
  const IconComponent = ICON_MAP[service.icon] || Briefcase;
  const href = service.href || "/fleets";

  return (
    <Link
      href={href}
      className={`group relative bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 hover:border-brand-orange/40 p-6 sm:p-7 lg:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-200 select-none ${className}`}
    >
      <div>
        {/* Top Row: Number Badge & Icon */}
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#f4f5f7] text-neutral-600 text-xs font-bold tracking-wider">
            {service.number}
          </span>
          <div className="w-10 h-10 rounded-xl bg-orange-50/70 border border-brand-orange/15 text-brand-orange flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white">
            <IconComponent className="w-5 h-5 stroke-[2]" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-[22px] font-bold text-neutral-900 tracking-tight mb-2.5 group-hover:text-neutral-950 transition-colors">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal mb-6 sm:mb-8">
          {service.description}
        </p>
      </div>

      {/* Bottom Row: Explore Service → Link */}
      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
        <span className="text-xs sm:text-sm font-bold text-neutral-700 group-hover:text-brand-orange transition-colors">
          {service.ctaLabel || "Explore Service"}
        </span>
        <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-orange-50 text-neutral-500 group-hover:text-brand-orange flex items-center justify-center transition-all duration-200">
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.4] transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
