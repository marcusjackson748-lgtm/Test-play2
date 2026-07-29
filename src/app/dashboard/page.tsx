"use client";

import React, { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="relative flex-1 p-6 md:p-10 space-y-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-brandGreen/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo-500/[0.05] rounded-full blur-[120px]" />
      </div>

      {/* Top Banner & Quick Stats Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brandBorder pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="inline-block w-1.5 h-1.5 rounded-sm bg-brandGreen shadow-[0_0_6px_rgba(142,240,138,0.8)]" />
            <span className="font-mono text-xs text-brandGreen uppercase tracking-[0.2em]">
              Dashboard Matrix
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans">
            Neural Command Center
          </h1>
          <p className="text-xs text-brandTextSec mt-1 font-mono">
            Real-time orchestration across all active deployments
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-xs font-mono bg-white/[0.03] hover:bg-white/[0.07] text-white/70 border border-brandBorder rounded-md transition-all duration-200">
            EXPORT_LOGS
          </button>
          <button className="px-4 py-2 text-xs font-mono bg-brandGreen hover:brightness-110 text-black font-semibold rounded-md shadow-[0_0_24px_rgba(142,240,138,0.35)] transition-all duration-200">
            + DEPLOY_AGENT
          </button>
        </div>
      </div>

      {/* Telemetry Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: "01", label: "Active Agents", value: "1,024", delta: "+12.4%", bar: "w-[75%]", barColor: "bg-brandGreen", deltaColor: "text-brandGreen" },
          { id: "02", label: "Inferences / Sec", value: "48.2K", delta: "+5.1%", bar: "w-[60%]", barColor: "bg-indigo-400", deltaColor: "text-brandGreen" },
          { id: "03", label: "Average Latency", value: "14.8ms", delta: "-2.3ms", bar: "w-[90%]", barColor: "bg-emerald-400", deltaColor: "text-brandGreen" },
          { id: "04", label: "Cluster Health", value: "99.9%", delta: "STABLE", bar: "w-full", barColor: "bg-brandGreen", deltaColor: "text-white/40", valueColor: "text-brandGreen" },
        ].map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-xl bg-white/[0.02] border border-brandBorder relative overflow-hidden backdrop-blur-sm group hover:border-brandGreen/40 hover:bg-white/[0.03] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 text-white/[0.06] font-mono text-2xl font-bold select-none">
              {m.id}
            </div>
            <p className="font-mono text-[11px] text-brandTextSec uppercase tracking-widest">
              {m.label}
            </p>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className={`text-3xl font-bold font-mono ${m.valueColor ?? "text-white"}`}>
                {m.value}
              </span>
              <span className={`text-xs font-mono ${m.deltaColor}`}>{m.delta}</span>
            </div>
            <div className="mt-4 w-full bg-white/[0.05] h-[3px] rounded-full overflow-hidden">
              <div className={`${m.barColor} h-full ${m.bar} transition-all duration-700`} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Live Feed / Terminal */}
        <div className="lg:col-span-2 rounded-xl bg-[#010409] border border-brandBorder flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between border-b border-brandBorder px-4 py-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-white/60">
              <span className="w-2 h-2 rounded-full bg-red-500/70" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <span className="w-2 h-2 rounded-full bg-green-500/70" />
              <span className="ml-2 font-semibold text-white/80">emergent-stream.log</span>
            </div>

            <div className="flex space-x-1 bg-white/[0.03] p-1 rounded-md border border-brandBorder">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1 text-xs font-mono rounded transition-all duration-200 ${
                  activeTab === "overview"
                    ? "bg-brandGreen text-black font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                LIVE_STREAM
              </button>
              <button
                onClick={() => setActiveTab("clusters")}
                className={`px-3 py-1 text-xs font-mono rounded transition-all duration-200 ${
                  activeTab === "clusters"
                    ? "bg-brandGreen text-black font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                NODES
              </button>
            </div>
          </div>

          <div className="p-5 font-mono text-xs space-y-3 flex-1 min-h-[320px] text-white/70 overflow-y-auto">
            {[
              { t: "[15:42:01]", tag: "INFO", tagColor: "text-brandGreen", msg: "Initializing QuickStart.Ai cinematic wrapper core..." },
              { t: "[15:42:03]", tag: "SUCCESS", tagColor: "text-emerald-400", msg: "Cluster node [us-east-1a] synchronized successfully." },
              { t: "[15:42:06]", tag: "INFO", tagColor: "text-brandGreen", msg: "Spawning container runtime for Agent_v4.2..." },
              { t: "[15:42:09]", tag: "WARN", tagColor: "text-yellow-400", msg: "Token usage threshold approaching 80% capacity limit." },
              { t: "[15:42:12]", tag: "ONLINE", tagColor: "text-emerald-400", msg: "Inference pipeline steady at 14.8ms response time." },
            ].map((line, i) => (
              <div key={i} className="flex items-center space-x-2 text-white/40">
                <span>{line.t}</span>
                <span className={line.tagColor}>{line.tag}</span>
                <span>{line.msg}</span>
              </div>
            ))}
            <div className="flex items-center space-x-2 text-brandGreen animate-pulse pt-2">
              <span>_</span>
            </div>
          </div>
        </div>

        {/* Right Column: Active Deployments */}
        <div className="rounded-xl bg-white/[0.02] border border-brandBorder p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-xs text-brandTextSec uppercase tracking-widest mb-4">
              Active Deployments
            </h3>

            <div className="space-y-3">
              {[
                { name: "agent-core-primus", meta: "us-east-1 • GPT-4o Engine" },
                { name: "synth-parser-v2", meta: "eu-west-1 • Claude 3.5 Sonnet" },
                { name: "vector-embed-cluster", meta: "ap-southeast-1 • Ada-002" },
              ].map((node) => (
                <div
                  key={node.name}
                  className="p-3 rounded-lg bg-white/[0.02] border border-brandBorder flex items-center justify-between hover:border-brandGreen/30 transition-colors duration-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{node.name}</p>
                    <p className="font-mono text-[10px] text-brandTextSec">{node.meta}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-brandGreen shadow-[0_0_8px_rgba(142,240,138,0.8)]" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brandBorder">
            <button className="w-full py-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-brandBorder text-xs font-mono text-white rounded-md transition-all duration-200">
              VIEW_ALL_NODES (12)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
