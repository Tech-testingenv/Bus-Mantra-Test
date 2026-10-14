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
      <div className="relative overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white px-5 py-8 sm:rounded-[32px] sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* LEFT: FAQ INTRODUCTION */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF3FF] text-sm font-bold text-[#123999]">
                  ?
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#737373] sm:text-[11px]">
                  {data.eyebrow || "FAQ"}
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-6 max-w-md text-3xl font-black leading-[1.02] tracking-tight text-[#111111] sm:text-4xl lg:text-[46px]">
                Frequently Asked{" "}
                <span className="text-[#123999]">Questions.</span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-md text-sm leading-6 text-[#737373] sm:text-base">
                {data.description ||
                  "Find answers to common questions about Bus Mantra and group transportation."}
              </p>

              {/* Help Information */}
              <div className="mt-8 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-[#FFC003]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#737373]">
                    Need more help?
                  </span>
                </div>

                <p className="mt-3 max-w-xs text-sm leading-6 text-[#626C7B]">
                  Our team can help you choose the right coach and plan your
                  group journey.
                </p>

                <a
                  href="/fleets"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#123999] transition-colors duration-200 hover:text-[#0D2B73]"
                >
                  Start your journey

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] bg-white transition-all duration-300 group-hover:border-[#FFC003] group-hover:bg-[#FFC003] group-hover:text-[#123999]">
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: FAQ ACCORDION */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] sm:rounded-3xl">
              {data.faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <article
                    key={faq.id || faq.question || index}
                    className={`group relative border-b border-[#E5E7EB] last:border-b-0 transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#FFF8DB]"
                        : "bg-white hover:bg-[#F9FAFC]"
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
                            ? "text-[#123999]"
                            : "text-[#9CA3AF] group-hover:text-[#123999]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Question */}
                      <span
                        className={`flex-1 pr-2 text-sm font-bold leading-6 transition-all duration-300 sm:text-[15px] ${
                          isOpen
                            ? "translate-x-1 text-[#123999]"
                            : "text-[#111111] group-hover:translate-x-1 group-hover:text-[#123999]"
                        }`}
                      >
                        {faq.question}
                      </span>

                      {/* Toggle Button */}
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "border-[#123999] bg-[#123999] text-white"
                            : "border-[#E5E7EB] bg-white text-[#737373] group-hover:border-[#FFC003] group-hover:bg-[#FFF8DB] group-hover:text-[#123999]"
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

                      {/* Active Yellow Indicator */}
                      <span
                        className={`absolute bottom-0 left-0 h-[3px] bg-[#FFC003] transition-all duration-500 ${
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

                          <p className="max-w-2xl text-sm leading-6 text-[#626C7B] sm:text-[15px]">
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
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-bold text-[#111111] sm:text-sm">
                  Still have questions?
                </p>

                <p className="mt-1 text-[11px] text-[#737373] sm:text-xs">
                  Tell us what your group needs.
                </p>
              </div>

              <a
                href="/contact"
                className="group flex h-9 shrink-0 items-center gap-2 rounded-full bg-[#123999] px-4 text-[11px] font-bold text-white transition-all duration-300 hover:bg-[#0D2B73] sm:h-10 sm:px-5 sm:text-xs"
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