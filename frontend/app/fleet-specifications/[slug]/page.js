"use client";

import { use, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  Flame,
  Fuel,
  Headphones,
  ImageIcon,
  Luggage,
  MapPin,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Users,
  Wind,
  Zap,
} from "lucide-react";

import {
  getAllVehicleVariants,
  getCategoryBySlug,
  getCategoryForVariant,
  getVehicleVariantById,
  FLEET_CATEGORIES,
} from "@/data/fleetData";
import Carousal from "@/components/common/carousal";

const DEFAULT_FLEET_IMAGE = "/fleet/12_seater_maharaja_tempo_traveller_1.png";

function DatabaseFleetSpecifications({ coach, query }) {
  const details = coach.content || {
    tag: "",
    specifications: Object.entries(coach.features || {}).map(([label, value]) => ({ label, value: String(value), description: "" })),
    features: [],
    inclusions: [],
    cabinAmenities: coach.amenities || [],
    bookingInclusions: [],
  };
  const bookingUrl = `/fleets/${coach.slug}${query ? `?${query}` : ""}`;
  return (
    <main className="relative mx-auto w-full max-w-360 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <Link href={bookingUrl} className="inline-flex items-center gap-2 text-sm font-bold text-primary"><ArrowLeft className="h-4 w-4" /> Back to coach</Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <div>
            {details.tag && <span className="text-xs font-bold uppercase text-primary">{details.tag}</span>}
            <h1 className="mt-2 text-3xl font-black text-text-primary">{coach.name}</h1>
            <p className="mt-2 text-sm font-semibold text-text-secondary">{coach.capacity}</p>
            <p className="mt-3 text-sm text-text-muted">{coach.description}</p>
          </div>
          <Carousal images={[coach.image, ...coach.gallery]} title={coach.name} />
          {details.specifications.length > 0 && <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-5 text-xl font-black">Vehicle Specifications</h2>
            <div className="grid gap-3 sm:grid-cols-2">{details.specifications.map((item, index) => <SpecMetricItem key={`${item.label}-${index}`} icon={Bus} label={item.label} value={item.value} sub={item.description} />)}</div>
          </section>}
          {[["Features", details.features], ["Inclusions", details.inclusions], ["Cabin Features & Amenities", details.cabinAmenities], ["Booking Inclusions", details.bookingInclusions]].map(([heading, items]) => items.length > 0 && <section key={heading} className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-xl font-black">{heading}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">{items.map((item, index) => <li key={`${item}-${index}`} className="rounded-xl bg-surface-secondary p-3 text-sm font-semibold">{item}</li>)}</ul>
          </section>)}
        </div>
        <div className="lg:col-span-4"><Link href={bookingUrl} className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Book this coach</Link></div>
      </div>
    </main>
  );
}

export default function FleetSpecificationPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams?.slug || "";
  const searchParams = useSearchParams();
  const [databaseCoach, setDatabaseCoach] = useState(null);
  const [catalogLoaded, setCatalogLoaded] = useState(false);
  const [catalogError, setCatalogError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/fleets/${encodeURIComponent(slug)}`)
      .then((response) => {
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`Fleet detail returned ${response.status}.`);
        return response.json();
      })
      .then((coach) => { if (active) setDatabaseCoach(coach); })
      .catch((error) => { console.error("Fleet specification load failed:", error); if (active) setCatalogError(true); })
      .finally(() => { if (active) setCatalogLoaded(true); });
    return () => { active = false; };
  }, [slug]);

  // Resolve variant directly or via category slug
  const resolvedData = useMemo(() => {
    let variant = getVehicleVariantById(slug);
    let category = null;

    if (variant) {
      category = getCategoryForVariant(variant.id);
    } else {
      // Check if slug is a category slug
      category = getCategoryBySlug(slug);
      if (category && category.vehicleTypes?.length > 0) {
        variant = category.vehicleTypes[0];
      }
    }

    return { variant, category };
  }, [slug]);

  const { variant, category } = resolvedData;

  // Sister variants in the same category
  const sisterVariants = useMemo(() => {
    if (!category || !Array.isArray(category.vehicleTypes)) return [];
    return category.vehicleTypes;
  }, [category]);

  const galleryImages = useMemo(() => {
    if (!variant) return [DEFAULT_FLEET_IMAGE];
    const imgs = [
      ...(Array.isArray(variant.gallery) ? variant.gallery : []),
      variant.image,
    ].filter(Boolean);
    const unique = [...new Set(imgs)];
    return unique.length > 0 ? unique : [DEFAULT_FLEET_IMAGE];
  }, [variant]);

  if (databaseCoach && (databaseCoach.content || !variant || !category)) {
    return <DatabaseFleetSpecifications coach={databaseCoach} query={searchParams?.toString()} />;
  }

  if ((!variant || !category) && !catalogLoaded) {
    return <main className="flex min-h-[60vh] items-center justify-center">Loading specifications...</main>;
  }

  if ((!variant || !category) && catalogError) {
    return <main role="alert" className="flex min-h-[60vh] items-center justify-center">Unable to load specifications. Please try again later.</main>;
  }

  if (!variant || !category) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-360 items-center justify-center px-6 pt-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            SPECIFICATION NOT FOUND
          </span>
          <h1 className="mt-2 text-3xl font-black text-text-primary">
            Vehicle Specification Not Found
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            The vehicle specification you are looking for is unavailable or has moved.
          </p>
          <Link
            href="/fleets"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <ArrowLeft className="h-4 w-4" />
            Explore All Fleets
          </Link>
        </div>
      </main>
    );
  }

  // Preserve existing journey query parameters when linking to booking
  const buildBookingUrl = (targetVariantId) => {
    const targetVariant =
      sisterVariants.find((v) => v.id === targetVariantId) || variant;
    const base = `/fleets/${category.slug}`;
    const paramsCopy = new URLSearchParams(searchParams?.toString() || "");
    paramsCopy.set("vehicle", targetVariant.id);
    if (!paramsCopy.has("passengers") || paramsCopy.get("passengers") === "") {
      paramsCopy.set("passengers", String(targetVariant.seats));
    }
    const qStr = paramsCopy.toString();
    return qStr ? `${base}?${qStr}` : base;
  };

  return (
    <main className="relative mx-auto w-full max-w-360 px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pt-32">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-text-muted sm:text-sm">
          <li>
            <Link
              href="/"
              className="text-text-muted transition-colors hover:text-primary"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          </li>
          <li>
            <Link
              href="/fleets"
              className="text-text-muted transition-colors hover:text-primary"
            >
              Our Fleet
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          </li>
          <li>
            <Link
              href={`/fleets/${category.slug}`}
              className="text-text-muted transition-colors hover:text-primary"
            >
              {category.name}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          </li>
          <li aria-current="page" className="font-bold text-primary">
            {variant.shortName || variant.name} Specs
          </li>
        </ol>
      </nav>

      {/* Sister Variants Quick Bar */}
      {sisterVariants.length > 1 && (
        <section
          aria-label="Other variants in this category"
          className="mb-8 rounded-2xl border border-border bg-surface p-3 sm:rounded-3xl sm:p-4 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-border mb-3">
            <div className="flex items-center gap-2">
              <Bus className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                {category.name} Models ({sisterVariants.length} Variants)
              </span>
            </div>
            <span className="text-[11px] text-text-muted">
              Select a variant to view its dedicated specifications
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {sisterVariants.map((item) => {
              const isSelected = item.id === variant.id;
              return (
                <Link
                  key={item.id}
                  href={`/fleet-specifications/${item.id}`}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 ring-2 ring-primary/40"
                      : "bg-surface-secondary text-text-secondary hover:bg-primary-subtle hover:text-primary border border-border"
                  }`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] uppercase font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-surface text-text-muted"
                    }`}
                  >
                    {item.seatLayout}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Grid: Left Column Details & Right Column Booking CTA */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        {/* Left Column: Visuals & Complete Specifications */}
        <div className="flex w-full flex-col gap-8 lg:col-span-8">
          {/* Header */}
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-secondary border border-border">
                {category.name}
              </span>

              <span className="rounded-full bg-primary-subtle px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                {variant.seatLayout} Layout
              </span>

              <span className="rounded-full bg-surface-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-primary border border-border">
                {variant.capacity}
              </span>
            </div>

            <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-[40px]">
              {variant.name}
            </h1>

            <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-text-muted sm:text-base">
              {variant.description ||
                `Explore comprehensive technical specifications, cabin configurations, luggage capacities, and seating layouts for the ${variant.name}. Available for corporate transport, family weddings, and private outstation charters.`}
            </p>
          </div>

          {/* Interactive Image Gallery */}
          <Carousal images={galleryImages} title={variant.name} />

          {/* Detailed Specifications Table / Card Grid */}
          <section
            aria-labelledby="specifications-heading"
            className="rounded-2xl border border-border bg-surface p-5 sm:rounded-3xl sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          >
            <div className="mb-5 flex items-center justify-between border-b border-border pb-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                  TECHNICAL METRICS
                </span>
                <h2
                  id="specifications-heading"
                  className="mt-1 text-xl font-black text-text-primary sm:text-2xl"
                >
                  Vehicle Specifications
                </h2>
              </div>

              <span className="hidden sm:inline-flex rounded-full bg-surface-secondary px-3 py-1 text-xs font-semibold text-text-secondary border border-border">
                {category.name} Architecture
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <SpecMetricItem
                icon={Users}
                label="Seating Capacity"
                value={variant.capacity}
                sub={`${variant.seats} Passenger Seats + Chauffeur`}
              />

              <SpecMetricItem
                icon={Bus}
                label="Seat Layout Configuration"
                value={`${variant.seatLayout} Layout`}
                sub={
                  variant.seatLayout === "1X1"
                    ? "Maharaja Single Aisles (Maximum Elbow Room)"
                    : variant.seatLayout === "2X1"
                      ? "Executive 2X1 Club Class Recliners"
                      : "Standard Highway 2X2 Push-back Recliners"
                }
              />

              <SpecMetricItem
                icon={Luggage}
                label="Luggage Space"
                value={variant.specs?.luggage || "Ample Boot Space"}
                sub="Dedicated rear compartment & overhead hat racks"
              />

              <SpecMetricItem
                icon={Wind}
                label="Air Conditioning & Climate"
                value={variant.specs?.climate || "Dual AC Vents"}
                sub="Individual passenger louvers & heating control"
              />

              <SpecMetricItem
                icon={Headphones}
                label="Audio & Visual Equipment"
                value={variant.specs?.audioVisual || "Stereo Sound System"}
                sub="Bluetooth, USB, aux input & public address mic"
              />

              <SpecMetricItem
                icon={Zap}
                label="Mobile Charging Facilities"
                value={variant.specs?.charging || "USB Charging Ports"}
                sub="Fast-charging ports provided at passenger rows"
              />

              <SpecMetricItem
                icon={Sparkles}
                label="Recliner Configuration"
                value={variant.specs?.recliner || "High-back Push Recliners"}
                sub="Deep push-back angles with padded armrests & calf support"
              />

              <SpecMetricItem
                icon={ShieldCheck}
                label="Onboard Washroom"
                value={variant.specs?.washroom || "Not Available"}
                sub={
                  variant.specs?.washroom?.toLowerCase().includes("available") &&
                  !variant.specs?.washroom?.toLowerCase().includes("not")
                    ? "Sanitized Western lavatory with running water"
                    : "Scheduled hygiene stops at verified highway food courts"
                }
                highlight={
                  variant.specs?.washroom?.toLowerCase().includes("available") &&
                  !variant.specs?.washroom?.toLowerCase().includes("not")
                }
              />
            </div>
          </section>

          {/* Features and Amenities Section */}
          <section
            aria-labelledby="features-heading"
            className="rounded-2xl border border-border bg-surface p-5 sm:rounded-3xl sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          >
            <div className="mb-5 border-b border-border pb-3.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                CABIN COMFORT
              </span>
              <h2
                id="features-heading"
                className="mt-1 text-xl font-black text-text-primary sm:text-2xl"
              >
                Features & Passenger Amenities
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(variant.amenities || category.amenities || []).map((amenity, idx) => (
                <div
                  key={`${amenity}-${idx}`}
                  className="flex items-center gap-3 rounded-xl bg-surface-secondary/70 p-3 text-xs font-semibold text-text-secondary sm:text-sm border border-border/60"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary">
                    <Check className="h-3.5 w-3.5 stroke-[2.8]" />
                  </span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Inclusions Section */}
          <section
            aria-labelledby="inclusions-heading"
            className="rounded-2xl border border-border bg-surface p-5 sm:rounded-3xl sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          >
            <div className="mb-5 border-b border-border pb-3.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                TRANSPARENT VALUE
              </span>
              <h2
                id="inclusions-heading"
                className="mt-1 text-xl font-black text-text-primary sm:text-2xl"
              >
                Booking Inclusions & Allowances
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(variant.inclusions || category.inclusions || [
                "Fuel & Highway Allowances Included",
                "Round Trip Tolls & State Taxes Covered",
                "Standard 5% Transport GST Invoicing",
                "24/7 Fleet Operations Monitoring",
                "Spotless Sanitization & Mechanical Audit",
              ]).map((inc, idx) => (
                <div
                  key={`${inc}-${idx}`}
                  className="flex items-center gap-3 rounded-xl bg-surface-secondary/70 p-3 text-xs font-semibold text-text-secondary sm:text-sm border border-border/60"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 stroke-[2.4]" />
                  </span>
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Safety & Driver Standards */}
          <section className="rounded-2xl bg-surface-inverse p-7 sm:rounded-3xl sm:p-9 text-white shadow-lg">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              BUS MANTRA ASSURANCE
            </span>
            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              Engineered For Long-Distance Reliability
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-base font-bold text-primary flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Verified Highway Drivers
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-white/80">
                  Drivers have minimum 7+ years of commercial interstate highway
                  experience, spotless track records, and defensive driving certification.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-primary flex items-center gap-2">
                  <Fuel className="h-4 w-4" />
                  Pre-Dispatch Mechanical Check
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-white/80">
                  Tyres, brake pads, coolant lines, suspension, and air filtration
                  systems are rigorously checked before every journey dispatch.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Booking CTA & Quick Summary */}
        <aside className="w-full lg:sticky lg:top-24 lg:col-span-4 lg:self-start space-y-5">
          <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:rounded-3xl sm:p-7">
            <div className="border-b border-border pb-4">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-primary sm:text-[11px]">
                RESERVATION READY
              </span>

              <h2 className="text-xl font-black tracking-tight text-text-primary sm:text-2xl">
                Book This Vehicle
              </h2>

              <p className="mt-1.5 text-xs text-text-muted leading-relaxed">
                Reserve the <strong className="text-text-primary">{variant.name}</strong> directly
                with your customized itinerary, passenger count, and route fare calculation.
              </p>
            </div>

            {/* Quick Metrics Badge List */}
            <div className="space-y-2.5 rounded-xl bg-surface-secondary p-3.5 border border-border text-xs">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Coach Type:</span>
                <span className="font-bold text-text-primary">{category.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Seating Capacity:</span>
                <span className="font-bold text-text-primary">{variant.capacity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Seat Layout:</span>
                <span className="font-bold text-primary">{variant.seatLayout} Recliner</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Rate Reference:</span>
                <span className="font-bold text-text-primary">
                  {variant.ratePerKm ? `₹${variant.ratePerKm}/km` : "Charter Quote"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Washroom:</span>
                <span className="font-bold text-text-primary">
                  {variant.specs?.washroom || "Not Available"}
                </span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                href={buildBookingUrl(variant.id)}
                className="group flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary-hover active:scale-[0.98]"
              >
                <span>Book This Vehicle</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`/fleets/${category.slug}`}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold text-text-primary transition-all hover:bg-surface-secondary hover:text-primary active:scale-[0.98]"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-primary" />
                <span>Back to {category.name} Booking Page</span>
              </Link>

              <a
                href="tel:+919876543210"
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-surface-inverse px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
              >
                <PhoneCall className="h-3.5 w-3.5 text-primary" />
                <span>Call Trip Coordinator</span>
              </a>
            </div>

            <p className="text-[11px] text-center text-text-muted leading-tight">
              Instant quote with transparent distance & GST breakdown.
            </p>
          </div>

          {/* Need Another Variant? */}
          <div className="rounded-2xl border border-border bg-surface-secondary/70 p-4 sm:p-5 text-xs">
            <h3 className="font-bold text-text-primary">Need a different capacity?</h3>
            <p className="mt-1 text-text-muted leading-relaxed">
              Bus Mantra operates 15 vehicle variants ranging from 12-seater VIP travellers
              to 53-seater multi-axle luxury highway coaches.
            </p>
            <Link
              href="/fleets"
              className="mt-3 inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
            >
              <span>Explore all 15 vehicle models</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

function SpecMetricItem({
  icon: Icon,
  label,
  value,
  sub,
  highlight = false,
}) {
  return (
    <div
      className={`rounded-2xl border p-4 transition-all ${
        highlight
          ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10"
          : "border-border bg-surface-secondary/80"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${
            highlight
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              : "bg-surface text-primary border border-border"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold text-text-primary sm:text-base">
        {value}
      </p>

      {sub && (
        <p className="mt-0.5 text-[11px] text-text-muted leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}
