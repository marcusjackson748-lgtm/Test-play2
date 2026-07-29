"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Plus,
  LayoutGrid,
  Sparkles,
  Paperclip,
  ChevronDown,
  Globe,
  Settings,
  Mic,
  ArrowUp,
  ChevronRight,
  Coins,
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
  const [activeType, setActiveType] = useState("web");
  const [composerFocused, setComposerFocused] = useState(false);

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[72px] px-5 flex items-center justify-between relative z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-11 h-11 rounded-full bg-[#2B6CB0]/30 backdrop-blur-md flex items-center justify-center hover:bg-[#2B6CB0]/40 transition-colors active:scale-[0.98]"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        <button className="h-11 px-5 rounded-full bg-gradient-to-b from-[#F9E58A] to-[#F4D96B] text-[#3a2e00] font-semibold text-sm shadow-[0_8px_24px_rgba(244,217,107,0.35)] hover:brightness-105 active:scale-[0.98] transition-all">
          Upgrade Plan
        </button>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed top-0 left-0 h-full w-[320px] bg-[rgba(10,10,12,0.92)] backdrop-blur-2xl border-r border-white/[0.08] z-50 flex flex-col p-5"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-semibold text-white">QuickStart.Ai</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white/50 hover:text-white transition-colors"
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
                <button className="flex items-center gap-3 text-[#8F939A] hover:text-white transition-colors">
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-sm">Published Apps</span>
                </button>
                <button className="flex items-center gap-3 text-[#8F939A] hover:text-white transition-colors">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Showcase</span>
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

              {/* User Card */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#F4D96B]" />
                    <span className="text-white text-sm font-medium">0.00</span>
                  </div>
                  <button className="text-xs font-semibold text-[#3a2e00] bg-[#F4D96B] px-3 py-1.5 rounded-full hover:brightness-105 transition-all">
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

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <h1 className="text-[44px] md:text-[52px] font-semibold text-white text-center leading-tight max-w-2xl">
          Where ideas become reality
        </h1>

        {/* Project Type Selector */}
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

        {/* AI Prompt Composer */}
        <div
          className={`w-full md:w-[760px] mt-10 rounded-[28px] bg-[rgba(22,22,26,0.72)] backdrop-blur-2xl border border-white/[0.08] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-shadow duration-300 ${
            composerFocused ? "shadow-[0_0_0_1px_rgba(52,245,160,0.3),0_20px_60px_rgba(0,0,0,0.35)]" : ""
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
