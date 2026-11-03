"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  LockKeyhole,
  Database,
  Eye,
  UserRound,
  Cookie,
  Mail,
  ChevronRight,
  FileText,
  Scale,
  Fingerprint,
  Globe2,
} from "lucide-react";

const sections = [
  {
    id: "introduction",
    number: "01",
    label: "PLEASE READ",
    title: "Introduction",
    icon: FileText,
    paragraphs: [
      "Welcome to Bus Mantra. These Terms and Conditions describe the general rules for accessing and using our website and related services.",
      "By accessing or using this website, you agree to comply with these terms. If you do not agree with them, please discontinue use of the website.",
      "These terms should be read together with any additional conditions shown for a specific service, booking, or feature.",
    ],
  },
  {
    id: "website-use",
    number: "02",
    label: "ACCESS & USE",
    title: "Use of the Website",
    icon: Globe2,
    paragraphs: [
      "You may use the website only for lawful purposes and in a way that does not interfere with other users or the operation of the website.",
    ],
    bullets: [
      { title: "Accurate information", description: "Provide information that is accurate and complete when submitting an enquiry, request, or form, and update it when reasonably necessary." },
      { title: "Responsible use", description: "Do not misuse the website, attempt unauthorised access, introduce malicious code, or disrupt its security or availability." },
      { title: "Compliance", description: "You are responsible for ensuring that your use of the website complies with applicable laws and regulations." },
    ],
  },
  {
    id: "services",
    number: "03",
    label: "OUR SERVICES",
    title: "Service Information and Enquiries",
    icon: ShieldCheck,
    paragraphs: [
      "Bus Mantra may provide information about transport options, travel services, fleet categories, vendors, or related offerings through this website.",
      "Submitting an enquiry or request through the website does not, by itself, guarantee availability, acceptance, a confirmed booking, or a particular outcome. Details should be confirmed through the applicable booking or service process.",
    ],
  },
  {
    id: "bookings",
    number: "04",
    label: "REQUESTS & BOOKINGS",
    title: "Bookings, Changes and Cancellations",
    icon: FileText,
    paragraphs: [
      "Any booking is subject to confirmation and to the specific terms communicated for that booking or service. Please review the details provided before confirming a request.",
    ],
    bullets: [
      { title: "Confirmation", description: "A submitted form or enquiry should not be treated as a confirmed booking unless confirmation is provided through the relevant process." },
      { title: "Changes", description: "Requested changes to dates, routes, passenger details, or other booking information may depend on availability and the applicable service conditions." },
      { title: "Cancellation terms", description: "Cancellation windows, charges, refunds, and other conditions, where applicable, are governed by the terms communicated for the particular booking or service." },
    ],
  },
  {
    id: "payments",
    number: "05",
    label: "FEES & PAYMENTS",
    title: "Pricing and Payments",
    icon: Scale,
    paragraphs: [
      "Prices, quotes, taxes, fees, payment methods, and payment schedules, where applicable, should be reviewed in the information provided for the specific service or booking.",
      "A quote may depend on the route, travel date, duration, vehicle type, availability, and other details supplied. Any applicable additional charges should be clarified before confirmation.",
      "Do not submit payment information through channels that are not presented or confirmed as authorised by Bus Mantra.",
    ],
  },
  {
    id: "vendors",
    number: "06",
    label: "THIRD-PARTY PROVIDERS",
    title: "Vendors and Service Partners",
    icon: UserRound,
    paragraphs: [
      "Some services may involve transport operators, vendors, or other independent service partners. Their participation, availability, and responsibilities may be subject to separate terms or arrangements.",
      "Where a third party is involved, the applicable booking information should explain the relevant service provider and any terms that apply. Bus Mantra does not make guarantees about third-party services beyond commitments expressly confirmed for the relevant transaction.",
    ],
  },
  {
    id: "intellectual-property",
    number: "07",
    label: "CONTENT & OWNERSHIP",
    title: "Intellectual Property",
    icon: LockKeyhole,
    paragraphs: [
      "Unless otherwise stated, website text, branding, graphics, design elements, and other content are owned by or used with permission by their respective rights holders.",
      "You may view and use website content for personal, lawful, and informational purposes. You must not copy, republish, modify, distribute, sell, or commercially exploit content without prior permission, except where the law allows it.",
    ],
  },
  {
    id: "liability",
    number: "08",
    label: "RESPONSIBILITY",
    title: "Disclaimers and Limitation of Liability",
    icon: ShieldCheck,
    paragraphs: [
      "We aim to keep website information useful and up to date, but information may be incomplete, change over time, or contain errors. Details should be confirmed before you rely on them for a travel or booking decision.",
      "To the extent permitted by applicable law, Bus Mantra is not responsible for indirect or consequential loss arising from use of, or inability to use, the website. Nothing in these terms excludes liability that cannot lawfully be excluded.",
      "These terms do not replace any specific written commitment or mandatory consumer right that applies to a particular service.",
    ],
  },
  {
    id: "privacy",
    number: "09",
    label: "YOUR INFORMATION",
    title: "Privacy and External Links",
    icon: Fingerprint,
    paragraphs: [
      "The handling of personal information is described in our Privacy Policy, which should be read together with these Terms and Conditions.",
      "Our website may link to third-party websites or services. Those websites may operate under their own terms and privacy practices, and you should review them before using those services.",
    ],
  },
  {
    id: "changes-law",
    number: "10",
    label: "UPDATES & CONTACT",
    title: "Changes, Governing Law and Contact",
    icon: Mail,
    paragraphs: [
      "We may update these Terms and Conditions when our website, services, or applicable requirements change. Updated terms will be published on this page, together with a revised date where appropriate. Continued use of the website after changes are published means you should review the updated terms.",
      "These terms are subject to applicable laws and the jurisdiction of competent courts, without limiting any mandatory rights that apply to you under law.",
      "If you have questions about these terms, please contact Bus Mantra through the contact details or enquiry form provided on our website.",
    ],
    footer: "Please review any service-specific conditions provided with your enquiry or booking before proceeding.",
  },
];

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  return reducedMotion;
}

/* Reveals complete panels, not individual text elements. */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -45px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`terms-reveal ${
        visible ? "terms-reveal-visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-0.5 w-7 rounded-full bg-primary" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
        {children}
      </span>
    </div>
  );
}

function PolicySection({ section, index }) {
  const Icon = section.icon;

  return (
    <Reveal delay={Math.min(index * 45, 180)}>
      <section
        id={section.id}
        className="terms-policy-card scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-surface"
      >
        <div className="grid md:grid-cols-[92px_minmax(0,1fr)]">
          <div className="flex items-center justify-between border-b border-border bg-surface-secondary px-5 py-4 md:flex-col md:items-start md:justify-start md:border-b-0 md:border-r md:px-6 md:py-7">
            <span className="font-mono text-sm font-medium tracking-wide text-primary">
              {section.number}
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-primary">
              <Icon size={19} strokeWidth={1.65} />
            </div>
          </div>

          <div className="min-w-0 p-5 sm:p-7 lg:p-9">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
              {section.label}
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-text-primary sm:text-2xl">
              {section.title}
            </h2>

            <div className="mt-5 space-y-4">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="max-w-3xl text-sm leading-7 text-text-secondary sm:leading-[1.95]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {section.bullets && (
              <div className="mt-6 divide-y divide-border border-y border-border">
                {section.bullets.map((bullet) => (
                  <div
                    key={bullet.title}
                    className="grid gap-2 py-4 sm:grid-cols-[minmax(150px,0.65fr)_1.35fr] sm:gap-6"
                  >
                    <h3 className="text-sm font-semibold leading-6 text-text-primary">
                      {bullet.title}
                    </h3>

                    <p className="text-sm leading-7 text-text-secondary">
                      {bullet.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {section.footer && (
              <div className="mt-5 rounded-xl border border-primary/20 bg-primary-subtle p-4">
                <p className="text-sm leading-7 text-text-primary">
                  {section.footer}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const validIds = sections.map((section) => section.id);
    const hash = window.location.hash.replace("#", "");

    if (validIds.includes(hash)) {
      setActiveSection(hash);
    }

    let ticking = false;

    const updateActiveSection = () => {
      // Keep the sidebar synced to the section currently being read.
      // A section is active when it crosses the reading line near the top
      // of the visible content, rather than when its bottom is closest.
      const readingLine = Math.min(window.innerHeight * 0.32, 260);
      let currentId = sections[0].id;
      let lastSectionAboveLine = null;
      let sectionAtReadingLine = null;
      let nearestBelowLine = null;
      let nearestBelowDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= readingLine) {
          lastSectionAboveLine = section.id;
        }

        if (rect.top <= readingLine && rect.bottom > readingLine) {
          sectionAtReadingLine = section.id;
        }

        if (rect.top > readingLine && rect.top - readingLine < nearestBelowDistance) {
          nearestBelowDistance = rect.top - readingLine;
          nearestBelowLine = section.id;
        }
      });

      if (sectionAtReadingLine) {
        currentId = sectionAtReadingLine;
      } else if (lastSectionAboveLine) {
        currentId = lastSectionAboveLine;
      } else if (nearestBelowLine) {
        currentId = nearestBelowLine;
      }

      setActiveSection((previous) => previous === currentId ? previous : currentId);
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeSection)
  );

  function navigateToSection(event, id) {
    event.preventDefault();

    const target = document.getElementById(id);

    if (!target) return;

    setActiveSection(id);
    setMobileMenuOpen(false);

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <main className="terms-page min-h-screen overflow-clip bg-surface-secondary text-text-primary">
      <style jsx global>{`
        .terms-reveal {
          opacity: 0;
          transform: translate3d(0, 34px, 0) scale(0.985);
          filter: blur(3px);
          transition:
            opacity 750ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 850ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 750ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--reveal-delay, 0ms);
          will-change: opacity, transform, filter;
        }

        .terms-reveal-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          filter: blur(0);
        }

        .terms-policy-card {
          box-shadow: 0 2px 5px rgb(0 0 0 / 3%);
          animation: termsCardEnter 650ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .terms-toc-link {
          transition:
            background-color 240ms ease,
            color 240ms ease,
            transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .terms-toc-link:hover {
          transform: translateX(3px);
        }

        @keyframes termsCardEnter {
          from {
            opacity: 0.65;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .terms-reveal,
          .terms-reveal-visible,
          .terms-policy-card {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
            animation: none;
          }

          html {
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* Top navigation */}
      <header className="relative z-30 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-360 items-center justify-between px-5 py-4 sm:px-8 lg:px-14">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm font-semibold text-text-primary hover:text-primary transition-colors"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ArrowLeft size={17} />
            </span>

            <span>Back to website</span>
          </Link>

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted sm:text-xs">
              Terms & Conditions
            </span>
          </div>
        </div>
      </header>

      {/* Page introduction */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="pointer-events-none absolute -right-17.5 -top-32.5 h-85 w-85 rounded-full border border-primary/10 sm:right-[3%] sm:-top-47.5 sm:h-122.5 sm:w-122.5" />

        <div className="pointer-events-none absolute right-[5%] -top-17.5 h-65 w-65 rounded-full border border-primary/10 sm:right-[10%] sm:-top-27.5 sm:h-82.5 sm:w-82.5" />

        <div className="relative mx-auto grid max-w-360 gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_300px] lg:items-end lg:px-14 lg:py-19">
          <Reveal>
            <SectionLabel>Clear terms for using our services</SectionLabel>

            <h1 className="mt-6 max-w-4xl text-[40px] font-semibold leading-[1.04] tracking-[-0.06em] text-text-primary sm:text-5xl lg:text-[68px]">
              Clear terms.
              <br />
              <span className="text-primary">
                Confident journeys.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              Please review the terms that apply when you access our website, submit an enquiry, or use Bus Mantra services.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-text-muted">
              <span className="inline-flex items-center gap-2">
                <FileText size={15} className="text-primary" />
                Terms and conditions
              </span>

              <span className="h-1 w-1 rounded-full bg-primary" />

              <span>Last updated: October 13, 2026</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-2xl bg-surface-inverse p-6 text-text-inverse sm:p-7">
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-white/10" />
              <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full border border-white/10" />

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <LockKeyhole size={21} />
              </div>

              <p className="relative mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                Your agreement
              </p>

              <p className="relative mt-3 text-xl font-semibold leading-snug tracking-tight">
                Good journeys start with clear expectations.
              </p>

              <div className="relative mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                <span className="text-xs text-white/60">
                  Explore the terms
                </span>

                <ArrowRight size={19} className="text-primary" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="h-0.75 w-full bg-border">
          <div className="h-full w-[24%] rounded-r-full bg-primary" />
        </div>
      </section>

      {/* Mobile section navigator */}
      <div className="sticky top-0 z-40 border-b border-border bg-surface/95 shadow-sm backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-policy-navigation"
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
              {sections[activeIndex].number}
            </span>

            <span className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-text-muted">
                Currently viewing
              </span>

              <span className="mt-1 block truncate text-sm font-semibold text-text-primary">
                {sections[activeIndex].title}
              </span>
            </span>
          </span>

          <ChevronRight
            size={18}
            className={`shrink-0 text-text-muted transition-transform ${
              mobileMenuOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>

        {mobileMenuOpen && (
          <nav
            id="mobile-policy-navigation"
            className="max-h-[55vh] overflow-y-auto border-t border-border bg-surface p-3"
          >
            {sections.map((section) => {
              const active = activeSection === section.id;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(event) =>
                    navigateToSection(event, section.id)
                  }
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                    active
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                  }`}
                >
                  <span className="font-mono text-[10px] text-primary">
                    {section.number}
                  </span>

                  {section.title}

                  {active && (
                    <ChevronRight size={15} className="ml-auto" />
                  )}
                </a>
              );
            })}
          </nav>
        )}
      </div>

      {/* Main layout */}
      <div className="mx-auto grid max-w-360 items-start gap-7 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10 lg:px-14 lg:py-14">
        {/* Persistent desktop sidebar */}
        <aside className="hidden self-stretch lg:block">
          <div className="sticky top-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="border-b border-border px-5 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-primary">
                  In this document
                </p>

                <p className="mt-2 text-xs leading-5 text-text-muted">
                  Jump to any section.
                </p>
              </div>

              <nav className="p-3">
                {sections.map((section) => {
                  const active = activeSection === section.id;

                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(event) =>
                        navigateToSection(event, section.id)
                      }
                      aria-current={active ? "location" : undefined}
                      className={`terms-toc-link group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-300 ease-out hover:translate-x-1 ${
                        active
                          ? "bg-primary/10"
                          : "bg-surface hover:bg-surface-secondary"
                      }`}
                    >
                      {active && (
                        <span className="absolute bottom-2 left-0 top-2 w-0.75 rounded-r-full bg-primary" />
                      )}

                      <span
                        className={`w-5 shrink-0 font-mono text-[10px] ${
                          active
                            ? "text-primary"
                            : "text-text-muted"
                        }`}
                      >
                        {section.number}
                      </span>

                      <span
                        className={`min-w-0 flex-1 text-xs ${
                          active
                            ? "font-semibold text-primary"
                            : "font-medium text-text-secondary"
                        }`}
                      >
                        {section.title}
                      </span>

                      {active && (
                        <ChevronRight
                          size={14}
                          className="shrink-0 text-primary"
                        />
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="border-t border-border p-4">
                <div className="rounded-xl bg-primary-subtle p-4">
                  <div className="flex items-center gap-2">
                    <Scale size={16} className="text-primary" />

                    <span className="text-xs font-semibold text-text-primary">
                      Need clarification?
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-6 text-text-secondary">
                    Contact us if you have questions about these terms.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                  >
                    Get in touch
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between px-2 text-[10px] text-text-muted">
              <span>READING PROGRESS</span>

              <span className="font-mono">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(sections.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-2 h-0.75 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${((activeIndex + 1) / sections.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </aside>

        {/* Legal document */}
        <div className="min-w-0 space-y-5">
          <Reveal>
            <div className="mb-7 flex items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  The details
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-text-primary sm:text-2xl">
                  Terms and conditions details
                </h2>
              </div>

              <span className="hidden h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-primary sm:flex">
                <FileText size={19} />
              </span>
            </div>
          </Reveal>

          {sections.map((section, index) => (
            <PolicySection
              key={section.id}
              section={section}
              index={index}
            />
          ))}

          {/* Contact panel */}
          <Reveal delay={100}>
            <section
              id="contact"
              className="relative mt-8 scroll-mt-28 overflow-hidden rounded-2xl bg-surface-inverse p-6 text-text-inverse sm:p-9 lg:p-11"
            >
              <div className="pointer-events-none absolute -right-11.25 -top-16.25 h-52 w-52 rounded-full border border-white/10" />

              <div className="pointer-events-none absolute -right-3 -top-7.5 h-36 w-36 rounded-full border border-white/10" />

              <div className="relative grid gap-7 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Mail size={19} />
                    </span>

                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                      We are here to help
                    </span>
                  </div>

                  <h2 className="mt-5 max-w-lg text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    Questions about these terms?
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
                    For questions about these terms or our services, please contact Bus Mantra using the details provided on this website.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-4 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
                >
                  Contact Us
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </section>
          </Reveal>

          <div className="flex flex-col gap-3 border-t border-border py-7 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              Please check this page periodically for updates to these terms.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              Back to Bus Mantra
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}