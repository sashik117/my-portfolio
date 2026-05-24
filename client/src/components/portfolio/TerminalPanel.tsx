"use client";

import { motion } from "framer-motion";
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
        <div>
          <div className="eyebrow">{t.terminal.eyebrow}</div>
          <h2 className="section-title">{t.terminal.title}</h2>
          <p className="section-copy">
            {t.terminal.copy}
          </p>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-black/[0.58] shadow-lift backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/[0.10] px-5 py-4">
            <span className="h-3 w-3 rounded-full bg-coral" />
            <span className="h-3 w-3 rounded-full bg-solar" />
            <span className="h-3 w-3 rounded-full bg-mint" />
            <span className="ml-auto text-xs font-bold text-white/[0.38]">stack.log</span>
          </div>
          <div className="space-y-4 p-5 font-mono text-sm">
            {lines.map(([prompt, text], index) => (
              <motion.div
                key={text}
                className="flex gap-3"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <span className="min-w-9 text-electric">{prompt}</span>
                <span className="text-white/[0.72]">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
