"use client";

import { contactSocials, type ContactSocialIcon } from "@/features/portfolio/data/contact";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Mail, Send, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const socialIcons: Record<ContactSocialIcon, LucideIcon> = {
  email: Mail,
  github: Github,
  instagram: Instagram,
  telegram: Send
};

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.10] bg-[#080d16]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
      <div className="absolute -right-24 top-8 h-44 w-44 rounded-full bg-electric/[0.08] blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-44 w-44 rounded-full bg-coral/[0.07] blur-3xl" />
      <motion.div
        className="relative mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 md:grid-cols-[1fr_auto] md:items-center md:px-6"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-2xl">
          <a href="#top" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-electric/[0.35] bg-electric/[0.12] text-lg font-black text-electric shadow-glow">
              ✦
            </span>
            <span>
              <span className="block text-lg font-black text-white">Oleksandra</span>
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase text-electric">
                <Sparkles size={12} />
                fullstack portfolio
              </span>
            </span>
          </a>

          <p className="mt-4 text-sm leading-6 text-white/[0.56]">{t.footer.note}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[t.footer.status, t.footer.stack].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.10] bg-white/[0.05] px-3 py-2 text-xs font-bold text-white/[0.66] transition hover:border-electric/[0.32] hover:bg-electric/[0.08] hover:text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          {contactSocials.map((social) => {
            const Icon = socialIcons[social.icon];

            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="icon-button"
                title={social.label}
                aria-label={social.label}
              >
                <Icon size={17} />
              </a>
            );
          })}
          <a
            href="#top"
            className="group inline-flex h-11 w-fit items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-4 text-sm font-bold text-white/[0.72] transition hover:border-electric/[0.42] hover:bg-electric/[0.10] hover:text-white"
          >
            {t.footer.backTop}
            <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
