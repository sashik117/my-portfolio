import type { Message, Project } from "@/types";

export type AdminTab = "projects" | "messages";

export type LoginResponse = {
  token: string;
  admin: {
    email: string;
  };
};

export type ProjectForm = {
  title: string;
  description: string;
  longDescription: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  category: string;
  featured: boolean;
  status: "draft" | "published";
  image: File | null;
};

export type AdminDashboardStats = {
  label: string;
  value: number;
};

export type AdminDashboardData = {
  messages: Message[];
  projects: Project[];
};
