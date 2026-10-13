import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowRight, Check, Building2 } from "lucide-react";
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
    <footer className="w-full bg-[#fbf9f6] border-t border-neutral-200/80 pt-12 sm:pt-16 pb-8 text-brand-dark">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* 1. TOP BRAND & CONTACT AREA                               */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 sm:pb-10 border-b border-neutral-200/80">
          {/* Brand Left Column */}
          <div className="max-w-xl">
            {/* Logo & Tagline */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
              <Link href="/" className="inline-block shrink-0">
                <Image
                  src={data.brand.logo || "/logo-bus-mantra.jpeg"}
                  alt={data.brand.name}
                  width={155}
                  height={44}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <div className="hidden sm:block w-px h-6 bg-neutral-300" />
              <span className="text-[11px] font-bold text-brand-orange tracking-widest uppercase bg-orange-50 border border-brand-orange/20 px-2.5 py-0.5 rounded-md self-start sm:self-auto">
                {data.brand.tagline}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed mb-5">
              {data.brand.description}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5">
              {data.socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-white border border-neutral-200/90 text-brand-dark hover:text-white hover:bg-brand-orange hover:border-brand-orange flex items-center justify-center transition-all duration-200 shadow-2xs"
                >
                  {renderSocialIcon(social.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Right Column: Rounded Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:self-start lg:mt-2">
            {/* Phone Pill */}
            <a
              href={data.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-neutral-200/90 hover:border-brand-orange hover:text-brand-orange text-brand-dark text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-xs transition-all duration-200 group"
            >
              <div className="w-7 h-7 rounded-full bg-orange-50 group-hover:bg-brand-orange flex items-center justify-center transition-colors">
                <Phone className="w-3.5 h-3.5 text-brand-orange group-hover:text-white transition-colors" />
              </div>
              <span>{data.contact.phone}</span>
            </a>

            {/* Email Pill */}
            <a
              href={data.contact.emailHref}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-neutral-200/90 hover:border-brand-orange hover:text-brand-orange text-brand-dark text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-xs transition-all duration-200 group"
            >
              <div className="w-7 h-7 rounded-full bg-orange-50 group-hover:bg-brand-orange flex items-center justify-center transition-colors">
                <Mail className="w-3.5 h-3.5 text-brand-orange group-hover:text-white transition-colors" />
              </div>
              <span>{data.contact.email}</span>
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MAIN FOOTER NAVIGATION & PARTNER CARD                  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pt-10 sm:pt-12">
          {/* NAVIGATION COLUMNS (8 cols on desktop) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {/* COLUMN 1: QUICK LINKS */}
            <div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {data.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-brand-gray hover:text-brand-orange transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: BUS MANTRA FLEETS */}
            <div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-4">
                Our Fleet
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {data.fleets.map((fleet) => (
                  <li key={fleet.label}>
                    <Link
                      href={fleet.href}
                      className={`inline-flex items-center gap-1 transition-colors ${fleet.isCta
                        ? "text-brand-orange font-semibold hover:text-brand-orange-hover"
                        : "text-brand-gray hover:text-brand-orange"
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
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-4">
                Services
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {data.services.map((service) => (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      className={`inline-flex items-center gap-1 transition-colors ${service.isCta
                        ? "text-brand-orange font-semibold hover:text-brand-orange-hover"
                        : "text-brand-gray hover:text-brand-orange"
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
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-4">
                Destinations
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {data.destinations.map((dest) => (
                  <li key={dest.label}>
                    <Link
                      href={dest.href}
                      className={`inline-flex items-center gap-1 transition-colors ${dest.isCta
                        ? "text-brand-orange font-semibold hover:text-brand-orange-hover"
                        : "text-brand-gray hover:text-brand-orange"
                        }`}
                    >
                      <span>{dest.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE: PARTNER WITH US CARD (4 cols on desktop) */}
          <div className="lg:col-span-4">
            <div className="bg-[#fffdfa] border border-brand-orange/30 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden">
              {/* Subtle Ambient Decorative Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-xl pointer-events-none" />

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-orange uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>{data.partner.eyebrow}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-2">
                {data.partner.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-brand-gray leading-relaxed mb-4">
                {data.partner.description}
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-2 mb-5">
                {data.partner.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-brand-dark">
                    <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-brand-orange stroke-3" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={data.partner.ctaHref || "#partner"}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all duration-200 group/partner focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <span>{data.partner.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover/partner:translate-x-1" />
              </Link>

              {/* Small Supporting Text */}
              <p className="text-[11px] text-center text-brand-gray mt-2">
                {data.partner.subtext}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM COPYRIGHT & DEVELOPER BAR                       */}
        {/* ========================================================= */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-gray text-center sm:text-left">
          {/* Copyright */}
          <p>{data.copyright}</p>

          {/* Developer Credit */}
          <p>
            <span>{data.developer.prefix} </span>
            <a
              href={data.developer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange font-semibold hover:underline"
            >
              {data.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
