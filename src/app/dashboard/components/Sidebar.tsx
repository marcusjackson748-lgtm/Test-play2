"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  LayoutGrid, 
  Sparkles, 
  ChevronRight, 
  Coins, 
  Clock, 
  Gift, 
  LogOut, 
  Settings, 
  User, 
  Globe, 
  Github, 
  Users, 
  HelpCircle, 
  ExternalLink, 
  Bot, 
  Sun, 
  Monitor, 
  Moon, 
  X, 
  ArrowLeftRight,
  Check
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onUpgradeClick: () => void;
}

export default function Sidebar({ open, onClose, onUpgradeClick }: SidebarProps) {
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"light" | "desktop" | "dark">("desktop");
  const [selectedAgent, setSelectedAgent] = useState("E-1");

  const agents = [
    { id: "E-1", title: "E-1", subtitle: "Stable & Thorough" },
    { id: "E-2", title: "E-2", subtitle: "Thorough & Relentless" },
    { id: "Prototype", title: "Prototype", subtitle: "Experimental Agent" },
    { id: "Mobile", title: "Mobile", subtitle: "Agent for mobile apps" },
  ];

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{ width: "320px" }}
              className="fixed top-0 left-0 h-full bg-[#09090B] bg-opacity-95 backdrop-blur-[24px] border-r border-[rgba(255,255,255,0.08)] z-50 flex flex-col justify-between shadow-[20px_0_50px_rgba(0,0,0,0.8)] overflow-y-auto"
            >
              {/* Scrollable Container */}
              <div className="p-5 space-y-6 pb-10">
                {/* 1. Brand Header */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-lg font-bold text-white tracking-tight">QuickStart.Ai</span>
                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-xl bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-white/70 hover:text-white hover:bg-[rgba(255,255,255,0.12)] transition-all"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. Primary Navigation */}
                <div className="space-y-4">
                  {/* New Task Primary Action */}
                  <button className="w-full py-3 px-4 rounded-xl bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] hover:bg-[rgba(34,197,94,0.18)] transition-all flex items-center gap-3 group shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                    <span className="w-7 h-7 rounded-full bg-[#22C55E] flex items-center justify-center text-black shadow-md group-hover:scale-105 transition-transform">
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </span>
                    <span className="text-[#22C55E] font-bold text-base tracking-wide">New Task</span>
                  </button>

                  {/* Nav Items */}
                  <nav className="space-y-1">
                    {[
                      { label: "Published Apps", icon: LayoutGrid },
                      { label: "Showcase", icon: Sparkles },
                      { label: "Templates", icon: LayoutGrid },
                      { label: "AI Agents", icon: Bot, action: () => setIsAgentModalOpen(true) },
                      { label: "Recent Tasks", icon: Clock },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          onClick={item.action}
                          className="w-full h-12 px-3 rounded-xl flex items-center gap-3 text-[#8F939A] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all group"
                        >
                          <Icon className="w-4 h-4 text-[#71717A] group-hover:text-white transition-colors" />
                          <span className="text-sm font-medium text-white">{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* 3. User Account / Workspace Panel */}
                <div className="p-4 rounded-[24px] bg-[rgba(24,24,28,0.78)] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-[24px] space-y-3 cursor-pointer group hover:border-[rgba(255,255,255,0.15)] transition-all">
                  <div>
                    <span className="text-[13px] text-[#71717A] underline decoration-[rgba(113,113,122,0.4)] underline-offset-4 block truncate">
                      user@quickstart.ai
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm shadow-md">
                        Q
                      </div>
                      <div>
                        <h4 className="text-[18px] font-bold text-white leading-tight tracking-tight">QuickStart Pro</h4>
                        <p className="text-[13px] text-[#9CA3AF]">Owner • 1 member</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#9CA3AF] group-hover:text-white transition-all">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 4. Credits & Upgrade Card */}
                <div className="p-4 rounded-[24px] bg-[rgba(24,24,28,0.78)] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-[24px] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-white">Credits</span>
                    <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.04)] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.06)]">
                      <Coins className="w-4 h-4 text-[#F4D96B]" />
                      <span className="text-white font-mono font-medium text-sm">0.00</span>
                    </div>
                  </div>
                  <button
                    onClick={onUpgradeClick}
                    className="relative group w-full py-3 px-4 rounded-xl font-semibold text-black text-sm flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 shadow-[0_0_20px_rgba(244,217,107,0.25)] hover:shadow-[0_0_25px_rgba(244,217,107,0.4)]"
                    style={{ background: "linear-gradient(135deg, #F4D96B 0%, #D4AF37 100%)" }}
                  >
                    <Sparkles className="w-4 h-4 text-black animate-pulse" />
                    <span>Upgrade</span>
                  </button>
                </div>

                {/* Referral Section */}
                <div className="p-3.5 rounded-xl bg-[rgba(103,232,249,0.05)] border border-[rgba(103,232,249,0.15)] flex items-center gap-3 cursor-pointer hover:bg-[rgba(103,232,249,0.08)] transition-all">
                  <div className="w-9 h-9 rounded-full bg-[rgba(103,232,249,0.15)] flex items-center justify-center text-[#67E8F9]">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[14px] font-bold text-[#67E8F9]">Refer and Earn $200</h5>
                    <p className="text-[12px] text-[#9CA3AF]">Invite friends to QuickStart.Ai</p>
                  </div>
                </div>

                {/* 5. Secondary Settings Menu */}
                <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] space-y-1">
                  {[
                    { label: "Manage Plan", icon: Settings, external: false },
                    { label: "Account Settings", icon: User, external: false },
                    { label: "Language", icon: Globe, external: false },
                    { label: "Connect to GitHub", icon: Github, external: true },
                    { label: "AI Agents", icon: Bot, external: false, action: () => setIsAgentModalOpen(true) },
                    { label: "Community", icon: Users, external: true },
                    { label: "Help Center", icon: HelpCircle, external: true },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={item.action}
                        className="w-full h-12 px-3 rounded-xl flex items-center justify-between text-white hover:bg-[rgba(255,255,255,0.05)] transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#9CA3AF] group-hover:text-white transition-colors" />
                          <span className="text-sm font-medium text-white">{item.label}</span>
                        </div>
                        {item.external && <ExternalLink className="w-3.5 h-3.5 text-[#71717A] group-hover:text-white transition-colors" />}
                      </button>
                    );
                  })}
                </div>

                {/* 6. Theme Switcher */}
                <div className="pt-2">
                  <div className="flex items-center justify-center p-1 bg-[rgba(24,24,28,0.78)] border border-[rgba(255,255,255,0.08)] rounded-full backdrop-blur-[24px]">
                    <button
                      onClick={() => setActiveTheme("light")}
                      className={`flex-1 h-8 rounded-full flex items-center justify-center transition-all ${
                        activeTheme === "light" ? "bg-[rgba(255,255,255,0.12)] text-white shadow-md" : "text-[#71717A] hover:text-white"
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveTheme("desktop")}
                      className={`flex-1 h-8 rounded-full flex items-center justify-center transition-all ${
                        activeTheme === "desktop" ? "bg-[rgba(255,255,255,0.12)] text-white shadow-md" : "text-[#71717A] hover:text-white"
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveTheme("dark")}
                      className={`flex-1 h-8 rounded-full flex items-center justify-center transition-all ${
                        activeTheme === "dark" ? "bg-[rgba(255,255,255,0.12)] text-white shadow-md" : "text-[#71717A] hover:text-white"
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 7. Logout Action */}
                <div className="pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <button className="w-full h-12 px-3 rounded-xl flex items-center gap-3 text-red-400 hover:bg-red-500/15 transition-all">
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-bold">Logout</span>
                  </button>
                </div>
              </div>

              {/* 8. Bottom Profile Dock (Sticky Footer) */}
              <div className="p-4 bg-[rgba(24,24,28,0.9)] border-t border-[rgba(255,255,255,0.08)] rounded-t-[24px] backdrop-blur-[24px] flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-inner">
                    Q
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="text-sm font-semibold text-white truncate">QuickStart User</h5>
                    <p className="text-xs text-[#71717A] underline decoration-[rgba(113,113,122,0.4)] underline-offset-2 truncate">
                      user@quickstart.ai
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAgentModalOpen(true)}
                  className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.12)] transition-all flex-shrink-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
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
            className="w-full max-w-lg bg-[#09090B] border border-[rgba(255,255,255,0.1)] rounded-[32px] p-6 shadow-2xl backdrop-blur-[24px] space-y-6 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[22px] font-bold text-white tracking-tight">Select Agent</h3>
              <button
                onClick={() => setIsAgentModalOpen(false)}
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.12)] transition-all"
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
                    onClick={() => setSelectedAgent(agent.id)}
                    style={{ borderRadius: "22px" }}
                    className={`p-5 cursor-pointer transition-all duration-300 flex items-center justify-between border ${
                      isSelected
                        ? "bg-[rgba(24,24,28,0.95)] border-[#67E8F9] shadow-[0_0_20px_rgba(103,232,249,0.15)]"
                        : "bg-[rgba(24,24,28,0.6)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(24,24,28,0.8)] hover:border-[rgba(255,255,255,0.12)]"
                    }`}
                  >
                    <div className="space-y-1">
                      <h4 className="text-[18px] font-bold text-white">{agent.title}</h4>
                      <p className="text-[15px] text-[#9CA3AF]">{agent.subtitle}</p>
                    </div>
                    {isSelected && (
                      <div className="w-7 h-7 rounded-full bg-[rgba(103,232,249,0.15)] flex items-center justify-center text-[#67E8F9]">
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
