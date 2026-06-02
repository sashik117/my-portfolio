"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { FormEvent } from "react";

type AdminLoginFormProps = {
  email: string;
  feedback: string;
  loading: boolean;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function AdminLoginForm({
  email,
  feedback,
  loading,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit
}: AdminLoginFormProps) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-16">
      <motion.form
        onSubmit={onSubmit}
        className="glass w-full max-w-md rounded-[28px] p-6 md:p-8"
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55 }}
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-ink">
          <Lock size={24} />
        </div>
        <h1 className="mt-6 text-2xl font-black text-white">Admin CMS</h1>
        <p className="mt-3 leading-7 text-white/[0.58]">
          A clean private workspace for projects, preview images, descriptions,
          links, technologies, and contact messages.
        </p>
        <label className="mt-7 block">
          <span className="mb-2 block text-sm font-bold text-white/[0.62]">Email</span>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
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
            onChange={(event) => onPasswordChange(event.target.value)}
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
