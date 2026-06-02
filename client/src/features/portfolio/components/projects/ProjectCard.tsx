import type { Project } from "@/types";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { formatProjectCategory, getProjectMediaUrl } from "../../services/projectsService";

type ProjectCardProps = {
  detailsLabel: string;
  featuredLabel: string;
  index: number;
  project: Project;
  onSelect: (project: Project) => void;
};

export default function ProjectCard({
  detailsLabel,
  featuredLabel,
  index,
  project,
  onSelect
}: ProjectCardProps) {
  return (
    <motion.article
      className="group overflow-hidden rounded-[24px] border border-white/[0.10] bg-white/[0.06] shadow-lift backdrop-blur-xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.58, delay: index * 0.06 }}
      whileHover={{ y: -8 }}
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="block w-full text-left"
        aria-label={`Open ${project.title}`}
      >
        <div className="relative aspect-[1.42] overflow-hidden border-b border-white/[0.10] bg-[#08101c] p-3">
          <img
            src={getProjectMediaUrl(project.imageUrl)}
            alt={project.title}
            className="h-full w-full rounded-2xl object-contain transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute left-4 top-4 rounded-full border border-white/[0.14] bg-black/[0.42] px-3 py-1 text-xs font-black text-white backdrop-blur-md">
            {formatProjectCategory(project.category)}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-black text-white">{project.title}</h3>
            {project.featured && (
              <span className="rounded-full bg-mint px-2.5 py-1 text-[0.68rem] font-black uppercase text-ink">
                {featuredLabel}
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
          onClick={() => onSelect(project)}
        >
          {detailsLabel}
        </button>
      </div>
    </motion.article>
  );
}
