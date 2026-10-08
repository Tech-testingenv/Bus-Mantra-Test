"use client";

import {
  use,
  useState,
  useEffect,
  useCallback,
  useTransition,
} from "react";

import { useSearchParams, notFound } from "next/navigation";
import Link from "next/link";

import {
  Users,
  MapPin,
  Calendar,
  ArrowLeft,
  Check,
  Flame,
  Phone,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  BadgeCheck,
  Clock,
} from "lucide-react";

// ============================================================
// BUS IMAGE CAROUSEL
// Commented out as requested.
// ============================================================
// import BusImageCarousel from "@/components/fleet/busImageCarousel";

import DestinationMultiSelect from "@/components/fleet/destinationMultiSelect";

import { getBusBySlug } from "@/services/busSelectionService";
import { calculateRouteDistance } from "@/services/distanceCalculationService";
import { calculateCharterPrice } from "@/services/pricingService";

import {
  resolveInitialBookingState,
  saveBookingSession,
} from "@/services/bookingState";

export default function FleetDetailPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams?.slug;

  const bus = getBusBySlug(slug);

  const searchParams = useSearchParams();

  // ============================================================
  // BOOKING FORM STATE
  // ============================================================
  const [bookingData, setBookingData] = useState(() =>
    resolveInitialBookingState(searchParams)
  );

  // ============================================================
  // COMPUTED ROUTE & PRICING STATE
  // ============================================================
  const [distanceResult, setDistanceResult] = useState(null);
  const [pricingResult, setPricingResult] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const [, startTransition] = useTransition();

  if (!bus) {
    notFound();
  }

  // ============================================================
  // ROUTE CALCULATION
  // ============================================================
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
      } catch (err) {
        console.error("Calculation failed", err);
      }
    },
    [bus]
  );

  // ============================================================
  // INITIAL CALCULATION + LISTENER
  // ============================================================
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

  // ============================================================
  // FORM FIELD CHANGE
  // ============================================================
  const handleFieldChange = (key, value) => {
    setBookingData((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      };

      saveBookingSession(updated);

      return updated;
    });
  };

  // ============================================================
  // DESTINATION CHANGE
  // ============================================================
  const handleDestinationsChange = (newDestinations) => {
    handleFieldChange("destination", newDestinations);
  };

  // ============================================================
  // CONFIRM BOOKING
  // ============================================================
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">

      {/* ========================================================
          BACK LINK
      ======================================================== */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/fleets"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-600 hover:text-brand-orange transition-colors group select-none"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5] transition-transform group-hover:-translate-x-1 text-brand-orange" />

          <span>Back to All Coaches</span>
        </Link>
      </div>

      {/* ========================================================
          MAIN TWO-COLUMN LAYOUT
          
          LEFT:
          Coach information, specifications, amenities,
          assurance section

          RIGHT:
          Booking form and live calculation
      ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">

        {/* ======================================================
            LEFT COLUMN
        ====================================================== */}
        <div className="lg:col-span-7 flex flex-col gap-8 w-full">

          {/* ====================================================
              BUS IMAGE CAROUSEL

              COMMENTED OUT AS REQUESTED.

              Keeping this commented instead of deleting it makes
              it easy to restore later.
          ==================================================== */}

          {/*
          <BusImageCarousel
            images={bus?.gallery || [bus?.image]}
            busName={bus?.name}
          />
          */}


          {/* ====================================================
              BUS TITLE, BADGES & OVERVIEW
          ==================================================== */}
          <div className="flex flex-col items-start text-left">

            {/* Eyebrow & Badges */}
            <div className="flex items-center gap-2 mb-3 select-none flex-wrap">

              <span className="px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                {bus?.badge || "CHARTER COACH"}
              </span>

              {bus?.isPopular && (
                <span className="px-3 py-1 rounded-full bg-orange-50 border border-brand-orange/30 text-[11px] font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-brand-orange text-brand-orange" />

                  <span>Most Popular</span>
                </span>
              )}

              {/* Per KM fare removed */}
            </div>


            {/* Bus Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-neutral-900 tracking-tight leading-[1.12] mb-3">
              {bus?.name}
            </h1>


            {/* Seating Capacity */}
            <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-neutral-700 mb-4 select-none">
              <Users className="w-4 h-4 text-brand-orange stroke-[2.2]" />

              <span>
                Capacity: {bus?.capacity}
              </span>
            </div>


            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              {bus?.description}
            </p>

          </div>


          {/* ====================================================
              VEHICLE SPECIFICATIONS
          ==================================================== */}
          {bus?.features && (
            <div className="rounded-2xl sm:rounded-3xl bg-neutral-50/90 border border-neutral-200/80 p-5 sm:p-6">

              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 select-none">
                VEHICLE SPECIFICATIONS
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">

                {/* Luggage */}
                <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-neutral-100 shadow-2xs">
                  <span className="text-neutral-400 font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                    Luggage Bay
                  </span>

                  <span className="font-bold text-neutral-900">
                    {bus.features.luggage}
                  </span>
                </div>


                {/* Climate */}
                <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-neutral-100 shadow-2xs">
                  <span className="text-neutral-400 font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                    Climate Control
                  </span>

                  <span className="font-bold text-neutral-900">
                    {bus.features.climate}
                  </span>
                </div>


                {/* Seating */}
                <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-neutral-100 shadow-2xs">
                  <span className="text-neutral-400 font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                    Seating Layout
                  </span>

                  <span className="font-bold text-neutral-900">
                    {bus.features.seats}
                  </span>
                </div>


                {/* Entertainment */}
                <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-neutral-100 shadow-2xs">
                  <span className="text-neutral-400 font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                    Audio &amp; Visual
                  </span>

                  <span className="font-bold text-neutral-900">
                    {bus.features.entertainment}
                  </span>
                </div>

              </div>
            </div>
          )}


          {/* ====================================================
              INCLUDED COACH AMENITIES
          ==================================================== */}
          {bus?.amenities && (
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/80 p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">

              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 select-none">
                INCLUDED COACH AMENITIES
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {bus.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-neutral-700"
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[2.6]" />
                    </div>

                    <span>{amenity}</span>
                  </div>
                ))}

              </div>
            </div>
          )}


          {/* ====================================================
              FLEET ASSURANCE
          ==================================================== */}
          <div className="rounded-2xl sm:rounded-3xl bg-neutral-900 text-white p-6 sm:p-7 shadow-lg">

            <span className="text-[11px] font-bold text-brand-orange uppercase tracking-wider block mb-1">
              BUS MANTRA FLEET ASSURANCE
            </span>

            <h3 className="text-lg sm:text-xl font-black text-white mb-4">
              Premium Standards On Every Mile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">

              {/* Chauffeurs */}
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />

                <div>
                  <strong className="text-white block font-bold mb-0.5">
                    Verified Chauffeurs
                  </strong>

                  <span>
                    Experienced commercial highway drivers with spotless
                    safety records.
                  </span>
                </div>
              </div>


              {/* Sanitized */}
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />

                <div>
                  <strong className="text-white block font-bold mb-0.5">
                    Deeply Sanitized
                  </strong>

                  <span>
                    Every vehicle is sanitized and mechanically inspected
                    before every dispatch.
                  </span>
                </div>
              </div>


              {/* Support */}
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />

                <div>
                  <strong className="text-white block font-bold mb-0.5">
                    24/7 Trip Support
                  </strong>

                  <span>
                    Dedicated operations control room monitoring your
                    schedule in real time.
                  </span>
                </div>
              </div>


              {/* Invoicing */}
              <div className="flex items-start gap-2.5">
                <BadgeCheck className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />

                <div>
                  <strong className="text-white block font-bold mb-0.5">
                    Transparent Invoicing
                  </strong>

                  <span>
                    Fuel, driver allowances, and standard GST included
                    with zero hidden extras.
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>


        {/* ======================================================
            RIGHT COLUMN
            BOOKING FORM
        ====================================================== */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 w-full">

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 p-5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.06)] space-y-5">

            {/* ==================================================
                BOOKING PANEL HEADER
            ================================================== */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-neutral-100">

              <div>
                <span className="text-[10px] sm:text-[11px] font-bold text-brand-orange uppercase tracking-wider block mb-0.5">
                  CUSTOM ROUTE &amp; FARE
                </span>

                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                  Reserve {bus?.name}
                </h2>
              </div>

              {/* Per KM fare removed */}

            </div>


            {/* ==================================================
                FORM FIELDS
            ================================================== */}
            <div className="space-y-3.5">

              {/* =================================================
                  1. PICK-UP POINT
              ================================================= */}
              <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl px-4 py-3 transition-all flex flex-col justify-center">

                <label
                  htmlFor="detailPickupPoint"
                  className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5 flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />

                  <span>PICK-UP POINT</span>
                </label>

                <input
                  id="detailPickupPoint"
                  type="text"
                  value={bookingData.pickupPoint}
                  onChange={(e) =>
                    handleFieldChange(
                      "pickupPoint",
                      e.target.value
                    )
                  }
                  placeholder="Enter pickup point (e.g. Delhi NCR)"
                  className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                />

              </div>


              {/* =================================================
                  2. DESTINATION
              ================================================= */}
              <DestinationMultiSelect
                selectedDestinations={
                  Array.isArray(bookingData.destination)
                    ? bookingData.destination
                    : [bookingData.destination]
                }
                onChange={handleDestinationsChange}
              />


              {/* =================================================
                  3. TRAVEL DATES
              ================================================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Departure */}
                <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl px-4 py-3 transition-all flex flex-col justify-center">

                  <label
                    htmlFor="detailDeparture"
                    className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-brand-orange" />

                    <span>DEPARTURE</span>
                  </label>

                  <input
                    id="detailDeparture"
                    type="text"
                    value={bookingData.departureDateTime}
                    onChange={(e) =>
                      handleFieldChange(
                        "departureDateTime",
                        e.target.value
                      )
                    }
                    placeholder="30-09-2026 | 07:00 AM"
                    className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                  />

                </div>


                {/* Return */}
                <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl px-4 py-3 transition-all flex flex-col justify-center">

                  <label
                    htmlFor="detailReturn"
                    className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-brand-orange" />

                    <span>RETURN</span>
                  </label>

                  <input
                    id="detailReturn"
                    type="text"
                    value={bookingData.returnDateTime}
                    onChange={(e) =>
                      handleFieldChange(
                        "returnDateTime",
                        e.target.value
                      )
                    }
                    placeholder="02-10-2026 | 09:00 PM"
                    className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                  />

                </div>

              </div>


              {/* =================================================
                  PASSENGERS FIELD REMOVED
              ================================================= */}

              {/*
              {!bookingData.hasDeterminedPassengers && (
                <div>
                  ...
                </div>
              )}
              */}


              {/* =================================================
                  4. CONTACT DETAILS
              ================================================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">

                {/* Lead Passenger */}
                <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl px-4 py-3 transition-all flex flex-col justify-center">

                  <label
                    htmlFor="detailName"
                    className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5 flex items-center gap-1.5 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-neutral-500" />

                    <span>LEAD PASSENGER</span>
                  </label>

                  <input
                    id="detailName"
                    type="text"
                    value={bookingData.fullName}
                    onChange={(e) =>
                      handleFieldChange(
                        "fullName",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                  />

                </div>


                {/* Mobile */}
                <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl px-4 py-3 transition-all flex flex-col justify-center">

                  <label
                    htmlFor="detailMobile"
                    className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />

                    <span>CONTACT MOBILE</span>
                  </label>

                  <input
                    id="detailMobile"
                    type="tel"
                    value={bookingData.mobile}
                    onChange={(e) =>
                      handleFieldChange(
                        "mobile",
                        e.target.value
                      )
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full text-xs sm:text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                  />

                </div>

              </div>

            </div>


            {/* ==================================================
                LIVE CALCULATION
            ================================================== */}
            <div className="pt-4 border-t border-neutral-100 space-y-3.5">

              <div className="grid grid-cols-2 gap-3">

                {/* Distance */}
                <div className="bg-[#f8f9fa] rounded-xl p-3 sm:p-3.5 border border-neutral-100 flex flex-col justify-center">

                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
                    EST. ROUND TRIP
                  </span>

                  <div className="flex items-baseline gap-1">

                    <span className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                      ≈ {distanceResult?.totalKm || 0}
                    </span>

                    <span className="text-[11px] font-bold text-neutral-500 uppercase">
                      KM
                    </span>

                  </div>

                </div>


                {/* Total Fare */}
                <div className="bg-orange-50/70 rounded-xl p-3 sm:p-3.5 border border-brand-orange/20 flex flex-col justify-center">

                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider mb-0.5">
                    TOTAL ESTIMATED FARE
                  </span>

                  <div className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                    {pricingResult?.formattedTotalPrice || "₹0"}
                  </div>

                </div>

              </div>


              {/* Route Summary */}
              <div className="bg-[#f4f5f7] rounded-xl p-2.5 sm:p-3 flex items-start gap-2 border border-neutral-200/50">

                <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />

                <div className="text-[11px] sm:text-xs text-neutral-700 leading-snug font-medium">

                  <strong className="text-neutral-900 mr-1">
                    Route Path:
                  </strong>

                  <span>
                    {distanceResult?.routeSummaryText ||
                      "Delhi NCR → Jaipur → Delhi NCR (Return)"}
                  </span>

                </div>

              </div>


              {/* Inclusions */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-neutral-600 pt-1">

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Full Bus Charter</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verified Chauffeur</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Fuel &amp; GST Included</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>24/7 Dispatch Control</span>
                </div>

              </div>

            </div>


            {/* ==================================================
                CONFIRM BOOKING
            ================================================== */}
            <button
              type="button"
              onClick={handleConfirmBooking}
              className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-brand-orange/20 active:scale-[0.98] transition-all cursor-pointer group"
            >
              <span>Confirm Booking Request</span>

              <ArrowRight className="w-4 h-4 text-white stroke-[2.4] transition-transform duration-200 group-hover:translate-x-1" />
            </button>

          </div>
        </div>

      </div>


      {/* ========================================================
          BOOKING CONFIRMATION MODAL
      ======================================================== */}
      {isBooked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">

          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-100 text-center animate-in fade-in zoom-in-95 duration-200">

            {/* Success Icon */}
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200/60">
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </div>


            {/* Eyebrow */}
            <span className="text-[11px] font-bold tracking-wider text-brand-orange uppercase block mb-1">
              RESERVATION REQUEST RECEIVED
            </span>


            {/* Heading */}
            <h4 className="text-xl sm:text-2xl font-black text-neutral-900 mb-2">
              Your Bus Is Reserved!
            </h4>


            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
              Thank you! Our fleet operations team is preparing your
              itinerary for{" "}
              <strong className="text-neutral-900">
                {bus?.name}
              </strong>
              . A dedicated trip coordinator will call you to confirm
              your schedule.
            </p>


            {/* Booking Summary */}
            <div className="bg-neutral-50 rounded-xl p-3.5 text-xs text-neutral-700 text-left mb-6 space-y-2 border border-neutral-200/60">

              <div className="flex justify-between">
                <span className="text-neutral-500">
                  Coach:
                </span>

                <span className="font-bold text-neutral-900">
                  {bus?.name}
                </span>
              </div>


              <div className="flex justify-between">
                <span className="text-neutral-500">
                  Pickup:
                </span>

                <span className="font-semibold">
                  {bookingData?.pickupPoint || "Delhi NCR"}
                </span>
              </div>


              <div className="flex justify-between">
                <span className="text-neutral-500">
                  Destination:
                </span>

                <span className="font-semibold">
                  {Array.isArray(bookingData?.destination)
                    ? bookingData.destination.join(", ")
                    : bookingData?.destination || "Jaipur"}
                </span>
              </div>


              <div className="flex justify-between">
                <span className="text-neutral-500">
                  Departure:
                </span>

                <span className="font-semibold">
                  {bookingData?.departureDateTime || "Scheduled"}
                </span>
              </div>


              <div className="flex justify-between border-t border-neutral-200/60 pt-1.5">

                <span className="text-neutral-500">
                  Estimated Total:
                </span>

                <span className="font-bold text-brand-orange text-sm">
                  {pricingResult?.formattedTotalPrice}
                </span>

              </div>

            </div>


            {/* Modal Actions */}
            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="flex-1 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                Close
              </button>

              <a
                href="tel:+919876543210"
                className="flex-1 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />

                <span>Call Support</span>
              </a>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}