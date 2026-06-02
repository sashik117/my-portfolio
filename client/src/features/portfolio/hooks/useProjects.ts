"use client";

import type { Project } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { fallbackProjects, type ProjectLocale } from "../data/projects";
import {
  filterProjectsByTechnology,
  getAvailableProjectFilters,
  getPublishedProjects,
  localizeProject,
  localizeProjects
} from "../services/projectsService";

export function useProjects(locale: ProjectLocale) {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    let mounted = true;

    getPublishedProjects().then((data) => {
      if (mounted) setProjects(data);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const filters = useMemo(() => getAvailableProjectFilters(projects), [projects]);

  useEffect(() => {
    if (activeFilter !== "all" && !filters.some((filter) => filter.id === activeFilter)) {
      setActiveFilter("all");
    }
  }, [activeFilter, filters]);

  const localizedProjects = useMemo(
    () => localizeProjects(projects, locale),
    [locale, projects]
  );

  const visibleProjects = useMemo(
    () => filterProjectsByTechnology(localizedProjects, activeFilter, filters),
    [activeFilter, filters, localizedProjects]
  );

  const localizedSelectedProject = useMemo(
    () => (selectedProject ? localizeProject(selectedProject, locale) : null),
    [locale, selectedProject]
  );

  return {
    activeFilter,
    filters,
    selectedProject: localizedSelectedProject,
    setActiveFilter,
    setSelectedProject,
    visibleProjects
  };
}
