"use client";

import React, { useState } from "react";
import { Paperclip, Globe, SlidersHorizontal, Mic, ArrowUp, Bot, ChevronDown } from "lucide-react";
import { AgentSelectorModal } from "./sidebar/AgentSelectorModal"; // adjust path as needed

export default function PromptComposer() {
  const [selectedAgent, setSelectedAgent] = useState("E-1");
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  return (
    <div className="w-full bg-[#18181C] border border-white/[0.08] rounded-[24px] p-4 shadow-2xl backdrop-blur-2xl">
      {/* Input Text Area */}
      <textarea
        placeholder="Build me a dashboard for..."
        className="w-full bg-transparent text-white placeholder-[#8F939A] resize-none focus:outline-none min-h-[80px] text-base"
      />

      {/* Toolbar Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Attach Button */}
          <button className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#8F939A] hover:text-white transition-all">
            <Paperclip className="w-4 h-4" />
          </button>

          {/* E-1 Agent Selector Pill (Matches Screenshot 2) */}
          <button
            onClick={() => setIsAgentModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] transition-all"
          >
            <Bot className="w-4 h-4 text-[#67E8F9]" />
            <span className="text-sm font-medium">{selectedAgent}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8F939A]" />
          </button>
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#8F939A] hover:text-white transition-all">
            <Globe className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#8F939A] hover:text-white transition-all">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#8F939A] hover:text-white transition-all">
            <Mic className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-[#22C55E] flex items-center justify-center text-black hover:brightness-105 transition-all shadow-md">
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Agent Selector Modal (Opens Screenshot 3 interface) */}
      <AgentSelectorModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
      />
    </div>
  );
}
