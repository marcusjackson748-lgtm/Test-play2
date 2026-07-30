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
    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-white" />
          </span>
          <span className="text-white text-sm font-medium">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
