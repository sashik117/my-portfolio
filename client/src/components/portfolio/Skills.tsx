"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Code2, Database, Server, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const skills = [
  { name: "React / Vite / TS / JS", level: 93, accent: "text-electric", dot: "bg-electric", bar: "from-electric to-mint", hover: "hover:border-electric/[0.38] hover:bg-electric/[0.07]" },
  { name: "Tailwind / Framer Motion", level: 92, accent: "text-mint", dot: "bg-mint", bar: "from-mint to-electric", hover: "hover:border-mint/[0.38] hover:bg-mint/[0.07]" },
  { name: "Node.js / Express / NestJS", level: 86, accent: "text-solar", dot: "bg-solar", bar: "from-solar to-mint", hover: "hover:border-solar/[0.38] hover:bg-solar/[0.07]" },
  { name: "Python / FastAPI", level: 82, accent: "text-electric", dot: "bg-electric", bar: "from-electric to-coral", hover: "hover:border-electric/[0.38] hover:bg-electric/[0.07]" },
  { name: "PHP / Laravel", level: 74, accent: "text-coral", dot: "bg-coral", bar: "from-coral to-solar", hover: "hover:border-coral/[0.38] hover:bg-coral/[0.07]" },
  { name: "PostgreSQL / SQLite / MongoDB", level: 80, accent: "text-mint", dot: "bg-mint", bar: "from-mint to-solar", hover: "hover:border-mint/[0.38] hover:bg-mint/[0.07]" },
  { name: "Flutter / Dart / Compose", level: 78, accent: "text-electric", dot: "bg-electric", bar: "from-electric to-solar", hover: "hover:border-electric/[0.38] hover:bg-electric/[0.07]" },
  { name: "AI Integrations / Gemini", level: 76, accent: "text-coral", dot: "bg-coral", bar: "from-coral to-electric", hover: "hover:border-coral/[0.38] hover:bg-coral/[0.07]" }
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
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0b111d] p-4 transition hover:border-electric/[0.35] hover:bg-electric/[0.08]"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-electric opacity-0 transition group-hover:opacity-100" />
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
              className={`group relative overflow-hidden rounded-[20px] border border-white/[0.10] bg-white/[0.06] p-4 backdrop-blur-xl transition ${skill.hover}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${skill.bar}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: index * 0.04 }}
              />
              <div className="flex items-center justify-between gap-4">
                <h3 className={`flex items-center gap-2 text-sm font-black md:text-base ${skill.accent}`}>
                  <span className={`h-2 w-2 rounded-full ${skill.dot}`} />
                  {skill.name}
                </h3>
                <span className="rounded-full border border-white/[0.10] bg-white/[0.06] px-2 py-1 text-xs font-bold text-white/[0.62]">
                  {skill.level}%
                </span>
              </div>
              <p className="mt-3 min-h-[112px] text-[0.95rem] leading-7 text-white/[0.78]">
                {t.skills.details[index]}
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.10]">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.bar}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.div
        className="relative mt-6 overflow-hidden rounded-[24px] border border-mint/[0.22] bg-[#0b111d] p-5 shadow-glow md:p-6"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-mint/[0.10] blur-3xl" />
        <div className="absolute -bottom-16 left-8 h-36 w-36 rounded-full bg-electric/[0.08] blur-3xl" />
        <div className="relative grid gap-5 md:grid-cols-[0.62fr_1fr] md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase text-mint">
              <BadgeCheck size={18} className="text-electric" />
              {t.skills.workflowTitle}
            </div>
            <p className="mt-3 text-base leading-7 text-white/[0.78] md:text-lg md:leading-8">
              {t.skills.workflow}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {t.skills.workflowSteps.map((step, index) => (
              <motion.div
                key={step}
                className="group rounded-2xl border border-white/[0.10] bg-white/[0.06] p-4 transition hover:border-electric/[0.35] hover:bg-electric/[0.08]"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-[0.68rem] font-black uppercase text-electric">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 text-sm font-bold text-white/[0.82]">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
