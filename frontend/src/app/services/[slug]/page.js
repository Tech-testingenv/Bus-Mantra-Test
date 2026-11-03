"use client";

import { use, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BusFront,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  Route,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";

import {
  servicesSlugData,
  fleetTypesData,
  servicesSlugFaqData,
} from "@/data/data";

import FAQSection from "@/components/common/faq";
import BookingFormField from "@/components/common/bookingFormField";
import BookingDateTimeField from "@/components/common/bookingDateTimeField";
import BookingDurationField from "@/components/common/bookingDurationField";
import DestinationMultiSelect from "@/components/fleet/destinationMultiSelect";
import FareSummary from "@/components/common/fareSummary";
import { calculateFareBreakdown } from "@/services/pricingService";
import { validateEmail } from "@/services/validationService";
import { combineDateTime, getTodayISODate } from "@/services/dateService";

export default function ServiceSlugPage({ params }) {
  const { slug } = use(params);

  const service = servicesSlugData?.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-360 items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
            Service not found
          </p>

          <h1 className="mt-2 text-3xl font-black text-neutral-900">
            We couldn't find this service.
          </h1>

          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover hover:shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to services
          </Link>
        </div>
      </main>

    );
  }

  return (
    <main className="relative mx-auto w-full max-w-360 px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-24">
      <div className="mb-5">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors duration-200 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to services
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-9 xl:gap-10">
        <div className="lg:col-span-7">
          <ServiceHeader service={service} />

          <ServiceGallery service={service} />

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <QuickInfo
              label="Service"
              value={service.title}
              icon={<Route className="h-3.5 w-3.5" />}
            />

            <QuickInfo
              label="Travel Type"
              value="Group Travel"
              icon={<Users className="h-3.5 w-3.5" />}
            />

            <QuickInfo
              label="Booking"
              value="Full Coach"
              icon={
                <CheckCircle2 className="h-3.5 w-3.5" />
              }
              className="col-span-2 sm:col-span-1"
            />
          </div>

          <ServiceHighlights service={service} />

          <SuitableFor service={service} />

          <ServiceBenefits service={service} />
        </div>

        <div className="lg:sticky lg:top-24 lg:col-span-5 lg:h-fit lg:self-start">
          <ServiceBookingForm service={service} />
        </div>
      </div>
      {/* Services Slug FAQ Section */}
      <FAQSection data={servicesSlugFaqData} />
    </main>

  );
}

function ServiceHeader({ service }) {
  return (
    <div className="mb-5">
      {service.eyebrow && (
        <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
          {service.eyebrow}
        </span>
      )}

      <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl lg:text-[42px] xl:text-[46px]">
        {service.title}
      </h1>

      {service.intro?.heading && (
        <p className="mt-2 text-sm font-medium text-neutral-500">
          {service.intro.heading}
        </p>
      )}

      {service.description && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
          {service.description}
        </p>
      )}
    </div>
  );
}

function ServiceGallery({ service }) {
  const gallery = useMemo(() => {
    if (service?.gallery?.length) {
      return service.gallery;
    }

    if (service?.image) {
      return [service.image];
    }

    return [];
  }, [service]);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [service.slug]);

  const nextImage = () => {
    if (gallery.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current === gallery.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    if (gallery.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current === 0
        ? gallery.length - 1
        : current - 1
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-surface-secondary shadow-[0_10px_35px_rgba(0,0,0,0.055)] sm:rounded-3xl">
      <div className="relative aspect-video w-full overflow-hidden">
        {gallery.length > 0 ? (
          <Image
            src={gallery[activeImage]}
            alt={
              service.imageAlt ||
              `${service.title} service`
            }
            fill
            priority
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 58vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            Image unavailable
          </div>
        )}

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md transition-all hover:scale-105 hover:bg-white sm:left-4 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md transition-all hover:scale-105 hover:bg-white sm:right-4 sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
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
              onClick={() => setActiveImage(index)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-16 sm:w-24 ${activeImage === index
                ? "border-primary"
                : "border-transparent opacity-65 hover:opacity-100"
                }`}
            >
              <Image
                src={image}
                alt={`${service.title} thumbnail ${index + 1
                  }`}
                fill
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
      className={`rounded-xl border border-neutral-200 bg-white px-3.5 py-3 ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-neutral-400">
        <span className="text-primary">
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

function ServiceBookingForm({ service }) {
  const [formData, setFormData] = useState({
    pickup: "Delhi NCR",
    destination: ["Jaipur"],
    departureDate: "",
    departureTime: "07:00",
    returnDate: "",
    returnTime: "21:00",
    passengers: "",
    leadPassenger: "",
    mobile: "",
    email: "",
  });

  const [emailError, setEmailError] = useState("");
  const [showBusImages, setShowBusImages] = useState(false);
  const [quoteRequested, setQuoteRequested] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const estimatedKm = service?.estimatedKm ?? 560;
  const estimatedFare = service?.estimatedFare ?? 16464;

  const fareBreakdown = useMemo(
    () => calculateFareBreakdown(estimatedFare),
    [estimatedFare]
  );

  const updateField = (field, value) => {
    setFormData((current) => {
      const updated = {
        ...current,
        [field]: value,
      };

      if (field === "departureDate" && value) {
        if (updated.returnDate && updated.returnDate < value) {
          updated.returnDate = value;
        }
      }

      return updated;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.email) {
      const err = validateEmail(formData.email, { required: false });
      if (err) {
        setEmailError(err);
        return;
      }
    }
    setEmailError("");
    setSubmitted(true);
  };

  const selectedDestinations = Array.isArray(formData.destination)
    ? formData.destination
    : formData.destination
      ? [formData.destination]
      : ["Jaipur"];

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:rounded-3xl sm:p-7"
      >
        <div className="border-b border-border pb-4">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-primary sm:text-[11px]">
            CUSTOM ROUTE & FARE
          </span>

          <h2 className="text-xl font-black tracking-tight text-text-primary sm:text-2xl">
            {service?.title ? `Reserve ${service.title}` : "Reserve Service"}
          </h2>
        </div>

        <div className="space-y-3.5">
          <BookingFormField
            id="servicePickup"
            icon={MapPin}
            label="PICK-UP POINT"
            value={formData.pickup}
            placeholder="Enter pickup point"
            required
            onChange={(value) => updateField("pickup", value)}
          />

          <DestinationMultiSelect
            selectedDestinations={selectedDestinations}
            onChange={(destinations) =>
              updateField("destination", destinations)
            }
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BookingDateTimeField
              id="serviceDeparture"
              label="DEPARTURE"
              date={formData.departureDate}
              time={formData.departureTime}
              onDateChange={(value) =>
                updateField("departureDate", value)
              }
              onTimeChange={(value) =>
                updateField("departureTime", value)
              }
            />

            <BookingDateTimeField
              id="serviceReturn"
              label="RETURN"
              date={formData.returnDate}
              time={formData.returnTime}
              minDate={formData.departureDate}
              onDateChange={(value) =>
                updateField("returnDate", value)
              }
              onTimeChange={(value) =>
                updateField("returnTime", value)
              }
            />
          </div>

          <BookingDurationField
            departureValue={combineDateTime(formData.departureDate, formData.departureTime)}
            returnValue={combineDateTime(formData.returnDate, formData.returnTime)}
          />

          <BookingFormField
            id="servicePassengers"
            icon={Users}
            label="NO. OF PASSENGERS"
            type="number"
            min={1}
            max={60}
            value={formData.passengers}
            placeholder="e.g. 23"
            required
            onChange={(value) => updateField("passengers", value)}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BookingFormField
              id="serviceName"
              icon={User}
              label="LEAD PASSENGER"
              value={formData.leadPassenger}
              placeholder="Your name"
              required
              onChange={(value) =>
                updateField("leadPassenger", value)
              }
            />

            <BookingFormField
              id="serviceMobile"
              icon={Phone}
              label="CONTACT MOBILE"
              type="tel"
              value={formData.mobile}
              placeholder="+91 XXXXX XXXXX"
              required
              onChange={(value) =>
                updateField("mobile", value)
              }
            />
          </div>

          <BookingFormField
            id="serviceEmail"
            icon={Mail}
            label="EMAIL ADDRESS"
            type="email"
            value={formData.email || ""}
            placeholder="Enter your email address"
            error={emailError}
            onChange={(value) => {
              updateField("email", value);
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
                ≈ {estimatedKm}
              </span>

              <span className="ml-1 text-[11px] font-bold uppercase text-text-muted">
                KM
              </span>
            </div>
          </div>

          <FareSummary
            basePrice={fareBreakdown.formattedBasePrice}
            gstAmount={fareBreakdown.formattedGst}
            totalFare={fareBreakdown.formattedTotalPrice}
            gstRatePercent={fareBreakdown.gstPercent}
          />

          <div className="flex items-start gap-2 rounded-xl bg-surface-secondary p-3 text-[11px] font-medium leading-5 text-text-secondary">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

            <span>
              <span className="font-bold text-text-primary">
                Trip Route:
              </span>{" "}
              {formData.pickup || "Delhi NCR"} →{" "}
              {selectedDestinations.join(", ")} →{" "}
              {formData.pickup || "Delhi NCR"} (Return)
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

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setShowBusImages(true)}
            className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 py-3 text-md font-bold text-text-primary transition-all hover:border-primary/40 hover:bg-primary-subtle hover:text-primary active:scale-[0.98]"
          >
            <ImageIcon className="h-4 w-4" />
            View Bus Images
          </button>

          <button
            type="submit"
            className="group flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-md font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:bg-primary-hover active:scale-[0.98]"
          >
            Confirm Booking
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={() => setQuoteRequested(true)}
            className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-surface-inverse px-3 py-3 text-md font-bold text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
          >
            <PhoneCall className="h-4 w-4" />
            Custom Request
          </button>
        </div>
      </form>

      {showBusImages && (
        <BusImagesModal
          passengers={Number(formData.passengers) || 0}
          onClose={() =>
            setShowBusImages(false)
          }
        />
      )}

      {quoteRequested && (
        <QuoteModal
          service={service}
          passengers={formData.passengers}
          onClose={() =>
            setQuoteRequested(false)
          }
        />
      )}

      {submitted && (
        <ConfirmationModal
          service={service}
          onClose={() =>
            setSubmitted(false)
          }
        />
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

    bus?.image,
    bus?.imageUrl,
    bus?.imagePath,
    bus?.photo,
    bus?.thumbnail,
  ].filter(
    (image) =>
      typeof image === "string" &&
      image.trim().length > 0
  );

  return [...new Set(images)];
}

function BusImagesModal({
  passengers,
  onClose,
}) {
  const [mounted, setMounted] =
    useState(false);

  const matchingBuses = useMemo(() => {
    return fleetTypesData.filter((bus) => {
      const minSeats = Number(
        bus?.minSeats
      );

      const maxSeats = Number(
        bus?.maxSeats
      );

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
    });
  }, [passengers]);

  const fleetImages = useMemo(() => {
    if (passengers < 1) {
      return [];
    }

    return matchingBuses.flatMap(
      (bus) => getFleetImages(bus)
    );
  }, [
    matchingBuses,
    passengers,
  ]);

  const uniqueFleetImages = useMemo(
    () => [...new Set(fleetImages)],
    [fleetImages]
  );

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const html =
      document.documentElement;

    const body =
      document.body;

    const scrollY =
      window.scrollY;

    const previousHtmlOverflow =
      html.style.overflow;

    const previousHtmlOverscroll =
      html.style.overscrollBehavior;

    const previousBodyOverflow =
      body.style.overflow;

    const previousBodyPosition =
      body.style.position;

    const previousBodyTop =
      body.style.top;

    const previousBodyLeft =
      body.style.left;

    const previousBodyRight =
      body.style.right;

    const previousBodyWidth =
      body.style.width;

    const previousBodyTouchAction =
      body.style.touchAction;

    const previousBodyOverscroll =
      body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    html.style.overscrollBehavior =
      "none";

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";
    body.style.overscrollBehavior =
      "none";

    const preventScroll = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    window.addEventListener(
      "wheel",
      preventScroll,
      {
        passive: false,
        capture: true,
      }
    );

    window.addEventListener(
      "touchmove",
      preventScroll,
      {
        passive: false,
        capture: true,
      }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        preventScroll,
        true
      );

      window.removeEventListener(
        "touchmove",
        preventScroll,
        true
      );

      html.style.overflow =
        previousHtmlOverflow;

      html.style.overscrollBehavior =
        previousHtmlOverscroll;

      body.style.overflow =
        previousBodyOverflow;

      body.style.position =
        previousBodyPosition;

      body.style.top =
        previousBodyTop;

      body.style.left =
        previousBodyLeft;

      body.style.right =
        previousBodyRight;

      body.style.width =
        previousBodyWidth;

      body.style.touchAction =
        previousBodyTouchAction;

      body.style.overscrollBehavior =
        previousBodyOverscroll;

      window.scrollTo(
        0,
        scrollY
      );
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
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
  }, [
    mounted,
    onClose,
  ]);

  if (!mounted) {
    return null;
  }

  const modal = (
    <div
      className="fixed inset-0 z-9999 flex h-dvh w-screen items-center justify-center overflow-hidden bg-black/60 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-5"
      style={{
        overscrollBehavior:
          "none",
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
        aria-labelledby="bus-images-title"
        className="relative flex max-h-[calc(100dvh-24px)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_90px_rgba(0,0,0,0.3)] sm:max-h-[calc(100dvh-40px)]"
        onClick={(event) =>
          event.stopPropagation()
        }
        onWheel={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onTouchMove={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className="shrink-0 border-b border-neutral-200 px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                AVAILABLE FOR YOUR GROUP
              </p>

              <h3
                id="bus-images-title"
                className="mt-1 text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl"
              >
                Bus Images
              </h3>

              <p className="mt-1.5 text-xs text-neutral-500 sm:text-sm">
                {passengers > 0
                  ? "Explore buses available for your group."
                  : "Enter passengers to see suitable fleet images."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close bus images"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-all hover:bg-neutral-200 hover:text-neutral-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          {passengers < 1 ? (
            <div className="flex min-h-65 items-center justify-center rounded-2xl bg-neutral-50">
              <div className="text-center">
                <BusFront className="mx-auto h-9 w-9 text-primary" />

                <p className="mt-3 text-sm font-bold text-neutral-900">
                  Enter the number of passengers first
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  The available fleet images will appear here.
                </p>
              </div>
            </div>
          ) : uniqueFleetImages.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {uniqueFleetImages.map(
                (image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100"
                  >
                    <Image
                      src={image}
                      alt={`Bus image ${index + 1
                        }`}
                      fill
                      priority={
                        index === 0
                      }
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="flex min-h-65 items-center justify-center rounded-2xl bg-neutral-50">
              <div className="text-center">
                <BusFront className="mx-auto h-9 w-9 text-neutral-300" />

                <p className="mt-3 text-sm font-bold text-neutral-900">
                  No bus images available
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  Request a quote for a custom vehicle arrangement.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-neutral-200 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition-all hover:bg-black/90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    modal,
    document.body
  );
}

function QuoteModal({
  service,
  passengers,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-9998 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <h3 className="mt-5 text-2xl font-black tracking-tight text-neutral-900">
          Quote request ready
        </h3>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          We have your request for{" "}
          <span className="font-semibold text-neutral-800">
            {passengers ||
              "your group"}
          </span>{" "}
          passengers for{" "}
          <span className="font-semibold text-neutral-800">
            {service.title}
          </span>
          .
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover hover:shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ConfirmationModal({
  service,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-9998 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <h3 className="mt-5 text-2xl font-black tracking-tight text-neutral-900">
          Request received
        </h3>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Thanks for your booking request for{" "}
          <span className="font-semibold text-neutral-800">
            {service.title}
          </span>
          . Our team will contact you shortly to confirm availability and booking details.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-bold text-neutral-700 transition-colors hover:bg-neutral-50"
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

function ServiceHighlights({
  service,
}) {
  if (!service.highlights?.length) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-neutral-200 pt-8 sm:mt-12 sm:pt-10">
      <div className="mb-5 sm:mb-6">
        <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
          SERVICE HIGHLIGHTS
        </span>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
          Built around your journey
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
          Everything is organised around your group's travel requirements.
        </p>
      </div>

      <div className="space-y-3">
        {service.highlights.map(
          (item, index) => (
            <article
              key={
                item.title ||
                index
              }
              className="rounded-2xl border border-neutral-200/80 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_10px_28px_rgba(0,0,0,0.055)] sm:p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-black text-neutral-900 sm:text-base">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-[1.65] text-neutral-500 sm:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}

function SuitableFor({
  service,
}) {
  if (!service.suitableFor?.length) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-neutral-200 pt-8 sm:mt-12 sm:pt-10">
      <div className="mb-5 sm:mb-6">
        <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
          SUITABLE FOR
        </span>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
          Groups that travel together
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {service.suitableFor.map(
          (item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-3"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />

              <span className="text-xs font-bold text-neutral-700">
                {item}
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
}

function ServiceBenefits({
  service,
}) {
  if (!service.benefits?.length) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-neutral-200 pt-8 sm:mt-12 sm:pt-10">
      <div className="mb-5 sm:mb-6">
        <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
          WHY BUS MANTRA
        </span>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
          A simpler way to move your group
        </h2>
      </div>

      <div className="space-y-3">
        {service.benefits.map(
          (item, index) => (
            <article
              key={
                item.title ||
                index
              }
              className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-black text-neutral-900 sm:text-base">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-[1.65] text-neutral-500 sm:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}