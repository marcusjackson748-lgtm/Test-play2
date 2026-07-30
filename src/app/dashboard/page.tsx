"use client";

import React, { useState, useRef } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import BillingModal from "./components/billing/BillingModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paperclip,
  ChevronDown,
  Globe,
  Settings,
  Mic,
  ArrowUp,
  Smartphone,
  MonitorSmartphone,
  FileText,
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
} from "lucide-react";

const projectTypes = [
  { id: "web", label: "Web App", icon: MonitorSmartphone },
  { id: "mobile", label: "Mobile App", icon: Smartphone },
  { id: "landing", label: "Landing Page", icon: FileText },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [activeType, setActiveType] = useState("web");
  const [composerFocused, setComposerFocused] = useState(false);

  // Agent Selector State & Data
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("E-1");

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
    { id: "E-1", title: "E-1", subtitle: "Stable & thorough" },
    { id: "E-2", title: "E-2", subtitle: "Thorough & Relentless" },
    { id: "Prototype", title: "Prototype", subtitle: "Experimental Agent" },
    { id: "Mobile", title: "Mobile", subtitle: "Agent for mobile apps" },
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
        <h1 className="text-3xl md:text-[38px] font-semibold text-white text-center leading-tight max-w-2xl tracking-tight mb-2">
          What will you build today?
        </h1>

        <div className="flex items-center gap-3 mt-6 mb-8 overflow-x-auto max-w-full px-2 pb-1">
          {projectTypes.map((type) => {
            const Icon = type.icon;
            const active = activeType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex items-center gap-2 h-[42px] px-5 rounded-full text-sm font-medium whitespace-nowrap transition-all active:scale-[0.98] border ${
                  active
                    ? "bg-white/[0.08] text-white border-white/[0.15]"
                    : "bg-white/[0.03] text-[#8F939A] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1]"
                }`}
              >
                <Icon className="w-4 h-4 text-[#8F939A]" />
                {type.label}
              </button>
            );
          })}
        </div>

        {/* Ambient atmospheric background bloom beneath container */}
        <div className="relative w-full md:w-[760px]">
          <div className="absolute -inset-2 bg-white/[0.02] rounded-[32px] blur-xl pointer-events-none transition-all duration-500" />

          {/* Premium AI Chat Input Container with Continuous 360-Degree Orbiting Highlight */}
          <div className="relative rounded-[24px] p-[1px] overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {/* Continuously moving 360-degree white highlight orbiter */}
            <div className="absolute inset-0 rounded-[24px] pointer-events-none overflow-hidden z-20">
              <div className="absolute -inset-[150%] animate-orbit-border bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_310deg,rgba(232,232,232,0.4)_340deg,#FFFFFF_355deg,transparent_360deg)]" />
            </div>

            {/* Inner Glass Box */}
            <div className="relative rounded-[23px] bg-[#161618] border border-[#3A3A42] backdrop-blur-2xl p-5 z-30">
              <textarea
                onFocus={() => setComposerFocused(true)}
                onBlur={() => setComposerFocused(false)}
                placeholder="Build me a clone of netflix..."
                rows={3}
                className="w-full bg-transparent text-white text-base placeholder:text-[#8F939A] resize-none outline-none"
              />

              <div className="flex items-center justify-between mt-4 relative">
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

                  {/* Attachment Clip Button */}
                  <button
                    onClick={() => setIsUploadPopoverOpen(!isUploadPopoverOpen)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all active:scale-[0.98] ${
                      isUploadPopoverOpen
                        ? "bg-white/[0.08] border-white/[0.2] text-white"
                        : "bg-white/[0.03] border-[#3A3A42] hover:bg-white/[0.06] hover:border-white/[0.12] text-[#8F939A] hover:text-white"
                    }`}
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  {/* E-1 Agent Selector Button with Preserved Green Accent */}
                  <button
                    onClick={() => setIsAgentModalOpen(true)}
                    className="h-10 px-3.5 rounded-full bg-white/[0.03] hover:bg-white/[0.06] flex items-center gap-2 text-sm text-white/90 transition-all active:scale-[0.98] border border-[#3A3A42] hover:border-white/[0.12] whitespace-nowrap"
                  >
                    <Bot className="w-4 h-4 text-[#34F5A0]" />
                    <span className="font-medium tracking-tight">E-1</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#8F939A]" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="w-10 h-10 rounded-full bg-white/[0.03] border border-[#3A3A42] hover:bg-white/[0.06] hover:border-white/[0.12] flex items-center justify-center transition-all active:scale-[0.98] text-[#8F939A] hover:text-white"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsAdvancedModalOpen(true)}
                    className="w-10 h-10 rounded-full bg-white/[0.03] border border-[#3A3A42] hover:bg-white/[0.06] hover:border-white/[0.12] flex items-center justify-center transition-all active:scale-[0.98] text-[#8F939A] hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/[0.03] border border-[#3A3A42] hover:bg-white/[0.06] hover:border-white/[0.12] flex items-center justify-center transition-all active:scale-[0.98] text-[#8F939A] hover:text-white">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.15] flex items-center justify-center hover:bg-white/[0.15] hover:border-white/[0.25] transition-all active:scale-[0.98] text-white">
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
                          ? "bg-[rgba(26,26,32,0.9)] border-[#34F5A0]/50 shadow-[0_0_15px_rgba(52,245,160,0.08)]"
                          : "bg-[rgba(18,18,22,0.6)] border-white/[0.05] hover:bg-[rgba(24,24,28,0.8)] hover:border-white/[0.1]"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold text-white">{agent.title}</h4>
                        <p className="text-xs text-[#8F939A] font-normal">{agent.subtitle}</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#34F5A0]/15 flex items-center justify-center text-[#34F5A0]">
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

      {/* Privacy Settings Modal Sheet */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl p-4">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-md bg-[#121215] border border-white/[0.08] rounded-[24px] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-base font-semibold text-white tracking-tight">Privacy Settings</h3>
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5">
                <div
                  onClick={() => {
                    setSelectedPrivacy("public");
                    setIsPrivacyModalOpen(false);
                  }}
                  className={`p-4 rounded-[18px] cursor-pointer transition-all duration-200 flex items-center justify-between border ${
                    selectedPrivacy === "public"
                      ? "bg-[rgba(26,26,32,0.9)] border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      : "bg-[rgba(18,18,22,0.6)] border-white/[0.05] hover:bg-[rgba(24,24,28,0.8)] hover:border-white/[0.1]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPrivacy === "public" ? "border-white" : "border-white/40"}`}>
                        {selectedPrivacy === "public" && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">Public</h4>
                        <Globe className="w-3.5 h-3.5 text-[#8F939A]" />
                      </div>
                      <p className="text-xs text-[#8F939A] font-normal">Anyone can view and explore</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setSelectedPrivacy("private");
                    setIsPrivacyModalOpen(false);
                  }}
                  className={`p-4 rounded-[18px] cursor-pointer transition-all duration-200 flex items-center justify-between border ${
                    selectedPrivacy === "private"
                      ? "bg-[rgba(26,26,32,0.9)] border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      : "bg-[rgba(18,18,22,0.6)] border-white/[0.05] hover:bg-[rgba(24,24,28,0.8)] hover:border-white/[0.1]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPrivacy === "private" ? "border-white" : "border-white/40"}`}>
                        {selectedPrivacy === "private" && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">Private</h4>
                        <Lock className="w-3.5 h-3.5 text-[#8F939A]" />
                      </div>
                      <p className="text-xs text-[#8F939A] font-normal">Only visible to yourself, unless shared</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-[#F4D96B]">
                    <Globe className="w-3 h-3" />
                    <span>Standard</span>
                  </div>
                </div>
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
                      <Bot className="w-4 h-4 text-[#34F5A0]" />
                    </div>
                    <span className="text-sm font-semibold text-white flex items-center gap-1">
                      Maxx <Sparkles className="w-3.5 h-3.5 text-[#34F5A0]" />
                    </span>
                  </div>
                  <button
                    onClick={() => setMaxxEnabled(!maxxEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${maxxEnabled ? "bg-[#34F5A0]" : "bg-white/20"}`}
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

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8F939A]">
                      Select MCP Tools
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F4D96B] text-black">
                      New
                    </span>
                  </div>
                  <div className="p-4 rounded-[18px] bg-[rgba(18,18,22,0.6)] border border-white/[0.05] hover:border-white/[0.1] cursor-pointer flex items-center justify-between transition-all">
                    <div className="flex items-center gap-3">
                      <Paperclip className="w-4 h-4 text-[#8F939A]" />
                      <span className="text-sm font-semibold text-white">Select MCP Tools</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8F939A]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8F939A] px-1">
                    GitHub
                  </span>
                  <div className="p-4 rounded-[18px] bg-[rgba(18,18,22,0.6)] border border-white/[0.05] hover:border-white/[0.1] cursor-pointer flex items-center justify-between transition-all">
                    <div className="flex items-center gap-3">
                      <Github className="w-4 h-4 text-[#8F939A]" />
                      <span className="text-sm font-semibold text-white">Connect to GitHub</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8F939A]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8F939A] px-1">
                    Select Template
                  </span>
                  <div className="p-4 rounded-[18px] bg-[rgba(18,18,22,0.6)] border border-white/[0.05] hover:border-white/[0.1] cursor-pointer flex items-center justify-between transition-all">
                    <span className="text-sm font-semibold text-white">Full Stack Template</span>
                    <ChevronRight className="w-4 h-4 text-[#8F939A]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Keyframe animation for continuous 360-degree border orbiting highlight */}
      <style jsx>{`
        @keyframes borderOrbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-orbit-border {
          animation: borderOrbit 2s linear infinite;
        }
      `}</style>
    </>
  );
}
