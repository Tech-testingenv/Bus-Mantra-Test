"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  BusFront,
  UserRound,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, mode: isRegister ? "register" : "login" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Authentication failed.");
      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setShowPassword(false);
    setError("");
  };

  const inputClass =
    "h-10 w-full rounded-lg border border-border bg-white pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-focus-ring/10";
  const labelClass = "mb-1 block text-xs font-semibold text-text-primary";

  return (
    <main className="fixed inset-0 flex items-center justify-center overflow-hidden bg-surface-secondary px-3 py-3 sm:px-5">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex h-full max-h-190 w-full max-w-5xl flex-col">
        <div className="grid min-h-0 flex-1 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_60px_-25px_rgba(0,0,0,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Branding panel */}
          <section className="relative hidden flex-col justify-between overflow-hidden bg-surface-inverse p-7 text-white lg:flex xl:p-9">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/8" />
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/8" />
            <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-primary/40 blur-2xl" />
            <div className="absolute bottom-16 right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10">
              <Link href="/" aria-label="Bus Mantra home" className="inline-flex items-center">
                <Image
                  src="/logo-bus-mantra.jpeg"
                  alt="Bus Mantra"
                  width={190}
                  height={64}
                  priority
                  className="h-16 w-auto max-w-47.5 rounded-md object-contain bg-white px-2 py-2"
                />
              </Link>

              <div className="mt-8 xl:mt-12">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em]">
                    {isRegister ? "Join our community" : "Your next journey awaits"}
                  </span>
                </div>

                <h1 className="text-4xl font-black leading-[1.12] tracking-tight xl:text-[46px]">
                  {isRegister ? (
                    <>Your journey.<br /><span className="text-primary">Your account.</span></>
                  ) : (
                    <>Every journey<br />starts with<br /><span className="text-primary">one step.</span></>
                  )}
                </h1>

                <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
                  {isRegister
                    ? "Create your Bus Mantra account and make planning your next group journey simpler."
                    : "Welcome back to Bus Mantra. Sign in to explore destinations, manage bookings, and plan your next trip."}
                </p>

                <div className="mt-7 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                      <BusFront className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Travel your way</p>
                      <p className="mt-0.5 text-[10px] text-white/50">Explore buses for your journey</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Your account, your details</p>
                      <p className="mt-0.5 text-[10px] text-white/50">Keep your travel details organized</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-4">
              <p className="text-[10px] text-white/50">Travel better. Travel smarter.</p>
              <div className="flex gap-1.5">
                <span className="h-1.5 w-5 rounded-full bg-primary" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              </div>
            </div>
          </section>

          {/* Login and registration panel */}
          <section className="flex min-h-0 items-center justify-center overflow-y-auto px-5 py-3 sm:px-8 lg:overflow-hidden lg:px-8 xl:px-10">
            <div className="w-full max-w-sm py-1">
              <button
                type="button"
                onClick={() => router.back()}
                className="group mb-3 inline-flex items-center gap-2 text-xs font-semibold text-text-muted transition-colors hover:text-primary"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" />
                </span>
                Back
              </button>

              {/* Mobile logo */}
              <div className="mb-3 flex justify-center lg:hidden">
                <Link href="/" aria-label="Bus Mantra home" className="inline-flex items-center">
                  <Image
                    src="/logo-bus-mantra.jpeg"
                    alt="Bus Mantra"
                    width={170}
                    height={56}
                    priority
                    className="h-10 w-auto max-w-42.5 object-contain"
                  />
                </Link>
              </div>

              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1 w-6 rounded-full bg-primary" />
                  <span className="h-1 w-3 rounded-full bg-primary-subtle" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Your account</span>
                </div>
                <h2 className="text-3xl font-black tracking-tight text-text-primary sm:text-[34px]">
                  {isRegister ? "Create account" : "Welcome back"}
                </h2>
                <p className="mt-1 text-xs leading-5 text-text-muted">
                  {isRegister ? "Enter your details to get started." : "Sign in to continue your journey with Bus Mantra."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5">
                {isRegister && (
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>Full name</label>
                      <div className="relative">
                        <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Full name" autoComplete="name" required className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone number" autoComplete="tel" required className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className={labelClass}>Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" autoComplete="email" required className={inputClass} />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <label htmlFor="password" className="text-xs font-semibold text-text-primary">Password</label>
                    {!isRegister && (
                      <Link href="/forgot-password" className="text-[11px] font-bold text-primary transition-colors hover:text-primary-hover">Forgot password?</Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Enter your password" autoComplete={isRegister ? "new-password" : "current-password"} required className={`${inputClass} pr-10`} />
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-primary">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {isRegister && (
                  <div>
                    <label htmlFor="confirmPassword" className={labelClass}>Confirm password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                      <input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" autoComplete="new-password" required className={inputClass} />
                    </div>
                  </div>
                )}

                {!isRegister && (
                  <label className="flex cursor-pointer items-center gap-2 pt-0.5">
                    <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} className="h-3.5 w-3.5 cursor-pointer accent-primary" />
                    <span className="text-xs text-text-secondary">Remember me</span>
                  </label>
                )}

                {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}

                <button type="submit" className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg active:translate-y-0">
                  <span>{isRegister ? "Create Account" : "Sign In"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              <div className="my-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-text-muted">OR</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Keep the full sign-in/register prompt visible */}
              <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center text-xs leading-5 text-text-muted">
                <span>{isRegister ? "Already have an account?" : "New to Bus Mantra?"}</span>
                <button type="button" onClick={toggleMode} className="inline-flex min-h-6 items-center font-bold text-primary underline-offset-4 transition-colors hover:text-primary-hover hover:underline">
                  {isRegister ? "Sign in" : "Create an account"}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="text-center text-[10px] leading-4 text-text-muted">Your journey with Bus Mantra starts here.</span>
              </div>
            </div>
          </section>
        </div>

        <footer className="flex shrink-0 items-center justify-center pt-2">
          <p className="text-center text-[10px] text-text-muted">© {new Date().getFullYear()} Bus Mantra. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
