import { Check } from "lucide-react";

const PLAN = {
  name: "Pro",
  price: "$29",
  interval: "/month",
  renews: "August 27, 2026",
  features: [
    "Unlimited projects",
    "Priority support",
    "Custom domains",
    "Team seats (up to 5)",
  ],
};

const INVOICES = [
  { date: "Jul 1, 2026", amount: "$29.00", status: "Paid" },
  { date: "Jun 1, 2026", amount: "$29.00", status: "Paid" },
  { date: "May 1, 2026", amount: "$29.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold text-white">Billing</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Manage your plan and view past invoices.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#131417] p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-emerald-400">
              Current plan
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-white">
                {PLAN.name}
              </span>
              <span className="text-sm text-zinc-500">
                {PLAN.price}
                {PLAN.interval}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Renews on {PLAN.renews}
            </p>
          </div>
          <button className="rounded-lg border border-white/[0.08] px-4 py-2 text-sm text-zinc-300 hover:bg-white/[0.04]">
            Change plan
          </button>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PLAN.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-zinc-400"
            >
              <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#131417]">
        <div className="border-b border-white/[0.06] px-6 py-4">
          <h2 className="text-sm font-medium text-white">Invoice history</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((invoice) => (
              <tr
                key={invoice.date}
                className="border-t border-white/[0.06] text-zinc-300"
              >
                <td className="px-6 py-3">{invoice.date}</td>
                <td className="px-6 py-3">{invoice.amount}</td>
                <td className="px-6 py-3">
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
