import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickStart.Ai | Emergent Edition",
  description: "Cinematic AI architecture and lightning-fast deployment for next-gen agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#030712] text-[#f3f4f6] selection:bg-cyan-500 selection:text-black min-h-screen relative overflow-x-hidden`}
      >
        {/* Cinematic Background Glows & Vignette */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none -z-10" />

        {/* Emergent Shell Container */}
        <div className="flex flex-col min-h-screen border-x border-white/[0.08] max-w-7xl mx-auto shadow-2xl shadow-black">
          
          {/* Top Brand Nav / Telemetry Bar */}
          <header className="h-14 border-b border-white/[0.08] px-6 flex items-center justify-between backdrop-blur-md bg-[#030712]/80 sticky top-0 z-50">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-cyan-400 font-semibold uppercase">
                QuickStart.Ai <span className="text-white/40">// EMERGE</span>
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono text-white/50">
              <span className="hidden sm:inline">SYS_STATUS: <strong className="text-emerald-400">ONLINE</strong></span>
              <span className="border-l border-white/10 pl-4">LATENCY: <strong className="text-white/90">14ms</strong></span>
            </div>
          </header>

          {/* Main Dynamic Viewport */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>

          {/* Cinematic Footer */}
          <footer className="border-t border-white/[0.08] py-6 px-6 text-center text-xs font-mono text-white/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#030712]">
            <p>© {new Date().getFullYear()} QuickStart.Ai Inc. All rights reserved.</p>
            <div className="flex space-x-6 text-white/60">
              <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Telemetry</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Security</a>
            </div>
          </footer>

        </div>
      </body>
    </html>
  );
}
