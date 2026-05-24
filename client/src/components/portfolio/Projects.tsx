"use client";

import { fallbackProjects } from "@/lib/fallback-data";
import { mediaUrl, portfolioApi } from "@/lib/api";
import type { Project } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";

const preserveUppercase = new Set(["ai", "api", "cms", "crud", "jwt", "mvs", "pdr", "ui", "ux"]);

function formatCategory(category?: string) {
  if (!category) return "Project";

  return category
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => {
      const lower = word.toLowerCase();
      if (preserveUppercase.has(lower)) return lower.toUpperCase();

      return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .join(" ");
}

export default function Projects() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    portfolioApi
      .getProjects()
      .then((data) => {
        if (data.length) setProjects(data);
      })
      .catch(() => setProjects(fallbackProjects));
  }, []);

  const filters = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          projects
            .map((project) => project.category)
            .filter((category): category is string => Boolean(category))
        )
      )
    ],
    [projects]
  );

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section id="projects" className="section-shell">
      <motion.div
        className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <div className="eyebrow">{t.projects.eyebrow}</div>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-copy">
            {t.projects.copy}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                activeFilter === filter
                  ? "border-electric bg-electric text-ink"
                  : "border-white/[0.12] bg-white/[0.06] text-white/[0.68] hover:border-electric/[0.42]"
              }`}
            >
              {filter === "All" ? t.projects.all : formatCategory(filter)}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <motion.article
            key={project._id}
            className="group overflow-hidden rounded-[24px] border border-white/[0.10] bg-white/[0.06] shadow-lift backdrop-blur-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.58, delay: index * 0.06 }}
            whileHover={{ y: -8 }}
          >
            <button
              type="button"
              onClick={() => setSelected(project)}
              className="block w-full text-left"
              aria-label={`Open ${project.title}`}
            >
              <div className="relative aspect-[1.42] overflow-hidden border-b border-white/[0.10] bg-[#08101c] p-3">
                <img
                  src={mediaUrl(project.imageUrl) || "/assets/project-aurora.svg"}
                  alt={project.title}
                  className="h-full w-full rounded-2xl object-contain transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute left-4 top-4 rounded-full border border-white/[0.14] bg-black/[0.42] px-3 py-1 text-xs font-black text-white backdrop-blur-md">
                  {formatCategory(project.category)}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="rounded-full bg-mint px-2.5 py-1 text-[0.68rem] font-black uppercase text-ink">
                      {t.projects.featured}
                    </span>
                  )}
                </div>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/[0.58]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1 text-xs font-bold text-white/[0.62]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </button>
            <div className="flex items-center gap-2 border-t border-white/[0.10] p-4">
              {project.githubUrl && (
                <a
                  className="icon-button"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  aria-label={`${project.title} GitHub`}
                >
                  <Github size={18} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  className="icon-button"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Live demo"
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink size={18} />
                </a>
              )}
              <button
                className="ml-auto rounded-xl border border-white/[0.10] bg-white/[0.06] px-4 py-2 text-sm font-bold text-white/[0.72] transition hover:border-electric/[0.40]"
                onClick={() => setSelected(project)}
              >
                {t.projects.details}
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/[0.72] p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[28px] border border-white/[0.12] bg-ink shadow-lift"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[1.9] min-h-[220px] overflow-hidden border-b border-white/[0.10] bg-[#08101c] p-3">
                <img
                  src={mediaUrl(selected.imageUrl) || "/assets/project-aurora.svg"}
                  alt={selected.title}
                  className="h-full w-full rounded-2xl object-contain"
                />
                <button
                  className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/[0.12] bg-black/[0.45] text-white backdrop-blur"
                  onClick={() => setSelected(null)}
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="text-sm font-bold uppercase text-electric">
                  {formatCategory(selected.category)}
                </div>
                <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">
                  {selected.title}
                </h3>
                <p className="mt-5 max-w-3xl leading-8 text-white/[0.64]">
                  {selected.longDescription || selected.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/[0.70]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  {selected.liveUrl && <MagneticButton href={selected.liveUrl}>{t.projects.live}</MagneticButton>}
                  {selected.githubUrl && (
                    <MagneticButton href={selected.githubUrl} variant="secondary">
                      GitHub
                    </MagneticButton>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
