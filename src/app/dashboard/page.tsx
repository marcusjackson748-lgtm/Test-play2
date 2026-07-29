"use client";

import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import BillingModal from "./components/billing/BillingModal";
import {
  Paperclip,
  ChevronDown,
  Globe,
  Settings,
  Mic,
  ArrowUp,
  Smartphone,
  MonitorSmartphone,
  FileText,
} from "lucide-react";

const projectTypes = [
  { id: "web", label: "Web App", icon: MonitorSmartphone },
  { id: "mobile", label: "Mobile App", icon: Smartphone },
  { id: "landing", label: "Landing Page", icon: FileText },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [activeType, setActiveType] = useState("web");
  const [composerFocused, setComposerFocused] = useState(false);

  return (
    <>
      <TopBar
        onMenuClick={() => setSidebarOpen(true)}
        onUpgradeClick={() => setBillingOpen(true)}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onUpgradeClick={() => setBillingOpen(true)}
      />
      <BillingModal open={billingOpen} onClose={() => setBillingOpen(false)} />

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <h1 className="text-[44px] md:text-[52px] font-semibold text-white text-center leading-tight max-w-2xl">
          Where ideas become reality
        </h1>

        <div className="flex items-center gap-3 mt-8 overflow-x-auto max-w-full px-2 pb-1">
          {projectTypes.map((type) => {
            const Icon = type.icon;
            const active = activeType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex items-center gap-2 h-[42px] px-5 rounded-full text-sm font-medium whitespace-nowrap transition-all active:scale-[0.98] ${
                  active
                    ? "bg-white/[0.12] text-white"
                    : "bg-white/[0.04] text-[#8F939A] hover:bg-white/[0.07]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {type.label}
              </button>
            );
          })}
        </div>

        <div
          className={`w-full md:w-[760px] mt-10 rounded-[28px] bg-[rgba(22,22,26,0.72)] backdrop-blur-2xl border border-white/[0.08] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-shadow duration-300 ${
            composerFocused
              ? "shadow-[0_0_0_1px_rgba(52,245,160,0.3),0_20px_60px_rgba(0,0,0,0.35)]"
              : ""
          }`}
        >
          <textarea
            onFocus={() => setComposerFocused(true)}
            onBlur={() => setComposerFocused(false)}
            placeholder="Build me an e-commerce platform with…"
            rows={3}
            className="w-full bg-transparent text-white text-base placeholder:text-[#8F939A] resize-none outline-none"
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors active:scale-[0.98]">
                <Paperclip className="w-4 h-4 text-white/70" />
              </button>
              <button className="h-10 px-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center gap-1 text-sm text-white/80 transition-colors active:scale-[0.98]">
                E-1
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors active:scale-[0.98]">
                <Globe className="w-4 h-4 text-white/70" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors active:scale-[0.98]">
                <Settings className="w-4 h-4 text-white/70" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors active:scale-[0.98]">
                <Mic className="w-4 h-4 text-white/70" />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#34F5A0] flex items-center justify-center hover:brightness-110 transition-all active:scale-[0.98]">
                <ArrowUp className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
