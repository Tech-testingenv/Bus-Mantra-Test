"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function FAQSection({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!data || !Array.isArray(data.faqs) || data.faqs.length === 0) {
    return null;
  }

  const toggleFaq = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="relative w-full py-14 sm:py-18 lg:py-24">
      <div className="relative overflow-hidden rounded-[28px] border border-border bg-white px-5 py-8 sm:rounded-4xl sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* LEFT: FAQ INTRODUCTION */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-subtle text-sm font-bold text-primary">
                  ?
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted sm:text-[11px]">
                  {data.eyebrow || "FAQ"}
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-6 max-w-md text-3xl font-black leading-[1.02] tracking-tight text-text-primary sm:text-4xl lg:text-[46px]">
                Frequently Asked{" "}
                <span className="text-primary">Questions.</span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-md text-sm leading-6 text-text-muted sm:text-base">
                {data.description ||
                  "Find answers to common questions about Bus Mantra and group transportation."}
              </p>

              {/* Help Information */}
              <div className="mt-8 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
                    Need more help?
                  </span>
                </div>

                <p className="mt-3 max-w-xs text-sm leading-6 text-text-secondary">
                  Our team can help you choose the right coach and plan your
                  group journey.
                </p>

                <Link
                  href="/fleets"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-200 hover:text-primary-hover"
                >
                  Start your journey

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: FAQ ACCORDION */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface-secondary sm:rounded-3xl">
              {data.faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <article
                    key={faq.id || faq.question || index}
                    className={`group relative border-b border-border last:border-b-0 transition-colors duration-300 ${
                      isOpen
                        ? "bg-primary-subtle"
                        : "bg-white hover:bg-surface-secondary/60"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="relative flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                    >
                      {/* Question Number */}
                      <span
                        className={`flex w-7 shrink-0 text-[10px] font-bold tracking-[0.12em] transition-colors duration-300 sm:w-8 ${
                          isOpen
                            ? "text-primary"
                            : "text-text-muted group-hover:text-primary"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Question */}
                      <span
                        className={`flex-1 pr-2 text-sm font-bold leading-6 transition-all duration-300 sm:text-[15px] ${
                          isOpen
                            ? "translate-x-1 text-primary"
                            : "text-text-primary group-hover:translate-x-1 group-hover:text-primary"
                        }`}
                      >
                        {faq.question}
                      </span>

                      {/* Toggle Button */}
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-white text-text-muted group-hover:border-primary group-hover:bg-primary-subtle group-hover:text-primary"
                        }`}
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={2}
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>

                      {/* Active Indicator */}
                      <span
                        className={`absolute bottom-0 left-0 h-0.75 bg-primary transition-all duration-500 ${
                          isOpen ? "w-full" : "w-0"
                        }`}
                      />
                    </button>

                    {/* Answer */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-[28px_1fr] gap-4 px-5 pb-6 sm:grid-cols-[32px_1fr] sm:px-7 sm:pb-7">
                          <div />

                          <p className="max-w-2xl text-sm leading-6 text-text-secondary sm:text-[15px]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* BOTTOM CONTACT STRIP */}
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface-secondary px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-bold text-text-primary sm:text-sm">
                  Still have questions?
                </p>

                <p className="mt-1 text-[11px] text-text-muted sm:text-xs">
                  Tell us what your group needs.
                </p>
              </div>

              <Link
                href="/contact"
                className="group flex h-9 shrink-0 items-center gap-2 rounded-full bg-primary px-4 text-[11px] font-bold text-primary-foreground transition-all duration-300 hover:bg-primary-hover sm:h-10 sm:px-5 sm:text-xs"
              >
                Get in touch

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}