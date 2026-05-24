"use client";

import { API_URL, mediaUrl } from "@/lib/api";
import type { Message, Project } from "@/types";
import { motion } from "framer-motion";
import {
  Eye,
  ImagePlus,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Save,
  Trash2
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type LoginResponse = {
  token: string;
  admin: {
    email: string;
  };
};

type ProjectForm = {
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

const emptyForm: ProjectForm = {
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

async function adminRequest<T>(
  path: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
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
    throw new Error(message);
  }

  return response.json();
}

export default function AdminApp() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [editing, setEditing] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const stats = useMemo(
    () => [
      { label: "Projects", value: projects.length },
      { label: "Published", value: projects.filter((project) => project.status === "published").length },
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
      const [projectData, messageData] = await Promise.all([
        adminRequest<Project[]>("/projects/admin/all", authToken),
        adminRequest<Message[]>("/messages", authToken)
      ]);
      setProjects(projectData);
      setMessages(messageData);
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
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ message: "Login failed" }));
        throw new Error(data.message);
      }

      const data = (await response.json()) as LoginResponse;
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
    setForm({
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
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const saveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    setLoading(true);
    setFeedback("");

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

    try {
      await adminRequest<Project>(
        editing ? `/projects/${editing._id}` : "/projects",
        token,
        {
          method: editing ? "PATCH" : "POST",
          body: payload
        }
      );
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
      await adminRequest<{ message: string }>(`/projects/${projectId}`, token, {
        method: "DELETE"
      });
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
      await adminRequest<Message>(`/messages/${messageId}/read`, token, {
        method: "PATCH"
      });
      await loadData();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not update message.");
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!token || !window.confirm("Delete this message?")) return;
    try {
      await adminRequest<{ message: string }>(`/messages/${messageId}`, token, {
        method: "DELETE"
      });
      await loadData();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not delete message.");
    }
  };

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center px-4 py-16">
        <motion.form
          onSubmit={login}
          className="glass w-full max-w-md rounded-[28px] p-6 md:p-8"
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55 }}
        >
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-ink">
            <Lock size={24} />
          </div>
          <h1 className="mt-6 text-3xl font-black text-white">Admin CMS</h1>
          <p className="mt-3 leading-7 text-white/[0.58]">
            Manage projects, preview images, links, descriptions, technologies,
            and incoming contact messages.
          </p>
          <label className="mt-7 block">
            <span className="mb-2 block text-sm font-bold text-white/[0.62]">Email</span>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="admin@example.com"
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-bold text-white/[0.62]">Password</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="********"
            />
          </label>
          <button
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-ink transition hover:bg-electric disabled:opacity-60"
            disabled={loading}
          >
            <Lock size={17} />
            {loading ? "Signing in" : "Sign In"}
          </button>
          {feedback && <p className="mt-4 text-sm font-bold text-coral">{feedback}</p>}
          <a
            href="/"
            className="mt-6 block text-center text-sm font-bold text-white/[0.58] transition hover:text-electric"
          >
            Back to portfolio
          </a>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <header className="glass flex flex-col gap-4 rounded-[26px] p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-ink">
              <LayoutDashboard size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Portfolio CMS</h1>
              <p className="text-sm font-semibold text-white/[0.50]">Projects and messages</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-4 text-sm font-bold text-white/[0.72] transition hover:border-electric/[0.40]"
            >
              <Eye size={17} />
              Preview
            </a>
            <button
              onClick={logout}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-4 text-sm font-bold text-white/[0.72] transition hover:border-coral/[0.50]"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </header>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[22px] border border-white/[0.10] bg-white/[0.06] p-5 backdrop-blur-xl">
              <div className="text-sm font-bold text-white/[0.48]">{stat.label}</div>
              <div className="mt-2 text-4xl font-black text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className={`rounded-xl border px-4 py-2 text-sm font-black transition ${
              activeTab === "projects"
                ? "border-electric bg-electric text-ink"
                : "border-white/[0.10] bg-white/[0.06] text-white/[0.62]"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
          <button
            className={`rounded-xl border px-4 py-2 text-sm font-black transition ${
              activeTab === "messages"
                ? "border-electric bg-electric text-ink"
                : "border-white/[0.10] bg-white/[0.06] text-white/[0.62]"
            }`}
            onClick={() => setActiveTab("messages")}
          >
            Messages
          </button>
        </div>

        {feedback && (
          <div className="mt-4 rounded-2xl border border-white/[0.10] bg-white/[0.06] px-4 py-3 text-sm font-bold text-white/[0.70]">
            {feedback}
          </div>
        )}

        {activeTab === "projects" ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[420px_1fr]">
            <form onSubmit={saveProject} className="glass h-fit rounded-[26px] p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">
                    {editing ? "Edit project" : "Add project"}
                  </h2>
                  <p className="mt-1 text-sm text-white/[0.48]">No code edits needed.</p>
                </div>
                {editing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-white/[0.10] px-3 py-2 text-xs font-black text-white/[0.62]"
                  >
                    New
                  </button>
                )}
              </div>

              <div className="grid gap-4">
                <label>
                  <span className="mb-2 block text-sm font-bold text-white/[0.62]">Title</span>
                  <input
                    className="input"
                    value={form.title}
                    onChange={(event) =>
                      setForm((value) => ({ ...value, title: event.target.value }))
                    }
                    required
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-bold text-white/[0.62]">Short description</span>
                  <textarea
                    className="input min-h-24"
                    value={form.description}
                    onChange={(event) =>
                      setForm((value) => ({ ...value, description: event.target.value }))
                    }
                    required
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-bold text-white/[0.62]">Details</span>
                  <textarea
                    className="input min-h-28"
                    value={form.longDescription}
                    onChange={(event) =>
                      setForm((value) => ({ ...value, longDescription: event.target.value }))
                    }
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-bold text-white/[0.62]">Technologies</span>
                  <input
                    className="input"
                    value={form.technologies}
                    onChange={(event) =>
                      setForm((value) => ({ ...value, technologies: event.target.value }))
                    }
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-bold text-white/[0.62]">Category</span>
                    <input
                      className="input"
                      value={form.category}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, category: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-bold text-white/[0.62]">Status</span>
                    <select
                      className="input"
                      value={form.status}
                      onChange={(event) =>
                        setForm((value) => ({
                          ...value,
                          status: event.target.value as ProjectForm["status"]
                        }))
                      }
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-bold text-white/[0.62]">GitHub URL</span>
                    <input
                      className="input"
                      value={form.githubUrl}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, githubUrl: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-bold text-white/[0.62]">Live URL</span>
                    <input
                      className="input"
                      value={form.liveUrl}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, liveUrl: event.target.value }))
                      }
                    />
                  </label>
                </div>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/[0.10] bg-white/[0.06] p-4">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) =>
                      setForm((value) => ({ ...value, featured: event.target.checked }))
                    }
                    className="h-5 w-5 accent-cyan-300"
                  />
                  <span className="text-sm font-bold text-white/[0.66]">Featured project</span>
                </label>
                <label className="rounded-2xl border border-dashed border-white/[0.16] bg-white/[0.05] p-5 text-center">
                  <ImagePlus className="mx-auto text-electric" size={28} />
                  <span className="mt-3 block text-sm font-bold text-white/[0.64]">
                    {form.image ? form.image.name : "Upload preview image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) =>
                      setForm((value) => ({
                        ...value,
                        image: event.target.files?.[0] || null
                      }))
                    }
                  />
                </label>
              </div>

              <button
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-ink transition hover:bg-electric disabled:opacity-60"
                disabled={loading}
              >
                {editing ? <Save size={17} /> : <Plus size={17} />}
                {loading ? "Saving" : editing ? "Save changes" : "Add project"}
              </button>
            </form>

            <div className="grid h-fit gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project._id}
                  className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-white/[0.06] backdrop-blur-xl"
                >
                  <div className="aspect-[1.7] bg-white/[0.07]">
                    {project.imageUrl ? (
                      <img
                        src={mediaUrl(project.imageUrl)}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-sm font-bold text-white/[0.38]">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-black text-white">{project.title}</h3>
                        <p className="mt-1 text-xs font-bold uppercase text-white/[0.40]">
                          {project.status}
                        </p>
                      </div>
                      {project.featured && (
                        <span className="rounded-full bg-mint px-2 py-1 text-[0.68rem] font-black uppercase text-ink">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/[0.56]">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => editProject(project)}
                        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-3 text-sm font-bold text-white/[0.70]"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-coral/[0.25] bg-coral/[0.10] px-3 text-sm font-bold text-coral"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {messages.map((message) => (
              <article key={message._id} className="rounded-[24px] border border-white/[0.10] bg-white/[0.06] p-5 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-electric">
                      <Mail size={16} />
                      {message.email}
                    </div>
                    <h3 className="mt-3 text-xl font-black text-white">{message.name}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${
                    message.status === "new" ? "bg-coral text-white" : "bg-white/[0.10] text-white/[0.52]"
                  }`}>
                    {message.status}
                  </span>
                </div>
                <p className="mt-4 leading-7 text-white/[0.62]">{message.message}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() => markMessageRead(message._id)}
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-3 text-sm font-bold text-white/[0.70]"
                  >
                    <Eye size={15} />
                    Read
                  </button>
                  <button
                    onClick={() => deleteMessage(message._id)}
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-coral/[0.25] bg-coral/[0.10] px-3 text-sm font-bold text-coral"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
            {!messages.length && (
              <div className="rounded-[24px] border border-white/[0.10] bg-white/[0.06] p-8 text-center text-white/[0.52]">
                No contact messages yet.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
