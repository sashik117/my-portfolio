"use client";

import { motion } from "framer-motion";

const lines = [
  { prompt: "$", text: "npm run dev" },
  { prompt: "web", text: "React, Vite, Tailwind, Framer Motion" },
  { prompt: "api", text: "Node/Express, FastAPI, auth, uploads, email flows" },
  { prompt: "mobile", text: "Flutter/Dart, Kotlin Compose, Capacitor Android" },
  { prompt: "data", text: "PostgreSQL, SQLite, PDF parsing, Gemini AI" }
];

export default function TerminalPanel() {
  return (
    <section className="section-shell">
      <motion.div
        className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <div className="eyebrow">Fullstack Signal</div>
          <h2 className="section-title">A portfolio that behaves like a product.</h2>
          <p className="section-copy">
            The admin dashboard, contact API, upload pipeline, and editable
            project data show backend thinking instead of just visual polish.
          </p>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-black/[0.58] shadow-lift backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/[0.10] px-5 py-4">
            <span className="h-3 w-3 rounded-full bg-coral" />
            <span className="h-3 w-3 rounded-full bg-solar" />
            <span className="h-3 w-3 rounded-full bg-mint" />
            <span className="ml-auto text-xs font-bold text-white/[0.38]">stack.log</span>
          </div>
          <div className="space-y-4 p-5 font-mono text-sm">
            {lines.map((line, index) => (
              <motion.div
                key={line.text}
                className="flex gap-3"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <span className="min-w-9 text-electric">{line.prompt}</span>
                <span className="text-white/[0.72]">{line.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
