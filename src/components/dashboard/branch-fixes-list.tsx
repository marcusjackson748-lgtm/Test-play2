'use client';

import { BranchFixesCard } from './branch-fixes-card';
import { getAllBranchFixes, getAllBranches } from '@/lib/branch-fixes';
import { useState } from 'react';
import { Filter } from 'lucide-react';

export function BranchFixesList() {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const allFixes = getAllBranchFixes();
  const branches = getAllBranches();

  const filteredFixes = selectedBranch === 'all'
    ? allFixes
    : allFixes.filter(fix => fix.branch === selectedBranch);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 text-slate-400 flex-shrink-0">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        <button
          onClick={() => setSelectedBranch('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition flex-shrink-0 ${
            selectedBranch === 'all'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
              : 'bg-slate-900/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
          }`}
        >
          All Fixes ({allFixes.length})
        </button>
        {branches.map(branch => {
          const count = allFixes.filter(f => f.branch === branch).length;
          return (
            <button
              key={branch}
              onClick={() => setSelectedBranch(branch)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition flex-shrink-0 whitespace-nowrap ${
                selectedBranch === branch
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
                  : 'bg-slate-900/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
              }`}
            >
              {branch.split('/').pop()} ({count})
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filteredFixes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400">No branch fixes found for the selected filter.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredFixes.map(fix => (
            <BranchFixesCard key={fix.id} fix={fix} />
          ))}
        </div>
      )}
    </div>
  );
}
