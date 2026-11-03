"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Bus,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  FileText,
  Handshake,
  Hash,
  Headset,
  HelpCircle,
  Mail,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  TrendingUp,
  User,
  X,
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

const PRESET_FLEET_TYPES = [
  "Volvo 9600 Multi-Axle Luxury Coach",
  "Volvo B11R AC Sleeper Coach",
  "BharatBenz Club Class Luxury Coach",
  "BharatBenz AC Sleeper (2+1)",
  "Mercedes-Benz Sprinter VIP Coach",
  "Force Urbania Executive (12–17 Seats)",
  "Tempo Traveller (12/17/20/26 Seater)",
  "Scania Touring HD Intercity Coach",
  "Ashok Leyland Tourist Coach (45–55 Seats)",
  "Tata Marcopolo Deluxe AC Bus (32–40 Seats)",
  "Eicher Skyline Pro Tourist Bus",
  "AC Deluxe Seater Coach (2x2)",
  "Non-AC Tourist Coach",
  "Mini Bus (12–20 Seats)",
  "Electric Highway Tourist Coach",
];

const POPULAR_QUICK_PICKS = [
  "Volvo 9600 Multi-Axle Luxury Coach",
  "BharatBenz Club Class Luxury Coach",
  "Force Urbania Executive (12–17 Seats)",
  "BharatBenz AC Sleeper (2+1)",
  "Mini Bus (12–20 Seats)",
  "Tempo Traveller (12/17/20/26 Seater)",
];

const OPERATING_HUBS = [
  "Delhi NCR",
  "Jaipur & Rajasthan",
  "Mumbai & Maharashtra",
  "Pune",
  "Bengaluru & Karnataka",
  "Hyderabad & Telangana",
  "Chennai & Tamil Nadu",
  "Ahmedabad & Gujarat",
  "Chandigarh & Punjab",
  "Agra & Uttar Pradesh",
  "Goa",
  "Kolkata & West Bengal",
  "Pan-India (Multiple Depots)",
];

const FAQS = [
  {
    q: "What are the eligibility criteria to register as a Bus Mantra fleet vendor?",
    a: "You must be a registered transport operator, travels agency, or individual fleet owner with commercially registered passenger vehicles (yellow plate), active passenger tourist permits, fitness certificates, and comprehensive commercial passenger insurance.",
  },
  {
    q: "How do trip bookings and customer payments work?",
    a: "Bus Mantra provides 100% full-bus charters for weddings, corporate offsites, and group holiday tours. Once you accept a dispatch order, trip advances are credited prior to bus departure, and final settlements are processed immediately upon trip completion via direct NEFT/RTGS.",
  },
  {
    q: "Is there any onboarding fee or security deposit required?",
    a: "No! Onboarding on Bus Mantra is completely free. We do not charge any joining fees, registration fees, or hidden monthly maintenance charges.",
  },
  {
    q: "Can I register a custom or specialized fleet type not in the standard list?",
    a: "Yes! You can select from our preset list or type your specific bus model (e.g. customized vanity van, retrofitted sleeper coach, or electric tour bus) directly in the 'Types of fleets' field and it will be recorded for your fleet profile.",
  },
  {
    q: "How long does verification and activation take?",
    a: "Our Vendor Relations team reviews your PAN, GST, and vehicle documentation within 24 working hours. Once verified, your fleet is activated on our dispatch network to receive charter inquiries.",
  },
];

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
        className={`h-0.75 w-8 rounded-full ${light ? "bg-primary" : "bg-primary"}`}
      />

      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.19em] ${light ? "text-primary" : "text-primary"}`}
      >
        {children}
      </p>
    </div>
  );
}

export default function VendorPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    panNo: "",
    aadharNo: "",
    gstNo: "",
    fleetCount: "",
    selectedFleetTypes: [
      "Volvo 9600 Multi-Axle Luxury Coach",
      "BharatBenz Club Class Luxury Coach",
    ],
    operatingHub: "Delhi NCR",
    yearsInBusiness: "3-5 years",
    notes: "",
    agreedToTerms: false,
  });

  const [fleetSearchQuery, setFleetSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [activeFaq, setActiveFaq] = useState(0);

  const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered preset options based on search query
  const filteredPresets = useMemo(() => {
    if (!fleetSearchQuery.trim()) {
      return PRESET_FLEET_TYPES;
    }
    const q = fleetSearchQuery.toLowerCase().trim();
    return PRESET_FLEET_TYPES.filter((type) => type.toLowerCase().includes(q));
  }, [fleetSearchQuery]);

  // Check if current search query can be added as a custom fleet type
  const canAddCustom = useMemo(() => {
    const trimmed = fleetSearchQuery.trim();
    if (!trimmed) return false;
    return !formData.selectedFleetTypes.some(
      (item) => item.toLowerCase() === trimmed.toLowerCase()
    );
  }, [fleetSearchQuery, formData.selectedFleetTypes]);

  // Handlers for fleet types
  const addFleetType = (typeName) => {
    const trimmed = typeName.trim();
    if (!trimmed) return;

    if (
      !formData.selectedFleetTypes.some(
        (item) => item.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        selectedFleetTypes: [...prev.selectedFleetTypes, trimmed],
      }));
    }
    setFleetSearchQuery("");
    setIsDropdownOpen(false);

    if (errors.selectedFleetTypes) {
      setErrors((prev) => ({ ...prev, selectedFleetTypes: undefined }));
    }
  };

  const removeFleetType = (typeName) => {
    setFormData((prev) => ({
      ...prev,
      selectedFleetTypes: prev.selectedFleetTypes.filter(
        (item) => item !== typeName
      ),
    }));
  };

  const handleFleetKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (canAddCustom) {
        addFleetType(fleetSearchQuery);
      } else if (filteredPresets.length > 0) {
        addFleetType(filteredPresets[0]);
      }
    }
  };

  // Form field changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name of contact person is required";
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid business email is required";
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Valid 10-digit mobile / WhatsApp number is required";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Travels / Transport Agency name is required";
    }

    const cleanPan = formData.panNo.trim().toUpperCase();
    if (!cleanPan) {
      newErrors.panNo = "PAN number is required for business verification";
    } else if (cleanPan.length !== 10) {
      newErrors.panNo = "PAN must be exactly 10 characters (e.g. ABCDE1234F)";
    }

    const cleanAadhar = formData.aadharNo.replace(/\D/g, "");
    if (!cleanAadhar) {
      newErrors.aadharNo = "Aadhaar number is required for authorized signatory";
    } else if (cleanAadhar.length !== 12) {
      newErrors.aadharNo = "Aadhaar must be a 12-digit number";
    }

    // GST is recommended; if provided validate length
    if (formData.gstNo.trim()) {
      const cleanGst = formData.gstNo.trim().toUpperCase();
      if (cleanGst.length !== 15) {
        newErrors.gstNo =
          "GSTIN must be 15 alphanumeric characters (or leave blank if exempt)";
      }
    }

    const numFleets = parseInt(formData.fleetCount, 10);
    if (!formData.fleetCount || isNaN(numFleets) || numFleets <= 0) {
      newErrors.fleetCount = "Please specify at least 1 fleet vehicle";
    }

    if (
      !formData.selectedFleetTypes ||
      formData.selectedFleetTypes.length === 0
    ) {
      newErrors.selectedFleetTypes =
        "Please select or type at least one fleet type";
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms =
        "You must confirm commercial permit and insurance compliance";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      setApplicationId(`BM-VEND-${randomCode}`);
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }, 850);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      companyName: "",
      panNo: "",
      aadharNo: "",
      gstNo: "",
      fleetCount: "",
      selectedFleetTypes: [
        "Volvo 9600 Multi-Axle Luxury Coach",
        "BharatBenz Club Class Luxury Coach",
      ],
      operatingHub: "Delhi NCR",
      yearsInBusiness: "3-5 years",
      notes: "",
      agreedToTerms: false,
    });
    setErrors({});
  };

  return (
    <main className="vendor-page overflow-hidden bg-white text-text-primary">
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
                  <span className="text-primary">vendor with us?</span>
                </h1>

                <div className="vendor-line-draw mt-6 h-0.75 w-16 rounded-full bg-primary" />
              </div>

              <div className="flex flex-col justify-end lg:pb-1">
                <p className="max-w-xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                  Becoming a Bus Mantra vendor gives your transport business an
                  opportunity to build new professional connections, explore
                  business enquiries, and discuss partnership possibilities with
                  our team.
                </p>

                <a
                  href="#vendor-registration"
                  className="mt-6 inline-flex w-fit items-center gap-3 rounded-lg text-sm font-semibold text-primary hover:underline"
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
                specifications. Our vendor relations team verifies commercial
                permits and activates your fleet for direct charter enquiries.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            {/* FORM PANEL */}
            <div className="vendor-form-panel w-full rounded-3xl border border-border bg-white shadow-sm overflow-hidden">
              {submitted ? (
                /* Submission Success State */
                <div className="p-8 sm:p-12 bg-linear-to-b from-emerald-500/5 to-transparent animate-in fade-in zoom-in-95 duration-300">
                  <div className="text-center max-w-xl mx-auto">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                      <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                    </div>

                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                      Application Received
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      Welcome to the Bus Mantra Fleet Network!
                    </h2>

                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      Thank you, <strong className="text-slate-950">{formData.name}</strong>. Your vendor application for <strong className="text-slate-950">{formData.companyName}</strong> has been registered successfully.
                    </p>

                    {/* Application ID Card */}
                    <div className="my-6 p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Application Reference ID</span>
                        <p className="text-lg font-mono font-extrabold text-primary">{applicationId}</p>
                      </div>
                      <div className="text-xs text-slate-500 sm:text-right">
                        <span>Base Hub: <strong>{formData.operatingHub}</strong></span>
                        <br />
                        <span>Fleets: <strong>{formData.fleetCount} Buses Registered</strong></span>
                      </div>
                    </div>

                    {/* Summary of Registered Fleet Types */}
                    <div className="text-left p-5 rounded-2xl bg-white border border-slate-200 mb-8">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Registered Fleet Types ({formData.selectedFleetTypes.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedFleetTypes.map((type, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-50 border border-orange-200 text-xs font-semibold text-primary"
                          >
                            <Bus className="w-3.5 h-3.5 text-primary" />
                            <span>{type}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Next Steps Roadmap */}
                    <div className="text-left border-t border-slate-200 pt-6 mb-8">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 mb-4">
                        What Happens Next?
                      </h4>
                      <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div>
                          <p><strong>Document Verification:</strong> Our Partner Desk verifies your PAN ({formData.panNo.toUpperCase()}) and commercial permits within 24 hours.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div>
                          <p><strong>Onboarding Call:</strong> A partner relations manager contacts you on <strong>+91 {formData.phone}</strong> to confirm your base depot and tariffs.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">3</div>
                          <p><strong>Live Dispatch Access:</strong> Your fleet goes live to receive full-bus charter inquiries and dispatch manifests.</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all cursor-pointer"
                      >
                        Submit Another Application
                      </button>

                      <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-slate-950 text-white font-bold text-sm hover:opacity-90 transition-all cursor-pointer"
                      >
                        Back to Home
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                /* Registration Form Container */
                <div>
                  {/* Form Card Header Banner */}
                  <div className="p-6 sm:p-8 border-b border-border bg-linear-to-r from-orange-500/5 via-amber-500/5 to-transparent">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                          Vendor Registration Form
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                          Fill in your business and fleet specifications to begin onboarding.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-100/70 border border-orange-200 text-primary text-xs font-semibold self-start sm:self-auto">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                        <span>Commercial Fleet Only</span>
                      </div>
                    </div>
                  </div>

                  {/* Form Body */}
                  <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                    {/* Section 1: Contact & Company Details */}
                    <div>
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>1. Company &amp; Contact Information</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div id="name">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Contact Person Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleChange("name", e.target.value)}
                              placeholder="e.g. Ramesh Chandra / Authorized Partner"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 ${
                                errors.name
                                  ? "border-rose-500 focus:ring-rose-500/20"
                                  : "border-slate-200 focus:ring-primary/20 focus:border-primary"
                              }`}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-rose-500 text-xs mt-1 font-medium">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Company Name */}
                        <div id="companyName">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Company / Agency Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                            <input
                              type="text"
                              value={formData.companyName}
                              onChange={(e) =>
                                handleChange("companyName", e.target.value)
                              }
                              placeholder="e.g. Royal Highway Travels & Fleet Pvt Ltd"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 ${
                                errors.companyName
                                  ? "border-rose-500 focus:ring-rose-500/20"
                                  : "border-slate-200 focus:ring-primary/20 focus:border-primary"
                              }`}
                            />
                          </div>
                          {errors.companyName && (
                            <p className="text-rose-500 text-xs mt-1 font-medium">
                              {errors.companyName}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div id="email">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange("email", e.target.value)}
                              placeholder="ops@royaltravels.com"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 ${
                                errors.email
                                  ? "border-rose-500 focus:ring-rose-500/20"
                                  : "border-slate-200 focus:ring-primary/20 focus:border-primary"
                              }`}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-rose-500 text-xs mt-1 font-medium">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div id="phone">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Phone / WhatsApp No. <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute left-3.5 top-2.5 flex items-center gap-1.5 text-xs font-bold text-slate-500 border-r border-slate-200 pr-2">
                              <span>+91</span>
                            </div>
                            <input
                              type="tel"
                              maxLength={10}
                              value={formData.phone}
                              onChange={(e) =>
                                handleChange(
                                  "phone",
                                  e.target.value.replace(/\D/g, "")
                                )
                              }
                              placeholder="9876543210"
                              className={`w-full pl-16 pr-4 py-2.5 rounded-xl text-sm border bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 ${
                                errors.phone
                                  ? "border-rose-500 focus:ring-rose-500/20"
                                  : "border-slate-200 focus:ring-primary/20 focus:border-primary"
                              }`}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-rose-500 text-xs mt-1 font-medium">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Statutory & Tax Verification */}
                    <div className="border-t border-slate-100 pt-6">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>2. Statutory &amp; Business KYC</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {/* PAN No. */}
                        <div id="panNo">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            PAN No. <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                            <input
                              type="text"
                              maxLength={10}
                              value={formData.panNo}
                              onChange={(e) =>
                                handleChange("panNo", e.target.value.toUpperCase())
                              }
                              placeholder="ABCDE1234F"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm uppercase tracking-wider font-mono border bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 ${
                                errors.panNo
                                  ? "border-rose-500 focus:ring-rose-500/20"
                                  : "border-slate-200 focus:ring-primary/20 focus:border-primary"
                              }`}
                            />
                          </div>
                          {errors.panNo ? (
                            <p className="text-rose-500 text-xs mt-1 font-medium">
                              {errors.panNo}
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-400 mt-1">
                              Proprietor or Business PAN
                            </p>
                          )}
                        </div>

                        {/* Aadhar No. */}
                        <div id="aadharNo">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Aadhar No. <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                            <input
                              type="text"
                              maxLength={12}
                              value={formData.aadharNo}
                              onChange={(e) =>
                                handleChange(
                                  "aadharNo",
                                  e.target.value.replace(/\D/g, "")
                                )
                              }
                              placeholder="12-digit UIDAI number"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-mono border bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 ${
                                errors.aadharNo
                                  ? "border-rose-500 focus:ring-rose-500/20"
                                  : "border-slate-200 focus:ring-primary/20 focus:border-primary"
                              }`}
                            />
                          </div>
                          {errors.aadharNo ? (
                            <p className="text-rose-500 text-xs mt-1 font-medium">
                              {errors.aadharNo}
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-400 mt-1">
                              Authorized signatory Aadhaar
                            </p>
                          )}
                        </div>

                        {/* GST No. */}
                        <div id="gstNo">
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-slate-700">
                              GST No.
                            </label>
                            <span className="text-[10px] text-slate-400 font-medium">
                              (Optional for small fleets)
                            </span>
                          </div>
                          <div className="relative">
                            <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                            <input
                              type="text"
                              maxLength={15}
                              value={formData.gstNo}
                              onChange={(e) =>
                                handleChange("gstNo", e.target.value.toUpperCase())
                              }
                              placeholder="07AAAAA0000A1Z5"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm uppercase tracking-wider font-mono border bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 ${
                                errors.gstNo
                                  ? "border-rose-500 focus:ring-rose-500/20"
                                  : "border-slate-200 focus:ring-primary/20 focus:border-primary"
                              }`}
                            />
                          </div>
                          {errors.gstNo ? (
                            <p className="text-rose-500 text-xs mt-1 font-medium">
                              {errors.gstNo}
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-400 mt-1">
                              15-digit GSTIN if registered
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Fleet Specification & Types */}
                    <div className="border-t border-slate-100 pt-6">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                        <Bus className="w-4 h-4" />
                        <span>3. Fleet Size &amp; Fleet Types</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                        {/* No. of Fleets */}
                        <div id="fleetCount" className="sm:col-span-1">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            No. of Fleets Owned / Managed{" "}
                            <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                            <input
                              type="number"
                              min={1}
                              max={500}
                              value={formData.fleetCount}
                              onChange={(e) =>
                                handleChange("fleetCount", e.target.value)
                              }
                              placeholder="e.g. 5"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-bold border bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 ${
                                errors.fleetCount
                                  ? "border-rose-500 focus:ring-rose-500/20"
                                  : "border-slate-200 focus:ring-primary/20 focus:border-primary"
                              }`}
                            />
                          </div>
                          {errors.fleetCount && (
                            <p className="text-rose-500 text-xs mt-1 font-medium">
                              {errors.fleetCount}
                            </p>
                          )}

                          {/* Quick Count Selection Pills */}
                          <div className="flex items-center gap-1.5 mt-2">
                            {["1-3", "4-10", "11-25", "25+"].map((pill) => (
                              <button
                                type="button"
                                key={pill}
                                onClick={() =>
                                  handleChange(
                                    "fleetCount",
                                    pill.replace(/\D/g, "") || "30"
                                  )
                                }
                                className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600 hover:bg-orange-50 hover:text-primary transition-colors cursor-pointer"
                              >
                                {pill}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Operating Hub */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Primary Operating Hub / City
                          </label>
                          <select
                            value={formData.operatingHub}
                            onChange={(e) =>
                              handleChange("operatingHub", e.target.value)
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          >
                            {OPERATING_HUBS.map((hub) => (
                              <option key={hub} value={hub}>
                                {hub}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Years in Business */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Years in Transport Business
                          </label>
                          <select
                            value={formData.yearsInBusiness}
                            onChange={(e) =>
                              handleChange("yearsInBusiness", e.target.value)
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          >
                            <option value="Less than 1 year">
                              Less than 1 year
                            </option>
                            <option value="1-3 years">1 – 3 Years</option>
                            <option value="3-5 years">3 – 5 Years</option>
                            <option value="5-10 years">5 – 10 Years</option>
                            <option value="10+ years">
                              10+ Years (Established)
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Types of Fleets Component (Search, Select, and Custom Write) */}
                      <div id="selectedFleetTypes" className="mt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <label className="block text-xs font-bold text-slate-700">
                            Types of Fleets Available{" "}
                            <span className="text-rose-500">*</span>
                          </label>
                          <span className="text-[11px] text-slate-500">
                            Search and select presets, or write your own custom fleet type name
                          </span>
                        </div>

                        {/* Selected Fleet Tags Display */}
                        <div className="min-h-12 p-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-wrap items-center gap-2 mb-3">
                          {formData.selectedFleetTypes.length === 0 ? (
                            <span className="text-xs text-slate-400 px-2 italic">
                              No fleet types selected yet. Search below or type custom name...
                            </span>
                          ) : (
                            formData.selectedFleetTypes.map((type, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-xl bg-white border border-orange-200 text-xs font-bold text-slate-900 shadow-2xs group"
                              >
                                <Bus className="w-3.5 h-3.5 text-primary" />
                                <span>{type}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFleetType(type)}
                                  className="w-5 h-5 rounded-lg hover:bg-rose-100 hover:text-rose-600 text-slate-400 flex items-center justify-center transition-colors ml-1 cursor-pointer"
                                  title={`Remove ${type}`}
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </span>
                            ))
                          )}
                        </div>
                        {errors.selectedFleetTypes && (
                          <p className="text-rose-500 text-xs mb-3 font-medium">
                            {errors.selectedFleetTypes}
                          </p>
                        )}

                        {/* Search & Custom Input Bar */}
                        <div className="relative" ref={dropdownRef}>
                          <div className="flex items-center gap-2">
                            <div className="relative grow">
                              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                              <input
                                type="text"
                                value={fleetSearchQuery}
                                onFocus={() => setIsDropdownOpen(true)}
                                onChange={(e) => {
                                  setFleetSearchQuery(e.target.value);
                                  setIsDropdownOpen(true);
                                }}
                                onKeyDown={handleFleetKeyDown}
                                placeholder="Search fleet types or write custom name (e.g. Scania Metrolink, Volvo 9600)..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white text-slate-900 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                              {fleetSearchQuery && (
                                <button
                                  type="button"
                                  onClick={() => setFleetSearchQuery("")}
                                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>

                            {/* Add Button if custom query typed */}
                            {fleetSearchQuery.trim() && (
                              <button
                                type="button"
                                onClick={() => addFleetType(fleetSearchQuery)}
                                className="shrink-0 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Add &quot;{fleetSearchQuery.trim()}&quot;</span>
                              </button>
                            )}
                          </div>

                          {/* Dropdown Options List */}
                          {isDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full mt-1.5 z-30 max-h-60 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl p-2 space-y-1">
                              {/* Custom option prompt if typed */}
                              {canAddCustom && (
                                <button
                                  type="button"
                                  onClick={() => addFleetType(fleetSearchQuery)}
                                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-orange-50 text-primary hover:bg-orange-100 flex items-center justify-between text-xs font-bold border border-dashed border-orange-300 transition-colors cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <Plus className="w-4 h-4 text-primary" />
                                    <span>
                                      Add custom fleet: &quot;
                                      {fleetSearchQuery.trim()}&quot;
                                    </span>
                                  </div>
                                  <span className="text-[10px] uppercase font-bold text-slate-400">
                                    Press Enter
                                  </span>
                                </button>
                              )}

                              {/* Filtered Preset Fleet Types */}
                              {filteredPresets.length > 0 ? (
                                filteredPresets.map((preset) => {
                                  const isAlreadySelected =
                                    formData.selectedFleetTypes.some(
                                      (item) =>
                                        item.toLowerCase() ===
                                        preset.toLowerCase()
                                    );

                                  return (
                                    <button
                                      type="button"
                                      key={preset}
                                      onClick={() => {
                                        if (isAlreadySelected) {
                                          removeFleetType(preset);
                                        } else {
                                          addFleetType(preset);
                                        }
                                      }}
                                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                                        isAlreadySelected
                                          ? "bg-slate-100 font-bold text-primary"
                                          : "hover:bg-slate-50 text-slate-700"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Bus className="w-3.5 h-3.5 text-slate-400" />
                                        <span>{preset}</span>
                                      </div>
                                      {isAlreadySelected ? (
                                        <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                                          <Check className="w-3.5 h-3.5" /> Added
                                        </span>
                                      ) : (
                                        <Plus className="w-3.5 h-3.5 text-slate-400" />
                                      )}
                                    </button>
                                  );
                                })
                              ) : !canAddCustom ? (
                                <div className="p-4 text-center text-xs text-slate-400">
                                  No matching preset found. Type custom name and
                                  press Enter!
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>

                        {/* Popular Quick-Add Pills */}
                        <div className="mt-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                            Quick Suggestions:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {POPULAR_QUICK_PICKS.map((quickPick) => {
                              const isSelected =
                                formData.selectedFleetTypes.some(
                                  (item) =>
                                    item.toLowerCase() ===
                                    quickPick.toLowerCase()
                                );
                              return (
                                <button
                                  type="button"
                                  key={quickPick}
                                  onClick={() => {
                                    if (isSelected) {
                                      removeFleetType(quickPick);
                                    } else {
                                      addFleetType(quickPick);
                                    }
                                  }}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 cursor-pointer ${
                                    isSelected
                                      ? "bg-primary text-white border-primary font-bold shadow-2xs"
                                      : "bg-white border-slate-200 text-slate-600 hover:border-primary"
                                  }`}
                                >
                                  <span>{quickPick}</span>
                                  {isSelected ? (
                                    <Check className="w-3 h-3" />
                                  ) : (
                                    <Plus className="w-3 h-3" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Additional Notes & Commercial Verification Checkbox */}
                    <div className="border-t border-slate-100 pt-6">
                      {/* Notes / Special Features */}
                      <div className="mb-5">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Additional Details / Depot Locations (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.notes}
                          onChange={(e) =>
                            handleChange("notes", e.target.value)
                          }
                          placeholder="Mention your garage locations, chauffeur count, interstate all-India tourist permits, or specialized onboard amenities..."
                          className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-slate-50/50 text-slate-900 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>

                      {/* Consent & Compliance Checkbox */}
                      <div
                        id="agreedToTerms"
                        className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/60"
                      >
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.agreedToTerms}
                            onChange={(e) =>
                              handleChange("agreedToTerms", e.target.checked)
                            }
                            className="mt-1 w-4 h-4 rounded-md text-primary focus:ring-primary border-slate-300 cursor-pointer"
                          />
                          <span className="text-xs text-slate-700 leading-relaxed font-medium">
                            I hereby declare that all vehicles in our fleet hold
                            valid commercial tourist permits (All-India / State),
                            active fitness certificates, and comprehensive
                            passenger insurance. I understand that Bus Mantra
                            operates under strict punctuality and safety
                            standards. <span className="text-rose-500">*</span>
                          </span>
                        </label>
                        {errors.agreedToTerms && (
                          <p className="text-rose-500 text-xs mt-2 pl-7 font-semibold">
                            {errors.agreedToTerms}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit Action */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>
                          Your documents are encrypted and protected under our vendor NDA.
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm tracking-wide shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Vendor Registration</span>
                            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Vendor FAQ Accordion */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-primary" />
                <span>Partner Clarifications</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                Frequently Asked Questions by Fleet Owners
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200/90 bg-white/80 overflow-hidden shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Vendor Support Bar */}
            <div className="mt-10 p-6 rounded-3xl border border-slate-200 bg-linear-to-r from-orange-500/10 via-amber-500/10 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-sm font-bold text-slate-950">
                  Have questions before onboarding?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Talk directly with our Partner Onboarding Desk for fleet tie-ups and bulk contracts.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="tel:+919876543210"
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 hover:text-primary transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>+91 9876543210</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}