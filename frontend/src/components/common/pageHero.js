import Image from "next/image";
import { fleetPageHeroData } from "@/data/data";

export default function PageHero({
  data = fleetPageHeroData,
  eyebrow = data?.eyebrow ?? fleetPageHeroData?.eyebrow,
  title = data?.title ?? fleetPageHeroData?.title,
  titleLines = data?.titleLines ?? fleetPageHeroData?.titleLines,
  description = data?.description ?? fleetPageHeroData?.description,
  image = data?.image ?? fleetPageHeroData?.image,
  imageAlt =
    data?.imageAlt ??
    fleetPageHeroData?.imageAlt ??
    "Bus Mantra luxury coach fleet",
  imageWidth = 1920,
  imageHeight = 1080,
  priority = true,
  className = "",
}) {
  const formatTitle = (text, lines) => {
    if (Array.isArray(lines) && lines.length >= 2) {
      return (
        <>
          <span className="block text-primary">
            {lines[0]}
          </span>

          <span className="block text-text-primary">
            {lines[1]}
          </span>
        </>
      );
    }

    if (typeof text !== "string") return text;

    if (text.includes("One fleet.")) {
      const parts = text.split("One fleet.");
      const rest = parts[1]?.trim() || "Every kind of journey.";

      return (
        <>
          <span className="block text-primary">
            One fleet.
          </span>

          <span className="block text-text-primary">
            {rest}
          </span>
        </>
      );
    }

    return text;
  };

  return (
    <section
      className={`relative w-full pt-1 pb-6 sm:pt-2 sm:pb-8 lg:pb-10 ${className}`}
    >
      <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-12">

        {/* LEFT COLUMN: Page Introduction */}
        <div className="flex flex-col items-start text-left">

          {/* Eyebrow */}
          {eyebrow && (
            <div className="mb-4 inline-block select-none rounded-full border border-border bg-surface-secondary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-text-muted sm:mb-4">
              {eyebrow}
            </div>
          )}

          {/* Heading */}
          <h1 className="mb-4 text-3xl font-black leading-[1.12] tracking-tight text-text-primary sm:mb-4 sm:text-4xl lg:text-[38px] lg:leading-[1.1] xl:text-[44px] 2xl:text-[48px]">
            {formatTitle(title, titleLines)}
          </h1>

          {/* Description */}
          <p className="max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {description}
          </p>
        </div>

        {/* RIGHT COLUMN: Coach Image */}
        <div className="flex w-full items-center justify-center">
          <div className="w-full rounded-2xl border border-border bg-surface-muted p-3.5 sm:rounded-3xl sm:p-4 lg:p-5 xl:rounded-[28px] xl:p-6 shadow-xs">

            <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl xl:rounded-3xl">
              <Image
                src={image}
                alt={
                  imageAlt ||
                  title ||
                  "Bus Mantra luxury coach fleet"
                }
                width={imageWidth}
                height={imageHeight}
                priority={priority}
                className="block h-auto max-h-52.5 w-full select-none rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02] sm:max-h-57.5 sm:rounded-3xl lg:max-h-62.5 xl:max-h-67.5 xl:rounded-3xl"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}