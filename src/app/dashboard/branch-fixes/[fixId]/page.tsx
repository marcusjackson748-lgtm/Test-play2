'use client';

import { getBranchFixById } from '@/lib/branch-fixes';
import { notFound } from 'next/navigation';
import { ArrowLeft, Copy, Check, FileJson, GitBranch, Package, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type FixDetailPageProps = {
  params: Promise<{ fixId: string }>;
};

export default async function FixDetailPage({ params }: FixDetailPageProps) {
  const { fixId } = await params;
  const fix = getBranchFixById(fixId);

  if (!fix) {
    notFound();
  }

  const statusConfig = {
    available: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: 'Available' },
    applied: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Applied' },
    pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Pending' },
  };

  const config = statusConfig[fix.status];

  return (
    <section className="space-y-6 px-6 py-8 lg:px-10">
      {/* Back Button */}
      <Link
        href="/dashboard/branch-fixes"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-sky-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Branch Fixes
      </Link>

      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
                <Zap className={`w-4 h-4 ${config.text}`} />
                <span className={`text-xs font-semibold ${config.text}`}>{config.label}</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{fix.title}</h1>
            <p className="text-slate-300 text-lg">{fix.description}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Branch Info */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="w-4 h-4 text-sky-400" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Branch</p>
          </div>
          <p className="text-lg font-bold text-white font-mono">{fix.branch}</p>
        </div>

        {/* Patch File */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileJson className="w-4 h-4 text-amber-400" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patch File</p>
          </div>
          <p className="text-sm font-mono text-slate-300 truncate">{fix.patchFile}</p>
        </div>

        {/* Created Date */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Created</p>
          <p className="text-lg font-bold text-white">{new Date(fix.createdAt).toLocaleDateString()}</p>
          <p className="text-xs text-slate-500">{new Date(fix.createdAt).toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Packages */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="flex items-center gap-2 mb-6">
          <Package className="w-5 h-5 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Packages Included</h2>
          <span className="ml-auto bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
            {fix.packages.length} packages
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {fix.packages.map((pkg, idx) => {
            const [copied, setCopied] = useState(false);
            const handleCopy = () => {
              navigator.clipboard.writeText(pkg);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            };

            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 rounded-xl bg-slate-900/50 border border-slate-700/50 p-3 hover:border-slate-600 transition group"
              >
                <code className="text-sm font-mono text-slate-200">{pkg}</code>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Installation Instructions */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">How to Apply This Fix</h2>
        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Step 1: Checkout Branch</p>
            <code className="block text-sm font-mono text-emerald-400 break-all">git checkout "{fix.branch}"</code>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Step 2: Apply Patch</p>
            <code className="block text-sm font-mono text-emerald-400 break-all">
              git am --ignore-space-change --ignore-whitespace branch-fixes/{fix.patchFile}
            </code>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Step 3: Push Changes</p>
            <code className="block text-sm font-mono text-emerald-400 break-all">git push origin HEAD:refs/heads/"{fix.branch}"</code>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Or Run All Fixes At Once</p>
            <code className="block text-sm font-mono text-emerald-400 break-all">bash branch-fixes/apply-all-fixes.sh</code>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-4 justify-center">
        <Link
          href={`/dashboard/branch-fixes`}
          className="rounded-xl bg-sky-400 px-6 py-3 font-medium text-slate-950 hover:bg-sky-300 transition"
        >
          Back to Fixes
        </Link>
      </div>
    </section>
  );
}
