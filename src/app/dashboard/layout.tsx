import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login");
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login"); 
  }

  return (
    // Base: Pure dark cinematic background with tailored text selection colors
    <div className="flex min-h-screen bg-[#020202] text-neutral-200 selection:bg-white/20 selection:text-white relative overflow-hidden">
      
      {/* Cinematic Background Glow (The "Emergent" lighting effect) */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.015] blur-[120px]" />

      <Sidebar />
      
      <div className="flex flex-1 flex-col z-10">
        <Topbar />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
