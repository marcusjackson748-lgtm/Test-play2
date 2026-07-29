export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/5 bg-[#050505]/60 px-8 py-4 backdrop-blur-xl transition-all">
      <div className="flex items-center gap-4">
        {/* Cinematic breadcrumb or page title */}
        <h1 className="text-sm font-medium tracking-widest text-neutral-300 uppercase">
          Dashboard <span className="text-neutral-700 mx-2">/</span> Overview
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Notification Dot */}
        <button className="relative text-neutral-400 transition-colors hover:text-neutral-100">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
        </button>

        {/* User Profile Pill */}
        <button className="flex items-center gap-3 rounded-full border border-white/5 bg-white/5 py-1.5 pl-1.5 pr-4 transition-all duration-300 hover:bg-white/10 hover:ring-1 hover:ring-white/20">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-400" />
          <span className="text-sm font-medium text-neutral-200">User</span>
        </button>
      </div>
    </header>
  );
}
