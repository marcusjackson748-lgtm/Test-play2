'use client';

import { ChevronRight, Package, GitBranch, Check, Clock } from 'lucide-react';
import type { BranchFix } from '@/lib/branch-fixes';
import Link from 'next/link';

type BranchFixesCardProps = {
  fix: BranchFix;
};

export function BranchFixesCard({ fix }: BranchFixesCardProps) {
  const statusConfig = {
    available: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: Package, label: 'Available' },
    applied: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: Check, label: 'Applied' },
    pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: Clock, label: 'Pending' },
  };

  const config = statusConfig[fix.status];
  const StatusIcon = config.icon;

  return (
    <article className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-mono text-slate-400 bg-slate-900/50 px-2 py-1 rounded">
              {fix.branch}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-sky-300 transition">
            {fix.title}
          </h3>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
          <StatusIcon className={`w-4 h-4 ${config.text}`} />
          <span className={`text-xs font-semibold ${config.text}`}>{config.label}</span>
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-4 line-clamp-2">{fix.description}</p>

      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Packages ({fix.packages.length})</p>
        <div className="flex flex-wrap gap-2">
          {fix.packages.slice(0, 3).map((pkg, idx) => (
            <span
              key={idx}
              className="text-xs bg-slate-900/60 text-slate-300 px-2 py-1 rounded border border-slate-700/50"
            >
              {pkg.split('@').pop()}
            </span>
          ))}
          {fix.packages.length > 3 && (
            <span className="text-xs bg-slate-900/60 text-slate-400 px-2 py-1 rounded border border-slate-700/50">
              +{fix.packages.length - 3} more
            </span>
          )}
        </div>
      </div>

      <Link
        href={`/dashboard/branch-fixes/${fix.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 hover:text-sky-300 transition"
      >
        View Details
        <ChevronRight className="w-4 h-4" />
      </Link>
    </article>
  );
}
