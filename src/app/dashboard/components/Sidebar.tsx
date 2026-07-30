"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutGrid, Sparkles, ChevronRight, Coins, X, Check } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onUpgradeClick: () => void;
}

export default function Sidebar({ open, onClose, onUpgradeClick }: SidebarProps) {
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
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed top-0 left-0 h-full w-[320px] bg-[rgba(10,10,12,0.92)] backdrop-blur-2xl border-r border-white/[0.08] z-50 flex flex-col p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-semibold text-white">QuickStart.Ai</span>
                <button
                  onClick={onClose}
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <button className="flex items-center gap-3 mb-6 group">
                <span className="w-8 h-8 rounded-full bg-[#34F5A0] flex items-center justify-center">
                  <Plus className="w-4 h-4 text-black" />
                </span>
                <span className="text-[#34F5A0] font-semibold text-base">New Task</span>
              </button>

              <nav className="space-y-4 mb-8">
                <button className="flex items-center gap-3 text-[#8F939A] hover:text-white transition-colors w-full text-left">
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-sm">Published Apps</span>
                </button>
                <button className="flex items-center gap-3 text-[#8F939A] hover:text-white transition-colors w-full text-left">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Showcase</span>
                </button>
                <button 
                  onClick={() => setIsAgentModalOpen(true)}
                  className="flex items-center gap-3 text-[#8F939A] hover:text-white transition-colors w-full text-left"
                >
                  <Sparkles className="w-4 h-4 text-[#67E8F9]" />
                  <span className="text-sm">AI Agents ({selectedAgent})</span>
                </button>
              </nav>

              <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-semibold text-white mb-4">Recent Tasks</h3>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                  <p className="text-[#8F939A] text-sm font-medium mb-1">No tasks yet</p>
                  <p className="text-[#8F939A]/70 text-xs">
                    Create your first task to start building
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#F4D96B]" />
                    <span className="text-white text-sm font-medium">0.00</span>
                  </div>
                  <button
                    onClick={onUpgradeClick}
                    className="text-xs font-semibold text-[#3a2e00] bg-[#F4D96B] px-3 py-1.5 rounded-full hover:brightness-105 transition-all"
                  >
                    Upgrade
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-[#2B6CB0] flex items-center justify-center text-white text-sm font-semibold">
                      Q
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium leading-tight">
                        QuickStart User
                      </p>
                      <p className="text-[#8F939A] text-xs leading-tight">
                        user@quickstart.ai
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8F939A]" />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* AI Agent Selector Modal */}
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
    </>
  );
}
