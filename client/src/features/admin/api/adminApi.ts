import { API_URL } from "@/lib/api";
import type { Message, Project } from "@/types";
import type { AdminDashboardData, LoginResponse } from "../types";

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

async function adminRequest<T>(
  path: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const message = await response
      .json()
      .then((data) => data.message)
      .catch(() => "Request failed");
    throw new AdminApiError(message, response.status);
  }

  return response.json();
}

export const adminApi = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({ message: "Login failed" }));
      throw new AdminApiError(data.message, response.status);
    }

    return response.json() as Promise<LoginResponse>;
  },

  async refreshSession() {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      credentials: "include",
      method: "POST"
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({ message: "Refresh failed" }));
      throw new AdminApiError(data.message, response.status);
    }

    return response.json() as Promise<LoginResponse>;
  },

  async logout(token?: string) {
    await fetch(`${API_URL}/auth/logout`, {
      credentials: "include",
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
  },

  getCurrentAdmin(token: string) {
    return adminRequest<{ admin: LoginResponse["admin"] }>("/auth/me", token).then(
      (data) => data.admin
    );
  },

  async getDashboardData(token: string): Promise<AdminDashboardData> {
    const [projects, messages] = await Promise.all([
      adminRequest<Project[]>("/projects/admin/all", token),
      adminRequest<Message[]>("/messages", token)
    ]);

    return { messages, projects };
  },

  createProject(token: string, payload: FormData) {
    return adminRequest<Project>("/projects", token, {
      method: "POST",
      body: payload
    });
  },

  updateProject(token: string, projectId: string, payload: FormData) {
    return adminRequest<Project>(`/projects/${projectId}`, token, {
      method: "PATCH",
      body: payload
    });
  },

  deleteProject(token: string, projectId: string) {
    return adminRequest<{ message: string }>(`/projects/${projectId}`, token, {
      method: "DELETE"
    });
  },

  reorderProjects(token: string, projectIds: string[]) {
    return adminRequest<Project[]>("/projects/admin/reorder", token, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectIds })
    });
  },

  markMessageRead(token: string, messageId: string) {
    return adminRequest<Message>(`/messages/${messageId}/read`, token, {
      method: "PATCH"
    });
  },

  deleteMessage(token: string, messageId: string) {
    return adminRequest<{ message: string }>(`/messages/${messageId}`, token, {
      method: "DELETE"
    });
  }
};
