"use client";

import { motion } from "framer-motion";
import { Code2, Database, Server, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const skills = [
  { name: "React / Vite / TS / JS", level: 93, color: "bg-electric" },
  { name: "Tailwind / Framer Motion", level: 92, color: "bg-electric" },
  { name: "Node.js / Express / NestJS", level: 86, color: "bg-mint" },
  { name: "Python / FastAPI", level: 82, color: "bg-electric" },
  { name: "PHP / Laravel", level: 74, color: "bg-mint" },
  { name: "PostgreSQL / SQLite / MongoDB", level: 80, color: "bg-mint" },
  { name: "Flutter / Dart / Compose", level: 78, color: "bg-coral" },
  { name: "AI Integrations / Gemini", level: 76, color: "bg-coral" },
  { name: "Git / GitHub / CI/CD", level: 88, color: "bg-white" }
];

const groupIcons: LucideIcon[] = [Code2, Server, Smartphone, Database];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-shell">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
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

        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              className="group rounded-[20px] border border-white/[0.10] bg-white/[0.06] p-4 backdrop-blur-xl transition hover:border-electric/[0.35] hover:bg-white/[0.09]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-black text-white md:text-base">{skill.name}</h3>
                <span className="text-sm font-bold text-white/[0.52]">{skill.level}%</span>
              </div>
              <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/[0.56]">
                {t.skills.details[index]}
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.10]">
                <motion.div
                  className={`h-full rounded-full ${skill.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
                />
              </div>
            </motion.article>
          ))}
          <motion.div
            className="rounded-[20px] border border-electric/[0.18] bg-electric/[0.08] p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <h3 className="text-sm font-black uppercase text-electric">{t.skills.workflowTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-white/[0.62]">{t.skills.workflow}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
