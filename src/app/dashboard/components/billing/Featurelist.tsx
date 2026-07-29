"use client";

import React from "react";
import { Check } from "lucide-react";

const features = [
  "100 credits/month",
  "Mobile app development",
  "Private project hosting",
  "GitHub integration",
];

export default function FeatureList() {
  return (
    <ul className="space-y-4">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </span>
          <span className="text-white text-[22px] font-medium">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
