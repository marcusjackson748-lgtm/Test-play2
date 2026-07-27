import React from "react";

export function Topbar({ email }: { email: string }) {
  return (
    <header className="w-full border-b border-white/[0.04] p-4 flex items-center justify-between">
      <div>
        <span className="text-sm text-zinc-300">Welcome</span>
        <div className="text-xs text-zinc-400">{email}</div>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-sm text-zinc-300 hover:underline">Account</button>
      </div>
    </header>
  );
}

export default Topbar;
