import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickStart.Ai | Emergent Dashboard",
  description: "Cinematic telemetry and agent management matrix.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col min-h-full bg-[#050607] text-white">
      {/* Base vignette for cinematic depth */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(142,240,138,0.04),_transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.4)_100%)]" />

      {children}
    </div>
  );
}
