"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BusFront,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { ctaData } from "@/data/data";
import { contactFaqData } from "@/data/data";
import FAQSection from "@/components/common/faq";

const contactTopics = [
  "Bus booking",
  "Fleet enquiry",
  "Wedding or event travel",
  "Corporate travel",
  "School or college trip",
  "Vendor partnership",
  "Other enquiry",
];

const fieldClass =
  "mt-2 w-full rounded-xl border border-[#DCE3EF] bg-white px-4 py-3.5 text-sm text-[#142E60] outline-none placeholder:text-[#8A96AA] focus:border-[#19439B] focus:ring-4 focus:ring-[#19439B]/10";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    topic: "Bus booking",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Frontend-only form: connect this handler to your contact API when available.
    setSubmitted(true);
  }

  function resetForm() {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      topic: "Bus booking",
      message: "",
    });
    setSubmitted(false);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#142E60]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#142E60]">
        <div className="absolute inset-0 -z-10 opacity-[0.12]" aria-hidden="true">
          <div className="absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full border-[1px] border-white" />
          <div className="absolute -right-8 -top-16 h-[19rem] w-[19rem] rounded-full border-[1px] border-white" />
          <div className="absolute -bottom-36 left-[38%] h-[25rem] w-[25rem] rounded-full border-[1px] border-white" />
        </div>
        <div className="absolute right-0 top-0 h-full w-1.5 bg-[#FFC20E]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#FFC20E]">
              <span className="h-2 w-2 rounded-full bg-[#FFC20E]" />
              We are here to help
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">
              Let&apos;s get your
              <span className="mt-1 block text-[#FFC20E]">journey moving.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
              Planning a group trip, arranging event transport, or looking for the right coach? Tell us what you need and the Bus Mantra team can help you take the next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-3 rounded-xl bg-[#FFC20E] px-6 py-4 text-sm font-bold text-[#142E60] transition-colors hover:bg-white"
              >
                Send an enquiry
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/fleets"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-4 text-sm font-semibold text-white transition-colors hover:border-[#FFC20E] hover:text-[#FFC20E]"
              >
                Explore our fleet <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-white/65">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-[#FFC20E]" /> Group travel enquiries</span>
              <span className="inline-flex items-center gap-2"><BusFront size={16} className="text-[#FFC20E]" /> Coach and fleet support</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-tr-[2rem] border-r-2 border-t-2 border-[#FFC20E] sm:-right-5 sm:-top-5" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F47716]">Contact Bus Mantra</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142E60] sm:text-3xl">How can we help?</h2>
                  <p className="mt-2 text-sm leading-6 text-[#66748A]">Choose a topic and share a few details.</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4CC] text-[#19439B]">
                  <MessageCircle size={23} />
                </div>
              </div>
              <div className="mt-7 space-y-4">
                <div className="flex items-center gap-4 rounded-xl border border-[#E8EDF5] p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF0FF] text-[#19439B]"><BusFront size={20} /></span>
                  <div><p className="text-sm font-bold text-[#142E60]">Bus & fleet enquiries</p><p className="mt-1 text-xs leading-5 text-[#778399]">Find a suitable coach for your group size.</p></div>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-[#E8EDF5] p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF4CC] text-[#A66B00]"><Clock3 size={20} /></span>
                  <div><p className="text-sm font-bold text-[#142E60]">Trip planning</p><p className="mt-1 text-xs leading-5 text-[#778399]">Share your route, dates and passenger count.</p></div>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-[#E8EDF5] p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E8] text-[#F47716]"><MessageCircle size={20} /></span>
                  <div><p className="text-sm font-bold text-[#142E60]">Partnerships & other questions</p><p className="mt-1 text-xs leading-5 text-[#778399]">Let us know how we can assist.</p></div>
                </div>
              </div>
              <a href="#contact-form" className="mt-6 flex w-full items-center justify-between rounded-xl bg-[#19439B] px-5 py-4 text-sm font-bold text-white transition-colors hover:bg-[#142E60]">
                Start your enquiry <ArrowRight size={17} />
              </a>
            </div>
            <div className="absolute -bottom-4 -left-4 -z-10 h-24 w-24 rounded-bl-[2rem] border-b-2 border-l-2 border-[#F47716]" />
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="scroll-mt-24 bg-[#F5F7FB] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:pt-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F47716]">Get in touch</p>
            <h2 className="mt-4 max-w-lg text-3xl font-bold leading-tight tracking-[-0.04em] text-[#142E60] sm:text-4xl lg:text-5xl">
              Tell us a little about your plans.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#647189] sm:text-base">
              The more you tell us about your journey, the easier it is to understand your requirements. Fill out the form and include any details that will help us understand your enquiry.
            </p>

            <div className="mt-9 border-l-2 border-[#FFC20E] pl-5">
              <p className="text-sm font-bold text-[#142E60]">Helpful details to include</p>
              <ul className="mt-3 space-y-2.5 text-sm leading-6 text-[#647189]">
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F47716]" />Your pickup point and destination</li>
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F47716]" />Travel date and approximate passenger count</li>
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F47716]" />Your preferred bus type or special requirements</li>
              </ul>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#E1E7F0] bg-white p-4 sm:p-5">
                <MapPin size={20} className="text-[#19439B]" />
                <p className="mt-4 text-sm font-bold text-[#142E60]">Route details</p>
                <p className="mt-1 text-xs leading-5 text-[#7A8699]">Pickup, destination and stops</p>
              </div>
              <div className="rounded-2xl border border-[#E1E7F0] bg-white p-4 sm:p-5">
                <Mail size={20} className="text-[#F47716]" />
                <p className="mt-4 text-sm font-bold text-[#142E60]">Clear communication</p>
                <p className="mt-1 text-xs leading-5 text-[#7A8699]">Share the best way to reach you</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#E2E8F1] bg-white p-5 shadow-[0_18px_60px_rgba(20,46,96,0.07)] sm:p-8 lg:p-10">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF7EF] text-[#20824B]"><CheckCircle2 size={32} /></span>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#20824B]">Form completed</p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#142E60]">Thanks for reaching out.</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-[#647189]">Your details are currently only held in this page's form state. Connect this form to your backend API to send and store the enquiry.</p>
                <button type="button" onClick={resetForm} className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#19439B] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#142E60]">Submit another enquiry <ArrowRight size={16} /></button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4 border-b border-[#E8EDF4] pb-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F47716]">Contact form</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#142E60] sm:text-3xl">Send us a message</h3>
                    <p className="mt-2 text-sm leading-6 text-[#7A8699]">Fields marked with * are required.</p>
                  </div>
                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF4CC] text-[#19439B] sm:flex"><Send size={21} /></span>
                </div>
                <form onSubmit={handleSubmit} className="pt-7">
                  <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="text-sm font-semibold text-[#263B61]">Full name <span className="text-[#F47716]">*</span></label>
                      <input id="fullName" name="fullName" type="text" autoComplete="name" required value={form.fullName} onChange={handleChange} placeholder="Enter your full name" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-semibold text-[#263B61]">Email address <span className="text-[#F47716]">*</span></label>
                      <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-semibold text-[#263B61]">Phone number</label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="topic" className="text-sm font-semibold text-[#263B61]">Enquiry type <span className="text-[#F47716]">*</span></label>
                      <select id="topic" name="topic" required value={form.topic} onChange={handleChange} className={fieldClass}>
                        {contactTopics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="text-sm font-semibold text-[#263B61]">How can we help? <span className="text-[#F47716]">*</span></label>
                      <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Share your route, travel date, number of passengers, or any questions you have..." className={`${fieldClass} resize-y`} />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col gap-4 border-t border-[#E8EDF4] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-sm text-xs leading-5 text-[#8993A4]">Please avoid including sensitive personal or payment information in your message.</p>
                    <button type="submit" className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-[#19439B] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#142E60]">
                      Send enquiry <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
       {/* Contact Page FAQ Section */}
      <FAQSection data={contactFaqData} />
    </main>
  );
}
