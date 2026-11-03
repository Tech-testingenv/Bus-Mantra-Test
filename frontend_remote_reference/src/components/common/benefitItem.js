"use client";

import { CheckCircle2 } from "lucide-react";

/**
 * BenefitItem
 * Reusable included benefit badge for booking forms.
 *
 * @param {Object} props
 * @param {string} props.text - Benefit description
 * @param {string} [props.className=""] - Extra className
 */
export default function BenefitItem({ text, className = "" }) {
  return (
    <div
      className={`flex items-center gap-1.5 text-[10px] leading-5 text-text-secondary sm:text-[11px] ${className}`}
    >
      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
      <span>{text}</span>
    </div>
  );
}
