import type { AdminDashboardStats } from "../types";

type AdminStatsProps = {
  stats: AdminDashboardStats[];
};

export default function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[18px] border border-white/[0.10] bg-white/[0.06] p-4 backdrop-blur-xl"
        >
          <div className="text-xs font-black uppercase text-white/[0.42]">{stat.label}</div>
          <div className="mt-1 text-2xl font-black text-white">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
