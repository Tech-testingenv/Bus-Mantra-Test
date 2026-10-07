import Image from "next/image";
import { fleetPageHeroData } from "@/data/data";

/**
 * Reusable PageHero component for interior pages (Fleet, Services, Destinations, About, Contact).
 * Purpose: High-level page introduction ("What is this page about?").
 * Balanced two-column layout on desktop (~50% text, ~50% image) and stacked on mobile.
 * Clean, premium, and focused without CTA buttons, stats, or vehicle cards.
 * Default hero data is fetched directly from @/data/data.
 */
export default function PageHero({
  data = fleetPageHeroData,
  eyebrow = data?.eyebrow ?? fleetPageHeroData?.eyebrow,
  title = data?.title ?? fleetPageHeroData?.title,
  titleLines = data?.titleLines ?? fleetPageHeroData?.titleLines,
  description = data?.description ?? fleetPageHeroData?.description,
  image = data?.image ?? fleetPageHeroData?.image,
  imageAlt = data?.imageAlt ?? fleetPageHeroData?.imageAlt ?? "Bus Mantra luxury coach fleet",
  imageWidth = 1920,
  imageHeight = 1080,
  priority = true,
  className = "",
}) {
  const formatTitle = (text, lines) => {
    if (Array.isArray(lines) && lines.length >= 2) {
      return (
        <>
          <span className="block text-neutral-900">{lines[0]}</span>
          <span className="block text-brand-orange">{lines[1]}</span>
        </>
      );
    }
    if (typeof text !== "string") return text;
    if (text.includes("One fleet.")) {
      const parts = text.split("One fleet.");
      const rest = parts[1]?.trim() || "Every kind of journey.";
      return (
        <>
          <span className="block text-neutral-900">One fleet.</span>
          <span className="block text-brand-orange">{rest}</span>
        </>
      );
    }
    return text;
  };

  return (
    <section className={`relative w-full pt-1 sm:pt-2 pb-6 sm:pb-8 lg:pb-10 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-10 xl:gap-12 items-center">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Page Introduction (~50% width on desktop)    */}
        {/* Mobile order: 1. Eyebrow, 2. Heading, 3. Description      */}
        {/* ========================================================= */}
        <div className="flex flex-col items-start text-left">
          {eyebrow && (
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-neutral-100 text-[11px] font-bold tracking-wider text-neutral-600 uppercase mb-4 sm:mb-4.5 select-none">
              {eyebrow}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] 2xl:text-[48px] font-black leading-[1.12] lg:leading-[1.1] tracking-tight mb-4 sm:mb-4.5">
            {formatTitle(title, titleLines)}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Studio Coach Image (~50% width on desktop)  */}
        {/* Mobile order: 4. Bus Image below content                  */}
        {/* ========================================================= */}
        <div className="flex items-center justify-center w-full">
          <div className="w-full rounded-2xl sm:rounded-3xl xl:rounded-[28px] bg-[#f0f2f5] p-3.5 sm:p-4 lg:p-5 xl:p-6 flex items-center justify-center border border-neutral-100/90 shadow-2xs">
            <Image
              src={image}
              alt={imageAlt || title || "Bus Mantra luxury coach fleet"}
              width={imageWidth}
              height={imageHeight}
              priority={priority}
              className="w-full max-h-52.5 sm:max-h-57.5 lg:max-h-62.5 xl:max-h-67.5 object-contain select-none transition-transform duration-300 hover:scale-[1.02] rounded-xl sm:rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
