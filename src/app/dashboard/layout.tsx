import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickStart.Ai | Dashboard",
  description: "Where ideas become reality.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#060606] text-white overflow-hidden">
      {/* Deep blue-to-black atmospheric background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-[#1E5FAF]/40 via-[#0d1a2e] to-[#060606]" />
      {/* Center glow */}
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] -z-10 bg-[#2B6CB0]/20 blur-[140px] rounded-full" />

      {children}
    </div>
  );
}
