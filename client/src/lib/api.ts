import type { ContactPayload, Project } from "@/types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5050/api";

export const mediaUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/assets")) return path;
  return `${API_URL.replace(/\/api$/, "")}${path}`;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options?.headers || {})
    }
  });

  if (!response.ok) {
    const message = await response
      .json()
      .then((data) => data.message)
      .catch(() => "Request failed");
    throw new Error(message);
  }

  return response.json();
}

export const portfolioApi = {
  getProjects: () => request<Project[]>("/projects"),
  sendMessage: (payload: ContactPayload) =>
    request<{ message: string }>("/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
};
