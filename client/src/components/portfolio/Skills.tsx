"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "React / Vite", level: 93, color: "bg-electric" },
  { name: "JavaScript / TypeScript", level: 88, color: "bg-solar" },
  { name: "Node.js / Express / NestJS", level: 86, color: "bg-mint" },
  { name: "Python / FastAPI", level: 82, color: "bg-electric" },
  { name: "PostgreSQL / SQLite", level: 80, color: "bg-mint" },
  { name: "Tailwind / Framer Motion", level: 92, color: "bg-electric" },
  { name: "Flutter / Dart", level: 78, color: "bg-coral" },
  { name: "Kotlin Compose", level: 70, color: "bg-solar" },
  { name: "AI integrations", level: 76, color: "bg-coral" },
  { name: "Git / GitHub", level: 88, color: "bg-white" }
];

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Skills</div>
          <h2 className="section-title">Frontend polish, mobile apps, APIs, AI features, and data-heavy tooling.</h2>
          <p className="section-copy">
            This stack is pulled from real projects in the Apps folder:
            music, fitness, nutrition, language learning, exam prep, and PDF
            parsing tools.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              className="group rounded-[22px] border border-white/[0.10] bg-white/[0.06] p-5 backdrop-blur-xl transition hover:border-electric/[0.35] hover:bg-white/[0.09]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-black text-white">{skill.name}</h3>
                <span className="text-sm font-bold text-white/[0.52]">{skill.level}%</span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.10]">
                <motion.div
                  className={`h-full rounded-full ${skill.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
                />
              </div>
              <div className="mt-4 h-10 rounded-xl border border-white/[0.08] bg-black/[0.18] p-2">
                <div className="h-full rounded-lg bg-gradient-to-r from-white/[0.12] via-white/[0.04] to-transparent transition group-hover:from-electric/[0.22]" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
