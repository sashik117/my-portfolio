"use client";

import { motion } from "framer-motion";
import { Code2, Database, Server, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";

const words = ["React", "Laravel", "Flutter", "FastAPI", "Clean UI"];
const stackIcons: LucideIcon[] = [Server, Database, Smartphone, Code2];

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
                <div
                  key={title}
                  className="rounded-2xl border border-white/[0.10] bg-white/[0.06] p-2.5 md:p-4"
                >
                  <Icon size={compact ? 15 : 18} className="mb-1.5 text-mint md:mb-3" />
                  <div className="text-xs font-black text-white md:text-sm">{title}</div>
                  <div className="mt-1 text-[0.66rem] leading-4 text-white/[0.50] md:text-xs md:leading-5">
                    {text}
                  </div>
                </div>
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
                <div key={item} className="flex items-center gap-1.5 md:gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[0.62rem] font-black text-ink md:h-6 md:w-6 md:text-[0.68rem]">
                    {index + 1}
                  </span>
                  <span className="text-[0.68rem] font-bold text-white/[0.72] md:text-sm">{item}</span>
                </div>
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
  const [wordIndex, setWordIndex] = useState(0);
  const [letters, setLetters] = useState("");

  useEffect(() => {
    const word = words[wordIndex];
    let cursor = 0;
    const typing = window.setInterval(() => {
      cursor += 1;
      setLetters(word.slice(0, cursor));
      if (cursor >= word.length) {
        window.clearInterval(typing);
        window.setTimeout(() => {
          setWordIndex((index) => (index + 1) % words.length);
          setLetters("");
        }, 2600);
      }
    }, 96);

    return () => window.clearInterval(typing);
  }, [wordIndex]);

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
            className="mt-7 max-w-2xl text-sm leading-7 text-white/[0.68] md:text-base md:leading-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44 }}
          >
            {t.hero.intro}
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-sm leading-7 text-white/[0.56]"
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
            {t.hero.identity.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[0.10] bg-[#0b111d] px-4 py-3"
              >
                <div className="text-[0.68rem] font-black uppercase text-electric">
                  {label}
                </div>
                <div className="mt-1 text-sm font-black text-white">{value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
          >
            <MagneticButton href="#projects">{t.hero.projectsCta}</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              {t.hero.contactCta}
            </MagneticButton>
          </motion.div>

          <motion.div
            className="mt-7 grid grid-cols-3 gap-2 text-xs sm:max-w-xl sm:gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68 }}
          >
            {t.hero.stats.map(([value, label]) => (
              <div
                key={label}
                className="min-w-0 rounded-2xl border border-white/[0.10] bg-white/[0.06] p-3"
              >
                <div className="text-base font-black text-white sm:text-lg">{value}</div>
                <div className="mt-1 text-white/[0.54]">{label}</div>
              </div>
            ))}
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
