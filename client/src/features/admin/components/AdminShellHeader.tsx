"use client";

import { Eye, LayoutDashboard, LogOut } from "lucide-react";

type AdminShellHeaderProps = {
  onLogout: () => void;
};

export default function AdminShellHeader({ onLogout }: AdminShellHeaderProps) {
  return (
    <header className="glass flex flex-col gap-4 rounded-[22px] p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-ink">
          <LayoutDashboard size={22} />
        </div>
        <div>
          <h1 className="text-xl font-black text-white md:text-2xl">Portfolio CMS</h1>
          <p className="text-sm font-semibold text-white/[0.50]">
            Manage content without touching code
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <a
          href="/"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-4 text-sm font-bold text-white/[0.72] transition hover:border-electric/[0.40]"
        >
          <Eye size={17} />
          Preview
        </a>
        <button
          onClick={onLogout}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-4 text-sm font-bold text-white/[0.72] transition hover:border-coral/[0.50]"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </header>
  );
}
