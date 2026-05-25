"use client";

import { motion } from "framer-motion";
import {
  AppWindow,
  Bot,
  Braces,
  Dumbbell,
  GraduationCap,
  Languages,
  Route,
  ServerCog,
  Smartphone,
  WandSparkles
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const interestIcons = [AppWindow, Smartphone, Bot, Dumbbell, Languages, GraduationCap];
const principleIcons = [Route, Smartphone, ServerCog, WandSparkles];
const interestThemes = [
  "hover:border-electric/[0.35] hover:bg-electric/[0.08]",
  "hover:border-mint/[0.35] hover:bg-mint/[0.08]",
  "hover:border-coral/[0.35] hover:bg-coral/[0.08]",
  "hover:border-solar/[0.35] hover:bg-solar/[0.08]",
  "hover:border-electric/[0.35] hover:bg-electric/[0.08]",
  "hover:border-mint/[0.35] hover:bg-mint/[0.08]"
];
const principleThemes = [
  "hover:border-electric/[0.38] hover:bg-electric/[0.08]",
  "hover:border-mint/[0.38] hover:bg-mint/[0.08]",
  "hover:border-coral/[0.38] hover:bg-coral/[0.08]",
  "hover:border-solar/[0.38] hover:bg-solar/[0.08]"
];
const principleOrbStyles = [
  "border-electric/[0.35] bg-electric/[0.12] text-electric shadow-[0_0_26px_rgba(110,231,249,0.16)]",
  "border-mint/[0.35] bg-mint/[0.12] text-mint shadow-[0_0_26px_rgba(74,222,128,0.14)]",
  "border-coral/[0.35] bg-coral/[0.12] text-coral shadow-[0_0_26px_rgba(251,113,133,0.14)]",
  "border-solar/[0.35] bg-solar/[0.12] text-solar shadow-[0_0_26px_rgba(250,204,21,0.13)]"
];

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

      <div className="mt-10 grid gap-4 md:grid-cols-[0.95fr_1.05fr] md:items-start">
        <motion.div
          className="glass group relative overflow-hidden rounded-[24px] p-6 md:p-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{ y: -4 }}
        >
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-electric/[0.10] blur-3xl transition group-hover:bg-mint/[0.12]" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
          <div className="relative text-sm font-bold uppercase text-electric">{t.about.profileLabel}</div>
          <p className="relative mt-5 text-xl font-black leading-tight text-white md:text-2xl">
            {t.about.profileTitle}
          </p>
          <p className="relative mt-5 text-base leading-8 text-white/[0.80] md:text-[1.05rem]">
            {t.about.profileCopy}
          </p>
          <div className="relative mt-7 flex flex-wrap gap-2">
            {["React", "Vite", "Node.js", "FastAPI", "PHP", "Laravel", "PostgreSQL", "Flutter", "Kotlin", "Gemini AI"].map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/[0.76] transition hover:border-electric/[0.35] hover:bg-electric/[0.08] hover:text-white"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div>

        <div className="grid self-start gap-3 sm:grid-cols-2 lg:gap-4">
          {t.about.interests.map(([title, text], index) => {
            const Icon = interestIcons[index];

            return (
            <motion.article
              key={title}
              className={`group relative overflow-hidden rounded-[20px] border border-white/[0.10] bg-white/[0.06] p-4 backdrop-blur-xl transition ${interestThemes[index]}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.22] to-transparent opacity-0 transition group-hover:opacity-100" />
              <Icon size={20} className={index % 3 === 0 ? "text-electric" : index % 3 === 1 ? "text-mint" : "text-coral"} />
              <h3 className="mt-2.5 text-base font-black text-white">{title}</h3>
              <p className="mt-1.5 text-[0.86rem] leading-5 text-white/[0.66]">{text}</p>
            </motion.article>
            );
          })}
        </div>
      </div>

      <motion.div
        className="relative mt-5 overflow-hidden rounded-[24px] border border-white/[0.10] bg-[#0b111d] p-4 shadow-lift md:p-6"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, delay: 0.08 }}
        whileHover={{ y: -4 }}
      >
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-mint/[0.08] blur-3xl" />
        <div className="absolute -bottom-20 left-8 h-40 w-40 rounded-full bg-coral/[0.07] blur-3xl" />
        <div className="relative flex items-center gap-2 text-sm font-black uppercase text-electric">
          <Braces size={17} />
          {t.about.principlesTitle}
        </div>
        <div className="relative mt-4 grid gap-3 md:grid-cols-2">
          {t.about.principles.map((principle, index) => {
            const Icon = principleIcons[index];

            return (
            <motion.div
              key={principle}
              className={`group relative overflow-hidden flex gap-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4 transition ${principleThemes[index]} sm:p-5`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-y-5 left-[35px] w-px bg-gradient-to-b from-white/[0.20] to-transparent" />
              <span className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl border backdrop-blur ${principleOrbStyles[index]}`}>
                <Icon size={21} />
              </span>
              <p className="text-[0.95rem] leading-7 text-white/[0.68] group-hover:text-white/[0.82] md:text-base md:leading-7">
                {principle}
              </p>
            </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
