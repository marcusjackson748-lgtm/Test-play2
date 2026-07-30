"use client";

import React from "react";

interface PricingCardProps {
  plan: "standard" | "pro";
}

export default function PricingCard({ plan }: PricingCardProps) {
  const price = plan === "standard" ? "$0" : "$200";
  const oldPrice = plan === "standard" ? "$20" : null;
  const label = plan === "standard" ? "Standard ⚡" : "Pro ⚡";

  return (
    <div className="relative rounded-[22px] p-5 overflow-hidden bg-gradient-to-br from-[#F6E7A8] via-[#F4D48C] to-[#F1C38A]">
      {/* Dotted decorative pattern */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-24 h-24 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "8px 8px",
        }}
      />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="text-black font-bold text-base">{label}</span>
        {plan === "standard" && (
          <span className="bg-[#22C55E] text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            100% Off
          </span>
        )}
      </div>

      <div className="flex items-end gap-2 relative z-10 flex-wrap">
        {oldPrice && (
          <span className="text-black/40 text-lg line-through font-medium mb-1">
            {oldPrice}
          </span>
        )}
        <span className="text-black font-extrabold text-[44px] sm:text-[48px] leading-none">
          {price}
        </span>
        <span className="text-black text-xs font-medium mb-1.5">/ for the 1st month</span>
      </div>
    </div>
  );
}
