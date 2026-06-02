"use client";

import type { Message, Project } from "@/types";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { adminApi } from "../api/adminApi";
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
    }
  }, []);

  const loadData = async (authToken = token) => {
    if (!authToken) return;
    setLoading(true);
    setFeedback("");

    try {
      const data = await adminApi.getDashboardData(authToken);
      setProjects(data.projects);
      setMessages(data.messages);
    } catch (error) {
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
      window.localStorage.setItem("portfolio-admin-token", data.token);
      setToken(data.token);
      setFeedback(`Signed in as ${data.admin.email}`);
      await loadData(data.token);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("portfolio-admin-token");
    setToken("");
    setProjects([]);
    setMessages([]);
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

    try {
      const payload = projectFormToPayload(form);

      if (editing) {
        await adminApi.updateProject(token, editing._id, payload);
      } else {
        await adminApi.createProject(token, payload);
      }

      setFeedback(editing ? "Project updated." : "Project created.");
      resetForm();
      await loadData();
    } catch (error) {
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
      setFeedback(error instanceof Error ? error.message : "Could not delete project.");
    } finally {
      setLoading(false);
    }
  };

  const markMessageRead = async (messageId: string) => {
    if (!token) return;

    try {
      await adminApi.markMessageRead(token, messageId);
      await loadData();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not update message.");
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!token || !window.confirm("Delete this message?")) return;

    try {
      await adminApi.deleteMessage(token, messageId);
      await loadData();
    } catch (error) {
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
    saveProject,
    setActiveTab,
    setEmail,
    setForm,
    setPassword,
    stats,
    token
  };
}
