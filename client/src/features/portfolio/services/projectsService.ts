import type { Project } from "@/types";
import { mediaUrl, portfolioApi } from "../api/portfolioApi";
import {
  fallbackProjects,
  projectCopy,
  projectTechnologyFilters,
  type ProjectLocale,
  type ProjectTechnologyFilter
} from "../data/projects";

const preserveUppercase = new Set(["ai", "api", "cms", "crud", "jwt", "mvs", "pdr", "ui", "ux"]);

export async function getPublishedProjects() {
  try {
    const projects = await portfolioApi.getProjects();
    return projects.length ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export function getProjectMediaUrl(path?: string) {
  return mediaUrl(path) || "/assets/project-aurora.svg";
}

export function formatProjectCategory(category?: string) {
  if (!category) return "Project";

  const normalized = category.trim().replace(/\s+/g, " ");

  if (/[^\x00-\x7F]/.test(normalized)) return normalized;

  return normalized
    .split(" ")
    .map((word) => {
      const lower = word.toLowerCase();
      if (preserveUppercase.has(lower)) return lower.toUpperCase();

      return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .join(" ");
}

export function getAvailableProjectFilters(projects: Project[]) {
  return projectTechnologyFilters.filter((filter) =>
    projects.some((project) => projectMatchesFilter(project, filter))
  );
}

export function filterProjectsByTechnology(
  projects: Project[],
  filterId: string,
  filters: readonly ProjectTechnologyFilter[]
) {
  if (filterId === "all") return projects;

  const filter = filters.find((item) => item.id === filterId);
  if (!filter) return projects;

  return projects.filter((project) => projectMatchesFilter(project, filter));
}

export function localizeProjects(projects: Project[], locale: ProjectLocale) {
  return projects.map((project) => localizeProject(project, locale));
}

export function localizeProject(project: Project, locale: ProjectLocale): Project {
  const copy = getProjectCopy(project, locale);

  if (!copy) return project;

  return {
    ...project,
    category: copy.category,
    description: copy.description,
    longDescription: copy.longDescription
  };
}

function projectMatchesFilter(project: Project, filter: ProjectTechnologyFilter) {
  const technologies = project.technologies.map((tech) => tech.toLowerCase());

  return filter.matches.some((match) =>
    technologies.some((tech) => tech === match.toLowerCase())
  );
}

function getProjectCopy(project: Project, locale: ProjectLocale) {
  const keys = [
    normalizeProjectKey(project.slug),
    normalizeProjectKey(project._id),
    normalizeProjectKey(project.title),
    normalizeProjectKey(project.title.split("/")[0])
  ];
  const match = keys.map((key) => projectCopy[key]).find(Boolean);

  return match?.[locale];
}

function normalizeProjectKey(value?: string) {
  return (value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
