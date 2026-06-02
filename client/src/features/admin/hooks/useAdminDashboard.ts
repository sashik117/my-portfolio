"use client";

import type { Message, Project } from "@/types";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AdminApiError, adminApi } from "../api/adminApi";
import { emptyProjectForm, projectFormToPayload, projectToForm } from "../data/projectForm";
import type { AdminTab, ProjectForm } from "../types";

export function useAdminDashboard() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [form, setForm] = useState<ProjectForm>(emptyProjectForm);
  const [editing, setEditing] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const stats = useMemo(
    () => [
      { label: "Projects", value: projects.length },
      {
        label: "Published",
        value: projects.filter((project) => project.status === "published").length
      },
      { label: "Messages", value: messages.length }
    ],
    [messages.length, projects]
  );

  useEffect(() => {
    const storedToken = window.localStorage.getItem("portfolio-admin-token");
    if (storedToken) {
      setToken(storedToken);
      void loadData(storedToken);
      return;
    }

    void refreshAdminSession(true);
  }, []);

  const clearSession = () => {
    window.localStorage.removeItem("portfolio-admin-token");
    setToken("");
    setProjects([]);
    setMessages([]);
  };

  const storeToken = (nextToken: string) => {
    window.localStorage.setItem("portfolio-admin-token", nextToken);
    setToken(nextToken);
  };

  const refreshAdminSession = async (silent = false) => {
    try {
      const data = await adminApi.refreshSession();
      storeToken(data.token);
      if (!silent) setFeedback(`Session refreshed for ${data.admin.email}`);
      return data.token;
    } catch (error) {
      clearSession();
      if (!silent) {
        setFeedback(error instanceof Error ? error.message : "Session expired.");
      }
      return "";
    }
  };

  const recoverToken = async (error: unknown) => {
    if (error instanceof AdminApiError && error.status === 401) {
      return refreshAdminSession(true);
    }

    return "";
  };

  const loadData = async (authToken = token, allowRefresh = true) => {
    if (!authToken) return;
    setLoading(true);
    setFeedback("");

    try {
      const data = await adminApi.getDashboardData(authToken);
      setProjects(data.projects);
      setMessages(data.messages);
    } catch (error) {
      const refreshedToken = await recoverToken(error);

      if (refreshedToken && allowRefresh) {
        await loadData(refreshedToken, false);
        return;
      }

      setFeedback(error instanceof Error ? error.message : "Could not load data.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const data = await adminApi.login(email, password);
      storeToken(data.token);
      setFeedback(`Signed in as ${data.admin.email}`);
      await loadData(data.token);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await adminApi.logout(token).catch(() => undefined);
    clearSession();
    setFeedback("");
  };

  const editProject = (project: Project) => {
    setEditing(project);
    setForm(projectToForm(project));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditing(null);
    setForm(emptyProjectForm);
  };

  const saveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    setLoading(true);
    setFeedback("");

    const persistProject = async (authToken: string) => {
      const payload = projectFormToPayload(form);

      if (editing) {
        await adminApi.updateProject(authToken, editing._id, payload);
      } else {
        await adminApi.createProject(authToken, payload);
      }
    };

    try {
      await persistProject(token);
      setFeedback(editing ? "Project updated." : "Project created.");
      resetForm();
      await loadData();
    } catch (error) {
      const refreshedToken = await recoverToken(error);

      if (refreshedToken) {
        try {
          await persistProject(refreshedToken);
          setFeedback(editing ? "Project updated." : "Project created.");
          resetForm();
          await loadData(refreshedToken);
          return;
        } catch (retryError) {
          setFeedback(retryError instanceof Error ? retryError.message : "Could not save project.");
          return;
        }
      }

      setFeedback(error instanceof Error ? error.message : "Could not save project.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!token || !window.confirm("Delete this project?")) return;
    setLoading(true);
    setFeedback("");

    try {
      await adminApi.deleteProject(token, projectId);
      await loadData();
      setFeedback("Project deleted.");
    } catch (error) {
      const refreshedToken = await recoverToken(error);

      if (refreshedToken) {
        await adminApi.deleteProject(refreshedToken, projectId);
        await loadData(refreshedToken);
        setFeedback("Project deleted.");
        return;
      }

      setFeedback(error instanceof Error ? error.message : "Could not delete project.");
    } finally {
      setLoading(false);
    }
  };

  const reorderProject = async (projectId: string, direction: "up" | "down") => {
    if (!token) return;

    const currentIndex = projects.findIndex((project) => project._id === projectId);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= projects.length) return;

    const reorderedProjects = [...projects];
    const [project] = reorderedProjects.splice(currentIndex, 1);
    reorderedProjects.splice(targetIndex, 0, project);
    setProjects(reorderedProjects);
    setFeedback("");

    try {
      const savedProjects = await adminApi.reorderProjects(
        token,
        reorderedProjects.map((item) => item._id)
      );
      setProjects(savedProjects);
      setFeedback("Project order updated.");
    } catch (error) {
      const refreshedToken = await recoverToken(error);

      if (refreshedToken) {
        const savedProjects = await adminApi.reorderProjects(
          refreshedToken,
          reorderedProjects.map((item) => item._id)
        );
        setProjects(savedProjects);
        setFeedback("Project order updated.");
        return;
      }

      setProjects(projects);
      setFeedback(error instanceof Error ? error.message : "Could not reorder projects.");
    }
  };

  const markMessageRead = async (messageId: string) => {
    if (!token) return;

    try {
      await adminApi.markMessageRead(token, messageId);
      await loadData();
    } catch (error) {
      const refreshedToken = await recoverToken(error);

      if (refreshedToken) {
        await adminApi.markMessageRead(refreshedToken, messageId);
        await loadData(refreshedToken);
        return;
      }

      setFeedback(error instanceof Error ? error.message : "Could not update message.");
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!token || !window.confirm("Delete this message?")) return;

    try {
      await adminApi.deleteMessage(token, messageId);
      await loadData();
    } catch (error) {
      const refreshedToken = await recoverToken(error);

      if (refreshedToken) {
        await adminApi.deleteMessage(refreshedToken, messageId);
        await loadData(refreshedToken);
        return;
      }

      setFeedback(error instanceof Error ? error.message : "Could not delete message.");
    }
  };

  return {
    activeTab,
    deleteMessage,
    deleteProject,
    editProject,
    editing,
    email,
    feedback,
    form,
    loading,
    login,
    logout,
    markMessageRead,
    messages,
    password,
    projects,
    resetForm,
    reorderProject,
    saveProject,
    setActiveTab,
    setEmail,
    setForm,
    setPassword,
    stats,
    token
  };
}
