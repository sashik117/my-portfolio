"use client";

import { terminalBadges, terminalLineThemes } from "@/features/portfolio/data/terminal";
import { motion } from "framer-motion";
import { BadgeCheck, Terminal } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function TerminalPanel() {
  const { t } = useLanguage();
  const lines = [["$", "npm run dev"], ...t.terminal.lines];

  return (
    <section className="section-shell">
      <motion.div
        className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative">
          <div className="eyebrow">{t.terminal.eyebrow}</div>
          <h2 className="section-title">{t.terminal.title}</h2>
          <p className="section-copy">
            {t.terminal.copy}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {terminalBadges.map((item, index) => (
              <motion.span
                key={item}
                className="rounded-full border border-white/[0.10] bg-white/[0.05] px-3 py-2 text-xs font-bold text-white/[0.66]"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.10] bg-black/[0.58] shadow-lift backdrop-blur-xl">
          <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-electric/[0.10] blur-3xl" />
          <div className="absolute -bottom-16 left-8 h-32 w-32 rounded-full bg-coral/[0.08] blur-3xl" />
          <div className="flex items-center gap-2 border-b border-white/[0.10] px-5 py-4">
            <span className="h-3 w-3 rounded-full bg-coral" />
            <span className="h-3 w-3 rounded-full bg-solar" />
            <span className="h-3 w-3 rounded-full bg-mint" />
            <span className="ml-auto inline-flex items-center gap-2 text-xs font-bold text-white/[0.42]">
              <Terminal size={14} className="text-electric" />
              stack.log
            </span>
          </div>
          <div className="relative space-y-3 p-4 font-mono text-sm sm:p-5">
            {lines.map(([prompt, text], index) => (
              <motion.div
                key={text}
                className={`group flex gap-3 rounded-2xl border p-3 transition hover:translate-x-1 ${terminalLineThemes[index % terminalLineThemes.length]}`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="min-w-10 font-black">{prompt}</span>
                <span className="leading-6 text-white/[0.76]">{text}</span>
                {index > 0 && <BadgeCheck size={15} className="ml-auto hidden shrink-0 text-mint sm:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
