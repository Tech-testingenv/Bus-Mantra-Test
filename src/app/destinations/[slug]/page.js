"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import { destinationsData } from "@/data/data";

/* =========================================================
   DESTINATION SLUG PAGE
========================================================= */

export default function DestinationSlugPage({ params }) {
  const { slug } = use(params);

  const destination = destinationsData?.[slug];

  if (!destination) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-360 items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-orange">
            Destination not found
          </p>

          <h1 className="mt-2 text-3xl font-black text-neutral-900">
            We couldn't find this destination.
          </h1>

          <Link
            href="/destinations"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white"
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
      {/* =====================================================
          BACK
      ===================================================== */}

      <div className="mb-5">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors duration-200 hover:text-brand-orange"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to destinations
        </Link>
      </div>

      {/* =====================================================
          MAIN TWO COLUMN LAYOUT

          IMPORTANT:
          Booking form and all left-side content are inside
          the SAME grid.

          This allows sticky form to remain visible while
          scrolling through popular places.
      ===================================================== */}

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-9 xl:gap-10">
        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="lg:col-span-7">
          {/* =================================================
              DESTINATION HEADER
          ================================================= */}

          <DestinationHeader destination={destination} />

          {/* =================================================
              IMAGE CAROUSEL
          ================================================= */}

          <DestinationGallery destination={destination} />

          {/* =================================================
              SMALL INFO
          ================================================= */}

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

          {/* =================================================
              POPULAR PLACES

              This is INSIDE the left column.

              Therefore the right booking form remains sticky
              while these cards are being scrolled.
          ================================================= */}

          <div className="mt-10 sm:mt-12 lg:mt-14">
            <PopularPlaces
              places={destination.popularPlaces || []}
            />
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE BOOKING FORM

            STICKY UNTIL THE END OF THE MAIN GRID
        =================================================== */}

        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <DestinationBookingForm
            destination={destination}
          />
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   DESTINATION HEADER
========================================================= */

function DestinationHeader({ destination }) {
  return (
    <div className="mb-5">
      {destination.badge && (
        <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
          {destination.badge}
        </span>
      )}

      <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl lg:text-[42px] xl:text-[46px]">
        {destination.name}
      </h1>

      {destination.route && (
        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-neutral-500">
          <MapPin className="h-4 w-4 text-brand-orange" />

          {destination.route}
        </div>
      )}

      {destination.description && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
          {destination.description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   DESTINATION GALLERY
========================================================= */

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
    if (gallery.length <= 1) return;

    const next =
      activeImage === gallery.length - 1
        ? 0
        : activeImage + 1;

    changeImage(next);
  };

  const previousImage = () => {
    if (gallery.length <= 1) return;

    const previous =
      activeImage === 0
        ? gallery.length - 1
        : activeImage - 1;

    changeImage(previous);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f0f2f5] shadow-[0_10px_35px_rgba(0,0,0,0.055)] sm:rounded-3xl">
      {/* ===================================================
          MAIN IMAGE
      =================================================== */}

      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {gallery.length > 0 ? (
          <Image
            src={gallery[activeImage]}
            alt={`${destination.name} destination`}
            fill
            priority
            quality={100}
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 70vw,
              58vw
            "
            className={`object-cover transition-all duration-300 ${
              changing
                ? "scale-[1.015] opacity-60"
                : "scale-100 opacity-100"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            Image unavailable
          </div>
        )}

        {/* =================================================
            CAROUSEL ARROWS
        ================================================= */}

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md transition-all duration-200 hover:scale-105 hover:bg-white sm:left-4 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md transition-all duration-200 hover:scale-105 hover:bg-white sm:right-4 sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* COUNTER */}

            <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm sm:bottom-4 sm:right-4">
              {activeImage + 1}/{gallery.length}
            </div>
          </>
        )}
      </div>

      {/* ===================================================
          THUMBNAILS
      =================================================== */}

      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto bg-white p-2.5 sm:p-3">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => changeImage(index)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 sm:h-16 sm:w-24 ${
                activeImage === index
                  ? "border-brand-orange"
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

/* =========================================================
   QUICK INFO
========================================================= */

function QuickInfo({
  label,
  value,
  icon,
  className = "",
}) {
  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-white px-3.5 py-3 ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-neutral-400">
        <span className="text-brand-orange">
          {icon}
        </span>

        {label}
      </div>

      <p className="mt-1 text-xs font-bold text-neutral-800">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   BOOKING FORM
========================================================= */

function DestinationBookingForm({ destination }) {
  const [formData, setFormData] = useState({
    pickup: "Delhi NCR",
    departureDate: "",
    departureTime: "07:00",
    returnDate: "",
    returnTime: "21:00",
    leadPassenger: "",
    mobile: "",
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.065)] sm:rounded-3xl sm:p-6"
      >
        {/* =================================================
            HEADER
            NO ₹/KM BADGE
        ================================================= */}

        <div className="border-b border-neutral-100 pb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-orange">
            CUSTOM ROUTE & FARE
          </p>

          <h2 className="mt-1 text-[24px] font-black leading-tight tracking-tight text-neutral-900 sm:text-[25px]">
            Reserve Mini Coach
          </h2>
        </div>

        <div className="mt-5 space-y-3">
          {/* =================================================
              PICKUP
          ================================================= */}

          <div className="rounded-xl bg-[#f1f2f4] px-4 py-3.5">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-orange" />

              <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-neutral-400">
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
              className="mt-1 w-full bg-transparent text-xs font-bold text-neutral-800 outline-none"
              placeholder="Delhi NCR"
              required
            />
          </div>

          {/* =================================================
              DESTINATION
          ================================================= */}

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-neutral-400">
                <MapPin className="h-3.5 w-3.5 text-brand-orange" />

                DESTINATION(S)
              </label>

              <span className="text-[9px] text-neutral-400">
                multi-city route
              </span>
            </div>

            <div className="flex min-h-[53px] items-center gap-2 rounded-xl bg-[#f1f2f4] px-3.5">
              <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm">
                {destinationName}

                <button
                  type="button"
                  className="text-sm leading-none text-neutral-400 transition-colors hover:text-neutral-700"
                >
                  ×
                </button>
              </span>

              <span className="truncate text-xs text-neutral-400">
                + Add another city...
              </span>

              <ChevronRight className="ml-auto h-4 w-4 shrink-0 rotate-90 text-neutral-400" />
            </div>
          </div>

          {/* =================================================
              DEPARTURE + RETURN
          ================================================= */}

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

          {/* =================================================
              NO. OF PASSENGERS REMOVED
          ================================================= */}

          {/* =================================================
              LEAD PASSENGER + MOBILE
          ================================================= */}

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

          {/* =================================================
              ESTIMATED KM + TOTAL FARE
          ================================================= */}

          <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
            <div className="rounded-xl bg-[#f7f8f9] px-3.5 py-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-neutral-400">
                EST. ROUND TRIP
              </p>

              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[22px] font-black leading-none text-neutral-900">
                  ≈ {estimatedKm}
                </span>

                <span className="text-[10px] font-bold text-neutral-500">
                  KM
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-brand-orange/30 bg-[#fffaf5] px-3.5 py-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-brand-orange">
                TOTAL ESTIMATED FARE
              </p>

              <div className="mt-1">
                <span className="text-[22px] font-black leading-none text-neutral-900">
                  ₹
                  {Number(
                    estimatedFare
                  ).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              ROUTE PATH
          ================================================= */}

          <div className="rounded-xl bg-[#f1f2f4] px-3.5 py-3">
            <div className="flex items-start gap-2 text-[10px] leading-5 text-neutral-600">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" />

              <span>
                <span className="font-bold text-neutral-800">
                  Route Path:
                </span>{" "}
                {formData.pickup || "Delhi NCR"} →{" "}
                {destinationName} →{" "}
                {formData.pickup || "Delhi NCR"}{" "}
                (Return)
              </span>
            </div>
          </div>

          {/* =================================================
              BENEFITS
          ================================================= */}

          <div className="grid grid-cols-2 gap-x-5 gap-y-2 px-0.5 pt-1">
            <Benefit
              icon={<CheckCircle2 />}
              text="Full Bus Charter"
            />

            <Benefit
              icon={<CheckCircle2 />}
              text="Verified Chauffeur"
            />

            <Benefit
              icon={<CheckCircle2 />}
              text="Fuel & GST Included"
            />

            <Benefit
              icon={<ShieldCheck />}
              text="24/7 Dispatch Control"
            />
          </div>

          {/* =================================================
              CONFIRM
          ================================================= */}

          <button
            type="submit"
            className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3.5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(245,130,32,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(245,130,32,0.25)] active:translate-y-0"
          >
            <span>
              Confirm Booking Request
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </form>

      {/* =====================================================
          CONFIRMATION MODAL
      ===================================================== */}

      {submitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-brand-orange">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-2xl font-black tracking-tight text-neutral-900">
              Request received
            </h3>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Thanks for your booking request for{" "}
              <span className="font-semibold text-neutral-800">
                {destinationName}
              </span>
              . Our team will contact you shortly to
              confirm availability and booking details.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-bold text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                Close
              </button>

              <a
                href="tel:+919999999999"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-sm font-bold text-white transition-all hover:shadow-lg"
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

/* =========================================================
   DATE TIME FIELD
========================================================= */

function DateTimeField({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
}) {
  return (
    <div className="rounded-xl bg-[#f1f2f4] px-3.5 py-3.5">
      <div className="flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5 text-brand-orange" />

        <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-neutral-400">
          {label}
        </span>
      </div>

      <div className="mt-1.5 flex items-center gap-1.5">
        <input
          type="date"
          value={date}
          onChange={(event) =>
            onDateChange(event.target.value)
          }
          className="min-w-0 flex-1 bg-transparent text-[11px] font-bold text-neutral-800 outline-none"
          required={label === "DEPARTURE"}
        />

        <span className="text-[10px] text-neutral-400">
          |
        </span>

        <input
          type="time"
          value={time}
          onChange={(event) =>
            onTimeChange(event.target.value)
          }
          className="w-[74px] bg-transparent text-[11px] font-bold text-neutral-800 outline-none"
        />
      </div>
    </div>
  );
}

/* =========================================================
   FORM INPUT
========================================================= */

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
    <div className="rounded-xl bg-[#f1f2f4] px-3.5 py-3.5">
      <div className="flex items-center gap-1.5">
        <span className="text-neutral-500">
          {icon}
        </span>

        <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-neutral-400">
          {label}
        </span>
      </div>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full bg-transparent text-xs font-semibold text-neutral-800 outline-none placeholder:text-neutral-400"
      />
    </div>
  );
}

/* =========================================================
   BENEFIT
========================================================= */

function Benefit({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-medium text-neutral-500">
      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center text-emerald-500 [&>svg]:h-3.5 [&>svg]:w-3.5">
        {icon}
      </span>

      <span>{text}</span>
    </div>
  );
}

/* =========================================================
   USER ICON
========================================================= */

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
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/* =========================================================
   POPULAR PLACES
========================================================= */

function PopularPlaces({ places }) {
  if (!places?.length) {
    return null;
  }

  return (
    <section className="w-full border-t border-neutral-200 pt-8 sm:pt-10">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="mb-5 sm:mb-6">
        <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
          EXPLORE THE DESTINATION
        </span>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
          Popular places to visit
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
          Discover some of the places your group can
          explore during the journey.
        </p>
      </div>

      {/* =================================================
          CARDS

          NARROWER + TALLER
      ================================================= */}

      <div className="w-full space-y-4">
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

/* =========================================================
   POPULAR PLACE CARD
========================================================= */

function PopularPlaceCard({ place, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = cardRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
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
      className={`group w-[88%] overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_3px_14px_rgba(0,0,0,0.035)] transition-all duration-700 sm:w-[78%] lg:w-[82%] xl:w-[78%] ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.075)]`}
    >
      {/* =================================================
          TALLER / NARROWER CARD
      ================================================= */}

      <div className="grid grid-cols-[105px_1fr] sm:grid-cols-[125px_1fr]">
        {/* =================================================
            IMAGE
        ================================================= */}

        <div className="relative h-[135px] overflow-hidden bg-[#f0f2f5] sm:h-[150px]">
          {place.image ? (
            <Image
              src={place.image}
              alt={place.name}
              fill
              quality={100}
              sizes="
                (max-width: 640px) 105px,
                125px
              "
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">
              Image unavailable
            </div>
          )}
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="flex min-h-[135px] flex-col justify-center p-4 sm:min-h-[150px] sm:p-5">
          <h3 className="text-sm font-black tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-brand-orange sm:text-base">
            {place.name}
          </h3>

          <p className="mt-2 line-clamp-4 text-[10px] leading-[1.65] text-neutral-500 sm:text-[11px]">
            {place.description}
          </p>

          <div className="mt-3 flex items-center gap-2 text-[9px] font-bold text-neutral-700 transition-colors duration-300 group-hover:text-brand-orange sm:text-[10px]">
            Explore

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 transition-all duration-300 group-hover:bg-orange-50">
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}