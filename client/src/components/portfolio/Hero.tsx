"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layers3, Server, Smartphone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";

const workWords = ["React", "Laravel", "Flutter", "FastAPI", "Node.js", "Tailwind", "PostgreSQL", "Gemini AI"];
const stackIcons: LucideIcon[] = [Server, Database, Smartphone, Code2];
const identityStyles: { Icon: LucideIcon; accent: string; hover: string; line: string }[] = [
  {
    Icon: Sparkles,
    accent: "text-electric",
    hover: "hover:border-electric/[0.38] hover:bg-electric/[0.08]",
    line: "from-electric via-mint to-transparent"
  },
  {
    Icon: Smartphone,
    accent: "text-mint",
    hover: "hover:border-mint/[0.38] hover:bg-mint/[0.08]",
    line: "from-mint via-electric to-transparent"
  },
  {
    Icon: Layers3,
    accent: "text-coral",
    hover: "hover:border-coral/[0.38] hover:bg-coral/[0.08]",
    line: "from-coral via-solar to-transparent"
  }
];

function PreviewPanel({
  letters,
  stackLabel,
  stackCards,
  deploy,
  performance,
  compact = false
}: {
  letters: string;
  stackLabel: string;
  stackCards: readonly (readonly [string, string])[];
  deploy: string;
  performance: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/[0.12] bg-white/[0.07] shadow-lift backdrop-blur-xl ${
        compact ? "p-2.5" : "p-4"
      }`}
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
      <div className="flex items-center justify-between rounded-2xl border border-white/[0.10] bg-black/[0.35] px-3 py-2.5 md:px-4 md:py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-coral" />
          <span className="h-3 w-3 rounded-full bg-solar" />
          <span className="h-3 w-3 rounded-full bg-mint" />
        </div>
        <span className="text-xs font-bold text-white/[0.52]">portfolio.dev</span>
      </div>

      <div className={compact ? "mt-2.5 grid gap-2.5" : "mt-4 grid gap-4"}>
        <div className="rounded-2xl border border-white/[0.10] bg-ink/[0.78] p-3 md:p-5">
          <div className="mb-3 flex items-center justify-between md:mb-4">
            <div>
              <p className="text-[0.7rem] font-bold uppercase text-electric">
                {stackLabel}
              </p>
              <h2 className="mt-1.5 text-lg font-black text-white md:mt-2 md:text-2xl">
                {letters}
                <span className="animate-pulse text-electric">|</span>
              </h2>
            </div>
            <Code2 className="text-electric" size={compact ? 22 : 28} />
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {stackCards.map(([title, text], index) => {
              const Icon = stackIcons[index];

              return (
                <motion.div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.06] p-2.5 transition hover:border-electric/[0.30] hover:bg-white/[0.09] md:p-4"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.28] to-transparent opacity-0 transition group-hover:opacity-100" />
                  <Icon size={compact ? 15 : 18} className="mb-1.5 text-mint md:mb-3" />
                  <div className="text-xs font-bold text-white/[0.86] md:text-sm">{title}</div>
                  <div className="mt-1 text-[0.66rem] leading-4 text-white/[0.50] md:text-xs md:leading-5">
                    {text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_0.72fr] gap-2.5 md:gap-3">
          <div className="rounded-2xl border border-white/[0.10] bg-white/[0.07] p-3 md:p-4">
            <div className="mb-3 text-[0.7rem] font-bold uppercase text-white/[0.48]">
              {deploy}
            </div>
            <div className={compact ? "flex flex-wrap gap-1.5" : "space-y-2"}>
              {["Vercel", "Render", "Atlas"].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-1.5 md:gap-2"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[0.62rem] font-black text-ink md:h-6 md:w-6 md:text-[0.68rem]">
                    {index + 1}
                  </span>
                  <span className="text-[0.68rem] font-bold text-white/[0.72] md:text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-electric/[0.25] bg-electric/[0.10] p-3 md:p-4">
            <div className="text-2xl font-black text-white md:text-3xl">99</div>
            <div className="mt-1.5 text-[0.68rem] font-bold leading-4 text-white/[0.58] md:mt-2 md:text-sm md:leading-5">
              {performance}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const [letters, setLetters] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = workWords[wordIndex];
    const finishedTyping = !deleting && letters === word;
    const finishedDeleting = deleting && letters === "";
    const delay = finishedTyping ? 1400 : deleting ? 42 : 88;

    const timer = window.setTimeout(() => {
      if (finishedTyping) {
        setDeleting(true);
        return;
      }

      if (finishedDeleting) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % workWords.length);
        return;
      }

      setLetters((value) =>
        deleting ? word.slice(0, Math.max(value.length - 1, 0)) : word.slice(0, value.length + 1)
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, letters, wordIndex]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-14 pt-28 md:px-6 lg:pt-32"
    >
      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-9 lg:grid-cols-[1fr_0.92fr]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="min-w-0">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            {t.hero.eyebrow}
          </motion.div>
          <motion.h1
            className="max-w-3xl text-[1.92rem] font-black leading-[1.05] tracking-normal min-[390px]:text-[2.05rem] sm:text-[2.55rem] md:text-[2.9rem] lg:text-[3.3rem] xl:text-[3.55rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.26 }}
          >
            {t.hero.titleName}
            <span className="block gradient-text">{t.hero.titleRole}</span>
            <span className="block">{t.hero.titlePlace}</span>
          </motion.h1>

          <motion.div
            className="mt-6 lg:hidden"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38 }}
          >
            <PreviewPanel
              compact
              letters={letters}
              stackLabel={t.hero.stackLabel}
              stackCards={t.hero.stackCards}
              deploy={t.hero.deploy}
              performance={t.hero.performance}
            />
          </motion.div>

          <motion.p
            className="mt-7 max-w-2xl text-[1rem] leading-8 text-white/[0.84] md:text-[1.08rem] md:leading-9"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44 }}
          >
            {t.hero.intro}
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-[0.96rem] leading-8 text-white/[0.74] md:text-[1.02rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52 }}
          >
            {t.hero.note}
          </motion.p>

          <motion.div
            className="mt-6 grid gap-2 sm:grid-cols-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58 }}
          >
            {t.hero.identity.map(([label, value], index) => {
              const style = identityStyles[index];
              const Icon = style.Icon;

              return (
              <motion.article
                key={label}
                className={`relative overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0b111d] px-4 py-3 transition ${style.hover}`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${style.line}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.12 }}
                />
                <div className={`flex items-center gap-1.5 text-[0.68rem] font-bold uppercase ${style.accent}`}>
                  <Icon size={13} />
                  {label}
                </div>
                <div className="mt-1.5 text-sm font-semibold leading-5 text-white/[0.72]">{value}</div>
              </motion.article>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-7 grid grid-cols-3 gap-2 text-xs sm:max-w-xl sm:gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
          >
            {t.hero.stats.map(([value, label], index) => (
              <motion.div
                key={label}
                className="group min-w-0 rounded-2xl border border-white/[0.10] bg-white/[0.06] p-3 transition hover:border-electric/[0.35] hover:bg-white/[0.09]"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={index === 0 ? "text-base font-black text-electric sm:text-lg" : index === 1 ? "text-base font-black text-mint sm:text-lg" : "text-base font-black text-coral sm:text-lg"}>
                  {value}
                </div>
                <div className="mt-1 text-white/[0.54]">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68 }}
          >
            <MagneticButton href="#projects">{t.hero.projectsCta}</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              {t.hero.contactCta}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto hidden w-full min-w-0 max-w-[500px] lg:mr-0 lg:block"
          initial={{ opacity: 0, scale: 0.97, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.42 }}
        >
          <PreviewPanel
            letters={letters}
            stackLabel={t.hero.stackLabel}
            stackCards={t.hero.stackCards}
            deploy={t.hero.deploy}
            performance={t.hero.performance}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
