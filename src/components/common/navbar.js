"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Bus Mantra Fleet", href: "/fleets" },
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const navRef = useRef(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle navbar scroll appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu using Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, closeMenu]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Check active navigation item
  const isItemActive = (href) => {
    if (!pathname) return false;

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Navigation click handler
  const handleNavClick = (event, item) => {
    closeMenu();

    if (item.href === "/" && pathname === "/") {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* ===================================================== */}
      {/* MAIN NAVBAR                                           */}
      {/* ===================================================== */}

      <header
        className={`fixed inset-x-0 top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "border-b border-neutral-100 bg-white/95 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md"
            : "border-b border-neutral-100/90 bg-white"
        }`}
      >
        <div
          ref={navRef}
          className="relative mx-auto flex h-19 w-full max-w-360 items-center justify-between px-4 sm:h-21 sm:px-7 lg:px-10"
        >
          {/* ================================================= */}
          {/* LEFT: BRAND LOGO                                  */}
          {/* ================================================= */}

          <Link
            href="/"
            onClick={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                closeMenu();

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
            }}
            className="group flex shrink-0 select-none items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            aria-label="Bus Mantra Home"
          >
            {/* Larger desktop and mobile logo */}
            <div className="relative h-14 w-37.5 shrink-0 sm:h-16.5 sm:w-45 lg:h-17.5 lg:w-48.75">
              <Image
                src="/logo-bus-mantra.jpeg"
                alt="Bus Mantra Logo"
                width={390}
                height={140}
                priority
                quality={100}
                sizes="(max-width: 640px) 150px, (max-width: 1023px) 180px, 195px"
                className="h-full w-full object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* ================================================= */}
          {/* CENTER: DESKTOP NAVIGATION                        */}
          {/* ================================================= */}

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-10"
            aria-label="Primary Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item)}
                  aria-current={active ? "page" : undefined}
                  className={`relative select-none rounded-sm px-0.5 py-1.5 text-[14px] transition-colors duration-150 xl:text-[15px] ${
                    active
                      ? "font-semibold text-primary"
                      : "font-medium text-neutral-700 hover:text-primary"
                  }`}
                >
                  <span>{item.label}</span>

                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ================================================= */}
          {/* RIGHT: DESKTOP BUTTONS                            */}
          {/* ================================================= */}

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex xl:gap-3">
            {/* Book a Bus */}
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:bg-primary-hover hover:shadow-md active:scale-[0.98] xl:px-5"
            >
              Contact Us
            </Link>

            {/* Sign In */}
            <Link
              href="/login"
              aria-label="Sign in to your account"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* ================================================= */}
          {/* MOBILE MENU BUTTON                                */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-800 transition-colors hover:bg-neutral-100 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring lg:hidden"
            aria-label="Open mobile navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
          >
            <Menu className="h-6 w-6" strokeWidth={2.3} />
          </button>
        </div>
      </header>

      {/* ===================================================== */}
      {/* MOBILE DRAWER BACKDROP                               */}
      {/* ===================================================== */}

      <div
        className={`fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ===================================================== */}
      {/* MOBILE NAVIGATION DRAWER                             */}
      {/* ===================================================== */}

      <aside
        id="mobile-nav-drawer"
        className={`fixed bottom-0 right-0 top-0 z-50 flex h-full w-full max-w-85 flex-col justify-between bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        {/* Drawer header and links */}
        <div>
          {/* Mobile drawer header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <Link
              href="/"
              onClick={(event) => {
                if (pathname === "/") {
                  event.preventDefault();
                  closeMenu();

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                } else {
                  closeMenu();
                }
              }}
              className="flex shrink-0 items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              aria-label="Bus Mantra Home"
            >
              {/* Same logo in the mobile drawer */}
              <div className="relative h-13.5 w-38.75 shrink-0">
                <Image
                  src="/logo-bus-mantra.jpeg"
                  alt="Bus Mantra Logo"
                  width={310}
                  height={110}
                  priority
                  quality={100}
                  sizes="155px"
                  className="h-full w-full object-contain object-left"
                />
              </div>
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={2.3} />
            </button>
          </div>

          {/* Mobile navigation links */}
          <nav
            className="flex flex-col space-y-1 px-5 py-6"
            aria-label="Mobile Navigation Links"
          >
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item)}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center justify-between rounded-xl px-3.5 py-3.5 text-[16px] transition-colors ${
                    active
                      ? "bg-primary-subtle font-bold text-primary"
                      : "font-semibold text-neutral-800 hover:bg-primary-subtle/70 hover:text-primary"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {active && (
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 shrink-0 rounded-full bg-primary"
                      />
                    )}

                    <span>{item.label}</span>
                  </span>

                  <span
                    className={`text-lg transition-transform group-hover:translate-x-0.5 ${
                      active
                        ? "font-semibold text-primary"
                        : "text-neutral-400 group-hover:text-primary"
                    }`}
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </Link>
              );
            })}

            {/* Mobile Book a Bus button */}
            <div className="pt-5">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover active:scale-[0.99]"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>

        {/* Drawer bottom actions */}
        <div className="flex flex-col gap-3 border-t border-neutral-100 bg-neutral-50/60 p-5">
          <Link
            href="/contact"
            onClick={closeMenu}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-center text-sm font-medium text-neutral-700 transition-colors hover:border-primary hover:text-primary"
          >
            Contact Us
          </Link>

          <Link
            href="/login"
            onClick={closeMenu}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300"
          >
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
        </div>
      </aside>
    </>
  );
}