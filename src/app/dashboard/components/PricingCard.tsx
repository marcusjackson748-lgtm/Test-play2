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
    <div className="relative rounded-[28px] p-7 overflow-hidden bg-gradient-to-br from-[#F6E7A8] via-[#F4D48C] to-[#F1C38A]">
      {/* Dotted decorative pattern */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-32 h-32 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <span className="text-black font-bold text-lg">{label}</span>
        {plan === "standard" && (
          <span className="bg-[#22C55E] text-white text-xs font-medium px-3 py-1.5 rounded-full">
            100% Off
          </span>
        )}
      </div>

      <div className="flex items-end gap-3 relative z-10">
        {oldPrice && (
          <span className="text-black/40 text-2xl line-through font-medium mb-2">
            {oldPrice}
          </span>
        )}
        <span className="text-black font-extrabold text-[64px] sm:text-[72px] leading-none">
          {price}
        </span>
        <span className="text-black text-sm font-medium mb-2">/ for the 1st month</span>
      </div>
    </div>
  );
}
