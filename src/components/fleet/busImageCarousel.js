"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BusImageCarousel({
  images = [],
  busName = "Bus Mantra Coach",
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Safe fallback if images array is empty or undefined
  const imageList =
    Array.isArray(images) && images.length > 0
      ? images
      : ["/fleet/mini-coach.jpg", "/fleet/fleet.png", "/fleet/coach.png"];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`w-full flex flex-col gap-3.5 ${className}`}>
      {/* Main Large Display Image */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl bg-surface-secondary p-4 sm:p-6 lg:p-8 flex items-center justify-center overflow-hidden border border-border shadow-2xs group aspect-16/10 sm:aspect-video">
        <Image
          src={imageList[currentIndex]}
          alt={`${busName} - Image ${currentIndex + 1}`}
          width={1280}
          height={720}
          priority
          className="w-full h-full object-contain select-none transition-all duration-300 ease-out group-hover:scale-102"
        />

        {/* Prev / Next Minimal Navigation Buttons */}
        {imageList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous bus image"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md backdrop-blur-xs transition-all duration-150 active:scale-95 cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next bus image"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md backdrop-blur-xs transition-all duration-150 active:scale-95 cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Pagination badge */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold select-none">
              {currentIndex + 1} / {imageList.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1 scrollbar-none">
          {imageList.map((imgSrc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 sm:h-20 aspect-16/10 rounded-xl overflow-hidden bg-surface-secondary p-1.5 transition-all cursor-pointer shrink-0 border-2 ${currentIndex === idx
                  ? "border-primary shadow-sm scale-102"
                  : "border-transparent opacity-65 hover:opacity-100 hover:border-border-strong"
                }`}
              aria-label={`Select image ${idx + 1}`}
            >
              <Image
                src={imgSrc}
                alt={`Thumbnail ${idx + 1}`}
                width={200}
                height={120}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
