"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export function Topbar({ email }: { email: string }) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/[0.06] bg-[#0a0a0b] px-8">
      <div className="text-sm text-zinc-500">Dashboard</div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-zinc-300 outline-none hover:bg-white/[0.04]">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
            <User className="h-3.5 w-3.5" strokeWidth={1.75} />
          </div>
          <span className="max-w-[160px] truncate">{email}</span>
          <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={8}
            className="min-w-[180px] rounded-lg border border-white/[0.08] bg-[#131417] p-1 shadow-xl shadow-black/40"
          >
            <DropdownMenu.Item
              onSelect={handleSignOut}
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-300 outline-none hover:bg-white/[0.06]"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
}
