"use client";

import {
  use,
  useCallback,
  useEffect,
  useMemo,
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
  Bus,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Flame,
  ImageIcon,
  Mail,
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
import { fleetSlugFaqData } from "@/data/data";
import FAQSection from "@/components/common/faq"

import BookingDateTimeField from "@/components/common/bookingDateTimeField";
import BookingDurationField from "@/components/common/bookingDurationField";
import BookingFormField from "@/components/common/bookingFormField";
import FareSummary from "@/components/common/fareSummary";
import { validateEmail } from "@/services/validationService";
import {
  toISODateString,
  isReturnBeforeDeparture,
  combineDateTime,
} from "@/services/dateService";

import {
  resolveInitialBookingState,
  saveBookingSession,
} from "@/services/bookingState";

const DEFAULT_FLEET_IMAGE = "/fleet/12_seater_maharaja_tempo_traveller_1.png";

const IMAGE_FIELDS = ["image", "imageUrl", "imagePath", "photo", "thumbnail"];

const FALLBACK_FLEET_IMAGES = [
  "/fleet/12_seater_maharaja_tempo_traveller_1.png",
  "/fleet/45-49_seater_tata_luxury_coach_1.png",
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
  const [emailError, setEmailError] = useState("");

  const [, startTransition] = useTransition();

  if (!bus) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-360 items-center justify-center px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            FLEET NOT FOUND
          </span>

          <h1 className="mt-2 text-3xl font-black text-text-primary">
            We couldn't find this coach.
          </h1>

          <p className="mt-2 text-sm text-text-muted">
            The fleet you're looking for is not available.
          </p>

          <Link
            href="/fleets"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Fleet
          </Link>
        </div>
      </main>
    );
  }

  const vehicleTypeOptions = useMemo(
    () => (Array.isArray(bus?.vehicleTypes) ? bus.vehicleTypes : []),
    [bus]
  );

  const supportsVehicleTypeSelection = vehicleTypeOptions.length > 0;

  const [selectedVehicleTypeKey, setSelectedVehicleTypeKey] = useState(() => {
    const fromQuery = searchParams?.get("vehicle") || searchParams?.get("vehicleType");
    if (fromQuery && vehicleTypeOptions.some((o) => o.id === fromQuery || o.slug === fromQuery)) {
      const match = vehicleTypeOptions.find((o) => o.id === fromQuery || o.slug === fromQuery);
      return match.id;
    }
    const sessionVehicle = bookingData?.vehicleType;
    if (sessionVehicle && vehicleTypeOptions.some((o) => o.id === sessionVehicle)) {
      return sessionVehicle;
    }
    if (bus?.defaultVariantId && vehicleTypeOptions.some((o) => o.id === bus.defaultVariantId)) {
      return bus.defaultVariantId;
    }
    const pCount = parseInt(bookingData?.passengers, 10);
    if (!isNaN(pCount) && pCount > 0) {
      const fitting = vehicleTypeOptions.filter((v) => (v.maxSeats || v.seats) >= pCount);
      if (fitting.length > 0) {
        fitting.sort((a, b) => (a.maxSeats || a.seats) - (b.maxSeats || b.seats));
        return fitting[0].id;
      }
    }
    return vehicleTypeOptions[0]?.id || "";
  });

  const activeVehicleType = useMemo(() => {
    if (vehicleTypeOptions.length === 0) return null;
    return (
      vehicleTypeOptions.find((opt) => opt.id === selectedVehicleTypeKey) ||
      vehicleTypeOptions[0]
    );
  }, [vehicleTypeOptions, selectedVehicleTypeKey]);

  // Merged effective bus object for the active variant
  const effectiveBus = useMemo(() => {
    if (!activeVehicleType) return bus;
    return {
      ...bus,
      ...activeVehicleType,
      id: activeVehicleType.id,
      name: activeVehicleType.name,
      capacity: activeVehicleType.capacity || `${activeVehicleType.seats} Passengers`,
      seatLayout: activeVehicleType.seatLayout,
      description: activeVehicleType.description || bus.description,
      image: activeVehicleType.image || bus.image,
      imageUrl: activeVehicleType.image || bus.imageUrl,
      gallery:
        activeVehicleType.gallery?.length > 0
          ? activeVehicleType.gallery
          : bus.gallery || [activeVehicleType.image || bus.image],
      images:
        activeVehicleType.gallery?.length > 0
          ? activeVehicleType.gallery
          : bus.images || [activeVehicleType.image || bus.image],
      ratePerKm: activeVehicleType.ratePerKm || bus.ratePerKm,
      features: {
        luggage: activeVehicleType.specs?.luggage || bus.features?.luggage || "Standard boot space",
        climate: activeVehicleType.specs?.climate || bus.features?.climate || "Individual AC vents",
        seats: `${activeVehicleType.seatLayout} Reclining Seats`,
        entertainment: activeVehicleType.specs?.audioVisual || bus.features?.entertainment || "Audio System",
        charging: activeVehicleType.specs?.charging || "USB Ports at each seat",
        washroom: activeVehicleType.specs?.washroom || bus.features?.washroom || "Not Available",
      },
      amenities:
        activeVehicleType.amenities?.length > 0
          ? activeVehicleType.amenities
          : bus.amenities,
      inclusions:
        activeVehicleType.inclusions?.length > 0
          ? activeVehicleType.inclusions
          : bus.inclusions,
    };
  }, [bus, activeVehicleType]);

  const passengerCount = parseInt(bookingData.passengers, 10);
  const capacityWarning = useMemo(() => {
    if (
      !activeVehicleType ||
      isNaN(passengerCount) ||
      passengerCount <= 0
    ) {
      return "";
    }
    const max = activeVehicleType.maxSeats || activeVehicleType.seats;
    if (passengerCount > max) {
      return `${activeVehicleType.name} accommodates up to ${max} passengers. Your group has ${passengerCount} passengers.`;
    }
    return "";
  }, [activeVehicleType, passengerCount]);

  const updateRouteCalculation = useCallback(
    async (pickup, destinations, vehicleOverride) => {
      try {
        const dist = await calculateRouteDistance({
          pickup,
          destinations,
        });

        const activeVehicle =
          vehicleOverride !== undefined ? vehicleOverride : activeVehicleType;

        const busForCalc = activeVehicle
          ? {
            ...bus,
            ...activeVehicle,
            id: activeVehicle.id,
            name: activeVehicle.name,
            ratePerKm: activeVehicle.ratePerKm,
          }
          : bus;

        const pricing = calculateCharterPrice({
          totalDistanceKm: dist.totalKm,
          bus: busForCalc,
        });

        startTransition(() => {
          setDistanceResult(dist);
          setPricingResult(pricing);
        });
      } catch (error) {
        console.error("Calculation failed:", error);
      }
    },
    [bus, activeVehicleType, startTransition]
  );

  useEffect(() => {
    updateRouteCalculation(
      bookingData.pickupPoint,
      bookingData.destination,
      activeVehicleType
    );
  }, [
    bookingData.pickupPoint,
    bookingData.destination,
    activeVehicleType,
    updateRouteCalculation,
  ]);

  const handleVehicleTypeChange = (newKey) => {
    setSelectedVehicleTypeKey(newKey);
    const selectedOpt =
      vehicleTypeOptions.find((o) => o.id === newKey) ||
      vehicleTypeOptions[0];

    const newPassengers = String(selectedOpt?.seats || selectedOpt?.maxSeats || bookingData.passengers);

    setBookingData((previous) => {
      const updated = {
        ...previous,
        vehicleType: newKey,
        vehicleTypeName: selectedOpt.name,
        ratePerKm: selectedOpt.ratePerKm,
        passengers: newPassengers,
      };
      saveBookingSession(updated);
      return updated;
    });

    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("vehicle", newKey);
        url.searchParams.set("passengers", newPassengers);
        window.history.replaceState(null, "", url.toString());
      } catch {
        // Safe fallback
      }
    }

    updateRouteCalculation(
      bookingData.pickupPoint,
      bookingData.destination,
      selectedOpt
    );
  };

  const handlePassengerCountChange = (newVal) => {
    const pCount = parseInt(newVal, 10);

    let matchedVariant = null;
    if (!isNaN(pCount) && pCount > 0 && vehicleTypeOptions.length > 0) {
      const fitting = vehicleTypeOptions.filter(
        (v) => (v.maxSeats || v.seats) >= pCount
      );
      if (fitting.length > 0) {
        fitting.sort((a, b) => (a.maxSeats || a.seats) - (b.maxSeats || b.seats));
        matchedVariant = fitting[0];
      } else {
        matchedVariant = vehicleTypeOptions[vehicleTypeOptions.length - 1];
      }
    }

    if (matchedVariant && matchedVariant.id !== selectedVehicleTypeKey) {
      setSelectedVehicleTypeKey(matchedVariant.id);
    }

    const currentVariant = matchedVariant || activeVehicleType;

    setBookingData((previous) => {
      const updated = {
        ...previous,
        passengers: newVal,
        ...(currentVariant
          ? {
              vehicleType: currentVariant.id,
              vehicleTypeName: currentVariant.name,
              ratePerKm: currentVariant.ratePerKm,
            }
          : {}),
      };
      saveBookingSession(updated);
      return updated;
    });

    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("passengers", newVal);
        if (currentVariant) {
          url.searchParams.set("vehicle", currentVariant.id);
        }
        window.history.replaceState(null, "", url.toString());
      } catch {
        // Safe fallback
      }
    }

    updateRouteCalculation(
      bookingData.pickupPoint,
      bookingData.destination,
      currentVariant
    );
  };

  const handleFieldChange = (key, value) => {
    setBookingData((previous) => {
      const updated = {
        ...previous,
        [key]: value,
      };

      // If departure date/time changes, ensure return date/time does not precede departure
      if (key === "departureDateTime" && value) {
        if (
          updated.returnDateTime &&
          isReturnBeforeDeparture(value, updated.returnDateTime)
        ) {
          // Sync return date to match departure date
          const depIso = toISODateString(value);
          const retParts = (updated.returnDateTime || "").split("|");
          const retTime = (retParts[1] || " 09:00 PM").trim();
          updated.returnDateTime = combineDateTime(depIso, retTime);
        }
      }

      saveBookingSession(updated);

      return updated;
    });
  };

  const handleDestinationsChange = (destinations) => {
    handleFieldChange("destination", destinations);
  };

  const handleConfirmBooking = (event) => {
    event.preventDefault();
    if (bookingData.email) {
      const err = validateEmail(bookingData.email, { required: false });
      if (err) {
        setEmailError(err);
        return;
      }
    }
    setEmailError("");
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
                <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-secondary border border-border">
                  {bus.name}
                </span>

                <span className="rounded-full bg-primary-subtle px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                  {effectiveBus.seatLayout} Layout
                </span>

                {bus.isPopular && (
                  <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary-subtle px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    <Flame className="h-3 w-3 fill-primary" />
                    Most Popular
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-[40px]">
                {effectiveBus.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-semibold text-text-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-primary" />
                  Capacity: <strong className="text-text-primary">{effectiveBus.capacity}</strong>
                </span>
                <span className="text-text-muted">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Bus className="h-4 w-4 text-primary" />
                  Seating: <strong className="text-text-primary">{effectiveBus.seatLayout} Push-back</strong>
                </span>
              </div>

              {effectiveBus.description && (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
                  {effectiveBus.description}
                </p>
              )}
            </div>

            <FleetHeroImage bus={effectiveBus} />

            {effectiveBus.features && (
              <section className="rounded-2xl border border-border bg-surface p-5 sm:rounded-3xl sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                    VEHICLE SPECIFICATIONS
                  </h2>

                  <Link
                    href={`/fleet-specifications/${effectiveBus.id || effectiveBus.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Full Specs
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Specification
                    label="Seating Capacity"
                    value={effectiveBus.capacity}
                  />

                  <Specification
                    label="Seat Configuration"
                    value={`${effectiveBus.seatLayout} Recliner`}
                  />

                  <Specification
                    label="Luggage Space"
                    value={effectiveBus.features.luggage}
                  />

                  <Specification
                    label="Climate Control"
                    value={effectiveBus.features.climate}
                  />

                  <Specification
                    label="Audio & Visual"
                    value={effectiveBus.features.entertainment}
                  />

                  <Specification
                    label="Onboard Washroom"
                    value={effectiveBus.features.washroom || "Not Available"}
                  />
                </div>

                <div className="mt-4 pt-3.5 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                  <span className="text-xs text-text-muted">
                    Looking for full engine, cabin dimensions, and mechanical specs?
                  </span>
                  <Link
                    href={`/fleet-specifications/${effectiveBus.id || effectiveBus.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-surface-secondary px-3 py-1.5 text-xs font-bold text-text-primary hover:text-primary transition-colors border border-border"
                  >
                    View Specifications Page
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </section>
            )}

            {effectiveBus.amenities?.length > 0 && (
              <section className="rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:rounded-3xl sm:p-6">
                <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                  CABIN FEATURES & AMENITIES
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {effectiveBus.amenities.map((amenity, index) => (
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

            {effectiveBus.inclusions?.length > 0 && (
              <section className="rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:rounded-3xl sm:p-6">
                <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                  BOOKING INCLUSIONS
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {effectiveBus.inclusions.map((inclusion, index) => (
                    <div
                      key={`${inclusion}-${index}`}
                      className="flex items-center gap-2.5 text-xs font-semibold text-text-secondary sm:text-sm"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.4]" />
                      </span>

                      {inclusion}
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
                  Reserve {effectiveBus.name}
                </h2>
              </div>

              <div className="space-y-3.5">
                {/* 1. NO. OF PASSENGERS */}
                <BookingFormField
                  id="detailPassengers"
                  icon={Users}
                  label="NO. OF PASSENGERS"
                  type="number"
                  min="1"
                  max="60"
                  value={bookingData.passengers || ""}
                  placeholder="e.g. 20"
                  onChange={handlePassengerCountChange}
                />

                {/* 2. SELECT VEHICLE DROPDOWN (Filtered to this fleet category) */}
                {vehicleTypeOptions.length > 0 && (
                  <div className="space-y-1">
                    <div className="rounded-xl border border-border bg-surface-secondary px-4 py-2.5 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-focus-ring/30">
                      <label
                        htmlFor="detailVehicleType"
                        className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-text-muted select-none"
                      >
                        <span className="flex items-center gap-1.5">
                          <Bus className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>SELECT VEHICLE</span>
                        </span>
                        {activeVehicleType?.capacity && (
                          <span className="text-[10px] font-bold text-primary">
                            {activeVehicleType.capacity}
                          </span>
                        )}
                      </label>

                      <div className="relative">
                        <select
                          id="detailVehicleType"
                          value={selectedVehicleTypeKey}
                          onChange={(e) => handleVehicleTypeChange(e.target.value)}
                          className="w-full appearance-none bg-transparent pr-8 text-xs font-semibold text-text-primary outline-none sm:text-sm cursor-pointer"
                        >
                          {vehicleTypeOptions.map((opt) => (
                            <option
                              key={opt.id}
                              value={opt.id}
                              className="bg-surface text-text-primary py-1"
                            >
                              {opt.name} ({opt.capacity || `${opt.seats} Seats`})
                            </option>
                          ))}
                        </select>

                        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                      </div>
                    </div>

                    {capacityWarning && (
                      <p className="px-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                        {capacityWarning}
                      </p>
                    )}
                  </div>
                )}
                <BookingFormField
                  id="detailPickupPoint"
                  icon={MapPin}
                  label="PICK-UP POINT"
                  value={bookingData.pickupPoint || ""}
                  onChange={(value) =>
                    handleFieldChange(
                      "pickupPoint",
                      value
                    )
                  }
                  placeholder="Enter pickup point"
                />

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
                  <BookingDateTimeField
                    id="detailDeparture"
                    label="DEPARTURE"
                    value={bookingData.departureDateTime || ""}
                    onChange={(value) =>
                      handleFieldChange(
                        "departureDateTime",
                        value
                      )
                    }
                  />

                  <BookingDateTimeField
                    id="detailReturn"
                    label="RETURN"
                    value={bookingData.returnDateTime || ""}
                    minDate={toISODateString(bookingData.departureDateTime)}
                    onChange={(value) =>
                      handleFieldChange(
                        "returnDateTime",
                        value
                      )
                    }
                  />
                </div>

                <BookingDurationField
                  departureValue={bookingData.departureDateTime}
                  returnValue={bookingData.returnDateTime}
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <BookingFormField
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

                  <BookingFormField
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

                <BookingFormField
                  id="detailEmail"
                  icon={Mail}
                  label="EMAIL ADDRESS"
                  type="email"
                  value={bookingData.email || ""}
                  placeholder="Enter your email address"
                  error={emailError}
                  onChange={(value) => {
                    handleFieldChange("email", value);
                    if (emailError) {
                      setEmailError(validateEmail(value, { required: false }));
                    }
                  }}
                  onBlur={(e) => {
                    setEmailError(validateEmail(e.target.value, { required: false }));
                  }}
                />
              </div>

              <div className="space-y-3.5 border-t border-border pt-4">
                <div className="rounded-xl border border-border bg-surface-secondary px-4 py-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    EST. ROUND TRIP DISTANCE
                  </span>

                  <div>
                    <span className="text-xl font-black text-text-primary">
                      ≈ {distanceResult?.totalKm || 0}
                    </span>

                    <span className="ml-1 text-[11px] font-bold uppercase text-text-muted">
                      KM
                    </span>
                  </div>
                </div>

                <FareSummary
                  basePrice={pricingResult?.formattedBasePrice || "₹0"}
                  gstAmount={pricingResult?.formattedEstimatedTax || "₹0"}
                  totalFare={pricingResult?.formattedTotalPrice || "₹0"}
                  gstRatePercent={pricingResult?.gstPercent || "5%"}
                />

                <div className="flex items-start gap-2 rounded-xl bg-surface-secondary p-3 text-[11px] font-medium leading-5 text-text-secondary">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

                  <span>
                    <span className="font-bold text-text-primary">
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

              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/fleet-specifications/${effectiveBus.id || effectiveBus.slug}`}
                    className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-bold text-text-primary transition-all hover:border-primary/50 hover:bg-primary-subtle hover:text-primary active:scale-[0.98]"
                  >
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span>Specifications</span>
                  </Link>

                  <button
                    type="button"
                    onClick={openFleetModal}
                    className="flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-bold text-text-primary transition-all hover:border-primary/50 hover:bg-primary-subtle hover:text-primary active:scale-[0.98]"
                  >
                    <ImageIcon className="h-4 w-4 text-primary shrink-0" />
                    <span>Bus Images ({getFleetImages(effectiveBus).length})</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="group flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-xs font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:bg-primary-hover active:scale-[0.98]"
                  >
                    <span>Confirm Booking</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowQuote(true)}
                    className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-surface-inverse px-3 py-3 text-xs font-bold text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span>Request a Quote</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fleet Detail Page FAQs */}
      <FAQSection data={fleetSlugFaqData} />

      {showFleetModal && (
        <FleetImagesModal
          fleet={effectiveBus}
          onClose={closeFleetModal}
        />
      )}

      {showQuote && (
        <QuoteModal
          bus={effectiveBus}
          bookingData={bookingData}
          onClose={() => setShowQuote(false)}
        />
      )}

      {isBooked && (
        <BookingConfirmation
          bus={effectiveBus}
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
  const images = getFleetImages(bus);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [bus?.id, bus?.name]);

  const activeSrc = images[activeIndex] || images[0] || DEFAULT_FLEET_IMAGE;

  return (
    <div className="space-y-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:rounded-3xl">
        <SafeFleetImage
          key={activeSrc}
          src={activeSrc}
          alt={bus?.name || "Bus Mantra coach"}
          sizes="(max-width: 1024px) 100vw, 58vw"
          priority
          className="object-cover transition-opacity duration-300"
        />
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <ImageIcon className="h-3.5 w-3.5 text-primary" />
            <span>
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition-all cursor-pointer ${
                activeIndex === idx
                  ? "border-primary ring-2 ring-primary/40 scale-102"
                  : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <SafeFleetImage
                src={img}
                alt={`${bus?.name || "Coach"} thumbnail ${idx + 1}`}
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
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

            {bookingData.email && (
              <p className="mt-0.5 text-xs text-text-muted">
                {bookingData.email}
              </p>
            )}
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