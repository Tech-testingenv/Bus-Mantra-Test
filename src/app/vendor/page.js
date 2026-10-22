"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Handshake,
  ShieldCheck,
  TrendingUp,
  Headset,
  MapPin,
} from "lucide-react";

const benefits = [
  {
    number: "01",
    icon: TrendingUp,
    title: "Reach More Customers",
    description:
      "Showcase your transport services to people exploring bus rentals, group travel, and transportation options through our website.",
  },
  {
    number: "02",
    icon: Handshake,
    title: "Connect With Potential Clients",
    description:
      "Create opportunities to connect with customers looking for vehicles and transport services that match your business.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Showcase Your Fleet",
    description:
      "Share your vehicle categories, fleet size, and business details so your transport offerings can be understood more clearly.",
  },
  {
    number: "04",
    icon: Headset,
    title: "Explore Partnership Opportunities",
    description:
      "Submit your business information to Bus Mantra and discuss potential collaboration based on your services and requirements.",
  },
];

const vehicleTypes = [
  "AC Seater",
  "Non-AC Seater",
  "Sleeper",
  "AC Sleeper",
  "Tempo Traveller",
  "Other",
];

const fleetSizes = [
  { value: "1", label: "1 vehicle" },
  { value: "2-5", label: "2 to 5 vehicles" },
  { value: "6-10", label: "6 to 10 vehicles" },
  { value: "11-25", label: "11 to 25 vehicles" },
  { value: "26-50", label: "26 to 50 vehicles" },
  { value: "50+", label: "More than 50 vehicles" },
];

const initialForm = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  city: "",
  vehicleType: "",
  fleetSize: "",
  message: "",
};

function Reveal({ children, className = "", delay = 0, animation = "rise" }) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const hiddenAnimations = {
    rise: "vendor-hidden-rise",
    slide: "vendor-hidden-slide",
    scale: "vendor-hidden-scale",
    wipe: "vendor-hidden-wipe",
  };

  return (
    <div
      ref={elementRef}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`${visible ? `vendor-visible vendor-${animation}` : hiddenAnimations[animation]} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-0.75 w-8 rounded-full ${
          light ? "bg-primary" : "bg-primary"
        }`}
      />

      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.19em] ${
          light ? "text-primary" : "text-primary"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

export default function VendorPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-text-primary outline-none placeholder:text-text-muted hover:border-primary focus:border-primary focus:ring-2 focus:ring-focus-ring/15";

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Frontend demonstration only.
    // No information is sent or saved.
    setSubmitted(true);
  }

  function handleReset() {
    setForm(initialForm);
    setSubmitted(false);
  }

  return (
    <main className="vendor-page overflow-hidden bg-white text-text-primary">
      <style jsx global>{`
        @keyframes vendorFadeRise {
          from {
            opacity: 0;
            transform: translate3d(0, 32px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes vendorSlideIn {
          from {
            opacity: 0;
            transform: translate3d(35px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes vendorScaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes vendorWipeIn {
          from {
            opacity: 0;
            clip-path: inset(0 0 100% 0);
          }
          to {
            opacity: 1;
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes vendorLineDraw {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .vendor-hidden-rise,
        .vendor-hidden-slide,
        .vendor-hidden-scale,
        .vendor-hidden-wipe {
          opacity: 0;
          visibility: hidden;
        }

        .vendor-visible {
          opacity: 1;
          visibility: visible;
          animation-duration: 750ms;
          animation-timing-function: cubic-bezier(0.2, 0.75, 0.25, 1);
          animation-fill-mode: both;
          animation-delay: var(--reveal-delay, 0ms);
        }

        .vendor-rise {
          animation-name: vendorFadeRise;
        }

        .vendor-slide {
          animation-name: vendorSlideIn;
          animation-duration: 850ms;
        }

        .vendor-scale {
          animation-name: vendorScaleIn;
        }

        .vendor-wipe {
          animation-name: vendorWipeIn;
          animation-duration: 800ms;
        }

        .vendor-line-draw {
          transform-origin: left;
          animation: vendorLineDraw 800ms 150ms both;
        }

        /*
          Benefit card hover:
          Only the card background changes.
          Icons, arrows and text do not move, rotate or change colour.
        */
        .vendor-benefit-card:hover {
          background-color: var(--color-surface-secondary);
        }

        /*
          No hover animation on the benefit icons.
        */
        .vendor-benefit-icon,
        .vendor-benefit-title,
        .vendor-benefit-arrow,
        .vendor-fleet-icon,
        .vendor-fleet-arrow {
          transition: none !important;
          transform: none !important;
        }

        /*
          Rounded card edges throughout the vendor page.
        */
        .vendor-page .vendor-benefit-card,
        .vendor-page .vendor-process-card,
        .vendor-page .vendor-fleet-card,
        .vendor-page .vendor-info-panel,
        .vendor-page .vendor-form-panel {
          border-radius: 18px;
        }

        @media (prefers-reduced-motion: reduce) {
          .vendor-hidden-rise,
          .vendor-hidden-slide,
          .vendor-hidden-scale,
          .vendor-hidden-wipe {
            opacity: 1;
            visibility: visible;
          }

          .vendor-visible,
          .vendor-line-draw {
            animation: none !important;
          }
        }
      `}</style>

      {/* WHY BUS MANTRA */}
      <section
        id="why-partner"
        className="scroll-mt-24 border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <Reveal animation="rise">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <SectionLabel>Vendor benefits</SectionLabel>

                <h1 className="mt-6 max-w-lg text-3xl font-semibold leading-[1.13] tracking-[-0.045em] sm:text-4xl lg:text-[49px]">
                  What are the benefits of becoming a{" "}
                  <span className="text-primary">
                    vendor with us?
                  </span>
                </h1>

                <div className="vendor-line-draw mt-6 h-0.75 w-16 rounded-full bg-primary" />
              </div>

              <div className="flex flex-col justify-end lg:pb-1">
                <p className="max-w-xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                  Becoming a Bus Mantra vendor gives your transport business an opportunity to build new professional connections, explore business enquiries, and discuss partnership possibilities with our team.
                </p>

                <a
                  href="#vendor-registration"
                  className="mt-6 inline-flex w-fit items-center gap-3 rounded-lg text-sm font-semibold text-primary"
                >
                  Register as a vendor
                  <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* BENEFITS */}
          <div className="mt-12 space-y-3 sm:mt-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <Reveal
                  key={benefit.number}
                  delay={index * 80}
                  animation="rise"
                >
                  <article className="vendor-benefit-card group grid gap-4 rounded-2xl border border-border bg-white p-5 sm:grid-cols-[45px_1fr_1.15fr_30px] sm:items-center sm:gap-5 sm:px-6 sm:py-7">
                    <span className="text-xs font-medium tracking-widest text-text-muted">
                      {benefit.number}
                    </span>

                    <div className="flex items-center gap-4">
                      <span className="vendor-benefit-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                        <Icon size={20} strokeWidth={1.7} />
                      </span>

                      <h2 className="vendor-benefit-title text-base font-semibold text-text-primary sm:text-lg">
                        {benefit.title}
                      </h2>
                    </div>

                    <p className="max-w-xl text-sm leading-7 text-text-secondary">
                      {benefit.description}
                    </p>

                    <ArrowUpRight
                      size={19}
                      className="vendor-benefit-arrow hidden text-text-muted sm:block"
                    />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* VENDOR REGISTRATION */}
      <section
        id="vendor-registration"
        className="scroll-mt-24 bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <Reveal animation="wipe">
            <div className="mb-12 grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
              <div>
                <SectionLabel>Vendor registration</SectionLabel>

                <h2 className="mt-6 max-w-lg text-3xl font-semibold leading-[1.13] tracking-[-0.04em] sm:text-4xl lg:text-[49px]">
                  Tell us about your business.
                </h2>

                <div className="vendor-line-draw mt-6 h-0.75 w-16 rounded-full bg-primary" />
              </div>

              <p className="max-w-xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                Complete the form below with your business and fleet
                information. It provides a starting point for discussing
                your requirements and a potential partnership.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
            {/* INFORMATION PANEL */}
            <aside className="vendor-info-panel relative isolate overflow-hidden rounded-3xl bg-surface-inverse p-7 text-white sm:p-10 lg:p-12">
              <div className="absolute left-0 top-0 h-1 w-full rounded-full bg-white/20" />

              <div className="absolute left-0 top-0 h-1 w-[34%] rounded-full bg-primary" />

              <Reveal animation="rise">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Handshake size={24} strokeWidth={1.7} />
                </div>

                <p className="mt-9 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Before you begin
                </p>

                <h3 className="mt-4 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
                  A little about your business goes a long way.
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
                  Help us understand who you are, what you operate and
                  how to get in touch with you.
                </p>

                <div className="mt-9 border-t border-white/20 pt-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    Details to prepare
                  </p>

                  <ul className="mt-5 space-y-5">
                    {[
                      "Your name and business information",
                      "Your contact details and operating city",
                      "Your vehicle category and fleet size",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-white/80"
                      >
                        <Check
                          size={17}
                          className="mt-0.5 shrink-0 text-primary"
                        />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 flex items-center gap-3 border-t border-white/20 pt-6">
                  <MapPin
                    size={18}
                    className="shrink-0 text-primary"
                  />

                  <p className="text-xs leading-5 text-white/65">
                    Include your primary operating location in the form.
                  </p>
                </div>
              </Reveal>
            </aside>

            {/* FORM PANEL */}
            <div className="vendor-form-panel min-w-0 rounded-3xl border border-border bg-white p-5 sm:p-8 lg:p-10 xl:p-12">
              {submitted ? (
                <div className="flex min-h-112.5 flex-col items-start justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-subtle text-primary">
                    <Check size={28} strokeWidth={2} />
                  </div>

                  <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    Demo completed
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                    Form interaction complete
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-text-secondary">
                    This is a frontend demonstration. Your details have
                    not been sent or saved to a server. Connect the form
                    to your backend API to enable actual vendor
                    registration.
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-7 inline-flex min-h-12 items-center gap-4 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
                  >
                    Return to form
                    <ArrowRight size={17} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="border-b border-border pb-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Partner enquiry
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text-primary">
                      Business information
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      Please complete all required fields.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="pt-7"
                  >
                    <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="text-sm font-medium text-text-primary"
                        >
                          Full name <span className="text-primary">*</span>
                        </label>

                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          required
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="businessName"
                          className="text-sm font-medium text-text-primary"
                        >
                          Business name{" "}
                          <span className="text-primary">*</span>
                        </label>

                        <input
                          id="businessName"
                          name="businessName"
                          type="text"
                          required
                          value={form.businessName}
                          onChange={handleChange}
                          placeholder="Enter business name"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-text-primary"
                        >
                          Email address{" "}
                          <span className="text-primary">*</span>
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-text-primary"
                        >
                          Phone number{" "}
                          <span className="text-primary">*</span>
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          pattern="[0-9+\-\s()]{7,20}"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Enter contact number"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="text-sm font-medium text-text-primary"
                        >
                          Operating city{" "}
                          <span className="text-primary">*</span>
                        </label>

                        <input
                          id="city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          required
                          value={form.city}
                          onChange={handleChange}
                          placeholder="Enter your city"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="vehicleType"
                          className="text-sm font-medium text-text-primary"
                        >
                          Vehicle category{" "}
                          <span className="text-primary">*</span>
                        </label>

                        <div className="relative">
                          <select
                            id="vehicleType"
                            name="vehicleType"
                            required
                            value={form.vehicleType}
                            onChange={handleChange}
                            className={`${inputClass} appearance-none pr-10 ${
                              form.vehicleType ? "" : "text-text-muted"
                            }`}
                          >
                            <option value="" disabled>
                              Select vehicle category
                            </option>

                            {vehicleTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-3 top-6 text-text-muted"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="fleetSize"
                          className="text-sm font-medium text-text-primary"
                        >
                          Number of vehicles{" "}
                          <span className="text-primary">*</span>
                        </label>

                        <div className="relative">
                          <select
                            id="fleetSize"
                            name="fleetSize"
                            required
                            value={form.fleetSize}
                            onChange={handleChange}
                            className={`${inputClass} appearance-none pr-10 ${
                              form.fleetSize ? "" : "text-text-muted"
                            }`}
                          >
                            <option value="" disabled>
                              Select your fleet size
                            </option>

                            {fleetSizes.map((size) => (
                              <option
                                key={size.value}
                                value={size.value}
                              >
                                {size.label}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-3 top-6 text-text-muted"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium text-text-primary"
                        >
                          Additional information{" "}
                          <span className="font-normal text-text-muted">
                            (Optional)
                          </span>
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          maxLength={1000}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your fleet or partnership requirements."
                          className={`${inputClass} resize-y`}
                        />
                      </div>
                    </div>

                    <div className="mt-8 border-t border-border pt-6">
                      <button
                        type="submit"
                        className="inline-flex min-h-13 w-full items-center justify-center gap-5 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary-hover sm:w-auto"
                      >
                        Submit details
                        <ArrowRight size={17} />
                      </button>

                      <p className="mt-4 text-xs leading-5 text-text-muted">
                        Frontend demonstration only. No information is
                        transmitted or stored.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}