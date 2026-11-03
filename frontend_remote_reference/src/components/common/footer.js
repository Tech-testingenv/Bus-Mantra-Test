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
    <footer className="relative w-full bg-neutral-950 text-neutral-200 border-t border-neutral-850 pt-7 sm:pt-8 pb-5 sm:pb-6 overflow-hidden">
      {/* Top Brand Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-amber-500 to-primary opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* 1. COMPACT HEADER BAR: LOGO, TAGLINE & HIGHLIGHTED CTA   */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
          {/* Brand: Logo + Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-start bg-white px-3 py-1.5 rounded-xl border border-white/20 shadow-xs transition-transform hover:scale-[1.02] shrink-0"
            >
              <Image
                src={data.brand?.logo || "/logo-bus-mantra.png"}
                alt={data.brand?.name || "Bus Mantra"}
                width={220}
                height={75}
                priority
                className="h-7 sm:h-8 w-auto max-w-36 sm:max-w-40 object-contain object-left"
              />
            </Link>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-snug">
              {data.brand?.description}
            </p>
          </div>

          {/* Actions: Social Icons + Standout Highlighted CTA Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Social Media Links */}
            <div className="flex items-center gap-2">
              {data.socialLinks?.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-primary hover:bg-primary text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs"
                >
                  {renderSocialIcon(social.key)}
                </a>
              ))}
            </div>

            {/* Standout Highlighted Button */}
            <Link
              href={data.partner?.ctaHref || "/vendor"}
              className="inline-flex items-center justify-center gap-2 px-4.5 py-2 sm:py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-primary/25 hover:shadow-primary/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-primary-light/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <Building2 className="w-4 h-4 stroke-[2.2]" />
              <span>{data.partner?.cta || "Register as a Vendor"}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. UNCOMPRESSED FULL-WIDTH 4-COLUMN NAVIGATION            */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 py-6 sm:py-7">
          {/* COLUMN 1: QUICK LINKS */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-3">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {data.quickLinks?.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-primary transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: BUS MANTRA FLEETS */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-3">
              Our Fleet
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {data.fleets?.map((fleet) => (
                <li key={fleet.label}>
                  <Link
                    href={fleet.href}
                    className={`inline-block transition-colors ${
                      fleet.isCta
                        ? "text-primary font-bold hover:underline"
                        : "text-neutral-300 hover:text-primary"
                    }`}
                  >
                    {fleet.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SERVICES */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-3">
              Services
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {data.services?.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className={`inline-block transition-colors ${
                      service.isCta
                        ? "text-primary font-bold hover:underline"
                        : "text-neutral-300 hover:text-primary"
                    }`}
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: DESTINATIONS */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-3">
              Destinations
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {data.destinations?.map((dest) => (
                <li key={dest.label}>
                  <Link
                    href={dest.href}
                    className={`inline-block transition-colors ${
                      dest.isCta
                        ? "text-primary font-bold hover:underline"
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

        {/* ========================================================= */}
        {/* 3. BOTTOM COPYRIGHT & DEVELOPER BAR                       */}
        {/* ========================================================= */}
        <div className="pt-4 sm:pt-5 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-neutral-400 text-center sm:text-left">
          <p>{data.copyright}</p>

          <p className="flex items-center justify-center sm:justify-start gap-1">
            <span>{data.developer?.prefix || "Developed by"}</span>
            <a
              href={data.developer?.href || "https://kanakdrishtiinfo.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-200 hover:text-primary font-semibold transition-colors"
            >
              {data.developer?.name || "Kanak Drishti Infotech Pvt. Ltd."}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
