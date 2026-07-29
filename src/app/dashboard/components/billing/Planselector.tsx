"use client";

import React from "react";
import { motion } from "framer-motion";

interface PlanSelectorProps {
  selected: "standard" | "pro";
  onSelect: (plan: "standard" | "pro") => void;
}

export default function PlanSelector({ selected, onSelect }: PlanSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Standard */}
      <motion.button
        onClick={() => onSelect("standard")}
        animate={
          selected === "standard"
            ? { boxShadow: "0 0 0 2px #22C55E, 0 0 24px rgba(34,197,94,0.25)" }
            : { boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }
        }
        transition={{ duration: 0.25 }}
        className="rounded-[24px] bg-[#18181B] p-5 text-left active:scale-[0.98]"
      >
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selected === "standard" ? "border-[#22C55E]" : "border-white/30"
            }`}
          >
            {selected === "standard" && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
            )}
          </span>
        </div>
        <p className="text-white font-bold text-[26px] mb-2">Standard</p>
        <div className="flex items-baseline gap-2">
          <span className="text-[#9CA3AF] text-base line-through">$20</span>
          <span className="text-[#22C55E] font-bold text-lg">$0</span>
        </div>
      </motion.button>

      {/* Pro */}
      <motion.button
        onClick={() => onSelect("pro")}
        animate={
          selected === "pro"
            ? { boxShadow: "0 0 0 2px #22C55E, 0 0 24px rgba(34,197,94,0.25)" }
            : { boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }
        }
        transition={{ duration: 0.25 }}
        className="rounded-[24px] bg-[#18181B] p-5 text-left active:scale-[0.98]"
      >
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selected === "pro" ? "border-[#22C55E]" : "border-white/30"
            }`}
          >
            {selected === "pro" && <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />}
          </span>
        </div>
        <p className="text-white font-bold text-[26px] mb-2">Pro</p>
        <div className="flex items-baseline gap-2">
          <span className="text-[#22C55E] font-bold text-lg">$200</span>
        </div>
      </motion.button>
    </div>
  );
}
