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
import { calculateCharterPrice } from "@/services/pricingService";
import {fleetSlugFaqData} from "@/data/data";
import FAQSection from "@/components/common/faq"

import {
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

  const bus = getBusBySlug(slug);

  const searchParams = useSearchParams();

  const [bookingData, setBookingData] = useState(() =>
    resolveInitialBookingState(searchParams)
  );

  const [distanceResult, setDistanceResult] = useState(null);
  const [pricingResult, setPricingResult] = useState(null);

  const [isBooked, setIsBooked] = useState(false);
  const [showFleetModal, setShowFleetModal] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const [, startTransition] = useTransition();

  if (!bus) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-360 items-center justify-center px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#123999]">
            FLEET NOT FOUND
          </span>

          <h1 className="mt-2 text-3xl font-black text-black">
            We couldn't find this coach.
          </h1>

          <p className="mt-2 text-sm text-black/60">
            The fleet you're looking for is not available.
          </p>

          <Link
            href="/fleets"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FFC003] px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[#123999]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Fleet
          </Link>
        </div>
      </main>
    );
  }

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
    updateRouteCalculation(
      bookingData.pickupPoint,
      bookingData.destination
    );
  }, [
    bookingData.pickupPoint,
    bookingData.destination,
    updateRouteCalculation,
  ]);

  const handleFieldChange = (key, value) => {
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
            className="group inline-flex items-center gap-2 text-xs font-bold text-black/70 transition-colors hover:text-[#123999] sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4 text-[#123999] transition-transform duration-200 group-hover:-translate-x-1" />
            Back to All Coaches
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <div className="flex w-full flex-col gap-8 lg:col-span-7">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black/70">
                  {bus.badge || "CHARTER COACH"}
                </span>

                {bus.isPopular && (
                  <span className="flex items-center gap-1 rounded-full border border-[#123999]/30 bg-[#FFC003]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#123999]">
                    <Flame className="h-3 w-3 fill-[#123999]" />
                    Most Popular
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-[42px]">
                {bus.name}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-black/80">
                <Users className="h-4 w-4 text-[#123999]" />
                Capacity: {bus.capacity}
              </div>

              {bus.description && (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-black/70 sm:text-base">
                  {bus.description}
                </p>
              )}
            </div>

            <FleetHeroImage bus={bus} />

            {bus.features && (
              <section className="rounded-2xl border border-[#123999]/20 bg-white p-5 sm:rounded-3xl sm:p-6">
                <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-black/50">
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
              <section className="rounded-2xl border border-[#123999]/20 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:rounded-3xl sm:p-6">
                <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-black/50">
                  INCLUDED COACH AMENITIES
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {bus.amenities.map((amenity, index) => (
                    <div
                      key={`${amenity}-${index}`}
                      className="flex items-center gap-2.5 text-xs font-semibold text-black/80 sm:text-sm"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFC003]/20 text-[#123999]">
                        <Check className="h-3 w-3 stroke-[2.6]" />
                      </span>

                      {amenity}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-[36px] bg-[#123999] p-8 md:p-12">
  <h2 className="text-2xl font-bold text-white md:text-3xl">
    Premium Standards On Every Mile
  </h2>

  <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
    <div>
      <h3 className="text-lg font-bold text-[#FFC003]">
        Verified Chauffeurs
      </h3>
      <p className="mt-1 leading-relaxed text-white/85">
        Experienced commercial highway drivers with spotless safety records.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-bold text-[#FFC003]">
        Deeply Sanitized
      </h3>
      <p className="mt-1 leading-relaxed text-white/85">
        Every vehicle is sanitized and mechanically inspected before dispatch.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-bold text-[#FFC003]">
        24/7 Trip Support
      </h3>
      <p className="mt-1 leading-relaxed text-white/85">
        Dedicated operations control room monitoring your schedule.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-bold text-[#FFC003]">
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
            <div className="space-y-5 rounded-2xl border border-[#123999]/20 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:rounded-3xl sm:p-7">
              <div className="border-b border-black/10 pb-4">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[#123999] sm:text-[11px]">
                  CUSTOM ROUTE & FARE
                </span>

                <h2 className="text-xl font-black tracking-tight text-black sm:text-2xl">
                  Reserve {bus.name}
                </h2>
              </div>

              <div className="space-y-3.5">
                <div className="rounded-xl border border-[#123999]/30 bg-white px-4 py-3 transition-colors focus-within:border-[#123999] focus-within:ring-2 focus-within:ring-[#123999]/30">
                  <label
                    htmlFor="detailPickupPoint"
                    className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-black/50"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[#123999]" />
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
                    className="w-full bg-transparent text-xs font-semibold text-black placeholder:text-black/50 outline-none sm:text-sm"
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

              <div className="space-y-3.5 border-t border-black/10 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-black/10 bg-white p-3.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-black/50">
                      EST. ROUND TRIP
                    </span>

                    <div className="mt-1">
                      <span className="text-xl font-black text-black">
                        ≈ {distanceResult?.totalKm || 0}
                      </span>

                      <span className="ml-1 text-[11px] font-bold uppercase text-black/60">
                        KM
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#123999]/20 bg-[#FFC003]/15 p-3.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#123999]">
                      TOTAL ESTIMATED FARE
                    </span>

                    <div className="mt-1 text-xl font-black text-black">
                      {pricingResult?.formattedTotalPrice || "₹0"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-white p-3 text-[11px] font-medium leading-5 text-black/80">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#123999]" />

                  <span>
                    <span className="font-bold text-black">
                      Trip Route:
                    </span>{" "}
                    {distanceResult?.routeSummaryText ||
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
                  className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#123999]/20 bg-white px-3 py-3 text-xs font-bold text-black transition-all hover:border-[#123999]/40 hover:bg-[#FFC003]/20 hover:text-[#123999] active:scale-[0.98]"
                >
                  <ImageIcon className="h-4 w-4" />
                  View Bus Images
                </button>

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="group flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#FFC003] px-3 py-3 text-xs font-bold text-black shadow-md shadow-[#123999]/15 transition-all hover:bg-[#123999] active:scale-[0.98]"
                >
                  Confirm Booking

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowQuote(true)}
                  className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#123999] px-3 py-3 text-xs font-bold text-white transition-all hover:bg-[#0D2B73] active:scale-[0.98]"
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
      className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-black/60 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-5"
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
        <div className="shrink-0 border-b border-[#123999]/20 px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#123999]">
                AVAILABLE FOR YOUR GROUP
              </p>

              <h3
                id="fleet-images-title"
                className="mt-1 text-2xl font-black tracking-tight text-black sm:text-3xl"
              >
                Bus Images
              </h3>

              <p className="mt-1.5 text-xs text-black/60 sm:text-sm">
                Explore the available images of your selected coach.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close bus images"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-black/70 transition-all hover:bg-[#FFC003]/20 hover:text-black"
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
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#123999]/20 bg-white"
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
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl bg-white">
              <div className="text-center">
                <ImageIcon className="mx-auto h-8 w-8 text-black/40" />
                <p className="mt-3 text-sm font-bold text-black">
                  No bus images available
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-[#123999]/20 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl bg-[#123999] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#0D2B73]"
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
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#123999]/20 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:rounded-3xl">
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
    <div className="rounded-xl border border-[#123999]/20 bg-white p-3">
      <span className="block text-[9px] font-bold uppercase tracking-wider text-black/50">
        {label}
      </span>

      <span className="mt-1 block text-xs font-bold text-black">
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
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#123999]" />

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
      <Icon className="h-4 w-4 text-[#123999]" />
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
    <div className="rounded-xl border border-[#123999]/30 bg-white px-4 py-3 transition-colors focus-within:border-[#123999] focus-within:ring-2 focus-within:ring-[#123999]/30">
      <label
        htmlFor={id}
        className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-black/50"
      >
        <Icon className="h-3.5 w-3.5 text-[#123999]" />
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-xs font-semibold text-black placeholder:text-black/50 outline-none sm:text-sm"
      />
    </div>
  );
}

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] leading-5 text-black/70 sm:text-[11px]">
      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#123999]" />
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
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-black/70 hover:bg-[#FFC003]/20"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#123999]">
          REQUEST A QUOTE
        </span>

        <h3 className="pr-10 text-2xl font-black text-black">
          Get a custom quote
        </h3>

        <p className="mt-2 text-sm leading-6 text-black/60">
          Our trip coordinator will review your
          route and contact you regarding the{" "}
          {bus.name}.
        </p>

        <div className="mt-6 space-y-3">
          <div className="rounded-xl bg-white p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">
              CONTACT
            </span>

            <p className="mt-1 text-sm font-bold text-black">
              {bookingData.fullName || "Your Name"}
            </p>

            <p className="mt-1 text-xs text-black/60">
              {bookingData.mobile || "Mobile number"}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">
              ROUTE
            </span>

            <p className="mt-1 text-sm font-bold text-black">
              {bookingData.pickupPoint || "Pickup point"}
            </p>

            <p className="mt-1 text-xs text-black/60">
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
            className="flex-1 cursor-pointer rounded-xl bg-white py-3 text-sm font-bold text-black hover:bg-[#FFC003]/20"
          >
            Close
          </button>

          <a
            href="tel:+919876543210"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FFC003] py-3 text-sm font-bold text-black hover:bg-[#123999]"
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFC003]/20 text-[#123999]">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[#123999]">
          RESERVATION REQUEST RECEIVED
        </span>

        <h3 className="text-xl font-black text-black sm:text-2xl">
          Your Bus Is Reserved!
        </h3>

        <p className="mt-2 text-sm leading-6 text-black/70">
          Our fleet operations team will contact
          you to confirm your journey.
        </p>

        <div className="mt-5 space-y-2 rounded-xl bg-white p-4 text-left text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-black/60">
              Coach
            </span>

            <strong className="text-right text-black">
              {bus.name}
            </strong>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-black/60">
              Pickup
            </span>

            <strong className="text-right text-black">
              {bookingData.pickupPoint || "Not specified"}
            </strong>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-black/60">
              Estimated Fare
            </span>

            <strong className="text-right text-[#123999]">
              {pricingResult?.formattedTotalPrice || "₹0"}
            </strong>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full cursor-pointer rounded-xl bg-[#123999] py-3.5 text-sm font-bold text-white hover:bg-[#0D2B73]"
        >
          Close
        </button>
      </div>
    </div>
  );
}