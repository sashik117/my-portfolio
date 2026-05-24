"use client";

import { motion } from "framer-motion";
import { AppWindow, Bot, Dumbbell, GraduationCap, Languages, Smartphone } from "lucide-react";

const interests = [
  { icon: AppWindow, title: "Fullstack web", text: "React, APIs, databases" },
  { icon: Smartphone, title: "Mobile apps", text: "Flutter and Compose flows" },
  { icon: Bot, title: "AI products", text: "Gemini and enrichment logic" },
  { icon: Dumbbell, title: "Fitness tools", text: "workouts and analytics" },
  { icon: Languages, title: "Language learning", text: "SRS, speaking, context" },
  { icon: GraduationCap, title: "Exam platforms", text: "tests, progress, content" }
];

export default function About() {
  return (
    <section id="about" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="eyebrow">About Me</div>
        <h2 className="section-title">I build real product-style projects across web, mobile, AI, and backend systems.</h2>
        <p className="section-copy">
          My projects are not just landing pages. They include music playback,
          fitness tracking, nutrition AI, language learning, exam platforms,
          PDF parsing, auth, databases, mobile apps, and deployable APIs.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="glass rounded-[24px] p-6 md:p-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="text-sm font-bold uppercase text-electric">Profile</div>
          <p className="mt-5 text-2xl font-black leading-tight text-white md:text-3xl">
            I build portfolio-grade products that feel like real apps, not homework.
          </p>
          <p className="mt-5 leading-8 text-white/[0.62]">
            The goal is to show range: polished UI, mobile-first thinking,
            backend architecture, data pipelines, AI integrations, and enough
            detail that each project feels like something people could actually use.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["React", "Vite", "Node.js", "FastAPI", "PostgreSQL", "Flutter", "Kotlin", "Gemini AI"].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/[0.72]"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {interests.map((item, index) => (
            <motion.article
              key={item.title}
              className="rounded-[22px] border border-white/[0.10] bg-white/[0.06] p-5 backdrop-blur-xl transition hover:border-electric/[0.35] hover:bg-electric/[0.08]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <item.icon size={24} className="text-electric" />
              <h3 className="mt-5 text-lg font-black text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/[0.55]">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
