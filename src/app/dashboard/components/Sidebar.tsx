"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutGrid, Sparkles, ChevronDown, Coins } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onUpgradeClick: () => void;
}

export default function Sidebar({ open, onClose, onUpgradeClick }: SidebarProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed top-0 left-0 h-full w-[320px] bg-[rgba(10,10,12,0.95)] backdrop-blur-2xl border-r border-white/[0.08] z-50 flex flex-col p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-semibold text-white tracking-tight">QuickStart.Ai</span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* New Task Button */}
            <button className="flex items-center gap-3 mb-6 group text-left">
              <span className="w-8 h-8 rounded-full bg-[#34F5A0] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(52,245,160,0.2)]">
                <Plus className="w-4 h-4 text-black stroke-[2.5]" />
              </span>
              <span className="text-[#34F5A0] font-semibold text-base">New Task</span>
            </button>

            {/* Nav items */}
            <nav className="space-y-3 mb-8">
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[#8F939A] hover:text-white hover:bg-white/[0.04] transition-colors text-left">
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm font-medium">Published Apps</span>
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[#8F939A] hover:text-white hover:bg-white/[0.04] transition-colors text-left">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Showcase</span>
              </button>
            </nav>

            {/* Recent Tasks Section */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8F939A]/70 mb-4 px-1">
                Recent Tasks
              </h3>
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <p className="text-[#8F939A] text-sm font-medium mb-1">No tasks yet</p>
                <p className="text-[#8F939A]/60 text-xs leading-relaxed">
                  Create your first task to start building
                </p>
              </div>
            </div>

            {/* Bottom Stack: Credits Card on top, User Profile Dock below */}
            <div className="space-y-2 mt-4 pt-4 border-t border-white/[0.06]">
              {/* Credits & Upgrade Card */}
              <div className="rounded-[20px] bg-white/[0.03] border border-white/[0.08] p-3.5 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#F4D96B]/15 flex items-center justify-center">
                    <Coins className="w-4 h-4 text-[#F4D96B]" />
                  </div>
                  <span className="text-white text-sm font-semibold tracking-wide">0.00</span>
                </div>
                <button
                  onClick={onUpgradeClick}
                  className="text-xs font-semibold text-black bg-gradient-to-r from-[#F4D96B] to-[#E2C244] px-4 py-2 rounded-full hover:brightness-105 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,217,107,0.25)]"
                >
                  <span>Upgrade</span>
                  <span className="w-4 h-4 rounded-full bg-black/15 flex items-center justify-center text-[10px] font-bold">+</span>
                </button>
              </div>

              {/* User Profile Card */}
              <div className="rounded-[20px] bg-white/[0.02] border border-white/[0.06] p-3 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-inner">
                    J
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-white text-sm font-medium leading-tight truncate">
                      Jephthah Kofi
                    </p>
                    <p className="text-[#8F939A] text-xs leading-tight underline underline-offset-2 truncate">
                      jephthahkofi@gmail.com
                    </p>
                  </div>
                </div>
                <button className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#8F939A] hover:text-white transition-all flex-shrink-0">
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
