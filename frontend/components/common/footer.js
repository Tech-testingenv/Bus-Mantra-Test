import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { footerData } from "@/data/data";

export default function Footer({ data = footerData }) {
  // Social icon mapper using crisp, lightweight SVGs
  const renderSocialIcon = (key) => {
    switch (key) {
      case "facebook":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );

      case "instagram":
        return (
          <svg
            className="w-4 h-4 fill-none stroke-current stroke-2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );

      case "twitter":
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );

      case "linkedin":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );

      case "youtube":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-neutral-850 bg-neutral-950 pt-7 pb-5 text-neutral-200 sm:pt-8 sm:pb-6">
      {/* Top Brand Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-amber-500 to-primary opacity-80" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER BAR */}
        <div className="flex flex-col justify-between gap-4 border-b border-neutral-800/80 pb-6 lg:flex-row lg:items-center">
          {/* Brand */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/"
              className="inline-flex shrink-0 items-center justify-start rounded-xl border border-white/20 bg-white px-3 py-1.5 shadow-xs transition-transform hover:scale-[1.02]"
            >
              <Image
                src={data.brand?.logo || "/logo-bus-mantra.png"}
                alt={data.brand?.name || "Bus Mantra"}
                width={220}
                height={75}
                priority
                className="h-7 w-auto max-w-36 object-contain object-left sm:h-8 sm:max-w-40"
              />
            </Link>

            <p className="max-w-xl text-xs leading-snug text-neutral-400 sm:text-sm">
              {data.brand?.description}
            </p>
          </div>

          {/* Social Icons + CTA */}
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {data.socialLinks?.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 shadow-2xs transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                >
                  {renderSocialIcon(social.key)}
                </a>
              ))}
            </div>

            {/* Vendor CTA */}
            <Link
              href={data.partner?.ctaHref || "/vendor"}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary-light/20 bg-primary px-4.5 py-2 text-xs font-bold text-white shadow-md shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:bg-primary-hover hover:shadow-primary/45 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring sm:py-2.5 sm:text-sm"
            >
              <Building2 className="h-4 w-4 stroke-[2.2]" />
              <span>{data.partner?.cta || "Register as a Vendor"}</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* FIVE-COLUMN NAVIGATION */}
        <div className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5 lg:gap-6 xl:gap-10 sm:py-7">
          {/* COLUMN 1: QUICK LINKS */}
          <div>
            <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-white sm:mb-3 sm:text-sm">
              Quick Links
            </h4>

            <ul className="space-y-1.5 text-xs sm:space-y-2 sm:text-sm">
              {data.quickLinks?.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-neutral-300 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: LEGAL */}
          <div>
            <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-white sm:mb-3 sm:text-sm">
              Legal
            </h4>

            <ul className="space-y-1.5 text-xs sm:space-y-2 sm:text-sm">
              {data.Legal?.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-neutral-300 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: FLEETS */}
          <div>
            <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-white sm:mb-3 sm:text-sm">
              Our Fleet
            </h4>

            <ul className="space-y-1.5 text-xs sm:space-y-2 sm:text-sm">
              {data.fleets?.map((fleet) => (
                <li key={fleet.label}>
                  <Link
                    href={fleet.href}
                    className={`inline-block transition-colors ${
                      fleet.isCta
                        ? "font-bold text-primary hover:underline"
                        : "text-neutral-300 hover:text-primary"
                    }`}
                  >
                    {fleet.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: TOP SERVICES */}
          <div>
            <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-white sm:mb-3 sm:text-sm">
              Top Services
            </h4>

            <ul className="space-y-1.5 text-xs sm:space-y-2 sm:text-sm">
              {data.services?.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className={`inline-block transition-colors ${
                      service.isCta
                        ? "font-bold text-primary hover:underline"
                        : "text-neutral-300 hover:text-primary"
                    }`}
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5: TOP DESTINATIONS */}
          <div>
            <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-white sm:mb-3 sm:text-sm">
              Top Destinations
            </h4>

            <ul className="space-y-1.5 text-xs sm:space-y-2 sm:text-sm">
              {data.destinations?.map((dest) => (
                <li key={dest.label}>
                  <Link
                    href={dest.href}
                    className={`inline-block transition-colors ${
                      dest.isCta
                        ? "font-bold text-primary hover:underline"
                        : "text-neutral-300 hover:text-primary"
                    }`}
                  >
                    {dest.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & DEVELOPER BAR */}
        <div className="flex flex-col items-center justify-between gap-2.5 border-t border-neutral-800/80 pt-4 text-center text-xs text-neutral-400 sm:flex-row sm:pt-5 sm:text-left">
          <p>{data.copyright}</p>

          <p className="flex items-center justify-center gap-1 sm:justify-start">
            <span>{data.developer?.prefix || "Developed by"}</span>

            <a
              href={data.developer?.href || "https://kanakdrishtiinfo.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-neutral-200 transition-colors hover:text-primary"
            >
              {data.developer?.name || "Kanak Drishti Infotech Pvt. Ltd."}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}