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
    <div className="flex flex-col min-h-full">
      {children}
    </div>
  );
}
