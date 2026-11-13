"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

const DEFAULT_FALLBACK = "/fleet/12_seater_maharaja_tempo_traveller_1.png";

/**
 * Carousal - Modern responsive image carousel component with autoplay,
 * touch swipe, thumbnail navigation, and safe image fallbacks.
 *
 * Supported props:
 * - images: Array of image URLs (or objects with src/url)
 * - bus / destination / service / item: Entity object from which images can be automatically extracted
 * - title: Title / alt text prefix for images
 * - autoplay: Boolean (default: true)
 * - autoplayInterval: Milliseconds per slide (default: 3500)
 * - aspectRatio: Tailwind aspect ratio class (default: "aspect-video")
 * - showThumbnails: Boolean (default: true)
 * - showNavigation: Boolean (default: true)
 * - showBadge: Boolean (default: true)
 * - fallbackImage: Image URL to use if image fails to load or list is empty
 * - className: Additional container CSS classes
 * - priority: Boolean, whether first image has priority loading (default: true)
 */
export default function Carousal({
  images,
  title,
  bus,
  destination,
  service,
  item,
  autoplay = true,
  autoplayInterval = 3500,
  aspectRatio = "aspect-video",
  showThumbnails = true,
  showNavigation = true,
  showBadge = true,
  fallbackImage = DEFAULT_FALLBACK,
  className = "",
  priority = true,
}) {
  // Extract images from explicit images array or supported entity objects
  const resolvedImages = useMemo(() => {
    let list = [];

    if (Array.isArray(images) && images.length > 0) {
      list = images
        .map((img) => (typeof img === "string" ? img : img?.src || img?.url))
        .filter(Boolean);
    } else {
      const entity = bus || destination || service || item;
      if (entity) {
        list = [
          ...(Array.isArray(entity.gallery) ? entity.gallery : []),
          ...(Array.isArray(entity.images) ? entity.images : []),
          ...(Array.isArray(entity.imageGallery) ? entity.imageGallery : []),
          entity.image,
          entity.imageUrl,
          entity.imagePath,
          entity.photo,
          entity.thumbnail,
        ]
          .map((img) => (typeof img === "string" ? img : img?.src || img?.url))
          .filter(Boolean);
      }
    }

    const unique = [...new Set(list)];
    return unique.length > 0 ? unique : [fallbackImage];
  }, [images, bus, destination, service, item, fallbackImage]);

  // Resolve title for alt attributes
  const resolvedTitle = useMemo(() => {
    return (
      title ||
      bus?.name ||
      destination?.name ||
      service?.title ||
      item?.name ||
      "Bus Mantra"
    );
  }, [title, bus, destination, service, item]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  const touchStartXRef = useRef(null);

  // Reset active index when image set changes
  const imagesKey = resolvedImages.join("|");
  const [prevKey, setPrevKey] = useState(imagesKey);
  if (imagesKey !== prevKey) {
    setPrevKey(imagesKey);
    setActiveIndex(0);
  }

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || resolvedImages.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % resolvedImages.length);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, resolvedImages.length, isPaused, autoplayInterval]);

  const handlePrev = useCallback(
    (e) => {
      e?.stopPropagation?.();
      setActiveIndex((prev) =>
        prev === 0 ? resolvedImages.length - 1 : prev - 1
      );
    },
    [resolvedImages.length]
  );

  const handleNext = useCallback(
    (e) => {
      e?.stopPropagation?.();
      setActiveIndex((prev) => (prev + 1) % resolvedImages.length);
    },
    [resolvedImages.length]
  );

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

  const handleImageError = useCallback((index) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  }, []);

  return (
    <div
      className={`w-full space-y-3 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Large Display Stage */}
      <div
        className={`group relative w-full ${aspectRatio} overflow-hidden rounded-2xl border border-border bg-surface-secondary shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:rounded-3xl select-none`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {resolvedImages.map((img, idx) => {
          const src = failedImages[idx] ? fallbackImage : img;
          const isActive = activeIndex === idx;

          return (
            <div
              key={`${img}-${idx}`}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={src}
                alt={`${resolvedTitle} - Image ${idx + 1}`}
                fill
                priority={priority && idx === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 58vw"
                className="object-cover"
                onError={() => handleImageError(idx)}
              />
            </div>
          );
        })}

        {/* Prev / Next Minimal Navigation Buttons */}
        {showNavigation && resolvedImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label={`Previous ${resolvedTitle} image`}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105 active:scale-95 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer shadow-md focus:opacity-100"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={`Next ${resolvedTitle} image`}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105 active:scale-95 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer shadow-md focus:opacity-100"
            >
              <ChevronRight className="h-5 w-5 stroke-[2.2]" />
            </button>
          </>
        )}

        {/* Counter Badge */}
        {showBadge && resolvedImages.length > 1 && (
          <div className="absolute bottom-3 right-3 z-20 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md flex items-center gap-1.5 shadow-sm pointer-events-none select-none">
            <ImageIcon className="h-3.5 w-3.5 text-primary" />
            <span>
              {activeIndex + 1} / {resolvedImages.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {showThumbnails && resolvedImages.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {resolvedImages.map((img, idx) => {
            const src = failedImages[idx] ? fallbackImage : img;
            const isActive = activeIndex === idx;

            return (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                aria-label={`Select ${resolvedTitle} image ${idx + 1}`}
                className={`relative h-16 w-24 sm:h-18 sm:w-28 shrink-0 overflow-hidden rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "border-primary ring-2 ring-primary/40 scale-102"
                    : "border-border opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt={`${resolvedTitle} thumbnail ${idx + 1}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                  onError={() => handleImageError(idx)}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Re-export as Carousel for standard spelling convenience
export { Carousal as Carousel };

