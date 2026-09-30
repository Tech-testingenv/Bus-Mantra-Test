"use client";

import { useState, useRef, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  Users,
  MapPin,
  Navigation,
  Calendar,
  Clock,
  Search,
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import { heroData } from "@/data/data";

// Icon mapping helper
const ICON_MAP = {
  user: User,
  phone: Phone,
  mail: Mail,
  users: Users,
  mapPin: MapPin,
  navigation: Navigation,
  calendar: Calendar,
  clock: Clock,
};

export default function BookingForm({ formData = heroData.form }) {
  // Initialize form state from data.js
  const [formValues, setFormValues] = useState(() => {
    const initial = {};
    formData.row1?.forEach((field) => {
      initial[field.id] = field.defaultValue || "";
    });
    formData.row2?.forEach((field) => {
      if (field.type === "dateTime") {
        initial[`${field.id}Date`] = field.defaultDate || "";
        initial[`${field.id}Time`] = field.defaultTime || "";
      } else {
        initial[field.id] = field.defaultValue || "";
      }
    });
    return initial;
  });

  // Searchable Destination Dropdown State
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [destinationSearch, setDestinationSearch] = useState("");
  const destinationRef = useRef(null);

  // Hidden native picker refs for Departure and Return
  const departureDateRef = useRef(null);
  const departureTimeRef = useRef(null);
  const returnDateRef = useRef(null);
  const returnTimeRef = useRef(null);

  // Close destination dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (destinationRef.current && !destinationRef.current.contains(e.target)) {
        setIsDestinationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  // Convert ISO Date (YYYY-MM-DD) to formatted DD-MM-YYYY
  const handleNativeDateChange = (fieldId, isoDate) => {
    if (!isoDate) return;
    const [year, month, day] = isoDate.split("-");
    handleChange(`${fieldId}Date`, `${day}-${month}-${year}`);
  };

  // Convert 24-hr Time (HH:MM) to 12-hr with AM/PM
  const handleNativeTimeChange = (fieldId, time24) => {
    if (!time24) return;
    const [hoursStr, mins] = time24.split(":");
    let hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    handleChange(`${fieldId}Time`, `${formattedHours}:${mins} ${ampm}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bus Mantra Charter Booking Query:", formValues);
  };

  // Find destination field metadata from data.js
  const destinationField =
    formData.row2?.find((f) => f.id === "destination") || {};
  const destinationOptions = destinationField.options || [];

  const filteredDestinations = destinationOptions.filter((opt) => {
    const query = destinationSearch.toLowerCase().trim();
    if (!query) return true;
    return (
      opt.label.toLowerCase().includes(query) ||
      opt.value.toLowerCase().includes(query) ||
      (opt.badge && opt.badge.toLowerCase().includes(query))
    );
  });

  return (
    <div
      id="booking-form"
      className="w-full bg-brand-surface rounded-2xl sm:rounded-3xl border border-brand-border/70 shadow-[0_20px_50px_rgba(12,22,33,0.08)] p-4 sm:p-6 lg:p-7 transition-all duration-300 relative z-20"
    >
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* ========================================================= */}
        {/* ROW 1: Contact & Group Details (4 Fields)                 */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {formData.row1?.map((field) => {
            const IconComponent = ICON_MAP[field.icon] || User;
            return (
              <div
                key={field.id}
                className="group relative bg-[#fcfdfe] hover:bg-white focus-within:bg-white border border-[#e8ecf1] focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/20 rounded-xl px-3.5 py-2.5 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <label
                    htmlFor={field.id}
                    className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <span>{field.label}</span>
                  </label>
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                      field.iconColor || "text-brand-gray bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-3 h-3 stroke-[2.2]" />
                  </span>
                </div>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type || "text"}
                  value={formValues[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full text-sm font-semibold text-brand-dark placeholder:text-gray-400 focus:outline-none bg-transparent"
                />
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* ROW 2: Route, Schedule (Date & Time Shared) + Find Buses  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-stretch">
          {formData.row2?.map((field) => {
            const IconComponent = ICON_MAP[field.icon] || MapPin;

            // -----------------------------------------------------
            // 1. Searchable Destination Dropdown Field
            // -----------------------------------------------------
            if (field.id === "destination") {
              const selectedOption = destinationOptions.find(
                (opt) => opt.value === formValues.destination
              );

              return (
                <div
                  key={field.id}
                  ref={destinationRef}
                  className={`group relative bg-[#fcfdfe] hover:bg-white border ${
                    isDestinationOpen
                      ? "border-brand-orange ring-2 ring-brand-orange/20 bg-white"
                      : "border-[#e8ecf1] hover:border-neutral-300"
                  } rounded-xl px-3.5 py-2.5 transition-all duration-200 flex flex-col justify-center cursor-pointer select-none`}
                  onClick={() => setIsDestinationOpen((prev) => !prev)}
                >
                  {/* Field Header */}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray truncate">
                        {field.label}
                      </span>
                      {selectedOption?.badge ? (
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-orange-50 text-brand-orange border border-brand-orange/20 shrink-0">
                          {selectedOption.badge}
                        </span>
                      ) : (
                        field.badge && (
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                            {field.badge}
                          </span>
                        )
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center ${
                          field.iconColor || "text-purple-600 bg-purple-50"
                        }`}
                      >
                        <IconComponent className="w-3 h-3 stroke-[2.2]" />
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                          isDestinationOpen ? "rotate-180 text-brand-orange" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Field Display / Trigger */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-brand-dark truncate">
                      {formValues.destination || field.placeholder || "Select Destination"}
                    </span>
                  </div>

                  {/* Searchable Dropdown Overlay */}
                  {isDestinationOpen && (
                    <div
                      className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white rounded-2xl border border-neutral-200 shadow-2xl p-2.5 space-y-2 animate-in fade-in zoom-in-95 duration-150"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Search Input Inside Dropdown */}
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 focus-within:border-brand-orange focus-within:bg-white transition-colors">
                        <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <input
                          type="text"
                          value={destinationSearch}
                          onChange={(e) => setDestinationSearch(e.target.value)}
                          placeholder="Search destination..."
                          className="w-full text-xs font-semibold text-brand-dark bg-transparent focus:outline-none placeholder:text-neutral-400"
                          autoFocus
                        />
                        {destinationSearch && (
                          <button
                            type="button"
                            onClick={() => setDestinationSearch("")}
                            className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Filtered Destinations List */}
                      <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                        {filteredDestinations.length > 0 ? (
                          filteredDestinations.map((opt) => {
                            const isSelected = formValues.destination === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  handleChange("destination", opt.value);
                                  setIsDestinationOpen(false);
                                  setDestinationSearch("");
                                }}
                                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                                  isSelected
                                    ? "bg-orange-50 text-brand-orange font-bold"
                                    : "hover:bg-neutral-100 text-brand-dark font-medium"
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <MapPin
                                    className={`w-3 h-3 shrink-0 ${
                                      isSelected
                                        ? "text-brand-orange"
                                        : "text-neutral-400"
                                    }`}
                                  />
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {opt.badge && (
                                    <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                                      {opt.badge}
                                    </span>
                                  )}
                                  {isSelected && (
                                    <Check className="w-3.5 h-3.5 text-brand-orange stroke-[2.5]" />
                                  )}
                                </div>
                              </button>
                            );
                          })
                        ) : (
                          <div className="py-4 text-center text-xs text-neutral-400">
                            No destinations found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // -----------------------------------------------------
            // 2. Shared Date & Time Field (Departure & Return)
            // -----------------------------------------------------
            if (field.type === "dateTime") {
              const dateVal = formValues[`${field.id}Date`] || "";
              const timeVal = formValues[`${field.id}Time`] || "";

              const isDeparture = field.id === "departureDateTime";
              const datePickerRef = isDeparture ? departureDateRef : returnDateRef;
              const timePickerRef = isDeparture ? departureTimeRef : returnTimeRef;

              return (
                <div
                  key={field.id}
                  className="group relative bg-[#fcfdfe] hover:bg-white focus-within:bg-white border border-[#e8ecf1] focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/20 rounded-xl px-3.5 py-2.5 transition-all duration-200 flex flex-col justify-center"
                >
                  {/* Field Header */}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray truncate select-none">
                      {field.label}
                    </label>

                    {/* Dual Icon Badges: Calendar & Clock */}
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Calendar Icon Button: Triggers native Date picker */}
                      <button
                        type="button"
                        onClick={() => datePickerRef.current?.showPicker?.()}
                        title="Pick Date"
                        className="w-5 h-5 rounded flex items-center justify-center text-brand-orange bg-orange-50 hover:bg-brand-orange hover:text-white transition-colors cursor-pointer"
                      >
                        <Calendar className="w-3 h-3 stroke-[2.2]" />
                      </button>

                      {/* Clock Icon Button: Triggers native Time picker */}
                      <button
                        type="button"
                        onClick={() => timePickerRef.current?.showPicker?.()}
                        title="Pick Time"
                        className="w-5 h-5 rounded flex items-center justify-center text-amber-600 bg-amber-50 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
                      >
                        <Clock className="w-3 h-3 stroke-[2.2]" />
                      </button>
                    </div>
                  </div>

                  {/* Shared Field Body: Date + Divider + Time */}
                  <div className="flex items-center justify-between gap-1.5 w-full">
                    {/* Date Input */}
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={dateVal}
                        onChange={(e) =>
                          handleChange(`${field.id}Date`, e.target.value)
                        }
                        placeholder={field.datePlaceholder || "DD-MM-YYYY"}
                        className="w-full text-xs sm:text-sm font-semibold text-brand-dark placeholder:text-gray-400 focus:outline-none bg-transparent"
                      />
                    </div>

                    {/* Clean Subtle Vertical Divider */}
                    <span className="text-neutral-300 font-light select-none text-xs">
                      |
                    </span>

                    {/* Time Input */}
                    <div className="shrink-0">
                      <input
                        type="text"
                        value={timeVal}
                        onChange={(e) =>
                          handleChange(`${field.id}Time`, e.target.value)
                        }
                        placeholder={field.timePlaceholder || "07:00 AM"}
                        className="w-20 text-xs sm:text-sm font-semibold text-brand-dark placeholder:text-gray-400 focus:outline-none bg-transparent text-right"
                      />
                    </div>
                  </div>

                  {/* Hidden Native Date Picker for instant calendar selection */}
                  <input
                    ref={datePickerRef}
                    type="date"
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden="true"
                    onChange={(e) =>
                      handleNativeDateChange(field.id, e.target.value)
                    }
                  />

                  {/* Hidden Native Time Picker for instant clock selection */}
                  <input
                    ref={timePickerRef}
                    type="time"
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden="true"
                    onChange={(e) =>
                      handleNativeTimeChange(field.id, e.target.value)
                    }
                  />
                </div>
              );
            }

            // -----------------------------------------------------
            // 3. Standard Text Input (e.g. Pick-up Point)
            // -----------------------------------------------------
            return (
              <div
                key={field.id}
                className="group relative bg-[#fcfdfe] hover:bg-white focus-within:bg-white border border-[#e8ecf1] focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/20 rounded-xl px-3.5 py-2.5 transition-all duration-200 flex flex-col justify-center"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <label
                    htmlFor={field.id}
                    className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray truncate cursor-pointer select-none"
                  >
                    {field.label}
                  </label>
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                      field.iconColor || "text-brand-gray bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-3 h-3 stroke-[2.2]" />
                  </span>
                </div>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type || "text"}
                  value={formValues[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full text-sm font-semibold text-brand-dark placeholder:text-gray-400 focus:outline-none bg-transparent"
                />
              </div>
            );
          })}

          {/* Primary Action Button: Find Buses */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-1 flex items-stretch">
            <button
              type="submit"
              className="w-full min-h-13.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-brand-white font-semibold text-sm lg:text-[15px] flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>{formData.submitButton?.label || "Find Buses"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 3: Dynamic Route Summary                              */}
        {/* ========================================================= */}
        {formData.routeSummary && (
          <div className="pt-3 border-t border-brand-border/50 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-brand-dark font-medium">
              <span className="px-2 py-0.5 rounded-md bg-orange-100/70 text-brand-orange font-semibold text-[11px] uppercase tracking-wider">
                {formData.routeSummary.badge || "Route"}
              </span>
              <span className="text-brand-gray font-normal hidden sm:inline">
                Selected Itinerary:
              </span>
              <span className="font-semibold text-brand-dark flex items-center gap-1.5">
                {formValues.pickupPoint || "Delhi NCR"} →{" "}
                <span className="text-brand-orange font-bold">
                  {formValues.destination || "Jaipur"}
                </span>{" "}
                → {formValues.pickupPoint || "Delhi NCR"} (Return)
              </span>
            </div>
            <div className="text-[12px] text-brand-gray flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Full Luxury Coach • Entire Bus Reserved</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
