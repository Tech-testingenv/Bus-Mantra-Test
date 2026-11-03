"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Users,
  X,
} from "lucide-react";

import {
  destinationsData,
  fleetTypesData,
  destinationSlugFaqData
} from "@/data/data";
import FAQSection from "@/components/common/faq";

export default function DestinationSlugPage({ params }) {
  const { slug } = use(params);

  const destination = destinationsData?.[slug];

  if (!destination) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-360 items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
            Destination not found
          </p>

          <h1 className="mt-2 text-3xl font-black text-black">
            We couldn't find this destination.
          </h1>

          <Link
            href="/destinations"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover hover:shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to destinations
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-360 px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-24">
      <div className="mb-5">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black/60 transition-colors duration-200 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to destinations
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-9 xl:gap-10">
        <div className="lg:col-span-7">
          <DestinationHeader destination={destination} />

          <DestinationGallery destination={destination} />

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <QuickInfo
              label="Destination"
              value={destination.name}
              icon={<MapPin className="h-3.5 w-3.5" />}
            />

            <QuickInfo
              label="Travel Type"
              value="Group Travel"
              icon={<CheckCircle2 className="h-3.5 w-3.5" />}
            />

            <QuickInfo
              label="Booking"
              value="Full Coach"
              icon={<CheckCircle2 className="h-3.5 w-3.5" />}
              className="col-span-2 sm:col-span-1"
            />
          </div>

          <div className="mt-10 sm:mt-12 lg:mt-14">
            <PopularPlaces
              places={destination.popularPlaces || []}
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <DestinationBookingForm
            destination={destination}
          />
        </div>
      </div>
      {/* Destination Slug FAQ Section */}
      <FAQSection data={destinationSlugFaqData} />
    </main>
  );
}

function DestinationHeader({ destination }) {
  return (
    <div className="mb-5">
      {destination.badge && (
        <span className="mb-3 inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black/70">
          {destination.badge}
        </span>
      )}

      <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-black sm:text-4xl lg:text-[42px] xl:text-[46px]">
        {destination.name}
      </h1>

      {destination.route && (
        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-black/60">
          <MapPin className="h-4 w-4 text-primary" />
          {destination.route}
        </div>
      )}

      {destination.description && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-black/70 sm:text-base">
          {destination.description}
        </p>
      )}
    </div>
  );
}

function DestinationGallery({ destination }) {
  const gallery = useMemo(() => {
    if (destination?.gallery?.length) {
      return destination.gallery;
    }

    if (destination?.image) {
      return [destination.image];
    }

    return [];
  }, [destination]);

  const [activeImage, setActiveImage] = useState(0);
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    setActiveImage(0);
  }, [destination.slug]);

  const changeImage = (index) => {
    if (
      index === activeImage ||
      gallery.length <= 1
    ) {
      return;
    }

    setChanging(true);

    window.setTimeout(() => {
      setActiveImage(index);
      setChanging(false);
    }, 120);
  };

  const nextImage = () => {
    if (gallery.length <= 1) {
      return;
    }

    const next =
      activeImage === gallery.length - 1
        ? 0
        : activeImage + 1;

    changeImage(next);
  };

  const previousImage = () => {
    if (gallery.length <= 1) {
      return;
    }

    const previous =
      activeImage === 0
        ? gallery.length - 1
        : activeImage - 1;

    changeImage(previous);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.055)] sm:rounded-3xl">
      <div className="relative aspect-video w-full overflow-hidden">
        {gallery.length > 0 ? (
          <Image
            src={gallery[activeImage]}
            alt={`${destination.name} destination`}
            fill
            priority
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 58vw"
            className={`object-cover transition-all duration-300 ${
              changing
                ? "scale-[1.015] opacity-60"
                : "scale-100 opacity-100"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-black/45">
            Image unavailable
          </div>
        )}

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-md transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground sm:left-4 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-md transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground sm:right-4 sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm sm:bottom-4 sm:right-4">
              {activeImage + 1}/{gallery.length}
            </div>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto bg-white p-2.5 sm:p-3">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => changeImage(index)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 sm:h-16 sm:w-24 ${
                activeImage === index
                  ? "border-primary"
                  : "border-transparent opacity-65 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${destination.name} thumbnail ${index + 1}`}
                fill
                quality={100}
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

function QuickInfo({
  label,
  value,
  icon,
  className = "",
}) {
  return (
    <div
      className={`rounded-xl border border-black/10 bg-white px-3.5 py-3 ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-black/45">
        <span className="text-primary">
          {icon}
        </span>

        {label}
      </div>

      <p className="mt-1 text-xs font-bold text-black">
        {value}
      </p>
    </div>
  );
}

function DestinationBookingForm({ destination }) {
  const [formData, setFormData] = useState({
    pickup: "",
    departureDate: "",
    departureTime: "07:00",
    returnDate: "",
    returnTime: "21:00",
    passengers: "",
    leadPassenger: "",
    mobile: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showBusImages, setShowBusImages] = useState(false);
  const [quoteRequested, setQuoteRequested] = useState(false);

  const estimatedKm =
    destination?.estimatedKm ?? 560;

  const estimatedFare =
    destination?.estimatedFare ?? 16464;

  const destinationName =
    destination?.name || "Jaipur";

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.leadPassenger,
          email: formData.email,
          mobile: formData.mobile,
          passengers: formData.passengers,
          pickupPoint: formData.pickup,
          destination: [formData.destination || destination?.name],
          departureDateTime: `${formData.departureDate} | ${formData.departureTime}`,
          returnDateTime: formData.returnDate ? `${formData.returnDate} | ${formData.returnTime}` : null,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit booking.");
    } catch (error) {
      setSubmitError(error.message);
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-black/10 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.065)] sm:rounded-3xl sm:p-6"
      >
        <div className="border-b border-black/10 pb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
            CUSTOM ROUTE & FARE
          </p>

          <h2 className="mt-1 text-[24px] font-black leading-tight tracking-tight text-black sm:text-[25px]">
            Reserve Mini Coach
          </h2>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-white px-4 py-3.5">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />

              <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-black/45">
                PICK-UP POINT
              </span>
            </div>

            <input
              type="text"
              value={formData.pickup}
              onChange={(event) =>
                updateField(
                  "pickup",
                  event.target.value
                )
              }
              className="mt-1 w-full bg-transparent text-xs font-bold text-black outline-none placeholder:text-black/50 placeholder:opacity-100"
              placeholder="Enter pickup point"
              required
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-black/45">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                DESTINATION(S)
              </label>

              <span className="text-[9px] text-black/45">
                multi-city route
              </span>
            </div>

            <div className="flex min-h-13.25 items-center gap-2 rounded-xl bg-white px-3.5">
              <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black/80 shadow-sm">
                {destinationName}

                <button
                  type="button"
                  className="text-sm leading-none text-black/45 transition-colors hover:text-black/80"
                >
                  ×
                </button>
              </span>

              <span className="truncate text-xs text-black/45">
                + Add another city...
              </span>

              <ChevronRight className="ml-auto h-4 w-4 shrink-0 rotate-90 text-black/45" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <DateTimeField
              label="DEPARTURE"
              date={formData.departureDate}
              time={formData.departureTime}
              onDateChange={(value) =>
                updateField(
                  "departureDate",
                  value
                )
              }
              onTimeChange={(value) =>
                updateField(
                  "departureTime",
                  value
                )
              }
            />

            <DateTimeField
              label="RETURN"
              date={formData.returnDate}
              time={formData.returnTime}
              onDateChange={(value) =>
                updateField(
                  "returnDate",
                  value
                )
              }
              onTimeChange={(value) =>
                updateField(
                  "returnTime",
                  value
                )
              }
            />
          </div>

          <div className="rounded-xl bg-white px-3.5 py-3.5">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-primary" />

              <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-black/45">
                NO. OF PASSENGERS
              </span>
            </div>

            <input
              type="number"
              min="1"
              max="60"
              value={formData.passengers}
              onChange={(event) =>
                updateField(
                  "passengers",
                  event.target.value
                )
              }
              placeholder="e.g. 19"
              className="mt-1 w-full bg-transparent text-xs font-bold text-black outline-none placeholder:text-black/50 placeholder:opacity-100"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <FormInput
              label="LEAD PASSENGER"
              placeholder="e.g. Rahul Sharma"
              value={formData.leadPassenger}
              onChange={(value) =>
                updateField(
                  "leadPassenger",
                  value
                )
              }
              icon={<UserIcon />}
              required
            />

            <FormInput
              label="CONTACT MOBILE"
              placeholder="+91 XXXXX XXXXX"
              type="tel"
              value={formData.mobile}
              onChange={(value) =>
                updateField(
                  "mobile",
                  value
                )
              }
              icon={
                <Phone className="h-3.5 w-3.5" />
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
            <div className="rounded-xl bg-white px-3.5 py-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-black/45">
                EST. ROUND TRIP
              </p>

              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[22px] font-black leading-none text-black">
                  ≈ {estimatedKm}
                </span>

                <span className="text-[10px] font-bold text-black/60">
                  KM
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary-subtle px-3.5 py-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-primary">
                TOTAL ESTIMATED FARE
              </p>

              <div className="mt-1">
                <span className="text-[22px] font-black leading-none text-black">
                  ₹
                  {Number(
                    estimatedFare
                  ).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white px-3.5 py-3">
            <div className="flex items-start gap-2 text-[10px] leading-5 text-black/70">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

              <span>
                <span className="font-bold text-black">
                  Route Path:
                </span>{" "}
                {formData.pickup || "Delhi NCR"} →{" "}
                {destinationName} →{" "}
                {formData.pickup || "Delhi NCR"}{" "}
                (Return)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-2 px-0.5 pt-1 sm:grid-cols-3">
            <Benefit text="State Tax" />
            <Benefit text="Toll Tax" />
            <Benefit text="Parking" />
            <Benefit text="Driver Allowance" />
            <Benefit text="Fuel & GST Included" />
          </div>

          <div className="mt-1 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setShowBusImages(true)}
              className="flex h-14 min-h-14 min-w-0 items-center justify-center rounded-xl border border-primary/30 bg-surface px-2 text-[10px] font-bold leading-tight text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-md sm:px-3 sm:text-xs"
            >
              View Bus Images
            </button>

            <button
              type="submit"
              className="group flex h-14 min-h-14 min-w-0 items-center justify-center gap-1 rounded-xl bg-primary px-2 text-[10px] font-bold leading-tight text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md active:translate-y-0 sm:px-3 sm:text-xs"
            >
              <span>Confirm Booking</span>

              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </button>

            <button
              type="button"
              onClick={() => setQuoteRequested(true)}
              className="flex h-14 min-h-14 min-w-0 items-center justify-center rounded-xl border border-border bg-surface-inverse px-2 text-[10px] font-bold leading-tight text-text-inverse transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-md sm:px-3 sm:text-xs"
            >
              Request a Quote
            </button>
          </div>
          {submitError && <p className="mt-3 text-sm font-medium text-red-600">{submitError}</p>}
        </div>
      </form>

      {showBusImages && (
        <BusImagesModal
          passengers={Number(formData.passengers) || 0}
          onClose={() => setShowBusImages(false)}
        />
      )}

      {quoteRequested && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle text-primary">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-2xl font-black tracking-tight text-black">
              Quote request ready
            </h3>

            <p className="mt-3 text-sm leading-6 text-black/60">
              We have your request for{" "}
              <span className="font-semibold text-black">
                {formData.passengers || "your group"}
              </span>{" "}
              passengers travelling to{" "}
              <span className="font-semibold text-black">
                {destinationName}
              </span>
              . Our team can confirm the final quote and vehicle availability.
            </p>

            <button
              type="button"
              onClick={() =>
                setQuoteRequested(false)
              }
              className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover hover:shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {submitted && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle text-primary">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-2xl font-black tracking-tight text-black">
              Request received
            </h3>

            <p className="mt-3 text-sm leading-6 text-black/60">
              Thanks for your booking request for{" "}
              <span className="font-semibold text-black">
                {destinationName}
              </span>
              . Our team will contact you shortly to confirm availability and booking details.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="flex-1 rounded-xl border border-black/10 px-4 py-3 text-sm font-bold text-black/80 transition-colors hover:bg-surface-secondary"
              >
                Close
              </button>

              <a
                href="tel:+919999999999"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover hover:shadow-lg"
              >
                <Phone className="h-4 w-4" />
                Call Support
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function getFleetImages(bus) {
  const images = [
    ...(Array.isArray(bus?.gallery)
      ? bus.gallery
      : []),

    ...(Array.isArray(bus?.images)
      ? bus.images
      : []),

    ...(Array.isArray(bus?.imageGallery)
      ? bus.imageGallery
      : []),

    ...(bus?.image
      ? [bus.image]
      : []),
  ].filter(Boolean);

  return [...new Set(images)];
}

function BusImagesModal({
  passengers,
  onClose,
}) {
  const matchingBuses = fleetTypesData.filter(
    (bus) => {
      const minSeats = Number(bus?.minSeats);
      const maxSeats = Number(bus?.maxSeats);

      if (
        Number.isFinite(minSeats) &&
        Number.isFinite(maxSeats)
      ) {
        return (
          passengers >= minSeats &&
          passengers <= maxSeats
        );
      }

      return true;
    }
  );

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-110 flex h-screen w-screen items-center justify-center bg-black/60 px-3 py-4 backdrop-blur-sm sm:px-5"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_90px_rgba(0,0,0,0.28)]"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="shrink-0 border-b border-black/10 px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                AVAILABLE FOR YOUR GROUP
              </p>

              <h3 className="mt-1 text-2xl font-black tracking-tight text-black sm:text-3xl">
                Bus Images
              </h3>

              <p className="mt-1.5 text-xs text-black/60 sm:text-sm">
                {passengers > 0
                  ? `Showing all available images for suitable fleets for ${passengers} passengers.`
                  : "Enter passengers to see suitable fleets."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close bus images"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black/70 transition-all hover:bg-primary-subtle hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          {passengers < 1 ? (
            <div className="flex min-h-60 items-center justify-center rounded-2xl bg-white">
              <div className="text-center">
                <Users className="mx-auto h-8 w-8 text-primary" />

                <p className="mt-3 text-sm font-bold text-black">
                  Enter the number of passengers first
                </p>

                <p className="mt-1 text-xs text-black/60">
                  Enter your group size in the booking form.
                </p>
              </div>
            </div>
          ) : matchingBuses.length > 0 ? (
            <div className="space-y-8">
              {matchingBuses.map((bus) => {
                const busImages =
                  getFleetImages(bus);

                const busSlug =
                  bus?.slug || bus?.id;

                if (!busImages.length) {
                  return null;
                }

                return (
                  <div
                    key={
                      busSlug ||
                      bus?.name
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-lg font-black tracking-tight text-black sm:text-xl">
                        {bus?.name || "Fleet"}
                      </h4>

                      <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-black/60">
                        {busImages.length}{" "}
                        {busImages.length === 1
                          ? "Image"
                          : "Images"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {busImages.map(
                        (image, imageIndex) => (
                          <Link
                            key={`${image}-${imageIndex}`}
                            href={
                              busSlug
                                ? `/fleets/${busSlug}`
                                : "/fleets"
                            }
                            onClick={onClose}
                            className="group relative block overflow-hidden rounded-2xl border border-black/10 bg-white"
                          >
                            <div className="relative aspect-16/10 w-full overflow-hidden bg-white">
                              <Image
                                src={image}
                                alt={
                                  bus?.name ||
                                  "Bus"
                                }
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                              />
                            </div>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-60 items-center justify-center rounded-2xl bg-white">
              <div className="text-center">
                <p className="text-sm font-bold text-black">
                  No matching bus image found
                </p>

                <p className="mt-1 text-xs text-black/60">
                  Request a quote for a custom vehicle arrangement.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-black/10 px-4 py-4 sm:px-6 sm:py-5">
          <button
            type="button"
            onClick={onClose}
            className="flex h-14 w-full items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all duration-200 hover:bg-primary-hover sm:h-15 sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DateTimeField({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
}) {
  return (
    <div className="rounded-xl bg-white px-3.5 py-3.5">
      <div className="flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5 text-primary" />

        <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-black/45">
          {label}
        </span>
      </div>

      <div className="mt-1.5 flex items-center gap-1.5">
        <input
          type="date"
          value={date}
          onChange={(event) =>
            onDateChange(
              event.target.value
            )
          }
          className="min-w-0 flex-1 bg-transparent text-[11px] font-bold text-black outline-none"
          required={label === "DEPARTURE"}
        />

        <span className="text-[10px] text-black/45">
          |
        </span>

        <input
          type="time"
          value={time}
          onChange={(event) =>
            onTimeChange(
              event.target.value
            )
          }
          className="w-18.5 bg-transparent text-[11px] font-bold text-black outline-none"
        />
      </div>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  value,
  onChange,
  icon,
  type = "text",
  required = false,
}) {
  return (
    <div className="rounded-xl border border-border bg-white px-3.5 py-3.5 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-focus-ring">
      <div className="flex items-center gap-1.5">
        <span className="text-black/60">{icon}</span>

        <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-black/60">
          {label}
        </span>
      </div>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full bg-transparent text-sm font-semibold text-black placeholder:text-black/50 placeholder:opacity-100 outline-none"
      />
    </div>
  );
}
function Benefit({ text }) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-medium text-black/60 sm:text-[10px]">
      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center text-primary">
        <CheckCircle2 className="h-3.5 w-3.5" />
      </span>

      <span>{text}</span>
    </div>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />

      <circle
        cx="12"
        cy="7"
        r="4"
      />
    </svg>
  );
}

function PopularPlaces({ places }) {
  if (!places?.length) {
    return null;
  }

  return (
    <section className="w-full border-t border-black/10 pt-8 sm:pt-10">
      <div className="mb-5 sm:mb-6">
        <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black/70">
          EXPLORE THE DESTINATION
        </span>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-black sm:text-3xl">
          Popular places to visit
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-black/60">
          Discover some of the places your group can explore during the journey.
        </p>
      </div>

      <div className="w-full space-y-5 sm:space-y-6">
        {places.map((place, index) => (
          <PopularPlaceCard
            key={place.id || place.name}
            place={place}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function PopularPlaceCard({
  place,
  index,
}) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = cardRef.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.12,
        }
      );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      style={{
        transitionDelay: `${index * 120}ms`,
      }}
      className={`group w-full overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_5px_20px_rgba(0,0,0,0.045)] transition-all duration-700 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_14px_32px_rgba(0,0,0,0.075)]`}
    >
      <div className="grid min-h-67.5 grid-cols-[165px_1fr] items-stretch sm:min-h-71.25 sm:grid-cols-[185px_1fr] lg:min-h-75 lg:grid-cols-[205px_1fr]">
        <div className="relative min-h-67.5 overflow-hidden bg-white sm:min-h-71.25 lg:min-h-75">
          {place.image ? (
            <Image
              src={place.image}
              alt={place.name}
              fill
              quality={100}
              sizes="(max-width: 640px) 165px, (max-width: 1024px) 185px, 205px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-black/45">
              Image unavailable
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6 lg:p-7">
          <h3 className="text-base font-black tracking-tight text-black transition-colors duration-300 group-hover:text-primary sm:text-lg lg:text-xl">
            {place.name}
          </h3>

          {place.description && (
            <p className="mt-3 max-w-3xl text-[11px] leading-6 text-black/70 sm:text-[12px] sm:leading-7 lg:text-[13px]">
              {place.description}
            </p>
          )}

          {Array.isArray(
            place.highlights
          ) &&
            place.highlights.length > 0 && (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-2.5">
                {place.highlights.map(
                  (highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-[9px] font-medium leading-5 text-black/70 sm:text-[10px]"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                      </span>

                      <span>
                        {highlight}
                      </span>
                    </li>
                  )
                )}
              </ul>
            )}

          <div className="mt-5 flex items-center gap-2 text-[10px] font-bold text-black/80 transition-colors duration-300 group-hover:text-primary sm:text-[11px]">
            Explore

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}