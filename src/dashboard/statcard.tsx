interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({
  label,
  value,
  change,
  trend = "neutral",
}: StatCardProps) {
  const trendColor =
    trend === "up"
      ? "text-emerald-400"
      : trend === "down"
      ? "text-red-400"
      : "text-zinc-500";

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#131417] p-5">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-white">{value}</span>
        {change && <span className={`text-xs ${trendColor}`}>{change}</span>}
      </div>
    </div>
  );
}
