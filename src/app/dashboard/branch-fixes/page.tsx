import { BranchFixesList } from '@/components/dashboard/branch-fixes-list';
import { Zap } from 'lucide-react';

export default function BranchFixesPage() {
  return (
    <section className="space-y-8 px-6 py-8 lg:px-10">
      {/* Header */}
      <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Branch Fixes</p>
          </div>
          <h1 className="text-3xl font-semibold text-white">Dependency & Configuration Patches</h1>
          <p className="text-slate-300">
            Manage and apply branch-specific fixes to resolve missing dependencies and configuration issues across component branches.
          </p>
        </div>
      </header>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Fixes</p>
          <p className="text-2xl font-bold text-white">6</p>
          <p className="text-xs text-slate-500 mt-1">Available patches</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Affected Branches</p>
          <p className="text-2xl font-bold text-white">6</p>
          <p className="text-xs text-slate-500 mt-1">Component & feature branches</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Common Packages</p>
          <p className="text-2xl font-bold text-white">7+</p>
          <p className="text-xs text-slate-500 mt-1">Framer, Radix, AI, Markdown</p>
        </div>
      </div>

      {/* Fixes List */}
      <BranchFixesList />
    </section>
  );
}
