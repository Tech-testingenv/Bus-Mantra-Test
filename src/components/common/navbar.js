"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "Fleet", href: "#fleets", targetId: "fleets" },
  { label: "Services", href: "#services", targetId: "services" },
  { label: "How It Works", href: "#how-it-works", targetId: "how-it-works" },
  { label: "About", href: "#about", targetId: "about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen for scroll to apply subtle shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Close drawer if resized to desktop width (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, closeMenu]);

  // Lock page scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Smooth scroll handler for sections
  const scrollToTarget = (e, item) => {
    if (pathname !== "/") {
      closeMenu();
      return;
    }

    if (e) e.preventDefault();
    closeMenu();

    const targetKey = item.targetId || item.href.replace("#", "");
    let targetEl = document.getElementById(targetKey);

    // Dynamic section finder if exact ID not on section
    if (!targetEl) {
      const headings = Array.from(document.querySelectorAll("h2, h3, span"));
      if (targetKey.includes("fleet")) {
        const match = headings.find((h) =>
          h.textContent.toLowerCase().includes("fleet")
        );
        targetEl = match?.closest("section") || match;
      } else if (targetKey.includes("services")) {
        const match = headings.find((h) =>
          h.textContent.toLowerCase().includes("services")
        );
        targetEl = match?.closest("section") || match;
      } else if (targetKey.includes("about")) {
        const match = headings.find((h) =>
          h.textContent.toLowerCase().includes("about bus mantra") ||
          h.textContent.toLowerCase().includes("smart group travel")
        );
        targetEl = match?.closest("section") || match;
      } else if (targetKey.includes("how")) {
        const match = headings.find((h) =>
          h.textContent.toLowerCase().includes("services") ||
          h.textContent.toLowerCase().includes("choose")
        );
        targetEl = match?.closest("section") || match;
      }
    }

    if (targetEl) {
      const navOffset = 76;
      const targetPos =
        targetEl.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: "smooth",
      });
      window.history.pushState(null, "", item.href);
    }
  };

  // Scroll to booking form for "Book a Bus" CTA
  const handleBookBus = (e) => {
    if (pathname !== "/") {
      closeMenu();
      return;
    }

    if (e) e.preventDefault();
    closeMenu();

    const bookingEl =
      document.getElementById("booking-form") ||
      document.querySelector("form");

    if (bookingEl) {
      const navOffset = 80;
      const targetPos =
        bookingEl.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: "smooth",
      });
      const firstInput = bookingEl.querySelector("input, select, button");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 350);
      }
    }
  };

  return (
    <>
      {/* ========================================================= */}
      {/* MAIN NAVBAR (DESKTOP & MOBILE HEADER)                     */}
      {/* ========================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border-b border-neutral-100"
            : "bg-white border-b border-neutral-100/90"
        }`}
      >
        <div
          ref={navRef}
          className="w-full max-w-340 mx-auto px-5 sm:px-7 lg:px-10 h-18 sm:h-20 flex items-center justify-between relative"
        >
          {/* ========================================================= */}
          {/* LEFT: BRAND LOGO                                          */}
          {/* ========================================================= */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                closeMenu();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg select-none shrink-0"
            aria-label="BUS MANTRA - Home"
          >
            {/* Orange BM Rounded Badge */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white font-black text-sm sm:text-base tracking-tight shadow-xs transition-transform duration-200 group-hover:scale-105">
              BM
            </div>
            {/* BUS MANTRA Brand Typography */}
            <span className="text-[17px] sm:text-lg lg:text-[19px] font-black tracking-tight text-neutral-900 group-hover:text-black transition-colors">
              BUS MANTRA
            </span>
          </Link>

          {/* ========================================================= */}
          {/* CENTER: DESKTOP NAVIGATION (>= 1024px)                     */}
          {/* ========================================================= */}
          <nav
            className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-8 xl:gap-11"
            aria-label="Primary Navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToTarget(e, item)}
                className="text-[15px] font-medium text-neutral-700 hover:text-brand-orange transition-colors duration-150 py-1.5 px-0.5 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ========================================================= */}
          {/* RIGHT: DESKTOP CTAS (>= 1024px)                           */}
          {/* ========================================================= */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-3.5 shrink-0">
            {/* Primary Orange Button: Book a Bus → */}
            <Link
              href="#booking-form"
              onClick={handleBookBus}
              className="inline-flex items-center gap-2 px-5.5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm lg:text-[15px] transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.98] select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              <span>Book a Bus</span>
              <span className="text-base font-bold transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>

            {/* Circular User/Account Button */}
            <Link
              href="/login"
              className="w-10 h-10 rounded-full bg-[#9c3409] hover:bg-[#862a05] text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 shrink-0 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
              aria-label="My Account"
            >
              <User className="w-4.5 h-4.5 stroke-[2.4]" />
            </Link>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: MOBILE HAMBURGER BUTTON (< 1024px)                  */}
          {/* ========================================================= */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="lg:hidden w-10 h-10 rounded-xl text-neutral-800 hover:text-brand-orange hover:bg-neutral-100/70 flex items-center justify-center transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            aria-label="Open mobile navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
          >
            <Menu className="w-6 h-6 stroke-[2.3]" />
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE DRAWER — RIGHT TO LEFT SLIDE                       */}
      {/* ========================================================= */}
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-[2px] z-50 lg:hidden transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* 2. Full-Height Drawer */}
      <aside
        id="mobile-nav-drawer"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] sm:max-w-90 h-full bg-white shadow-2xl flex flex-col justify-between lg:hidden transition-transform duration-350 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
      >
        {/* Top: Drawer Header + Links */}
        <div>
          {/* Header: Logo & Close Button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  closeMenu();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  closeMenu();
                }
              }}
              className="flex items-center gap-2.5 focus:outline-none select-none"
              aria-label="BUS MANTRA - Home"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-orange flex items-center justify-center text-white font-black text-sm tracking-tight shadow-xs">
                BM
              </div>
              <span className="text-base font-black tracking-tight text-neutral-900">
                BUS MANTRA
              </span>
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[2.3]" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            className="px-6 py-6 flex flex-col space-y-1"
            aria-label="Mobile Navigation Links"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToTarget(e, item)}
                className="py-3 px-3.5 rounded-xl text-[17px] font-semibold text-neutral-800 hover:text-brand-orange hover:bg-orange-50/70 transition-all flex items-center justify-between group"
              >
                <span>{item.label}</span>
                <span className="text-neutral-400 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all text-sm font-medium">
                  ›
                </span>
              </Link>
            ))}

            {/* Prominent Full-Width Orange Button */}
            <div className="pt-5">
              <Link
                href="#booking-form"
                onClick={handleBookBus}
                className="w-full py-3.5 px-6 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-base flex items-center justify-center gap-2 shadow-sm shadow-orange-500/20 active:scale-[0.99] transition-all select-none group"
              >
                <span>Book a Bus</span>
                <span className="text-base font-bold transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Drawer Bottom Actions: Contact Us & Account */}
        <div className="p-6 border-t border-neutral-100 flex flex-col gap-3 bg-neutral-50/60">
          <Link
            href="/contact"
            onClick={closeMenu}
            className="w-full py-3 px-4 rounded-xl border border-neutral-200 hover:border-brand-orange text-center text-neutral-700 hover:text-brand-orange font-medium text-sm transition-colors bg-white shadow-2xs"
          >
            Contact Us
          </Link>
          <Link
            href="/login"
            onClick={closeMenu}
            className="w-full py-3 px-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 text-center text-neutral-700 font-medium text-sm flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
          >
            <div className="w-5 h-5 rounded-full bg-[#9c3409] text-white flex items-center justify-center">
              <User className="w-3 h-3 stroke-[2.5]" />
            </div>
            <span>Login / My Account</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
