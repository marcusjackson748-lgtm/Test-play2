import { StatCard } from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold text-white">Overview</h1>
        <p className="mt-1 text-sm text-zinc-500">
          A snapshot of your account activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active users" value="1,204" change="+8.2%" trend="up" />
        <StatCard label="Requests today" value="42,918" change="+2.1%" trend="up" />
        <StatCard label="Error rate" value="0.4%" change="-0.1%" trend="up" />
        <StatCard label="Avg. latency" value="182ms" change="+14ms" trend="down" />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#131417] p-6">
        <h2 className="text-sm font-medium text-white">Recent activity</h2>
        <p className="mt-4 text-sm text-zinc-500">
          Nothing here yet — activity will show up once your app starts
          sending events.
        </p>
      </div>
    </div>
  );
}
