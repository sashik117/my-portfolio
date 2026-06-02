import MagneticButton from "@/components/portfolio/MagneticButton";
import type { Project } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { formatProjectCategory, getProjectMediaUrl } from "../../services/projectsService";

type ProjectDetailsModalProps = {
  liveLabel: string;
  project: Project | null;
  onClose: () => void;
};

export default function ProjectDetailsModal({
  liveLabel,
  project,
  onClose
}: ProjectDetailsModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/[0.72] p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
                src={getProjectMediaUrl(project.imageUrl)}
                alt={project.title}
                className="h-full w-full rounded-2xl object-contain"
              />
              <button
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/[0.12] bg-black/[0.45] text-white backdrop-blur"
                onClick={onClose}
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <div className="text-sm font-bold uppercase text-electric">
                {formatProjectCategory(project.category)}
              </div>
              <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-5 max-w-3xl leading-8 text-white/[0.64]">
                {project.longDescription || project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/[0.70]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {project.liveUrl && <MagneticButton href={project.liveUrl}>{liveLabel}</MagneticButton>}
                {project.githubUrl && (
                  <MagneticButton href={project.githubUrl} variant="secondary">
                    GitHub
                  </MagneticButton>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
