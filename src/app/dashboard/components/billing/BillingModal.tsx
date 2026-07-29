"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PlanSelector from "./PlanSelector";
import PricingCard from "./PricingCard";
import FeatureList from "./FeatureList";
import UpgradeButton from "./UpgradeButton";

interface BillingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BillingModal({ open, onClose }: BillingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "pro">("standard");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-40"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-0 inset-x-0 mx-auto w-[94%] sm:w-[96%] max-w-lg z-50 max-h-[92vh] overflow-y-auto rounded-t-[32px] bg-[rgba(20,20,24,0.92)] backdrop-blur-[28px] border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.45)] pb-10"
          >
            {/* Drag indicator */}
            <div className="flex justify-center pt-3">
              <span className="w-10 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-14 h-14 rounded-full bg-transparent border border-white/40 flex items-center justify-center hover:rotate-90 transition-transform duration-250 active:scale-[0.98]"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="px-6 pt-8">
              <h1 className="text-[38px] sm:text-[40px] font-bold text-white leading-[1.05]">
                Try QuickStart.Ai for free
              </h1>
              <p className="text-[#9CA3AF] text-lg font-medium mt-3">
                Choose your plan. Cancel anytime.
              </p>

              <div className="mt-8">
                <PlanSelector selected={selectedPlan} onSelect={setSelectedPlan} />
              </div>

              <div className="mt-6">
                <PricingCard plan={selectedPlan} />
              </div>

              <div className="mt-8">
                <FeatureList />
              </div>

              <div className="mt-8">
                <UpgradeButton />
              </div>

              <p className="text-[#8F939A] text-base font-medium text-center mt-4">
                Free for the first month, $20 after that. Cancel anytime.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
