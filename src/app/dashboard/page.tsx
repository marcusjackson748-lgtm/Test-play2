"use client";

import React, { useState, useRef } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import BillingModal from "./components/billing/BillingModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ChevronDown,
  Globe,
  Settings,
  Mic,
  ArrowUp,
  Bot,
  X,
  Check,
  Lock,
  Sparkles,
  Cpu,
  Github,
  ChevronRight,
  Image as ImageIcon,
  Camera,
  FolderOpen,
  Triangle,
  ChevronUp,
  Square,
} from "lucide-react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [composerFocused, setComposerFocused] = useState(false);

  // Agent Selector State & Data
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("Standard");

  // Privacy Settings Modal State & Data
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [selectedPrivacy, setSelectedPrivacy] = useState("public");

  // Advanced Controls Modal State & Data
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [maxxEnabled, setMaxxEnabled] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Auto");

  // File Upload Popover & Hidden Inputs State
  const [isUploadPopoverOpen, setIsUploadPopoverOpen] = useState(false);
  const photoLibraryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const chooseFilesInputRef = useRef<HTMLInputElement>(null);

  const agents = [
    { id: "Standard", title: "Standard", subtitle: "Balanced & general purpose" },
    { id: "E-1", title: "E-1", subtitle: "Stable & thorough" },
    { id: "E-2", title: "E-2", subtitle: "Thorough & Relentless" },
    { id: "Prototype", title: "Prototype", subtitle: "Experimental Agent" },
  ];

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
        {/* Headline matching bolt.new style */}
        <h1 className="text-[28px] sm:text-[36px] font-medium text-white text-center leading-tight max-w-2xl tracking-tight mb-8">
          How can Bolt help you today? <span className="text-[#8F939A] text-xl font-normal">(or /command)</span>
        </h1>

        {/* Bolt.new style Chat Box with White Lighting Flash Border */}
        <div
          className={`w-full md:w-[760px] rounded-[24px] bg-[rgba(18,18,22,0.85)] backdrop-blur-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300 relative ${
            composerFocused
              ? "border border-white shadow-[0_0_25px_rgba(255,255,255,0.25)]"
              : "border border-white/[0.12] hover:border-white/[0.25]"
          }`}
        >
          <textarea
            onFocus={() => setComposerFocused(true)}
            onBlur={() => setComposerFocused(false)}
            placeholder="Type a message or prompt..."
            rows={3}
            className="w-full bg-transparent text-white text-base placeholder:text-[#8F939A] resize-none outline-none px-1"
          />

          <div className="flex items-center justify-between mt-3 relative pt-2 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 relative">
              {/* Hidden File Inputs */}
              <input
                type="file"
                ref={photoLibraryInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  console.log(e.target.files);
                  setIsUploadPopoverOpen(false);
                }}
              />
              <input
                type="file"
                ref={cameraInputRef}
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  console.log(e.target.files);
                  setIsUploadPopoverOpen(false);
                }}
              />
              <input
                type="file"
                ref={chooseFilesInputRef}
                multiple
                className="hidden"
                onChange={(e) => {
                  console.log(e.target.files);
                  setIsUploadPopoverOpen(false);
                }}
              />

              {/* Upload Popover Menu */}
              <AnimatePresence>
                {isUploadPopoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 bottom-12 z-50 w-64 bg-[#121215] border border-white/[0.08] rounded-[22px] p-2 shadow-[0_16px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl space-y-1"
                  >
                    <button
                      onClick={() => photoLibraryInputRef.current?.click()}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/90 hover:bg-white/[0.06] transition-colors text-left"
                    >
                      <span className="font-medium">Photo Library</span>
                      <ImageIcon className="w-4 h-4 text-[#8F939A]" />
                    </button>
                    <button
                      onClick={() => cameraInputRef.current?.click()}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/90 hover:bg-white/[0.06] transition-colors text-left"
                    >
                      <span className="font-medium">Take Photo or Video</span>
                      <Camera className="w-4 h-4 text-[#8F939A]" />
                    </button>
                    <button
                      onClick={() => chooseFilesInputRef.current?.click()}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/90 hover:bg-white/[0.06] transition-colors text-left"
                    >
                      <span className="font-medium">Choose Files</span>
                      <FolderOpen className="w-4 h-4 text-[#8F939A]" />
                    </button>
                    <button
                      onClick={() => {
                        alert("Google Drive integration triggered");
                        setIsUploadPopoverOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/90 hover:bg-white/[0.06] transition-colors text-left"
                    >
                      <span className="font-medium">Google Drive</span>
                      <Triangle className="w-4 h-4 text-[#8F939A]" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Plus / Attachment Button */}
              <button
                onClick={() => setIsUploadPopoverOpen(!isUploadPopoverOpen)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all active:scale-[0.98] ${
                  isUploadPopoverOpen
                    ? "bg-white/[0.12] border-white/30 text-white"
                    : "bg-white/[0.05] border-white/[0.08] hover:bg-white/[0.1] text-white/80"
                }`}
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Agent Selector Button ("Standard" / Dropdown) */}
              <button
                onClick={() => setIsAgentModalOpen(true)}
                className="h-8 px-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center gap-2 text-xs text-white/90 transition-all active:scale-[0.98] border border-white/[0.08]"
              >
                <span className="font-medium">{selectedAgent}</span>
                <ChevronDown className="w-3 h-3 text-[#8F939A]" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Select Button */}
              <button
                onClick={() => setIsAdvancedModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white transition-colors px-2 py-1"
              >
                <span>Select</span>
                <ChevronDown className="w-3 h-3 text-[#8F939A]" />
              </button>

              {/* Plan Button */}
              <button
                onClick={() => setBillingOpen(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white transition-colors px-2 py-1"
              >
                <span>Plan</span>
                <ChevronDown className="w-3 h-3 text-[#8F939A]" />
              </button>

              {/* Submit / Stop Action Button */}
              <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition-all active:scale-[0.98] shadow-sm">
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Select Agent Modal Sheet */}
      <AnimatePresence>
        {isAgentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl p-4">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-md bg-[#121215] border border-white/[0.08] rounded-[24px] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-base font-semibold text-white tracking-tight">Select Agent</h3>
                <button
                  onClick={() => setIsAgentModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5">
                {agents.map((agent) => {
                  const isSelected = selectedAgent === agent.id;
                  return (
                    <div
                      key={agent.id}
                      onClick={() => {
                        setSelectedAgent(agent.id);
                        setIsAgentModalOpen(false);
                      }}
                      className={`p-4 rounded-[18px] cursor-pointer transition-all duration-200 flex items-center justify-between border ${
                        isSelected
                          ? "bg-[rgba(26,26,32,0.9)] border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                          : "bg-[rgba(18,18,22,0.6)] border-white/[0.05] hover:bg-[rgba(24,24,28,0.8)] hover:border-white/[0.1]"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold text-white">{agent.title}</h4>
                        <p className="text-xs text-[#8F939A] font-normal">{agent.subtitle}</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
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

      {/* Advanced Controls Modal Sheet */}
      <AnimatePresence>
        {isAdvancedModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl p-4">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-md bg-[#121215] border border-white/[0.08] rounded-[24px] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-base font-semibold text-white tracking-tight">Advanced Controls</h3>
                <button
                  onClick={() => setIsAdvancedModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-[18px] bg-[rgba(18,18,22,0.6)] border border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-white flex items-center gap-1">
                      Maxx <Sparkles className="w-3.5 h-3.5 text-white" />
                    </span>
                  </div>
                  <button
                    onClick={() => setMaxxEnabled(!maxxEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${maxxEnabled ? "bg-white" : "bg-white/20"}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-black transition-transform ${maxxEnabled ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8F939A] px-1">
                    Select Model
                  </span>
                  <div className="p-4 rounded-[18px] bg-[rgba(18,18,22,0.6)] border border-white/[0.05] hover:border-white/[0.1] cursor-pointer flex items-center justify-between transition-all">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-[#8F939A]" />
                      <span className="text-sm font-semibold text-white">{selectedModel}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8F939A]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
