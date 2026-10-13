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
    label: "OVERVIEW",
    title: "Introduction",
    icon: ShieldCheck,
    paragraphs: [
      "Welcome to Bus Mantra. We respect your privacy and are committed to handling personal information responsibly.",
      "This Privacy Policy explains what information may be collected when you visit our website, use our services, contact us, or submit information through our forms. It also describes how that information may be used, disclosed, and protected.",
      "Where consent is required by applicable law, we will seek it before carrying out the relevant processing.",
    ],
  },
  {
    id: "information",
    number: "02",
    label: "DATA COLLECTION",
    title: "Information We Collect",
    icon: Database,
    paragraphs: [
      "The information collected depends on how you interact with Bus Mantra and which services or features you use.",
    ],
    bullets: [
      {
        title: "Personal and contact details",
        description:
          "Your name, email address, phone number, and other contact details that you choose to provide.",
      },
      {
        title: "Travel and booking details",
        description:
          "Journey information, pickup and destination locations, travel dates, passenger details, and related information needed to respond to your request.",
      },
      {
        title: "Vendor and business information",
        description:
          "Business name, operating city, vehicle category, fleet size, and other details provided through vendor enquiries.",
      },
      {
        title: "Technical and usage information",
        description:
          "Information such as browser type, device details, IP address, and website usage data, where collected by our systems or enabled tools.",
      },
    ],
  },
  {
    id: "usage",
    number: "03",
    label: "PURPOSE",
    title: "How We Use Your Information",
    icon: Eye,
    paragraphs: [
      "Where applicable, information may be used to support the operation of our website and the services you request.",
    ],
    bullets: [
      {
        title: "Respond to enquiries",
        description:
          "Answer questions, provide requested information, and communicate about your enquiry.",
      },
      {
        title: "Coordinate services",
        description:
          "Help facilitate requested travel services, bookings, and related support.",
      },
      {
        title: "Evaluate vendor enquiries",
        description:
          "Review business information and communicate about potential partnerships.",
      },
      {
        title: "Maintain our website",
        description:
          "Understand technical issues, maintain functionality, and improve usability where appropriate.",
      },
      {
        title: "Protect our services",
        description:
          "Address misuse, maintain security, and comply with applicable legal obligations.",
      },
    ],
  },
  {
    id: "sharing",
    number: "04",
    label: "DISCLOSURE",
    title: "Sharing of Information",
    icon: UserRound,
    paragraphs: [
      "Personal information may be shared where appropriate for the relevant purpose and permitted by applicable law.",
    ],
    bullets: [
      {
        title: "Service providers",
        description:
          "Providers supporting hosting, communications, payments, analytics, or other operational services, where those providers are actually used.",
      },
      {
        title: "Transport and business partners",
        description:
          "Relevant operators or vendors when sharing is necessary to fulfil a requested booking or service.",
      },
      {
        title: "Legal requirements",
        description:
          "Authorities or other parties when disclosure is required by law or necessary to protect legal rights and safety.",
      },
    ],
  },
  {
    id: "cookies",
    number: "05",
    label: "TECHNOLOGY",
    title: "Cookies and Similar Technologies",
    icon: Cookie,
    paragraphs: [
      "Our website may use cookies or similar technologies to support essential functionality, remember preferences, understand performance, or provide other enabled features.",
      "The specific technologies used depend on the website configuration. You can manage cookies through your browser settings, although blocking certain cookies may affect functionality.",
      "If analytics, advertising, or other non-essential tracking technologies are used, this policy and any applicable consent controls should accurately describe them.",
    ],
  },
  {
    id: "security",
    number: "06",
    label: "PROTECTION",
    title: "Security and Data Retention",
    icon: LockKeyhole,
    paragraphs: [
      "Appropriate technical and organisational safeguards should be used to help protect personal information against unauthorised access, loss, misuse, alteration, or disclosure.",
      "Information should be retained only for as long as necessary for the purposes for which it was collected, subject to applicable legal, contractual, accounting, and operational requirements.",
      "No online service or storage system can be guaranteed to be completely secure. Safeguards should be appropriate to the systems and risks involved.",
    ],
  },
  {
    id: "rights",
    number: "07",
    label: "YOUR RIGHTS",
    title: "Your Privacy Rights",
    icon: Fingerprint,
    paragraphs: [
      "Depending on applicable law and your circumstances, you may have rights concerning your personal information.",
    ],
    bullets: [
      {
        title: "Access and correction",
        description:
          "Request access to certain personal information or ask for inaccurate information to be corrected.",
      },
      {
        title: "Deletion and other requests",
        description:
          "Request deletion or exercise other rights where provided by applicable law.",
      },
      {
        title: "Consent and preferences",
        description:
          "Withdraw consent where processing is based on consent, subject to applicable legal requirements.",
      },
    ],
    footer:
      "We may need to verify your identity before responding to a privacy-related request.",
  },
  {
    id: "third-party",
    number: "08",
    label: "EXTERNAL LINKS",
    title: "Third-Party Websites",
    icon: Globe2,
    paragraphs: [
      "Our website may contain links to external websites or services. Those websites operate under their own privacy policies and practices.",
      "We encourage you to review the privacy policies of external websites before providing personal information. Bus Mantra cannot guarantee the practices of third-party websites it does not control.",
    ],
  },
  {
    id: "children",
    number: "09",
    label: "ELIGIBILITY",
    title: "Children's Privacy",
    icon: ShieldCheck,
    paragraphs: [
      "Our website is not intended to knowingly collect personal information from children where doing so would violate applicable law.",
      "If you believe that a child has provided personal information inappropriately, please contact us so the matter can be reviewed and appropriate steps considered.",
    ],
  },
  {
    id: "changes",
    number: "10",
    label: "UPDATES",
    title: "Changes to This Policy",
    icon: FileText,
    paragraphs: [
      "This Privacy Policy may be updated when our website, services, data practices, or applicable legal requirements change.",
      "When an updated policy is published, the revised date should be shown on this page. Where required by law, additional notice or consent may be necessary for material changes.",
    ],
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
      className={`privacy-reveal ${
        visible ? "privacy-reveal-visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-7 rounded-full bg-[#F47716]" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#19439B]">
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
        className="privacy-policy-card scroll-mt-28 overflow-hidden rounded-2xl border border-[#E2E6ED] bg-white"
      >
        <div className="grid md:grid-cols-[92px_minmax(0,1fr)]">
          <div className="flex items-center justify-between border-b border-[#E8EBF0] bg-[#F7F8FA] px-5 py-4 md:flex-col md:items-start md:justify-start md:border-b-0 md:border-r md:px-6 md:py-7">
            <span className="font-mono text-sm font-medium tracking-wide text-[#19439B]">
              {section.number}
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DFE5F0] bg-white text-[#19439B]">
              <Icon size={19} strokeWidth={1.65} />
            </div>
          </div>

          <div className="min-w-0 p-5 sm:p-7 lg:p-9">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F47716]">
              {section.label}
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-[#1B2433] sm:text-2xl">
              {section.title}
            </h2>

            <div className="mt-5 space-y-4">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="max-w-3xl text-sm leading-7 text-[#626C7B] sm:leading-[1.95]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {section.bullets && (
              <div className="mt-6 divide-y divide-[#E8EBF0] border-y border-[#E8EBF0]">
                {section.bullets.map((bullet) => (
                  <div
                    key={bullet.title}
                    className="grid gap-2 py-4 sm:grid-cols-[minmax(150px,0.65fr)_1.35fr] sm:gap-6"
                  >
                    <h3 className="text-sm font-semibold leading-6 text-[#263145]">
                      {bullet.title}
                    </h3>

                    <p className="text-sm leading-7 text-[#6D7786]">
                      {bullet.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {section.footer && (
              <div className="mt-5 rounded-xl border border-[#F1DDA9] bg-[#FFF9EC] p-4">
                <p className="text-sm leading-7 text-[#705C32]">
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

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (sections.some((section) => section.id === hash)) {
      setActiveSection(hash);
    }

    let ticking = false;

    const updateActiveSection = () => {
      const readingLine = Math.min(window.innerHeight * 0.36, 300);
      let currentId = sections[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const distance = rect.top <= readingLine
          ? Math.abs(readingLine - Math.min(rect.bottom, readingLine))
          : rect.top - readingLine;

        if (rect.top <= readingLine && rect.bottom >= readingLine) {
          currentId = section.id;
          closestDistance = -1;
        } else if (closestDistance !== -1 && distance < closestDistance) {
          closestDistance = distance;
          currentId = section.id;
        }
      });

      setActiveSection((previous) => previous === currentId ? previous : currentId);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
    <main className="privacy-page min-h-screen overflow-clip bg-[#F4F6F9] text-[#202735]">
      <style jsx global>{`
        .privacy-reveal {
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

        .privacy-reveal-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          filter: blur(0);
        }

        .privacy-policy-card {
          box-shadow: 0 2px 5px rgb(20 37 65 / 2%);
          animation: policyCardEnter 650ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .privacy-toc-link {
          transition:
            background-color 240ms ease,
            color 240ms ease,
            transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .privacy-toc-link:hover {
          transform: translateX(3px);
        }

        @keyframes policyCardEnter {
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
          .privacy-reveal,
          .privacy-reveal-visible,
          .privacy-policy-card {
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
      <header className="relative z-30 border-b border-[#E1E5EC] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-14">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm font-semibold text-[#19439B]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#19439B] text-white">
              <ArrowLeft size={17} />
            </span>

            <span>Back to website</span>
          </Link>

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#F47716]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#687386] sm:text-xs">
              Privacy & Security
            </span>
          </div>
        </div>
      </header>

      {/* Page introduction */}
      <section className="relative overflow-hidden border-b border-[#E1E5EC] bg-white">
        <div className="pointer-events-none absolute right-[-70px] top-[-130px] h-[340px] w-[340px] rounded-full border border-[#19439B]/[0.07] sm:right-[3%] sm:top-[-190px] sm:h-[490px] sm:w-[490px]" />

        <div className="pointer-events-none absolute right-[5%] top-[-70px] h-[260px] w-[260px] rounded-full border border-[#19439B]/[0.07] sm:right-[10%] sm:top-[-110px] sm:h-[330px] sm:w-[330px]" />

        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_300px] lg:items-end lg:px-14 lg:py-[76px]">
          <Reveal>
            <SectionLabel>Information & transparency</SectionLabel>

            <h1 className="mt-6 max-w-4xl text-[40px] font-semibold leading-[1.04] tracking-[-0.06em] text-[#152544] sm:text-5xl lg:text-[68px]">
              Your privacy.
              <br />
              <span className="text-[#19439B]">
                Our responsibility.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#677284] sm:text-base sm:leading-8">
              Clear information about how personal information may be
              collected, used, and protected when you interact with
              Bus Mantra.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#7F8998]">
              <span className="inline-flex items-center gap-2">
                <FileText size={15} className="text-[#19439B]" />
                Privacy policy
              </span>

              <span className="h-1 w-1 rounded-full bg-[#F47716]" />

              <span>Last updated: October 13, 2026</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-2xl bg-[#142E60] p-6 text-white sm:p-7">
              <div className="absolute right-[-24px] top-[-24px] h-28 w-28 rounded-full border border-white/10" />
              <div className="absolute right-[-8px] top-[-8px] h-16 w-16 rounded-full border border-white/10" />

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFC20E] text-[#142E60]">
                <LockKeyhole size={21} />
              </div>

              <p className="relative mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFC20E]">
                Your information
              </p>

              <p className="relative mt-3 text-xl font-semibold leading-snug tracking-[-0.025em]">
                Transparency starts with understanding.
              </p>

              <div className="relative mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                <span className="text-xs text-white/60">
                  Explore the policy
                </span>

                <ArrowRight size={19} className="text-[#FFC20E]" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="h-[3px] w-full bg-[#19439B]">
          <div className="h-full w-[24%] rounded-r-full bg-[#FFC20E]" />
        </div>
      </section>

      {/* Mobile section navigator */}
      <div className="sticky top-0 z-40 border-b border-[#DDE3EC] bg-white/95 shadow-sm backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-policy-navigation"
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF2F9] text-sm font-semibold text-[#19439B]">
              {sections[activeIndex].number}
            </span>

            <span className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A93A1]">
                Currently viewing
              </span>

              <span className="mt-1 block truncate text-sm font-semibold text-[#19439B]">
                {sections[activeIndex].title}
              </span>
            </span>
          </span>

          <ChevronRight
            size={18}
            className={`shrink-0 text-[#19439B] ${
              mobileMenuOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>

        {mobileMenuOpen && (
          <nav
            id="mobile-policy-navigation"
            className="max-h-[55vh] overflow-y-auto border-t border-[#E6EAF0] bg-white p-3"
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
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                    active
                      ? "bg-[#EEF2F9] font-semibold text-[#19439B]"
                      : "text-[#626C7B]"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#F47716]">
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
      <div className="mx-auto grid max-w-[1440px] items-start gap-7 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10 lg:px-14 lg:py-14">
        {/* Persistent desktop sidebar */}
        <aside className="hidden self-stretch lg:block">
          <div className="sticky top-6">
            <div className="overflow-hidden rounded-2xl border border-[#E1E5EC] bg-white">
              <div className="border-b border-[#E7EAF0] px-5 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#19439B]">
                  In this document
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
                      className={`privacy-toc-link group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-300 ease-out hover:translate-x-1 ${
                        active
                          ? "bg-[#EEF2F9]"
                          : "bg-white hover:bg-[#F7F8FA]"
                      }`}
                    >
                      {active && (
                        <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[#F47716]" />
                      )}

                      <span
                        className={`w-5 shrink-0 font-mono text-[10px] ${
                          active
                            ? "text-[#19439B]"
                            : "text-[#A0A8B5]"
                        }`}
                      >
                        {section.number}
                      </span>

                      <span
                        className={`min-w-0 flex-1 text-xs ${
                          active
                            ? "font-semibold text-[#19439B]"
                            : "font-medium text-[#626C7B]"
                        }`}
                      >
                        {section.title}
                      </span>

                      {active && (
                        <ChevronRight
                          size={14}
                          className="shrink-0 text-[#F47716]"
                        />
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="border-t border-[#E7EAF0] p-4">
                <div className="rounded-xl bg-[#FFF8E9] p-4">
                  <div className="flex items-center gap-2">
                    <Scale size={16} className="text-[#19439B]" />

                    <span className="text-xs font-semibold text-[#24334D]">
                      Need clarification?
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-6 text-[#776A50]">
                    Contact us if you have questions about this policy.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#19439B]"
                  >
                    Get in touch
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between px-2 text-[10px] text-[#8B94A2]">
              <span>READING PROGRESS</span>

              <span className="font-mono">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(sections.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-[#E2E6ED]">
              <div
                className="h-full rounded-full bg-[#19439B]"
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
            <div className="mb-7 flex items-center justify-between gap-4 border-b border-[#DDE2EA] pb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F47716]">
                  The details
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1C2B46] sm:text-2xl">
                  Privacy policy details
                </h2>
              </div>

              <span className="hidden h-11 w-11 items-center justify-center rounded-xl border border-[#E0E5ED] bg-white text-[#19439B] sm:flex">
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
              className="relative mt-8 scroll-mt-28 overflow-hidden rounded-2xl bg-[#142E60] p-6 text-white sm:p-9 lg:p-11"
            >
              <div className="pointer-events-none absolute right-[-45px] top-[-65px] h-52 w-52 rounded-full border border-white/10" />

              <div className="pointer-events-none absolute right-[-12px] top-[-30px] h-36 w-36 rounded-full border border-white/10" />

              <div className="relative grid gap-7 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFC20E] text-[#142E60]">
                      <Mail size={19} />
                    </span>

                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFC20E]">
                      We are here to help
                    </span>
                  </div>

                  <h2 className="mt-5 max-w-lg text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    Questions about your privacy?
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
                    For privacy-related enquiries, please use the
                    contact details published by Bus Mantra.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-4 rounded-xl bg-[#FFC20E] px-5 text-sm font-semibold text-[#142E60]"
                >
                  Contact Us
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </section>
          </Reveal>

          <div className="flex flex-col gap-3 border-t border-[#DDE2EA] py-7 text-xs text-[#8791A0] sm:flex-row sm:items-center sm:justify-between">
            <p>
              Please check this page periodically for policy updates.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold text-[#19439B]"
            >
              Back to Bus Mantra
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E1E5EC] bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
          <p className="text-xs text-[#8791A0]">
            © {new Date().getFullYear()} Bus Mantra. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="text-xs font-semibold text-[#19439B]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/contact"
              className="text-xs font-medium text-[#6F7988]"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}