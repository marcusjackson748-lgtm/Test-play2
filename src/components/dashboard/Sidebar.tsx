import React from "react";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/[0.04] bg-[#080808] p-4">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-white">QuickStart.Ai</h2>
      </div>
      <nav className="flex flex-col gap-2 text-sm">
        <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-white/[0.02]">
          Overview
        </Link>
        <Link href="/billing" className="block px-3 py-2 rounded hover:bg-white/[0.02]">
          Billing
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
