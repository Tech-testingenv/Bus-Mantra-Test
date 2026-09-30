"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Fleets", href: "/fleets" },
  { label: "Destinations", href: "/destinations" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  // Close menu if viewport is resized to desktop width (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, closeMenu]);

  // Prevent awkward page scroll while mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div ref={navRef} className="relative max-w-8xl mx-auto pointer-events-auto">
        {/* Main Floating Navbar Pill */}
        <div className="bg-brand-surface/85 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-5 sm:px-7 py-3 sm:py-3.5 flex items-center justify-between border border-brand-border/40 transition-all duration-200">
          {/* BUS MANTRA Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center shrink-0 select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg"
            aria-label="Bus Mantra - Home"
          >
            <Image
              src="/logo.png"
              alt="Bus Mantra - Your Group. Your Bus. Your Journey."
              width={158}
              height={60}
              priority
              className="h-8 sm:h-9 lg:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links (>= 1024px) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2.5"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/" && (pathname === "" || pathname === "/"));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-all duration-200 text-sm lg:text-[15px] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${isActive
                    ? "px-5 py-2 rounded-full bg-brand-orange text-brand-white shadow-sm"
                    : "px-3.5 py-2 rounded-full text-brand-gray hover:text-brand-orange"
                    }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons (Contact Us & Login) */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 xl:px-6 py-2 xl:py-2.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-white font-medium text-sm lg:text-[15px] shadow-sm transition-all duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="px-4 xl:px-5 py-2 xl:py-2.5 rounded-full border border-brand-orange text-brand-orange hover:bg-brand-orange/5 font-medium text-sm lg:text-[15px] flex items-center gap-2 transition-all duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              <User className="w-3 h-3 stroke-[2.5]" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile / Tablet Menu Button (< 1024px) */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-white flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 stroke-[2.5] transition-transform duration-200" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.5] transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Mobile Menu Panel (Conditionally rendered absolute overlay) */}
        {isOpen && (
          <>
            {/* Soft Backdrop Blur on Page when Mobile Menu is Open */}
            <div
              className="fixed inset-0 bg-brand-dark/20 backdrop-blur-xs lg:hidden pointer-events-auto -z-10 transition-opacity duration-200"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div
              id="mobile-navigation-menu"
              className="lg:hidden absolute top-full right-0 mt-3 sm:mt-4 w-full max-w-[320px] sm:max-w-90 z-50"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              <div className="bg-brand-surface/90 backdrop-blur-xl rounded-[28px] sm:rounded-4xl shadow-[0_20px_45px_-12px_rgba(0,0,0,0.15)] border border-brand-border/60 p-6 sm:p-7 flex flex-col">
                {/* Vertical Navigation Links */}
                <nav className="flex flex-col space-y-2" aria-label="Mobile Links">
                  {NAV_ITEMS.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href === "/" && (pathname === "" || pathname === "/"));

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeMenu}
                        className={`w-full text-left font-medium text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${isActive
                          ? "px-5 py-3 rounded-full bg-brand-orange text-brand-white shadow-sm"
                          : "px-5 py-2.5 rounded-full text-brand-gray hover:text-brand-orange"
                          }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Generous spacing before bottom buttons matching reference screenshot */}
                <div className="min-h-82.5 sm:min-h-42.5" aria-hidden="true" />

                {/* Bottom Actions: Contact Us & Login */}
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="w-full py-3.5 px-6 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-white font-medium text-base text-center shadow-sm transition-all duration-200 active:scale-[0.99] block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="w-full py-3.5 px-6 rounded-full bg-brand-white border border-brand-orange text-brand-orange hover:bg-brand-orange/5 font-medium text-base text-center transition-all duration-200 active:scale-[0.99] block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
