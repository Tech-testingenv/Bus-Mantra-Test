"use client";

import { Suspense, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
    ArrowLeft,
    ArrowRight,
    BusFront,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Crown,
    Flame,
    ImageIcon,
    Mail,
    MapPin,
    Phone,
    PhoneCall,
    Route,
    ShieldCheck,
    Sparkles,
    Star,
    Tag,
    User,
    Users,
    X,
} from "lucide-react";

import {
    offerBusCategories,
    offerFaqData,
} from "@/data/data";

import FAQSection from "@/components/common/faq";
import BookingFormField from "@/components/common/bookingFormField";
import BookingDateTimeField from "@/components/common/bookingDateTimeField";
import BookingDurationField from "@/components/common/bookingDurationField";
import DestinationMultiSelect from "@/components/fleet/destinationMultiSelect";
import FareSummary from "@/components/common/fareSummary";
import { calculateCharterPrice } from "@/services/pricingService";
import { calculateRouteDistance } from "@/services/distanceCalculationService";
import { validateEmail } from "@/services/validationService";
import { combineDateTime, toApiDateTime } from "@/services/dateService";
import {
    resolveInitialBookingState,
    saveBookingSession,
} from "@/services/bookingState";

function OfferPageContent() {
    const searchParams = useSearchParams();

    // Selected Category State: "tata" (default) | "bharatbenz" | "volvo"
    const [selectedCategoryKey, setSelectedCategoryKey] = useState("tata");

    // Form State initialized from query or session (preserving completed fields)
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
    const [submitError, setSubmitError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [estimatedKm, setEstimatedKm] = useState(560);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Modal States
    const [showBusImages, setShowBusImages] = useState(false);
    const [quoteRequested, setQuoteRequested] = useState(false);
    const [isBooked, setIsBooked] = useState(false);

    // Active Category Data
    const activeCategory = useMemo(() => {
        return offerBusCategories[selectedCategoryKey] || offerBusCategories.tata;
    }, [selectedCategoryKey]);

    // Load initial state from query/session on mount
    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
        const initial = resolveInitialBookingState(searchParams);
        if (initial) {
            if (initial.category && offerBusCategories[initial.category]) {
                setSelectedCategoryKey(initial.category);
            }
            setFormData((prev) => ({
                ...prev,
                pickup: initial.pickupPoint || prev.pickup,
                destination:
                    Array.isArray(initial.destination) && initial.destination.length > 0
                        ? initial.destination
                        : prev.destination,
                passengers: initial.passengers || prev.passengers,
                leadPassenger: initial.fullName || prev.leadPassenger,
                mobile: initial.mobile || prev.mobile,
                email: initial.email || prev.email,
            }));
        }
        });
        return () => window.cancelAnimationFrame(frame);
    }, [searchParams]);

    // Reset gallery active index when category switches
    useEffect(() => {
        const frame = window.requestAnimationFrame(() => setActiveImageIndex(0));
        return () => window.cancelAnimationFrame(frame);
    }, [selectedCategoryKey]);

    // Calculate route distance dynamically
    useEffect(() => {
        let isMounted = true;
        async function updateDistance() {
            try {
                const result = await calculateRouteDistance({
                    pickup: formData.pickup,
                    destinations: formData.destination,
                });
                if (isMounted && result?.totalKm) {
                    setEstimatedKm(result.totalKm);
                }
            } catch {
                if (isMounted) {
                    setEstimatedKm(560);
                }
            }
        }
        updateDistance();
        return () => {
            isMounted = false;
        };
    }, [formData.pickup, formData.destination]);

    // Dynamic Fare Calculation based on distance and selected category rate
    const pricingResult = useMemo(() => {
        return calculateCharterPrice({
            totalDistanceKm: estimatedKm,
            bus: {
                id: activeCategory.id,
                ratePerKm: activeCategory.ratePerKm,
                name: activeCategory.name,
            },
            options: {
                minBillingKm: 200,
            },
        });
    }, [estimatedKm, activeCategory]);

    // Update specific field while preserving all other values
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

    // Switch category without losing any entered form details
    const handleSelectCategory = (catKey) => {
        if (offerBusCategories[catKey]) {
            setSelectedCategoryKey(catKey);
        }
    };

    // Handle Form Submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.departureDate) {
            setSubmitError("Please select a departure date.");
            return;
        }
        if (formData.email) {
            const err = validateEmail(formData.email, { required: false });
            if (err) {
                setEmailError(err);
                return;
            }
        }
        setEmailError("");
        setSubmitError("");
        setSubmitting(true);

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
                    destination: formData.destination,
                    departureDateTime: toApiDateTime(formData.departureDate, formData.departureTime),
                    returnDateTime: toApiDateTime(formData.returnDate, formData.returnTime),
                }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Unable to submit booking request.");
        } catch (error) {
            setSubmitError(error.message);
            setSubmitting(false);
            return;
        }

        // Persist session
        saveBookingSession({
            pickupPoint: formData.pickup,
            destination: formData.destination,
            passengers: formData.passengers,
            departureDateTime: combineDateTime(formData.departureDate, formData.departureTime),
            returnDateTime: combineDateTime(formData.returnDate, formData.returnTime),
            fullName: formData.leadPassenger,
            mobile: formData.mobile,
            email: formData.email,
            category: selectedCategoryKey,
        });

        setIsBooked(true);
        setSubmitting(false);
    };

    const selectedDestinations = Array.isArray(formData.destination)
        ? formData.destination
        : formData.destination
            ? [formData.destination]
            : ["Jaipur"];

    return (
        <main className="relative mx-auto w-full max-w-360 px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-24">
            {/* Top Breadcrumb Link */}
            <div className="mb-5 flex items-center justify-between">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors duration-200 hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-9 xl:gap-10">
                {/* ================================================================= */}
                {/* LEFT COLUMN: OFFER DETAILS & VEHICLE PRESENTATION (7 COLS)       */}
                {/* ================================================================= */}
                <div className="lg:col-span-7">
                    {/* Header */}
                    <div className="mb-5">
                        <div className="mb-2.5 flex flex-wrap items-center gap-2">
                            <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-700">
                                {activeCategory.badge}
                            </span>

                            {selectedCategoryKey === "tata" && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary-subtle px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                                    <Flame className="h-3 w-3 fill-primary text-primary" />
                                    Limited Time ₹1/KM Offer
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl lg:text-[42px] xl:text-[46px]">
                            {activeCategory.headline}
                            <span className="inline-flex items-center ml-2 mt-0 md:-mt-5 align-middle -translate-y-0.5 select-none">
                                <Image
                                    src="/bus_mantra_t&c.png"
                                    alt="Terms & Conditions Applied"
                                    width={25}
                                    height={25}
                                    className="h-5 w-5 object-contain inline-block"
                                />
                            </span>
                        </h1>
                        <span className="text-xl text-primary font-bold transition-all duration-700 ease-in-out opacity-100 translate-y-0 pointer-events-auto z-1">
                            100% Free Cancellation, Your Ride Any Time!
                        </span>

                        <p className="mt-2 text-sm font-medium text-neutral-600 sm:text-base">
                            {activeCategory.tagline}
                        </p>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
                            {activeCategory.description}
                        </p>
                    </div>

                    {/* Vehicle Gallery Carousel */}
                    <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-surface-secondary shadow-[0_10px_35px_rgba(0,0,0,0.055)] sm:rounded-3xl">
                        <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                            {activeCategory.gallery?.length > 0 ? (
                                <Image
                                    src={activeCategory.gallery[activeImageIndex] || activeCategory.image}
                                    alt={activeCategory.name}
                                    fill
                                    priority
                                    quality={100}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 58vw"
                                    className="object-cover transition-all duration-300"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                                    Image unavailable
                                </div>
                            )}

                            {activeCategory.gallery?.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveImageIndex((prev) =>
                                                prev === 0 ? activeCategory.gallery.length - 1 : prev - 1
                                            )
                                        }
                                        aria-label="Previous image"
                                        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md transition-all hover:scale-105 hover:bg-white sm:left-4 sm:h-10 sm:w-10 cursor-pointer"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveImageIndex((prev) =>
                                                prev === activeCategory.gallery.length - 1 ? 0 : prev + 1
                                            )
                                        }
                                        aria-label="Next image"
                                        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md transition-all hover:scale-105 hover:bg-white sm:right-4 sm:h-10 sm:w-10 cursor-pointer"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>

                                    <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                                        {activeImageIndex + 1}/{activeCategory.gallery.length}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {activeCategory.gallery?.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto bg-white p-2.5 sm:p-3">
                                {activeCategory.gallery.map((img, idx) => (
                                    <button
                                        key={`${img}-${idx}`}
                                        type="button"
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-16 sm:w-24 cursor-pointer ${activeImageIndex === idx
                                            ? "border-primary ring-2 ring-primary/20"
                                            : "border-transparent opacity-65 hover:opacity-100"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${activeCategory.name} thumbnail ${idx + 1}`}
                                            fill
                                            sizes="96px"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Info Grid */}
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <QuickInfo
                            label="Rate / Tariff"
                            value={pricingResult.formattedRatePerKm}
                            icon={<Tag className="h-3.5 w-3.5" />}
                            highlight
                        />

                        <QuickInfo
                            label="Coach Brand"
                            value={activeCategory.brand}
                            icon={<BusFront className="h-3.5 w-3.5" />}
                        />

                        <QuickInfo
                            label="Seating"
                            value={activeCategory.capacity}
                            icon={<Users className="h-3.5 w-3.5" />}
                        />

                        <QuickInfo
                            label="Charter Type"
                            value="Full Dedicated"
                            icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                        />
                    </div>

                    {/* Vehicle Specifications & Features */}
                    <section className="mt-8 border-t border-neutral-200 pt-7 sm:mt-10 sm:pt-8">
                        <div className="mb-4">
                            <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
                                SPECIFICATIONS
                            </span>
                            <h2 className="mt-2 text-xl font-black tracking-tight text-neutral-900 sm:text-2xl">
                                {activeCategory.name} Specifications
                            </h2>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-xs">
                            <div className="divide-y divide-neutral-100">
                                {activeCategory.specs?.map((spec, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between px-4 py-3 text-xs sm:px-5 sm:text-sm"
                                    >
                                        <span className="font-medium text-neutral-500">
                                            {spec.label}
                                        </span>
                                        <strong className="text-right font-bold text-neutral-900">
                                            {spec.value}
                                        </strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Included Coach Amenities */}
                    <section className="mt-8 border-t border-neutral-200 pt-7 sm:mt-10 sm:pt-8">
                        <div className="mb-4">
                            <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
                                COMFORT & AMENITIES
                            </span>
                            <h2 className="mt-2 text-xl font-black tracking-tight text-neutral-900 sm:text-2xl">
                                Every Mile Tailored for Group Comfort
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {activeCategory.amenities?.map((amenity, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-4 py-3"
                                >
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                                    <span className="text-xs font-bold text-neutral-800 sm:text-sm">
                                        {amenity}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Transparent Offer Terms & Pricing Rules */}
                    <section className="mt-8 border-t border-neutral-200 pt-7 sm:mt-10 sm:pt-8">
                        <div className="mb-4">
                            <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
                                OFFER TERMS & TRANSPARENCY
                            </span>
                            <h2 className="mt-2 text-xl font-black tracking-tight text-neutral-900 sm:text-2xl">
                                How the ₹1/KM Bus Booking Offer Works
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                                    <Tag className="h-4 w-4" />
                                </div>
                                <h3 className="mt-3 text-sm font-black text-neutral-900 sm:text-base">
                                    ₹1/KM Promotional Base Tariff
                                </h3>
                                <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
                                    Applicable to the Tata commercial bus category. Allows group organizers to lock in an unbeatable base distance rate.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                                    <Route className="h-4 w-4" />
                                </div>
                                <h3 className="mt-3 text-sm font-black text-neutral-900 sm:text-base">
                                    200 KM Minimum Billing
                                </h3>
                                <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
                                    Standard minimum billing distance of 200 KM round-trip applies to cover dedicated vehicle dispatch and maintenance.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                                    <ShieldCheck className="h-4 w-4" />
                                </div>
                                <h3 className="mt-3 text-sm font-black text-neutral-900 sm:text-base">
                                    5% Transparent GST Included
                                </h3>
                                <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
                                    Statutory tourist passenger transport GST is computed upfront so you always see the complete payable fare without surprises.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                                    <Crown className="h-4 w-4" />
                                </div>
                                <h3 className="mt-3 text-sm font-black text-neutral-900 sm:text-base">
                                    Seamless Upgrade to Premium & Luxury
                                </h3>
                                <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
                                    Upgrade at any time to BharatBenz (₹42/km) or Volvo (₹58/km) without losing your completed route details.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Suitable For */}
                    <section className="mt-8 border-t border-neutral-200 pt-7 sm:mt-10 sm:pt-8">
                        <div className="mb-4">
                            <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
                                IDEAL USE CASES
                            </span>
                            <h2 className="mt-2 text-xl font-black tracking-tight text-neutral-900 sm:text-2xl">
                                Perfect For Any Group Journey
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {[
                                "Corporate Team Outings",
                                "Wedding Guest Transfers",
                                "Pilgrimage & Yatra Tours",
                                "School & College Trips",
                                "Family Weekend Getaways",
                                "Airport Group Shuttles",
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-xs font-bold text-neutral-800"
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Alternative Bus Categories */}
                    {/* <section className="mt-8 border-t border-neutral-200 pt-7 sm:mt-10 sm:pt-8">
                        <div className="mb-4">
                            <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
                                ALL CATEGORIES & UPGRADES
                            </span>
                            <h2 className="mt-2 text-xl font-black tracking-tight text-neutral-900 sm:text-2xl">
                                Compare Bus Categories & Rates
                            </h2>
                            <p className="mt-1.5 text-xs text-neutral-500">
                                Switch categories at any time. Your trip details and contact info will be preserved.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {/* Tata
                            <div
                                onClick={() => handleSelectCategory("tata")}
                                className={`cursor-pointer rounded-2xl border p-4 transition-all ${selectedCategoryKey === "tata"
                                    ? "border-primary bg-primary-subtle/30 ring-2 ring-primary/20"
                                    : "border-neutral-200 bg-white hover:border-primary/40"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                                            <Tag className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-neutral-900">
                                                Tata Starbus Ultra
                                            </h3>
                                            <p className="text-[10px] font-bold uppercase text-primary">
                                                Standard ₹1/km Offer • 19–32 Seats
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-lg bg-primary px-3 py-1 text-xs font-bold text-white">
                                        ₹1/KM
                                    </span>
                                </div>
                                <p className="mt-2 text-xs text-neutral-600">
                                    Affordable, reliable commercial coach with 2+2 pushback seats and high-efficiency AC.
                                </p>
                            </div>

                            {/* BharatBenz
                            <div
                                onClick={() => handleSelectCategory("bharatbenz")}
                                className={`cursor-pointer rounded-2xl border p-4 transition-all ${selectedCategoryKey === "bharatbenz"
                                    ? "border-primary bg-primary-subtle/30 ring-2 ring-primary/20"
                                    : "border-neutral-200 bg-white hover:border-primary/40"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-white">
                                            <Star className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-neutral-900">
                                                BharatBenz Executive Coach
                                            </h3>
                                            <p className="text-[10px] font-bold uppercase text-neutral-600">
                                                Book Premium • 20–45 Seats
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-lg bg-neutral-800 px-3 py-1 text-xs font-bold text-white">
                                        ₹42/KM
                                    </span>
                                </div>
                                <p className="mt-2 text-xs text-neutral-600">
                                    Daimler-engineered chassis with whisper-quiet NVH insulation and executive recliners.
                                </p>
                            </div>

                            {/* Volvo
                            <div
                                onClick={() => handleSelectCategory("volvo")}
                                className={`cursor-pointer rounded-2xl border p-4 transition-all ${selectedCategoryKey === "volvo"
                                    ? "border-primary bg-primary-subtle/30 ring-2 ring-primary/20"
                                    : "border-neutral-200 bg-white hover:border-primary/40"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
                                            <Crown className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-neutral-900">
                                                Volvo 9400 Multi-Axle
                                            </h3>
                                            <p className="text-[10px] font-bold uppercase text-neutral-600">
                                                Book Luxury • 46–60 Seats
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-lg bg-neutral-900 px-3 py-1 text-xs font-bold text-white">
                                        ₹58/KM
                                    </span>
                                </div>
                                <p className="mt-2 text-xs text-neutral-600">
                                    Flagship luxury touring coach with electronically controlled air suspension and business-class plush seating.
                                </p>
                            </div>
                        </div>
                    </section> */}
                </div>

                {/* ================================================================= */}
                {/* RIGHT COLUMN: STANDARDIZED BOOKING FORM WITH CATEGORY BUTTONS     */}
                {/* ================================================================= */}
                <div className="lg:sticky lg:top-24 lg:col-span-5 lg:h-fit lg:self-start">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:rounded-3xl sm:p-7"
                    >
                        {submitError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}
                        {/* Form Header */}
                        <div className="border-b border-border pb-4">
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-primary sm:text-[11px]">
                                {activeCategory.offerTag}
                            </span>

                            <h2 className="text-xl font-black tracking-tight text-text-primary sm:text-2xl">
                                Reserve {activeCategory.brand} Coach
                            </h2>

                            <p className="mt-1 text-xs text-text-muted">
                                {activeCategory.pricingNote}
                            </p>
                        </div>

                        {/* THREE CATEGORY SWITCHER BUTTONS */}
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted">
                                SELECT BUS CATEGORY
                            </label>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                                {/* 1. Tata (Standard Offer) */}
                                <button
                                    type="button"
                                    onClick={() => handleSelectCategory("tata")}
                                    aria-label="Book Tata — ₹1/km Offer"
                                    className={`flex min-h-12 cursor-pointer flex-col items-center justify-center rounded-xl border px-2 py-2 text-center transition-all ${selectedCategoryKey === "tata"
                                        ? "border-primary bg-primary text-white font-bold shadow-md shadow-primary/20 ring-2 ring-primary/20"
                                        : "border-border bg-surface-secondary text-text-secondary hover:border-primary/40 hover:bg-primary-subtle/40 hover:text-text-primary"
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-1 text-[11px] font-black leading-tight text-inherit">
                                        <Tag className="h-3 w-3 shrink-0" />
                                        <span>Book Your Coach</span>
                                    </div>
                                    <span className="text-[9.5px] font-bold opacity-90 text-inherit mt-0.5">
                                        ₹1/km T&C Applied
                                    </span>
                                </button>

                                {/* 2. Book Premium (BharatBenz) */}
                                <button
                                    type="button"
                                    onClick={() => handleSelectCategory("bharatbenz")}
                                    aria-label="Book Premium (BharatBenz)"
                                    className={`flex min-h-12 cursor-pointer flex-col items-center justify-center rounded-xl border px-2 py-2 text-center transition-all ${selectedCategoryKey === "bharatbenz"
                                        ? "border-primary bg-primary text-white font-bold shadow-md shadow-primary/20 ring-2 ring-primary/20"
                                        : "border-border bg-surface-secondary text-text-secondary hover:border-primary/40 hover:bg-primary-subtle/40 hover:text-text-primary"
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-1 text-[11px] font-black leading-tight text-inherit">
                                        <Star className="h-3 w-3 shrink-0" />
                                        <span>Book Premium</span>
                                    </div>
                                </button>

                                {/* 3. Book Luxury (Volvo) */}
                                <button
                                    type="button"
                                    onClick={() => handleSelectCategory("volvo")}
                                    aria-label="Book Luxury (Volvo)"
                                    className={`flex min-h-12 cursor-pointer flex-col items-center justify-center rounded-xl border px-2 py-2 text-center transition-all ${selectedCategoryKey === "volvo"
                                        ? "border-primary bg-primary text-white font-bold shadow-md shadow-primary/20 ring-2 ring-primary/20"
                                        : "border-border bg-surface-secondary text-text-secondary hover:border-primary/40 hover:bg-primary-subtle/40 hover:text-text-primary"
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-1 text-[11px] font-black leading-tight text-inherit">
                                        <Crown className="h-3 w-3 shrink-0" />
                                        <span>Book Luxury</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Standardized Form Fields */}
                        <div className="space-y-3.5">
                            <BookingFormField
                                id="offerPickup"
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
                                    id="offerDeparture"
                                    label="DEPARTURE"
                                    date={formData.departureDate}
                                    time={formData.departureTime}
                                    onDateChange={(value) => updateField("departureDate", value)}
                                    onTimeChange={(value) => updateField("departureTime", value)}
                                />

                                <BookingDateTimeField
                                    id="offerReturn"
                                    label="RETURN"
                                    date={formData.returnDate}
                                    time={formData.returnTime}
                                    minDate={formData.departureDate}
                                    onDateChange={(value) => updateField("returnDate", value)}
                                    onTimeChange={(value) => updateField("returnTime", value)}
                                />
                            </div>

                            <BookingDurationField
                                departureValue={combineDateTime(
                                    formData.departureDate,
                                    formData.departureTime
                                )}
                                returnValue={combineDateTime(
                                    formData.returnDate,
                                    formData.returnTime
                                )}
                            />

                            <BookingFormField
                                id="offerPassengers"
                                icon={Users}
                                label="NO. OF PASSENGERS"
                                type="number"
                                min={1}
                                max={60}
                                value={formData.passengers}
                                placeholder={`e.g. ${selectedCategoryKey === "volvo" ? "48" : selectedCategoryKey === "bharatbenz" ? "35" : "22"}`}
                                required
                                onChange={(value) => updateField("passengers", value)}
                            />

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <BookingFormField
                                    id="offerName"
                                    icon={User}
                                    label="LEAD PASSENGER"
                                    value={formData.leadPassenger}
                                    placeholder="Your name"
                                    required
                                    onChange={(value) => updateField("leadPassenger", value)}
                                />

                                <BookingFormField
                                    id="offerMobile"
                                    icon={Phone}
                                    label="CONTACT MOBILE"
                                    type="tel"
                                    value={formData.mobile}
                                    placeholder="+91 XXXXX XXXXX"
                                    required
                                    onChange={(value) => updateField("mobile", value)}
                                />
                            </div>

                            {/* Standardized EMAIL ADDRESS field */}
                            <BookingFormField
                                id="offerEmail"
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

                        {/* Pricing Breakdown & Summary */}
                        <div className="space-y-3.5 border-t border-border pt-4">
                            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-secondary px-4 py-3">
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
                                basePrice={pricingResult.formattedBasePrice}
                                gstAmount={pricingResult.formattedGst}
                                totalFare={pricingResult.formattedTotalPrice}
                                gstRatePercent={pricingResult.gstPercent}
                            />

                            <div className="flex items-start gap-2 rounded-xl bg-surface-secondary p-3 text-[11px] font-medium leading-5 text-text-secondary">
                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                <span>
                                    <span className="font-bold text-text-primary">Trip Route:</span>{" "}
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

                        {/* Three Action Buttons */}
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
                                disabled={submitting}
                                className="group flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-md font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:bg-primary-hover active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
                            >
                                {submitting ? "Submitting..." : "Confirm Booking"}
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
                </div>
            </div>

            {/* Bus Images Modal */}
            {showBusImages && (
                <BusImagesModal
                    category={activeCategory}
                    onClose={() => setShowBusImages(false)}
                />
            )}

            {/* Quote Request Modal */}
            {quoteRequested && (
                <QuoteModal
                    category={activeCategory}
                    passengers={formData.passengers}
                    bookingData={formData}
                    pricingResult={pricingResult}
                    onClose={() => setQuoteRequested(false)}
                />
            )}

            {/* Booking Confirmation Modal */}
            {isBooked && (
                <ConfirmationModal
                    category={activeCategory}
                    bookingData={formData}
                    pricingResult={pricingResult}
                    onClose={() => setIsBooked(false)}
                />
            )}

            {/* Offer FAQ Section */}
            <FAQSection data={offerFaqData} />
        </main>
    );
}

export default function OfferPage() {
    return (
        <Suspense
            fallback={
                <main className="mx-auto flex min-h-[60vh] max-w-360 items-center justify-center px-6">
                    <div className="text-center">
                        <span className="inline-block h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
                        <p className="mt-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                            Loading ₹1/KM Offer...
                        </p>
                    </div>
                </main>
            }
        >
            <OfferPageContent />
        </Suspense>
    );
}

function QuickInfo({ label, value, icon, className = "", highlight = false }) {
    return (
        <div
            className={`rounded-xl border bg-white px-3.5 py-3 ${highlight
                ? "border-primary/40 bg-primary-subtle/25"
                : "border-neutral-200"
                } ${className}`}
        >
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                <span className="text-primary">{icon}</span>
                {label}
            </div>

            <p
                className={`mt-1 text-xs font-black ${highlight ? "text-primary" : "text-neutral-800"
                    }`}
            >
                {value}
            </p>
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

function BusImagesModal({ category, onClose }) {
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

    useEffect(() => {
        if (!mounted) return;
        document.body.style.overflow = "hidden";
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleEscape);
        };
    }, [mounted, onClose]);

    if (!mounted) return null;

    const modal = (
        <div
            className="fixed inset-0 z-9999 flex h-dvh w-screen items-center justify-center overflow-hidden bg-black/60 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-5"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="offer-bus-images-title"
                className="relative flex max-h-[calc(100dvh-24px)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_90px_rgba(0,0,0,0.3)] sm:max-h-[calc(100dvh-40px)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="shrink-0 border-b border-neutral-200 px-5 py-4 sm:px-7 sm:py-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                                {category.badge}
                            </p>

                            <h3
                                id="offer-bus-images-title"
                                className="mt-1 text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl"
                            >
                                {category.name} Images
                            </h3>

                            <p className="mt-1.5 text-xs text-neutral-500 sm:text-sm">
                                Explore the verified interior and exterior fleet photos.
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {category.gallery?.map((img, index) => (
                            <div
                                key={`${img}-${index}`}
                                className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100"
                            >
                                <Image
                                    src={img}
                                    alt={`${category.name} ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    unoptimized
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                                />
                            </div>
                        ))}
                    </div>
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

    return createPortal(modal, document.body);
}

function QuoteModal({ category, passengers, bookingData, pricingResult, onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-9998 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                </div>

                <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                    QUOTE REQUEST READY
                </span>

                <h3 className="mt-1 text-2xl font-black tracking-tight text-neutral-900">
                    Quote for {category.brand}
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-600">
                    We have your quote request for{" "}
                    <strong className="text-neutral-900">{category.name}</strong>{" "}
                    ({passengers || "group"} passengers). Our team will contact you shortly with the final itinerary.
                </p>

                <div className="mt-5 space-y-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs">
                    <div className="flex justify-between">
                        <span className="text-neutral-500">Contact:</span>
                        <strong className="text-neutral-900">
                            {bookingData.leadPassenger || "Your Name"}
                        </strong>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-500">Mobile:</span>
                        <strong className="text-neutral-900">
                            {bookingData.mobile || "Mobile number"}
                        </strong>
                    </div>
                    {bookingData.email && (
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Email:</span>
                            <strong className="text-neutral-900">{bookingData.email}</strong>
                        </div>
                    )}
                    <div className="flex justify-between border-t border-neutral-200 pt-2">
                        <span className="text-neutral-500">Estimated Total:</span>
                        <strong className="text-primary font-black">
                            {pricingResult?.formattedTotalPrice}
                        </strong>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 cursor-pointer rounded-xl border border-neutral-200 py-3 text-sm font-bold text-neutral-700 transition-colors hover:bg-neutral-50"
                    >
                        Close
                    </button>

                    <a
                        href="tel:+919876543210"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover hover:shadow-lg"
                    >
                        <PhoneCall className="h-4 w-4" />
                        Call Support
                    </a>
                </div>
            </div>
        </div>
    );
}

function ConfirmationModal({ category, bookingData, pricingResult, onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-9998 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-2xl sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-subtle text-primary">
                    <CheckCircle2 className="h-8 w-8" />
                </div>

                <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-primary">
                    RESERVATION REQUEST RECEIVED
                </span>

                <h3 className="text-xl font-black text-neutral-900 sm:text-2xl">
                    Your {category.brand} Bus Is Reserved!
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Our dispatch team has received your journey request and will contact you to confirm vehicle assignment and schedule.
                </p>

                <div className="mt-5 space-y-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-left text-xs">
                    <div className="flex justify-between gap-4">
                        <span className="text-neutral-500">Selected Coach:</span>
                        <strong className="text-right text-neutral-900">
                            {category.name}
                        </strong>
                    </div>

                    <div className="flex justify-between gap-4">
                        <span className="text-neutral-500">Pick-up:</span>
                        <strong className="text-right text-neutral-900">
                            {bookingData.pickup || "Delhi NCR"}
                        </strong>
                    </div>

                    <div className="flex justify-between gap-4">
                        <span className="text-neutral-500">Destination:</span>
                        <strong className="text-right text-neutral-900">
                            {Array.isArray(bookingData.destination)
                                ? bookingData.destination.join(", ")
                                : bookingData.destination || "Jaipur"}
                        </strong>
                    </div>

                    <div className="flex justify-between gap-4">
                        <span className="text-neutral-500">Lead Passenger:</span>
                        <strong className="text-right text-neutral-900">
                            {bookingData.leadPassenger || "Lead Guest"}
                        </strong>
                    </div>

                    {bookingData.email && (
                        <div className="flex justify-between gap-4">
                            <span className="text-neutral-500">Email:</span>
                            <strong className="text-right text-neutral-900">
                                {bookingData.email}
                            </strong>
                        </div>
                    )}

                    <div className="flex justify-between gap-4 border-t border-neutral-200 pt-2">
                        <span className="text-neutral-500">Estimated Total Fare:</span>
                        <strong className="text-right text-primary font-black text-sm">
                            {pricingResult?.formattedTotalPrice || "₹0"}
                        </strong>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 cursor-pointer rounded-xl border border-neutral-200 py-3.5 text-sm font-bold text-neutral-700 transition-colors hover:bg-neutral-50"
                    >
                        Close
                    </button>

                    <a
                        href="tel:+919876543210"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover hover:shadow-lg"
                    >
                        <PhoneCall className="h-4 w-4" />
                        Call Support
                    </a>
                </div>
            </div>
        </div>
    );
}
