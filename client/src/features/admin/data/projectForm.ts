import type { Project } from "@/types";
import type { ProjectForm } from "../types";

export const emptyProjectForm: ProjectForm = {
  title: "",
  description: "",
  longDescription: "",
  technologies: "",
  githubUrl: "",
  liveUrl: "",
  category: "Fullstack",
  featured: false,
  status: "published",
  image: null
};

export function projectToForm(project: Project): ProjectForm {
  return {
    title: project.title,
    description: project.description,
    longDescription: project.longDescription || "",
    technologies: project.technologies.join(", "),
    githubUrl: project.githubUrl || "",
    liveUrl: project.liveUrl || "",
    category: project.category || "Fullstack",
    featured: Boolean(project.featured),
    status: project.status || "published",
    image: null
  };
}

export function projectFormToPayload(form: ProjectForm) {
  const payload = new FormData();

  payload.set("title", form.title);
  payload.set("description", form.description);
  payload.set("longDescription", form.longDescription);
  payload.set("technologies", form.technologies);
  payload.set("githubUrl", form.githubUrl);
  payload.set("liveUrl", form.liveUrl);
  payload.set("category", form.category);
  payload.set("featured", String(form.featured));
  payload.set("status", form.status);
  if (form.image) payload.set("image", form.image);

  return payload;
}
