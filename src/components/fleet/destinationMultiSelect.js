"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, X, Plus, ChevronDown } from "lucide-react";

const POPULAR_DESTINATIONS = [
  "Jaipur",
  "Agra",
  "Udaipur",
  "Manali",
  "Shimla",
  "Haridwar",
  "Rishikesh",
  "Amritsar",
  "Chandigarh",
  "Goa",
];

/**
 * DestinationMultiSelect
 * Allows selecting multiple destinations as removable chips.
 * Supports quick selection from common hubs or typing a custom destination.
 */
export default function DestinationMultiSelect({
  selectedDestinations = ["Jaipur"],
  onChange,
  className = "",
  label = "DESTINATION(S)",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleAddDestination = (destName) => {
    const clean = destName.trim();
    if (!clean) return;

    // Avoid duplicate entry
    if (!selectedDestinations.some((d) => d.toLowerCase() === clean.toLowerCase())) {
      const updated = [...selectedDestinations, clean];
      onChange?.(updated);
    }
    setInputValue("");
    setIsOpen(false);
  };

  const handleRemoveDestination = (indexToRemove) => {
    const updated = selectedDestinations.filter((_, idx) => idx !== indexToRemove);
    // Keep at least 1 destination fallback
    onChange?.(updated.length > 0 ? updated : ["Jaipur"]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddDestination(inputValue);
    }
  };

  const availableSuggestions = POPULAR_DESTINATIONS.filter(
    (item) =>
      !selectedDestinations.some((d) => d.toLowerCase() === item.toLowerCase()) &&
      item.toLowerCase().includes(inputValue.toLowerCase().trim())
  );

  return (
    <div ref={containerRef} className={`relative flex flex-col ${className}`}>
      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-orange" />
          <span>{label}</span>
        </span>
        <span className="text-[10px] font-medium text-neutral-400 lowercase">
          multi-city route
        </span>
      </label>

      {/* Chips Container + Input Row */}
      <div className="bg-[#f4f5f7] hover:bg-[#eef0f3] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/30 border border-transparent focus-within:border-brand-orange rounded-xl p-2.5 sm:p-3 transition-all min-h-13 flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Render Selected Destination Chips */}
        {selectedDestinations.map((dest, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg bg-white border border-neutral-200/90 shadow-2xs text-xs font-semibold text-neutral-800 transition-all select-none group"
          >
            <span>{dest}</span>
            <button
              type="button"
              onClick={() => handleRemoveDestination(idx)}
              className="p-0.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
              aria-label={`Remove destination ${dest}`}
            >
              <X className="w-3 h-3 stroke-[2.5]" />
            </button>
          </span>
        ))}

        {/* Input for adding new destination */}
        <div className="flex-1 min-w-30 flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedDestinations.length === 0
                ? "e.g. Jaipur, Agra..."
                : "+ Add another city..."
            }
            className="w-full text-xs sm:text-sm font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
          />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
            aria-label="Toggle destination suggestions"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Dropdown Suggestions Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-white rounded-xl border border-neutral-200/90 shadow-xl p-2 max-h-56 overflow-y-auto">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">
            POPULAR DESTINATIONS
          </div>

          <div className="flex flex-wrap gap-1.5 p-1">
            {availableSuggestions.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleAddDestination(city)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-neutral-50 hover:bg-orange-50 text-neutral-700 hover:text-brand-orange border border-neutral-200/70 hover:border-brand-orange/30 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3 text-brand-orange stroke-[2.5]" />
                <span>{city}</span>
              </button>
            ))}
          </div>

          {inputValue.trim() && !availableSuggestions.includes(inputValue.trim()) && (
            <div className="pt-2 border-t border-neutral-100 mt-2 px-1">
              <button
                type="button"
                onClick={() => handleAddDestination(inputValue)}
                className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-brand-orange text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:bg-brand-orange-hover"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add &quot;{inputValue.trim()}&quot; as destination</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
