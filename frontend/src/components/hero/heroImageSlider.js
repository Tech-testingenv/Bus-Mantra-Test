"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_SLIDES = [
  {
    src: "/about_bus.png",
    alt: "BUS MANTRA Modern Luxury Coach Bus",
  },
  {
    src: "/fleet/1.jpg",
    alt: "BUS MANTRA Mini Coach Fleet",
  },
  {
    src: "/fleet/5.jpg",
    alt: "BUS MANTRA Luxury Coach Bus",
  },
  {
    src: "/fleet/9.jpg",
    alt: "BUS MANTRA Premium Coach Bus",
  },
];

export default function HeroImageSlider({
  slides = DEFAULT_SLIDES,
  autoplayInterval = 4500,
}) {
  const slideList =
    Array.isArray(slides) && slides.length > 0 ? slides : DEFAULT_SLIDES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);

  const totalSlides = slideList.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides, autoplayInterval, handleNext]);

  // Touch gesture support
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      className="relative w-full aspect-16/10 overflow-hidden rounded-2xl select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Bus image slider"
    >
      {/* Slider Images with Smooth Transition and object-cover */}
      {slideList.map((slide, idx) => {
        const isActive = idx === currentIndex;

        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive
              ? "opacity-100 z-1 pointer-events-auto"
              : "opacity-0 z-0 pointer-events-none"
              }`}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.alt || "BUS MANTRA Modern Luxury Coach Bus"}
              fill
              priority={idx === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 680px"
              className="w-full h-full object-cover    select-none transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        );
      })}

      {/* Subtle Prev & Next Arrow Controls */}
      {totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-opacity duration-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2.3]" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next slide"
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-opacity duration-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.3]" />
          </button>
        </>
      )}

      {/* Subtle Dot Indicators */}
      {totalSlides > 1 && (
        <div
          className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-2 select-none"
          role="tablist"
          aria-label="Slide indicators"
        >
          {slideList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer drop-shadow-sm focus:outline-none ${idx === currentIndex
                ? "w-5 sm:w-6 bg-primary"
                : "w-1.5 sm:w-2 bg-white/75 hover:bg-white"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
