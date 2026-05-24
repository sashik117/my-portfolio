"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Github, Instagram, Mail, MapPin, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const links = [
  { label: "GitHub", href: "https://github.com/sashik117", icon: Github },
  { label: "Telegram", href: "https://t.me/Cinnamonroll69", icon: Send },
  { label: "Email", href: "mailto:sanyoklolik@gmail.com", icon: Mail },
  { label: "Instagram", href: "https://www.instagram.com/_o.suhova/", icon: Instagram }
];

export default function Footer() {
  const { t } = useLanguage();
  const [kyivTime, setKyivTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Kyiv"
    });

    const update = () => setKyivTime(formatter.format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-white/[0.10] bg-[#080d16]">
      <motion.div
        className="mx-auto grid w-full max-w-6xl gap-7 px-4 py-8 md:grid-cols-[1fr_auto] md:px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <a href="#top" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-sm font-black text-ink">
              OS
            </span>
            <span>
              <span className="block text-xl font-black text-white">Oleksandra</span>
              <span className="block text-xs font-bold uppercase text-electric">
                fullstack portfolio
              </span>
            </span>
          </a>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/[0.56]">
            {t.footer.note}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {[t.footer.status, t.footer.location, t.footer.timezone, t.footer.stack].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.10] bg-white/[0.05] px-3 py-2 text-xs font-bold text-white/[0.62]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:items-end md:justify-between">
          <div className="grid gap-2 text-sm">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.10] bg-white/[0.05] px-4 py-3 font-bold text-white/[0.66]">
              <MapPin size={16} className="text-electric" />
              Ukraine
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.10] bg-white/[0.05] px-4 py-3 font-bold text-white/[0.66]">
              <Clock3 size={16} className="text-mint" />
              {kyivTime || "Europe/Kyiv"}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-3 text-sm font-bold text-white/[0.72] transition hover:border-electric/[0.42] hover:bg-electric/[0.10] hover:text-white"
                aria-label={link.label}
              >
                <link.icon size={17} />
                <span>{link.label}</span>
                <ArrowUpRight size={14} className="opacity-45 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
