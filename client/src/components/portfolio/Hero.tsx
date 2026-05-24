"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Database, Server, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const words = ["React", "FastAPI", "Flutter", "Gemini AI", "Clean APIs"];
const stackCards: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Server, title: "APIs", text: "Express + FastAPI" },
  { icon: Database, title: "Databases", text: "Postgres + SQLite" },
  { icon: Smartphone, title: "Mobile", text: "Flutter + Compose" },
  { icon: Code2, title: "Frontend", text: "React + motion" }
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);
  const opacity = useTransform(scrollY, [0, 620], [1, 0.2]);
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
        }, 1200);
      }
    }, 72);

    return () => window.clearInterval(typing);
  }, [wordIndex]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 md:px-6"
    >
      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]"
        style={{ y, opacity }}
      >
        <div className="min-w-0">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Premium Fullstack Developer Experience
          </motion.div>
          <motion.h1
            className="max-w-4xl text-[2.55rem] font-black leading-[0.94] tracking-normal min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[4.9rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Fullstack Developer
            <span className="block gradient-text">Modern web &amp; mobile</span>
            <span className="block">experiences.</span>
          </motion.h1>
          <motion.p
            className="mt-7 max-w-2xl text-base leading-8 text-white/[0.68] md:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44 }}
          >
            I design and build sharp frontend interfaces, reliable backend APIs,
            and content systems that keep projects editable without touching code.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.56 }}
          >
            <MagneticButton href="#projects">View Projects</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div
            className="mt-8 grid grid-cols-3 gap-2 text-xs sm:mt-10 sm:max-w-xl sm:gap-3 sm:text-sm"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.66 }}
          >
            {[
              ["6+", "real projects"],
              ["Mobile", "apps + PWA"],
              ["AI", "Gemini + APIs"]
            ].map(([value, label]) => (
              <div key={label} className="min-w-0 rounded-2xl border border-white/[0.10] bg-white/[0.06] p-3 sm:p-4">
                <div className="text-lg font-black text-white sm:text-xl">{value}</div>
                <div className="mt-1 text-white/[0.54]">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full min-w-0 max-w-[520px] lg:mr-0"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative aspect-[0.92] overflow-hidden rounded-[28px] border border-white/[0.12] bg-white/[0.07] p-4 shadow-lift backdrop-blur-xl">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.10] bg-black/[0.35] px-4 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-coral" />
                <span className="h-3 w-3 rounded-full bg-solar" />
                <span className="h-3 w-3 rounded-full bg-mint" />
              </div>
              <span className="text-xs font-bold text-white/[0.52]">portfolio.dev</span>
            </div>

            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl border border-white/[0.10] bg-ink/[0.78] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-electric">
                      Current stack
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-white">
                      {letters}
                      <span className="animate-pulse text-electric">|</span>
                    </h2>
                  </div>
                  <Code2 className="text-electric" size={28} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {stackCards.map(({ icon: Icon, title, text }) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-white/[0.10] bg-white/[0.06] p-4"
                    >
                      <Icon size={20} className="mb-3 text-mint" />
                      <div className="text-sm font-black text-white">{title}</div>
                      <div className="mt-1 text-xs text-white/[0.50]">{text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[1fr_0.75fr] gap-4">
                <div className="rounded-2xl border border-white/[0.10] bg-white/[0.07] p-5">
                  <div className="mb-4 text-xs font-bold uppercase text-white/[0.48]">
                    Deploy flow
                  </div>
                  <div className="space-y-3">
                    {["Vercel", "Render", "Mongo Atlas"].map((item, index) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-black text-ink">
                          {index + 1}
                        </span>
                        <span className="text-sm font-bold text-white/[0.72]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-electric/[0.25] bg-electric/[0.10] p-5">
                  <div className="text-4xl font-black text-white">99</div>
                  <div className="mt-2 text-sm font-bold text-white/[0.58]">
                    performance-minded interactions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
