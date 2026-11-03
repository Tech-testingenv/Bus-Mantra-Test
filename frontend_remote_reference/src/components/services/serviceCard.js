import Link from "next/link";
import {
  Briefcase,
  Map,
  Calendar,
  GraduationCap,
  Plane,
  Hotel,
  ArrowRight,
  Globe,
  Users,
  Heart,
  Palmtree,
  Flower2,
  Bike,
} from "lucide-react";

const ICON_MAP = {
  briefcase: Briefcase,
  map: Map,
  calendar: Calendar,
  "graduation-cap": GraduationCap,
  plane: Plane,
  hotel: Hotel,
  globe: Globe,
  users: Users,
  heart: Heart,
  palmtree: Palmtree,
  flower: Flower2,
  bike: Bike,
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
        border-border
        bg-white
        p-6
        shadow-xs
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/40
        hover:shadow-md
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-focus-ring
        sm:rounded-3xl
        sm:p-7
        lg:p-8
        ${className}
      `}
    >
      {/* Top accent */}
      <div className="absolute left-0 top-0 h-1 w-12 bg-primary transition-all duration-300 group-hover:w-full" />

      <div>
        {/* Top Row: Number Badge & Icon */}
        <div className="mb-5 flex items-center justify-between sm:mb-6">
          <span className="inline-flex items-center justify-center rounded-md border border-primary/20 bg-primary-subtle px-2.5 py-1 text-xs font-bold tracking-wider text-primary">
            {service.number}
          </span>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary-subtle text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <IconComponent className="h-5 w-5 stroke-2" />
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2.5 text-xl font-bold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-primary sm:text-[22px]">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="mb-6 text-xs font-normal leading-relaxed text-text-secondary sm:mb-8 sm:text-sm">
          {service.description}
        </p>
      </div>

      {/* Bottom Row: Explore Service */}
      <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs font-bold text-text-secondary transition-colors duration-300 group-hover:text-primary sm:text-sm">
          {service.ctaLabel || "Explore Service"}
        </span>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-subtle text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowRight className="h-3.5 w-3.5 stroke-[2.4] transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}