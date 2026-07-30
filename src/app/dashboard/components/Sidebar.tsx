"use client";

import React, { useState } from "react";
import { Paperclip, Bot, ChevronDown, Globe, SlidersHorizontal, Mic, ArrowUp, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PromptComposer() {
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("E-1");

  const agents = [
    { id: "E-1", title: "E-1", subtitle: "Stable & thorough" },
    { id: "E-2", title: "E-2", subtitle: "Thorough & Relentless" },
    { id: "Prototype", title: "Prototype", subtitle: "Experimental Agent" },
    { id: "Mobile", title: "Mobile", subtitle: "Agent for mobile apps" },
  ];

  return (
    <>
      {/* Main Composer Box */}
      <div className="w-full max-w-2xl mx-auto bg-[rgba(24,24,28,0.78)] border border-white/[0.08] rounded-[24px] p-4 shadow-2xl backdrop-blur-2xl">
        <textarea
          placeholder="Build me a dashboard for..."
          className="w-full bg-transparent text-white placeholder-[#8F939A] resize-none focus:outline-none min-h-[70px] text-base"
        />

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#8F939A] hover:text-white transition-all">
              <Paperclip className="w-4 h-4" />
            </button>

            {/* E-1 Agent Selector Button */}
            <button
              onClick={() => setIsAgentModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] transition-all"
            >
              <Bot className="w-4 h-4 text-[#67E8F9]" />
              <span className="text-sm font-medium">{selectedAgent}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8F939A]" />
            </button>
          </div>

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
      </div>

      {/* Select Agent Modal Sheet (Matches Screenshot 4) */}
      <AnimatePresence>
        {isAgentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[#09090B] border border-white/[0.1] rounded-[32px] p-6 shadow-2xl backdrop-blur-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[22px] font-bold text-white tracking-tight">Select Agent</h3>
                <button
                  onClick={() => setIsAgentModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white hover:bg-white/[0.12] transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {agents.map((agent) => {
                  const isSelected = selectedAgent === agent.id;
                  return (
                    <div
                      key={agent.id}
                      onClick={() => {
                        setSelectedAgent(agent.id);
                        setIsAgentModalOpen(false);
                      }}
                      style={{ borderRadius: "22px" }}
                      className={`p-5 cursor-pointer transition-all duration-300 flex items-center justify-between border ${
                        isSelected
                          ? "bg-[rgba(24,24,28,0.95)] border-[#67E8F9] shadow-[0_0_20px_rgba(103,232,249,0.15)]"
                          : "bg-[rgba(24,24,28,0.6)] border-white/[0.06] hover:bg-[rgba(24,24,28,0.8)] hover:border-white/[0.12]"
                      }`}
                    >
                      <div className="space-y-1">
                        <h4 className="text-[18px] font-bold text-white">{agent.title}</h4>
                        <p className="text-[15px] text-[#9CA3AF]">{agent.subtitle}</p>
                      </div>
                      {isSelected && (
                        <div className="w-7 h-7 rounded-full bg-[#67E8F9]/15 flex items-center justify-center text-[#67E8F9]">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
