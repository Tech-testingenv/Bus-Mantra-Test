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
    <footer className="w-full bg-primary border-t border-primary-hover pt-8 sm:pt-10 pb-6 sm:pb-7 text-primary-foreground">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* MAIN FOOTER: BRAND, NAVIGATION & PARTNER CARD             */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-start">
          {/* BRAND COLUMN (3 cols on desktop) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            {/* Logo Badge */}
            <Link
              href="/"
              className="inline-flex items-center justify-start bg-white px-3 py-1.5 rounded-xl border border-white/30 shadow-2xs mb-3"
            >
              <Image
                src={data.brand.logo || "/logo-bus-mantra.png"}
                alt={data.brand.name}
                width={240}
                height={90}
                priority
                className="h-8 sm:h-8.5 w-auto max-w-40 object-contain object-left"
              />
            </Link>

            {/* Description */}
            <p className="text-xs text-white/85 leading-relaxed mb-4 max-w-xs">
              {data.brand.description}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 mt-auto">
              {data.socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-7.5 h-7.5 rounded-full bg-white text-primary hover:bg-white/90 hover:scale-105 flex items-center justify-center transition-all duration-200 shadow-2xs"
                >
                  {renderSocialIcon(social.key)}
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION COLUMNS (6 cols on desktop with proportional sub-columns) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-[1fr_1.35fr_1.35fr_1fr] gap-6 sm:gap-4 xl:gap-6">
            {/* COLUMN 1: QUICK LINKS */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] leading-snug">
                {data.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/85 hover:text-white hover:underline transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: BUS MANTRA FLEETS */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
                Our Fleet
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] leading-snug">
                {data.fleets.map((fleet) => (
                  <li key={fleet.label}>
                    <Link
                      href={fleet.href}
                      className={`inline-flex items-center gap-1 transition-colors ${fleet.isCta
                        ? "text-white font-bold underline hover:text-white/80"
                        : "text-white/85 hover:text-white hover:underline"
                        }`}
                    >
                      <span>{fleet.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: SERVICES */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
                Services
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] leading-snug">
                {data.services.map((service) => (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      className={`inline-flex items-center gap-1 transition-colors ${service.isCta
                        ? "text-white font-bold underline hover:text-white/80"
                        : "text-white/85 hover:text-white hover:underline"
                        }`}
                    >
                      <span>{service.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 4: DESTINATIONS */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
                Destinations
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] leading-snug">
                {data.destinations.map((dest) => (
                  <li key={dest.label}>
                    <Link
                      href={dest.href}
                      className={`inline-flex items-center gap-1 transition-colors ${dest.isCta
                        ? "text-white font-bold underline hover:text-white/80"
                        : "text-white/85 hover:text-white hover:underline"
                        }`}
                    >
                      <span>{dest.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE: PARTNER WITH US CARD (3 cols on desktop, compact & elegant) */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end">
            <div className="w-full max-w-67.5 bg-white border border-white/40 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-md transition-all duration-300 relative overflow-hidden group/card">
              <div className="relative z-10 flex flex-col gap-2.5">
                {/* Heading with Icon */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary-subtle border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Building2 className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  <h3 className="text-sm sm:text-[15px] font-bold text-text-primary tracking-tight">
                    {data.partner.title || "Become A Vendor"}
                  </h3>
                </div>

                {/* Subtext */}
                {data.partner.subtext && (
                  <p className="text-[11px] sm:text-xs text-text-secondary leading-snug">
                    {data.partner.subtext}
                  </p>
                )}

                {/* CTA Button */}
                <Link
                  href={data.partner.ctaHref || "/vendor"}
                  className="w-full py-2.5 px-3.5 mt-0.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-[0.98] group/partner focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <span>{data.partner.cta || "Register as a Vendor"}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover/partner:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM COPYRIGHT & DEVELOPER BAR                          */}
        {/* ========================================================= */}
        <div className="mt-8 sm:mt-10 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/80 text-center sm:text-left">
          {/* Copyright */}
          <p>{data.copyright}</p>

          {/* Developer Credit */}
          <p className="flex items-center justify-center sm:justify-start gap-1">
            <span>{data.developer.prefix}</span>
            <a
              href={data.developer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:underline transition-colors"
            >
              {data.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
