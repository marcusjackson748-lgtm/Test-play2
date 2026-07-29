import { createSupabaseServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect('/login');
  }

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-10">
      
      {/* Cinematic Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold tracking-tighter text-white">
          Overview
        </h1>
        <p className="text-sm text-neutral-500">
          Welcome back, <span className="text-neutral-300 font-medium">{user?.email ?? 'Commander'}</span>. All systems online.
        </p>
      </div>

      {/* Emergent-Style Stat Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        
        {/* Card 1: Revenue */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 transition-all duration-500 hover:border-white/10 hover:bg-[#0F0F0F]">
          {/* Subtle top-down gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Net Revenue</p>
            <div className="mt-4 flex items-baseline gap-3">
              <h2 className="text-4xl font-light tracking-tighter text-white">$45,231</h2>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                +20.1%
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Users */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 transition-all duration-500 hover:border-white/10 hover:bg-[#0F0F0F]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Active Now</p>
            <div className="mt-4 flex items-baseline gap-3">
              <h2 className="text-4xl font-light tracking-tighter text-white">1,204</h2>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                +12.5%
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: System Status */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 transition-all duration-500 hover:border-white/10 hover:bg-[#0F0F0F]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">System Status</p>
            <div className="mt-4 flex items-center gap-3 h-[40px]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-lg text-neutral-300">Operational</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Main Activity Area */}
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-medium text-neutral-200">Activity Stream</h3>
          <button className="text-sm text-neutral-500 transition-colors hover:text-white">View Complete Log</button>
        </div>
        
        {/* Placeholder for a chart or data table */}
        <div className="flex h-64 w-full items-center justify-center rounded-xl border border-white/[0.02] bg-[#050505] shadow-inner">
          <p className="text-sm text-neutral-600">Data visualization canvas will mount here.</p>
        </div>
      </div>

    </div>
  );
}
