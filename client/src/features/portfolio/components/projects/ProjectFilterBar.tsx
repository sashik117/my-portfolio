import type { ProjectTechnologyFilter } from "../../data/projects";

type ProjectFilterBarProps = {
  activeFilter: string;
  allLabel: string;
  filters: readonly ProjectTechnologyFilter[];
  onFilterChange: (filterId: string) => void;
};

export default function ProjectFilterBar({
  activeFilter,
  allLabel,
  filters,
  onFilterChange
}: ProjectFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {[{ id: "all", label: allLabel }, ...filters].map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition ${
            activeFilter === filter.id
              ? "border-electric bg-electric text-ink"
              : "border-white/[0.12] bg-white/[0.06] text-white/[0.68] hover:border-electric/[0.42]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
