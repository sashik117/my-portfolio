"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/[0.10] bg-[#080d16]">
      <motion.div
        className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-2xl">
          <a href="#top" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-black text-ink">
              OS
            </span>
            <span>
              <span className="block text-lg font-black text-white">Oleksandra</span>
              <span className="block text-xs font-bold uppercase text-electric">
                fullstack portfolio
              </span>
            </span>
          </a>

          <p className="mt-4 text-sm leading-6 text-white/[0.56]">{t.footer.note}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[t.footer.status, t.footer.stack].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.10] bg-white/[0.05] px-3 py-2 text-xs font-bold text-white/[0.62]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <a
          href="#top"
          className="group inline-flex h-11 w-fit items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-4 text-sm font-bold text-white/[0.72] transition hover:border-electric/[0.42] hover:bg-electric/[0.10] hover:text-white"
        >
          {t.footer.backTop}
          <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </footer>
  );
}
