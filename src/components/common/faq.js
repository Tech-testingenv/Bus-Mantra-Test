"use client";

import { useState } from "react";
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
      <div className="relative overflow-hidden rounded-[28px] border border-neutral-200/80 bg-white px-5 py-8 shadow-[0_12px_45px_rgba(15,23,42,0.05)] sm:rounded-[32px] sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-brand-orange">
                  ?
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-[11px]">
                  {data.eyebrow || "FAQ"}
                </span>
              </div>

              <h2 className="mt-6 max-w-md text-3xl font-black leading-[1.02] tracking-tight text-neutral-900 sm:text-4xl lg:text-[46px]">
                Frequently Asked{" "}
                <span className="text-brand-orange">
                  Questions.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-neutral-500 sm:text-base">
                {data.description ||
                  "Find answers to common questions about Bus Mantra and group transportation."}
              </p>

              <div className="mt-8 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-brand-orange" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                    Need more help?
                  </span>
                </div>

                <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-500">
                  Our team can help you choose the right coach and plan your
                  group journey.
                </p>

                <a
                  href="#booking-form"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-neutral-900 transition-colors duration-200 hover:text-brand-orange"
                >
                  Start your journey

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-all duration-300 group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white">
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/60 sm:rounded-3xl">
              {data.faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <article
                    key={faq.id || faq.question || index}
                    className={`group relative border-b border-neutral-200/80 last:border-b-0 transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#fffaf5]"
                        : "bg-white hover:bg-neutral-50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="relative flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                    >
                      <span
                        className={`flex w-7 shrink-0 text-[10px] font-bold tracking-[0.12em] transition-colors duration-300 sm:w-8 ${
                          isOpen
                            ? "text-brand-orange"
                            : "text-neutral-300 group-hover:text-neutral-500"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`flex-1 pr-2 text-sm font-bold leading-6 transition-all duration-300 sm:text-[15px] ${
                          isOpen
                            ? "translate-x-1 text-brand-orange"
                            : "text-neutral-900 group-hover:translate-x-1 group-hover:text-brand-orange"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "border-brand-orange bg-brand-orange text-white"
                            : "border-neutral-200 bg-white text-neutral-400 group-hover:border-brand-orange group-hover:text-brand-orange"
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

                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-brand-orange transition-all duration-500 ${
                          isOpen ? "w-full" : "w-0"
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-[28px_1fr] gap-4 px-5 pb-6 sm:grid-cols-[32px_1fr] sm:px-7 sm:pb-7">
                          <div />

                          <p className="max-w-2xl text-sm leading-6 text-neutral-500 sm:text-[15px]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-neutral-200/70 bg-white px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-bold text-neutral-900 sm:text-sm">
                  Still have questions?
                </p>

                <p className="mt-1 text-[11px] text-neutral-500 sm:text-xs">
                  Tell us what your group needs.
                </p>
              </div>

              <a
                href="#booking-form"
                className="group flex h-9 items-center gap-2 rounded-full bg-neutral-900 px-4 text-[11px] font-bold text-white transition-all duration-300 hover:bg-brand-orange sm:h-10 sm:px-5 sm:text-xs"
              >
                Get in touch

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}