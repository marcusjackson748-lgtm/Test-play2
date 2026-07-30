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
      {/* Left: Menu Button */}
      <button
        onClick={onMenuClick}
        className="w-11 h-11 rounded-full bg-[#2B6CB0]/30 backdrop-blur-md flex items-center justify-center hover:bg-[#2B6CB0]/40 transition-colors active:scale-[0.98]"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Center: Apple-style Silver & AI Green Brand */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 pointer-events-none">
        {/* Silver Metallic Logo Mark with Glowing Green AI Core */}
        <div 
          className="w-8 h-8 rounded-[10px] flex items-center justify-center shadow-lg border border-white/[0.15]"
          style={{
            background: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)",
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#34F5A0] shadow-[0_0_10px_#34F5A0]" />
        </div>

        {/* Silver Metallic Typography */}
        <span 
          className="text-lg font-bold tracking-tight bg-clip-text text-transparent drop-shadow-sm"
          style={{
            backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)",
          }}
        >
          QuickStart<span className="text-[#34F5A0] drop-shadow-[0_0_8px_rgba(52,245,160,0.4)]">.Ai</span>
        </span>
      </div>

      {/* Right: Upgrade Button */}
      <button
        onClick={onUpgradeClick}
        className="h-11 px-5 rounded-full bg-gradient-to-b from-[#F9E58A] to-[#F4D96B] text-[#3a2e00] font-semibold text-sm shadow-[0_8px_24px_rgba(244,217,107,0.35)] hover:brightness-105 active:scale-[0.98] transition-all"
      >
        Upgrade Plan
      </button>
    </header>
  );
}
