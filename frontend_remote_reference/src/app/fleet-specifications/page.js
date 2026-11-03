import Link from "next/link";
import { ArrowLeft, ArrowRight, Bus, FileText, Users } from "lucide-react";
import { FLEET_CATEGORIES, getAllVehicleVariants } from "@/data/fleetData";

export const metadata = {
  title: "Fleet Specifications & Technical Metrics | Bus Mantra",
  description:
    "Explore detailed technical specifications, seating configurations, luggage space, and amenities for all 15 Bus Mantra vehicle variants.",
};

export default function FleetSpecificationsIndexPage() {
  const allVariants = getAllVehicleVariants();

  return (
    <main className="relative mx-auto w-full max-w-360 px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pt-32">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          COMPLETE TECHNICAL DIRECTORY
        </span>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-text-primary sm:text-4xl">
          Fleet Specifications
        </h1>
        <p className="mt-2 text-sm text-text-muted leading-relaxed sm:text-base">
          Browse mechanical, seating, and amenity specifications across all 15 verified Bus Mantra coach and traveller variants.
        </p>

        <div className="mt-6">
          <Link
            href="/fleets"
            className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-primary" />
            Back to Fleet Booking Page
          </Link>
        </div>
      </div>

      {/* Categories & Variants */}
      <div className="space-y-12">
        {FLEET_CATEGORIES.map((category) => (
          <section key={category.id} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border pb-2.5">
              <div className="flex items-center gap-2">
                <Bus className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-black text-text-primary">
                  {category.name}
                </h2>
                <span className="rounded-full bg-primary-subtle px-2.5 py-0.5 text-[10px] font-bold text-primary border border-primary/20">
                  {category.vehicleTypes?.length || 0} Models
                </span>
              </div>

              <Link
                href={`/fleets/${category.slug}`}
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                Book {category.name}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.vehicleTypes?.map((variant) => (
                <div
                  key={variant.id}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="rounded-md bg-surface-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                        {variant.seatLayout} Layout
                      </span>

                      <span className="flex items-center gap-1 text-xs font-bold text-text-primary">
                        <Users className="h-3.5 w-3.5 text-primary" />
                        {variant.capacity}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-text-primary leading-snug">
                      {variant.name}
                    </h3>

                    <p className="mt-2 text-xs text-text-muted line-clamp-2 leading-relaxed">
                      {variant.description}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] bg-surface-secondary/70 p-2.5 rounded-xl border border-border/60">
                      <div>
                        <span className="text-text-muted block text-[10px]">LUGGAGE</span>
                        <strong className="text-text-primary truncate block">
                          {variant.specs?.luggage || "Ample"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-text-muted block text-[10px]">WASHROOM</span>
                        <strong className="text-text-primary truncate block">
                          {variant.specs?.washroom || "Not Available"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-border flex items-center justify-between gap-2">
                    <Link
                      href={`/fleet-specifications/${variant.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      View Specs
                    </Link>

                    <Link
                      href={`/fleets/${category.slug}?vehicle=${variant.id}&passengers=${variant.seats}`}
                      className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary-hover transition-colors"
                    >
                      Book Now
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
