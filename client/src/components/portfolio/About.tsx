"use client";

import { motion } from "framer-motion";
import { AppWindow, Bot, Braces, Dumbbell, GraduationCap, Languages, Smartphone } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const interestIcons = [AppWindow, Smartphone, Bot, Dumbbell, Languages, GraduationCap];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="eyebrow">{t.about.eyebrow}</div>
        <h2 className="section-title">{t.about.title}</h2>
        <p className="section-copy">
          {t.about.copy}
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          className="glass rounded-[24px] p-6 md:p-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="text-sm font-bold uppercase text-electric">{t.about.profileLabel}</div>
          <p className="mt-5 text-xl font-black leading-tight text-white md:text-2xl">
            {t.about.profileTitle}
          </p>
          <p className="mt-5 leading-8 text-white/[0.62]">
            {t.about.profileCopy}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["React", "Vite", "Node.js", "FastAPI", "PHP", "Laravel", "PostgreSQL", "Flutter", "Kotlin", "Gemini AI"].map(
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
          <div className="mt-7 rounded-2xl border border-white/[0.10] bg-black/[0.20] p-4">
            <div className="flex items-center gap-2 text-sm font-black uppercase text-electric">
              <Braces size={17} />
              {t.about.principlesTitle}
            </div>
            <div className="mt-4 grid gap-3">
              {t.about.principles.map((principle, index) => (
                <motion.div
                  key={principle}
                  className="group flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 transition hover:border-mint/[0.35] hover:bg-mint/[0.08]"
                  whileHover={{ x: 4 }}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-xs font-black text-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-6 text-white/[0.62] group-hover:text-white/[0.78]">
                    {principle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {t.about.interests.map(([title, text], index) => {
            const Icon = interestIcons[index];

            return (
            <motion.article
              key={title}
              className="rounded-[22px] border border-white/[0.10] bg-white/[0.06] p-5 backdrop-blur-xl transition hover:border-electric/[0.35] hover:bg-electric/[0.08]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Icon size={24} className="text-electric" />
              <h3 className="mt-5 text-base font-black text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/[0.55]">{text}</p>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
