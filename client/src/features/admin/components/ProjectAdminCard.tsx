"use client";

import { mediaUrl } from "@/lib/api";
import type { Project } from "@/types";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";

type ProjectAdminCardProps = {
  isFirst: boolean;
  isLast: boolean;
  project: Project;
  onDelete: (projectId: string) => void;
  onEdit: (project: Project) => void;
  onMove: (projectId: string, direction: "up" | "down") => void;
};

export default function ProjectAdminCard({
  isFirst,
  isLast,
  project,
  onDelete,
  onEdit,
  onMove
}: ProjectAdminCardProps) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-white/[0.06] backdrop-blur-xl">
      <div className="aspect-[1.7] bg-[#08101c] p-3">
        {project.imageUrl ? (
          <img
            src={mediaUrl(project.imageUrl)}
            alt={project.title}
            className="h-full w-full rounded-2xl object-contain"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm font-bold text-white/[0.38]">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-black text-white">{project.title}</h3>
            <p className="mt-1 text-xs font-bold uppercase text-white/[0.40]">
              {project.status}
            </p>
          </div>
          {project.featured && (
            <span className="rounded-full bg-mint px-2 py-1 text-[0.68rem] font-black uppercase text-ink">
              Featured
            </span>
          )}
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/[0.56]">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => onMove(project._id, "up")}
            disabled={isFirst}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-3 text-sm font-bold text-white/[0.70] disabled:cursor-not-allowed disabled:opacity-35"
            title="Move project up"
          >
            <ArrowUp size={15} />
            Up
          </button>
          <button
            onClick={() => onMove(project._id, "down")}
            disabled={isLast}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-3 text-sm font-bold text-white/[0.70] disabled:cursor-not-allowed disabled:opacity-35"
            title="Move project down"
          >
            <ArrowDown size={15} />
            Down
          </button>
          <button
            onClick={() => onEdit(project)}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-3 text-sm font-bold text-white/[0.70]"
          >
            <Pencil size={15} />
            Edit
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-coral/[0.25] bg-coral/[0.10] px-3 text-sm font-bold text-coral"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
