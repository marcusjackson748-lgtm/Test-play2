"use client";

import React from "react";
import { Menu } from "lucide-react";

interface TopBarProps {
  onMenuClick: () => void;
  onUpgradeClick: () => void;
}

export default function TopBar({ onMenuClick, onUpgradeClick }: TopBarProps) {
  return (
    <header className="h-[72px] px-5 flex items-center justify-between relative z-30">
      {/* Left: Hamburger Menu Button matching reference */}
      <button
        onClick={onMenuClick}
        className="w-11 h-11 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] flex items-center justify-center hover:bg-white/[0.12] transition-colors active:scale-[0.98]"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-white stroke-[2]" />
      </button>

      {/* Center placeholder to maintain absolute balance if needed */}
      <div className="hidden md:block" />

      {/* Right: Upgrade Plan Button */}
      <button
        onClick={onUpgradeClick}
        className="h-11 px-5 rounded-full bg-gradient-to-b from-[#F9E58A] to-[#F4D96B] text-[#3a2e00] font-semibold text-sm shadow-[0_8px_24px_rgba(244,217,107,0.35)] hover:brightness-105 active:scale-[0.98] transition-all"
      >
        Upgrade Plan
      </button>
    </header>
  );
}
