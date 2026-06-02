"use client";

import { useAdminDashboard } from "../hooks/useAdminDashboard";
import AdminLoginForm from "./AdminLoginForm";
import AdminShellHeader from "./AdminShellHeader";
import AdminStats from "./AdminStats";
import AdminTabs from "./AdminTabs";
import MessageAdminCard from "./MessageAdminCard";
import ProjectAdminCard from "./ProjectAdminCard";
import ProjectEditorForm from "./ProjectEditorForm";

export default function AdminApp() {
  const {
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
  } = useAdminDashboard();

  if (!token) {
    return (
      <AdminLoginForm
        email={email}
        feedback={feedback}
        loading={loading}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={login}
      />
    );
  }

  return (
    <main className="min-h-screen px-4 py-5 md:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <AdminShellHeader onLogout={logout} />
        <AdminStats stats={stats} />
        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {loading && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-electric/[0.24] bg-electric/[0.08] px-4 py-3 text-sm font-bold text-electric">
            Syncing CMS data...
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-electric" />
            </div>
          </div>
        )}

        {feedback && (
          <div className="mt-4 rounded-2xl border border-white/[0.10] bg-white/[0.06] px-4 py-3 text-sm font-bold text-white/[0.70]">
            {feedback}
          </div>
        )}

        {activeTab === "projects" ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[430px_1fr]">
            <ProjectEditorForm
              editing={editing}
              form={form}
              loading={loading}
              onFormChange={setForm}
              onReset={resetForm}
              onSubmit={saveProject}
            />

            <div className="grid h-fit gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectAdminCard
                  key={project._id}
                  isFirst={index === 0}
                  isLast={index === projects.length - 1}
                  project={project}
                  onDelete={deleteProject}
                  onEdit={editProject}
                  onMove={reorderProject}
                />
              ))}
              {!projects.length && (
                <div className="rounded-[24px] border border-white/[0.10] bg-white/[0.06] p-8 text-center">
                  <div className="text-lg font-black text-white">No projects in CMS yet.</div>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/[0.54]">
                    Add the first project from the form, attach a preview image, mark it
                    published, and it will become part of the portfolio grid.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {messages.map((message) => (
              <MessageAdminCard
                key={message._id}
                message={message}
                onDelete={deleteMessage}
                onRead={markMessageRead}
              />
            ))}
            {!messages.length && (
              <div className="rounded-[24px] border border-white/[0.10] bg-white/[0.06] p-8 text-center">
                <div className="text-lg font-black text-white">No contact messages yet.</div>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/[0.54]">
                  New contact form submissions will appear here with status tracking, so
                  replies and cleanup stay separate from the public portfolio UI.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
