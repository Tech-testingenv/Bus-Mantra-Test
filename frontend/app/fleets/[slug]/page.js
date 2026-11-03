"use client";

import {
  use,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Flame,
  ImageIcon,
  MapPin,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  X,
} from "lucide-react";

import DestinationMultiSelect from "@/components/fleet/destinationMultiSelect";

import { getBusBySlug } from "@/services/busSelectionService";
import { calculateRouteDistance } from "@/services/distanceCalculationService";
import { calculateCharterPrice, formatCurrency } from "@/services/pricingService";
import { fleetSlugFaqData } from "@/data/data";
import FAQSection from "@/components/common/faq"

import {
  getBookingSession,
  resolveInitialBookingState,
  saveBookingSession,
} from "@/services/bookingState";

const DEFAULT_FLEET_IMAGE = "/fleet/fleet.png";

const IMAGE_FIELDS = ["image", "imageUrl", "imagePath", "photo", "thumbnail"];

const FALLBACK_FLEET_IMAGES = [
  "/fleet/fleet.png",
  "/fleet/coach.png",
];

function getFleetImages(fleet) {
  const images = [
    ...(Array.isArray(fleet?.gallery) ? fleet.gallery : []),
    ...(Array.isArray(fleet?.images) ? fleet.images : []),
    ...(Array.isArray(fleet?.imageGallery)
      ? fleet.imageGallery
      : []),
    ...IMAGE_FIELDS.map((key) => fleet?.[key]).filter(Boolean),
  ].filter(Boolean);

  const uniqueImages = [...new Set(images)];

  if (uniqueImages.length === 0) {
    return [DEFAULT_FLEET_IMAGE];
  }

  return uniqueImages;
}

function SafeFleetImage({
  src,
  alt,
  fill = true,
  className = "",
  sizes,
  priority = false,
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleError = () => {
    if (currentSrc === DEFAULT_FLEET_IMAGE) {
      return;
    }

    setCurrentSrc(DEFAULT_FLEET_IMAGE);
  };

  return (
    <Image
      src={currentSrc || DEFAULT_FLEET_IMAGE}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      onError={handleError}
      className={className}
    />
  );
}

export default function FleetDetailPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams?.slug;

  const initialBus = getBusBySlug(slug);
  const [bus, setBus] = useState(initialBus);

  const searchParams = useSearchParams();

  const [bookingData, setBookingData] = useState(() =>
    resolveInitialBookingState(searchParams)
  );
  const [hasCustomRoute, setHasCustomRoute] = useState(() => {
    const savedBooking = getBookingSession();
    return (
      searchParams.has("pickup") ||
      searchParams.has("pickupPoint") ||
      searchParams.has("dest") ||
      searchParams.has("destination") ||
      Boolean(savedBooking?.pickupPoint || savedBooking?.destination)
    );
  });

  const [distanceResult, setDistanceResult] = useState(null);
  const [pricingResult, setPricingResult] = useState(null);
  const hasCoachEstimate = !hasCustomRoute &&
    (bus?.defaultRoundTripKm != null || bus?.defaultEstimatedFare != null);

  const [isBooked, setIsBooked] = useState(false);
  const [showFleetModal, setShowFleetModal] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const [, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    fetch(`/api/fleets/${encodeURIComponent(slug)}`)
      .then(async (response) => {
        if (response.status === 404) return null;
        if (!response.ok) throw new Error("Unable to load coach details.");
        return response.json();
      })
      .then((result) => {
        if (active && result) setBus(result);
      })
      .catch((error) => console.error("Fleet detail load failed:", error));
    return () => {
      active = false;
    };
  }, [slug]);

  const updateRouteCalculation = useCallback(
    async (pickup, destinations) => {
      try {
        const dist = await calculateRouteDistance({
          pickup,
          destinations,
        });

        const pricing = calculateCharterPrice({
          totalDistanceKm: dist.totalKm,
          bus,
        });

        startTransition(() => {
          setDistanceResult(dist);
          setPricingResult(pricing);
        });
      } catch (error) {
        console.error("Calculation failed:", error);
      }
    },
    [bus, startTransition]
  );

  useEffect(() => {
    if (!bus) return;
    updateRouteCalculation(
      bookingData.pickupPoint,
      bookingData.destination
    );
  }, [
    bookingData.pickupPoint,
    bookingData.destination,
    bus,
    updateRouteCalculation,
  ]);

  if (!bus) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-360 items-center justify-center px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">FLEET NOT FOUND</span>
          <h1 className="mt-2 text-3xl font-black text-text-primary">We couldn&apos;t find this coach.</h1>
          <p className="mt-2 text-sm text-text-muted">The fleet you&apos;re looking for is not available.</p>
          <Link href="/fleets" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover">
            <ArrowLeft className="h-4 w-4" /> Back to Fleet
          </Link>
        </div>
      </main>
    );
  }

  const handleFieldChange = (key, value) => {
    if (key === "pickupPoint" || key === "destination") setHasCustomRoute(true);
    setBookingData((previous) => {
      const updated = {
        ...previous,
        [key]: value,
      };

      saveBookingSession(updated);

      return updated;
    });
  };

  const handleDestinationsChange = (destinations) => {
    handleFieldChange("destination", destinations);
  };

  const handleConfirmBooking = (event) => {
    event.preventDefault();
    setIsBooked(true);
  };

  const openFleetModal = () => {
    setShowFleetModal(true);
  };

  const closeFleetModal = () => {
    setShowFleetModal(false);
  };

  return (
    <>
      <main className="relative mx-auto w-full max-w-360 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/fleets"
            className="group inline-flex items-center gap-2 text-xs font-bold text-text-muted transition-colors hover:text-primary sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4 text-primary transition-transform duration-200 group-hover:-translate-x-1" />
            Back to All Coaches
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <div className="flex w-full flex-col gap-8 lg:col-span-7">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  {bus.badge || "CHARTER COACH"}
                </span>

                {bus.isPopular && (
                  <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary-subtle px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    <Flame className="h-3 w-3 fill-primary" />
                    Most Popular
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-[42px]">
                {bus.name}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-text-secondary">
                <Users className="h-4 w-4 text-primary" />
                Capacity: {bus.capacity}
              </div>

              {bus.description && (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
                  {bus.description}
                </p>
              )}
            </div>

            <FleetHeroImage bus={bus} />

            {bus.features && (
              <section className="rounded-2xl border border-border bg-surface p-5 sm:rounded-3xl sm:p-6">
                <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                  VEHICLE SPECIFICATIONS
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <Specification
                    label="Luggage Bay"
                    value={bus.features.luggage}
                  />

                  <Specification
                    label="Climate Control"
                    value={bus.features.climate}
                  />

                  <Specification
                    label="Seating Layout"
                    value={bus.features.seats}
                  />

                  <Specification
                    label="Audio & Visual"
                    value={bus.features.entertainment}
                  />
                </div>
              </section>
            )}

            {bus.amenities?.length > 0 && (
              <section className="rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:rounded-3xl sm:p-6">
                <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                  INCLUDED COACH AMENITIES
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {bus.amenities.map((amenity, index) => (
                    <div
                      key={`${amenity}-${index}`}
                      className="flex items-center gap-2.5 text-xs font-semibold text-text-secondary sm:text-sm"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary">
                        <Check className="h-3 w-3 stroke-[2.6]" />
                      </span>

                      {amenity}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-[36px] bg-surface-inverse p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Premium Standards On Every Mile
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold text-primary">
                    Verified Chauffeurs
                  </h3>
                  <p className="mt-1 leading-relaxed text-white/85">
                    Experienced commercial highway drivers with spotless safety records.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-primary">
                    Deeply Sanitized
                  </h3>
                  <p className="mt-1 leading-relaxed text-white/85">
                    Every vehicle is sanitized and mechanically inspected before dispatch.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-primary">
                    24/7 Trip Support
                  </h3>
                  <p className="mt-1 leading-relaxed text-white/85">
                    Dedicated operations control room monitoring your schedule.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-primary">
                    Transparent Invoicing
                  </h3>
                  <p className="mt-1 leading-relaxed text-white/85">
                    Fuel, driver allowances and standard GST included.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="w-full lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:rounded-3xl sm:p-7">
              <div className="border-b border-border pb-4">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-primary sm:text-[11px]">
                  CUSTOM ROUTE & FARE
                </span>

                <h2 className="text-xl font-black tracking-tight text-text-primary sm:text-2xl">
                  Reserve {bus.name}
                </h2>
              </div>

              <div className="space-y-3.5">
                <div className="rounded-xl border border-border bg-surface-secondary px-4 py-3 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-focus-ring/30">
                  <label
                    htmlFor="detailPickupPoint"
                    className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted"
                  >
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    PICK-UP POINT
                  </label>

                  <input
                    id="detailPickupPoint"
                    type="text"
                    value={bookingData.pickupPoint || ""}
                    onChange={(event) =>
                      handleFieldChange(
                        "pickupPoint",
                        event.target.value
                      )
                    }
                    placeholder="Enter pickup point"
                    className="w-full bg-transparent text-xs font-semibold text-text-primary placeholder:text-text-muted outline-none sm:text-sm"
                  />
                </div>

                <DestinationMultiSelect
                  selectedDestinations={
                    Array.isArray(bookingData.destination)
                      ? bookingData.destination
                      : bookingData.destination
                        ? [bookingData.destination]
                        : []
                  }
                  onChange={handleDestinationsChange}
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    id="detailDeparture"
                    icon={Calendar}
                    label="DEPARTURE"
                    value={bookingData.departureDateTime || ""}
                    placeholder="30-09-2026 | 07:00 AM"
                    onChange={(value) =>
                      handleFieldChange(
                        "departureDateTime",
                        value
                      )
                    }
                  />

                  <FormField
                    id="detailReturn"
                    icon={Calendar}
                    label="RETURN"
                    value={bookingData.returnDateTime || ""}
                    placeholder="02-10-2026 | 09:00 PM"
                    onChange={(value) =>
                      handleFieldChange(
                        "returnDateTime",
                        value
                      )
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    id="detailName"
                    icon={User}
                    label="LEAD PASSENGER"
                    value={bookingData.fullName || ""}
                    placeholder="Your name"
                    onChange={(value) =>
                      handleFieldChange(
                        "fullName",
                        value
                      )
                    }
                  />

                  <FormField
                    id="detailMobile"
                    icon={Phone}
                    label="CONTACT MOBILE"
                    value={bookingData.mobile || ""}
                    placeholder="+91 XXXXX XXXXX"
                    onChange={(value) =>
                      handleFieldChange(
                        "mobile",
                        value
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-3.5 border-t border-border pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-surface-secondary p-3.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      EST. ROUND TRIP
                    </span>

                    <div className="mt-1">
                      <span className="text-xl font-black text-text-primary">
                        ≈ {!hasCustomRoute && bus.defaultRoundTripKm != null
                          ? Number(bus.defaultRoundTripKm).toLocaleString("en-IN")
                          : distanceResult?.totalKm || 0}
                      </span>

                      <span className="ml-1 text-[11px] font-bold uppercase text-text-muted">
                        KM
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-primary-subtle p-3.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-primary">
                      TOTAL ESTIMATED FARE
                    </span>

                    <div className="mt-1 text-xl font-black text-text-primary">
                      {!hasCustomRoute && bus.defaultEstimatedFare != null
                        ? formatCurrency(Number(bus.defaultEstimatedFare))
                        : pricingResult?.formattedTotalPrice || "₹0"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-surface-secondary p-3 text-[11px] font-medium leading-5 text-text-secondary">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

                  <span>
                    <span className="font-bold text-text-primary">
                      Trip Route:
                    </span>{" "}
                    {hasCoachEstimate
                      ? "Enter your pickup and destinations to see a custom route estimate."
                      : distanceResult?.routeSummaryText ||
                        "Your selected pickup and destination route will appear here."}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-2 px-0.5 pt-1 sm:grid-cols-3">
                  <Benefit text="State Tax" />
                  <Benefit text="Toll Tax" />
                  <Benefit text="Parking" />
                  <Benefit text="Driver Allowance" />
                  <Benefit text="Fuel & GST Included" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={openFleetModal}
                  className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 py-3 text-xs font-bold text-text-primary transition-all hover:border-primary/40 hover:bg-primary-subtle hover:text-primary active:scale-[0.98]"
                >
                  <ImageIcon className="h-4 w-4" />
                  View Bus Images
                </button>

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="group flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-xs font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:bg-primary-hover active:scale-[0.98]"
                >
                  Confirm Booking

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowQuote(true)}
                  className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-surface-inverse px-3 py-3 text-xs font-bold text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
                >
                  <PhoneCall className="h-4 w-4" />
                  Request a Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>


      {/* Fleet Detail Page FAQs */}
      <FAQSection data={fleetSlugFaqData} />

      {showFleetModal && (
        <FleetImagesModal
          fleet={bus}
          onClose={closeFleetModal}
        />
      )}

      {showFleetModal && (
        <FleetImagesModal
          fleet={bus}
          onClose={closeFleetModal}
        />
      )}

      {showQuote && (
        <QuoteModal
          bus={bus}
          bookingData={bookingData}
          onClose={() => setShowQuote(false)}
        />
      )}

      {isBooked && (
        <BookingConfirmation
          bus={bus}
          bookingData={bookingData}
          pricingResult={pricingResult}
          onClose={() => setIsBooked(false)}
        />
      )}
    </>
  );
}

function FleetImagesModal({ fleet, onClose }) {
  const images = getFleetImages(fleet);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousBodyTouchAction = body.style.touchAction;
    const previousBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";

    const preventScroll = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    window.addEventListener("wheel", preventScroll, {
      passive: false,
      capture: true,
    });

    window.addEventListener("touchmove", preventScroll, {
      passive: false,
      capture: true,
    });

    return () => {
      window.removeEventListener("wheel", preventScroll, true);
      window.removeEventListener("touchmove", preventScroll, true);

      html.style.overflow = previousHtmlOverflow;
      html.style.overscrollBehavior = previousHtmlOverscroll;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = "";
      body.style.right = "";
      body.style.width = previousBodyWidth;
      body.style.touchAction = previousBodyTouchAction;
      body.style.overscrollBehavior = previousBodyOverscroll;

      window.scrollTo(0, scrollY);
    };
  }, [mounted]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-9999 flex h-dvh w-screen items-center justify-center overflow-hidden bg-black/60 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-5"
      style={{
        overscrollBehavior: "none",
        touchAction: "none",
      }}
      onClick={onClose}
      onWheel={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onTouchMove={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="fleet-images-title"
        className="relative flex max-h-[calc(100dvh-24px)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_90px_rgba(0,0,0,0.3)] sm:max-h-[calc(100dvh-40px)]"
        onClick={(event) => event.stopPropagation()}
        onWheel={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onTouchMove={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className="shrink-0 border-b border-border px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                AVAILABLE FOR YOUR GROUP
              </p>

              <h3
                id="fleet-images-title"
                className="mt-1 text-2xl font-black tracking-tight text-text-primary sm:text-3xl"
              >
                Bus Images
              </h3>

              <p className="mt-1.5 text-xs text-text-muted sm:text-sm">
                Explore the available images of your selected coach.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close bus images"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-surface text-text-secondary transition-all hover:bg-primary-subtle hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden p-4 sm:p-6">
          {images.length > 0 ? (
            <div className="grid h-full min-h-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-border bg-surface"
                >
                  <SafeFleetImage
                    src={image}
                    alt={`${fleet?.name || "Selected coach"} image ${index + 1}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-55 items-center justify-center rounded-2xl bg-surface">
              <div className="text-center">
                <ImageIcon className="mx-auto h-8 w-8 text-text-muted" />
                <p className="mt-3 text-sm font-bold text-text-primary">
                  No bus images available
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-border px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function FleetHeroImage({ bus }) {
  const image = getFleetImages(bus)[0];

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:rounded-3xl">
      <SafeFleetImage
        src={image}
        alt={bus?.name || "Bus Mantra coach"}
        sizes="(max-width: 1024px) 100vw, 58vw"
        priority
        className="object-cover"
      />
    </div>
  );
}

function Specification({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-surface-secondary p-3">
      <span className="block text-[9px] font-bold uppercase tracking-wider text-text-muted">
        {label}
      </span>

      <span className="mt-1 block text-xs font-bold text-text-primary">
        {value || "Included"}
      </span>
    </div>
  );
}

function Assurance({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

      <div>
        <strong className="mb-0.5 block font-bold text-white">
          {title}
        </strong>

        <span>{description}</span>
      </div>
    </div>
  );
}

function MiniAssurance({
  icon: Icon,
  title,
}) {
  return (
    <div className="flex items-center gap-2.5 text-xs font-semibold text-white/80">
      <Icon className="h-4 w-4 text-primary" />
      {title}
    </div>
  );
}

function FormField({
  id,
  icon: Icon,
  label,
  value,
  placeholder,
  onChange,
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-secondary px-4 py-3 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-focus-ring/30">
      <label
        htmlFor={id}
        className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted"
      >
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-xs font-semibold text-text-primary placeholder:text-text-muted outline-none sm:text-sm"
      />
    </div>
  );
}

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] leading-5 text-text-secondary sm:text-[11px]">
      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
      <span>{text}</span>
    </div>
  );
}

function QuoteModal({
  bus,
  bookingData,
  onClose,
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-110 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl sm:rounded-3xl sm:p-8 border border-border"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-surface text-text-secondary hover:bg-primary-subtle hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
          REQUEST A QUOTE
        </span>

        <h3 className="pr-10 text-2xl font-black text-text-primary">
          Get a custom quote
        </h3>

        <p className="mt-2 text-sm leading-6 text-text-muted">
          Our trip coordinator will review your
          route and contact you regarding the{" "}
          {bus.name}.
        </p>

        <div className="mt-6 space-y-3">
          <div className="rounded-xl bg-surface-secondary p-4 border border-border">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              CONTACT
            </span>

            <p className="mt-1 text-sm font-bold text-text-primary">
              {bookingData.fullName || "Your Name"}
            </p>

            <p className="mt-1 text-xs text-text-muted">
              {bookingData.mobile || "Mobile number"}
            </p>
          </div>

          <div className="rounded-xl bg-surface-secondary p-4 border border-border">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              ROUTE
            </span>

            <p className="mt-1 text-sm font-bold text-text-primary">
              {bookingData.pickupPoint || "Pickup point"}
            </p>

            <p className="mt-1 text-xs text-text-muted">
              {Array.isArray(bookingData.destination)
                ? bookingData.destination.join(", ")
                : bookingData.destination || "Destination"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-xl bg-surface-muted py-3 text-sm font-bold text-text-primary hover:bg-surface-secondary"
          >
            Close
          </button>

          <a
            href="tel:+919876543210"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary-hover"
          >
            <PhoneCall className="h-4 w-4" />
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
}

function BookingConfirmation({
  bus,
  bookingData,
  pricingResult,
  onClose,
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-surface p-6 text-center shadow-2xl sm:p-8 border border-border">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-subtle text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-primary">
          RESERVATION REQUEST RECEIVED
        </span>

        <h3 className="text-xl font-black text-text-primary sm:text-2xl">
          Your Bus Is Reserved!
        </h3>

        <p className="mt-2 text-sm leading-6 text-text-muted">
          Our fleet operations team will contact
          you to confirm your journey.
        </p>

        <div className="mt-5 space-y-2 rounded-xl bg-surface-secondary p-4 text-left text-xs border border-border">
          <div className="flex justify-between gap-4">
            <span className="text-text-muted">
              Coach
            </span>

            <strong className="text-right text-text-primary">
              {bus.name}
            </strong>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-text-muted">
              Pickup
            </span>

            <strong className="text-right text-text-primary">
              {bookingData.pickupPoint || "Not specified"}
            </strong>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-text-muted">
              Estimated Fare
            </span>

            <strong className="text-right text-primary">
              {pricingResult?.formattedTotalPrice || "₹0"}
            </strong>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full cursor-pointer rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary-hover"
        >
          Close
        </button>
      </div>
    </div>
  );
}