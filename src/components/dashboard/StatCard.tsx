import React from "react";

type Props = {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
};

export function StatCard({ label, value, change, trend }: Props) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#131417] p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="text-xl font-semibold text-white">{value}</div>
      {change && (
        <div className={`text-sm ${trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
          {change}
        </div>
      )}
    </div>
  );
}

export default StatCard;
