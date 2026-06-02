import type { AdminTab } from "../types";

type AdminTabsProps = {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
};

const tabs: { label: string; value: AdminTab }[] = [
  { label: "Projects", value: "projects" },
  { label: "Messages", value: "messages" }
];

export default function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`rounded-xl border px-4 py-2 text-sm font-black transition ${
            activeTab === tab.value
              ? "border-electric bg-electric text-ink"
              : "border-white/[0.10] bg-white/[0.06] text-white/[0.62]"
          }`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
