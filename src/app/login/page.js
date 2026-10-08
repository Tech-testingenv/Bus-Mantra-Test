"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  BusFront,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sign in form:", formData);
  };

  return (
    <main className="min-h-[calc(100vh-1px)] overflow-hidden bg-neutral-50 flex items-center justify-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]">
          <section className="hidden lg:flex relative bg-neutral-950 text-white p-8 xl:p-10 flex-col justify-between overflow-hidden">
            <div className="absolute -top-28 -right-28 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl" />

            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-3 group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-orange flex items-center justify-center text-white font-black tracking-tight transition-transform duration-200 group-hover:scale-105">
                  BM
                </div>

                <span className="text-xl font-black tracking-tight">
                  BUS MANTRA
                </span>
              </Link>

              <div className="mt-14 max-w-md">
                <p className="text-brand-orange text-sm font-bold tracking-[0.18em] uppercase">
                  Welcome Back
                </p>

                <h1 className="mt-3 text-4xl xl:text-5xl font-black tracking-tight leading-[1.05]">
                  Your journey
                  <br />
                  starts here.
                </h1>

                <p className="mt-5 text-neutral-400 text-sm xl:text-base leading-6 max-w-sm">
                  Sign in to manage your bookings, explore destinations,
                  and keep your journeys with Bus Mantra organized.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 text-neutral-400 text-sm">
              <div className="w-9 h-9 rounded-lg border border-neutral-800 flex items-center justify-center">
                <BusFront className="w-4 h-4 text-brand-orange" />
              </div>

              <span>Travel better. Travel smarter.</span>
            </div>
          </section>

          <section className="p-6 sm:p-8 lg:p-10 xl:p-11">
            <div className="lg:hidden flex items-center justify-center mb-6">
              <Link
                href="/"
                className="flex items-center gap-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white font-black text-sm">
                  BM
                </div>

                <span className="text-lg font-black tracking-tight text-neutral-900">
                  BUS MANTRA
                </span>
              </Link>
            </div>

            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <p className="text-brand-orange text-sm font-bold tracking-wide">
                  ACCOUNT
                </p>

                <h2 className="mt-1.5 text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">
                  Sign in
                </h2>

                <p className="mt-2 text-sm sm:text-base text-neutral-500">
                  Welcome back. Please enter your details.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-neutral-800 mb-1.5"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-neutral-400" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                      className="w-full h-11 pl-11 pr-4 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-150 focus:border-brand-orange focus:ring-3 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-neutral-800"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-neutral-400" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="w-full h-11 pl-11 pr-11 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-150 focus:border-brand-orange focus:ring-3 focus:ring-orange-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-[18px] h-[18px]" />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-neutral-300 accent-brand-orange cursor-pointer"
                    />

                    <span className="text-sm text-neutral-600">
                      Remember me
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm shadow-orange-500/20 hover:shadow-md hover:shadow-orange-500/25 active:scale-[0.99] transition-all duration-200"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-xs font-medium text-neutral-400">
                    OR
                  </span>
                </div>
              </div>

              <p className="text-center text-sm text-neutral-500">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-3">
          © {new Date().getFullYear()} Bus Mantra. All rights reserved.
        </p>
      </div>
    </main>
  );
}