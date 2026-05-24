"use client";

import { motion } from "framer-motion";
import { Code2, Database, Server, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const skills = [
  { name: "React / Vite", level: 93, color: "bg-electric" },
  { name: "JavaScript / TypeScript", level: 88, color: "bg-solar" },
  { name: "Node.js / Express / NestJS", level: 86, color: "bg-mint" },
  { name: "Python / FastAPI", level: 82, color: "bg-electric" },
  { name: "PHP / Laravel", level: 74, color: "bg-mint" },
  { name: "PostgreSQL / SQLite", level: 80, color: "bg-mint" },
  { name: "Tailwind / Framer Motion", level: 92, color: "bg-electric" },
  { name: "Flutter / Dart", level: 78, color: "bg-coral" },
  { name: "Kotlin Compose", level: 70, color: "bg-solar" },
  { name: "AI integrations", level: 76, color: "bg-coral" },
  { name: "Git / GitHub", level: 88, color: "bg-white" }
];

const groupIcons: LucideIcon[] = [Code2, Server, Smartphone, Database];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">{t.skills.eyebrow}</div>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-copy">
            {t.skills.copy}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {t.skills.groups.map(([title, text], index) => {
              const Icon = groupIcons[index];

              return (
                <motion.article
                  key={title}
                  className="group rounded-2xl border border-white/[0.10] bg-[#0b111d] p-4 transition hover:border-electric/[0.35] hover:bg-electric/[0.08]"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-ink transition group-hover:bg-electric">
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-black uppercase text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/[0.56]">{text}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
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
