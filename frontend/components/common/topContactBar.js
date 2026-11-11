"use client";

import { Phone, Mail } from "lucide-react";
import { topContactData, footerData } from "@/data/data";

export default function TopContactBar({
  contact = topContactData || footerData.contact,
}) {
  const phone = contact?.phone || "+91 9876543210";
  const phoneHref = contact?.phoneHref || "tel:+919876543210";
  const email = contact?.email || "charter@busmantra.in";
  const emailHref = contact?.emailHref || "mailto:charter@busmantra.in";
  const supportText =
    contact?.supportText || "24/7 Group Charter Booking Assistance";

  return (
    <div
      className="w-full border-b border-neutral-800 bg-surface-inverse text-neutral-300 text-xs select-none"
      role="region"
      aria-label="Contact Information Bar"
    >
      <div className="mx-auto flex min-h-8 sm:h-9 w-full max-w-360 flex-wrap items-center justify-between px-4 sm:px-7 lg:px-10 py-1.5 sm:py-0 gap-y-1">
        {/* Left Side: Phone & Email with icons */}
        <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-1">
          {/* Phone */}
          <a
            href={phoneHref}
            className="group inline-flex items-center gap-1.5 sm:gap-2 text-neutral-200 transition-colors hover:text-white"
            aria-label={`Call Bus Mantra at ${phone}`}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.4]" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-tight sm:tracking-normal group-hover:text-white">
              {phone}
            </span>
          </a>

          {/* Divider on larger screens */}
          <span
            className="hidden sm:inline-block text-neutral-700 select-none text-[10px]"
            aria-hidden="true"
          >
            •
          </span>

          {/* Email */}
          <a
            href={emailHref}
            className="group inline-flex items-center gap-1.5 sm:gap-2 text-neutral-300 transition-colors hover:text-white"
            aria-label={`Email Bus Mantra at ${email}`}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.4]" />
            </span>
            <span className="text-[11px] sm:text-xs font-medium tracking-tight sm:tracking-normal group-hover:text-white">
              {email}
            </span>
          </a>
        </div>

        {/* Right Side: 24/7 Availability badge on desktop */}
        <div className="hidden md:flex items-center gap-2 text-neutral-400 text-[11px] font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{supportText}</span>
        </div>
      </div>
    </div>
  );
}
