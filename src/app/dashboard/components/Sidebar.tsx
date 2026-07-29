"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutGrid, Sparkles, ChevronRight, Coins } from "lucide-react";

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
  );
}
