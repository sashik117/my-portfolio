"use client";

import type { Project } from "@/types";
import { ImagePlus, Plus, Save } from "lucide-react";
import type { FormEvent } from "react";
import type { ProjectForm } from "../types";

type ProjectEditorFormProps = {
  editing: Project | null;
  form: ProjectForm;
  loading: boolean;
  onFormChange: (updater: (value: ProjectForm) => ProjectForm) => void;
  onReset: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ProjectEditorForm({
  editing,
  form,
  loading,
  onFormChange,
  onReset,
  onSubmit
}: ProjectEditorFormProps) {
  return (
    <form onSubmit={onSubmit} className="glass h-fit rounded-[22px] p-5 xl:sticky xl:top-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white">
            {editing ? "Edit project" : "Add project"}
          </h2>
          <p className="mt-1 text-sm text-white/[0.48]">
            Change cards, links and images from one place.
          </p>
        </div>
        {editing && (
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-white/[0.10] px-3 py-2 text-xs font-black text-white/[0.62]"
          >
            New
          </button>
        )}
      </div>

      <div className="grid gap-4">
        <label>
          <span className="mb-2 block text-sm font-bold text-white/[0.62]">Title</span>
          <input
            className="input"
            value={form.title}
            onChange={(event) =>
              onFormChange((value) => ({ ...value, title: event.target.value }))
            }
            required
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-white/[0.62]">Short description</span>
          <textarea
            className="input min-h-24 resize-y"
            value={form.description}
            onChange={(event) =>
              onFormChange((value) => ({ ...value, description: event.target.value }))
            }
            required
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-white/[0.62]">Details</span>
          <textarea
            className="input min-h-28 resize-y"
            value={form.longDescription}
            onChange={(event) =>
              onFormChange((value) => ({ ...value, longDescription: event.target.value }))
            }
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-white/[0.62]">Technologies</span>
          <input
            className="input"
            value={form.technologies}
            onChange={(event) =>
              onFormChange((value) => ({ ...value, technologies: event.target.value }))
            }
            placeholder="React, Node.js, MongoDB"
            required
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-bold text-white/[0.62]">Category</span>
            <input
              className="input"
              value={form.category}
              onChange={(event) =>
                onFormChange((value) => ({ ...value, category: event.target.value }))
              }
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-white/[0.62]">Status</span>
            <select
              className="input"
              value={form.status}
              onChange={(event) =>
                onFormChange((value) => ({
                  ...value,
                  status: event.target.value as ProjectForm["status"]
                }))
              }
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-bold text-white/[0.62]">GitHub URL</span>
            <input
              className="input"
              value={form.githubUrl}
              onChange={(event) =>
                onFormChange((value) => ({ ...value, githubUrl: event.target.value }))
              }
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-white/[0.62]">Live URL</span>
            <input
              className="input"
              value={form.liveUrl}
              onChange={(event) =>
                onFormChange((value) => ({ ...value, liveUrl: event.target.value }))
              }
            />
          </label>
        </div>
        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/[0.10] bg-white/[0.06] p-4">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) =>
              onFormChange((value) => ({ ...value, featured: event.target.checked }))
            }
            className="h-5 w-5 accent-cyan-300"
          />
          <span className="text-sm font-bold text-white/[0.66]">Featured project</span>
        </label>
        <label className="rounded-2xl border border-dashed border-white/[0.16] bg-white/[0.05] p-5 text-center">
          <ImagePlus className="mx-auto text-electric" size={28} />
          <span className="mt-3 block text-sm font-bold text-white/[0.64]">
            {form.image ? form.image.name : "Upload preview image"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) =>
              onFormChange((value) => ({
                ...value,
                image: event.target.files?.[0] || null
              }))
            }
          />
        </label>
      </div>

      <button
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-ink transition hover:bg-electric disabled:opacity-60"
        disabled={loading}
      >
        {editing ? <Save size={17} /> : <Plus size={17} />}
        {loading ? "Saving" : editing ? "Save changes" : "Add project"}
      </button>
    </form>
  );
}
