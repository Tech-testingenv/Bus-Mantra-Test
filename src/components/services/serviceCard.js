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
      className={`
        group
        relative
        flex
        flex-col
        justify-between
        select-none
        overflow-hidden
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-6
        shadow-[0_4px_20px_rgba(18,57,153,0.025)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-brand-blue/30
        hover:shadow-[0_12px_32px_rgba(18,57,153,0.09)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-blue
        sm:rounded-3xl
        sm:p-7
        lg:p-8
        ${className}
      `}
    >
      {/* Subtle top accent */}
      <div className="absolute left-0 top-0 h-1 w-12 bg-brand-yellow transition-all duration-300 group-hover:w-full" />

      <div>
        {/* Top Row: Number Badge & Icon */}
        <div className="mb-5 flex items-center justify-between sm:mb-6">
          <span className="inline-flex items-center justify-center rounded-md border border-brand-blue/10 bg-[#eef3ff] px-2.5 py-1 text-xs font-bold tracking-wider text-brand-blue">
            {service.number}
          </span>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-blue/10 bg-[#eef3ff] text-brand-blue transition-all duration-300 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white">
            <IconComponent className="h-5 w-5 stroke-[2]" />
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2.5 text-xl font-bold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-brand-blue sm:text-[22px]">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="mb-6 text-xs font-normal leading-relaxed text-neutral-500 sm:mb-8 sm:text-sm">
          {service.description}
        </p>
      </div>

      {/* Bottom Row: Explore Service */}
      <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-xs font-bold text-neutral-700 transition-colors duration-300 group-hover:text-brand-blue sm:text-sm">
          {service.ctaLabel || "Explore Service"}
        </span>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-brand-blue transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white">
          <ArrowRight className="h-3.5 w-3.5 stroke-[2.4] transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}