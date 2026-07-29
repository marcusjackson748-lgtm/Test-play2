"use client";

import React, { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-1 p-6 md:p-10 space-y-8">
      
      {/* Top Banner & Quick Stats Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brandBorder pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="inline-block w-1.5 h-1.5 rounded-sm bg-brandGreen" />
            <span className="font-mono text-xs text-brandGreen uppercase tracking-wider">Dashboard Matrix</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans">
            Neural Command Center
          </h1>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-xs font-mono bg-white/[0.05] hover:bg-white/[0.1] text-white/80 border border-brandBorder rounded transition-all">
            EXPORT_LOGS
          </button>
          <button className="px-4 py-2 text-xs font-mono bg-brandGreen hover:opacity-90 text-black font-semibold rounded shadow-[0_0_20px_rgba(142,240,138,0.4)] transition-all">
            + DEPLOY_AGENT
          </button>
        </div>
      </div>

      {/* Telemetry Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-lg bg-white/[0.02] border border-brandBorder relative overflow-hidden backdrop-blur-sm group hover:border-brandGreen/50 transition-all">
          <div className="absolute top-0 right-0 p-4 text-white/10 font-mono text-2xl font-bold select-none">01</div>
          <p className="font-mono text-xs text-brandTextSec uppercase tracking-wide">Active Agents</p>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white font-mono">1,024</span>
            <span className="text-xs font-mono text-brandGreen">+12.4%</span>
          </div>
          <div className="mt-4 w-full bg-white/[0.05] h-1 rounded-full overflow-hidden">
            <div className="bg-brandGreen h-full w-[75%]" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-lg bg-white/[0.02] border border-brandBorder relative overflow-hidden backdrop-blur-sm group hover:border-brandGreen/50 transition-all">
          <div className="absolute top-0 right-0 p-4 text-white/10 font-mono text-2xl font-bold select-none">02</div>
          <p className="font-mono text-xs text-brandTextSec uppercase tracking-wide">Inferences / Sec</p>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white font-mono">48.2K</span>
            <span className="text-xs font-mono text-brandGreen">+5.1%</span>
          </div>
          <div className="mt-4 w-full bg-white/[0.05] h-1 rounded-full overflow-hidden">
            <div className="bg-indigo-400 h-full w-[60%]" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-lg bg-white/[0.02] border border-brandBorder relative overflow-hidden backdrop-blur-sm group hover:border-brandGreen/50 transition-all">
          <div className="absolute top-0 right-0 p-4 text-white/10 font-mono text-2xl font-bold select-none">03</div>
          <p className="font-mono text-xs text-brandTextSec uppercase tracking-wide">Average Latency</p>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white font-mono">14.8ms</span>
            <span className="text-xs font-mono text-brandGreen">-2.3ms</span>
          </div>
          <div className="mt-4 w-full bg-white/[0.05] h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[90%]" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-lg bg-white/[0.02] border border-brandBorder relative overflow-hidden backdrop-blur-sm group hover:border-brandGreen/50 transition-all">
          <div className="absolute top-0 right-0 p-4 text-white/10 font-mono text-2xl font-bold select-none">04</div>
          <p className="font-mono text-xs text-brandTextSec uppercase tracking-wide">Cluster Health</p>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-brandGreen font-mono">99.9%</span>
            <span className="text-xs font-mono text-white/40">STABLE</span>
          </div>
          <div className="mt-4 w-full bg-white/[0.05] h-1 rounded-full overflow-hidden">
            <div className="bg-brandGreen h-full w-full" />
          </div>
        </div>

      </div>

      {/* Main Content Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Live Feed / Terminal */}
        <div className="lg:col-span-2 rounded-lg bg-[#010409] border border-brandBorder flex flex-col">
          
          {/* Terminal Header Tabs */}
          <div className="flex items-center justify-between border-b border-brandBorder px-4 py-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-white/60">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
              <span className="ml-2 font-semibold text-white/80">emergent-stream.log</span>
            </div>
            
            <div className="flex space-x-1 bg-white/[0.03] p-1 rounded border border-brandBorder">
              <button 
                onClick={() => setActiveTab("overview")} 
                className={`px-3 py-1 text-xs font-mono rounded transition-all ${activeTab === 'overview' ? 'bg-brandGreen text-black font-semibold' : 'text-white/60 hover:text-white'}`}
              >
                LIVE_STREAM
              </button>
              <button 
                onClick={() => setActiveTab("clusters")} 
                className={`px-3 py-1 text-xs font-mono rounded transition-all ${activeTab === 'clusters' ? 'bg-brandGreen text-black font-semibold' : 'text-white/60 hover:text-white'}`}
              >
                NODES
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 font-mono text-xs space-y-3 flex-1 min-h-[320px] text-white/70 overflow-y-auto">
            <div className="flex items-center space-x-2 text-white/40">
              <span>[15:42:01]</span>
              <span className="text-brandGreen">INFO</span>
              <span>Initializing QuickStart.Ai cinematic wrapper core...</span>
            </div>
            <div className="flex items-center space-x-2 text-white/40">
              <span>[15:42:03]</span>
              <span className="text-emerald-400">SUCCESS</span>
              <span>Cluster node [us-east-1a] synchronized successfully.</span>
            </div>
            <div className="flex items-center space-x-2 text-white/40">
              <span>[15:42:06]</span>
              <span className="text-brandGreen">INFO</span>
              <span>Spawning container runtime for Agent_v4.2...</span>
            </div>
            <div className="flex items-center space-x-2 text-white/40">
              <span>[15:42:09]</span>
              <span className="text-yellow-400">WARN</span>
              <span>Token usage threshold approaching 80% capacity limit.</span>
            </div>
            <div className="flex items-center space-x-2 text-white/40">
              <span>[15:42:12]</span>
              <span className="text-emerald-400">ONLINE</span>
              <span>Inference pipeline steady at 14.8ms response time.</span>
            </div>
            <div className="flex items-center space-x-2 text-brandGreen animate-pulse pt-2">
              <span>_</span>
            </div>
          </div>

        </div>

        {/* Right Column: Quick Status / Active Nodes */}
        <div className="rounded-lg bg-white/[0.02] border border-brandBorder p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-xs text-brandTextSec uppercase tracking-wide mb-4">Active Deployments</h3>
            
            <div className="space-y-3">
              <div className="p-3 rounded bg-white/[0.02] border border-brandBorder flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">agent-core-primus</p>
                  <p className="font-mono text-[10px] text-brandTextSec">us-east-1 • GPT-4o Engine</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-brandGreen shadow-[0_0_8px_rgba(142,240,138,0.8)]" />
              </div>

              <div className="p-3 rounded bg-white/[0.02] border border-brandBorder flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">synth-parser-v2</p>
                  <p className="font-mono text-[10px] text-brandTextSec">eu-west-1 • Claude 3.5 Sonnet</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-brandGreen shadow-[0_0_8px_rgba(142,240,138,0.8)]" />
              </div>

              <div className="p-3 rounded bg-white/[0.02] border border-brandBorder flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">vector-embed-cluster</p>
                  <p className="font-mono text-[10px] text-brandTextSec">ap-southeast-1 • Ada-002</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-brandGreen shadow-[0_0_8px_rgba(142,240,138,0.8)]" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brandBorder">
            <button className="w-full py-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-brandBorder text-xs font-mono text-white rounded transition-all">
              VIEW_ALL_NODES (12)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
