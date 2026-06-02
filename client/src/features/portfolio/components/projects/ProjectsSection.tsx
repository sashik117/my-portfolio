"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageProvider";
import { useProjects } from "../../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import ProjectDetailsModal from "./ProjectDetailsModal";
import ProjectFilterBar from "./ProjectFilterBar";

export default function ProjectsSection() {
  const { locale, t } = useLanguage();
  const {
    activeFilter,
    filters,
    selectedProject,
    setActiveFilter,
    setSelectedProject,
    visibleProjects
  } = useProjects(locale);

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

        <ProjectFilterBar
          activeFilter={activeFilter}
          allLabel={t.projects.all}
          filters={filters}
          onFilterChange={setActiveFilter}
        />
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project._id}
            detailsLabel={t.projects.details}
            featuredLabel={t.projects.featured}
            index={index}
            project={project}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      <ProjectDetailsModal
        liveLabel={t.projects.live}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
